import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import nodemailer from 'nodemailer';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // ===== SECURITY MIDDLEWARES =====

  // Helmet - Sécurisation des headers HTTP
  server.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://fonts.googleapis.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
        frameSrc: ["'none'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: []
      }
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    },
    noSniff: true,
    xssFilter: true,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
  }));

  // CORS - Configuration stricte
  const corsOptions = {
    origin: process.env['ALLOWED_ORIGINS']?.split(',') || ['http://localhost:4200', 'http://localhost:4000'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400 // 24 heures
  };
  server.use(cors(corsOptions));

  // Rate limiting global
  const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requêtes par IP
    message: 'Trop de requêtes depuis cette adresse IP, veuillez réessayer plus tard.',
    standardHeaders: true,
    legacyHeaders: false
  });
  server.use(globalLimiter);

  // Rate limiting spécifique pour l'API de contact
  const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 heure
    max: 5, // 5 emails par heure
    message: 'Trop de messages envoyés. Veuillez patienter avant de renvoyer un message.',
    skipSuccessfulRequests: false
  });

  // Middleware pour parser le JSON avec limite de taille
  server.use(express.json({ limit: '10kb' }));
  server.use(express.urlencoded({ extended: true, limit: '10kb' }));

  // Configuration du transporteur email pour Maildev
  const transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 1025,
    ignoreTLS: true,
  });

  // API endpoint pour l'envoi d'emails avec validation et rate limiting
  server.post('/api/contact',
    contactLimiter,
    [
      // Validation des champs
      body('nom')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Le nom doit contenir entre 2 et 100 caractères')
        .escape(),
      body('email')
        .trim()
        .isEmail()
        .withMessage('Email invalide')
        .normalizeEmail(),
      body('objet')
        .trim()
        .isLength({ min: 3, max: 200 })
        .withMessage('L\'objet doit contenir entre 3 et 200 caractères')
        .escape(),
      body('message')
        .trim()
        .isLength({ min: 10, max: 2000 })
        .withMessage('Le message doit contenir entre 10 et 2000 caractères')
        .escape(),
      body('artisanEmail')
        .trim()
        .isEmail()
        .withMessage('Email de l\'artisan invalide')
        .normalizeEmail(),
      body('artisanNom')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .escape()
    ],
    async (req: express.Request, res: express.Response) => {
    try {
      // Vérifier les erreurs de validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: 'Données invalides',
          details: errors.array()
        });
      }

      const { nom, email, objet, message, artisanEmail, artisanNom } = req.body;

      // Configuration de l'email
      const mailOptions = {
        from: `"${nom}" <${email}>`,
        to: artisanEmail,
        subject: `[Trouve Ton Artisan] ${objet}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0074c7;">Nouvelle demande de contact</h2>
            <p><strong>De:</strong> ${nom} (${email})</p>
            <p><strong>Pour:</strong> ${artisanNom || 'Artisan'}</p>
            <p><strong>Objet:</strong> ${objet}</p>
            <hr style="border: 1px solid #f1f8fc; margin: 20px 0;">
            <div style="background-color: #f1f8fc; padding: 20px; border-radius: 8px;">
              <p style="color: #384050; white-space: pre-wrap;">${message}</p>
            </div>
            <hr style="border: 1px solid #f1f8fc; margin: 20px 0;">
            <p style="color: #666; font-size: 12px;">
              Ce message a été envoyé depuis la plateforme Trouve Ton Artisan - Région Auvergne-Rhône-Alpes
            </p>
          </div>
        `,
        text: `Nouvelle demande de contact\n\nDe: ${nom} (${email})\nObjet: ${objet}\n\nMessage:\n${message}`
      };

      // Envoi de l'email
      await transporter.sendMail(mailOptions);

      return res.json({
        success: true,
        message: 'Email envoyé avec succès. Vous recevrez une réponse sous 48h.'
      });

    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      return res.status(500).json({
        success: false,
        error: 'Erreur lors de l\'envoi de l\'email'
      });
    }
  });

  // Serve static files from /browser
  server.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Angular engine
  server.get('*', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();

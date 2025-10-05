# Mesures de Sécurité - Trouve Ton Artisan

Ce document détaille toutes les mesures de sécurité mises en place dans l'application "Trouve Ton Artisan" conformément aux exigences du projet.

## 1. Sécurisation des Headers HTTP (Helmet.js)

**Mise en œuvre** : Middleware `helmet` configuré dans `server.ts`

**Intérêt** :
- Protection contre les attaques XSS (Cross-Site Scripting)
- Prévention du clickjacking
- Protection contre le MIME type sniffing
- Sécurisation des connexions avec HSTS

**Headers configurés** :
- `Content-Security-Policy` : Contrôle les ressources que le navigateur peut charger
- `Strict-Transport-Security` : Force HTTPS pendant 1 an
- `X-Content-Type-Options`: Empêche le sniffing MIME
- `X-Frame-Options` : Empêche l'affichage dans un iframe
- `Referrer-Policy` : Contrôle les informations envoyées dans le referrer

```typescript
server.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      // ... autres directives
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

## 2. Configuration CORS (Cross-Origin Resource Sharing)

**Mise en œuvre** : Middleware `cors` avec configuration stricte

**Intérêt** :
- Empêche les requêtes non autorisées depuis d'autres domaines
- Protège contre les attaques CSRF
- Contrôle précis des origines autorisées

**Configuration** :
```typescript
const corsOptions = {
  origin: process.env['ALLOWED_ORIGINS']?.split(',') || ['http://localhost:4200', 'http://localhost:4000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
```

## 3. Rate Limiting (Limitation de débit)

**Mise en œuvre** : Middleware `express-rate-limit`

**Intérêt** :
- Protection contre les attaques DDoS
- Prévention du brute-force
- Limitation de l'abus de ressources

**Deux niveaux de protection** :

### Rate limiting global
- **Limite** : 100 requêtes par 15 minutes par IP
- **Application** : Toutes les routes
- **Message** : "Trop de requêtes depuis cette adresse IP"

### Rate limiting API de contact
- **Limite** : 5 emails par heure par IP
- **Application** : Endpoint `/api/contact` uniquement
- **Message** : "Trop de messages envoyés. Veuillez patienter"

```typescript
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 5,
  message: 'Trop de messages envoyés'
});
```

## 4. Validation et Sanitization des Entrées

**Mise en œuvre** : Bibliothèque `express-validator`

**Intérêt** :
- Protection contre les injections SQL/NoSQL
- Prévention des attaques XSS
- Garantie de l'intégrité des données
- Validation côté serveur (incontournable)

**Validations appliquées** :

### Champ Nom
- Trimming (suppression espaces)
- Longueur : 2-100 caractères
- Échappement HTML (escape)

### Champ Email
- Format email valide
- Normalisation (lowercase, etc.)
- Validation stricte

### Champ Objet
- Trimming
- Longueur : 3-200 caractères
- Échappement HTML

### Champ Message
- Trimming
- Longueur : 10-2000 caractères
- Échappement HTML

```typescript
body('nom')
  .trim()
  .isLength({ min: 2, max: 100 })
  .escape(),
body('email')
  .trim()
  .isEmail()
  .normalizeEmail()
```

## 5. Limitation de Taille des Requêtes

**Mise en œuvre** : Configuration Express avec limite de 10kb

**Intérêt** :
- Protection contre les attaques par déni de service
- Prévention de la saturation mémoire
- Optimisation des performances

```typescript
server.use(express.json({ limit: '10kb' }));
server.use(express.urlencoded({ extended: true, limit: '10kb' }));
```

## 6. Sécurité des Emails (Maildev en développement)

**Mise en œuvre** : Serveur SMTP local Maildev

**Intérêt** :
- Aucun email réel envoyé en développement
- Tests sécurisés sans risque de spam
- Visualisation des emails dans interface web
- Pas de credentials SMTP exposés

**Configuration** :
```typescript
const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 1025,
  ignoreTLS: true // Seulement pour dev
});
```

⚠️ **En production** : Remplacer par un service sécurisé (SendGrid, AWS SES, etc.)

## 7. Gestion des Erreurs Sécurisée

**Mise en œuvre** : Messages d'erreur génériques

**Intérêt** :
- Pas de divulgation d'informations sensibles
- Logs détaillés côté serveur uniquement
- Messages utilisateur informatifs mais vagues

**Exemple** :
```typescript
catch (error) {
  console.error('Erreur détaillée:', error); // Log serveur
  return res.status(500).json({
    success: false,
    error: 'Erreur lors de l\'envoi' // Message utilisateur
  });
}
```

## 8. Sécurité TypeScript

**Mise en œuvre** : Configuration TypeScript stricte

**Intérêt** :
- Détection des erreurs à la compilation
- Typage fort des données
- Réduction des bugs de sécurité

**Configuration** (`tsconfig.json`) :
- `strict: true`
- `noImplicitAny: true`
- `strictNullChecks: true`

## 9. Dépendances et Vulnérabilités

**Mise en œuvre** : Audit régulier avec `npm audit`

**Intérêt** :
- Détection des vulnérabilités connues
- Mise à jour proactive des dépendances
- Réduction de la surface d'attaque

**Commandes** :
```bash
npm audit                  # Affiche les vulnérabilités
npm audit fix             # Corrige automatiquement
npm audit fix --force     # Force les mises à jour majeures
```

⚠️ **État actuel** : 14 vulnérabilités détectées (liées à Angular 17)
- Solution : Mise à jour vers Angular 18+ (breaking changes)

## 10. Validation Côté Client (Angular)

**Mise en œuvre** : Reactive Forms avec validateurs

**Intérêt** :
- Feedback immédiat pour l'utilisateur
- Réduction des requêtes invalides au serveur
- Amélioration de l'UX

**Validations** :
```typescript
contactForm = this.fb.group({
  nom: ['', [Validators.required, Validators.minLength(2)]],
  email: ['', [Validators.required, Validators.email]],
  objet: ['', [Validators.required, Validators.minLength(3)]],
  message: ['', [Validators.required, Validators.minLength(10)]]
});
```

⚠️ **Important** : La validation côté client est complémentaire, jamais suffisante seule.

## 11. HttpOnly et Secure Cookies (Préparation)

**Intérêt** :
- Protection contre le vol de session via XSS
- Transmission sécurisée des cookies

⚠️ Actuellement non implémenté car pas d'authentification.
À ajouter lors de l'implémentation d'un système de connexion :

```typescript
res.cookie('session', token, {
  httpOnly: true,
  secure: true, // HTTPS uniquement
  sameSite: 'strict'
});
```

## 12. HTTPS en Production

**Recommandation** : Toujours utiliser HTTPS en production

**Intérêt** :
- Chiffrement des données en transit
- Protection contre les attaques man-in-the-middle
- Confiance des utilisateurs

**Mise en œuvre** :
- Certificat SSL/TLS (Let's Encrypt gratuit)
- Redirection HTTP → HTTPS
- HSTS activé (déjà configuré via Helmet)

## Résumé des Mesures

| Mesure | Status | Priorité | Impact |
|--------|--------|----------|--------|
| Helmet.js | ✅ Implémenté | Haute | Haute |
| CORS | ✅ Implémenté | Haute | Haute |
| Rate Limiting | ✅ Implémenté | Haute | Haute |
| Validation/Sanitization | ✅ Implémenté | Critique | Critique |
| Limitation taille requêtes | ✅ Implémenté | Moyenne | Moyenne |
| Maildev (dev) | ✅ Implémenté | Haute | Haute |
| Gestion erreurs | ✅ Implémenté | Haute | Moyenne |
| TypeScript strict | ✅ Implémenté | Moyenne | Moyenne |
| Validation client | ✅ Implémenté | Moyenne | Faible |
| HTTPS | ⏳ Production | Critique | Critique |
| Audit npm | ⚠️ 14 vulnérabilités | Haute | Moyenne |

## Recommandations Futures

1. **Authentification** : Implémenter JWT avec refresh tokens
2. **Logging** : Ajouter Winston ou Morgan pour les logs de sécurité
3. **Monitoring** : Configurer des alertes pour activités suspectes
4. **WAF** : Considérer un Web Application Firewall en production
5. **Audit de sécurité** : Faire auditer par un professionnel
6. **Tests de pénétration** : Effectuer des pentests réguliers
7. **Mise à jour Angular** : Passer à Angular 18+ pour corriger les vulnérabilités

## Checklist de Déploiement Sécurisé

Avant de déployer en production :

- [ ] Activer HTTPS avec certificat valide
- [ ] Configurer les variables d'environnement (ALLOWED_ORIGINS, etc.)
- [ ] Remplacer Maildev par un service SMTP production
- [ ] Exécuter `npm audit fix`
- [ ] Vérifier les logs de sécurité
- [ ] Tester le rate limiting
- [ ] Vérifier la CSP dans la console navigateur
- [ ] Tester tous les formulaires avec des données malveillantes
- [ ] Configurer un système de backup
- [ ] Mettre en place un monitoring

## Contact et Reporting

Pour signaler une vulnérabilité de sécurité, veuillez contacter l'équipe de développement.

**Ne publiez jamais de vulnérabilité de sécurité publiquement.**

---

*Document mis à jour le : {{ date }}*
*Version de l'application : 0.0.0*
*Framework : Angular 17*

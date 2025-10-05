# Configuration du serveur mail local (Maildev)

## Qu'est-ce que Maildev ?

Maildev est un serveur SMTP de développement qui capture tous les emails envoyés par l'application sans les envoyer réellement. Il fournit une interface web pour visualiser les emails capturés.

## Installation

Maildev est déjà installé comme dépendance de développement dans le projet :

```bash
npm install --save-dev maildev
```

## Démarrage de Maildev

### Option 1 : Démarrage manuel

Dans un terminal séparé, lancez :

```bash
npm run maildev
```

Maildev démarrera sur :
- **Interface web** : http://localhost:1080
- **SMTP** : localhost:1025

### Option 2 : Démarrage automatique (recommandé)

Pour démarrer l'application et maildev en même temps, vous pouvez utiliser deux terminaux :

**Terminal 1** - Maildev :
```bash
npm run maildev
```

**Terminal 2** - Application Angular :
```bash
npm start
```

**Terminal 3** - Serveur SSR (pour tester l'envoi d'emails) :
```bash
npm run build
npm run serve:ssr:trouve-ton-artisan
```

## Utilisation

### 1. Démarrer Maildev

```bash
npm run maildev
```

Vous verrez ce message :
```
MailDev webapp running at http://localhost:1080
MailDev SMTP Server running at localhost:1025
```

### 2. Accéder à l'interface web

Ouvrez votre navigateur à l'adresse : http://localhost:1080

### 3. Tester l'envoi d'emails

1. Accédez à l'application : http://localhost:4000 (en mode SSR)
2. Naviguez vers la fiche d'un artisan
3. Remplissez le formulaire de contact
4. Envoyez le message
5. Consultez l'email reçu dans l'interface Maildev (http://localhost:1080)

## Configuration du serveur

La configuration du serveur email se trouve dans `server.ts` :

```typescript
const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 1025,
  ignoreTLS: true,
});
```

## API Endpoint

L'application expose un endpoint API pour l'envoi d'emails :

**POST** `/api/contact`

**Body** :
```json
{
  "nom": "Nom de l'expéditeur",
  "email": "email@exemple.com",
  "objet": "Objet du message",
  "message": "Contenu du message",
  "artisanEmail": "artisan@exemple.com",
  "artisanNom": "Nom de l'artisan"
}
```

**Réponse** :
```json
{
  "success": true,
  "message": "Email envoyé avec succès. Vous recevrez une réponse sous 48h."
}
```

## Dépannage

### Maildev ne démarre pas

- Vérifiez que le port 1025 et 1080 ne sont pas déjà utilisés
- Essayez de redémarrer Maildev

### Les emails n'apparaissent pas

- Vérifiez que Maildev est bien démarré
- Consultez la console du serveur pour les erreurs
- Vérifiez que vous utilisez le serveur SSR (pas `ng serve`)

### Erreur "ECONNREFUSED"

- Assurez-vous que Maildev est démarré avant d'envoyer des emails
- Vérifiez que le port 1025 est bien accessible

## Avantages de Maildev

✅ **Sécurité** : Aucun email n'est envoyé réellement pendant le développement
✅ **Rapidité** : Pas besoin de configurer un vrai serveur SMTP
✅ **Visualisation** : Interface web intuitive pour voir les emails
✅ **Test** : Parfait pour tester les templates d'emails
✅ **Gratuit** : Open-source et sans configuration complexe

## Production

⚠️ **Important** : Maildev est uniquement pour le développement. En production, vous devrez utiliser un vrai service d'envoi d'emails comme :

- SendGrid
- Mailgun
- AWS SES
- SMTP de votre hébergeur

Pour passer en production, modifiez la configuration dans `server.ts` avec les credentials de votre service d'email.

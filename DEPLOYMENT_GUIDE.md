# 🚀 Guide de Déploiement LinkVault

Ce guide détaillé vous accompagne dans le déploiement de votre application LinkVault sur différentes plateformes d'hébergement. Que vous souhaitiez un déploiement rapide ou une configuration avancée, ce guide couvre tous les scénarios.

## 📋 Table des Matières

1. [Prérequis](#prérequis)
2. [Configuration Locale](#configuration-locale)
3. [Plateformes Recommandées](#plateformes-recommandées)
4. [Déploiement Vercel](#déploiement-vercel)
5. [Déploiement Netlify](#déploiement-netlify)
6. [Déploiement GitHub Pages](#déploiement-github-pages)
7. [Déploiement Firebase Hosting](#déploiement-firebase-hosting)
8. [Configuration Avancée](#configuration-avancée)
9. [Sécurité](#sécurité)
10. [Monitoring](#monitoring)
11. [CI/CD](#cicd)
12. [Dépannage](#dépannage)
13. [Optimisation](#optimisation)
14. [Coûts](#coûts)

---

## 🛠️ Prérequis

### Environnement de Développement
- **Node.js** : Version 18.17.0 ou supérieure
- **npm** : Version 9.0.0 ou supérieure (ou Yarn 1.22.0+)
- **Git** : Pour la gestion de version et le déploiement

### Comptes Nécessaires
Créez des comptes sur les plateformes où vous souhaitez déployer :
- [Vercel](https://vercel.com) (Recommandé)
- [Netlify](https://netlify.com)
- [GitHub](https://github.com) (Pour GitHub Pages)
- [Firebase](https://firebase.google.com) (Pour Firebase Hosting)

### Vérification de l'Environnement
```bash
# Vérifier les versions installées
node --version  # Doit être >= 18.17.0
npm --version   # Doit être >= 9.0.0
git --version   # N'importe quelle version récente
```

---

## ⚙️ Configuration Locale

### 1. Installation du Projet
```bash
# Cloner le repository
git clone <your-repository-url>
cd linkvault

# Installer les dépendances
npm install

# Vérifier que tout fonctionne
npm run dev
```

### 2. Configuration des Variables d'Environnement
Créez un fichier `.env.local` à la racine du projet :

```bash
# .env.local
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id  # Optionnel
```

### 3. Build de Production Local
```bash
# Créer un build de production
npm run build

# Tester le build localement
npm start
```

Visitez `http://localhost:3000` pour vérifier que tout fonctionne correctement.

---

## 🎯 Plateformes Recommandées

| Plateforme | Complexité | Coût | Performance | Support Next.js |
|------------|-------------|------|-------------|-----------------|
| **Vercel** | ⭐ Facile | Gratuit → 20$/mois | ⭐⭐⭐⭐⭐ | Excellent |
| **Netlify** | ⭐⭐ Moyen | Gratuit → 19$/mois | ⭐⭐⭐⭐ | Très bon |
| **Firebase** | ⭐⭐ Moyen | Gratuit → 25$/mois | ⭐⭐⭐⭐ | Bon |
| **GitHub Pages** | ⭐⭐⭐ Difficile | Gratuit | ⭐⭐⭐ | Moyen |

### Recommandation
**Vercel** est la plateforme recommandée pour LinkVault car elle est optimisée pour Next.js et offre la meilleure expérience de développement.

---

## 🟢 Déploiement Vercel

### Méthode 1 : Interface Web (Recommandée)

1. **Connecter votre Repository**
   - Allez sur [vercel.com](https://vercel.com)
   - Cliquez sur "New Project"
   - Importez votre repository GitHub/GitLab/Bitbucket

2. **Configuration Automatique**
   Vercel détecte automatiquement qu'il s'agit d'un projet Next.js et configure :
   - Build Command : `npm run build`
   - Output Directory : `.next`
   - Install Command : `npm install`

3. **Variables d'Environnement**
   Dans l'onglet "Settings" → "Environment Variables" :
   ```
   NEXT_PUBLIC_APP_URL = https://votre-app.vercel.app
   ```

4. **Déploiement**
   - Cliquez sur "Deploy"
   - Votre application sera disponible sur `https://your-project-name.vercel.app`

### Méthode 2 : CLI Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter à Vercel
vercel login

# Déployer (depuis le dossier du projet)
vercel

# Déploiement en production
vercel --prod
```

### Configuration Avancée Vercel

Créez un fichier `vercel.json` à la racine :

```json
{
  "name": "linkvault",
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "env": {
    "NEXT_PUBLIC_APP_URL": "@app-url"
  }
}
```

---

## 🔷 Déploiement Netlify

### Méthode 1 : Interface Web

1. **Connecter Repository**
   - Allez sur [netlify.com](https://netlify.com)
   - "New site from Git" → Choisissez votre provider

2. **Configuration Build**
   - Build command : `npm run build`
   - Publish directory : `out`
   - ⚠️ **Important** : Configurez pour l'export statique

3. **Configuration Next.js pour Netlify**
   Créez `next.config.js` :
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     distDir: 'out',
     images: {
       unoptimized: true
     }
   }
   
   module.exports = nextConfig
   ```

### Méthode 2 : Netlify CLI

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter
netlify login

# Initialiser le site
netlify init

# Build et déploiement
npm run build
netlify deploy --prod --dir=out
```

### Configuration `_redirects`

Créez `public/_redirects` pour le routing :
```
/* /index.html 200
```

---

## 🟣 Déploiement GitHub Pages

### Configuration Required

1. **Modification `next.config.js`**
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     distDir: 'out',
     basePath: '/your-repository-name',
     images: {
       unoptimized: true
     }
   }
   
   module.exports = nextConfig
   ```

2. **GitHub Actions Workflow**
   Créez `.github/workflows/deploy.yml` :
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         
         - name: Setup Node.js
           uses: actions/setup-node@v4
           with:
             node-version: '18'
             cache: 'npm'
             
         - name: Install dependencies
           run: npm ci
           
         - name: Build
           run: npm run build
           
         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./out
   ```

3. **Activation GitHub Pages**
   - Repository Settings → Pages
   - Source : "GitHub Actions"

---

## 🟠 Déploiement Firebase Hosting

### Configuration Firebase

1. **Installation Firebase CLI**
   ```bash
   npm install -g firebase-tools
   firebase login
   ```

2. **Initialisation Firebase**
   ```bash
   firebase init hosting
   ```

3. **Configuration `firebase.json`**
   ```json
   {
     "hosting": {
       "public": "out",
       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

4. **Modification pour Export Statique**
   Dans `next.config.js` :
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     distDir: 'out',
     images: {
       unoptimized: true
     }
   }
   
   module.exports = nextConfig
   ```

5. **Déploiement**
   ```bash
   npm run build
   firebase deploy
   ```

---

## ⚙️ Configuration Avancée

### Domaine Personnalisé

#### Vercel
1. Settings → Domains
2. Ajouter votre domaine
3. Configurer DNS : CNAME vers `cname.vercel-dns.com`

#### Netlify  
1. Site Settings → Domain Management
2. Add custom domain
3. Configurer DNS selon les instructions

### HTTPS et SSL

Tous les hébergeurs recommandés fournissent HTTPS automatiquement via Let's Encrypt.

### Variables d'Environnement de Production

```bash
# Variables communes pour toutes les plateformes
NEXT_PUBLIC_APP_URL=https://votre-domaine.com
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn  # Pour monitoring erreurs
```

---

## 🔒 Sécurité

### Headers Sécurisés

Ajoutez dans `next.config.js` :
```javascript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options', 
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          }
        ]
      }
    ]
  }
}
```

### Content Security Policy

```javascript
// Dans next.config.js
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline' fonts.googleapis.com;
  img-src 'self' blob: data: https:;
  font-src 'self' fonts.gstatic.com;
  connect-src 'self';
  frame-ancestors 'none';
`;

const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, '')
          }
        ]
      }
    ]
  }
}
```

---

## 📊 Monitoring

### Analytics

#### Google Analytics 4
1. Créez une propriété GA4
2. Ajoutez l'ID dans les variables d'environnement
3. Implémentez le tracking :

```typescript
// lib/analytics.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID

export const pageview = (url: string) => {
  if (typeof window !== 'undefined') {
    (window as any).gtag('config', GA_TRACKING_ID, {
      page_path: url
    })
  }
}

export const event = ({ action, category, label, value }: any) => {
  if (typeof window !== 'undefined') {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    })
  }
}
```

#### Plausible Analytics (Alternative Privacy-Focused)
```html
<!-- Dans app/layout.tsx -->
<Script 
  defer 
  data-domain="votre-domaine.com" 
  src="https://plausible.io/js/script.js"
/>
```

### Monitoring d'Erreurs

#### Sentry Configuration
```bash
npm install @sentry/nextjs
```

```javascript
// sentry.client.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});
```

### Performance Monitoring

#### Vercel Analytics
```bash
npm install @vercel/analytics
```

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

---

## 🔄 CI/CD

### GitHub Actions pour Vercel

`.github/workflows/ci.yml` :
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      - run: npm run test # Si vous avez des tests

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### Secrets GitHub Required
- `VERCEL_TOKEN` : Token API Vercel
- `ORG_ID` : ID de votre organisation Vercel  
- `PROJECT_ID` : ID du projet Vercel

---

## 🐛 Dépannage

### Problèmes Communs

#### Build Fails
```bash
# Nettoyer le cache
rm -rf .next node_modules
npm install
npm run build
```

#### Images ne s'affichent pas
Vérifiez la configuration `next.config.js` :
```javascript
const nextConfig = {
  images: {
    unoptimized: true, // Pour export statique
    domains: ['example.com'] // Pour images externes
  }
}
```

#### Routing ne fonctionne pas
Pour export statique, ajoutez `trailingSlash: true` :
```javascript
const nextConfig = {
  output: 'export',
  trailingSlash: true
}
```

#### Performance Issues
1. Analyser le bundle :
```bash
npm install --save-dev @next/bundle-analyzer
```

2. Dans `next.config.js` :
```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer(nextConfig)
```

3. Analyser :
```bash
ANALYZE=true npm run build
```

### Logs de Debug

#### Vercel
```bash
vercel logs
```

#### Netlify
```bash
netlify logs
```

---

## ⚡ Optimisation Post-Déploiement

### Performance Web

#### Core Web Vitals Optimization
1. **Largest Contentful Paint (LCP)** :
   - Optimiser les images avec `next/image`
   - Précharger les ressources critiques

2. **First Input Delay (FID)** :
   - Code splitting automatique avec Next.js
   - Lazy loading des composants

3. **Cumulative Layout Shift (CLS)** :
   - Dimensions explicites pour images
   - Skeleton loading states

#### CDN et Caching
```javascript
// next.config.js
const nextConfig = {
  async headers() {
    return [
      {
        source: '/assets/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  }
}
```

### SEO Optimization

#### Sitemap Generation
```bash
npm install next-sitemap
```

`next-sitemap.config.js` :
```javascript
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://votre-domaine.com',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/admin/*', '/private/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/private']
      }
    ]
  }
}
```

#### Métadonnées Dynamiques
```typescript
// app/page.tsx
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'LinkVault - Gestionnaire de Liens Personnel',
    description: 'Organisez vos liens favoris avec notre système de tags avancé',
    openGraph: {
      title: 'LinkVault',
      description: 'Gestionnaire de liens moderne',
      url: 'https://votre-domaine.com',
      siteName: 'LinkVault',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630
        }
      ],
      locale: 'fr_FR',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'LinkVault',
      description: 'Gestionnaire de liens moderne',
      images: ['/og-image.png']
    }
  }
}
```

---

## 💰 Coûts d'Hébergement

### Vercel
- **Hobby Plan** : Gratuit
  - 100GB bandwidth/mois
  - 1000 build minutes/mois
  - Domaines illimités
  
- **Pro Plan** : 20$/mois
  - 1TB bandwidth/mois
  - 6000 build minutes/mois
  - Fonctionnalités avancées

### Netlify
- **Starter Plan** : Gratuit
  - 100GB bandwidth/mois
  - 300 build minutes/mois
  
- **Pro Plan** : 19$/mois
  - 1TB bandwidth/mois
  - 25000 build minutes/mois

### Firebase Hosting
- **Spark Plan** : Gratuit
  - 1GB stockage
  - 10GB/mois transfert
  
- **Blaze Plan** : Pay-as-you-go
  - $0.026/GB stockage
  - $0.15/GB transfert

### GitHub Pages
- **Gratuit** pour repositories publics
- Inclus dans GitHub Pro/Team pour privés

---

## 📞 Support et Maintenance

### Monitoring de Santé

Script de monitoring simple :
```bash
#!/bin/bash
# health-check.sh
response=$(curl -s -o /dev/null -w "%{http_code}" https://votre-domaine.com)
if [ $response -eq 200 ]; then
    echo "✅ Site is up"
else
    echo "❌ Site is down (HTTP $response)"
    # Envoyer notification (email, Slack, etc.)
fi
```

### Updates Régulières

```bash
# Script d'update mensuel
#!/bin/bash
npm update
npm audit fix
npm run build
# Si succès, déployer
```

### Backup de Configuration

Sauvegardez régulièrement :
- Variables d'environnement
- Configuration DNS
- Certificats SSL (si custom)
- Base de données (si ajoutée plus tard)

---

## 🎯 Recommandations Finales

### Pour Débuter (MVP)
1. **Déployez sur Vercel** (le plus simple)
2. **Configurez un domaine personnalisé**
3. **Ajoutez Google Analytics**
4. **Mettez en place un monitoring basique**

### Pour la Production
1. **Implémentez un CDN** global
2. **Configurez la sécurité avancée** (CSP, HSTS)
3. **Ajoutez le monitoring d'erreurs** (Sentry)
4. **Mettez en place les sauvegardes**
5. **Configurez les alertes** de disponibilité

### Pour l'Expansion
1. **Infrastructure as Code** (Terraform/CloudFormation)
2. **Multi-region deployment**
3. **Load balancing** et failover
4. **Container orchestration** (Kubernetes)

---

LinkVault est maintenant prêt à être déployé en production ! Ce guide couvre tous les aspects essentiels pour un déploiement réussi et une maintenance efficace.

Pour toute question ou support technique, n'hésitez pas à consulter la documentation officielle des plateformes ou à contacter le support.

🚀 **Bon déploiement !**
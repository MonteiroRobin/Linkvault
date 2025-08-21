# LinkVault - Gestionnaire de Liens Personnel

[![Next.js](https://img.shields.io/badge/Next.js-15.5.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

LinkVault est une application web moderne et intuitive conçue pour organiser, rechercher et gérer vos liens favoris avec un système de tags avancé. Développée avec Next.js 15 et TypeScript, elle offre une expérience utilisateur fluide et responsive.

## ✨ Fonctionnalités

### 🔗 Gestion des Liens
- **Ajout facile** : Interface intuitive pour ajouter des liens avec titre, URL et description
- **Modification en ligne** : Édition rapide des liens existants
- **Suppression sécurisée** : Confirmation avant suppression
- **Détection automatique** : Récupération automatique des favicons et domaines

### 🏷️ Système de Tags Avancé
- **Tags colorés** : Système de couleurs automatiques pour une meilleure organisation
- **Gestion intelligente** : Création et sélection de tags existants
- **Filtrage multiple** : Filtrage par un ou plusieurs tags simultanément
- **Compteur de liens** : Affichage du nombre de liens par tag

### 🔍 Recherche et Filtres
- **Recherche en temps réel** : Recherche instantanée dans les titres, URLs, descriptions et tags
- **Tri avancé** : Tri par date, titre ou URL (croissant/décroissant)
- **Filtres combinés** : Combinaison de recherche textuelle et filtrage par tags
- **Interface claire** : Affichage des filtres actifs et possibilité de les effacer

### 💾 Import/Export
- **Sauvegarde locale** : Données stockées dans localStorage du navigateur
- **Export JSON** : Sauvegarde complète de vos données
- **Import facile** : Restauration rapide depuis un fichier JSON
- **Format standard** : Structure de données claire et extensible

### 🎨 Interface Utilisateur
- **Design moderne** : Interface élégante avec Tailwind CSS
- **Responsive** : Adapté aux ordinateurs, tablettes et mobiles
- **Animations fluides** : Transitions et animations CSS
- **État vide** : Interface d'accueil engageante pour les nouveaux utilisateurs

## 🚀 Technologies Utilisées

- **Frontend**
  - [Next.js 15](https://nextjs.org/) - Framework React full-stack
  - [TypeScript](https://www.typescriptlang.org/) - Typage statique
  - [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitaire
  - [Lucide React](https://lucide.dev/) - Icônes modernes

- **Outils de Développement**
  - [ESLint](https://eslint.org/) - Linting JavaScript/TypeScript
  - [clsx](https://github.com/lukeed/clsx) - Utilitaire de classes CSS conditionnelles
  - [UUID](https://github.com/uuidjs/uuid) - Génération d'identifiants uniques

- **Polices**
  - [Montserrat](https://fonts.google.com/specimen/Montserrat) - Titres
  - [Open Sans](https://fonts.google.com/specimen/Open+Sans) - Corps de texte

## 📦 Installation et Démarrage

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation

1. **Cloner le projet**
   ```bash
   git clone https://github.com/votre-repo/linkvault.git
   cd linkvault
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Démarrer le serveur de développement**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. **Ouvrir dans le navigateur**
   Visitez [http://localhost:3000](http://localhost:3000)

### Scripts Disponibles

```bash
npm run dev          # Serveur de développement
npm run build        # Build de production
npm run start        # Serveur de production
npm run lint         # Vérification ESLint
```

## 🏗️ Architecture du Projet

```
linkvault/
├── src/
│   ├── app/                 # App Router (Next.js 13+)
│   │   ├── globals.css     # Styles globaux et variables CSS
│   │   ├── layout.tsx      # Layout principal et métadonnées
│   │   └── page.tsx        # Page d'accueil
│   ├── components/         # Composants React
│   │   ├── ui/            # Composants UI réutilisables
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Tag.tsx
│   │   ├── Header.tsx      # En-tête avec navigation
│   │   ├── SearchBar.tsx   # Barre de recherche et filtres
│   │   ├── LinkCard.tsx    # Carte d'affichage d'un lien
│   │   └── LinkForm.tsx    # Formulaire d'ajout/édition
│   ├── hooks/             # Hooks personnalisés
│   │   ├── useLinks.ts    # Gestion des liens et tags
│   │   └── useLocalStorage.ts # Hook localStorage
│   └── lib/               # Utilitaires et types
│       ├── types.ts       # Types TypeScript
│       ├── storage.ts     # Fonctions de stockage
│       └── utils.ts       # Fonctions utilitaires
├── public/                # Assets statiques
└── package.json          # Configuration du projet
```

## 📖 Guide d'Utilisation

### Ajouter un Lien
1. Cliquez sur le bouton **"Ajouter un lien"** dans l'en-tête
2. Remplissez l'URL (obligatoire) et le titre (obligatoire)
3. Ajoutez une description optionnelle
4. Créez ou sélectionnez des tags
5. Cliquez sur **"Ajouter"**

### Rechercher des Liens
- Utilisez la barre de recherche pour une recherche textuelle
- Sélectionnez des tags pour filtrer par catégories
- Combinez recherche et tags pour des résultats précis
- Triez par date, titre ou URL

### Gérer les Tags
- Les tags sont créés automatiquement lors de l'ajout de liens
- Chaque tag a une couleur unique attribuée automatiquement
- Le nombre de liens par tag est affiché
- Les tags inutilisés sont automatiquement supprimés

### Sauvegarder vos Données
- **Export** : Cliquez sur "Exporter" pour télécharger un fichier JSON
- **Import** : Cliquez sur "Importer" pour restaurer depuis un fichier JSON
- Les données sont automatiquement sauvées dans votre navigateur

## 🎨 Personnalisation

### Couleurs et Thème
Les couleurs principales sont définies dans `src/app/globals.css` :
```css
:root {
  --primary: #3B82F6;        /* Bleu principal */
  --accent: #10B981;         /* Vert accent */
  --gray-50: #F8FAFC;        /* Arrière-plan */
}
```

### Polices
Modifiez les polices dans `src/app/globals.css` :
```css
--font-sans: 'Open Sans', system-ui, -apple-system, sans-serif;
--font-heading: 'Montserrat', system-ui, -apple-system, sans-serif;
```

## 🚀 Déploiement

### Vercel (Recommandé)
```bash
npm run build
npx vercel --prod
```

### Build de Production
```bash
npm run build
npm start
```

## 📊 Performance

- **Bundle size** : ~110kB (First Load JS)
- **SSG** : Génération statique pour un chargement rapide
- **Responsive** : Interface adaptée à tous les écrans

## 🔐 Sécurité

- **Validation d'URLs** : Vérification des URLs avant ajout
- **localStorage** : Données stockées localement, aucune transmission
- **HTTPS** : Compatible avec le déploiement sécurisé

## 💼 Opportunités Business

### Modèles de Monétisation
1. **Version Premium** : Fonctionnalités avancées (synchronisation cloud, équipes)
2. **SaaS** : Solution hébergée pour entreprises
3. **API** : Intégration avec d'autres outils de productivité
4. **Extensions** : Modules pour navigateurs

### Marché Cible
- **Développeurs** : Organisation de ressources techniques
- **Étudiants** : Gestion de liens éducatifs
- **Professionnels** : Veille et ressources métier
- **Créateurs de contenu** : Organisation de références

## 🗺️ Roadmap

### Version 1.1
- [ ] Synchronisation cloud (Firebase/Supabase)
- [ ] Comptes utilisateurs
- [ ] Partage de collections

### Version 1.2
- [ ] Extension navigateur
- [ ] Import depuis navigateurs
- [ ] Détection automatique de contenu

### Version 2.0
- [ ] Application mobile
- [ ] Intelligence artificielle pour catégorisation
- [ ] Analytics avancées

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

**LinkVault** - *Organisez vos liens, libérez votre productivité* 🚀

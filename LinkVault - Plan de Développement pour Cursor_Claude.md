# LinkVault - Plan de Développement pour Cursor/Claude

Ce document est un guide étape par étape pour le développement de l'application LinkVault en Next.js. Chaque tâche doit être validée et testée avant de passer à la suivante.

## Phase 1: Initialisation du Projet

- [ ] **Tâche 1.1: Créer le projet Next.js**
  - **Instruction:** Initialiser un nouveau projet Next.js avec TypeScript, Tailwind CSS, ESLint, et le dossier `src`.
  - **Commande:** `npx create-next-app@latest linkvault --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`
  - **Vérification:** S'assurer que le dossier `linkvault` est créé et que les dépendances de base sont installées.

- [ ] **Tâche 1.2: Installer les dépendances supplémentaires**
  - **Instruction:** Installer `lucide-react`, `clsx`, `uuid`, et `@types/uuid`.
  - **Commande:** `cd linkvault && npm install lucide-react clsx uuid @types/uuid`
  - **Vérification:** Vérifier que ces packages sont listés dans `package.json`.

- [ ] **Tâche 1.3: Copier le logo de l'application**
  - **Instruction:** Copier le fichier `linkvault_logo_final.png` (fourni séparément) dans le dossier `public` du projet Next.js et le renommer en `logo.png`.
  - **Commande:** `cp /home/ubuntu/linkvault_logo_final.png linkvault/public/logo.png`
  - **Vérification:** S'assurer que `linkvault/public/logo.png` existe.

## Phase 2: Configuration et Utilitaires

- [ ] **Tâche 2.1: Définir les types TypeScript**
  - **Instruction:** Créer le fichier `src/lib/types.ts` et y définir les interfaces `Link`, `Tag`, et `AppState` comme spécifié dans `linkvault_features_spec.md`.
  - **Vérification:** Compiler le projet (`npm run build`) pour vérifier l'absence d'erreurs de typage.

- [ ] **Tâche 2.2: Implémenter le stockage local**
  - **Instruction:** Créer le fichier `src/lib/storage.ts` et y implémenter les fonctions pour sauvegarder et charger les liens et tags depuis `localStorage`.
  - **Vérification:** Écrire un petit script de test ou utiliser la console du navigateur pour vérifier que les données peuvent être stockées et récupérées.

- [ ] **Tâche 2.3: Créer les utilitaires**
  - **Instruction:** Créer le fichier `src/lib/utils.ts` et y implémenter les fonctions utilitaires comme `cn`, `isValidUrl`, `formatUrl`, `getDomainFromUrl`, `getFaviconUrl`, `generateId`, `formatDate`, `getRandomColor`, et `debounce`.
  - **Vérification:** Tester chaque fonction utilitaire avec des valeurs d'entrée variées pour s'assurer de leur bon fonctionnement.

- [ ] **Tâche 2.4: Développer les hooks personnalisés**
  - **Instruction:** Créer `src/hooks/useLocalStorage.ts` et `src/hooks/useLinks.ts`. Le hook `useLinks` doit gérer l'état global des liens et tags, y compris l'ajout, la modification, la suppression, la recherche, le filtrage et le tri.
  - **Vérification:** S'assurer que les hooks gèrent correctement l'état et les interactions avec le stockage local.

## Phase 3: Composants UI de Base

- [ ] **Tâche 3.1: Créer le composant `Button`**
  - **Instruction:** Créer `src/components/ui/Button.tsx` avec les variantes `primary`, `secondary`, `outline`, `ghost` et les tailles `sm`, `md`, `lg`.
  - **Vérification:** Intégrer le bouton dans une page temporaire et vérifier son apparence et son comportement.

- [ ] **Tâche 3.2: Créer le composant `Input`**
  - **Instruction:** Créer `src/components/ui/Input.tsx` avec support pour label et messages d'erreur.
  - **Vérification:** Tester l'input avec et sans erreur, et vérifier le style.

- [ ] **Tâche 3.3: Créer le composant `Modal`**
  - **Instruction:** Créer `src/components/ui/Modal.tsx` pour les pop-ups, avec un titre, un bouton de fermeture et la gestion de l'état `isOpen`.
  - **Vérification:** Ouvrir et fermer la modale, vérifier le comportement du fond et de la touche `Escape`.

- [ ] **Tâche 3.4: Créer le composant `Tag`**
  - **Instruction:** Créer `src/components/ui/Tag.tsx` pour afficher les tags, avec support pour la couleur, le compteur, la sélection et la suppression.
  - **Vérification:** Afficher plusieurs tags avec différentes propriétés et vérifier leur rendu.

## Phase 4: Structure de l'Application et Pages

- [ ] **Tâche 4.1: Mettre à jour les styles globaux**
  - **Instruction:** Modifier `src/app/globals.css` pour inclure les polices Google Fonts (Montserrat et Open Sans), définir les variables CSS pour les couleurs, et ajouter les styles globaux pour le corps, les titres, les barres de défilement, et les animations (`fadeIn`).
  - **Vérification:** Lancer l'application et vérifier que les polices et les couleurs sont appliquées correctement.

- [ ] **Tâche 4.2: Mettre à jour le layout principal**
  - **Instruction:** Modifier `src/app/layout.tsx` pour définir les métadonnées de l'application (titre, description, mots-clés, icônes) et inclure le `body` avec la classe `antialiased`.
  - **Vérification:** Vérifier le titre de la page dans le navigateur et l'icône du site.

- [ ] **Tâche 4.3: Développer la page principale (`HomePage`)**
  - **Instruction:** Créer ou modifier `src/app/page.tsx` pour implémenter la logique principale de l'application. Cela inclut l'utilisation du hook `useLinks`, la gestion des modales d'ajout/édition, et l'intégration des composants `Header`, `SearchBar`, `LinkCard`, et `LinkForm`.
  - **Vérification:** Lancer l'application et vérifier que la page principale s'affiche sans erreur. Tester l'ouverture des modales d'ajout et d'édition.

## Phase 5: Fonctionnalités Clés

- [ ] **Tâche 5.1: Implémenter le composant `Header`**
  - **Instruction:** Créer `src/components/Header.tsx` avec le logo, le titre, le compteur de liens, et les boutons pour ajouter, importer et exporter des liens.
  - **Vérification:** Vérifier que l'en-tête s'affiche correctement et que les boutons déclenchent les actions appropriées (ouverture de modales, etc.).

- [ ] **Tâche 5.2: Implémenter le composant `SearchBar`**
  - **Instruction:** Créer `src/components/SearchBar.tsx` avec un champ de recherche, des contrôles de tri (par titre, date, URL, ordre asc/desc), et l'affichage des tags pour le filtrage.
  - **Vérification:** Tester la recherche textuelle, le tri et le filtrage par tags.

- [ ] **Tâche 5.3: Implémenter le composant `LinkCard`**
  - **Instruction:** Créer `src/components/LinkCard.tsx` pour afficher un lien individuel avec son titre, son URL, ses tags, sa date d'ajout, et des boutons pour visiter, éditer et supprimer.
  - **Vérification:** Ajouter plusieurs liens et vérifier leur affichage correct dans des cartes individuelles.

- [ ] **Tâche 5.4: Implémenter le composant `LinkForm`**
  - **Instruction:** Créer `src/components/LinkForm.tsx` pour l'ajout et l'édition de liens. Le formulaire doit inclure des champs pour le titre, l'URL, et la gestion des tags (ajout de nouveaux tags, sélection de tags existants).
  - **Vérification:** Tester l'ajout et l'édition de liens, y compris la gestion des tags.

## Phase 6: Tests et Optimisation

- [ ] **Tâche 6.1: Effectuer des tests fonctionnels complets**
  - **Instruction:** Tester toutes les fonctionnalités de l'application : ajout, modification, suppression de liens, recherche, filtrage par tags, tri, import/export de données. Vérifier la persistance des données après rafraîchissement de la page.
  - **Vérification:** Documenter les résultats des tests dans un fichier `test_results.md` (succès/échec pour chaque fonctionnalité).

- [ ] **Tâche 6.2: Vérifier la compatibilité et les performances**
  - **Instruction:** Tester l'application sur différents navigateurs (Chrome, Firefox, Safari) et sur des appareils mobiles pour vérifier le responsive design. Vérifier les temps de chargement et la fluidité de l'interface.
  - **Vérification:** Noter les observations et les éventuels problèmes de performance ou de compatibilité.

- [ ] **Tâche 6.3: Optimiser le build de production**
  - **Instruction:** Lancer un build de production (`npm run build`) et s'assurer qu'il n'y a pas d'erreurs. Vérifier la taille du bundle et les avertissements éventuels.
  - **Vérification:** Le build doit se terminer avec succès et sans erreurs critiques.

## Phase 7: Préparation des Livrables

- [ ] **Tâche 7.1: Créer le fichier `README.md`**
  - **Instruction:** Rédiger un fichier `README.md` complet pour le projet, incluant une vue d'ensemble, les fonctionnalités, les technologies utilisées, les instructions d'installation et de démarrage, l'architecture du projet, un guide d'utilisation, des informations sur la personnalisation, le déploiement, la performance, la sécurité, les tests, les opportunités business, la roadmap, le support et la licence.
  - **Vérification:** S'assurer que le `README.md` est clair, concis et couvre tous les aspects importants du projet.

- [ ] **Tâche 7.2: Créer le fichier `FLIPPA_LISTING.md`**
  - **Instruction:** Rédiger une description détaillée et optimisée pour une annonce sur Flippa, mettant en avant les opportunités d'investissement, les fonctionnalités, le potentiel de monétisation, les avantages techniques, l'analyse concurrentielle, les assets inclus, les opportunités d'expansion, le profil de l'acheteur idéal, les stratégies de croissance, le support technique, et les garanties.
  - **Vérification:** S'assurer que le contenu est persuasif et met en valeur le projet pour la vente.

- [ ] **Tâche 7.3: Créer le fichier `DEPLOYMENT_GUIDE.md`**
  - **Instruction:** Rédiger un guide de déploiement détaillé pour LinkVault, couvrant les prérequis, les plateformes recommandées (Vercel, Netlify, GitHub Pages, Firebase Hosting), la configuration avancée, la sécurité, le monitoring, le CI/CD, le dépannage, l'optimisation post-déploiement, les coûts d'hébergement et les recommandations finales.
  - **Vérification:** S'assurer que le guide est clair et facile à suivre pour un déploiement réussi.

- [ ] **Tâche 7.4: Créer une archive complète du projet**
  - **Instruction:** Compresser l'intégralité du dossier `linkvault`, ainsi que tous les fichiers `.md` générés (`README.md`, `FLIPPA_LISTING.md`, `DEPLOYMENT_GUIDE.md`, `linkvault_features_spec.md`, `test_results.md`), le logo final (`linkvault_logo_final.png`), et le dossier de présentation (`linkvault_presentation/`) dans une archive `.tar.gz`.
  - **Commande:** `tar -czf linkvault-complete-project.tar.gz linkvault/ *.md *.png linkvault_presentation/ screenshots/`
  - **Vérification:** Vérifier que l'archive est créée et contient tous les fichiers mentionnés.

Ce `dev_todo.md` est votre feuille de route. Suivez-le scrupuleusement, testez à chaque étape, et n'hésitez pas à poser des questions si une instruction n'est pas claire. Bonne chance !


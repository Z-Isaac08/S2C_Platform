# Stratégie de Refonte Spécifique au Frontend - Plateforme S2C

## 1. Vision UX/UI (User Experience & User Interface)

### 1.1. Identité Visuelle "Le Réveil Authentique"
- **Typographie :** Maintenir *Montserrat* pour la clarté et *Josefin Sans* pour l'aspect élégant, mais introduire une police de titrage plus impactante pour les sections de "Réveil".
- **Palette de Couleurs :**
    - **Violet (#S2C) :** Couleur de la royauté et de la spiritualité.
    - **Or/Jaune :** Symbole de la lumière et du divin.
    - **Nuances de Gris Sombre :** Pour un mode sombre (Dark Mode) en option, favorisant la contemplation.
- **Iconographie :** Utilisation d'icônes personnalisées ou d'un set cohérent (Lucide-react ou Phosphor Icons) pour remplacer les icônes disparates.

### 1.2. Accessibilité (a11y)
- Améliorer le contraste des textes sur les boutons.
- Ajouter des attributs `aria-label` sur tous les éléments interactifs.
- Assurer une navigation au clavier fluide (focus visible).

---

## 2. Optimisation avec Tailwind CSS 4.0

### 2.1. Utilisation des Nouvelles Capacités
- **Variables CSS Natives :** Exploiter la nouvelle architecture de Tailwind 4 pour une configuration plus dynamique sans fichier `tailwind.config.js` lourd.
- **Grilles Complexes :** Utiliser les nouvelles utilités de layout pour des sections plus créatives (Bento Grids pour la boutique).

### 2.2. Performance CSS
- Nettoyage des classes inutilisées.
- Utilisation de `@apply` avec parcimonie pour garder la flexibilité des classes utilitaires.

---

## 3. Dynamisme et Animations (Framer Motion)

### 3.1. Micro-interactions
- **Boutons :** Effets de scale au clic et de brillance au survol.
- **Cards (Boutique/Intervenants) :** Animations d'entrée en cascade (staggered animations) lors du défilement.
- **Chargement :** Amélioration du `Preloader` actuel avec une animation SVG plus légère et symbolique.

### 3.2. Transitions de Pages
- Mise en place de `AnimatePresence` pour des transitions fluides (fade-in/out) entre les différentes vues (Accueil -> Inscription -> Boutique).

---

## 4. Architecture des Composants React

### 4.1. Modularité et Réutilisabilité
- **Atomic Design :** Organiser les composants en Atomes (Boutons, Inputs), Molécules (Formulaires, Cartes) et Organismes (NavBar, Footer, Sections).
- **Separation of Concerns :** Extraire la logique métier des composants visuels vers des "Custom Hooks".

### 4.2. Gestion du Panier (Boutique)
- Actuellement basé sur `localStorage` dans le composant `StorePage`.
- **Amélioration :** Création d'un `CartContext` pour que l'état du panier soit accessible partout sur le site (ex: badge dans la NavBar).

---

## 5. Optimisation des Performances Frontend

### 5.1. Gestion des Images
- Remplacer les formats `.jpg` et `.png` par du `.webp` ou `.avif`.
- Mise en place du "Lazy Loading" natif sur toutes les images hors ligne de flottaison.
- Utilisation d'un CDN pour le service des assets médias.

### 5.2. Code Splitting
- Continuer l'utilisation de `React.lazy()` et `Suspense` pour charger les pages uniquement à la demande.

---

## 6. Prochaines Étapes Prioritaires

1.  **Refactorisation du Panier :** Migrer la logique locale vers un Context API.
2.  **Modernisation de la Hero Section :** Ajouter des éléments de parallaxe et des visuels plus immersifs.
3.  **Formulaires Dynamiques :** Améliorer le retour utilisateur (messages de succès/erreur animés) sur les pages d'inscription et de soutien.
4.  **Boutique Interactive :** Ajouter des filtres par catégorie et une vue détaillée des produits (Modale ou page dédiée).

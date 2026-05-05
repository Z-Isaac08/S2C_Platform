# 🎉 S2C Platform - Intégration React

## ✅ Conversion Complète HTML → React

Tout le contenu HTML des pages suivantes a été **intégré en React** avec le design Tailwind CSS moderne :

### 📄 Pages Converties

1. **refonte.html** → **HomePage.jsx**
   - Hero avec vidéo
   - Sections actualités et événements
   - Galerie avec lightbox
   - Départements
   - Témoignages
   - CTA Dons & Boutique

2. **boutique.html** → **StorePage.jsx**
   - Grille de produits filtrable
   - Catégories (Vêtements, Ouvrages, Accessoires)
   - Panier
   - Gestion du SOLD OUT

3. **dons.html** → **SoutienPage.jsx**
   - Formulaire de don avec montants prédéfinis
   - Onglets (Je donne / Je m'engage)
   - Montants personnalisés
   - Badge sécurité

4. **inscription.html** → **SignPage.jsx**
   - Formulaire d'inscription complet
   - Sélecteur de pays (via indicatifs)
   - Validation des champs
   - Message de confirmation

5. **departements.html** → **DepartmentsPage.jsx**
   - Grille Bento des 4 départements
   - S2C TRIBES
   - COMITÉ MUSICAL
   - SNT YTH (Jeunesse)
   - OUTREACH & MISSIONS

6. **propos.html** → **AboutPage.jsx**
   - Mission & Vision
   - Valeurs fondamentales
   - Historique des éditions
   - Équipe leadership

### 🎨 Styles & Thème

Le design utilise **Tailwind CSS v4** avec un thème personnalisé :

```css
--color-brand-yellow: #fcbe0c --color-brand-yellow-light: #fdc319 --color-brand-green: #00a19a
  --color-brand-white: #fdfdfd --color-brand-black: #1d1d1b --color-brand-black-soft: #2a2a28
  --font-display: 'Josefin Sans' --font-sans: 'Montserrat';
```

Classes utilitaires personnalisées :

- `.btn-primary` - Bouton jaune principal
- `.btn-secondary` - Bouton vert secondaire
- `.glass` - Effet glassmorphism
- `.text-gradient` - Gradient texte
- `.section-label` - Labels de section

### 🧭 Navigation & Routes

Le routing a été mis à jour dans **App.jsx** :

```javascript
/                    → HomePage
/soutien             → SoutienPage
/inscription         → SignPage
/boutique            → StorePage
/departements        → DepartmentsPage
/a-propos            → AboutPage
```

### 🔧 Composants Mis à Jour

- **NavBar.jsx** - Navigation responsive avec logo S2C
- **Footer.jsx** - Footer révisé avec design moderne
- **App.jsx** - Routes complètes

### 📦 Dépendances Ajoutées

- `@phosphor-icons/react` - Icônes modernes
- Toutes les autres dépendances étaient déjà présentes

### 🚀 Installation & Démarrage

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Build pour production
npm run build
```

### 📂 Structure des Fichiers

```
client/src/
├── pages/
│   ├── HomePage.jsx           (nouveau)
│   ├── StorePage.jsx          (nouvelle version)
│   ├── SoutienPage.jsx        (nouvelle version)
│   ├── SignPage.jsx           (nouvelle version)
│   ├── DepartmentsPage.jsx    (nouveau)
│   └── AboutPage.jsx          (nouveau)
├── components/
│   ├── NavBar.jsx             (mise à jour)
│   ├── Footer.jsx             (mise à jour)
│   └── ...
├── index.css                  (mise à jour - Tailwind personnalisé)
└── App.jsx                    (mise à jour - routes)
```

### 💾 Backup

Le React précédent a été sauvegardé dans :

```
client/src_backup/
```

Vous pouvez le consulter ou y revenir si nécessaire.

### ✨ Caractéristiques

✅ Design responsive (mobile, tablet, desktop)
✅ Animations fluides avec Tailwind
✅ Lightbox pour galeries
✅ Filtrage de produits
✅ Formulaires interactifs
✅ Navigation fluide
✅ Performance optimisée avec React lazy loading

### 📝 Notes

- Les vidéos doivent être dans `/public/` (vérifiez le chemin dans HomePage)
- Les images utilisent Unsplash pour les exemples (remplacer par vos images)
- Les formulaires font des appels API simulés (adapter à votre backend)
- Les exports sont prêts pour Phosphor Icons

---

**Prêt à explorer votre nouvelle plateforme React S2C ! 🚀**

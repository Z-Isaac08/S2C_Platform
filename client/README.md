# Plateforme de Soutien en Ligne

Une plateforme web du S2C permettant aux utilisateurs d’apporter de s'enregistrer pour l'event, d'acheter dans la boutique du S2C et aussi apporter un **soutien financier ponctuel ou récurrent**. Conçue avec **React**, **TailwindCSS** et **Vite** pour une expérience fluide, rapide et responsive.

---

## Fonctionnalités

- 💰 Paiement **ponctuel** ou **récurrent**
- 📱 Choix entre plusieurs **modes de paiement** (Carte bancaire, Mobile Money)
- 🧾 Formulaires dynamiques selon le type de soutien
- 🖥️ Navigation fluide avec gestion du scroll vers le haut
- 📦 Architecture modulaire et propre

---

## 🛠️ Stack technique

- **Frontend** : React.js (avec Vite)
- **Styling** : TailwindCSS
- **Routing** : React Router
- **State** : React Hooks
- **Lazy Loading** : React.lazy + Suspense
- **Backend** : ExpressJS

---

## Lancement du projet

### 1. Cloner le repo

```bash
git clone https://github.com/Z-Isaac08/S2C_Platform.git
cd plateforme-soutien
```
### 2. Installer les dépendances

```bash
npm install
```

### 3. Démarrer en mode developpement

```bash
npm run dev
```

## Structure du projet

.
├── public/                     # Icônes de paiement, images statiques
├── src/
│   ├── components/             # Composants réutilisables (FormPayPonct, FormPayRect, Hero, NavBar, etc.)
│   ├── pages/                  # Pages principales (HomePage, SoutienPage, etc.)
│   ├── App.jsx                 # Configuration des routes
│   ├── main.jsx                # Point d’entrée de l’application
│   └── index.css               # Fichier Tailwind
├── tailwind.config.js         # Configuration Tailwind custom
├── vite.config.js             # Configuration Vite
└── README.md

## Auteur

Développé avec ❤️ par la section DEV de la com S2C.
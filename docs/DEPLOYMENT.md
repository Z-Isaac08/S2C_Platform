# Guide de Déploiement : S2C Platform

Ce guide explique comment mettre en ligne la plateforme S2C en utilisant **Vercel** (Frontend), **Render** (Backend Node.js) et **Neon** (Base de données).

## 1. Base de Données (Neon)

Ta base de données est déjà configurée. Assure-toi de conserver précieusement ces deux variables dans ton environnement de production :

- `DATABASE_URL` : L'URL de connexion principale (utilisée par l'adaptateur Neon).
- `DIRECT_URL` : Utilisée par Prisma pour les migrations et le `db push`.

## 2. Déploiement du Backend (Render)

1. Crée un compte sur [Render.com](https://render.com/).
2. Clique sur **"New +"** > **"Web Service"**.
3. Connecte ton dépôt GitHub.
4. Configuration :
   - **Runtime** : `Node`
   - **Build Command** : `cd server && npm install && npx prisma generate`
   - **Start Command** : `cd server && node App.js`
5. **Variables d'Environnement (Advanced)** : Ajoute toutes les variables de ton fichier `.env` (DATABASE_URL, HUB2_API_KEY, SMTP_HOST, etc.).

## 3. Déploiement du Frontend (Vercel)

1. Crée un compte sur [Vercel.com](https://vercel.com/).
2. Importe ton projet GitHub.
3. Configuration :
   - **Framework Preset** : `Vite`
   - **Root Directory** : `client`
4. **Variables d'Environnement** :
   - `VITE_API_URL` : L'URL que Render t'aura donnée pour ton backend (ex: `https://s2c-api.onrender.com/api/v1`).
5. Clique sur **"Deploy"**.

## 4. Finalisation & Vérification

- Une fois le backend déployé sur Render, récupère l'URL du service.
- Ajoute cette URL dans la configuration CORS du backend (`App.js`) si nécessaire, ou utilise l'environnement pour la rendre dynamique.
- Teste un enregistrement de membre en production pour vérifier la liaison Front -> Back -> Neon -> Nodemailer.

## 5. Maintenance

- Pour toute modification du schéma de base de données :
  1. Modifie `schema.prisma`.
  2. Lance `npx prisma db push` (ou crée une migration).
  3. Le backend sur Render se mettra à jour automatiquement au prochain push GitHub.

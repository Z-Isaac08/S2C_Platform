# Système de Promesses de Dons & Rappels S2C

Ce document détaille l'architecture prévue pour la gestion des engagements de soutien réguliers sur la plateforme S2C.

## 1. Objectif
Permettre aux donateurs de s'engager sur une fréquence de don (Hebdomadaire, Mensuelle, etc.) et automatiser les relances par email pour assurer le suivi de ces engagements.

## 2. Interface Utilisateur (Frontend)
- **Champ Dynamique** : Dans la page de don (`DonatePage.jsx`), l'activation de l'option "Je m'engage" fait apparaître un sélecteur de fréquence.
- **Fréquences proposées** :
  - `WEEKLY` (Hebdomadaire)
  - `MONTHLY` (Mensuel)
  - `ANNUAL` (Annuel)
- **Validation** : Information transmise à l'API lors de l'appel `/donations/init`.

## 3. Architecture Backend
### Modèle de Données (Prisma)
Mise à jour du modèle `Donation` ou création d'un modèle `Pledge` :
- `frequency`: Enum (`WEEKLY`, `MONTHLY`, `ANNUAL`)
- `nextReminderDate`: DateTime (Date prévue pour la prochaine relance)
- `isActive`: Boolean (Pour permettre d'annuler un engagement)

### Logique de Rappel (Automation)
- **Tâche Planifiée (Cron Job)** : Utilisation de `node-cron` pour scanner la base de données chaque nuit.
- **Critères de sélection** : Identifier les dons dont la `nextReminderDate` est égale à la date du jour.
- **Action** : Envoi automatique d'un email de rappel via Nodemailer.

## 4. Design des Emails de Rappel
- **Identité Visuelle** : Respect strict de la charte S2C (Dark Mode, Brand Green #00a19a, Brand Yellow #fcbe0c).
- **Contenu** : 
  - Message de gratitude pour l'engagement initial.
  - Bouton d'action directe vers la page de paiement.
  - Lien pour modifier ou annuler l'engagement.

## 5. Sécurité & Respect de l'Utilisateur
- Possibilité de se désinscrire des rappels en un clic (Unsubscribe link).
- Validation Zod renforcée pour les fréquences de paiement.

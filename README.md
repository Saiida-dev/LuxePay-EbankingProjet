# 💳 LuxePay – Plateforme E-Banking intelligente

LuxePay est une application web de gestion bancaire offrant une expérience moderne, sécurisée et enrichie par l'IA. Développée avec Angular (frontend) et Spring MVC (backend), elle intègre également un assistant intelligent basé sur GPT-4 pour assister les clients dans la planification et la gestion de leurs opérations.

## 🚀 Fonctionnalités

- Authentification sécurisée (JWT + 2FA par SMS)
- Gestion de comptes bancaires (création, consultation)
- Virements bancaires
- Recharges téléphoniques / Internet
- Portefeuille crypto (wallet + transactions)
- Programme de parrainage
- Assistant IA pour recommandations personnalisées

## 🛠️ Technologies utilisées

- Frontend : Angular, TypeScript, Chart.js, ngx-toastr
- Backend : Spring MVC, Spring Security, PostgreSQL, Vonage API
- IA : Python, Flask, LangChain, OpenAI GPT-4
- Déploiement : Docker

## 📦 Installation locale

### Prérequis

- Node.js (v20 recommandé)
- Angular CLI
- Java JDK 21
- Maven
- Docker & Docker Compose

## 🚀 Lancer le projet avec Docker

```bash
# Cloner le projet
git clone https://github.com/Saiida-dev/LuxePay-EbankingProjet.git
cd luxepay-project

# Construire et lancer
docker-compose up --build
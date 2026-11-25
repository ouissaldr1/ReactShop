# ReactShop

Boutique en ligne dédiée à la maison et à la décoration, développée avec React et TypeScript.

Ce projet a été développé dans le cadre de mon apprentissage de React. Il met
principalement en pratique la gestion d'état, la navigation côté client,
les appels API et la construction d'interfaces avec TypeScript.

> Statut : première version fonctionnelle. Une seconde version, avec TanStack Query et Zustand, est prévue.

## Fonctionnalités

- Affichage des produits depuis DummyJSON
- Recherche par nom, filtrage par catégorie, tri par prix
- Pagination
- Fiche produit avec galerie d'images
- Ajout de produits au panier
- Modification des quantités
- État partagé dans toute l'application avec Context API.
- Persistance du panier avec `localStorage`
- Formulaire de commande avec validation
- Gestion des états de chargement, d'erreur et de panier vide
- Interface responsive

## Stack technique

React, TypeScript, Vite, Tailwind CSS, React Router, API DummyJSON, ESLint

## Installation et lancement

```bash
git clone https://github.com/ton-pseudo/reactshop.git
cd reactshop
npm install
npm run dev
```

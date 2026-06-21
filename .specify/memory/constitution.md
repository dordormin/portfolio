<!--
Sync Impact Report:
- Version change: 0.0.0 → 1.0.0
- Modified principles: Added 5 core principles
- Added sections: Governance
- Removed sections: N/A
- Templates requiring updates: ✅ None pending
-->
# MyPortfolio Constitution

## Core Principles

### I. Excellence Visuelle & WebGL
Le portfolio doit impressionner dès le premier regard. L'utilisation de la 3D (WebGL), d'animations fluides, et d'un design moderne (Glassmorphism, Dark mode) est prioritaire, sans jamais utiliser de templates génériques.

### II. Déploiement Conteneurisé (Docker First)
Le projet doit toujours pouvoir être compilé et servi via un conteneur Docker (utilisant Nginx pour les assets statiques) afin de garantir la stabilité sur le VPS Hostinger.

### III. Automatisation CI/CD
Le flux de travail GitHub Actions doit être maintenu fonctionnel. Aucune action manuelle sur le VPS ne doit être requise après un push sur la branche principale.

### IV. Optimisation des Performances
Les assets 3D et les images doivent être compressés rigoureusement. Le temps de chargement initial doit être minimal malgré l'utilisation intensive du WebGL.

### V. Code Limpide et Maintenable
Le code doit être structuré par composants réutilisables, commenté en français, avec un nommage explicite et sémantique.

## Governance

Toute modification de l'architecture, l'ajout de dépendances majeures, ou le changement des flux de déploiement doivent obligatoirement passer par le processus de planification Spec-Kit (`/speckit.plan`).
L'agent IA (Antigravity) doit toujours se référer à cette constitution avant de générer du code.

**Version**: 1.0.0 | **Ratified**: 2026-06-17 | **Last Amended**: 2026-06-17

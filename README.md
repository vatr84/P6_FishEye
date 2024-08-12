# Projet 6 (OpenClassrooms - Développeur d'application JavaScript React)
## Créez un site accessible pour une plateforme de photographes - site FishEye

## Introduction

FishEye est un site web dédié aux photographes indépendants, leur permettant de présenter leurs meilleurs travaux. Actuellement, le site web est en phase de mise à jour pour intégrer de nouvelles fonctionnalités et améliorer l'expérience utilisateur. Vous êtes chargé de créer un prototype fonctionnel du nouveau site web, en vous basant sur les maquettes approuvées et les spécifications fournies par notre cheffe de projet, Amanda.

## Objectifs du Projet

1. **Création d'un prototype fonctionnel** du site web FishEye.
2. **Respect des maquettes** fournies pour les pages principales et détaillées des photographes.
3. **Accessibilité** : Assurer que le site est accessible selon les normes indiquées.
4. **Navigation clavier** : Assurer que la navigation est fluide pour les utilisateurs de lecteurs d'écran et de navigation au clavier.
5. **Utilisation du pattern Factory Method** pour la création des médias (photos et vidéos).

## Contenu du Projet

- **HTML** : Structure des pages principales (`index.html`) et des pages de photographe (`photographer.html`).
- **CSS** : Styles pour les pages, incluant Flexbox et CSS Grid.
- **JavaScript** : Gestion de la logique des pages, y compris la récupération des données, l'affichage des photographes, et les interactions de la modal et de la lightbox.
- **Données** : Exemples de photos et vidéos, ainsi que des données au format JSON.

## Étapes du Projet

### 1. **Prise en main**
   - Affichez les pages HTML fournies dans votre navigateur.
   - Analysez le code existant (HTML, CSS, JavaScript) et effectuez des tests pour vérifier les connexions et la fonctionnalité.

### 2. **Intégration des données**
   - Importez les données JSON depuis le dossier `datas` et les images depuis `assets`.
   - Utilisez `fetch` pour récupérer les données des photographes et les afficher sur la page d'accueil.

### 3. **Développement de la page d'accueil**
   - Créez le HTML, le CSS et le JavaScript pour afficher les cartes des photographes.
   - Assurez-vous que la page respecte les normes d'accessibilité (balises `alt`, `aria-label`, etc.).

### 4. **Navigation vers la page de détail du photographe**
   - Créez des liens depuis la page d'accueil vers les pages détaillées des photographes.
   - Assurez-vous que les données de chaque photographe sont chargées dynamiquement en fonction du lien cliqué.

### 5. **Création de la page photographe**
   - Affichez les informations détaillées du photographe, les photos et les vidéos.
   - Intégrez une lightbox pour visualiser les photos et vidéos en plein écran.
   - Implémentez un formulaire de contact accessible.

### 6. **Fonctionnalités supplémentaires**
   - Ajoutez la fonctionnalité de like pour les photos et vidéos.
   - Implémentez un système de tri pour les œuvres sur la page détaillée du photographe.

### 7. **Validation et amélioration**
   - Réalisez un rapport d'accessibilité avec un validateur et corrigez les problèmes détectés.

## Recommandations

- **Accessibilité** : Assurez-vous que toutes les fonctionnalités sont accessibles via le clavier et les lecteurs d'écran.
- **Testez** les fonctionnalités en modifiant les propriétés CSS et en vérifiant les logs JavaScript.
- **Utilisez les patterns** et les meilleures pratiques pour le développement de JavaScript, notamment le pattern Factory Method pour la gestion des médias.

## Points de Vigilance

- Assurez-vous que les données JSON sont correctement intégrées et affichées.
- Veillez à ne pas modifier les données existantes dans les fichiers JSON.
- Ne sauvegardez pas les likes de manière persistante ; ils doivent être réinitialisés lors du rafraîchissement de la page.

## Ressources

- [Documentation Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Flexbox Documentation](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [CSS Grid Documentation](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Accessibilité avec aria-label et alt](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML)
- [Création d'une modale accessible](https://www.smashingmagazine.com/2018/10/accessible-modal-dialogs/)
- [Lightbox Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)

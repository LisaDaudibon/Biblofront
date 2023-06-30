# Projet Bibliophilea
### Projet final pour The Hacking Project

## Description
Bienvenue sur notre site de recherche et de découverte de livres ! Que vous soyez passionné de lecture ou à la recherche de nouvelles œuvres captivantes, vous êtes au bon endroit. Notre plateforme facilite la recherche et la gestion de vos livres préférés.

Sur notre site, vous pouvez vous inscrire et vous connecter pour accéder à un large éventail de fonctionnalités personnalisées. Vous pouvez explorer notre vaste collection de livres en utilisant notre système de recherche intuitif. Que vous cherchiez un roman, un ouvrage de non-fiction ou un livre pour enfants, nous avons une sélection diversifiée pour satisfaire tous les goûts.

Vous avez trouvé un livre qui vous intéresse ? Une fois connecté, il vous suffit de l'ajouter à votre liste de lecture personnelle. Cela vous permet de garder une trace de tous les livres que vous souhaitez lire, et vous pouvez y accéder facilement depuis votre page de profil. Vous pouvez également consulter les livres que vous avez déjà lus et laisser des critiques et des évaluations pour partager vos opinions avec la communauté.

Lien du front du site en production : https://biblofront.vercel.app/
Lien du back du site en production : https://bibloback.fly.dev/

## Membres du groupe
- Lisa Daudibon ([@LisaDaudibon](https://github.com/LisaDaudibon))
- Karine Da Silva ([@KarineDHoshi](https://github.com/KarineDHoshi))

## Cahier des charges
- Users stories, disponible sur [Trello](https://trello.com/b/Z6enKCr3/bibliophilea)
- Design du site, disponible sur [Figma](https://www.figma.com/file/uRhLGqQICvoBwltWtevLgU/Bibliophilea---UX?type=design&node-id=23%3A74&mode=design&t=BE6TTDzn20AP1KKx-1)
- Parcours utilisateur, disponible sur [Lucid](https://lucid.app/lucidchart/c5b84471-91be-49ba-a42b-9e3b5f00db26/edit?invitationId=inv_df78d465-6c57-4837-98a1-e723a0ec80b7)
- Base de données, disponible sur [Lucid](https://lucid.app/lucidchart/be1afbe0-d56f-4f66-a56b-4dc367683c0e/edit?viewport_loc=-2352%2C-911%2C4096%2C1724%2C0_0&invitationId=inv_fd6ddcef-7bf7-40d4-ba60-c3853a03e6b7)

## Versions, gems et API utilisées
React 18.2.0, Jotai 2.2.1, React-router-dom 6.13.0.
Pour récupérer les livres, nous avons utilisé l'API de google : [Google Book API](https://www.google.com/books/jsapi.js)

## Lancement du programme en local
Télécharger ou cloner le dossier en local. Lancer les commandes suivantes dans votre terminal : 
- `cd biblofront`
- `npm install`
- Renommer le fichier `.env` en `.env.development`
- Rajouter vos clés pour l'API google Books dans ce fichier renommé
- `npm run dev`

## Diagramme ER base de données et user flow
Ci-dessous un diagramme entité-relation de la base de données utilisée et un diagramme du parcours utilisateur :

<img src=/public/Bibliophilea.png width="700">
<img src=/public/UserFlow_Bibliophilea.png width="700">
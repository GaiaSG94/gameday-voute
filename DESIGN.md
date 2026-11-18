# DESIGN — Voûte

## V1 — 2026-11-18 (en cours)
- Brief `PROMPT-DESIGN.md` lancé. Branche `design/v1-planches`.
- Références décodées → `G-DESIGN/REFS.md`.
- Pages proposées → `G-DESIGN/PAGES.md` (4 pages, en attente de validation).
- Réorientation (demande de Gaia) : les planches s'appuient sur la planche de références **narratif-jeu**, dont le détail est dans `G-DESIGN/REFS.md`.
- Planches de la page Jeu produites (les 2 cadres côte à côte, données de démo Arch No. 23, état « 5 voussoirs posés, 1 en main ») :
  1. `G-DESIGN/planches/v1/01-diorama.html`. **Diorama** : poussière `#efe8db`, calcaire `#d8cdbb`, ombre `#4a3b2a`, accent terre cuite `#b8643a`. Serif italique et grotesque. Arc sur un îlot flottant dans la brume, pierres éclairées en plein jour. Reste au plus près de la direction de départ.
  2. `G-DESIGN/planches/v1/02-croquis.html`. **Croquis** : papier `#f4efe4`, encre `#221c16`, accent sanguine `#d2553a`. Capitales grasses, pilules à ombre dure. Trait tremblé, pierres en autocollants, foule de maçons à bulles. S'écarte de la direction de départ.
  3. `G-DESIGN/planches/v1/03-nuit.html`. **Nuit de chantier** : nuit `#15100e`, calcaire `#d8cdbb`, accent ambre `#f2a93b`. Capitales étroites extrudées, panneau en verre fumé. Projecteur, poussière dans le faisceau, marques de tâcheron à la craie, série en bâtons.
- Source des planches : `G-DESIGN/planches/src/` (`python3 build.py` régénère `v1/`). Chaque `.html` produit est autonome, sans réseau.
- Polices : les planches utilisent des polices système (P052, URW Gothic, Nimbus Sans Narrow, Ubuntu Sans). L'app devra embarquer des équivalents sous licence OFL (CSP : aucune police distante).
- Questions ouvertes pour Gaia :
  1. 8 voussoirs **plus** une clé (9 pièces, 4 de chaque côté, hypothèse dessinée), ou 8 pièces clé comprise ?
  2. Une seule tentative par jour, ou des essais après effondrement ?
  3. Croquis : la foule de maçons à bulles est-elle acceptée comme décor de la communauté, ou faut-il la considérer comme une feature à ajouter à `IDEE.md` ?
- En attente : validation d'une direction (étape B), puis STYLE.md et déclinaison.

## V2 — 2026-11-18 · Croquis retenu, approfondi
- Retour de Gaia sur la V1 : garder **02 Croquis**, la rendre « plus dessin/3D » et en faire une vraie identité visuelle sur l'ensemble de la page.
- Planche : `G-DESIGN/planches/v2/02-croquis.html` (la V1 reste intacte dans `v1/`).
- **Règle d'identité unique : tout est un bloc dessiné en perspective cavalière.**
  - Fuyante : 8 px vers le haut à droite, pour tous les éléments (pierres, piédroits, sol, logo, cartes, jauge, badge, bulles).
  - Lumière : vient d'en haut à gauche. Faces éclairées en `#f1eadb`, faces à l'ombre en `#cdbfa5` et hachurées à 45°. Ombres portées douces et grises au sol.
  - Trait : encre `#221c16` de 1,6 à 2,2 px, légèrement tremblé (filtre de déplacement).
  - Accent unique : sanguine `#d2553a`, réservée à l'emplacement suivant, à la pierre en main, au chapeau des maçons et au logo.
- Changements par rapport à la V1 :
  - Voussoirs, piédroits (3 assises et une imposte) et dalle de sol sont dessinés en volume, avec leurs faces visibles calculées.
  - La pierre en main descend au bout d'une corde, tenue par une louve de maçon. Son ombre tombe sur l'emplacement.
  - Les cercles d'épure (intrados, extrados, centre) sont tracés en pointillés au crayon derrière l'arc.
  - Logo VOÛTE : capitales extrudées, l'accent circonflexe est remplacé par un petit arc à clé.
  - La règle du jeu devient une note épinglée par un ruban adhésif.
  - La progression est une rangée de petits blocs ; la clé est plus haute et en pointillés.
  - Le badge de série est un arc rouge extrudé ; les cartes de pierres sont extrudées et s'enfoncent au survol.
  - Les maçons sont en volume (ombrés, outils) et leurs bulles ont une épaisseur.
  - Les chiffres de la communauté ont leurs pictos (un maçon, un arc).
  - La planche elle-même adopte l'identité : papier pointé, encre, cadres extrudés.
- Questions toujours ouvertes : 8 + clé (dessiné) ou 8 clé comprise ; tentative unique ou essais ; foule de maçons comme décor ou comme feature.
- Suite : si la V2 est validée, rédaction de `G-DESIGN/STYLE.md` puis planches Post, Carte de fin, Séries & classement.

## V2.1 — 2026-11-18 · Style verrouillé pour la déclinaison, pages restantes
- Gaia a validé la V2 Croquis pour la page Jeu. Le style est formalisé dans `G-DESIGN/STYLE.md` : règle unique, palette, typographie, grille, composants, mouvement et états.
- Planches produites dans la continuité stricte du style :
  - `v2/01-post.html` (**Post**) : le chantier avant la première pierre. Piédroits montés, 8 voussoirs et la clé livrés en tas, maçons qui attendent (« morning. », « who's first? »), un seul bouton rouge.
  - `v2/03-carte-de-fin.html` (**Carte de fin**), en deux états.
    - Fermé : la clé passe en sanguine, les maçons lèvent les bras, la série passe à 13 (+1).
    - Effondré, dans un 3e cadre mobile : les piédroits restent debout, les voussoirs sont à terre dans la poussière, avec « fell at stone 6 of 8 ».
    - Dans les deux cas, un commentaire pré-rempli et « Post to comments ».
  - `v2/04-series-classement.html` (**Séries & classement**) :
    - la série est une assise de 14 blocs (fermé, tombé, manqué), avec le record ;
    - l'histogramme « où l'arc est tombé » est fait de colonnes de blocs ;
    - le classement des plus longues séries garde ta ligne toujours visible.
- Le source est factorisé : `planches/src/pages/kit.{js,css}` contient les pierres posées au sol, les poses des maçons, les bulles, les nuages de poussière, les boutons, les notes et les titres en relief. Le core gère plusieurs écrans (`data-screen`).
- Données de démo inventées, à confirmer :
  - le record de 21 jours ;
  - le classement (u/quarry_owl…, toi au rang 212) ;
  - la répartition des chutes par pierre ;
  - le texte des commentaires pré-remplis ;
  - « New arch tomorrow », qui suppose un renouvellement à heure fixe, sans compte à rebours tant qu'elle n'est pas connue.
- Questions ouvertes :
  1. 8 voussoirs + clé, ou 8 pièces clé comprise ?
  2. Une seule tentative par jour, ou des essais ?
  3. Un effondrement garde-t-il la série ? Elle est dessinée comme conservée à 12 (« came down » compte comme joué).
  4. Les maçons : décor ou feature ?
- Suite : valider les 3 pages, puis `/lock`.

## LOCK — 2026-11-18
- Gaia a validé les pages Post, Carte de fin et Séries & classement. Les 4 pages de `PAGES.md` ont toutes leur planche validée, et le style est **verrouillé** (`/lock`).
- Planches de référence pour le build : `G-DESIGN/planches/v2/` (01-post, 02-croquis = Jeu, 03-carte-de-fin, 04-series-classement). La V1 est conservée dans `v1/` pour l'historique.
- Questions produit encore ouvertes, à trancher dans `IDEE.md` avant le développement :
  1. 8 voussoirs + clé ou 8 pièces clé comprise ;
  2. tentative unique ou essais ;
  3. effet d'un effondrement sur la série ;
  4. maçons comme décor ou comme feature.
- Notes pour l'implémentation (Devvit Web) :
  - embarquer des polices OFL équivalentes, sans CDN à cause de la CSP ;
  - dessin 100 % SVG/CSS ;
  - `prefers-reduced-motion` respecté ;
  - le filtre de tremblé (feDisplacementMap) est à tester à 60 fps sur mobile, avec un repli possible sur des tracés déjà déformés.

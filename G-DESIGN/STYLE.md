# STYLE — Voûte · Croquis V2 (validé et **verrouillé** le 2026-11-18)


> **Verrouillé.** Fin des explorations : tout nouvel écran ou état se dessine avec ce document, sans ajouter de vocabulaire. Toute évolution passe par une nouvelle version datée dans `DESIGN.md`.
Référence visuelle : `planches/v2/02-croquis.html`. Source des valeurs : `planches/src/themes/02-croquis-v2.*`.

## 1. La règle unique

**Tout est un bloc dessiné à l'encre, vu en perspective cavalière.**
- Fuyante : vers le haut à droite, **8 px** dans la scène et **3 à 5 px** dans l'interface. Elle ne change jamais de sens.
- Lumière : vient d'en haut à gauche. Les faces tournées vers le haut sont claires ; les faces tournées vers la droite sont à l'ombre et hachurées à 45°.
- Ombre portée : grise, douce et floue, posée au sol en bas à droite de l'objet. Jamais noire, jamais nette.
- Trait : encre, légèrement tremblé (déplacement de bruit, amplitude 2,2), extrémités arrondies.

Si un élément ne peut pas s'expliquer comme un bloc, une note de papier ou un trait d'encre, il n'a pas sa place.

## 2. Palette

| Rôle | Nom | Hex | Usage |
|---|---|---|---|
| Fond | Papier | `#f4efe4` | Fond du jeu, avec une trame de points `rgba(34,28,22,.10)` tous les 14 px |
| Surface | Papier clair | `#fffdf7` | Cartes, notes, pierre en main, bulles |
| Pierre | Face | `#e8dfcd` | Face avant des voussoirs et des piédroits |
| Pierre | Dessus | `#f1eadb` | Faces éclairées de l'épaisseur |
| Pierre | Ombre | `#cdbfa5` | Faces à l'ombre, toujours avec la hachure |
| Trait | Encre | `#221c16` | Contours, texte, épaisseurs de l'interface |
| Texte secondaire | Encre douce | `#6f6556` | Légendes, libellés |
| **Accent unique** | Sanguine | `#d2553a` | Emplacement suivant, pierre en main, arc du logo, chapeaux des maçons, chiffre clé d'un écran |

Une seule couleur d'accent, et pas de dégradé. Les fonds teintés de l'accent sont limités à `#fbe6de` ou à une hachure sanguine à 55 %.

## 3. Typographie

| Niveau | Police (planche) | Taille desktop / mobile | Usage |
|---|---|---|---|
| Logo | Grotesque géométrique grasse (URW Gothic Demi), capitales, contour encre 1,8 px, fond papier, relief 5 px | 40 / 32 | VOÛTE, avec un petit arc rouge à la place du circonflexe |
| Titre d'écran | Même grotesque, capitales, encre pleine | 28 / 24 | « ARCH CLOSED », « YOUR STREAK »… |
| Chiffre héros | Même grotesque, en relief | 15–56 | 12, 41 %, 1,284 |
| Interface | Sans humaniste (Ubuntu Sans) 400/600/700 | 12–13 | Libellés, boutons, compteurs |
| Voix manuscrite | Serif italique (URW Bookman Italic) | 10–14 | Notes, bulles des maçons, annotations (« here next ») |

Pour l'app : les polices seront embarquées en OFL, sans CDN à cause de la CSP. Équivalents à valider : Didact Gothic ou Questrial (logo et titres), Ubuntu Sans (interface), une serif italique libre (voix manuscrite).

## 4. Grille et cadre

- Desktop, dans le post : zone de jeu de **740 × 560**. Scène à gauche, colonne de 236 px à droite (progression, pierres, communauté).
- Mobile : **390 × 604** pour la zone de jeu. Empilement : en-tête (≈ 90), scène (≈ 300), progression, pierres en ligne de 4, pied.
- Marges : 22 px sur desktop, 16 px sur mobile. Espacements sur une base de 2 : 4, 6, 8, 10, 12, 14, 16.
- Tout tient dans le cadre : aucun défilement dans l'écran de jeu.

## 5. Composants

| Composant | Dessin |
|---|---|
| **Bloc** (carte, badge, bouton) | Fond papier clair, bord encre 2 px, rayon 14 px, relief `1px -1px … 5px -5px` en encre |
| **Bouton principal** | Bloc pilule (rayon 999), fond sanguine, texte papier clair en 700, relief 5 px. Au survol, il s'enfonce : translation de (-2, 2) et relief réduit à 3 px |
| **Bouton secondaire** | Même bloc, fond papier clair, texte encre |
| **Note** | Rectangle papier clair, bord 2 px, rayon 4, rotation de -1,2°, ruban adhésif sanguine à 28 % en haut à gauche ; texte dans la voix manuscrite |
| **Progression** | Une rangée de 9 petits blocs de 14 px (la clé fait 20 px). Posé : hachuré ; en cours : sanguine ; à venir : pointillé à 45 % |
| **Pierre-autocollant** | La pierre en volume, avec un liseré papier clair de 10 px décalé de (3, -3) |
| **Bulle** | Pilule papier clair, bord 1,6 px, relief 3 px, queue triangulaire ; texte dans la voix manuscrite, 10 px |
| **Maçon** | Corps en capsule, tête ronde, moitié droite hachurée, ombre au sol ; chapeau sanguine pour un sur deux |
| **Picto** | Un maçon (le nombre de joueurs), un arc (l'arc fermé ou le pourcentage), un arc rouge en relief (la série) |

## 6. Mouvement

| Moment | Durée | Courbe | Effet |
|---|---|---|---|
| Pierre en main | 2,6 s en boucle | ease-in-out | Balance de -5° à -3° et monte de 4 px au bout de la corde |
| Emplacement suivant | 1,8 s en boucle | ease-in-out | Opacité de 0,55 à 1 |
| Poussière | 3,2 s en boucle | linéaire | Grains qui tombent de 70 px sous la pierre en main |
| Pose réussie | 180 ms | ease-out | La pierre descend dans l'emplacement, la poussière s'écrase et l'assise « tasse » de 2 px |
| Effondrement | 900 ms | gravité (ease-in) | Les voussoirs tombent dans l'ordre inverse, rebondissent une fois et finissent en tas |
| Bloc enfoncé | 150 ms | ease-out | Translation de (-2, 2) et relief réduit |

`prefers-reduced-motion` coupe toutes les boucles ; la pose et l'effondrement deviennent un fondu.

## 7. Règles d'états

| État | Rendu |
|---|---|
| Emplacement suivant | Hachure sanguine, contour sanguine en pointillés 2,4 px, pulsation |
| Pierre posée | Face `#e8dfcd`, deux coups de ciseau, épaisseur ombrée |
| Pierre en main | Face papier clair, corde et louve, ombre douce sur l'emplacement |
| À venir | Contour encre à 30 % en pointillés, sans remplissage |
| Clé (verrouillée) | Pointillés encre, légende « Keystone · last » |
| Arc fermé | Arc complet ; l'accent passe sur la clé et les maçons lèvent les bras |
| Effondré | Piédroits debout, voussoirs en tas au sol, poussière en nuage hachuré |
| Désactivé | Opacité 0,55 à 0,7, pointillés, aucun relief |

## 8. Interdits propres à ce style

- Pas de volume « gratuit » : ce qui est en volume est un bloc, et la direction de la fuyante est fixe.
- Pas de seconde couleur d'accent, d'emoji, de dégradé ni d'ombre noire nette.
- Pas d'image matricielle : tout est en SVG ou CSS, pour rester léger et net dans le post.

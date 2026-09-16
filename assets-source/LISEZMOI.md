# Sources graphiques

Fichiers d'origine, **non publiés** : ils ne partent pas dans `dist/`.

- `logo-source.png` — logo officiel en pleine résolution (352×245).
  Les versions servies par le site en sont dérivées :

  ```bash
  node -e "const s=require('sharp');s('assets-source/logo-source.png').resize({width:220}).webp({quality:88,effort:6}).toFile('public/logo.webp')"
  node -e "const s=require('sharp');s('assets-source/logo-source.png').resize({width:220}).png({compressionLevel:9,palette:true}).toFile('public/logo.png')"
  ```

  Le logo est affiché entre 29 et 55 pixels de large : 220 pixels couvrent
  largement les écrans à forte densité. L'original pesait 76 ko, les deux
  dérivés 21 et 13 ko.

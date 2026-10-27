# KORALL BS

Landing de KORALL BS (KRL), equipo internacional de entrenamiento y competición de Brawl Stars, construida con React y Vite.

La interfaz está disponible en español e inglés: `/?lang=es` y `/?lang=en`. El idioma elegido se puede compartir y también se guarda en el almacenamiento local del navegador. La solicitud de tryout valida los campos en el navegador y abre un borrador de correo a `hola@korall.team`; la web no almacena ni envía los datos por sí misma. Para recibir solicitudes sin una aplicación de correo, habrá que configurar un servicio de formularios o un endpoint propio antes del lanzamiento.

La tipografía se carga desde Google Fonts. Los artes y capturas de Brawl Stars se sirven localmente desde `public/images/brawl-stars/`.

## Medios de Brawl Stars

Los tres recursos gráficos proceden del CDN oficial de Supercell y se muestran sin modificar:

- Captura in-game publicada en la página oficial: https://supercell.com/en/games/brawlstars/
- Arte de la noticia `#CreatorCoffins`: https://supercell.com/en/games/brawlstars/blog/community/creatorcoffins-earn-rewards-by-supporting-your-favorite-creator/
- Banner `Your Path to BSC 2027`: https://supercell.com/en/games/brawlstars/blog/esports/your-path-to-bsc-2027/

El sitio incluye el aviso de contenido no oficial requerido por la [política de Fan Content de Supercell](https://supercell.com/en/fan-content-policy/). La política prohíbe modificar los assets de Supercell; por ello se conserva el color original de las imágenes y el tratamiento monocromo se aplica al resto de la interfaz. KORALL BS no está afiliado ni respaldado por Supercell.

## Preview local

```sh
npm install
npm run dev
```

Para generar y probar el build de producción, usa `npm run build` y `npm run preview`.

## Publicación

La landing declara `https://korall-bs.presentto.online/` como URL canónica y enlaza el sitio matriz en `https://korall.presentto.online/`. Para activar el dominio nuevo, despliega la raíz de este repositorio en el hosting elegido y asocia `korall-bs.presentto.online` al proyecto; el dominio actualmente responde `DEPLOYMENT_NOT_FOUND` en Vercel.

El portal oficial del Brawl Stars Championship está en `https://event.supercell.com/brawlstars`. KORALL BS se presenta como equipo independiente y no afiliado a Supercell.
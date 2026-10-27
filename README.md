# KORALL BS

Landing de KORALL BS (KRL), equipo internacional de entrenamiento y competición de Brawl Stars. El sitio es estático y no requiere dependencias de build.

La interfaz está disponible en español e inglés: `/?lang=es` y `/?lang=en`. El idioma elegido se puede compartir y también se guarda en el almacenamiento local del navegador. La solicitud de tryout valida los campos en el navegador y abre un borrador de correo a `hola@korall.team`; la web no almacena ni envía los datos por sí misma. Para recibir solicitudes sin una aplicación de correo, habrá que configurar un servicio de formularios o un endpoint propio antes del lanzamiento.

La tipografía y las fotografías se cargan desde Google Fonts y Unsplash, por lo que requieren conexión a Internet.

## Preview local

```sh
python3 -m http.server 4173
```

Abre `http://localhost:4173`.

## Publicación

La landing declara `https://korall-bs.presentto.online/` como URL canónica y enlaza el sitio matriz en `https://korall.presentto.online/`. Para activar el dominio nuevo, despliega la raíz de este repositorio en el hosting elegido y asocia `korall-bs.presentto.online` al proyecto; el dominio actualmente responde `DEPLOYMENT_NOT_FOUND` en Vercel.

El portal oficial del Brawl Stars Championship está en `https://event.supercell.com/brawlstars`. KORALL BS se presenta como equipo independiente y no afiliado a Supercell.
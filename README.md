# Espirulina Fusion landing page

Sitio web estático para Natural Smart Drinks y su producto estrella Espirulina Fusion.

## Contenido
- `index.html`: landing page principal en español con secciones de beneficios, ingredientes, testimonios y llamados a la acción hacia WhatsApp e Instagram.
- `assets/css/styles.css`: hoja de estilos con tipografías modernas, paleta fresca e interacción responsiva.
- `assets/js/main.js`: pequeños realces de experiencia (año dinámico y desplazamiento suave).

## Previsualización local

Abre `index.html` directamente en tu navegador o ejecuta un servidor estático sencillo, por ejemplo:

```bash
python -m http.server 8000
```

Luego visita [http://localhost:8000](http://localhost:8000) para ver el sitio.

## Personalización
- Actualiza los enlaces de WhatsApp y redes sociales si cambian los canales oficiales.
- Reemplaza las imágenes de Unsplash por fotografías propias de la marca para mayor coherencia visual.
- Ajusta la paleta en `styles.css` para alinear con futuras extensiones de marca.

## Despliegue en Netlify

Este proyecto ya incluye un `netlify.toml` con la configuración mínima para publicar el sitio estático. Para desplegarlo:

1. Instala la [CLI de Netlify](https://docs.netlify.com/cli/get-started/):
   ```bash
   npm install -g netlify-cli
   ```
2. Inicia sesión y vincula el sitio con tu cuenta:
   ```bash
   netlify login
   netlify init
   ```
   - Directorio a publicar: `.`
   - Comando de build: deja el campo vacío (Netlify solo servirá archivos estáticos).
3. Despliega un entorno de prueba para validar que todo funciona:
   ```bash
   netlify deploy
   ```
4. Cuando estés listo, publica en producción:
   ```bash
   netlify deploy --prod
   ```

La configuración fija la versión de Node 18 y aplica una redirección 200 para servir `index.html` ante cualquier ruta.

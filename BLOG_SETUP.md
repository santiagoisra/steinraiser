# Guía de Configuración del Blog con Contentful

## 🚀 Configuración Rápida (5 minutos)

### Paso 1: Crear cuenta en Contentful
1. Andá a [contentful.com](https://www.contentful.com)
2. Hacé clic en "Start building for free"
3. Creá tu cuenta (es gratis hasta 25,000 registros/mes)

### Paso 2: Crear un Space
1. Una vez logueado, hacé clic en "Create space"
2. Elegí "I want to create an empty space"
3. Nombralo "Blog Steinraiser"

### Paso 3: Crear Content Type para Blog Posts
1. En tu space, andá a "Content model"
2. Hacé clic en "Add content type"
3. Nombralo "Blog Post" (ID: `blogPost`)
4. Agregá estos campos:

**Campos requeridos:**
- **Title** (Short text) - ID: `title`
- **Slug** (Short text) - ID: `slug` 
- **Excerpt** (Long text) - ID: `excerpt`
- **Content** (Rich text) - ID: `content`
- **Category** (Short text) - ID: `category`
- **Read Time** (Short text) - ID: `readTime`
- **Featured Image** (Media) - ID: `featuredImage`

### Paso 4: Obtener las credenciales
1. Andá a "Settings" → "API keys"
2. Hacé clic en "Add API key"
3. Copiá:
   - **Space ID**
   - **Content Delivery API - access token**

### Paso 5: Configurar en el sitio web
1. Abrí el archivo `js/blog.js`
2. Reemplazá en las líneas 7-8:
```javascript
space: 'TU_SPACE_ID', // Pegá tu Space ID acá
accessToken: 'TU_ACCESS_TOKEN', // Pegá tu Access Token acá
```

### Paso 6: Crear tu primer artículo
1. En Contentful, andá a "Content"
2. Hacé clic en "Add entry" → "Blog Post"
3. Completá los campos:
   - **Title**: "Mi primer artículo"
   - **Slug**: "mi-primer-articulo"
   - **Excerpt**: "Resumen del artículo..."
   - **Content**: El contenido completo
   - **Category**: "novedades" (o "jurisprudencia", "casos")
   - **Read Time**: "5 min lectura"
   - **Featured Image**: Subí una imagen
4. Hacé clic en "Publish"

## ✅ ¡Listo!

Tu blog ahora está conectado a Contentful. Cada vez que publiques un artículo nuevo en Contentful, aparecerá automáticamente en tu sitio web.

## 📝 Categorías disponibles:
- `jurisprudencia` - Para fallos y decisiones judiciales
- `novedades` - Para cambios en la legislación
- `casos` - Para casos prácticos y ejemplos

## 🎯 Ventajas de esta solución:
- ✅ **Súper fácil** de usar (como Google Docs)
- ✅ **Sin código** - solo escribir y publicar
- ✅ **Imágenes optimizadas** automáticamente
- ✅ **Backup automático** de todo el contenido
- ✅ **Editor visual** con formato rich text
- ✅ **Versionado** - podés ver versiones anteriores
- ✅ **Colaboración** - podés invitar editores

## 🔧 Funciones adicionales disponibles:
- Programar publicaciones
- Previsualizar antes de publicar
- SEO automático
- Búsqueda de contenido
- Analytics de contenido

¿Necesitás ayuda con la configuración? ¡Escribime!
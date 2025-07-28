// Blog Management System with Contentful Integration
// Carga la configuración desde blog-config.js

class BlogManager {
    constructor() {
        this.articles = [];
        this.currentCategory = 'todos';
        this.isContentfulConfigured = false;
        this.init();
    }

    async init() {
        // Cargar configuración
        await this.loadConfig();
        
        // Intentar cargar desde Contentful, sino usar datos de ejemplo
        await this.loadArticles();
        
        // Configurar event listeners
        this.setupEventListeners();
        
        // Renderizar artículos iniciales
        this.renderArticles();
    }

    async loadConfig() {
        try {
            // Verificar si la configuración está disponible
            if (typeof CONTENTFUL_CONFIG !== 'undefined' && 
                CONTENTFUL_CONFIG.space !== 'tu_space_id_aqui' && 
                CONTENTFUL_CONFIG.accessToken !== 'tu_access_token_aqui') {
                this.contentfulConfig = CONTENTFUL_CONFIG;
                this.isContentfulConfigured = true;
            }
        } catch (error) {
            console.log('Configuración de Contentful no encontrada, usando datos de ejemplo');
        }
    }

    async loadArticles() {
        if (this.isContentfulConfigured) {
            try {
                await this.loadFromContentful();
                console.log('✅ Artículos cargados desde Contentful');
            } catch (error) {
                console.warn('⚠️ Error cargando desde Contentful, usando datos de ejemplo:', error);
                this.loadSampleArticles();
            }
        } else {
            console.log('📝 Usando artículos de ejemplo (Contentful no configurado)');
            this.loadSampleArticles();
        }
    }

    async loadFromContentful() {
        const response = await fetch(
            `https://cdn.contentful.com/spaces/${this.contentfulConfig.space}/environments/${this.contentfulConfig.environment}/entries?content_type=blogPost&include=2`,
            {
                headers: {
                    'Authorization': `Bearer ${this.contentfulConfig.accessToken}`
                }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        this.articles = data.items;
    }

    loadSampleArticles() {
        if (typeof SAMPLE_ARTICLES !== 'undefined') {
            this.articles = SAMPLE_ARTICLES;
        } else {
            // Fallback si no se puede cargar la configuración
            this.articles = [
                {
                    sys: { id: 'sample-1' },
                    fields: {
                        title: 'Artículo de Ejemplo',
                        slug: 'articulo-ejemplo',
                        excerpt: 'Este es un artículo de ejemplo. Configurá Contentful para ver tus artículos reales.',
                        content: '<p>Configurá Contentful siguiendo la guía en BLOG_SETUP.md para gestionar tu blog fácilmente.</p>',
                        category: 'novedades',
                        readTime: '2 min lectura',
                        featuredImage: {
                            fields: {
                                file: {
                                    url: 'images/blog/blog-1.jpg'
                                }
                            }
                        }
                    }
                }
            ];
        }
    }

    setupEventListeners() {
        // Botones de categoría
        const categoryButtons = document.querySelectorAll('.category-btn');
        categoryButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const category = btn.dataset.category;
                this.filterByCategory(category);
                
                // Actualizar estado activo
                categoryButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Enlaces de artículos
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('blog-link') || e.target.closest('.blog-link')) {
                e.preventDefault();
                const link = e.target.classList.contains('blog-link') ? e.target : e.target.closest('.blog-link');
                const articleId = link.dataset.articleId;
                this.openArticle(articleId);
            }
        });
    }

    filterByCategory(category) {
        this.currentCategory = category;
        this.renderArticles();
    }

    renderArticles() {
        const blogGrid = document.querySelector('.blog-grid');
        if (!blogGrid) return;

        // Mostrar loading
        blogGrid.innerHTML = '<div class="blog-loading">Cargando artículos...</div>';

        // Simular delay para mejor UX
        setTimeout(() => {
            const filteredArticles = this.currentCategory === 'todos' 
                ? this.articles 
                : this.articles.filter(article => article.fields.category === this.currentCategory);

            if (filteredArticles.length === 0) {
                blogGrid.innerHTML = `
                    <div class="col-12 text-center">
                        <p class="text-muted">No hay artículos en esta categoría.</p>
                    </div>
                `;
                return;
            }

            blogGrid.innerHTML = filteredArticles.map(article => this.renderArticleCard(article)).join('');
        }, 300);
    }

    renderArticleCard(article) {
        const { title, excerpt, category, readTime, featuredImage } = article.fields;
        const imageUrl = featuredImage?.fields?.file?.url || 'images/blog/default.jpg';
        const fullImageUrl = imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl;

        const categoryLabels = {
            'jurisprudencia': 'Jurisprudencia',
            'novedades': 'Novedades Legales',
            'casos': 'Casos Prácticos'
        };

        return `
            <div class="col-lg-4 col-md-6 mb-4">
                <article class="blog-card">
                    <div class="blog-image">
                        <img src="${fullImageUrl}" alt="${title}" loading="lazy">
                        <div class="blog-category">${categoryLabels[category] || category}</div>
                    </div>
                    <div class="blog-content">
                        <div class="blog-meta">
                            <span class="blog-date">${readTime}</span>
                        </div>
                        <h3 class="blog-title">${title}</h3>
                        <p class="blog-excerpt">${excerpt}</p>
                        <a href="#" class="blog-link" data-article-id="${article.sys.id}">
                            Leer más
                        </a>
                    </div>
                </article>
            </div>
        `;
    }

    openArticle(articleId) {
        const article = this.articles.find(a => a.sys.id === articleId);
        if (!article) return;

        const { title, content, category, readTime, featuredImage } = article.fields;
        const imageUrl = featuredImage?.fields?.file?.url || 'images/blog/default.jpg';
        const fullImageUrl = imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl;

        const categoryLabels = {
            'jurisprudencia': 'Jurisprudencia',
            'novedades': 'Novedades Legales',
            'casos': 'Casos Prácticos'
        };

        const modalContent = `
            <div class="article-modal">
                <div class="article-header">
                    <img src="${fullImageUrl}" alt="${title}" class="article-image">
                    <div class="article-meta">
                        <span class="article-category">${categoryLabels[category] || category}</span>
                        <span class="article-time">${readTime}</span>
                        <span class="article-date">${new Date().toLocaleDateString('es-AR')}</span>
                    </div>
                    <h1 class="article-title">${title}</h1>
                </div>
                <div class="article-content">
                    ${content}
                </div>
                <div class="article-footer">
                    <p><strong>¿Necesitás asesoramiento legal personalizado?</strong></p>
                    <p>Contactame para una consulta gratuita sobre tu caso específico.</p>
                    <a href="https://wa.me/5491234567890?text=Hola, leí el artículo '${title}' y me gustaría hacer una consulta" 
                       class="btn btn-primary" target="_blank">
                        <i class="fab fa-whatsapp"></i> Consultar por WhatsApp
                    </a>
                </div>
            </div>
        `;

        // Usar el modal existente del sitio
        const modal = document.querySelector('#genericModal');
        if (modal) {
            const modalBody = modal.querySelector('.modal-body');
            modalBody.innerHTML = modalContent;
            
            // Usar Bootstrap modal si está disponible
            if (typeof bootstrap !== 'undefined') {
                const bsModal = new bootstrap.Modal(modal);
                bsModal.show();
            } else {
                modal.style.display = 'block';
                modal.classList.add('show');
            }
        }
    }

}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new BlogManager();
});

// También inicializar si el script se carga después del DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new BlogManager();
    });
} else {
    new BlogManager();
}
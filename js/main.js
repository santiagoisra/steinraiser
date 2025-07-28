/**
 * Archivo JavaScript principal para el sitio web de Yesica Steinraiser
 * Contiene toda la funcionalidad interactiva del sitio
 */

// ====================================
// VARIABLES GLOBALES
// ====================================
let currentTestimonial = 0;
let isExitIntentShown = false;

// ====================================
// INICIALIZACIÓN DEL SITIO
// ====================================
document.addEventListener('DOMContentLoaded', function() {
    initSplashScreen();
    initNavigation();
    initTestimonials();
    initServiceModals();
    initContactForm();
    initBlogFilters();
    initScrollAnimations();
    initExitIntent();
    initSmoothScrolling();
});

// ====================================
// SPLASH SCREEN
// ====================================
/**
 * Inicializa y controla la pantalla de splash
 */
function initSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    
    // Ocultar splash después de 1.5 segundos
    setTimeout(() => {
        splashScreen.classList.add('fade-out');
        setTimeout(() => {
            splashScreen.style.display = 'none';
        }, 500);
    }, 1500);
}

// ====================================
// NAVEGACIÓN
// ====================================
/**
 * Inicializa la funcionalidad de navegación
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Efecto scroll en navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Toggle menú móvil
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Highlight del link activo
    window.addEventListener('scroll', highlightActiveNavLink);
}

/**
 * Resalta el link de navegación activo basado en la posición del scroll
 */
function highlightActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ====================================
// TESTIMONIALS SLIDER
// ====================================
/**
 * Inicializa el slider de testimonios
 */
function initTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialBtns = document.querySelectorAll('.testimonial-btn');
    
    // Auto-play testimonials
    setInterval(() => {
        nextTestimonial();
    }, 5000);

    // Botones de navegación
    testimonialBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
}

/**
 * Muestra el siguiente testimonio
 */
function nextTestimonial() {
    const testimonials = document.querySelectorAll('.testimonial');
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

/**
 * Muestra un testimonio específico
 * @param {number} index - Índice del testimonio a mostrar
 */
function showTestimonial(index) {
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialBtns = document.querySelectorAll('.testimonial-btn');
    
    testimonials.forEach(testimonial => {
        testimonial.classList.remove('active');
    });
    
    testimonialBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    
    testimonials[index].classList.add('active');
    testimonialBtns[index].classList.add('active');
    currentTestimonial = index;
}

// ====================================
// MODALES DE SERVICIOS
// ====================================
/**
 * Inicializa los modales de servicios
 */
function initServiceModals() {
    const serviceCards = document.querySelectorAll('.service-card');
    const modal = document.getElementById('service-modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close');

    // Contenido de los modales
    const serviceContent = {
        despidos: {
            title: 'Despidos Improcedentes',
            content: `
                <h3>Despidos Improcedentes</h3>
                <p>Te ayudo a defender tus derechos en casos de despidos sin causa justificada, discriminatorios o que violen tus derechos laborales.</p>
                
                <h4>¿Qué incluye este servicio?</h4>
                <ul>
                    <li>Análisis completo de tu caso</li>
                    <li>Cálculo de indemnizaciones correspondientes</li>
                    <li>Negociación con la empresa</li>
                    <li>Representación legal en juicio si es necesario</li>
                    <li>Asesoramiento durante todo el proceso</li>
                </ul>

                <h4>Preguntas Frecuentes</h4>
                <div class="faq">
                    <div class="faq-item">
                        <h5>¿Cuánto tiempo tengo para reclamar?</h5>
                        <p>Tienes 2 años desde el despido para iniciar acciones legales.</p>
                    </div>
                    <div class="faq-item">
                        <h5>¿Qué documentos necesito?</h5>
                        <p>Contrato de trabajo, recibos de sueldo, telegrama de despido y cualquier comunicación con la empresa.</p>
                    </div>
                </div>

                <form class="modal-form">
                    <h4>Consulta sobre tu caso</h4>
                    <input type="text" placeholder="Nombre completo" required>
                    <input type="email" placeholder="Email" required>
                    <input type="tel" placeholder="Teléfono" required>
                    <textarea placeholder="Describe tu situación" rows="4" required></textarea>
                    <button type="submit" class="btn btn-primary">Enviar consulta</button>
                </form>
            `
        },
        salarios: {
            title: 'Diferencias Salariales',
            content: `
                <h3>Reclamos por Diferencias Salariales</h3>
                <p>Recupera el dinero que te corresponde por sueldos impagos, horas extras no abonadas y beneficios laborales.</p>
                
                <h4>¿Qué incluye este servicio?</h4>
                <ul>
                    <li>Auditoría de tus recibos de sueldo</li>
                    <li>Cálculo de diferencias adeudadas</li>
                    <li>Reclamo de horas extras</li>
                    <li>Recuperación de beneficios no pagados</li>
                    <li>Negociación extrajudicial</li>
                </ul>

                <h4>Preguntas Frecuentes</h4>
                <div class="faq">
                    <div class="faq-item">
                        <h5>¿Qué diferencias puedo reclamar?</h5>
                        <p>Sueldos, aguinaldo, vacaciones, horas extras, comisiones y cualquier concepto laboral impago.</p>
                    </div>
                    <div class="faq-item">
                        <h5>¿Necesito estar despedido para reclamar?</h5>
                        <p>No, puedes reclamar diferencias mientras mantienes tu relación laboral.</p>
                    </div>
                </div>

                <form class="modal-form">
                    <h4>Consulta sobre diferencias salariales</h4>
                    <input type="text" placeholder="Nombre completo" required>
                    <input type="email" placeholder="Email" required>
                    <input type="tel" placeholder="Teléfono" required>
                    <textarea placeholder="¿Qué diferencias crees que te adeudan?" rows="4" required></textarea>
                    <button type="submit" class="btn btn-primary">Enviar consulta</button>
                </form>
            `
        },
        accidentes: {
            title: 'Accidentes y Enfermedades Laborales',
            content: `
                <h3>Accidentes y Enfermedades Laborales</h3>
                <p>Te represento en casos de accidentes de trabajo y enfermedades profesionales para obtener la compensación que mereces.</p>
                
                <h4>¿Qué incluye este servicio?</h4>
                <ul>
                    <li>Evaluación médico-legal del caso</li>
                    <li>Trámites ante la ART</li>
                    <li>Reclamo de prestaciones médicas</li>
                    <li>Cálculo de incapacidades</li>
                    <li>Demanda por daños y perjuicios</li>
                </ul>

                <h4>Preguntas Frecuentes</h4>
                <div class="faq">
                    <div class="faq-item">
                        <h5>¿Qué hacer inmediatamente después del accidente?</h5>
                        <p>Denunciar el accidente a tu empleador y solicitar atención médica inmediata.</p>
                    </div>
                    <div class="faq-item">
                        <h5>¿Puedo reclamar si la ART rechaza mi caso?</h5>
                        <p>Sí, podemos apelar la decisión y iniciar acciones legales contra la ART y el empleador.</p>
                    </div>
                </div>

                <form class="modal-form">
                    <h4>Consulta sobre accidente laboral</h4>
                    <input type="text" placeholder="Nombre completo" required>
                    <input type="email" placeholder="Email" required>
                    <input type="tel" placeholder="Teléfono" required>
                    <textarea placeholder="Describe el accidente o enfermedad" rows="4" required></textarea>
                    <button type="submit" class="btn btn-primary">Enviar consulta</button>
                </form>
            `
        },
        discriminacion: {
            title: 'Discriminación y Acoso Laboral',
            content: `
                <h3>Discriminación y Acoso Laboral</h3>
                <p>Protejo tus derechos contra cualquier forma de discriminación o acoso en el ámbito laboral.</p>
                
                <h4>¿Qué incluye este servicio?</h4>
                <ul>
                    <li>Asesoramiento en casos de discriminación</li>
                    <li>Defensa contra acoso laboral</li>
                    <li>Recopilación de pruebas</li>
                    <li>Denuncia ante organismos competentes</li>
                    <li>Reclamo de daños morales</li>
                </ul>

                <h4>Preguntas Frecuentes</h4>
                <div class="faq">
                    <div class="faq-item">
                        <h5>¿Qué constituye discriminación laboral?</h5>
                        <p>Trato diferencial por género, edad, religión, orientación sexual, embarazo, entre otros.</p>
                    </div>
                    <div class="faq-item">
                        <h5>¿Cómo pruebo el acoso laboral?</h5>
                        <p>Con testimonios, emails, mensajes, grabaciones y cualquier evidencia del comportamiento.</p>
                    </div>
                </div>

                <form class="modal-form">
                    <h4>Consulta sobre discriminación/acoso</h4>
                    <input type="text" placeholder="Nombre completo" required>
                    <input type="email" placeholder="Email" required>
                    <input type="tel" placeholder="Teléfono" required>
                    <textarea placeholder="Describe la situación de discriminación o acoso" rows="4" required></textarea>
                    <button type="submit" class="btn btn-primary">Enviar consulta</button>
                </form>
            `
        },
        conciliacion: {
            title: 'Conciliación y Transacciones',
            content: `
                <h3>Conciliación y Transacciones</h3>
                <p>Busco soluciones rápidas y beneficiosas a través de negociaciones y acuerdos extrajudiciales.</p>
                
                <h4>¿Qué incluye este servicio?</h4>
                <ul>
                    <li>Mediación entre las partes</li>
                    <li>Negociación de acuerdos</li>
                    <li>Redacción de convenios</li>
                    <li>Asesoramiento en SECLO</li>
                    <li>Homologación judicial</li>
                </ul>

                <h4>Preguntas Frecuentes</h4>
                <div class="faq">
                    <div class="faq-item">
                        <h5>¿Es obligatoria la conciliación?</h5>
                        <p>En muchos casos sí, es un paso previo obligatorio antes del juicio.</p>
                    </div>
                    <div class="faq-item">
                        <h5>¿Qué ventajas tiene llegar a un acuerdo?</h5>
                        <p>Rapidez, menor costo, certeza en el resultado y evitar el desgaste del juicio.</p>
                    </div>
                </div>

                <form class="modal-form">
                    <h4>Consulta sobre conciliación</h4>
                    <input type="text" placeholder="Nombre completo" required>
                    <input type="email" placeholder="Email" required>
                    <input type="tel" placeholder="Teléfono" required>
                    <textarea placeholder="Describe tu conflicto laboral" rows="4" required></textarea>
                    <button type="submit" class="btn btn-primary">Enviar consulta</button>
                </form>
            `
        },
        compliance: {
            title: 'Compliance Laboral para Empresas',
            content: `
                <h3>Compliance Laboral para Empresas</h3>
                <p>Asesoramiento preventivo para empresas en cumplimiento de normativas laborales y prevención de conflictos.</p>
                
                <h4>¿Qué incluye este servicio?</h4>
                <ul>
                    <li>Auditoría de procesos laborales</li>
                    <li>Elaboración de políticas internas</li>
                    <li>Capacitación a RRHH</li>
                    <li>Prevención de demandas laborales</li>
                    <li>Asesoramiento en despidos</li>
                </ul>

                <h4>Preguntas Frecuentes</h4>
                <div class="faq">
                    <div class="faq-item">
                        <h5>¿Por qué es importante el compliance laboral?</h5>
                        <p>Previene sanciones, reduce riesgos legales y mejora el clima laboral.</p>
                    </div>
                    <div class="faq-item">
                        <h5>¿Con qué frecuencia debo revisar mis políticas?</h5>
                        <p>Recomiendo una revisión anual o cuando cambien las normativas.</p>
                    </div>
                </div>

                <form class="modal-form">
                    <h4>Consulta empresarial</h4>
                    <input type="text" placeholder="Nombre del contacto" required>
                    <input type="text" placeholder="Empresa" required>
                    <input type="email" placeholder="Email" required>
                    <input type="tel" placeholder="Teléfono" required>
                    <textarea placeholder="¿Qué necesidades tiene su empresa?" rows="4" required></textarea>
                    <button type="submit" class="btn btn-primary">Enviar consulta</button>
                </form>
            `
        }
    };

    // Event listeners para las cards de servicios
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceType = card.getAttribute('data-service');
            const content = serviceContent[serviceType];
            
            if (content) {
                modalBody.innerHTML = content.content;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                // Inicializar formulario del modal
                initModalForm();
            }
        });
    });

    // Cerrar modal
    closeBtn.addEventListener('click', closeModal);
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

/**
 * Cierra el modal de servicios
 */
function closeModal() {
    const modal = document.getElementById('service-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

/**
 * Inicializa el formulario dentro del modal
 */
function initModalForm() {
    const modalForm = document.querySelector('.modal-form');
    if (modalForm) {
        modalForm.addEventListener('submit', handleModalFormSubmit);
    }
}

/**
 * Maneja el envío del formulario del modal
 * @param {Event} e - Evento del formulario
 */
function handleModalFormSubmit(e) {
    e.preventDefault();
    
    // Aquí iría la lógica para enviar el formulario
    showNotification('Consulta enviada correctamente. Te contactaremos pronto.', 'success');
    closeModal();
}

// ====================================
// FORMULARIO DE CONTACTO
// ====================================
/**
 * Inicializa el formulario de contacto principal
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', handleContactFormSubmit);
}

/**
 * Maneja el envío del formulario de contacto
 * @param {Event} e - Evento del formulario
 */
function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Validar que el checkbox RGPD esté marcado
    if (!data.rgpd) {
        showNotification('Debes aceptar la política de privacidad', 'error');
        return;
    }
    
    // Simular envío del formulario
    showNotification('Consulta enviada correctamente. Te contactaremos en las próximas 24 horas.', 'success');
    e.target.reset();
}

// ====================================
// FILTROS DEL BLOG
// ====================================
/**
 * Inicializa los filtros del blog
 */
function initBlogFilters() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            
            // Actualizar botones activos
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filtrar cards
            blogCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    card.classList.add('fade-in');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ====================================
// ANIMACIONES DE SCROLL
// ====================================
/**
 * Inicializa las animaciones que se activan con el scroll
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ====================================
// EXIT INTENT POPUP
// ====================================
/**
 * Inicializa el popup de exit intent
 */
function initExitIntent() {
    const popup = document.getElementById('exit-popup');
    const popupClose = document.querySelector('.popup-close');
    const popupForm = document.querySelector('.popup-form');
    
    // Detectar cuando el mouse sale de la ventana
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= 0 && !isExitIntentShown) {
            showExitPopup();
        }
    });
    
    // Cerrar popup
    popupClose.addEventListener('click', closeExitPopup);
    
    window.addEventListener('click', (e) => {
        if (e.target === popup) {
            closeExitPopup();
        }
    });
    
    // Formulario del popup
    popupForm.addEventListener('submit', handlePopupFormSubmit);
}

/**
 * Muestra el popup de exit intent
 */
function showExitPopup() {
    const popup = document.getElementById('exit-popup');
    popup.style.display = 'block';
    document.body.style.overflow = 'hidden';
    isExitIntentShown = true;
}

/**
 * Cierra el popup de exit intent
 */
function closeExitPopup() {
    const popup = document.getElementById('exit-popup');
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
}

/**
 * Maneja el envío del formulario del popup
 * @param {Event} e - Evento del formulario
 */
function handlePopupFormSubmit(e) {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (email) {
        showNotification('¡Gracias! Te enviaremos el checklist a tu email.', 'success');
        closeExitPopup();
    }
}

// ====================================
// SMOOTH SCROLLING
// ====================================
/**
 * Inicializa el smooth scrolling para los enlaces internos
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Compensar navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ====================================
// FUNCIONES DE RECURSOS
// ====================================
/**
 * Abre la calculadora de indemnización
 */
function openCalculator() {
    // Crear modal para la calculadora
    const modal = document.getElementById('service-modal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <h3>Calculadora de Indemnización</h3>
        <form id="calculator-form" class="calculator-form">
            <div class="form-group">
                <label>Fecha de ingreso:</label>
                <input type="date" id="fecha-ingreso" required>
            </div>
            <div class="form-group">
                <label>Fecha de despido:</label>
                <input type="date" id="fecha-despido" required>
            </div>
            <div class="form-group">
                <label>Mejor sueldo mensual (últimos 12 meses):</label>
                <input type="number" id="mejor-sueldo" placeholder="Ej: 150000" required>
            </div>
            <div class="form-group">
                <label>Tipo de despido:</label>
                <select id="tipo-despido" required>
                    <option value="">Seleccionar</option>
                    <option value="sin-causa">Sin causa</option>
                    <option value="con-causa">Con causa</option>
                    <option value="discriminatorio">Discriminatorio</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Calcular Indemnización</button>
        </form>
        <div id="calculator-result" style="display: none;">
            <h4>Resultado del Cálculo</h4>
            <div id="result-content"></div>
            <p><strong>Nota:</strong> Este es un cálculo estimativo. Para un análisis detallado, agenda una consulta.</p>
            <button class="btn btn-secondary" onclick="sendCalculationByEmail()">Enviar resultado por email</button>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Inicializar calculadora
    document.getElementById('calculator-form').addEventListener('submit', calculateIndemnization);
}

/**
 * Calcula la indemnización basada en los datos ingresados
 * @param {Event} e - Evento del formulario
 */
function calculateIndemnization(e) {
    e.preventDefault();
    
    const fechaIngreso = new Date(document.getElementById('fecha-ingreso').value);
    const fechaDespido = new Date(document.getElementById('fecha-despido').value);
    const mejorSueldo = parseFloat(document.getElementById('mejor-sueldo').value);
    const tipoDespido = document.getElementById('tipo-despido').value;
    
    // Calcular antigüedad en años
    const antiguedad = (fechaDespido - fechaIngreso) / (1000 * 60 * 60 * 24 * 365.25);
    
    let indemnizacion = 0;
    let conceptos = [];
    
    if (tipoDespido === 'sin-causa') {
        // Indemnización por despido sin causa
        indemnizacion = mejorSueldo * Math.max(antiguedad, 1);
        conceptos.push(`Indemnización por despido: $${indemnizacion.toLocaleString()}`);
        
        // Preaviso
        const preaviso = mejorSueldo;
        indemnizacion += preaviso;
        conceptos.push(`Preaviso: $${preaviso.toLocaleString()}`);
        
        // Integración del mes de despido
        const integracion = mejorSueldo;
        indemnizacion += integracion;
        conceptos.push(`Integración del mes: $${integracion.toLocaleString()}`);
        
    } else if (tipoDespido === 'discriminatorio') {
        // Indemnización agravada
        indemnizacion = mejorSueldo * Math.max(antiguedad, 1) * 2;
        conceptos.push(`Indemnización agravada: $${indemnizacion.toLocaleString()}`);
    }
    
    // Mostrar resultado
    const resultDiv = document.getElementById('calculator-result');
    const resultContent = document.getElementById('result-content');
    
    resultContent.innerHTML = `
        <p><strong>Antigüedad:</strong> ${antiguedad.toFixed(1)} años</p>
        <p><strong>Conceptos a reclamar:</strong></p>
        <ul>
            ${conceptos.map(concepto => `<li>${concepto}</li>`).join('')}
        </ul>
        <p class="total"><strong>Total estimado: $${indemnizacion.toLocaleString()}</strong></p>
    `;
    
    document.getElementById('calculator-form').style.display = 'none';
    resultDiv.style.display = 'block';
}

/**
 * Envía el resultado del cálculo por email
 */
function sendCalculationByEmail() {
    const email = prompt('Ingresa tu email para recibir el resultado:');
    if (email) {
        showNotification('Resultado enviado a tu email correctamente.', 'success');
    }
}

/**
 * Abre el formulario de suscripción al newsletter
 */
function openNewsletter() {
    const modal = document.getElementById('service-modal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <h3>Suscríbete a LaborFlash</h3>
        <p>Recibe las últimas novedades del derecho laboral cada 15 días directamente en tu email.</p>
        
        <form id="newsletter-form" class="newsletter-form">
            <div class="form-group">
                <input type="text" placeholder="Nombre completo" required>
            </div>
            <div class="form-group">
                <input type="email" placeholder="Email" required>
            </div>
            <div class="form-group">
                <select required>
                    <option value="">¿Eres...?</option>
                    <option value="trabajador">Trabajador</option>
                    <option value="empleador">Empleador</option>
                    <option value="abogado">Abogado</option>
                    <option value="estudiante">Estudiante</option>
                    <option value="otro">Otro</option>
                </select>
            </div>
            <div class="form-group checkbox-group">
                <input type="checkbox" id="newsletter-rgpd" required>
                <label for="newsletter-rgpd">Acepto recibir comunicaciones y el tratamiento de mis datos según la Política de Privacidad</label>
            </div>
            <button type="submit" class="btn btn-primary">Suscribirme gratis</button>
        </form>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    document.getElementById('newsletter-form').addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('¡Suscripción exitosa! Recibirás el primer LaborFlash en los próximos días.', 'success');
        closeModal();
    });
}

// ====================================
// UTILIDADES
// ====================================
/**
 * Muestra una notificación al usuario
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de notificación (success, error, info)
 */
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Agregar estilos si no existen
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 8px;
                color: white;
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 15px;
                max-width: 400px;
                animation: slideInRight 0.3s ease;
            }
            .notification-success { background: #28a745; }
            .notification-error { background: #dc3545; }
            .notification-info { background: #17a2b8; }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0;
                margin-left: auto;
            }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Cerrar notificación
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

/**
 * Maneja errores 404 personalizados
 */
function handle404() {
    document.body.innerHTML = `
        <div style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            text-align: center;
            padding: 20px;
            font-family: 'Lato', sans-serif;
        ">
            <h1 style="font-size: 6rem; color: #003B5C; margin-bottom: 20px;">404</h1>
            <h2 style="color: #FF5F57; margin-bottom: 20px;">Parece que esta página tomó vacaciones...</h2>
            <p style="color: #666; margin-bottom: 30px; font-size: 1.2rem;">pero tus derechos no.</p>
            <a href="/" style="
                background: #FF5F57;
                color: white;
                padding: 15px 30px;
                text-decoration: none;
                border-radius: 8px;
                font-weight: 600;
                transition: all 0.3s ease;
            " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                Volver al inicio
            </a>
        </div>
    `;
}

// ====================================
// LAZY LOADING DE IMÁGENES
// ====================================
/**
 * Implementa lazy loading para las imágenes
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Inicializar lazy loading cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initLazyLoading);
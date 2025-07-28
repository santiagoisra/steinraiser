// Configuración de ejemplo para Contentful
// Reemplazá estos valores con los tuyos después de crear tu cuenta

const CONTENTFUL_CONFIG = {
    space: 'tu_space_id_aqui', // Reemplazá con tu Space ID
    accessToken: 'tu_access_token_aqui', // Reemplazá con tu Access Token
    environment: 'master'
};

// Artículos de ejemplo (se usan cuando Contentful no está configurado)
const SAMPLE_ARTICLES = [
    {
        sys: { id: '1' },
        fields: {
            title: 'Nuevas Regulaciones Laborales 2024',
            slug: 'nuevas-regulaciones-laborales-2024',
            excerpt: 'Análisis completo de las modificaciones en la legislación laboral que entran en vigencia este año.',
            content: `
                <h2>Principales cambios en la legislación laboral</h2>
                <p>Las nuevas regulaciones laborales que entran en vigencia en 2024 traen importantes modificaciones que afectan tanto a empleadores como a trabajadores.</p>
                
                <h3>1. Modificaciones en las indemnizaciones</h3>
                <p>Se establecen nuevos criterios para el cálculo de indemnizaciones por despido, incluyendo:</p>
                <ul>
                    <li>Actualización de los montos mínimos</li>
                    <li>Nuevos criterios para casos especiales</li>
                    <li>Procedimientos simplificados para reclamos</li>
                </ul>
                
                <h3>2. Derechos del trabajador</h3>
                <p>Se amplían los derechos en materia de:</p>
                <ul>
                    <li>Licencias por maternidad/paternidad</li>
                    <li>Trabajo remoto y modalidades híbridas</li>
                    <li>Protección contra la discriminación</li>
                </ul>
                
                <h3>3. Obligaciones del empleador</h3>
                <p>Los empleadores deberán cumplir con nuevas obligaciones relacionadas con:</p>
                <ul>
                    <li>Registro de horarios de trabajo</li>
                    <li>Capacitación en prevención de riesgos</li>
                    <li>Implementación de protocolos de seguridad</li>
                </ul>
                
                <p>Es fundamental que tanto empleadores como trabajadores se mantengan informados sobre estos cambios para garantizar el cumplimiento de la normativa vigente.</p>
            `,
            category: 'novedades',
            readTime: '8 min lectura',
            featuredImage: {
                fields: {
                    file: {
                        url: 'images/blog/blog-1.jpg'
                    }
                }
            }
        }
    },
    {
        sys: { id: '2' },
        fields: {
            title: 'Jurisprudencia: Caso de Despido Discriminatorio',
            slug: 'jurisprudencia-despido-discriminatorio',
            excerpt: 'Análisis del fallo de la Corte Suprema sobre un caso de despido por discriminación de género.',
            content: `
                <h2>Antecedentes del caso</h2>
                <p>La Corte Suprema de Justicia se pronunció sobre un caso emblemático de despido discriminatorio por razones de género, estableciendo importantes precedentes para casos futuros.</p>
                
                <h3>Hechos del caso</h3>
                <p>Una trabajadora fue despedida inmediatamente después de comunicar su embarazo a la empresa. La empleada había trabajado durante 3 años sin observaciones negativas en su desempeño.</p>
                
                <h3>Argumentos de las partes</h3>
                <p><strong>La trabajadora alegó:</strong></p>
                <ul>
                    <li>Despido discriminatorio por embarazo</li>
                    <li>Violación del principio de estabilidad laboral</li>
                    <li>Daño moral y material</li>
                </ul>
                
                <p><strong>La empresa sostuvo:</strong></p>
                <ul>
                    <li>Reestructuración empresarial</li>
                    <li>Reducción de personal por causas económicas</li>
                    <li>Negó cualquier discriminación</li>
                </ul>
                
                <h3>Decisión de la Corte</h3>
                <p>La Corte falló a favor de la trabajadora, estableciendo que:</p>
                <ul>
                    <li>El timing del despido genera presunción de discriminación</li>
                    <li>La empresa no logró desvirtuar esta presunción</li>
                    <li>Corresponde indemnización agravada</li>
                    <li>Se ordena reincorporación o indemnización especial</li>
                </ul>
                
                <h3>Impacto jurisprudencial</h3>
                <p>Este fallo establece criterios importantes para:</p>
                <ul>
                    <li>Evaluación de casos de discriminación laboral</li>
                    <li>Carga de la prueba en estos casos</li>
                    <li>Cálculo de indemnizaciones agravadas</li>
                </ul>
            `,
            category: 'jurisprudencia',
            readTime: '12 min lectura',
            featuredImage: {
                fields: {
                    file: {
                        url: 'images/blog/blog-2.jpg'
                    }
                }
            }
        }
    },
    {
        sys: { id: '3' },
        fields: {
            title: 'Caso Práctico: Cálculo de Indemnización por Despido',
            slug: 'caso-practico-calculo-indemnizacion',
            excerpt: 'Ejemplo paso a paso de cómo calcular correctamente una indemnización por despido sin causa.',
            content: `
                <h2>Planteo del caso</h2>
                <p>Juan Pérez trabajó durante 5 años en una empresa como empleado administrativo. Su último salario fue de $150.000 mensuales. Fue despedido sin causa el 15 de marzo de 2024.</p>
                
                <h3>Datos del trabajador</h3>
                <ul>
                    <li><strong>Antigüedad:</strong> 5 años</li>
                    <li><strong>Último salario:</strong> $150.000</li>
                    <li><strong>Fecha de despido:</strong> 15/03/2024</li>
                    <li><strong>Mejor remuneración:</strong> $150.000 (último año)</li>
                </ul>
                
                <h3>Cálculo de la indemnización</h3>
                
                <h4>1. Indemnización por antigüedad (Art. 245 LCT)</h4>
                <p>Fórmula: 1 mes de sueldo por cada año de servicio</p>
                <p>Cálculo: $150.000 × 5 años = <strong>$750.000</strong></p>
                
                <h4>2. Preaviso (Art. 231 LCT)</h4>
                <p>Por 5 años de antigüedad corresponden 2 meses de preaviso</p>
                <p>Cálculo: $150.000 × 2 meses = <strong>$300.000</strong></p>
                
                <h4>3. Integración del mes de despido</h4>
                <p>Desde el 15/03 hasta el 31/03 = 16 días</p>
                <p>Cálculo: ($150.000 ÷ 30) × 16 días = <strong>$80.000</strong></p>
                
                <h4>4. Vacaciones proporcionales</h4>
                <p>Desde el 01/01/2024 hasta el 15/03/2024 = 74 días</p>
                <p>Cálculo: ($150.000 ÷ 365) × 74 días = <strong>$30.411</strong></p>
                
                <h4>5. SAC proporcional</h4>
                <p>Primer semestre 2024: 74 días trabajados</p>
                <p>Cálculo: ($150.000 ÷ 2) ÷ 180 × 74 días = <strong>$30.833</strong></p>
                
                <h3>Total de la indemnización</h3>
                <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                    <tr style="background: #f5f5f5;">
                        <th style="padding: 10px; border: 1px solid #ddd;">Concepto</th>
                        <th style="padding: 10px; border: 1px solid #ddd;">Importe</th>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;">Indemnización por antigüedad</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">$750.000</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;">Preaviso</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">$300.000</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;">Integración del mes</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">$80.000</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;">Vacaciones proporcionales</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">$30.411</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;">SAC proporcional</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">$30.833</td>
                    </tr>
                    <tr style="background: #e8f4f8; font-weight: bold;">
                        <td style="padding: 10px; border: 1px solid #ddd;">TOTAL</td>
                        <td style="padding: 10px; border: 1px solid #ddd;">$1.191.244</td>
                    </tr>
                </table>
                
                <h3>Consideraciones importantes</h3>
                <ul>
                    <li>Los montos están sujetos a los topes legales vigentes</li>
                    <li>Pueden aplicarse actualizaciones por inflación</li>
                    <li>En caso de juicio, se pueden reclamar intereses</li>
                    <li>Verificar si corresponden otros conceptos específicos</li>
                </ul>
            `,
            category: 'casos',
            readTime: '10 min lectura',
            featuredImage: {
                fields: {
                    file: {
                        url: 'images/blog/blog-3.jpg'
                    }
                }
            }
        }
    }
];

// Exportar para uso en blog.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONTENTFUL_CONFIG, SAMPLE_ARTICLES };
}
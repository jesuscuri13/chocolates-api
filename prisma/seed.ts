import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Brand
  await prisma.brand.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      whatsapp: '51980758367',
      whatsappPhone: '+51 980 758 367',
      email: 'hola@tambopata.pe',
      location: 'Puerto Maldonado, Madre de Dios, Perú',
    },
  });

  // Categorías
  const categorias = [
    {
      id: 'cacao',
      name: 'Cacao',
      sub: 'El producto de autoridad',
      desc: 'Pasta de cacao puro. Sin azúcar añadida, sin atajos.',
      image: '/assets/images/categoria-cacao.jpg',
      order: 1,
    },
    {
      id: 'copoazu',
      name: 'Copoazú',
      sub: 'El fruto amazónico',
      desc: 'Pulpa de copoazú silvestre. Sabor único de la Amazonía.',
      image: '/assets/images/categoria-copoazu.jpg',
      order: 2,
    },
    {
      id: 'cafe',
      name: 'Café',
      sub: 'Altura y carácter',
      desc: 'Café de altura de Madre de Dios. Tostado artesanal.',
      image: '/assets/images/categoria-cafe.jpg',
      order: 3,
    },
  ];

  for (const cat of categorias) {
    await prisma.categoria.upsert({ where: { id: cat.id }, update: {}, create: cat });
  }

  // Productos
  const productos = [
    {
      slug: 'pasta-cacao',
      name: 'Pasta de Cacao',
      subtitle: '100% Puro · Sin azúcar',
      categoriaId: 'cacao',
      price: 'S/ 12.00',
      weight: '100 g',
      image: '/assets/images/pasta-cacao-puro-tambopata-amazonia.jpg',
      images: ['/assets/images/pasta-cacao-puro-tambopata-amazonia.jpg'],
      tag: { text: 'Rinde 12 tazas', kind: 'yellow' },
      active: true,
      description: 'Pasta de cacao puro. Sin aditivos, sin conservantes.',
      notes: ['Origen único · Madre de Dios', 'Comercio justo', 'Sin azúcar añadida'],
      preparacion: 'Ralla 20 g por taza, calienta 250 ml de leche o agua, disuelve y endulza al gusto.',
      conservacion: 'Lugar fresco y seco, alejado de la luz directa. Una vez abierta, dura hasta 6 meses.',
      origen: 'Tambopata · Madre de Dios',
    },
    {
      slug: 'flan-copoazu',
      name: 'Flan de Copoazú',
      subtitle: 'Sabor amazónico único',
      categoriaId: 'copoazu',
      price: '',
      weight: '',
      image: '/assets/images/flan-copoazu-tambopata.jpg',
      images: ['/assets/images/flan-copoazu-tambopata.jpg'],
      tag: null,
      active: true,
      description: 'Flan elaborado con pulpa de copoazú silvestre de la Amazonía peruana.',
      notes: ['Fruta amazónica silvestre', 'Sin conservantes'],
      preparacion: 'Listo para consumir. Mantener refrigerado.',
      conservacion: 'Mantener refrigerado. Consumir antes de la fecha indicada.',
      origen: 'Tambopata · Madre de Dios',
    },
    {
      slug: 'cafe',
      name: 'Café',
      subtitle: 'Altura y carácter',
      categoriaId: 'cafe',
      price: 'S/ 8.00',
      weight: '100 g',
      image: '/assets/images/cafe-tambopata-madre-de-dios.jpg',
      images: ['/assets/images/cafe-tambopata-madre-de-dios.jpg'],
      tag: null,
      active: true,
      description: 'Café de altura tostado artesanalmente en Madre de Dios.',
      notes: ['Tostado artesanal', 'Altura 1200 msnm', 'Comercio justo'],
      preparacion: 'Prepara en cafetera italiana o de filtro. 8–10 g por taza.',
      conservacion: 'Guardar en lugar fresco y seco. Una vez abierto, consumir en 30 días.',
      origen: 'Tambopata · Madre de Dios',
    },
    {
      slug: 'copoazu-pulpa',
      name: 'Copoazú Pulpa',
      subtitle: 'Pulpa congelada · 100% natural',
      categoriaId: 'copoazu',
      price: 'S/ 20.00',
      weight: '500 g',
      image: '/assets/images/copoazu-pulpa-tambopata.jpg',
      images: ['/assets/images/copoazu-pulpa-tambopata.jpg'],
      tag: { text: 'Congelado', kind: 'frozen' },
      active: false,
      description: 'Pulpa congelada de copoazú silvestre. Sin conservantes ni aditivos.',
      notes: ['100% natural', 'Sin conservantes', 'Congelado en origen'],
      preparacion: 'Descongelar en refrigerador. Usar en jugos, helados o postres.',
      conservacion: 'Mantener congelado. No recongelar una vez descongelado.',
      origen: 'Tambopata · Madre de Dios',
    },
  ];

  for (const p of productos) {
    await prisma.producto.upsert({ where: { slug: p.slug }, update: {}, create: p });
  }

  // Pages (SEO)
  const pages = [
    {
      route: '/',
      title: 'Chocolates Tambopata · Sabores auténticos de la Amazonía peruana',
      description: 'Cacao puro, copoazú y café de Madre de Dios. Comercio justo, sabor sin atajos.',
      ogImage: '/assets/images/pasta-cacao-puro-chocolates-tambopata-madre-de-dios.jpg',
      keywords: 'chocolate, cacao puro, Tambopata, Madre de Dios, copoazú, café',
    },
    {
      route: '/catalogo',
      title: 'Catálogo · Chocolates Tambopata',
      description: 'Explora nuestros productos: pasta de cacao, flan de copoazú y café de la Amazonía.',
      ogImage: '/assets/images/pasta-cacao-puro-chocolates-tambopata-madre-de-dios.jpg',
      keywords: 'catálogo, chocolates, cacao, copoazú, café, Tambopata',
    },
    {
      route: '/catalogo/pasta-cacao',
      title: 'Pasta de Cacao · Chocolates Tambopata',
      description: 'Pasta de cacao 100% puro de Tambopata. Sin azúcar añadida, sin atajos.',
      ogImage: '/assets/images/pasta-cacao-puro-tambopata-amazonia.jpg',
      keywords: 'pasta de cacao, cacao puro, Tambopata, Madre de Dios',
    },
    {
      route: '/catalogo/flan-copoazu',
      title: 'Flan de Copoazú · Chocolates Tambopata',
      description: 'Flan amazónico elaborado con copoazú silvestre de Madre de Dios.',
      ogImage: '/assets/images/flan-copoazu-tambopata.jpg',
      keywords: 'flan copoazú, copoazú, Tambopata, Amazonía',
    },
    {
      route: '/catalogo/cafe',
      title: 'Café · Chocolates Tambopata',
      description: 'Café de altura de Madre de Dios, tostado artesanalmente.',
      ogImage: '/assets/images/cafe-tambopata-madre-de-dios.jpg',
      keywords: 'café, Tambopata, Madre de Dios, café artesanal',
    },
    {
      route: '/nosotros',
      title: 'Nosotros · Chocolates Tambopata',
      description: 'Conoce la historia de Chocolates Tambopata y nuestro compromiso con el comercio justo.',
      ogImage: '/assets/images/pasta-cacao-puro-chocolates-tambopata-madre-de-dios.jpg',
      keywords: 'nosotros, historia, Tambopata, comercio justo, Amazonía',
    },
    {
      route: '/preparacion',
      title: 'Preparación · Chocolates Tambopata',
      description: 'Aprende cómo preparar y conservar nuestros productos de la Amazonía.',
      ogImage: '/assets/images/pasta-cacao-puro-chocolates-tambopata-madre-de-dios.jpg',
      keywords: 'preparación, recetas, cacao, copoazú, Tambopata',
    },
    {
      route: '/contacto',
      title: 'Contacto · Chocolates Tambopata',
      description: 'Contáctanos para pedidos mayoristas o consultas sobre nuestros productos.',
      ogImage: '/assets/images/pasta-cacao-puro-chocolates-tambopata-madre-de-dios.jpg',
      keywords: 'contacto, pedidos, mayorista, Tambopata',
    },
  ];

  for (const p of pages) {
    await prisma.page.upsert({ where: { route: p.route }, update: {}, create: p });
  }

  // Page contents
  const contents = [
    {
      page: 'home',
      content: {
        hero: {
          eyebrow: 'Desde la Amazonía peruana',
          tagline: 'Sabores que la selva guarda para los que saben buscarlos',
          cta: 'Ver catálogo',
        },
        categorias: {
          eyebrow: 'Nuestros productos',
          title: 'Lo mejor de Tambopata',
        },
        favoritos: {
          eyebrow: 'Los más pedidos',
          title: 'Favoritos de',
          titleScript: 'siempre',
          body: 'Seleccionados por quienes ya probaron y volvieron por más.',
          cta: 'Ver todos',
          pasos: [
            { n: '01', title: 'Elige tu favorito', desc: 'Explora el catálogo y encuentra tu producto.' },
            { n: '02', title: 'Escríbenos', desc: 'Contáctanos por WhatsApp o el formulario.' },
            { n: '03', title: 'Recíbelo', desc: 'Coordinamos el envío a todo el Perú.' },
          ],
        },
        testimonios: {
          eyebrow: 'Lo que dicen',
          socialText: 'Únete a nuestra comunidad',
          items: [],
        },
      },
    },
    {
      page: 'nosotros',
      content: {
        hero: {
          eyebrow: 'Nuestra historia',
          title: 'Nacidos en',
          titleScript: 'Tambopata',
          sub: 'Una familia que encontró en la selva amazónica su razón de ser.',
        },
        esencia: {
          eyebrow: 'Quiénes somos',
          title: 'Sabor sin atajos',
          body: [
            'Somos una empresa familiar de Puerto Maldonado, capital de Madre de Dios, en plena Amazonía peruana.',
            'Trabajamos directamente con productores locales para llevar cacao puro, copoazú y café de altura a tu mesa, sin intermediarios y con respeto al origen.',
          ],
        },
        cita: {
          text: 'La selva no da atajos. Nosotros tampoco.',
          attr: '— Familia Tambopata',
        },
        cta: {
          eyebrow: 'Haz tu pedido',
          title: 'Listo para probar la Amazonía',
          sub: 'Escríbenos y coordinamos tu pedido.',
          ctaPrimary: 'WhatsApp',
          ctaSecondary: 'Ver catálogo',
        },
      },
    },
    {
      page: 'preparacion',
      content: {
        hero: {
          eyebrow: 'Cómo usar nuestros productos',
          title: 'Prepara lo',
          titleScript: 'extraordinario',
          sub: 'Guía de preparación y conservación de tus productos Tambopata.',
        },
        pasos: [
          { n: '01', title: 'Ralla', desc: 'Usa un rallador fino sobre la pasta de cacao fría.' },
          { n: '02', title: 'Calienta', desc: 'Calienta 250 ml de leche o agua hasta casi hervir.' },
          { n: '03', title: 'Disuelve', desc: 'Agrega 20 g rallados y mezcla hasta disolver.' },
          { n: '04', title: 'Endulza', desc: 'Añade panela, miel o el endulzante de tu preferencia.' },
        ],
        conservacion: {
          eyebrow: 'Conservación',
          title: 'Para que dure más',
          items: [
            { title: 'Lugar seco', desc: 'Aleja el producto de la humedad y el calor directo.' },
            { title: 'Sin luz directa', desc: 'Guarda en un armario o caja oscura.' },
            { title: 'Cerrado', desc: 'Una vez abierto, usa un recipiente hermético.' },
          ],
        },
        recetario: {
          eyebrow: 'Ideas',
          title: 'Recetas simples',
          items: [
            { title: 'Chocolate caliente', desc: '20 g de pasta + 250 ml de leche + endulzante.' },
            { title: 'Trufas caseras', desc: 'Derrite la pasta, mezcla con miel y forma bolitas.' },
            { title: 'Smoothie amazónico', desc: 'Ralladura de cacao + copoazú + plátano + agua.' },
          ],
        },
        faqs: {
          eyebrow: 'Preguntas frecuentes',
          title: 'Lo que más nos consultan',
          items: [
            { q: '¿La pasta de cacao tiene azúcar?', a: 'No. Es cacao 100% puro, sin ningún aditivo.' },
            { q: '¿Cómo sé si el producto es fresco?', a: 'Todos nuestros productos tienen fecha de vencimiento impresa en el empaque.' },
            { q: '¿Hacen envíos a todo el Perú?', a: 'Sí, coordinamos envíos a todo el país vía courier.' },
          ],
        },
      },
    },
    {
      page: 'contacto',
      content: {
        header: {
          eyebrow: 'Contáctanos',
          title: 'Hablemos de',
          titleLine2: 'tu pedido',
          sub: 'Respondemos en menos de 24 horas.',
        },
        canales: {
          whatsappLabel: 'WhatsApp',
          emailLabel: 'Email',
        },
        social: { label: 'Síguenos' },
        ubicacion: { label: 'Dónde estamos' },
        form: {
          tipoLabel: 'Tipo de consulta',
          tipos: ['Pedido personal', 'Pedido mayorista', 'Otro'],
          nombreLabel: 'Nombre',
          emailLabel: 'Email',
          ciudadLabel: 'Ciudad',
          ciudadOpcional: 'Opcional',
          ciudadPlaceholder: 'Ej. Lima, Cusco...',
          mensajeLabel: 'Mensaje',
          mensajeLabelMayorista: 'Cuéntanos sobre tu negocio',
          mensajePlaceholder: '¿En qué te podemos ayudar?',
          mensajePlaceholderMayorista: 'Productos de interés, volumen aproximado...',
          cta: 'Enviar mensaje',
          ctaSent: 'Mensaje enviado',
          altPrefix: 'Imagen de',
        },
        favBanner: {
          prefix: 'Ya',
          productoSingular: 'persona disfruta',
          productoPlural: 'personas disfrutan',
          suffix: 'nuestros productos',
        },
        sentSocial: { prefix: 'Mientras tanto, síguenos en' },
        errores: {
          nombre: 'El nombre es requerido',
          email: 'Ingresa un email válido',
          mensaje: 'El mensaje es requerido',
        },
      },
    },
  ];

  for (const c of contents) {
    await prisma.pageContent.upsert({
      where: { page: c.page },
      update: {},
      create: c,
    });
  }

  console.log('Seed completed successfully');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());

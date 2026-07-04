// =============================================================
// CONFIG ÚNICO DO SITE
// Troque tudo aqui pra reaproveitar esse projeto em outro cliente.
// Nenhum componente deveria precisar ser editado além deste arquivo
// pra trocar nome, textos, preços, cores de conteúdo ou contatos.
// =============================================================

export const siteConfig = {
  brandNamePlain: "Slick",
  brandNameAccent: "Style",
  brandNameFull: "Slick Style Barbershop",
  address: "Rio Doce, Olinda — PE",
  instagram: "@slickstylebarber",
  whatsapp: "5581999999999",

  nav: [
    { href: "#servicos", label: "Serviços" },
    { href: "#produtos", label: "Seleção" },
    { href: "#galeria", label: "Resultados" },
    { href: "#feedbacks", label: "Depoimentos" },
  ],
  navCta: "Reservar horário",

  hero: {
    lines: ["SLICK", "STYLE"],
    accentLineIndex: 1,
    subtitle:
      "Corte preciso, barba desenhada e um atendimento que respeita seu horário. Sem espera, sem improviso.",
    // Evite estatísticas inventadas aqui (ex: "+500 clientes/mês") — isso é propaganda
    // enganosa se for ao ar sem ser real. Quando o barbeiro tiver avaliações reais no
    // Google, troque por algo como: "★★★★★ 4.8 de 5 — 120 avaliações no Google".
    trustLine: "Resposta no WhatsApp em minutos — sem compromisso",
    ctaLabel: "Reservar meu horário",
    secondaryLabel: "Conhecer serviços",
    photo: {
      src: "/hero/barbeiro-bg.jpg",
      label:
        "Foto de fundo: barbeiro sentado, plano médio — 1600×1400, foco no rosto/barba, espaço livre no topo pro título",
    },
  },

  stickyCta: {
    label: "Reservar meu horário",
  },

  servicesEyebrow: "Cuidado masculino",
  servicesTitle: "Serviços",
  services: [
    { name: "Corte", desc: "Do social clássico ao degradê preciso, sempre na medida certa pro seu rosto.", price: "R$ 30" },
    { name: "Barba", desc: "Toalha quente, navalha afiada e o desenho que só experiência entrega.", price: "R$ 20", featured: true },
    { name: "Aparo de Barba", desc: "Manutenção rápida entre uma sessão completa e outra.", price: "R$ 15" },
    { name: "Facial", desc: "Limpeza profunda e hidratação pra fechar o visual com a pele em dia.", price: "R$ 40" },
    { name: "Styling", desc: "Finalização no produto certo — sem parecer produzido demais.", price: "R$ 25" },
    { name: "Capilar", desc: "Cuidado que fortalece o fio antes que o problema apareça.", price: "R$ 35" },
  ],

  productsEyebrow: "Uso profissional",
  productsTitle: "Produtos da Casa",
  products: [
    { name: "Pincel de Barba", price: "R$ 45", image: "/produtos/pincel.jpg" },
    { name: "Tesoura Profissional", price: "R$ 120", image: "/produtos/tesoura.jpg" },
    { name: "Máquina de Corte", price: "R$ 220", image: "/produtos/maquina.jpg" },
    { name: "Óleo para Barba", price: "R$ 35", image: "/produtos/oleo.jpg" },
    { name: "Pomada Modeladora", price: "R$ 28", image: "/produtos/pomada.jpg" },
  ],

  // ⚠️ Estas fotos de antes/depois são geradas por IA para fins de DEMONSTRAÇÃO
  // (pitch de venda). Antes de publicar pro cliente final, troque por fotos reais
  // de clientes de verdade, com autorização deles — ou ajuste a legenda abaixo
  // para algo como "Exemplos de estilo" em vez de "Resultado real".
  gallery: {
    title: "Transformações",
    subtitle: "Resultado real de quem confiou na cadeira certa.",
    ghostWord: "TRANSFORMAÇÃO",
    pairs: [
      { before: "/galeria/cliente-1-antes.jpg", after: "/galeria/cliente-1-depois.jpg" },
      { before: "/galeria/cliente-2-antes.jpg", after: "/galeria/cliente-2-depois.jpg" },
      { before: "/galeria/cliente-3-antes.jpg", after: "/galeria/cliente-3-depois.jpg" },
      { before: null, after: null },
      { before: null, after: null },
      { before: null, after: null },
    ],
  },

  blogEyebrow: "Dicas & cuidados",
  blogTitle: "Journal",
  blog: [
    {
      title: "O ritual diário que toda barba merece",
      excerpt: "Três passos simples que separam uma barba bem cuidada de uma barba deixada ao acaso.",
      image: "/blog/post-1.jpg",
    },
    {
      title: "Os cortes que vão dominar 2026",
      excerpt: "Do fade texturizado ao clássico revisitado — o que mais está saindo da cadeira este ano.",
      image: "/blog/post-2.jpg",
    },
    {
      title: "Prevenção é mais barata que reparo",
      excerpt: "Pequenos cuidados capilares evitam grandes visitas de emergência depois.",
      image: "/blog/post-3.jpg",
    },
  ],

  // ⚠️ Depoimentos abaixo são EXEMPLOS ILUSTRATIVOS pra demonstração.
  // Antes de publicar pro cliente final, troque por depoimentos reais — com
  // autorização de quem falou. Depoimento inventado atribuído a um nome é
  // propaganda enganosa, mesmo que o texto pareça genérico.
  testimonials: {
    title: "Quem já sentou na cadeira",
    subtitle: "Histórias reais de quem virou cliente fiel.",
    items: [
      { quote: "Cheguei no horário marcado e fui atendido na hora. Isso já vale metade da nota.", name: "Marcos R.", role: "Cliente há 1 ano", rating: 5 },
      { quote: "O desenho da barba saiu exatamente como eu queria, sem eu precisar explicar duas vezes.", name: "Felipe A.", role: "Cliente fixo", rating: 5 },
      { quote: "Troquei de barbearia depois de anos indo na mesma. Não me arrependi uma vez sequer.", name: "Diego S.", role: "Cliente do combo", rating: 5 },
    ],
  },

  cta: {
    lines: ["Sua melhor versão", "começa aqui"],
    whatsappLabel: "Falar agora no WhatsApp",
  },
} as const;

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
  servicesImage: {
    src: "/servicos/oficio.jpg" as string | undefined,
    label:
      "Foto editorial: close-up de mãos de barbeiro segurando navalha e pente, luz dramática lateral, fundo escuro — vertical, 1024×1536",
  },
  services: [
    { slug: "corte", name: "Corte", desc: "Do social clássico ao degradê preciso, sempre na medida certa pro seu rosto.", price: "R$ 30", durationMinutes: 30, icon: "scissors", image: "/servicos/corte.jpg" as string | undefined },
    { slug: "barba", name: "Barba", desc: "Toalha quente, navalha afiada e o desenho que só experiência entrega.", price: "R$ 20", durationMinutes: 25, featured: true, icon: "razor", image: "/servicos/barba.jpg" as string | undefined },
    { slug: "aparo", name: "Aparo de Barba", desc: "Manutenção rápida entre uma sessão completa e outra.", price: "R$ 15", durationMinutes: 15, icon: "clipper", image: "/servicos/aparo.jpg" as string | undefined },
    { slug: "facial", name: "Facial", desc: "Limpeza profunda e hidratação pra fechar o visual com a pele em dia.", price: "R$ 40", durationMinutes: 35, icon: "droplet", image: "/servicos/facial.jpg" as string | undefined },
    { slug: "styling", name: "Styling", desc: "Finalização no produto certo — sem parecer produzido demais.", price: "R$ 25", durationMinutes: 20, icon: "comb", image: "/servicos/styling.jpg" as string | undefined },
    { slug: "capilar", name: "Capilar", desc: "Cuidado que fortalece o fio antes que o problema apareça.", price: "R$ 35", durationMinutes: 30, icon: "leaf", image: "/servicos/capilar.jpg" as string | undefined },
  ],

  // ⚠️ Barbeiros de EXEMPLO pra demonstração. Troque pelos profissionais reais
  // antes de publicar — o "slug" é o identificador interno (sem espaço/acento),
  // usado pra ligar cada barbeiro à sua própria agenda no banco de dados.
  barbers: [
    { slug: "diego", name: "Diego", role: "Mestre Barbeiro", bio: "15 anos de navalha, especialista em barba desenhada.", photo: undefined as string | undefined },
    { slug: "kayo", name: "Kayo", role: "Barbeiro", bio: "Referência em degradê e cortes de tendência.", photo: undefined as string | undefined },
    { slug: "renan", name: "Renan", role: "Barbeiro", bio: "Atendimento infantil e cortes sociais impecáveis.", photo: undefined as string | undefined },
  ],

  // Regras do sistema de agendamento. Fuso fixo (Recife não tem horário de
  // verão desde 2019, então um offset fixo é seguro o ano inteiro).
  booking: {
    utcOffset: "-03:00",
    slotGranularityMinutes: 15,
    minLeadMinutes: 60,
    maxAdvanceDays: 21,
    title: "Agendar horário",
    subtitle: "Escolha o profissional, o serviço e o melhor horário — sem precisar perguntar por WhatsApp se está livre.",
  },

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

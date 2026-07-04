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

  hero: {
    lines: ["SLICK", "STYLE"],
    accentLineIndex: 1,
    subtitle:
      "Cuidado masculino completo: corte, barba e styling num só lugar, com hora marcada de verdade.",
    ctaLabel: "Marcar horário",
    secondaryLabel: "Ver serviços",
    photo: {
      label:
        "Foto de fundo: barbeiro sentado, plano médio — 1600×1400, foco no rosto/barba, espaço livre no topo pro título",
    },
  },

  servicesTitle: "SERVIÇOS",
  services: [
    { name: "Cortes", desc: "Do clássico ao degradê moderno, na régua ou na navalha.", price: "R$ 30" },
    { name: "Barba", desc: "Toalha quente, desenho na régua e acabamento impecável.", price: "R$ 20", featured: true },
    { name: "Aparo de Barba", desc: "Manutenção rápida pra manter o formato em dia.", price: "R$ 15" },
    { name: "Tratamento Facial", desc: "Limpeza e hidratação pra pele de barbeiro satisfeito.", price: "R$ 40" },
    { name: "Styling", desc: "Finalização com produto certo pro seu tipo de cabelo.", price: "R$ 25" },
    { name: "Tratamento Capilar", desc: "Cuidado que previne queda e fortalece o fio.", price: "R$ 35" },
  ],

  productsTitle: "PRODUTOS PREMIUM",
  products: [
    { name: "Pincel de Barba", price: "R$ 45" },
    { name: "Tesoura Profissional", price: "R$ 120" },
    { name: "Máquina de Corte", price: "R$ 220" },
    { name: "Óleo para Barba", price: "R$ 35" },
    { name: "Pomada Modeladora", price: "R$ 28" },
  ],

  gallery: {
    title: "GALERIA DE TRANSFORMAÇÃO",
    subtitle: "Veja o resultado impressionante de quem já passou pela cadeira",
    ghostWord: "TRANSFORMAÇÃO",
    count: 6,
  },

  blogTitle: "DICAS DA BARBEARIA",
  blog: [
    { title: "O guia definitivo do cuidado com a barba", excerpt: "O básico que faz diferença no dia a dia, sem complicar sua rotina." },
    { title: "Cortes em alta para 2026", excerpt: "O que está bombando nas cadeiras da barbearia este ano." },
    { title: "Por que o tratamento capilar regular importa", excerpt: "Pequenos cuidados que evitam grandes problemas depois." },
  ],

  testimonials: {
    title: "FEEDBACKS",
    subtitle: "O que nossos clientes estão dizendo",
    items: [
      { quote: "Cheguei no horário marcado e fui atendido na hora. Isso já vale metade da nota.", name: "Marcos R.", role: "Cliente há 1 ano" },
      { quote: "O desenho da barba saiu exatamente como eu queria.", name: "Felipe A.", role: "Cliente fixo" },
      { quote: "Ambiente gostoso, sem enrolação, saio sempre satisfeito.", name: "Diego S.", role: "Cliente do combo" },
    ],
  },

  cta: {
    lines: ["Bora marcar", "seu horário?"],
    whatsappLabel: "Chamar no WhatsApp",
  },
} as const;

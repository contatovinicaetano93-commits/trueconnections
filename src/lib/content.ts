export const site = {
  name: "True Connection",
  tagline: "Mais do que uma plataforma. Um movimento.",
  description:
    "Comunidade cristã editorial para conectar, crescer e prosperar através de experiências curadas, bem-estar com fé e networking com propósito.",
  whatsapp: "https://wa.me/5511990267044?text=Ol%C3%A1%2C+True+Connection%21",
  logo: "https://media.base44.com/images/public/6a354520e06c23aeee38bc88/ba212491c_D665219E-A89E-42DC-8E50-9F916E0C088B.png",
  mark: "https://media.base44.com/images/public/6a354520e06c23aeee38bc88/68c907e90_IMG_1114.jpeg",
  foundersImage:
    "https://media.base44.com/images/public/6a354520e06c23aeee38bc88/e54ea3c8a_IMG_0784.jpg",
} as const;

export const nav = [
  { href: "#eventos", label: "Eventos" },
  { href: "#associados", label: "Associados" },
  { href: "#impacto", label: "Impacto" },
  { href: "#loja", label: "Loja" },
  { href: "#manifesto", label: "Manifesto" },
  { href: "#contato", label: "Contato" },
] as const;

export const hero = {
  eyebrow: "True Connection",
  headlineBefore: "Bem-vindo ao seu",
  headlineAccent: "refúgio",
  body: "Aqui conectamos pessoas que não se amoldam aos padrões deste mundo, dispostas a se transformar e servir. Porque onde todos servem, não falta para ninguém. Onde houver dois ou mais, lá Ele está.",
} as const;

export const boot = {
  line: "Abrindo o refúgio",
  brand: "True Connection",
  since: "desde 2024",
} as const;

export const marqueeItems = [
  "Na Mesa",
  "Clube de Leitura",
  "Associados",
  "Seja o Milagre",
  "True Action",
  "Método Ruach",
  "Comunhão",
  "Pertencimento",
] as const;

export const journey = [
  { label: "Quem somos", href: "#manifesto" },
  { label: "Encontros", href: "#encontros" },
  { label: "Impacto", href: "#impacto" },
  { label: "Pertencer", href: "#contato" },
] as const;

export const portals = [
  {
    href: "#manifesto",
    title: "Quem Somos",
    subtitle: "Nossa essência e legado",
  },
  {
    href: "#associados",
    title: "Associados",
    subtitle: "Área premium do clube",
  },
  {
    href: "#encontros",
    title: "Encontros",
    subtitle: "Na Mesa & Estudo Bíblico",
  },
  {
    href: "#eventos",
    title: "Próximos Eventos",
    subtitle: "Agenda e ingressos",
  },
  {
    href: "#impacto",
    title: "Impacto Social",
    subtitle: "Instituto Seja o Milagre",
  },
  {
    href: "#true-action",
    title: "True Action",
    subtitle: "Rede curada de profissionais",
  },
  {
    href: "#loja",
    title: "Loja",
    subtitle: "Produtos exclusivos da comunidade",
  },
  {
    href: site.whatsapp,
    title: "Fale Conosco",
    subtitle: "Tire dúvidas no WhatsApp",
    external: true,
  },
] as const;

export const manifesto = {
  title: "Quem Somos",
  lead: "A True Connections nasceu primeiro no coração de Deus antes de nascer no nosso. Sozinhas, nunca imaginaríamos construir algo dessa dimensão, mas entendemos que existia um propósito muito maior por trás de tudo isso.",
  body: "Somos uma comunidade cristã que busca conectar pessoas, criar experiências e construir relacionamentos verdadeiros, mas principalmente nos voltar para Deus e colocá-Lo no centro de tudo o que fazemos.",
  missionTitle: "Nossa Missão",
  mission:
    "Servir ao Senhor e levar Sua palavra aos quatro cantos do Brasil através da comunhão, dos encontros, das experiências e das conexões que estamos construindo. Acreditamos que Deus está formando uma grande rede de pessoas unidas por um mesmo propósito: glorificá-Lo.",
  foundersLabel: "Por trás da True estão três mulheres conectadas pelo mesmo chamado",
  founders: [
    {
      name: "Gabriella Grecco",
      bio: "Apaixonada por comunicação, conexões e por criar ambientes que aproximam pessoas de Deus e umas das outras.",
    },
    {
      name: "Beta Neves",
      bio: "Dentista, apaixonada por fé, família e conexões genuínas, trazendo acolhimento e profundidade para a comunidade.",
    },
    {
      name: "Aline Jabur",
      bio: "Mentora do Método Ruach e fundadora do Yoga For Jesus, conduzindo experiências que unem movimento, presença e espiritualidade.",
    },
  ],
  closing: "Mais do que eventos, a True nasceu para ser um lugar de pertencimento.",
} as const;

export const encontros = {
  title: "Encontros",
  subtitle: "Encontros abertos para toda a comunidade. Sem custo, só presença.",
  items: [
    {
      tag: "Encontro de mulheres",
      title: "Na Mesa",
      body: "O \"Na Mesa\" nasceu em novembro de 2024 de forma muito simples e verdadeira: mulheres reunidas em volta da mesa buscando mais de Deus. Louvamos, compartilhamos a Palavra, oramos e dividimos uma refeição — buscando intimidade com Deus e transformação.",
      meta: "Toda terceira quinta-feira do mês · 14h às 17h · Itinerante",
    },
    {
      tag: "Encontro mensal",
      title: "Clube de Leitura",
      body: "Espaço de crescimento intelectual e espiritual. Lemos obras que nos desafiam a caminhar mais perto de Cristo, compartilhando reflexões e aprendizados.",
      meta: "Toda última sexta-feira do mês · 8h30 às 10h30",
      books: [
        "O Agir Invisível de Deus — Luciano Subirá",
        "Em Busca de Deus — A. W. Tozer",
        "O Poder Secreto da Oração — Mahesh Chavda",
      ],
    },
  ],
} as const;

export const eventos = {
  title: "Próximos Eventos",
  subtitle: "Experiências curadas para sua jornada.",
  items: [
    {
      title: "Pocket Show Michele Mister",
      place: "Rooftop Hotel Mercure Vila Mariana",
      status: "Em breve",
    },
    {
      title: "Aula Método Ruach",
      place: "Rooftop Hotel Mercure Vila Mariana",
      status: "Em breve",
    },
  ],
} as const;

export const impacto = {
  title: "Impacto Social",
  subtitle: "Duas frentes, uma missão: transformar vidas.",
  stats: [
    { value: 2, label: "Projetos ativos", suffix: "" },
    { value: 100, label: "Voluntário", suffix: "%" },
    { value: 5, label: "Frentes de atuação", suffix: "" },
  ],
  projects: [
    {
      tag: "Projeto 01",
      title: "Instituto Seja o Milagre",
      body: "Associação 100% voluntária que depende de doações para transformar realidades. Atua em comunidades com saúde, alimentos, higiene, recreação infantil, vínculos familiares e inclusão profissional via Projeto Conecta Jovem.",
      address: "Rua Primeiro de Janeiro, 47 — Vila Clementino, São Paulo",
      frentes: [
        "Conecta Jovem",
        "Inclusão — Mãos Dadas",
        "Saúde em Ação",
        "Reconstruir",
        "Resgatando Vidas",
      ],
      image:
        "https://media.base44.com/images/public/6a354520e06c23aeee38bc88/e73801d83_IMG_1136.jpeg",
      contact: "Viviane D'Agostino — (11) 9 8799-5050",
    },
    {
      tag: "Projeto 02",
      title: "Base Missionária Itatinga",
      body: "Em um dos bairros com o maior índice de prostituição do Brasil, em Campinas, a visão é construir uma base missionária segura — proteção para crianças e futuro longe da exploração. A missão também alcança a Ilha de Marajó.",
      address: "Itatinga — Campinas, SP · Ilha de Marajó, PA",
      contact: "Thiago Baeta — Líder da missão",
    },
  ],
} as const;

export const trueAction = {
  title: "True Action",
  subtitle: "Rede curada de profissionais da comunidade",
  body: "Conecte-se com talentos que compartilham dos mesmos valores. Encontre o profissional certo para o seu projeto, dentro de uma rede de confiança.",
} as const;

export const loja = {
  title: "Loja",
  subtitle: "Produtos exclusivos da comunidade",
  body: "Itens com a nossa identidade, feitos com carinho para você levar o True Connection para o seu dia a dia.",
  products: [
    {
      name: "Boné Coleção 'Fé e Surto'",
      price: "R$ 60,00",
      stock: "20 un.",
      image:
        "https://media.base44.com/images/public/6a354520e06c23aeee38bc88/9a183623f_IMG_1197.png",
    },
    {
      name: "Boné Coleção 'Planos e Obra'",
      price: "R$ 60,00",
      stock: "20 un.",
      image:
        "https://media.base44.com/images/public/6a354520e06c23aeee38bc88/a0b71fde2_IMG_1196.png",
    },
    {
      name: "Boné Coleção 'Paz e Obra'",
      price: "R$ 60,00",
      stock: "20 un.",
      image:
        "https://media.base44.com/images/public/6a354520e06c23aeee38bc88/f2b52b6f9_IMG_1191.png",
    },
  ],
} as const;

export const qgs = {
  title: "Nossos QGs",
  items: [
    {
      name: "Amém Café",
      address: "Rua Nebraska, 868",
      note: "O primeiro café é por nossa conta pra você que é da True",
      image:
        "https://media.base44.com/images/public/6a354520e06c23aeee38bc88/d93f68212_IMG_1202.jpg",
    },
    {
      name: "Praça Pôr do Sol",
      address: "Praça Pôr do Sol — Pinheiros",
      note: "O primeiro café é por nossa conta pra você que é da True",
      image:
        "https://media.base44.com/images/public/6a354520e06c23aeee38bc88/89d0b7f4c_IMG_1203.jpg",
    },
  ],
} as const;

export const associados = {
  title: "Associados",
  subtitle: "Área premium do clube",
  body: "Um espaço de pertencimento para quem quer viver a True de perto — encontros, conteúdo e conexões com propósito.",
  cta: "Quero fazer parte",
} as const;

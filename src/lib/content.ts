export const site = {
  name: "True Connection",
  tagline: "Mais do que uma plataforma. Um movimento.",
  description:
    "Comunidade cristã que busca conectar pessoas, criar experiências e construir relacionamentos verdadeiros, com Deus no centro.",
  whatsapp: "https://wa.me/5511990267044?text=Ol%C3%A1%2C+True+Connection%21",
  whatsappContato:
    "https://wa.me/5511990267044?text=" +
    encodeURIComponent("Olá! Gostaria de saber mais sobre o True Connection."),
  phone: "(11) 99026-7044",
  phoneHref: "tel:+5511990267044",
  email: "True2.connections@gmail.com",
  emailHref: "mailto:True2.connections@gmail.com",
  hours: "Seg a Sex, 9h às 18h",
  instagram: "https://instagram.com/",
  logo: "https://media.base44.com/images/public/6a354520e06c23aeee38bc88/68c907e90_IMG_1114.jpeg",
  mark: "https://media.base44.com/images/public/6a354520e06c23aeee38bc88/fb103fe77_D665219E-A89E-42DC-8E50-9F916E0C088B.png",
  foundersImage:
    "https://media.base44.com/images/public/6a354520e06c23aeee38bc88/e54ea3c8a_IMG_0784.jpg",
  url: "https://www.trueconnections.com.br",
} as const;

export const nav = [
  { href: "/quem-somos", label: "Quem Somos" },
  { href: "/seja-associado", label: "Associados" },
  { href: "/encontros", label: "Encontros" },
  { href: "/eventos", label: "Eventos" },
  { href: "/impacto", label: "Impacto" },
  { href: site.whatsapp, label: "Fale Conosco", external: true },
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

export const portals = [
  {
    href: "/quem-somos",
    title: "Quem Somos",
    subtitle: "Nossa essência e legado",
    icon: "book",
  },
  {
    href: "/seja-associado",
    title: "Associados",
    subtitle: "Área premium do clube",
    icon: "users",
  },
  {
    href: "/encontros",
    title: "Encontros",
    subtitle: "Na Mesa & Estudo Bíblico",
    icon: "gift",
  },
  {
    href: "/eventos",
    title: "Próximos Eventos",
    subtitle: "Agenda e ingressos",
    icon: "calendar",
  },
  {
    href: "/impacto",
    title: "Impacto Social",
    subtitle: "Instituto Seja o Milagre",
    icon: "heart",
  },
  {
    href: "/true-action",
    title: "True Action",
    subtitle: "Rede curada de profissionais",
    icon: "briefcase",
  },
  {
    href: "/loja",
    title: "Loja",
    subtitle: "Produtos exclusivos da comunidade",
    icon: "bag",
  },
  {
    href: site.whatsapp,
    title: "Fale Conosco",
    subtitle: "Tire dúvidas no WhatsApp",
    icon: "chat",
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
  foundersLabel:
    "Por trás da True estão três mulheres conectadas pelo mesmo chamado",
  foundersImage: site.foundersImage,
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
  closing:
    "Mais do que eventos, a True nasceu para ser um lugar de pertencimento.",
  ctaPrimary: "Fazer parte",
  ctaPrimaryHref: "/seja-associado",
  ctaSecondary: "Fale conosco",
  ctaSecondaryHref: "/contato",
} as const;

export const encontros = {
  title: "Eventos Gratuitos",
  subtitle: "Encontros abertos para toda a comunidade. Sem custo, só presença.",
  booksHeadline: "Já lemos juntas",
  naMesaImages: [
    "https://media.base44.com/images/public/6a354520e06c23aeee38bc88/8c1a3e893_8fb983bf-181d-4f74-a584-f3366b654762.jpg",
    "https://media.base44.com/images/public/6a354520e06c23aeee38bc88/8e4080a60_IMG_1083.jpg",
    "https://media.base44.com/images/public/6a354520e06c23aeee38bc88/9fea2363c_e954937c-9b50-49f0-8bcf-6cae8eee7222.jpg",
    "https://media.base44.com/images/public/6a354520e06c23aeee38bc88/8c649feac_IMG_6640.jpg",
  ],
  items: [
    {
      tag: "Encontro de mulheres",
      title: "Na Mesa",
      paragraphs: [
        'O "Na Mesa" nasceu em novembro de 2024 de forma muito simples e verdadeira: mulheres reunidas em volta da mesa buscando mais de Deus.',
        "Os encontros acontecem de forma itinerante, nas casas de mulheres que desejam abrir suas portas e viver essa comunhão com a gente. Fazemos isso para que todas se sintam pertencentes, acolhidas e parte da comunidade.",
        "Nesses encontros, louvamos ao Senhor, compartilhamos a Palavra, oramos, conversamos e dividimos uma refeição juntas. Mas acima de tudo, buscamos intimidade com Deus e transformação.",
        "Acreditamos profundamente que esses encontros mudam o nosso caminhar. Dividindo lutas, alegrias, dores e testemunhos, ajudamos umas às outras a permanecer firmes na Palavra e sermos instruídas por mulheres que também vivem para Cristo.",
      ],
      italic: "O Na Mesa é sobre comunhão, presença e crescimento espiritual verdadeiro.",
      schedule: "Toda terceira quinta-feira do mês",
      time: "14h às 17h",
      place: "Itinerante — nas casas das mulheres da comunidade",
      cta: "Quero abrir minha casa ou participar",
      ctaHref: "/contato",
    },
    {
      tag: "Encontro mensal",
      title: "Clube de Leitura",
      body: "Nosso espaço de crescimento intelectual e espiritual. Lemos obras que nos desafiam a caminhar mais perto de Cristo, compartilhando reflexões e aprendizados em encontros que nutrem nossa fé e comunhão.",
      schedule: "Toda última sexta-feira do mês",
      time: "8h30 às 10h30",
    },
  ],
  books: [
    {
      title: "O Agir Invisível de Deus",
      author: "Luciano Subirá",
      cover: "https://m.media-amazon.com/images/P/8538303937.01._SCLZZZZZZZ_SX500_.jpg",
      href: "https://www.amazon.com.br/Agir-Invis%C3%ADvel-Deus-Luciano-Subir%C3%A1/dp/8538303937",
    },
    {
      title: "Em Busca de Deus",
      author: "A. W. Tozer",
      cover: "https://m.media-amazon.com/images/I/51aJRU-rpNL._SL1500_.jpg",
      href: "https://www.amazon.com.br/busca-Deus-Aiden-Wilson-Tozer/dp/6589806470",
    },
    {
      title: "O Poder Secreto da Oração",
      author: "Mahesh Chavda",
      cover: "https://m.media-amazon.com/images/P/8538301012.01._SCLZZZZZZZ_SX500_.jpg",
      href: "https://www.amazon.com.br/poder-secreto-ora%C3%A7%C3%A3o-jejum-liberando/dp/8538301012",
    },
  ],
  nextBook: {
    title: "Próximo livro",
    body: "Em definição. Acompanhe nossas redes para votar na próxima obra!",
  },
} as const;

export const eventos = {
  title: "Próximos Eventos",
  subtitle: "Experiências curadas para sua jornada.",
  empty: "Nenhum evento agendado ainda.",
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
  frentes: [
    {
      id: "conecta-jovem",
      title: "Conecta Jovem",
      desc: "Cursos profissionalizantes para jovens e PCDs. Preparação para o mercado de trabalho e incentivo ao empreendedorismo. Capacitação em áreas como estética, barbearia e gastronomia.",
      color: "bg-amber-50",
      accent: "text-amber-600",
    },
    {
      id: "inclusao",
      title: "Inclusão — Mãos Dadas",
      desc: "Atendimento jurídico, social e psicológico para PCDs. Facilitação de acessibilidade e inclusão no esporte e no mercado de trabalho.",
      color: "bg-blue-50",
      accent: "text-blue-600",
    },
    {
      id: "saude-em-acao",
      title: "Saúde em Ação",
      desc: "Atendimentos médicos e odontológicos para comunidades vulneráveis. Distribuição de kits de higiene e medicamentos. Parcerias com profissionais da saúde.",
      color: "bg-rose-50",
      accent: "text-rose-600",
    },
    {
      id: "reconstruir",
      title: "Reconstruir",
      desc: "Reconstrução de moradias afetadas por enchentes, incêndios, alagamentos e desabamentos. Levamos dignidade de volta para famílias que perderam tudo.",
      color: "bg-orange-50",
      accent: "text-orange-600",
    },
    {
      id: "resgatando-vidas",
      title: "Resgatando Vidas",
      desc: "Resgate e apoio a pessoas em situação de rua, com alimentação, abrigo e reinserção social. Presença constante na Cracolândia e em abrigos.",
      color: "bg-teal-50",
      accent: "text-teal-600",
    },
  ],
  projects: [
    {
      tag: "Projeto 1",
      title: "Instituto Seja o Milagre",
      body: "A Associação Seja o Milagre é um projeto 100% voluntário que depende exclusivamente de doações para transformar realidades. Atuamos em diversas comunidades promovendo ações de saúde, entrega de alimentos e itens de higiene, recreação infantil, fortalecimento de vínculos familiares e inclusão social e profissional através do Projeto Conecta Jovem.",
      address: "Rua Primeiro de Janeiro, 47 — Vila Clementino, São Paulo",
      image:
        "https://media.base44.com/images/public/6a354520e06c23aeee38bc88/e73801d83_IMG_1136.jpeg",
      contact: "Viviane D'Agostino — Mentora e Coordenadora",
      phone: "(11) 9 8799-5050",
      phoneHref: "https://wa.me/5511987995050",
      email: "adm.sejaomilagre@gmail.com",
      emailHref: "mailto:adm.sejaomilagre@gmail.com",
      instagram: "@sejaomilagre",
      instagramHref: "https://instagram.com/sejaomilagre",
      cnpj: "CNPJ: 42.240.488/0001-74 • Associação Seja o Milagre",
    },
    {
      tag: "Projeto 2",
      title: "Itatinga",
      paragraphs: [
        "Em um dos bairros com o maior índice de prostituição do Brasil, em Campinas, vivemos uma realidade urgente. Mulheres, muitas vezes vítimas de tráfico humano, são forçadas a se prostituir ao lado de seus filhos, sem ter onde deixá-los.",
        "Nossa visão é construir uma base missionária segura no coração dessa comunidade. O objetivo central é oferecer um ambiente de proteção para essas crianças, tirando-as da vulnerabilidade e proporcionando um futuro longe do ambiente de exploração.",
      ],
      marajo:
        "Além da atuação em Itatinga, este braço missionário também estende sua missão à Ilha de Marajó, levando esperança e assistência às comunidades ribeirinhas do Pará.",
      address: "Itatinga — Campinas, SP",
      contact: "Thiago Baeta — Líder da missão Itatinga e Marajó",
      leaderNote: "Quer saber mais, ser voluntário ou apoiar esta causa?",
      leaderCta: "Falar com Thiago Baeta",
      leaderHref: "https://wa.me/5511992846796",
    },
  ],
  donation: {
    title: "Faça uma doação",
    body: "Contribua com qualquer valor via PIX. Sua doação transforma vidas.",
    pixKey:
      "00020126580014br.gov.bcb.pix0136institutosejaomilagre5204000053039865802BR5919Instituto SJM6009Sao Paulo62070503***6304A1B2",
    footer: "Instituto Seja o Milagre • CNPJ: 42.240.488/0001-74",
  },
  howToHelp: {
    title: "Como Ajudar",
    items: [
      {
        title: "Seja um associado",
        body: "Contribua mensalmente com qualquer valor para a manutenção dos projetos.",
        href: "/seja-associado",
      },
      {
        title: "Faça doações",
        body: "Roupas, alimentos, produtos de higiene e outros itens para quem precisa.",
        href: "https://wa.me/5511987995050",
        external: true,
      },
      {
        title: "Seja voluntário",
        body: "Doe tempo e talento — saúde, recreação, mentoria e presença.",
        href: "https://wa.me/5511987995050",
        external: true,
      },
    ],
  },
} as const;

export const trueAction = {
  title: "True Action",
  subtitle: "Rede curada de profissionais da comunidade",
  body: "Conecte-se com talentos que compartilham dos mesmos valores. Encontre o profissional certo para o seu projeto, dentro de uma rede de confiança.",
  empty: "Nenhum profissional encontrado.",
  cta: "Quero indicar ou me cadastrar",
  whatsapp:
    "https://wa.me/5511990267044?text=Ol%C3%A1%21%20Quero%20conhecer%20os%20profissionais%20da%20True%20Action.",
} as const;

export const loja = {
  title: "Loja",
  subtitle: "Produtos exclusivos da comunidade",
  body: "Itens com a nossa identidade, feitos com carinho para você levar o True Connection para o seu dia a dia.",
  pixEmail: "True2.connections@gmail.com",
  products: [
    {
      id: 1,
      name: "Boné Coleção 'Fé e Surto'",
      description:
        "Boné de algodão premium. Frente: 'fé em Deus' — Verso: 'o surtando de leve'. Identidade True.Co no fecho.",
      price: "R$ 60,00",
      stock: 20,
      image:
        "https://media.base44.com/images/public/6a354520e06c23aeee38bc88/9a183623f_IMG_1197.png",
    },
    {
      id: 2,
      name: "Boné Coleção 'Planos e Obra'",
      description:
        "Boné de veludo premium azul claro. Frente: 'Os planos de Deus são perfeitos' — Verso: 'se eu não atrapalhar'. True.Co no fecho.",
      price: "R$ 60,00",
      stock: 20,
      image:
        "https://media.base44.com/images/public/6a354520e06c23aeee38bc88/a0b71fde2_IMG_1196.png",
    },
    {
      id: 3,
      name: "Boné Coleção 'Paz e Obra'",
      description:
        "Boné de algodão premium caramelo. Frente: 'Na paz de Deus' — Verso: 'em obras comigo'. True.Co no fecho.",
      price: "R$ 60,00",
      stock: 20,
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
  exclusiveTitle: "Área Exclusiva",
  body: "Torne-se um Associado True Connection e acesse o diretório de membros, estudos bíblicos, Método Ruach e benefícios exclusivos.",
  planLabel: "Plano Mensal",
  planPrice: "R$ 49,90",
  planPeriod: "/mês",
  planNote: "O valor da mensalidade vira crédito para 1 evento pago por mês.",
  cta: "Quero me Associar",
  ctaHref: "/associados/cadastro",
  cancelNote: "Cancele quando quiser.",
  membersCta: "Área de membros",
  membersHref: "/associados/login",
  mark: site.mark,
} as const;

export const contato = {
  title: "Fale com a gente",
  subtitle: "Estamos aqui para ajudar. Escolha o canal de sua preferência.",
  channels: [
    {
      label: "Telefone",
      value: site.phone,
      href: site.phoneHref,
    },
    {
      label: "E-mail",
      value: site.email,
      href: site.emailHref,
    },
    {
      label: "WhatsApp",
      value: "Atendimento rápido",
      href: site.whatsappContato,
      external: true,
    },
  ],
  hoursLabel: "Horário de atendimento",
  hours: site.hours,
} as const;

export const heroSlides = [
  {
    src: "/images/fundadoras.png",
    caption: "Aline e Gabriella — o chamado por trás da True",
  },
] as const;

export const quote = {
  text: "Mais do que eventos, a True nasceu para ser um lugar de pertencimento.",
  attribution: "Fundadoras — Gabriella, Beta e Aline",
} as const;

export const presence = {
  title: "Presença",
  subtitle: "Onde a comunidade se encontra de verdade.",
  items: [
    {
      src: "/images/fundadoras.png",
      label: "Fundadoras",
    },
  ],
} as const;

export const fullBleed = {
  eyebrow: "Na Mesa",
  body: "Louvamos, oramos, compartilhamos a Palavra e dividimos uma refeição. Comunhão que transforma o caminhar.",
  image: "/images/meditacao.jpg",
  cta: "Conhecer os encontros",
  href: "/encontros",
} as const;

export const faq = [
  {
    q: "A True é só para mulheres?",
    a: "Os encontros Na Mesa nascem do coração feminino da comunidade, mas a True é um movimento de pertencimento cristão — eventos, impacto e rede abrem espaço para quem compartilha do mesmo chamado.",
  },
  {
    q: "Como faço para participar?",
    a: "Fale conosco no WhatsApp ou pela página de Contato. Contamos sobre os próximos encontros, a área de associados e como se aproximar da comunidade.",
  },
  {
    q: "Os encontros são pagos?",
    a: "Na Mesa e o Clube de Leitura são abertos e sem custo — só presença. Eventos especiais e a área de associados têm condições próprias, sempre comunicadas com clareza.",
  },
] as const;

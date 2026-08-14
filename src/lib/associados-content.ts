export type AssociadosTab = "beneficios" | "ruach" | "estudos" | "leme";

export const ASSOCIADOS_TABS: {
  id: AssociadosTab;
  label: string;
}[] = [
  { id: "beneficios", label: "Benefícios" },
  { id: "ruach", label: "Método Ruach" },
  { id: "estudos", label: "Estudos" },
  { id: "leme", label: "Instituto Lume" },
];

export const OLD_TESTAMENT_BOOKS = [
  "Gênesis",
  "Êxodo",
  "Levítico",
  "Números",
  "Deuteronômio",
  "Josué",
  "Juízes",
  "Rute",
  "1 Samuel",
  "2 Samuel",
  "1 Reis",
  "2 Reis",
  "1 Crônicas",
  "2 Crônicas",
  "Esdras",
  "Neemias",
  "Ester",
  "Jó",
  "Salmos",
  "Provérbios",
  "Eclesiastes",
  "Cantares",
  "Isaías",
  "Jeremias",
  "Lamentações",
  "Ezequiel",
  "Daniel",
  "Oseias",
  "Joel",
  "Amós",
  "Obadias",
  "Jonas",
  "Miqueias",
  "Naum",
  "Habacuque",
  "Sofonias",
  "Ageu",
  "Zacarias",
  "Malaquias",
] as const;

export const NEW_TESTAMENT_BOOKS = [
  "Mateus",
  "Marcos",
  "Lucas",
  "João",
  "Atos",
  "Romanos",
  "1 Coríntios",
  "2 Coríntios",
  "Gálatas",
  "Efésios",
  "Filipenses",
  "Colossenses",
  "1 Tessalonicenses",
  "2 Tessalonicenses",
  "1 Timóteo",
  "2 Timóteo",
  "Tito",
  "Filemom",
  "Hebreus",
  "Tiago",
  "1 Pedro",
  "2 Pedro",
  "1 João",
  "2 João",
  "3 João",
  "Judas",
  "Apocalipse",
] as const;

export const RUACH_HERO_IMAGE =
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=450&fit=crop";

export const RUACH_LESSONS = [
  { title: "Respiração Consciente", duration: "12min" },
  { title: "Conexão Espiritual", duration: "12min" },
  { title: "Corpo em Movimento", duration: "12min" },
] as const;

export const LUME_HERO_IMAGE =
  "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=450&fit=crop";

export const LUME_WEBSITE = "https://institutoleme.com.br";

export const LUME_VIDEOS = [
  {
    title: "Neuroplasticidade e fé",
    description:
      "Como o cérebro se reorganiza quando entendemos como fomos desenhados.",
    duration: "18min",
  },
  {
    title: "Padrões emocionais",
    description:
      "Por que a informação, a emoção e a repetição criam ciclos — e como quebrá-los.",
    duration: "22min",
  },
  {
    title: "O coração e seu sistema nervoso",
    description:
      "A ciência por trás do que a fé sempre soube: o coração decide antes de pensar.",
    duration: "15min",
  },
] as const;

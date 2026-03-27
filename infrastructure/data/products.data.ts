import { ComboOffer, Product } from '@/domain/product'

export const products: Product[] = [
  {
    id: '1',
    name: 'ORÁCULO DO CACAU',
    subtitle: 'Portal de Sabedoria Ancestral',
    description:
      'Um guia intuitivo para momentos de dúvida, transição e crescimento.',
    features: [
      'O Oráculo da Cacau é uma ferramenta terapêutica e intuitiva composta por 52 cartas com mensagens profundas e direcionadoras, criadas para apoiar processos de autoconhecimento, cura emocional e conexão espiritual.',
      'Inspirado na medicina do cacau e na escuta do coração, cada carta oferece reflexões que auxiliam em momentos de dúvida, transição ou busca interior, trazendo clareza, acolhimento e consciência para suas escolhas.',
      'Mais do que respostas prontas, o Oráculo da Cacau conduz você a acessar sua própria verdade, fortalecendo a intuição e ampliando sua percepção sobre os caminhos da vida.',
      'Ideal para quem deseja desenvolver a sensibilidade espiritual, aprofundar o autoconhecimento e transformar desafios em oportunidades de crescimento.',
    ],
    price: 147.00,
    image: '/images/Gemini_Generated_Image_7ug0rt7ug0rt7ug0.png',
  },
  {
    id: '2',
    name: 'PLANNER DO CACAU',
    subtitle: 'Organize Suas Intenções',
    description:
      'Planejamento com alma para uma vida mais alinhada e produtiva.',
    features: [
      'O Planner da Cacau foi criado para quem deseja organizar a rotina sem perder a conexão consigo mesma. Mais do que um planner comum, ele une planejamento prático e desenvolvimento pessoal, ajudando você a transformar metas, emoções e intenções em ações conscientes no dia a dia',
      'Com espaços guiados para reflexões, práticas de autoconhecimento e organização intuitiva, ele apoia equilíbrio emocional, clareza mental e alinhamento com seus ciclos e objetivoss',
      'Ideal para mulheres que buscam mais foco, presença e propósito enquanto constroem uma vida mais leve e significativa',
    ],
    price: 157.00,
    image: '/images/planner-cacau2.jpg',
  },
]

export const combo: ComboOffer = {
  name: 'COMBO COMPLETO: ORÁCULO + PLANNER',
  description: 'Adquira os dois produtos e ganhe desconto especial',
  originalPrice: 304.00,
  discountPrice: 269.90,
}


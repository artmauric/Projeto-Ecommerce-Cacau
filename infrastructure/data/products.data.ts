import { ComboOffer, Product } from '@/domain/product'

export const products: Product[] = [
  {
    id: '1',
    name: 'ORÁCULO DO CACAU',
    subtitle: 'Portal de Sabedoria Ancestral',
    description:
      'O único oráculo que conecta você à medicina sagrada do cacao. Com 44 cartas para autoconhecimento e transformação espiritual.',
    features: [
      '44 cartas ilustradas com simbologia do cacao sagrado',
      'Guia completo de interpretação e spreads',
      'Conexão com a energia ancestral do cacao',
      'Embalagem premium com pano para leitura',
      'Perfeito para rituais e meditações diárias',
    ],
    price: 197.0,
    image: '/images/oraculo-cacau.png',
  },
  {
    id: '2',
    name: 'PLANNER DO CACAU',
    subtitle: 'Organize Suas Intenções',
    description:
      'Ferramenta de manifestação e organização espiritual conectada à energia do cacau sagrado.',
    features: [
      '12 meses de planejamento consciente',
      'Páginas especiais para rituais e cerimônias',
      'Espaço para gratidão e reflexões diárias',
      'Capa dura luxuosa com detalhes em dourado',
      'Papel premium de alta qualidade',
    ],
    price: 147.0,
    image: '/images/planner-cacau2.jpg',
  },
]

export const combo: ComboOffer = {
  name: 'COMBO COMPLETO: ORÁCULO + PLANNER',
  description: 'Adquira os dois produtos e ganhe desconto especial',
  originalPrice: 317.0,
  discountPrice: 297.0,
}


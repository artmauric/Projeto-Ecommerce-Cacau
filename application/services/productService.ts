import { ComboOffer, Product } from '@/domain/product'
import { combo, products } from '@/infrastructure/data/products.data'

export const productService = {
  list: (): Product[] => products,
  getCombo: (): ComboOffer => combo,
}


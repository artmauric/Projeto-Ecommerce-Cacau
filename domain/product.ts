export interface Product {
  id: string
  name: string
  subtitle?: string
  description: string
  features?: string[]
  price: number
  image?: string
}

export interface ComboOffer {
  name: string
  description: string
  originalPrice: number
  discountPrice: number
}


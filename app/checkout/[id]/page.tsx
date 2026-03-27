import { productService } from '@/application/services/productService'
import { notFound } from 'next/navigation'
import CheckoutClient, { CheckoutItem } from './CheckoutClient'

export default function CheckoutPage({
  params,
}: {
  params: { id: string }
}) {
  const id = params.id

  const products = productService.list()
  const combo = productService.getCombo()

  let item: CheckoutItem | null = null

  if (id === 'combo') {
    item = {
      kind: 'combo',
      id: 'combo',
      name: combo.name,
      description: combo.description,
      originalPrice: combo.originalPrice,
      discountPrice: combo.discountPrice,
      includedProductNames: products.map((p) => p.name),
    }
  } else {
    const product = products.find((p) => p.id === id)
    if (!product) {
      notFound()
    }

    item = {
      kind: 'product',
      id: product.id,
      name: product.name,
      subtitle: product.subtitle,
      description: product.description,
      price: product.price,
      image: product.image,
    }
  }

  return <CheckoutClient item={item} />
}


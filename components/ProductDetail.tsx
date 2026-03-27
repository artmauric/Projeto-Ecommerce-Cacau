'use client'

import { Product } from '@/domain/product'
import { useRouter } from 'next/navigation'

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const router = useRouter()

  const handleBuy = () => {
    router.push(`/checkout/${product.id}`)
  }

  return (
    <div className="product-detail">
      <div className="product-detail-image">
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <div className="product-image-placeholder">
            <span>Imagem do Produto</span>
          </div>
        )}
      </div>
      <div className="product-detail-info">
        <h2 className="product-detail-name serif-heading">{product.name}</h2>
        {product.subtitle && (
          <p className="product-detail-subtitle serif-subtitle">{product.subtitle}</p>
        )}
        <p className="product-detail-description">{product.description}</p>
        {product.features && product.features.length > 0 && (
          <ul className="product-features">
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        )}
        <div className="product-detail-price-section">
          <span className="price-label">Investimento</span>
          <div className="product-detail-price">
            {product.price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </div>
        </div>
        <button className="product-detail-button" onClick={handleBuy}>
          QUERO ESTE
        </button>
      </div>
    </div>
  )
}


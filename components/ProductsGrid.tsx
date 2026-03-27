'use client'

import { Product } from '@/domain/product'
import { useRouter } from 'next/navigation'

interface ProductsGridProps {
  products: Product[]
}

export default function ProductsGrid({ products }: ProductsGridProps) {
  const router = useRouter()

  const handleBuy = (product: Product) => {
    router.push(`/checkout/${product.id}`)
  }

  return (
    <div className="products-grid-section">
      <div className="section-header">
        <h2 className="section-title serif-heading">ESCOLHA SEU PRODUTO</h2>
        <div className="section-accent-line"></div>
        <p className="section-subtitle">
          Invista em sua jornada espiritual com nossos produtos exclusivos
        </p>
      </div>
      <div className="products-grid-cards">
        {products.map((product) => (
          <div key={product.id} className="product-grid-card">
            <div className="product-grid-image">
              {product.image ? (
                <img src={product.image} alt={product.name} />
              ) : (
                <div className="product-image-placeholder">
                  <span>Imagem do Produto</span>
                </div>
              )}
            </div>
            <div className="product-grid-info">
              <h3 className="product-grid-name">{product.name}</h3>
              {product.features && product.features.length > 0 && (
                <ul className="product-grid-features">
                  {product.features.slice(0, 4).map((feature, index) => (
                    <li key={index}>
                      <span className="checkmark">✓</span> {feature}
                    </li>
                  ))}
                </ul>
              )}
              <div className="product-grid-price">
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </div>
              <button className="product-grid-button" onClick={() => handleBuy(product)}>
                COMPRAR AGORA
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


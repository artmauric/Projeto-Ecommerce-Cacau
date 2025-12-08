'use client'

import { Product } from '@/types/product'
import { theme } from '@/config/theme'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const handleBuy = () => {
    // Aqui você pode adicionar a lógica de compra
    // Por exemplo, redirecionar para um checkout, abrir um modal, etc.
    alert(`Você clicou para comprar: ${product.name}`)
    // Exemplo: window.location.href = `/checkout/${product.id}`
    // Exemplo: window.open(`https://seu-link-de-pagamento.com/produto/${product.id}`, '_blank')
  }

  // Determina as classes CSS baseadas na configuração do tema
  const cardClass = `product-card ${theme.cards.style === 'flat' ? 'flat' : ''} ${theme.cards.style === 'minimal' ? 'minimal' : ''}`
  const buttonClass = `buy-button ${theme.buttons.style === 'outline' ? 'outline' : ''} ${theme.buttons.style === 'rounded' ? 'rounded' : ''}`

  return (
    <div className={cardClass}>
      <div className="product-image">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        ) : (
          <span>Imagem do Produto</span>
        )}
      </div>
      <div className="product-info">
        <h2 className="product-name">{product.name}</h2>
        {product.description && (
          <p className="product-description">{product.description}</p>
        )}
        <div className="product-price">
          {product.price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </div>
        <button className={buttonClass} onClick={handleBuy}>
          {theme.buttons.textTransform === 'uppercase' 
            ? 'Comprar Agora'.toUpperCase() 
            : 'Comprar Agora'}
        </button>
      </div>
    </div>
  )
}


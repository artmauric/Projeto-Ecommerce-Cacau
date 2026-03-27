'use client'

import { ComboOffer } from '@/domain/product'
import { useRouter } from 'next/navigation'

interface ComboSectionProps {
  combo: ComboOffer
}

export default function ComboSection({ combo }: ComboSectionProps) {
  const router = useRouter()

  const handleBuyCombo = () => {
    router.push('/checkout/combo')
  }

  return (
    <section className="combo-section">
      <div className="container">
        <div className="combo-card">
          <div className="combo-badge">OFERTA ESPECIAL</div>
          <h2 className="combo-title">{combo.name}</h2>
          <p className="combo-description">{combo.description}</p>
          <div className="combo-pricing">
            <span className="combo-original-price">
              {combo.originalPrice.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
            <span className="combo-discount-price">
              {combo.discountPrice.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </div>
          <button className="combo-button" onClick={handleBuyCombo}>
            QUERO O COMBO COM DESCONTO
          </button>
        </div>
      </div>
    </section>
  )
}


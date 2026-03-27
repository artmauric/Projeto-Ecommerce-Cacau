'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

type CheckoutKind = 'product' | 'combo'

export type CheckoutItem =
  | {
      kind: 'product'
      id: string
      name: string
      subtitle?: string
      description: string
      price: number
      image?: string
    }
  | {
      kind: 'combo'
      id: 'combo'
      name: string
      description: string
      originalPrice: number
      discountPrice: number
      includedProductNames: string[]
    }

export default function CheckoutClient({ item }: { item: CheckoutItem }) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [whatsApp, setWhatsApp] = useState('')
  const [cep, setCep] = useState('')
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState('')
  const [complement, setComplement] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const priceLabel = useMemo(() => {
    if (item.kind === 'combo') {
      return item.discountPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }
    return item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }, [item])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="checkout">
      <div className="checkout-header">
        <Link className="checkout-back" href="/">
          Voltar para a página inicial
        </Link>
        <h1 className="checkout-title serif-heading">Checkout</h1>
        <p className="checkout-subtitle">
          Você está a um passo de finalizar sua compra. O pagamento será integrado na próxima etapa.
        </p>
      </div>

      <div className="checkout-grid">
        <section className="checkout-summary" aria-label="Resumo do pedido">
          <h2 className="checkout-section-title serif-heading">Resumo</h2>

          <div className="checkout-summary-card">
            <div className="checkout-summary-top">
              <div className="checkout-summary-info">
                <div className="checkout-item-name">{item.name}</div>
                {'subtitle' in item && item.subtitle ? (
                  <div className="checkout-item-subtitle">{item.subtitle}</div>
                ) : null}
              </div>

              <div className="checkout-item-price">{priceLabel}</div>
            </div>

            {item.kind === 'product' ? (
              <>
                {item.image ? (
                  <div className="checkout-image-wrap">
                    <img className="checkout-image" src={item.image} alt={item.name} />
                  </div>
                ) : null}
                <p className="checkout-item-description">{item.description}</p>
              </>
            ) : (
              <>
                <p className="checkout-item-description">{item.description}</p>
                <div className="checkout-combo-includes">
                  <div className="checkout-combo-label">Inclui</div>
                  <ul className="checkout-combo-list">
                    {item.includedProductNames.map((name) => (
                      <li key={name}>{name}</li>
                    ))}
                  </ul>
                </div>
                <div className="checkout-combo-prices">
                  <span className="checkout-combo-original">
                    {item.originalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                  <span className="checkout-combo-discount">
                    {item.discountPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </div>
              </>
            )}
          </div>
        </section>

        <section className="checkout-form" aria-label="Dados do comprador">
          <h2 className="checkout-section-title serif-heading">Seus dados</h2>

          <form className="checkout-form-card" onSubmit={handleSubmit}>
            <label className="checkout-field">
              <span className="checkout-label">Nome completo</span>
              <input
                className="checkout-input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Seu nome e sobrenome"
                required
                autoComplete="name"
              />
            </label>

            <label className="checkout-field">
              <span className="checkout-label">E-mail</span>
              <input
                className="checkout-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seuemail@exemplo.com"
                required
                autoComplete="email"
              />
            </label>

            <label className="checkout-field">
              <span className="checkout-label">WhatsApp (opcional)</span>
              <input
                className="checkout-input"
                value={whatsApp}
                onChange={(e) => setWhatsApp(e.target.value)}
                placeholder="(xx) xxxxx-xxxx"
                autoComplete="tel"
              />
            </label>

            <div className="checkout-divider" aria-hidden="true"></div>

            <div className="checkout-address-header">
              <div className="checkout-address-title serif-heading">Endereço</div>
              <div className="checkout-address-hint">Para envio do produto físico.</div>
            </div>

            <div className="checkout-address-grid">
              <label className="checkout-field">
                <span className="checkout-label">CEP</span>
                <input
                  className="checkout-input"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  placeholder="00000-000"
                  required
                  inputMode="numeric"
                  autoComplete="postal-code"
                />
              </label>

              <label className="checkout-field">
                <span className="checkout-label">UF</span>
                <input
                  className="checkout-input"
                  value={state}
                  onChange={(e) => setState(e.target.value.toUpperCase())}
                  placeholder="SP"
                  required
                  autoComplete="address-level1"
                  maxLength={2}
                />
              </label>

              <label className="checkout-field checkout-field--span2">
                <span className="checkout-label">Rua</span>
                <input
                  className="checkout-input"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Nome da rua / avenida"
                  required
                  autoComplete="street-address"
                />
              </label>

              <label className="checkout-field">
                <span className="checkout-label">Número</span>
                <input
                  className="checkout-input"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="123"
                  required
                  autoComplete="address-line2"
                />
              </label>

              <label className="checkout-field">
                <span className="checkout-label">Complemento (opcional)</span>
                <input
                  className="checkout-input"
                  value={complement}
                  onChange={(e) => setComplement(e.target.value)}
                  placeholder="Apto, casa, bloco..."
                />
              </label>

              <label className="checkout-field">
                <span className="checkout-label">Bairro</span>
                <input
                  className="checkout-input"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  placeholder="Seu bairro"
                  required
                  autoComplete="address-level3"
                />
              </label>

              <label className="checkout-field">
                <span className="checkout-label">Cidade</span>
                <input
                  className="checkout-input"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Sua cidade"
                  required
                  autoComplete="address-level2"
                />
              </label>
            </div>

            <button className="checkout-primary" type="submit">
              Continuar para o pagamento
            </button>

            {submitted ? (
              <div className="checkout-note" role="status">
                Pagamento ainda não integrado. Próximo passo: conectar o gateway com uma rota de servidor segura, sem expor
                chaves nem lógica sensível no cliente.
              </div>
            ) : (
              <div className="checkout-note">
                Ao continuar, você será direcionado para o pagamento (quando o gateway estiver integrado).
              </div>
            )}
          </form>
        </section>
      </div>
    </div>
  )
}


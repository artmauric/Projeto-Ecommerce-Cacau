'use client'

import Link from 'next/link'
import { useMemo, useRef, useState } from 'react'

function onlyDigits(value: string) {
  return value.replace(/\D/g, '').slice(0, 8)
}

function formatCepDisplay(digits: string) {
  if (digits.length <= 5) return digits
  return `${digits.slice(0, 5)}-${digits.slice(5)}`
}

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [cepLookupLoading, setCepLookupLoading] = useState(false)
  const [cepLookupError, setCepLookupError] = useState<string | null>(null)
  const lastLookupCepRef = useRef<string | null>(null)

  const priceLabel = useMemo(() => {
    if (item.kind === 'combo') {
      return item.discountPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }
    return item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }, [item])

  const handleCepDigitsChange = (raw: string) => {
    const digits = onlyDigits(raw)
    setCep(formatCepDisplay(digits))
    setCepLookupError(null)
    if (digits.length < 8) {
      lastLookupCepRef.current = null
    }
  }

  const lookupCep = async () => {
    const digits = onlyDigits(cep)
    if (digits.length !== 8) {
      setCepLookupError(null)
      return
    }
    if (lastLookupCepRef.current === digits) return

    setCepLookupLoading(true)
    setCepLookupError(null)

    try {
      const response = await fetch(`/api/cep/${digits}`)
      const data = (await response.json()) as {
        street?: string
        neighborhood?: string
        city?: string
        state?: string
        error?: string
      }

      if (!response.ok) {
        setCepLookupError(data.error || 'CEP não encontrado.')
        lastLookupCepRef.current = null
        return
      }

      lastLookupCepRef.current = digits
      if (data.street) setStreet(data.street)
      if (data.neighborhood) setNeighborhood(data.neighborhood)
      if (data.city) setCity(data.city)
      if (data.state) setState(data.state)
    } catch {
      setCepLookupError('Não foi possível buscar o endereço. Tente novamente.')
      lastLookupCepRef.current = null
    } finally {
      setCepLookupLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(false)
    setSubmitError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/mercadopago/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId: item.id,
          customer: {
            fullName,
            email,
            whatsApp,
          },
          address: {
            cep,
            street,
            number,
            complement,
            neighborhood,
            city,
            state,
          },
        }),
      })

      const data = (await response.json()) as { checkoutUrl?: string; error?: string }

      if (!response.ok || !data.checkoutUrl) {
        throw new Error(data.error || 'Não foi possível iniciar o pagamento no momento.')
      }

      setSubmitted(true)
      window.location.href = data.checkoutUrl
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Erro inesperado ao iniciar pagamento.')
    } finally {
      setIsSubmitting(false)
    }
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
              <div className="checkout-address-hint">
                Para envio do produto físico. Digite o CEP: rua, bairro, cidade e UF são preenchidos
                automaticamente (ViaCEP).
              </div>
            </div>

            <div className="checkout-address-grid">
              <label className="checkout-field">
                <span className="checkout-label">CEP</span>
                <input
                  className="checkout-input"
                  value={cep}
                  onChange={(e) => handleCepDigitsChange(e.target.value)}
                  onBlur={() => lookupCep()}
                  placeholder="00000-000"
                  required
                  inputMode="numeric"
                  autoComplete="postal-code"
                  aria-busy={cepLookupLoading}
                />
                {cepLookupLoading ? (
                  <span className="checkout-cep-status">Buscando endereço...</span>
                ) : null}
                {cepLookupError ? (
                  <span className="checkout-cep-status checkout-cep-status--error" role="alert">
                    {cepLookupError}
                  </span>
                ) : null}
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

            <button className="checkout-primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Iniciando pagamento...' : 'Continuar para o pagamento'}
            </button>

            {submitError ? (
              <div className="checkout-note" role="alert">
                {submitError}
              </div>
            ) : null}

            {submitted ? (
              <div className="checkout-note" role="status">
                Redirecionando para o Mercado Pago...
              </div>
            ) : (
              <div className="checkout-note">
                Ao continuar, você será direcionado com segurança para o Mercado Pago.
              </div>
            )}
          </form>
        </section>
      </div>
    </div>
  )
}


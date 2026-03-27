import Link from 'next/link'

export default function CheckoutFailurePage() {
  return (
    <main className="checkout-status-page">
      <div className="checkout-status-card">
        <h1 className="checkout-status-title serif-heading">Pagamento não concluído</h1>
        <p className="checkout-status-text">
          O pagamento foi cancelado ou não pôde ser processado. Você pode tentar novamente quando quiser.
        </p>
        <Link href="/" className="checkout-primary checkout-status-button">
          Voltar para a página inicial
        </Link>
      </div>
    </main>
  )
}


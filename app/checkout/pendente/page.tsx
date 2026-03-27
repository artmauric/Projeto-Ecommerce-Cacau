import Link from 'next/link'

export default function CheckoutPendingPage() {
  return (
    <main className="checkout-status-page">
      <div className="checkout-status-card">
        <h1 className="checkout-status-title serif-heading">Pagamento pendente</h1>
        <p className="checkout-status-text">
          Seu pagamento está em análise pelo Mercado Pago. Assim que houver confirmação, você receberá a atualização.
        </p>
        <Link href="/" className="checkout-primary checkout-status-button">
          Voltar para a página inicial
        </Link>
      </div>
    </main>
  )
}


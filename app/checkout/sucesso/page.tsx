import Link from 'next/link'

export default function CheckoutSuccessPage() {
  return (
    <main className="checkout-status-page">
      <div className="checkout-status-card">
        <h1 className="checkout-status-title serif-heading">Pagamento aprovado</h1>
        <p className="checkout-status-text">
          Recebemos a confirmação do seu pagamento. Em breve você receberá as próximas instruções no e-mail informado.
        </p>
        <Link href="/" className="checkout-primary checkout-status-button">
          Voltar para a página inicial
        </Link>
      </div>
    </main>
  )
}


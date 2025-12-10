'use client'

export default function HeroSection() {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('produtos')
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title serif-heading">CACAU SAGRADO</h1>
        <p className="hero-subtitle serif-subtitle">Oráculo & Planner do Cacau</p>
        <p className="hero-description">
          Desperte sua conexão espiritual através da sabedoria ancestral do Cacau. 
          Ferramentas únicas de autoconhecimento e transformação.
        </p>
        <button className="hero-button" onClick={scrollToProducts}>
          DESCUBRIR OS PRODUTOS
        </button>
      </div>
      <div className="hero-background">
        {/* Elementos decorativos podem ser adicionados aqui */}
      </div>
    </section>
  )
}


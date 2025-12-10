export default function Testimonials() {
  const testimonials = [
    {
      text: 'O Oráculo do Cacau transformou minha conexão espiritual. Cada carta traz mensagens profundas que ressoam com minha jornada.',
      author: 'ANA CAROLINA',
    },
    {
      text: 'O Planner me ajuda a organizar minhas intenções diárias com consciência. A qualidade e o design são impressionantes!',
      author: 'MARINA SILVA',
    },
    {
      text: 'Produtos lindos e com uma energia incrível. Uso ambos diariamente em minha prática espiritual.',
      author: 'JULIANA SANTOS',
    },
  ]

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title serif-heading">O QUE DIZEM SOBRE NÓS</h2>
          <div className="section-accent-line"></div>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-stars">
                {'★'.repeat(5)}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <p className="testimonial-author">{testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


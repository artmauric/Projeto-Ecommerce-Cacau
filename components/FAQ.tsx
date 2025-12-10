'use client'

import { useState } from 'react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'COMO FUNCIONA O ORÁCULO DO CACAU?',
      answer: 'O Oráculo do Cacau é um sistema de 44 cartas que conecta você à sabedoria ancestral do cacau sagrado. Cada carta traz mensagens e orientações para sua jornada espiritual e autoconhecimento.',
    },
    {
      question: 'O PLANNER DO CACAU É FÍSICO OU DIGITAL?',
      answer: 'O Planner do Cacau é um produto físico, com capa dura luxuosa, papel premium e detalhes em dourado. É uma ferramenta tangível para sua prática espiritual diária.',
    },
    {
      question: 'POSSO USAR OS PRODUTOS SEM EXPERIÊNCIA PRÉVIA?',
      answer: 'Sim! Ambos os produtos foram criados para serem acessíveis tanto para iniciantes quanto para praticantes experientes. Incluem guias completos e instruções detalhadas.',
    },
    {
      question: 'QUAL O PRAZO DE ENTREGA?',
      answer: 'O prazo de entrega varia conforme sua localização. Geralmente, enviamos em até 5 dias úteis após a confirmação do pagamento. Você receberá um código de rastreamento por email.',
    },
    {
      question: 'OS PRODUTOS TÊM GARANTIA?',
      answer: 'Sim! Oferecemos garantia de 7 dias para troca ou devolução, caso você não fique satisfeito com o produto. Entre em contato conosco através do email de suporte.',
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="faq-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title serif-heading">PERGUNTAS FREQUENTES</h2>
          <p className="section-subtitle">Tire suas dúvidas sobre nossos produtos</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <span className={`faq-arrow ${openIndex === index ? 'open' : ''}`}>▼</span>
              </button>
              {openIndex === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


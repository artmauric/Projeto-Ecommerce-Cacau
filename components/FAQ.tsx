'use client'

import { useState } from 'react'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'O Oráculo da Cacau é apenas para quem já trabalha com espiritualidade?',
      answer: ' Não. O Oráculo da Cacau é indicado tanto para iniciantes quanto para quem já possue prática espiritual. Ele é uma ferramenta de autoconhecimento intuitivo e reflexão.',
    },
    {
      question: 'Quantas cartas possui o Oráculo da Cacau?',
      answer: 'O Oráculo da Cacau é composto por 52 cartas com mensagens direcionadoras para auxiliar em momentos de dúvida, transição e crescimento pessoal.',
    },
    {
      question: 'O Planner da Cacau é apenas uma agenda?',
      answer: 'Não. Ele é um guia de planejamento consciente que une organização prática com desenvolvimento pessoal, ajudando na definição de intenções, metas e reflexões emocionais.',
    },
    {
      question: 'Posso utilizar o Planner e o Oráculo juntos?',
      answer: 'Sim. Inclusive existe o combo especial que integra as duas ferramentas, permitindo que você receba direcionamentos intuitivos e organize sua aplicação prática no dia a dia.',
    },
    {
      question: 'Os produtos possuem envio para todo o Brasil?',
      answer: ' Sim, enviamos para todo o Brasil',
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


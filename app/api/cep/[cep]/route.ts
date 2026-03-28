import { NextRequest, NextResponse } from 'next/server'

type ViaCepResponse = {
  cep?: string
  logradouro?: string
  complemento?: string
  bairro?: string
  localidade?: string
  uf?: string
  erro?: boolean
}

export async function GET(
  _request: NextRequest,
  context: { params: { cep: string } }
) {
  const digits = context.params.cep.replace(/\D/g, '')

  if (digits.length !== 8) {
    return NextResponse.json({ error: 'CEP deve ter 8 dígitos.' }, { status: 400 })
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'Não foi possível consultar o CEP.' }, { status: 502 })
    }

    const data = (await response.json()) as ViaCepResponse

    if (data.erro || !data.localidade || !data.uf) {
      return NextResponse.json({ error: 'CEP não encontrado.' }, { status: 404 })
    }

    return NextResponse.json({
      cep: data.cep || digits,
      street: data.logradouro || '',
      neighborhood: data.bairro || '',
      city: data.localidade || '',
      state: (data.uf || '').toUpperCase(),
    })
  } catch {
    return NextResponse.json({ error: 'Erro ao buscar CEP.' }, { status: 500 })
  }
}

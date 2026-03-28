import { productService } from '@/application/services/productService'
import { NextRequest, NextResponse } from 'next/server'

type CreatePreferencePayload = {
  itemId: string
  customer: {
    fullName: string
    email: string
    whatsApp?: string
  }
  address: {
    cep: string
    street: string
    number: string
    complement?: string
    neighborhood: string
    city: string
    state: string
  }
}

function normalizeCep(value: string) {
  return value.replace(/\D/g, '')
}

function normalizeState(value: string) {
  return value.trim().toUpperCase()
}

function resolveOrder(itemId: string) {
  const products = productService.list()
  const combo = productService.getCombo()

  if (itemId === 'combo') {
    return {
      id: 'combo',
      title: combo.name,
      unitPrice: combo.discountPrice,
      quantity: 1,
      description: combo.description,
    }
  }

  const product = products.find((p) => p.id === itemId)
  if (!product) {
    return null
  }

  return {
    id: product.id,
    title: product.name,
    unitPrice: product.price,
    quantity: 1,
    description: product.description,
  }
}

function validatePayload(payload: Partial<CreatePreferencePayload>) {
  if (!payload.itemId) return 'Item inválido.'
  if (!payload.customer?.fullName?.trim()) return 'Nome completo é obrigatório.'
  if (!payload.customer?.email?.trim()) return 'E-mail é obrigatório.'
  if (!payload.address?.street?.trim()) return 'Rua é obrigatória.'
  if (!payload.address?.number?.trim()) return 'Número é obrigatório.'
  if (!payload.address?.neighborhood?.trim()) return 'Bairro é obrigatório.'
  if (!payload.address?.city?.trim()) return 'Cidade é obrigatória.'
  if (normalizeState(payload.address?.state || '').length !== 2) return 'UF deve ter 2 letras.'
  if (normalizeCep(payload.address?.cep || '').length !== 8) return 'CEP inválido.'
  return null
}

export async function POST(request: NextRequest) {
  try {
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN
    const appUrl = (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000').replace(/\/$/, '')
    const notificationUrl = process.env.MERCADOPAGO_WEBHOOK_URL
    // auto_return exige back_urls.success aceitas pelo MP (HTTPS em produção). Localhost HTTP falha.
    const canAutoReturn = appUrl.startsWith('https://')

    if (!accessToken) {
      return NextResponse.json(
        { error: 'MERCADOPAGO_ACCESS_TOKEN não configurado no servidor.' },
        { status: 500 }
      )
    }

    const payload = (await request.json()) as Partial<CreatePreferencePayload>
    const validationError = validatePayload(payload)
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 })
    }

    const order = resolveOrder(payload.itemId as string)
    if (!order) {
      return NextResponse.json({ error: 'Produto não encontrado.' }, { status: 404 })
    }

    const body = {
      items: [
        {
          id: order.id,
          title: order.title,
          description: order.description,
          quantity: order.quantity,
          unit_price: Number(order.unitPrice.toFixed(2)),
          currency_id: 'BRL',
        },
      ],
      payer: {
        name: payload.customer?.fullName,
        email: payload.customer?.email,
      },
      back_urls: {
        success: `${appUrl}/checkout/sucesso`,
        pending: `${appUrl}/checkout/pendente`,
        failure: `${appUrl}/checkout/falha`,
      },
      ...(canAutoReturn ? { auto_return: 'approved' as const } : {}),
      statement_descriptor: 'CACAU SAGRADO',
      external_reference: `${order.id}-${Date.now()}`,
      ...(notificationUrl ? { notification_url: notificationUrl } : {}),
      additional_info: {
        payer: {
          first_name: payload.customer?.fullName,
          phone: payload.customer?.whatsApp
            ? {
                area_code: '',
                number: payload.customer?.whatsApp,
              }
            : undefined,
          address: {
            zip_code: normalizeCep(payload.address?.cep || ''),
            street_name: payload.address?.street,
            street_number: Number(payload.address?.number) || undefined,
          },
        },
        shipments: {
          receiver_address: {
            zip_code: normalizeCep(payload.address?.cep || ''),
            street_name: payload.address?.street,
            street_number: Number(payload.address?.number) || undefined,
            floor: payload.address?.complement || undefined,
            apartment: payload.address?.complement || undefined,
            neighborhood: {
              name: payload.address?.neighborhood,
            },
            city: {
              name: payload.address?.city,
            },
            state: {
              name: normalizeState(payload.address?.state || ''),
            },
            country: {
              id: 'BR',
            },
          },
        },
      },
    }

    const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    })

    const mpData = (await mpResponse.json()) as {
      init_point?: string
      sandbox_init_point?: string
      id?: string
      message?: string
    }

    if (!mpResponse.ok) {
      return NextResponse.json(
        { error: mpData.message || 'Erro ao criar preferência no Mercado Pago.' },
        { status: 502 }
      )
    }

    return NextResponse.json({
      preferenceId: mpData.id,
      checkoutUrl: mpData.init_point || mpData.sandbox_init_point,
    })
  } catch {
    return NextResponse.json({ error: 'Erro interno ao iniciar checkout.' }, { status: 500 })
  }
}


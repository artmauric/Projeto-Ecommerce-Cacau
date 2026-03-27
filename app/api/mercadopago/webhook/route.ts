import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

type MercadoPagoWebhookBody = {
  id?: number
  live_mode?: boolean
  type?: string
  date_created?: string
  user_id?: number
  api_version?: string
  action?: string
  data?: {
    id?: string
  }
}

function parseSignatureHeader(signature: string | null) {
  if (!signature) return { ts: null as string | null, v1: null as string | null }

  const parts = signature.split(',')
  let ts: string | null = null
  let v1: string | null = null

  for (const part of parts) {
    const [key, value] = part.split('=').map((valuePart) => valuePart.trim())
    if (key === 'ts') ts = value || null
    if (key === 'v1') v1 = value || null
  }

  return { ts, v1 }
}

function safeEqual(a: string, b: string) {
  const aBuffer = Buffer.from(a)
  const bBuffer = Buffer.from(b)
  if (aBuffer.length !== bBuffer.length) return false
  return crypto.timingSafeEqual(aBuffer, bBuffer)
}

function validateWebhookSignature(params: {
  secret: string
  dataId: string
  requestId: string | null
  signatureHeader: string | null
}) {
  const { secret, dataId, requestId, signatureHeader } = params
  const { ts, v1 } = parseSignatureHeader(signatureHeader)

  if (!ts || !v1 || !requestId) return false

  const manifest = `id:${dataId};request-id:${requestId};ts:${ts};`
  const generated = crypto.createHmac('sha256', secret).update(manifest).digest('hex')
  return safeEqual(generated, v1)
}

async function fetchPaymentDetails(paymentId: string, accessToken: string) {
  const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  if (!response.ok) return null
  return response.json()
}

export async function GET() {
  return NextResponse.json({ ok: true, provider: 'mercadopago' })
}

export async function POST(request: NextRequest) {
  try {
    const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN
    const webhookSecret = process.env.MERCADOPAGO_WEBHOOK_SECRET

    if (!accessToken) {
      return NextResponse.json({ error: 'MERCADOPAGO_ACCESS_TOKEN não configurado.' }, { status: 500 })
    }

    const url = request.nextUrl
    const queryType = url.searchParams.get('type') || url.searchParams.get('topic')
    const queryDataId = url.searchParams.get('data.id') || url.searchParams.get('id')

    const body = (await request.json().catch(() => ({}))) as MercadoPagoWebhookBody
    const dataId = body?.data?.id || queryDataId

    // Se segredo estiver configurado no painel, valida assinatura.
    if (webhookSecret && dataId) {
      const requestId = request.headers.get('x-request-id')
      const signature = request.headers.get('x-signature')
      const isValid = validateWebhookSignature({
        secret: webhookSecret,
        dataId,
        requestId,
        signatureHeader: signature,
      })

      if (!isValid) {
        return NextResponse.json({ error: 'Assinatura inválida.' }, { status: 401 })
      }
    }

    const eventType = body?.type || queryType || 'unknown'

    if (eventType === 'payment' && dataId) {
      const payment = await fetchPaymentDetails(dataId, accessToken)

      // TODO: persistir em banco e atualizar status do pedido pela external_reference.
      console.info('[MercadoPago Webhook] Payment event', {
        paymentId: dataId,
        status: payment?.status || 'unknown',
        statusDetail: payment?.status_detail || null,
        externalReference: payment?.external_reference || null,
      })
    } else {
      console.info('[MercadoPago Webhook] Event recebido', {
        type: eventType,
        dataId: dataId || null,
        action: body?.action || null,
      })
    }

    return NextResponse.json({ received: true })
  } catch {
    return NextResponse.json({ error: 'Erro ao processar webhook.' }, { status: 500 })
  }
}


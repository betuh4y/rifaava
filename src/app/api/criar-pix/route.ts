0opimport { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN as string,
});

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Preflight
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.MERCADOPAGO_ACCESS_TOKEN) {
      return NextResponse.json(
        { error: 'MERCADOPAGO_ACCESS_TOKEN não configurado na Vercel.' },
        { status: 500, headers: CORS }
      );
    }

    const body = await req.json();
    const { amount, description } = body;

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      return NextResponse.json({ error: 'Valor inválido.' }, { status: 400, headers: CORS });
    }

    const payment = new Payment(client);

    const result = await payment.create({
      body: {
        transaction_amount: Number(Number(amount).toFixed(2)),
        description: description || 'Rifa da Ava',
        payment_method_id: 'pix',
        payer: { email: 'participante@rifa.com.br' },
      },
    });

    const txData = result.point_of_interaction?.transaction_data;

    if (!txData?.qr_code) {
      return NextResponse.json(
        { error: 'Mercado Pago não retornou o QR Code. Tente novamente.' },
        { status: 502, headers: CORS }
      );
    }

    return NextResponse.json({
      paymentId: result.id,
      status:    result.status,
      qrCode:    txData.qr_code,
      qrBase64:  txData.qr_code_base64 ?? '',
      ticketUrl: txData.ticket_url ?? '',
    }, { headers: CORS });

  } catch (err: any) {
    console.error('[criar-pix]', err);
    return NextResponse.json(
      { error: err?.message ?? 'Erro interno ao criar Pix.' },
      { status: 500, headers: CORS }
    );
  }
}

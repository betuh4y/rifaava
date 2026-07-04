import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN as string,
});

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: 'ID de pagamento inválido.' }, { status: 400 });
    }

    const payment = new Payment(client);
    const result  = await payment.get({ id: Number(id) });

    return NextResponse.json({
      status:   result.status,
      approved: result.status === 'approved',
    });

  } catch (err: any) {
    console.error('[status-pix]', err);
    return NextResponse.json(
      { error: err?.message ?? 'Erro ao consultar pagamento.' },
      { status: 500 }
    );
  }
}

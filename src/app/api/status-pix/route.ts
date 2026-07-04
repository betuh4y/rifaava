import { NextRequest, NextResponse } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN as string,
});

const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id');

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: 'ID inválido.' }, { status: 400, headers: CORS });
    }

    const payment = new Payment(client);
    const result  = await payment.get({ id: Number(id) });

    return NextResponse.json({
      status:   result.status,
      approved: result.status === 'approved',
    }, { headers: CORS });

  } catch (err: any) {
    console.error('[status-pix]', err);
    return NextResponse.json(
      { error: err?.message ?? 'Erro ao consultar pagamento.' },
      { status: 500, headers: CORS }
    );
  }
}

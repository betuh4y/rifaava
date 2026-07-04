# 🐱 Rifa da Ava — Backend Pix (Mercado Pago)

API Next.js para geração e consulta de pagamentos Pix via Mercado Pago.

## Endpoints

- `POST /api/criar-pix` — cria cobrança Pix, retorna QR Code e paymentId
- `GET  /api/status-pix?id=XXX` — consulta status do pagamento

## Deploy na Vercel

1. Suba este repositório no GitHub
2. Conecte no [vercel.com](https://vercel.com)
3. Em **Settings → Environment Variables**, adicione:
   - `MERCADOPAGO_ACCESS_TOKEN` = seu token de produção (começa com `APP_USR-...`)
4. Clique em **Deploy**

## Uso no rifa.html

Troque `PIX_API_URL` pela URL gerada na Vercel:

```js
const PIX_API_URL = 'https://SEU-PROJETO.vercel.app';
```

export default function Home() {
  return (
    <main style={{ fontFamily: 'sans-serif', padding: '40px', textAlign: 'center' }}>
      <h1>🐱 Rifa da Ava — API Pix</h1>
      <p style={{ marginTop: '12px', color: '#555' }}>
        Servidor rodando corretamente.
      </p>
      <ul style={{ listStyle: 'none', marginTop: '24px', fontSize: '14px', color: '#333' }}>
        <li>✅ <code>POST /api/criar-pix</code> — cria cobrança Pix</li>
        <li style={{ marginTop: '8px' }}>✅ <code>GET /api/status-pix?id=XXX</code> — consulta status</li>
      </ul>
    </main>
  );
}

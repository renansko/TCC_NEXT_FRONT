
export default function Menu() {
    return (
      <div>
        <header style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '10px', 
            backgroundColor: '#f0f0f0', // Cor de fundo cinza
            fontWeight: 'bold', // Texto em negrito
            fontSize: '18px' // Aumentando a fonte
        }}>
          <a href="/menu" style={{ textDecoration: 'none', color: 'black' }}>Menu</a> {/* Link para 'menu' */}
          <nav>
            <a href="/pedidos" style={{ marginLeft: '10px', textDecoration: 'none', color: 'black' }}>Pedidos</a>
            <a href="/veiculos" style={{ marginLeft: '10px', textDecoration: 'none', color: 'black' }}>Veículos</a>
            <a href="/clientes" style={{ marginLeft: '10px', textDecoration: 'none', color: 'black' }}>Clientes</a>
            <a href="/acompanhamento" style={{ marginLeft: '10px', textDecoration: 'none', color: 'black' }}>Acompanhamento</a>
          </nav>
        </header>
      </div>
    );
}
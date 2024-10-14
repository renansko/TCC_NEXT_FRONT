'use client'
import { useState } from "react";

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        // Simula uma chamada de autenticação
        setTimeout(() => {
            console.log('Email:', email);
            console.log('Password:', password);

            // Suponha que a autenticação foi bem-sucedida
            setLoading(false);
            window.location.href = '/menu';
        }, 2000); // Simula um atraso de 2 segundos
    };

    return (
        <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#D2B48C', // Bege escuro
            padding: '40px', // Aumenta o padding para dar mais espaço interno
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            textAlign: 'center', // Centraliza o texto
            fontFamily: 'Poppins, sans-serif', // Aplica a fonte Poppins
            width: '720px' // Aumenta a largura da caixa para o dobro
        }}>
            <h1 style={{ fontWeight: 'bold', fontSize: '64px', marginBottom: '40px' }}>Login</h1> {/* Título em negrito e tamanho 64px */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '100%', maxWidth: '260px', marginBottom: '40px' }}>
                    <label htmlFor="email" style={{ textAlign: 'left', display: 'block', paddingLeft: '20px', marginBottom: '10px' }}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ 
                            width: '100%', 
                            height: '50px', 
                            backgroundColor: 'white', 
                            paddingLeft: '20px', 
                            fontFamily: 'Poppins, sans-serif',
                            borderRadius: '8px', // Arredonda os campos
                        }}
                    />
                </div>

                <div style={{ width: '100%', maxWidth: '260px', marginBottom: '40px' }}>
                    <label htmlFor="password" style={{ textAlign: 'left', display: 'block', paddingLeft: '20px', marginBottom: '10px' }}>Senha:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ 
                            width: '100%', 
                            height: '50px', 
                            backgroundColor: 'white', 
                            paddingLeft: '20px', 
                            fontFamily: 'Poppins, sans-serif',
                            borderRadius: '8px', // Arredonda os campos
                        }}
                    />
                </div>

                <button type="submit" style={{ 
                    width: '260px', // Ajusta a largura do botão para o mesmo tamanho dos campos do formulário
                    height: '40px', 
                    backgroundColor: '#5FFFC7', 
                    borderRadius: '8px', 
                    fontFamily: 'Poppins, sans-serif',
                    color: 'black', // Define a cor do texto do botão como preto
                    marginBottom: '40px' // Espaçamento abaixo do botão
                }}>
                    {loading ? 'Loading...' : 'Entrar'}
                </button>
            </form>
            <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Poppins, sans-serif', marginBottom: '10px' }}>Ainda não tem cadastro?</span>
                <button onClick={() => window.location.href = '/register-empresa'} style={{ 
                    width: '260px', 
                    height: '40px', 
                    backgroundColor: '#5FFFC7', 
                    borderRadius: '8px', 
                    fontFamily: 'Poppins, sans-serif',
                    color: 'black', 
                    marginBottom: '20px' // Espaçamento entre os botões
                }}>Registrar-se empresa</button>
                <button onClick={() => window.location.href = '/register-usuario'} style={{ 
                    width: '260px', 
                    height: '40px', 
                    backgroundColor: '#5FFFC7', 
                    borderRadius: '8px', 
                    fontFamily: 'Poppins, sans-serif',
                    color: 'black'
                }}>Registrar-se usuario</button>
            </div>
        </div>
    );
}
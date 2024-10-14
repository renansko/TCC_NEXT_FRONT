'use client'
import { useState } from "react";

export default function RegisterForm() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [senha, setSenha] = useState('');
    const [repitaSenha, setRepitaSenha] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Lógica para lidar com o envio do formulário
        console.log('Nome:', nome);
        console.log('Email:', email);
        console.log('CPF:', cpf);
        console.log('CEP:', cep);
        console.log('Endereço:', endereco);
        console.log('Número:', numero);
        console.log('Data de Nascimento:', dataNascimento);
        console.log('Senha:', senha);
        console.log('Repita a Senha:', repitaSenha);

        // Mostra o pop-up
        setShowPopup(true);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
        window.location.href = '/';
    };

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh', 
            fontFamily: 'Poppins, sans-serif', // Aplica a fonte Poppins
            padding: '20px', // Adiciona padding para melhor responsividade
            boxSizing: 'border-box' // Inclui padding e border no cálculo de largura/altura
        }}>
            <div style={{ 
                fontSize: '32px', 
                color: 'black', 
                marginRight: '40px', // Espaçamento entre o texto e o formulário
                textAlign: 'center',
                maxWidth: '300px', // Limita a largura máxima para responsividade
                flexShrink: 0 // Impede que o texto encolha
            }}>
                Tenha total gestão e controle de suas cargas e mercadorias
            </div>
            <div style={{ 
                backgroundColor: '#D2B48C', // Bege escuro
                padding: '20px', 
                borderRadius: '8px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                textAlign: 'center', // Centraliza o texto
                width: '100%', // Usa 100% da largura disponível
                maxWidth: '400px', // Limita a largura máxima para responsividade
            }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '32px', marginBottom: '20px', color: 'black' }}>Cadastre sua empresa</h1> {/* Título em negrito e preto */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <label htmlFor="nome" style={{ textAlign: 'left', width: '100%', paddingLeft: '20px', marginBottom: '10px' }}>Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                        style={{ 
                            width: '100%', 
                            height: '40px', 
                            backgroundColor: 'white', 
                            paddingLeft: '20px', 
                            fontFamily: 'Poppins, sans-serif',
                            borderRadius: '8px', 
                            marginBottom: '20px',
                            color: 'black', // Cor do texto
                            fontWeight: 'bold' // Texto em negrito
                        }}
                    />

                    <label htmlFor="email" style={{ textAlign: 'left', width: '100%', paddingLeft: '20px', marginBottom: '10px' }}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ 
                            width: '100%', 
                            height: '40px', 
                            backgroundColor: 'white', 
                            paddingLeft: '20px', 
                            fontFamily: 'Poppins, sans-serif',
                            borderRadius: '8px', 
                            marginBottom: '20px',
                            color: 'black', // Cor do texto
                            fontWeight: 'bold' // Texto em negrito
                        }}
                    />

                    <label htmlFor="cpf" style={{ textAlign: 'left', width: '100%', paddingLeft: '20px', marginBottom: '10px' }}>CPF:</label>
                    <input
                        type="text"
                        id="cpf"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        required
                        style={{ 
                            width: '100%', 
                            height: '40px', 
                            backgroundColor: 'white', 
                            paddingLeft: '20px', 
                            fontFamily: 'Poppins, sans-serif',
                            borderRadius: '8px', 
                            marginBottom: '20px',
                            color: 'black', // Cor do texto
                            fontWeight: 'bold' // Texto em negrito
                        }}
                    />

                    <label htmlFor="cep" style={{ textAlign: 'left', width: '100%', paddingLeft: '20px', marginBottom: '10px' }}>CEP:</label>
                    <input
                        type="text"
                        id="cep"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        required
                        style={{ 
                            width: '100%', 
                            height: '40px', 
                            backgroundColor: 'white', 
                            paddingLeft: '20px', 
                            fontFamily: 'Poppins, sans-serif',
                            borderRadius: '8px', 
                            marginBottom: '20px',
                            color: 'black', // Cor do texto
                            fontWeight: 'bold' // Texto em negrito
                        }}
                    />

                    <label htmlFor="endereco" style={{ textAlign: 'left', width: '100%', paddingLeft: '20px', marginBottom: '10px' }}>Endereço:</label>
                    <input
                        type="text"
                        id="endereco"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                        required
                        style={{ 
                            width: '100%', 
                            height: '40px', 
                            backgroundColor: 'white', 
                            paddingLeft: '20px', 
                            fontFamily: 'Poppins, sans-serif',
                            borderRadius: '8px', 
                            marginBottom: '20px',
                            color: 'black', // Cor do texto
                            fontWeight: 'bold' // Texto em negrito
                        }}
                    />

                    <label htmlFor="numero" style={{ textAlign: 'left', width: '100%', paddingLeft: '20px', marginBottom: '10px' }}>Número:</label>
                    <input
                        type="text"
                        id="numero"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                        required
                        style={{ 
                            width: '100%', 
                            height: '40px', 
                            backgroundColor: 'white', 
                            paddingLeft: '20px', 
                            fontFamily: 'Poppins, sans-serif',
                            borderRadius: '8px', 
                            marginBottom: '20px',
                            color: 'black', // Cor do texto
                            fontWeight: 'bold' // Texto em negrito
                        }}
                    />

                    <label htmlFor="dataNascimento" style={{ textAlign: 'left', width: '100%', paddingLeft: '20px', marginBottom: '10px' }}>Data de Nascimento:</label>
                    <input
                        type="date"
                        id="dataNascimento"
                        value={dataNascimento}
                        onChange={(e) => setDataNascimento(e.target.value)}
                        required
                        style={{ 
                            width: '100%', 
                            height: '40px', 
                            backgroundColor: 'white', 
                            paddingLeft: '20px', 
                            fontFamily: 'Poppins, sans-serif',
                            borderRadius: '8px', 
                            marginBottom: '20px',
                            color: 'black', // Cor do texto
                            fontWeight: 'bold' // Texto em negrito
                        }}
                    />

                    <label htmlFor="senha" style={{ textAlign: 'left', width: '100%', paddingLeft: '20px', marginBottom: '10px' }}>Senha:</label>
                    <input
                        type="password"
                        id="senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                        style={{ 
                            width: '100%', 
                            height: '40px', 
                            backgroundColor: 'white', 
                            paddingLeft: '20px', 
                            fontFamily: 'Poppins, sans-serif',
                            borderRadius: '8px', 
                            marginBottom: '20px',
                            color: 'black', // Cor do texto
                            fontWeight: 'bold' // Texto em negrito
                        }}
                    />

                    <label htmlFor="repitaSenha" style={{ textAlign: 'left', width: '100%', paddingLeft: '20px', marginBottom: '10px' }}>Repita a Senha:</label>
                    <input
                        type="password"
                        id="repitaSenha"
                        value={repitaSenha}
                        onChange={(e) => setRepitaSenha(e.target.value)}
                        required
                        style={{ 
                            width: '100%', 
                            height: '40px', 
                            backgroundColor: 'white', 
                            paddingLeft: '20px', 
                            fontFamily: 'Poppins, sans-serif',
                            borderRadius: '8px', 
                            marginBottom: '20px',
                            color: 'black', // Cor do texto
                            fontWeight: 'bold' // Texto em negrito
                        }}
                    />

                    <button type="submit" style={{ 
                        width: '100%', 
                        height: '40px', 
                        backgroundColor: '#5FFFC7', 
                        borderRadius: '8px', 
                        fontFamily: 'Poppins, sans-serif',
                        color: 'black', 
                        marginBottom: '20px' 
                    }}>Cadastrar</button>
                </form>
            </div>

            {showPopup && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Transparência de 30%
                    padding: '20px',
                    borderRadius: '10px',
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    zIndex: 1000
                }}>
                    Cadastro realizado com sucesso, {nome}!
                    <button onClick={handlePopupClose} style={{
                        marginTop: '10px',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        backgroundColor: '#5FFFC7',
                        color: 'black',
                        border: 'none',
                        cursor: 'pointer'
                    }}>
                        OK
                    </button>
                </div>
            )}
        </div>
    );
}
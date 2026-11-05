import { useState, useEffect } from "react";

interface  Cliente {
    id: number;
    nome: string;
    email: string;
}

const ClientePython = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [clienteForm, setClienteForm] = useState<{ nome: string; email: string }>({ nome: '', email: ''});

    const buscarClientes = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/clients');
            const data: Cliente[] = await response.json();
            setClientes(data);
        } catch (error) {
            console.error('Erro ao conectar com Python:', error);
        } finally{
          setLoading(false);
        }
    };

    useEffect(() => {
        buscarClientes();
    }, []);

    const adicionarCliente = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (!clienteForm.nome || !clienteForm.email) return;

        try {
            const response = await fetch('http://localhost:5000/api/clients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(clienteForm),
            });

            if (response.ok) {
                setClienteForm({ nome: '', email: ''});
                buscarClientes();
            }
        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
        }
    };


    const excluirCliente = async (id: number) => {
        try{
            const response = await fetch(`http://localhost:5000/api/clients/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setClientes(clientes.filter((cliente) => cliente.id !== id));
            }
        } catch (error) {
            console.error('Erro ao excluir cliente', error);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Lista de Clientes (Python)</h2>

            <form onSubmit={adicionarCliente} className="flex gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Nome"
                    value={clienteForm.nome}
                    onChange={(e) => setClienteForm({ ...clienteForm, nome: e.target.value })}
                    className="border border-gray-300 p-2 rounded flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="email"
                    placeholder="E-mail"
                    value={clienteForm.email}
                    onChange={(e) => setClienteForm({ ...clienteForm, email: e.target.value})}
                    className="border border-gray-300 p-2 rounded flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium"
                >
                    Adicionar
                </button>      
            </form>

            {loading ? (
                <p className="text-gray-500 text-center">Carregando do Python...</p>
            ) : (
                <ul className="space-y-2">
                    {clientes.map((cliente) => (
                        <li key={cliente.id} className="border border-gray-200 p-3 rounded bg-gray-50 flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-gray-800">{cliente.nome}</p>
                                <p className="text-sm text-gray-500">{cliente.email}</p>
                            </div>
                            <button
                                onClick={() => excluirCliente(cliente.id)}
                                className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                                Excluir
                            </button>
                        </li>
                    ))}
                </ul>
              )}       
        </div>
    );
};

export default ClientePython;
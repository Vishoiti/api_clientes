import { useState, useEffect } from "react";

interface  Cliente {
    id: number;
    nome: string;
    email: string;
}

const ClientePython = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [loading, setLoading] = useState<Boolean>(true);

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

    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Lista de Clientes (Python)</h2>

            {loading ? (
                <p className="text-gray-500 text-center">Carregando do Python...</p>
            ) : (
                <ul className="space-y-2">
                    {clientes.map((cliente) => (
                        <li key={cliente.id} className="border border-gray-200 p-3 rounded bg-gray-50">
                            <p className="font-semibold text-gray-800">{cliente.nome}</p>
                            <p className="text-sm text-gray-500">{cliente.email}</p>
                        </li>
                    ))}
                </ul>
              )}       
        </div>
    );
};

export default ClientePython;
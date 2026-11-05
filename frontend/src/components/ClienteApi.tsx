import { useState, useEffect } from "react";

interface UsuarioExterno {
    id: number;
    name: string;
    email: string;
}

const ClienteApi = () => {
    const [usuarios, setUsuarios] = useState<UsuarioExterno[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const buscarUsuarios = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data: UsuarioExterno[] = await response.json();
            setUsuarios(data);
        } catch (error) {
            console.error('Erro ao buscar API externa:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        buscarUsuarios();
    }, []);
    
    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Usuários (API Externa)</h2>

        {loading ? (
            <p className="text-gray-500 text-center">Carregando da API externa...</p>
        ) : (
            <ul className="space-y-2">
                {usuarios.map((usuario) => (
                    <li key={usuario.id} className="border border-gray-200 p-3 rounded bg-gray-50">
                        <p className="font-semibold text-gray-800">{usuario.name}</p>
                        <p className="text-sm text-gray-500">{usuario.email}</p>
                    </li>
                ))}
            </ul>
        )}
    </div>
  );
};

export default ClienteApi;
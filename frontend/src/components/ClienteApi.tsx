import { useState, useEffect } from "react";

interface Post {
    id: number;
    title: string;
    body: string;
}

const ClienteApi = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
        .then((res) => res.json())
        .then((data: Post[]) => setPosts(data))
        .catch((error) => console.error("Erro ao acessar a API:", error))
        .finally(() => setLoading(false));
    }, []);
        
    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Posts (API Externa)</h2>

        {loading ? (
            <p className="text-gray-500 text-center">Carregando da API externa...</p>
        ) : (
            <ul className="space-y-2">
                {posts.map((post) => (
                    <li key={post.id} className="border border-gray-200 p-3 rounded bg-gray-50">
                        <p className="font-semibold text-gray-800">{post.title}</p>
                        <p className="text-sm text-gray-500">{post.body}</p>
                    </li>
                ))}
            </ul>
        )}
    </div>
  );
};

export default ClienteApi;
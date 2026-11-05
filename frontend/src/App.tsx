import { useState } from "react"
import ClientePython from "./components/ClientePython"
import ClienteApi from "./components/ClienteApi"


function App() {
  const [abaAtiva, setAbaAtiva] = useState<'python' | 'api'>('python')

  return(
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Painel Simples Clientes
        </h1>


        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button
          onClick={() => setAbaAtiva('python')}
          className={`px-4 py-2 text-sm font-medium ${
            abaAtiva === 'python'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          >
            API Python
          </button>
          <button
            onClick={() => setAbaAtiva('api')}
            className={`px-4 py-2 text-sm font-medium ${
              abaAtiva === 'api'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            API Externa
          </button>
        </div>

        {abaAtiva === 'python' ? <ClientePython /> : <ClienteApi />}
      </div>
    </div>
  ) 
}

export default App
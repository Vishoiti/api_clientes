import ClientePython from "./components/ClientePython"

function App() {
  return(
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Painel Simples Clientes
        </h1>
        <ClientePython />
      </div>
    </div>
  ) 
}

export default App
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-semibold">My Web Cart</h1>
      <button className="bg-slate-800 text-white p-2">Começar Novo Carrinho</button>
      <Footer />
    </div>
  );
}

export default App;

import { AppButton, AppTable } from '@ntdsk/react-ui';
import Footer from './components/Footer';

function App() {
  return (
    <div className='flex flex-col items-center min-h-screen bg-gray-100'>
      <h1 className='text-3xl font-semibold'>My Web Cart</h1>
      <AppButton label='Novo Carrinho' className='bg-slate-800 text-white p-2' />
      <AppTable
        data={[{ name: 'Leite', price: 8.9 }]}
        columns={[
          { header: 'Nome', accessor: 'name' },
          { header: 'Preço', accessor: 'price' },
          { header: 'Quantidade', accessor: 'quantity' },
          { header: 'Total', accessor: 'total' },
        ]}
      />
      <Footer />
    </div>
  );
}

export default App;

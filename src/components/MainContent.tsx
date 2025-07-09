import useLocalStorage, { Cart } from '../hooks/useLocalStorage';
import { AppButton, AppModal, AppTable } from '@ntdsk/react-ui';
import { useState } from 'react';

const MainContent = () => {
  const { getItem } = useLocalStorage();
  const [openModal, setOpenModal] = useState(false);

  const cartGroups = (getItem('cart') as Cart[]) || [];
  const currentCart = cartGroups.length > 0 ? cartGroups[0] : null;

  console.log('Current Cart:', currentCart);

  return (
    <div className="flex flex-col gap-4 items-center w-full max-w-[1200px] mx-auto py-8 px-4">
      <h1 className="text-3xl font-semibold">My Web Cart</h1>
      {/* <AppButton label="Novo Carrinho" style={{width: 180, marginLeft: 'auto'}} /> */}
      <AppButton label="Adicionar Item" style={{ width: 180, marginLeft: 'auto' }} onClick={() => setOpenModal(true)} />
      <AppTable
        data={[{ name: 'Leite', price: 8.9 }]}
        columns={[
          { header: 'Nome', accessor: 'name' },
          { header: 'Preço', accessor: 'price', align: 'center' },
          { header: 'Quantidade', accessor: 'quantity' },
          { header: 'Total', accessor: 'total' },
        ]}
      />
      <AppModal header="Novo Item" open={openModal} onHide={() => setOpenModal(false)}>
        <p>ADICIONA ITEM</p>
      </AppModal>
    </div>
  );
};

export default MainContent;

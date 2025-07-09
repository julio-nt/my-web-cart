import useLocalStorage, { Cart, CartItem } from '../hooks/useLocalStorage';
import { AppButton, AppTable } from '@ntdsk/react-ui';
import { useState } from 'react';
import NewItemForm from './NewItemForm';

const MainContent = () => {
  const { getItem, saveCartItem } = useLocalStorage();
  const [openModal, setOpenModal] = useState(false);
  const [updateKey, setUpdateKey] = useState(0);

  const cartGroups = (getItem('cart') as Cart[]) || [];
  const currentCart = cartGroups.length > 0 ? cartGroups[0] : null;

  console.log('Current Cart:', currentCart);

  const handleQuantityChange = (item: CartItem, increment: boolean) => {
    const newQuantity = item.quantity + (increment ? 1 : -1);
    if (newQuantity <= 0) return;

    saveCartItem(
      {
        ...item,
        quantity: newQuantity,
      },
      currentCart?.id || 1
    );

    setUpdateKey((prev) => prev + 1);
    // window.location.reload(); // força atualização da UI
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full max-w-[1200px] mx-auto py-8 px-4">
      <h1 className="text-3xl font-semibold">My Web Cart</h1>
      {/* <AppButton label="Novo Carrinho" style={{width: 180, marginLeft: 'auto'}} /> */}
      <AppButton label="Adicionar Item" style={{ width: 180, marginLeft: 'auto' }} onClick={() => setOpenModal(true)} />
      <AppTable
        key={updateKey}
        data={currentCart?.item || []}
        columns={[
          { header: 'Nome', accessor: 'name', align: 'center' },
          { header: 'Preço', accessor: 'price', align: 'center' },
          {
            header: 'Quantidade',
            accessor: 'quantity',
            align: 'center',
            cell: (row: CartItem) => {
              return (
                <div className="flex gap-2 justify-center">
                  <AppButton label="-" style={{ width: 50 }} onClick={() => handleQuantityChange(row, false)} />
                  <span className="mx-2">{row?.quantity}</span>
                  <AppButton label="+" style={{ width: 50 }} onClick={() => handleQuantityChange(row, true)} />
                </div>
              );
            },
          },
          {
            header: 'Total',
            accessor: 'total',
            align: 'center',
            cell: (row: CartItem) => `R$ ${(row?.price * row?.quantity).toFixed(2)}`,
          },
          {
            header: '',
            accessor: '',
            align: 'center',
            cell: (row: CartItem) => (
              <span className="text-red-500 hover:underline underline-offset-2 cursor-pointer">Remover</span>
            ),
          },
        ]}
      />
      <NewItemForm open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default MainContent;

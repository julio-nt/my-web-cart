import useLocalStorage from '../hooks/useLocalStorage';
import { AppButton, AppModal, ControlledText } from '@ntdsk/react-ui';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const NewItemForm = ({ open, onClose }: any) => {
  const { saveCartItem } = useLocalStorage();
  const [openModal, setOpenModal] = useState(open);

  const form = useForm({
    defaultValues: {
      item: '',
      price: '0,00',
      quantity: '1',
    },
  });

  const totalPrice = (Number(form.watch('price')?.replace(',', '.')) || 0) * Number(form.watch('quantity'));

  useEffect(() => {
    setOpenModal(open);
  }, [open]);

  const handleSave = () => {
    const values = form.getValues();
    const name = values.item.trim();
    const price = Number(values.price.replace(',', '.')) || 0;
    const quantity = Number(values.quantity) || 0;

    if (!name || price <= 0 || quantity <= 0) return;

    saveCartItem(
      {
        name,
        price,
        quantity,
      },
      1 // grupo do carrinho
    );

    onClose();
  };

  return (
    <AppModal header="Novo Item" open={openModal} onHide={() => setOpenModal(false)} closable={false}>
      <form className="space-y-4">
        <ControlledText label="Nome do Item" name="item" control={form.control} />
        <ControlledText label="Preço" name="price" control={form.control} type="currency" />
        <ControlledText label="Quantidade" name="quantity" control={form.control} onlyNumber maxLength={4} />
        <p>Total: R$ {totalPrice?.toFixed(2) || '0,00'}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AppButton label="Fechar" style={{ backgroundColor: 'red' }} onClick={onClose} />
          <AppButton label="Salvar" style={{ backgroundColor: 'green' }} onClick={handleSave} />
        </div>
      </form>
    </AppModal>
  );
};

export default NewItemForm;

import useLocalStorage from "../hooks/useLocalStorage";
import { AppButton, AppModal, ControlledText } from "@ntdsk/react-ui";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface IProps {
  open: boolean;
  onClose: () => void;
}

const NewItemForm = ({ open, onClose }: IProps) => {
  const { saveCartItem } = useLocalStorage();
  const [openModal, setOpenModal] = useState(open);

  const form = useForm({
    defaultValues: {
      item: "",
      price: "0,00",
      quantity: "1",
    },
  });

  const totalPrice = (Number(form.watch("price")?.replace(",", ".")) || 0) * Number(form.watch("quantity"));

  useEffect(() => {
    setOpenModal(open);
  }, [open]);

  const handleSave = () => {
    const values = form.getValues();
    const name = values.item.trim();
    const price = Number(values.price.replace(",", ".")) || 0;
    const quantity = Number(values.quantity) || 0;

    if (!name || price <= 0 || quantity <= 0) return;

    saveCartItem(
      {
        name,
        price,
        quantity,
      },
      1
    );

    handleClose();
  };

  const handleClose = () => {
    onClose();
    form.reset();
  };

  return (
    <AppModal
      className="bg-white dark:bg-gray-700 dark:text-white"
      header="Novo Item"
      open={openModal}
      onHide={() => setOpenModal(false)}
      closable={false}
    >
      <form className="space-y-4">
        <ControlledText label="Nome do Item" name="item" control={form.control} className="dark:text-black" />
        <ControlledText label="Preço" name="price" control={form.control} type="currency" className="dark:text-black" />
        <ControlledText label="Quantidade" name="quantity" control={form.control} onlyNumber maxLength={4} className="dark:text-black" />
        <p>Total: R$ {totalPrice?.toFixed(2) || "0,00"}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AppButton label="Fechar" className="bg-red-600" onClick={onClose} />
          <AppButton label="Salvar" className="bg-green-600" onClick={handleSave} />
        </div>
      </form>
    </AppModal>
  );
};

export default NewItemForm;

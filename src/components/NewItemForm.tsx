import { lang } from "../lang";
import useLocalStorage from "../hooks/useLocalStorage";
import { AppButton, AppModal, ControlledText } from "@ntdsk/react-ui";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface IProps {
  open: boolean;
  onClose: () => void;
}

const NewItemForm = ({ open, onClose }: IProps) => {
  const { saveCartItem, getItem } = useLocalStorage();
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

  const inputClassName = "dark:text-gray-200 dark:bg-gray-700 border border-gray-400 dark:border-none";

  return (
    <AppModal
      className="bg-white dark:bg-gray-800 dark:text-white sm:w-xs md:w-sm"
      header={lang.start_new.button[getItem("language") as "pt" | "en"]}
      open={openModal}
      onHide={() => setOpenModal(false)}
      closable={false}
    >
      <form className="space-y-4">
        <ControlledText
          label={lang.add_new.fields.name[getItem("language") as "pt" | "en"]}
          name="item"
          control={form.control}
          className={inputClassName}
        />
        <ControlledText
          label={lang.add_new.fields.price[getItem("language") as "pt" | "en"]}
          name="price"
          control={form.control}
          type="currency"
          className={inputClassName}
        />
        <ControlledText
          label={lang.add_new.fields.quantity[getItem("language") as "pt" | "en"]}
          name="quantity"
          control={form.control}
          onlyNumber
          maxLength={4}
          className={inputClassName}
        />
        <p>
          Total: {lang.currency[getItem("language") as "pt" | "en"]} {totalPrice?.toFixed(2) || "0,00"}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AppButton label={lang.cancel[getItem("language") as "pt" | "en"]} className="bg-red-600" onClick={onClose} />
          <AppButton label={lang.confirm[getItem("language") as "pt" | "en"]} className="bg-green-600" onClick={handleSave} />
        </div>
      </form>
    </AppModal>
  );
};

export default NewItemForm;

import useLocalStorage, { Cart, CartItem } from "../hooks/useLocalStorage";
import { AppButton, AppTable, ControlledText, normalizeText } from "@ntdsk/react-ui";
import { useState } from "react";
import NewItemForm from "./NewItemForm";
import { useForm } from "react-hook-form";
import ConfirmationDialog from "./ConfirmationDialog";
import { lang } from "../lang";

const MainContent = () => {
  const { getItem, saveCartItem, removeCartItem, resetCart } = useLocalStorage();

  const [openForm, setOpenForm] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const [updateKey, setUpdateKey] = useState(0);

  const cartGroups = (getItem("cart") as Cart[]) || [];
  const currentCart = cartGroups.length > 0 ? cartGroups[0] : null;

  const filter = useForm({
    defaultValues: {
      name: "",
    },
  });

  const filteredCartItems = currentCart?.item.filter((item) => normalizeText(item.name).includes(normalizeText(filter.watch("name")))) || [];
  const orderedCartItems = filteredCartItems.sort((a, b) => a.name.localeCompare(b.name));

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
  };

  const handleRemoveItem = (item: CartItem) => {
    removeCartItem({ key: "cart", name: item.name, groupId: currentCart?.id || 1 });
    setUpdateKey((prev) => prev + 1);
  };

  const handleResetCart = () => {
    resetCart();
    setUpdateKey((prev) => prev + 1);
    setOpenConfirmation(false);
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full max-w-[1200px] mx-auto py-8 px-4">
      <h1 className="text-3xl font-semibold dark:text-white">My Web Cart</h1>
      <AppButton label={lang.start_new.button[getItem("language") as "pt" | "en"]} style={{ width: 180 }} onClick={() => setOpenConfirmation(true)} />
      <AppButton
        label={lang.add_new.button[getItem("language") as "pt" | "en"]}
        style={{ width: 180, marginLeft: "auto" }}
        onClick={() => setOpenForm(true)}
      />
      <ControlledText
        label={lang.search.label[getItem("language") as "pt" | "en"]}
        name="name"
        control={filter.control}
        containerClassName="dark:text-gray-200 mr-auto"
        className="dark:text-gray-200 dark:bg-gray-700 border border-gray-400 dark:border-none"
      />
      <AppTable
        key={updateKey}
        data={orderedCartItems || []}
        tableContentClassName="dark:bg-gray-700 dark:text-gray-200"
        stripeClassName="dark:bg-gray-600 dark:text-gray-200"
        columns={[
          { header: lang.table.name[getItem("language") as "pt" | "en"], accessor: "name", align: "center" },
          { header: lang.table.price[getItem("language") as "pt" | "en"], accessor: "price", align: "center", type: "currency" },
          {
            header: lang.table.quantity[getItem("language") as "pt" | "en"],
            accessor: "quantity",
            align: "center",
            cell: (row: CartItem) => {
              return (
                <div className="flex gap-2 justify-around">
                  <AppButton label="-" style={{ width: 35 }} onClick={() => handleQuantityChange(row, false)} />
                  <span className="mx-2">{row?.quantity}</span>
                  <AppButton label="+" style={{ width: 35 }} onClick={() => handleQuantityChange(row, true)} />
                </div>
              );
            },
          },
          {
            header: "Total",
            accessor: "total",
            align: "center",
            cell: (row: CartItem) => `R$ ${(row?.price * row?.quantity).toFixed(2)}`,
          },
          {
            header: "",
            accessor: "",
            align: "center",
            cell: (row: CartItem) => (
              <span className="text-red-700 hover:underline underline-offset-2 cursor-pointer" onClick={() => handleRemoveItem(row)}>
                {lang.table.remove[getItem("language") as "pt" | "en"]}
              </span>
            ),
          },
        ]}
      />
      <p className="text-xl font-semibold self-start dark:text-gray-200">
        Total: {lang.currency[getItem("language") as "pt" | "en"]}{" "}
        {currentCart?.item.reduce((acc, curr) => acc + curr.price * curr.quantity, 0).toFixed(2) || "0,00"}
      </p>
      <NewItemForm open={openForm} onClose={() => setOpenForm(false)} />
      <ConfirmationDialog openModal={openConfirmation} setOpenModal={setOpenConfirmation} handleConfirm={handleResetCart} />
    </div>
  );
};

export default MainContent;

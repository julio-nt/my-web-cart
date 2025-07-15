import useLocalStorage from "../hooks/useLocalStorage";
import { lang } from "../lang";
import { AppButton, AppModal } from "@ntdsk/react-ui";

interface IProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  handleConfirm: () => void;
}

const ConfirmationDialog = ({ openModal, setOpenModal, handleConfirm }: IProps) => {
  const { getItem } = useLocalStorage();

  return (
    <AppModal
      className="bg-white dark:bg-gray-800 dark:text-white sm:w-xs md:w-sm"
      header={lang.start_new.button[getItem("language") as "pt" | "en"]}
      open={openModal}
      onHide={() => setOpenModal(false)}
      closable={false}
    >
      <p>{lang.start_new.description[getItem("language") as "pt" | "en"]}</p>
      <div className="flex justify-end mt-4">
        <AppButton label={lang.cancel[getItem("language") as "pt" | "en"]} onClick={() => setOpenModal(false)} className="bg-red-600" />
        <AppButton label={lang.confirm[getItem("language") as "pt" | "en"]} onClick={handleConfirm} className="ml-2 bg-green-600" />
      </div>
    </AppModal>
  );
};

export default ConfirmationDialog;

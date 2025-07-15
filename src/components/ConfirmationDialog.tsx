import { AppButton, AppModal } from "@ntdsk/react-ui";

interface IProps {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  handleConfirm: () => void;
}

const ConfirmationDialog = ({ openModal, setOpenModal, handleConfirm }: IProps) => {
  return (
    <AppModal
      className="bg-white dark:bg-gray-800 dark:text-white sm:w-xs md:w-sm"
      header="Iniciar Novo Carrinho"
      open={openModal}
      onHide={() => setOpenModal(false)}
      closable={false}
    >
      <p>Tem certeza que deseja apagar o carrinho?</p>
      <div className="flex justify-end mt-4">
        <AppButton label="Cancelar" onClick={() => setOpenModal(false)} className="bg-red-600" />
        <AppButton label="Confirmar" onClick={handleConfirm} className="ml-2 bg-green-600" />
      </div>
    </AppModal>
  );
};

export default ConfirmationDialog;

import { AppModal } from '@ntdsk/react-ui';
import { useEffect, useState } from 'react';

interface IProps {
  open: boolean;
  onCancel: () => void;
  title?: string;
}

const ResetCartConfirmation = ({ open, onCancel }: IProps) => {
  const [openModal, setOpenModal] = useState(open);

  useEffect(() => {
    setOpenModal(open);
  }, [open]);

  return (
    <AppModal header="Novo Item" open={openModal} onHide={() => setOpenModal(false)} closable={false}>
      <p>oi</p>
    </AppModal>
  );
};

export default ResetCartConfirmation;

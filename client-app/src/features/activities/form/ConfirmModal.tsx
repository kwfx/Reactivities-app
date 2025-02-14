import { Button, Modal, ModalActions, ModalContent, ModalHeader } from "semantic-ui-react";

export const ConfirmModal = ({
  title,
  content = "Are You sure ?",
  onClickYes,
  onClickNo,
  isOpen,
}: {
  title: string;
  content?: string;
  onClickYes: () => void;
  onClickNo: () => void;
  isOpen: boolean;
}) => {
  return (
    <>
      <Modal size="mini" open={isOpen}>
        <ModalHeader>{title}</ModalHeader>
        <ModalContent>
          <p>{content}</p>
        </ModalContent>
        <ModalActions>
          <Button
            negative
            onClick={() => {
              onClickNo();
            }}
          >
            No
          </Button>
          <Button
            positive
            onClick={() => {
              onClickYes();
            }}
          >
            Yes
          </Button>
        </ModalActions>
      </Modal>
    </>
  );
};

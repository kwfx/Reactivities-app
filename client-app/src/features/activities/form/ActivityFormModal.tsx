import { useState } from "react";
import { Button, Modal, ModalContent, ModalHeader } from "semantic-ui-react";
import { ActivityForm } from "./ActivityForm";

export const ActivityFormModal = function () {
    const [open, setOpen] = useState(false);
    return (
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button positive content="Create activity"></Button>}
      >
        <ModalHeader>Create an activity</ModalHeader>
        <ModalContent>
          <ActivityForm activity={undefined} onClickCancel={() => setOpen(false)}></ActivityForm>
        </ModalContent>
      </Modal>
    );
  };
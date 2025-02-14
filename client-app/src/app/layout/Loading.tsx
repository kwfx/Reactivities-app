import { Loader, Modal } from "semantic-ui-react";

export default function LoadingComponent({
  content = "loading ...",
}: {
  content: string;
}) {
  return (
    <Modal size="mini" open={true}>
      <Loader content={content}></Loader>
    </Modal>
  );
}

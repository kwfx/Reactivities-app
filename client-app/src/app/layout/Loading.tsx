import { Dimmer, Loader } from "semantic-ui-react";

export default function LoadingComponent({
  inverted = true,
  content = "loading ...",
}: {
  inverted: boolean;
  content: string;
}) {
  return (
    <Dimmer inverted={inverted} active={true}>
      <Loader content={content}></Loader>
    </Dimmer>
  );
}

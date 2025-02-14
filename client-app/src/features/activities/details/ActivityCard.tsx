import { observer } from "mobx-react-lite";
import { Button, ButtonGroup, Card } from "semantic-ui-react";
import { IActivity } from "../../../app/models/Activity";

export const ActivityCard = observer(function({
  activity, 
  onClickEdit,
  onClickCancel
}: {
  activity: IActivity;
  onClickEdit: () => void
  onClickCancel: () => void
}) {

  return (
    <Card
      fluid
      image={`/assets/categoryImages/${activity.category}.jpg`}
      header={activity.title}
      meta={activity.date.format("LLL")}
      description={activity.city + ", " + activity.venue}
      extra={
        <ButtonGroup widths={2}>
          <Button
            floated="right"
            content="Edit"
            basic
            color="blue"
            style={{ marginRight: 2 }}
            onClick={onClickEdit}
          ></Button>
          <Button floated="left" content="Cancel" basic color="red" onClick={onClickCancel}></Button>
        </ButtonGroup>
      }
    />
  );
});

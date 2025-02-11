import { Button, ButtonGroup, Card } from "semantic-ui-react";
import { IActivity } from "../../../app/models/Activity";
import { observer } from "mobx-react-lite";

export const ActivityCard = observer(function({
  activity, 
  selectActivity,
  toggleEditMode
}: {
  activity: IActivity;
  selectActivity: (id: string) => void;
  toggleEditMode: (state: boolean) => void
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
            onClick={() => toggleEditMode(true)}
          ></Button>
          <Button floated="left" content="Cancel" basic color="red" onClick={() => selectActivity("")}></Button>
        </ButtonGroup>
      }
    />
  );
});

import { Button, ButtonGroup, Card } from "semantic-ui-react";
import { IActivity } from "../../../app/models/Activity";
import moment from "moment";

export default function ActivityCard({
  activity, 
  selectActivity
}: {
  activity: IActivity;
  selectActivity: (id: string) => void;
}) {
  return (
    <Card
      fluid
      image={`/assets/categoryImages/${activity.category}.jpg`}
      header={activity.title}
      meta={moment(activity.date).format("LLL")}
      description={activity.city + ", " + activity.venue}
      extra={
        <ButtonGroup widths={2}>
          <Button
            floated="right"
            content="Edit"
            basic
            color="blue"
            style={{ marginRight: 2 }}
          ></Button>
          <Button floated="left" content="Cancel" basic color="red" onClick={() => selectActivity("")}></Button>
        </ButtonGroup>
      }
    />
  );
}

import { Button, Item, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/Activity";
import { useStore } from "../../../app/stores/Store";

export default function ActivityList({
  selectActivity,
}: {
  selectActivity: (id: string) => void;
}) {
  const {activityStore} = useStore();
  return (
    <Segment>
      <Item.Group divided>
        {activityStore.activities.map((activity: IActivity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date.format("LLL")}</Item.Meta>
              <Item.Description>
                {activity.city}, {activity.venue}
              </Item.Description>
              <Item.Extra>
                <Button
                  floated="right"
                  content="view"
                  color="blue"
                  onClick={() => selectActivity(activity.id)}
                ></Button>
                <Label basic content={activity.category}></Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}

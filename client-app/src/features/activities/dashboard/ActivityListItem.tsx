import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Icon, Item, ItemImage, Segment, SegmentGroup } from "semantic-ui-react";
import { IActivity } from "../../../app/models/Activity";
import { useStore } from "../../../app/stores/Store";

export const ActivityListItem = observer(function ({ activity }: { activity: IActivity }) {
  const { activityStore } = useStore();
  const { setTodeleteActivity } = activityStore;

  return (
    <SegmentGroup>
      <Segment>
        <Item.Group>
          <Item>
            <ItemImage size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${activity.id}`}>{activity.title}</Item.Header>
              <Item.Description>
                Hosted by User
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock"></Icon>{activity.date.format("LLL")}
          <Icon name="marker"></Icon>{activity.venue}, {activity.city}
        </span>
      </Segment>
      <Segment secondary>
        Attendee go here
      </Segment>
      <Segment clearing>
        <span>{activity.description}</span>
        <Button as={Link} to={`/activities/${activity.id}`} color="teal" floated="right" content="View"></Button>
      </Segment>
    </SegmentGroup>
  );
});

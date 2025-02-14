import { Button, Item, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/Activity";
import { useStore } from "../../../app/stores/Store";
import { ConfirmModal } from "../form/ConfirmModal";
import { useState } from "react";
import { observer } from "mobx-react-lite";

export const ActivityList = observer(function() {
  const { activityStore } = useStore();
  const [todeleteActivity, setTodeleteActivity] = useState<IActivity | undefined>(undefined);

  return (
    <Segment>
      <Item.Group divided>
        {[...activityStore.activities].map(([activityId, activity]) => (
          <Item key={activityId}>
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
                  onClick={() => activityStore.setSelectedActivity(activity)}
                ></Button>
                <Button
                  floated="right"
                  content="remove"
                  color="red"
                  onClick={() => setTodeleteActivity(activity)}
                ></Button>
                <Label basic content={activity.category}></Label>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
      <ConfirmModal
        title={"Deleting Activity"}
        onClickYes={() => {
          if(todeleteActivity) 
            activityStore.deleteActivity(todeleteActivity); 
          setTodeleteActivity(undefined);
        }}
        onClickNo={() => setTodeleteActivity(undefined)}
        isOpen={todeleteActivity != undefined}
      ></ConfirmModal>
    </Segment>
  );
});

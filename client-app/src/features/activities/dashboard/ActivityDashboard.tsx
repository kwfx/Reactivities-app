import { observer } from "mobx-react-lite";
import { Grid, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/Store";
import { ActivityCard } from "../details/ActivityCard";
import { ActivityForm } from "../form/ActivityForm";
import { ActivityList } from "./ActivityList";

export const ActivitiyDashboard = observer(function() {
  const { activityStore } = useStore();
  const { selectedActivity, setEditMode, editMode, setSelectedActivity} = activityStore;

  return (
    <Grid>
      <Grid.Column width={10}>
      {selectedActivity &&
        <ActivityList></ActivityList>
      }
      {!selectedActivity &&
        <ActivityList></ActivityList>
      }
      </Grid.Column>
      <Grid.Column width={6}>
        <Segment style={{ position: "sticky", top: "6em" }} basic>
          {selectedActivity && !editMode && (
            <ActivityCard
              activity={selectedActivity}
              onClickCancel={() => setSelectedActivity(undefined)}
              onClickEdit={() => setEditMode(true)}
            ></ActivityCard>
          )}
          {selectedActivity && editMode && (
            <ActivityForm
              activity={selectedActivity}
              onClickCancel={() => activityStore.setEditMode(false)}
            ></ActivityForm>
          )}
        </Segment>
      </Grid.Column>
    </Grid>
  );
});

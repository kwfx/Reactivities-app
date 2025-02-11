import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Grid, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/Store";
import { ActivityForm } from "../form/ActivityForm";
import ActivityList from "./ActivityList";
import { ActivityCard } from "../details/ActivityCard";

export default observer(function ActivitiyDashboard() {
  const [editMode, setEditMode] = useState(false);
  const {activityStore} = useStore()
  const handleSelectActivity = function (id: string) {
    setEditMode(false);
    activityStore.setSelectedActivity(activityStore.activities.find((act) => act.id == id));
  };
  return (
    
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          selectActivity={handleSelectActivity}
        ></ActivityList>
      </Grid.Column>
      <Grid.Column width={6}>
        <Segment style={{position: "sticky", top: "6em"}} basic>
          {activityStore.selectedActivity && !editMode && (
            <ActivityCard activity={activityStore.selectedActivity} selectActivity={handleSelectActivity} toggleEditMode={setEditMode}></ActivityCard>
          )}
          {activityStore.selectedActivity && editMode && (
            <ActivityForm activity={activityStore.selectedActivity} onClickCancel={() => setEditMode(false)}></ActivityForm>
          )}
        </Segment>
      </Grid.Column>
    </Grid>
  );
})!;

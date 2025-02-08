import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/Activity";
import ActivityList from "./ActivityList";
import { useState } from "react";
import ActivityCard from "../details/ActivityCard";
import {ActivityForm} from "../form/ActivityForm";

export default function ActivitiyDashboard({ activities }: { activities: IActivity[] }) {
  const [editMode, setEditMode] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | undefined>();
  const handleSelectActivity = function (id: string) {
    setEditMode(false);
    setSelectedActivity(activities.find((act) => act.id == id));
  };
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          activities={activities}
          selectActivity={handleSelectActivity}
        ></ActivityList>
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode && (
          <ActivityCard activity={selectedActivity} selectActivity={handleSelectActivity} toggleEditMode={setEditMode}></ActivityCard>
        )}
        {selectedActivity && editMode && (
          <ActivityForm activity={selectedActivity} onClickCancel={() => setEditMode(false)}></ActivityForm>
        )}
        
      </Grid.Column>
    </Grid>
  );
}

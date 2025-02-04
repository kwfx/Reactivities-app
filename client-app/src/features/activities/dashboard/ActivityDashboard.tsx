import { Grid } from "semantic-ui-react";
import { IActivity } from "../../../app/models/Activity";
import ActivityList from "./ActivityList";
import { useState } from "react";
import ActivityCard from "../details/ActivityCard";

export default function ActivitiyDashboard({
  activities,
}: {
  activities: IActivity[];
}) {
  const [selectedActivity, setSelectedActivity] = useState<
    IActivity | undefined
  >();
  const handleSelectActivity = function (id: string) {
    setSelectedActivity(activities.find((act) => act.id == id));
  };
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
        ></ActivityList>
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && (
          <ActivityCard
            activity={selectedActivity}
            selectActivity={handleSelectActivity}
          ></ActivityCard>
        )}
      </Grid.Column>
    </Grid>
  );
}

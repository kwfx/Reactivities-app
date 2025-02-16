import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingComponent from "../../app/layout/Loading";
import { useStore } from "../../app/stores/Store";
import { ActivityCard } from "../activities/details/ActivityCard";
import { ActivityForm } from "../activities/form/ActivityForm";

function Activity() {
  const { id } = useParams<string>();
  const { activityStore } = useStore();
  const navigate = useNavigate();
  const { setEditMode, setSelectedActivity, isLoading, editMode, selectedActivity} = activityStore;
  useEffect(() => {
    if (id) {
      activityStore.getActivityById(id).then((activity) => setSelectedActivity(activity));
    }
  }, [id, activityStore, setSelectedActivity]);

  if (isLoading) return <LoadingComponent content={"Loading app ...."}></LoadingComponent>;
  return (
    <>
      {selectedActivity && !editMode && (
        <ActivityCard
          activity={selectedActivity}
          onClickCancel={() => {setSelectedActivity(undefined); navigate("/activities");}}
          onClickEdit={() => setEditMode(true)}
        ></ActivityCard>
      )}
      {selectedActivity && editMode && (
        <ActivityForm activity={selectedActivity} onClickCancel={() => setEditMode(false)}></ActivityForm>
      )}
    </>
  );
}
export default observer(Activity);

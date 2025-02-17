import { observer } from "mobx-react-lite";
import { Header, Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/Store";
import { ConfirmModal } from "../form/ConfirmModal";
import { ActivityListItem } from "./ActivityListItem";

export const ActivityList = observer(function () {
  const { activityStore } = useStore();
  const { todeleteActivity, setTodeleteActivity } = activityStore;

  return (
    <>
      {[...activityStore.activitiesGroupedBy("date")].map(([date, activities]) => (
        <>
          <Header sub color="teal">{date}</Header>
            {activities.map((activity) => (
              <ActivityListItem key={activity.id} activity={activity}></ActivityListItem>
            ))}
        </>
      ))}
      <ConfirmModal
        title={"Deleting Activity"}
        onClickYes={() => {
          if (todeleteActivity) activityStore.deleteActivity(todeleteActivity);
          setTodeleteActivity(undefined);
        }}
        onClickNo={() => setTodeleteActivity(undefined)}
        isOpen={todeleteActivity != undefined}
      ></ConfirmModal>
    </>
  );
});

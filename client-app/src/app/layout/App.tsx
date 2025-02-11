import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import ActivitiyDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useStore } from "../stores/Store";
import LoadingComponent from "./Loading";
import NavBar from "./NavBar";
import "./styles.css";

function App() {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.isLoading)
    return <LoadingComponent inverted={true} content={"Loading app ...."}></LoadingComponent>;

  return (
    <>
      <NavBar></NavBar>
      <Container style={{ marginTop: "7em" }}>
        <ActivitiyDashboard activities={activityStore.activities}></ActivitiyDashboard>
      </Container>
    </>
  );
}

export default observer(App)!;

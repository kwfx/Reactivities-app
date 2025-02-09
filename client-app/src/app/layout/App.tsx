import { useEffect, useState } from "react";
import "./styles.css";
import "semantic-ui-css/semantic.min.css";
import { IActivity } from "../models/Activity";
import NavBar from "./NavBar";
import ActivitiyDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { Container } from "semantic-ui-react";
import moment from "moment";
import agent from "../api/agent";
import LoadingComponent from "./Loading";

function App() {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    agent.Activities.list()
      .then((response) => {
        setActivities(response.map((act: IActivity) => {
          return {...act, date: moment(act.date)}
        }));
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return (<LoadingComponent inverted={true} content={"Loading app ...."}></LoadingComponent>)

  return (
    <>
      <NavBar></NavBar>
      <Container style={{ marginTop: "7em" }}>
        <ActivitiyDashboard activities={activities}></ActivitiyDashboard>
      </Container>
    </>
  );
}

export default App;

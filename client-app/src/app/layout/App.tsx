import { useEffect, useState } from "react";
import "./styles.css";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import { IActivity } from "../models/Activity";
import NavBar from "./NavBar";
import ActivitiyDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { Container } from "semantic-ui-react";

function App() {
  const [activities, setActivities] = useState<IActivity[]>([]);

  useEffect(() => {
    axios
      .get<IActivity[]>("http://localhost:5208/api/activities")
      .then((response) => {
        setActivities(response.data);
      });
  }, []);

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

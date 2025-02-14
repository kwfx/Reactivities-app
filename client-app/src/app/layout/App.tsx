import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import { useStore } from "../stores/Store";
import LoadingComponent from "./Loading";
import {Outlet} from 'react-router-dom';
import NavBar from "./NavBar";
import "./styles.css";

function App() {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  return (
    <>
      <NavBar></NavBar>
      {activityStore.isLoading && <LoadingComponent content={"Loading app ...."}></LoadingComponent>}
      <Container style={{ marginTop: "7em" }}>
        <Outlet></Outlet>
      </Container>
    </>
  );
}

export default observer(App)!;

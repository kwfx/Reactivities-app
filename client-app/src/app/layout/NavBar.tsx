import { Menu, Container} from 'semantic-ui-react';
import { ActivityFormModal } from '../../features/activities/form/ActivityFormModal';
import { NavLink } from 'react-router-dom';

export default function NavBar(){
    return (
       <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header as={NavLink} to="/">
                    <img src="./assets/logo.png" alt="Logo" />
                    Reactivities
                </Menu.Item>
                <Menu.Item name="Activities" as={NavLink} to="activities"></Menu.Item>
                <Menu.Item>
                    <ActivityFormModal></ActivityFormModal>
                </Menu.Item>
            </Container>
       </Menu> 
    )
}
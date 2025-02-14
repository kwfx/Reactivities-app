import { Menu, Container} from 'semantic-ui-react';
import { ActivityFormModal } from '../../features/activities/form/ActivityFormModal';

export default function NavBar(){
    return (
       <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="./assets/logo.png" alt="Logo" />
                    Reactivities
                </Menu.Item>
                <Menu.Item name="Activities"></Menu.Item>
                <Menu.Item>
                    <ActivityFormModal></ActivityFormModal>
                </Menu.Item>
            </Container>
       </Menu> 
    )
}
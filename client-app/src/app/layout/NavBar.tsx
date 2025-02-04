import { Menu, Container, Button } from 'semantic-ui-react';

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
                    <Button positive content="Create activity"></Button>
                </Menu.Item>
            </Container>
       </Menu> 
    )
}
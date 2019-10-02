import React from "react";
import firebase from "../../firebase";
import { Heder, Icon, Header, Dropdown } from "semantic-ui-react";

class UserPanel extends React.Component{

    dropdownOptions = () => [
        {
            key: "user",
            text: <span>Signed in as <strong>User</strong></span>,
            disabled: true
        },
        {
            key: "avatar",
            text: <span>Change Avatar</span>
        },
        {
            key: "signout",
            text: <span onClick={this.handleSignOut}>Sign Out</span>
        }
    ]

    handleSignOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => console.log("Signed out!!"));
    }
     
    render(){
        return(
            <div>
                <div className="row justify-content-center" style={{ padding: "1.2em" }}>
                    <Header inverted floated="left" as="h2">
                        <Icon name="code" />
                        <Header.Content>DevChat</Header.Content>
                    </Header>
                </div>
                <div className="row" style={{ padding: "0.25rem" }}>
                    <Header as="h4" inverted>
                        <Dropdown 
                            trigger={
                                <span>User</span>
                            }
                            options={this.dropdownOptions()}
                        />
                    </Header>
                </div>
            </div>
        )
    }
}

export default UserPanel;
import React from "react";
import { Menu } from "semantic-ui-react";
import UserPanel from "./UserPanel";

class SidePanel extends React.Component{
    render(){
        return(
            <div style={{ background: "#4c3c4c", fontSize: "1.2rem", height: "100vh", width: "50%" }}>
                <UserPanel />
            </div>
            // <Menu size="large"
            //     inverted
            //     fixed="left"
            //     vertical
            //     style={{ background: "#4c3c4c", fontSize: "1.2rem" }}
            // ></Menu>
        )
    }
}

export default SidePanel;

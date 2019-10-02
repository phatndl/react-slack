import React, { Component } from 'react';
import { Grid } from "semantic-ui-react";
import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container-fluid zero-padding">
        <div className="row">
          <div className="col-md-4 zero-padding">
            <SidePanel />
          </div>
          <div className="col-md-4 zero-padding">
            <ColorPanel />
          </div>
          <div className="col-md-4 zero-padding">
            <Messages />
          </div>
          <div className="col-md-4 zero-padding">
            <MetaPanel />
          </div>
        </div>
      </div>
      // <Grid columns="equal" className="app" style={{ background: '#eee' }}>
      //   <ColorPanel />
      //   <SidePanel />
      //   <Grid.Column style={{ marginLeft: 520 }}>
      //     <Messages />
      //   </Grid.Column>
      //   <Grid.Column style={{ width: 4 }}>
      //     <MetaPanel />
      //   </Grid.Column>
      // </Grid>
    );
  }
}

export default App;

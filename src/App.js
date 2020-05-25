import React from 'react';
import SignIn from "./components/SignIn/SiginIn"
import SignUp from "./components/SignUp/SignUp"
import SideBar from "./components/SideBar/SideBar"
import Home from "./components/Home/Home"
import {Switch, Route, withRouter} from "react-router-dom"

const Main = withRouter(({ location }) => {
  return (
    <>
      {location.pathname !== "/sign-in" && location.pathname !== "/sign-up"  && (
        <>
          <SideBar />
        </>
      )}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
      </Switch>
    </>
  );
});


function App() {
  return (
    <div>
      <Main />
    </div>
  );
}

export default App;

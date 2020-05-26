import React from 'react';
import SignIn from "./components/SignIn/SiginIn"
import SignUp from "./components/SignUp/SignUp"
import SideBar from "./components/SideBar/SideBar"
import Home from "./components/Home/Home"
import AuthGuard from "./components/SignIn/AuthGuard"
import {Switch, Route, withRouter} from "react-router-dom"

const Main = withRouter(({ location }) => {
  return (
    <>
      {location.pathname !== "/signin" && location.pathname !== "/signup"  && (
        <>
          <SideBar />
        </>
      )}
      <Switch>
        <AuthGuard exact path="/" component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
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

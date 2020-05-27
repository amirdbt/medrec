import React from "react";
import SignIn from "./components/SignIn/SiginIn";
import SignUp from "./components/SignUp/SignUp";
import SideBar from "./components/SideBar/SideBar";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Settings from "./components/Profile/Settings";
import AuthGuard from "./components/SignIn/AuthGuard";
import ForgotPassword from "./components/SignIn/ForgotPassword"
import { Switch, Route, withRouter } from "react-router-dom";

const Main = withRouter(({ location }) => {
  return (
    <>
      {location.pathname !== "/signin" && location.pathname !== "/signup" && location.pathname !== "/forgotpassword" && (
        <>
          <SideBar />
        </>
      )}
      <Switch>
        <AuthGuard exact path="/" component={Home} />
        <AuthGuard path="/profile" component={Profile} />
        <AuthGuard path="/settings" component={Settings} />
        <Route path="/signin" component={SignIn} />
        <Route path="/forgotpassword" component={ForgotPassword} />
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

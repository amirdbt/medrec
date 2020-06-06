import React from "react";
import SignUp from "./components/SignUp/SignUp";
import SideBar from "./components/SideBar/SideBar";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Settings from "./components/Profile/Settings";
import AuthGuard from "./components/SignIn/AuthGuard";
import ForgotPassword from "./components/SignIn/ForgotPassword";
import ProviderSignUp from "./components/Providers/SignUp/SignUp";
import UserSignComponent from "./components/SignComponent/UserSignComponent";
import ProviderSignComponent from "./components/SignComponent/ProviderSignComponent"
import CreatePatient from "./components/Providers/Patient/CreatePatient"
import { Switch, Route, withRouter } from "react-router-dom";

const Main = withRouter(({ location }) => {
  return (
    <>
      {location.pathname !== "/signin" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/forgotpassword" &&
        location.pathname !== "/providers-signup" &&
        location.pathname !== "/providers-signin" &&
        location.pathname !== "/user-component" && 
        location.pathname !== "/provider-component" && (
          <>
            <SideBar />
          </>
        )}
      <Switch>
        <AuthGuard exact path="/" component={Home} />
        <AuthGuard path="/profile" component={Profile} />
        <AuthGuard path="/settings" component={Settings} />
        <Route path="/forgotpassword" component={ForgotPassword} />
        <Route path="/signup" component={SignUp} />
        <Route path="/providers-signup" component={ProviderSignUp} />
        <Route path="/user-component" component={UserSignComponent} />
        <Route path="/provider-component" component={ProviderSignComponent} />
        <Route path="/create-patient" component={CreatePatient} />
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

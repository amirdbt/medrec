import React from "react";
import SignUp from "./components/SignUp/SignUp";
import SideBar from "./components/SideBar/SideBar";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import AuthGuard from "./components/SignIn/AuthGuard";
import ForgotPassword from "./components/SignIn/ForgotPassword";
import ProviderSignUp from "./components/Providers/SignUp/SignUp";
import UserSignComponent from "./components/SignComponent/UserSignComponent";
import ProviderSignComponent from "./components/SignComponent/ProviderSignComponent";
import CreatePatient from "./components/Providers/Patient/CreatePatient";
import AllPatients from "./components/Providers/Patient/AllPatients";
import ViewPatient from "./components/Providers/Patient/ViewPatient";
import EditSettings from "./components/Providers/Patient/EditSettings";
import ViewRecord from "./components/Providers/Patient/ViewRecord";
import AddPatient from "./components/Providers/Patient/AddPatient";
import ShareRecords from "./components/Profile/ShareRecords";
import ViewHospital from "./components/Profile/ViewHospital";
import Hospitals from "./components/Profile/Hospitals";
import Files from "./components/Profile/Files";
import SharedRecordsFile from "./components/Providers/Patient/SharedRecordsFile";
import ShareRecordsFile from "./components/Profile/ShareRecordsFile";
import OTPVerification from "./components/SignIn/OTP";
import OTPProviderVerification from "./components/Providers/SignIn/OTP";
import { Switch, Route, withRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./components/Utilities/Theme";

const Main = withRouter(({ location }) => {
  return (
    <>
      {location.pathname !== "/signin" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/forgotpassword" &&
        location.pathname !== "/providers-signup" &&
        location.pathname !== "/providers-signin" &&
        location.pathname !== "/users" &&
        location.pathname !== "/providers" &&
        location.pathname !== "/otp-verify" &&
        location.pathname !== "/otp-verification" && (
          <>
            <SideBar />
          </>
        )}
      <Switch>
        <AuthGuard exact path="/" component={Home} />
        <AuthGuard path="/profile" component={Profile} />
        <AuthGuard exact path="/share-records" component={ShareRecords} />
        <AuthGuard path="/share-records/:id" component={ShareRecordsFile} />
        <Route path="/forgotpassword" component={ForgotPassword} />
        <Route path="/signup" component={SignUp} />
        <Route path="/otp-verification" component={OTPVerification} />
        <Route path="/otp-verify" component={OTPProviderVerification} />
        <Route path="/providers-signup" component={ProviderSignUp} />
        <Route path="/users" component={UserSignComponent} />
        <Route path="/providers" component={ProviderSignComponent} />
        <AuthGuard path="/create-patient" component={CreatePatient} />
        <AuthGuard path="/add-patient" component={AddPatient} />
        <AuthGuard path="/edit-settings" component={EditSettings} />
        <AuthGuard exact path="/all-patients" component={AllPatients} />
        <AuthGuard path="/all-patients/:id" component={ViewPatient} />
        <AuthGuard path="/all-records/:id" component={ViewRecord} />
        <AuthGuard exact path="/hospitals" component={Hospitals} />
        <AuthGuard exact path="/hospitals/:id" component={ViewHospital} />
        <AuthGuard path="/hospitals/:id/:rid" component={Files} />
        <AuthGuard path="/shared-records/:id" component={SharedRecordsFile} />
      </Switch>
    </>
  );
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  );
}

export default App;

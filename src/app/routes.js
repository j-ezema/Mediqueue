import React from "react";
import { Route, Routes} from "react-router-dom";
import withRouter from "../hooks/withRouter"
import { Home } from "../pages/home";
import { PatientBoard } from "../pages/PatientBoard";
import { ContactUs } from "../pages/contact";
import { InjuryList } from "../pages/InjuryList";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { EditPatientBoard } from "../pages/EditPatientBoard";
import { AddPatient } from "../pages/AddPatient";
import { DeletePatient } from "../pages/DeletePatient";
import { EditPatientPosition } from "../pages/EditPatientPosition";
import { RegisterAccount } from "../pages/RegisterAccount";
import { UserPage } from "../pages/UserPage";
const AnimatedRoutes = withRouter(({ location }) => (
  <TransitionGroup>
    <CSSTransition
      key={location.key}
      timeout={{
        enter: 400,
        exit: 400,
      }}
      classNames="page"
      unmountOnExit
    >
      <Routes location={location}>
        <Route exact path="/" element={<Home />} />
        <Route path="/InjuryList" element={<InjuryList />} />
        <Route path="/PatientBoard" element={<PatientBoard />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/EditPatientBoard" element={<EditPatientBoard />} />
        <Route path="/AddPatient" element={<AddPatient />} />
        <Route path="/DeletePatient" element={<DeletePatient />} />
        <Route path="/EditPatientPosition" element={<EditPatientPosition />} />
        <Route path="/RegisterAccount" element={<RegisterAccount />} />
        <Route path="/UserPage" element={<UserPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </CSSTransition>
  </TransitionGroup>
));

function AppRoutes() {
  return (
    <div className="s_c">
      <AnimatedRoutes />
    </div>
  );
}

export default AppRoutes;

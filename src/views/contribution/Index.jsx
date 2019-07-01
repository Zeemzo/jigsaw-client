import React from "react";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import PageHeader from "components/PageHeader/PageHeader.jsx";
import Footer from "components/Footer/Footer.jsx";
import withAuthorization from "components/Authentication/Index.jsx";


// sections for this page/view
import Basics from "views/IndexSections/Basics.jsx";
import Navbars from "views/IndexSections/Navbars.jsx";
import Tabs from "views/IndexSections/Tabs.jsx";
import Pagination from "views/IndexSections/Pagination.jsx";
import Notifications from "views/IndexSections/Notifications.jsx";
import Typography from "views/IndexSections/Typography.jsx";
import JavaScript from "views/IndexSections/JavaScript.jsx";
import NucleoIcons from "views/IndexSections/NucleoIcons.jsx";
import Signup from "views/IndexSections/Signup.jsx";
import Examples from "views/IndexSections/Examples.jsx";
import Download from "views/IndexSections/Download.jsx";
import ControlledEditor from "views/contribution/ControlledEditor.jsx";
import UncontrolledEditor from "views/contribution/UncontrolledEditor.jsx";

import {
  Container,
  Row
} from "reactstrap";
class Contribution extends React.Component {
  componentDidMount() {
    document.body.classList.toggle("index-page");
  }
  componentWillUnmount() {
    document.body.classList.toggle("index-page");
  }


  render() {
    return (
      <>
        <IndexNavbar />
        <div className="wrapper">
          <br /><br /><br /> <Container>
            <Row className="justify-content-center">
              <UncontrolledEditor />
            </Row>
          </Container>

          <div className="main">
            {/* <ControlledEditor /> */}
          </div>
          <Footer />
        </div>

      </>
    );
  }
}

///dont mistake the displayName, it has the user role data in it.
const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Contribution);
// export default Contribution;

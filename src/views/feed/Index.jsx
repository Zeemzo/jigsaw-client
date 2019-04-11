import React from "react";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import PageHeader from "components/PageHeader/PageHeader.jsx";
import Footer from "components/Footer/Footer.jsx";
// import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


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
          <PageHeader />
          <div className="main">
            {/* <Editor
              editorState={true}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={this.onEditorStateChange}
            /> */}
            {/* <Basics /> */}
            {/* <Navbars /> */}
            {/* <Tabs />
            <Pagination />
            <Notifications />
            <Typography />
            <JavaScript />
            <NucleoIcons />
            <Signup />
            <Examples />
            <Download /> */}
          </div>
          <Footer />
        </div>
      </>
    );
  }
}

export default Contribution;

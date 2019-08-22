import React from "react";
import FilterResults from 'react-filter-search';
import {
  // Button,
  Card,
  CardBody,
  Container,
  Row, Input, InputGroupAddon, InputGroupText, InputGroup,
  Col,
} from "reactstrap";
import classnames from "classnames";
import { Link, withRouter } from 'react-router-dom';
import ReactLoading from "react-loading";
import { store } from "variables/redux";
// core components
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import ScrollableAnchor, { goToTop } from 'react-scrollable-anchor'
import { findKnowledge } from 'services/KnowledgeManagement';
import { TextBlock, MediaBlock, TextRow, RectShape, RoundShape } from 'react-placeholder/lib/placeholders';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import HowItWorks from "views/home/HowItWorks";
import Contact from "views/home/Contact";
import WhyJigsaw from "views/home/WhyJigsaw";
class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      value: '',
      showSpinner: false,
      loadingMessage: 'something is happenning...'

    };
    //console.log(this.props.location)
    this.handleLoadChange = this.handleLoadChange.bind(this)

  }

  handleChange = event => {
    const { value } = event.target;
    this.setState({ value });
  };

  async componentDidMount() {
    document.body.classList.toggle("index-page");
    goToTop()
    store.subscribe(this.handleLoadChange)
    this.setState({ showSpinner: true });


    const res = await findKnowledge()
    if (res != null) {
      //console.log(res)
      this.setState({ data: res.data.knowledge })
      this.setState({ showSpinner: false });

    }

  }

  handleLoadChange() {
    //console.log(store.getState())
    this.setState({ loadingMessage: store.getState() + '...' })
  }
  componentWillUnmount() {
    document.body.classList.toggle("index-page");

  }
  render() {

    return (
      <>
        <IndexNavbar />
        <div className="wrapper">
          <ScrollableAnchor id={'Home'}>
            <div className="page-header header-filter">
              <div className="squares square1" />
              <div className="squares square2" />
              <div className="squares square3" />
              <div className="squares square4" />
              <div className="squares square5" />
              <div className="squares square6" />
              <div className="squares square7" />
              <Container>
                <div className="content-center brand">
                  <h1 className="h1-seo">JIGSAW</h1>
                  <h3 className="d-none d-sm-block">
                    Blockchain Based Knowledge Sharing and Organizing Platform</h3>
                </div>
              </Container>
            </div>
          </ScrollableAnchor>
          <WhyJigsaw />
          <HowItWorks />
          {/* <Team />
          <PastEvents /> */}
          <Contact />
          <Footer />
        </div>
      </>
    );
  }
}

export default withRouter(Feed);

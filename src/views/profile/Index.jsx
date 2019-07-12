import React from "react";
import classnames from "classnames";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
// reactstrap components
import {
  Button, Card, CardHeader, CardBody, Label, FormGroup, Form, Input, FormText, NavItem, NavLink,
  Nav, Table, TabContent, TabPane, Container, Row, Col, UncontrolledTooltip, UncontrolledCarousel
} from "reactstrap";

// core components
import Footer from "components/Footer/Footer.jsx";
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import withAuthorization from "components/Authentication/Index.jsx";
import { getWalletBalance, getUserSession } from "services/UserManagement";
import { ToastContainer, ToastStore } from 'react-toasts';
import ReactLoading from "react-loading";
import{ goToTop } from 'react-scrollable-anchor'

import {withRouter} from 'react-router-dom';

let ps = null;

const sample = [{ assetCode: "JIGXU", amount: "10000" }];
class Profile extends React.Component {
  constructor(props) {
    super(props);
    const user = getUserSession()
    this.state = {
      tabs: 1,
      balance: [],
      userName: user != null ? user.alias : "",
      publicKey: user != null ? user.publicKey : "",
      showSpinner: false

    };

    // this.componentDidMount = this.componentDidMount().bind(this);
  }

  copyMessage(val) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  // async getBalance() {

  // }

  async componentDidMount() {
    goToTop()
    const user = getUserSession()
    if (user != null) {
      this.setState({ showSpinner: true })
      const balance = await getWalletBalance(user.publicKey);
      if (balance != null) {

        this.setState({ balance: balance });
        this.setState({ showSpinner: false })
        console.log(balance);
      }
    }


    // this.getBalance()
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.body.classList.toggle("profile-page");
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
    document.body.classList.toggle("profile-page");
  }
  toggleTabs = (e, stateName, index) => {
    e.preventDefault();
    this.setState({
      [stateName]: index
    });
  };
  render() {
    return (
      <>
        {/* <ExamplesNavbar /> */}
        <IndexNavbar />
        <ToastContainer className="toastColor" position={ToastContainer.POSITION.BOTTOM_RIGHT} store={ToastStore} />

        <div className="wrapper">
          <div className="page-header">
            <img
              alt="..."
              className="dots"
              src={require("assets/img/dots.png")}
            />
            <img
              alt="..."
              className="path"
              src={require("assets/img/path4.png")}
            />
            <Container className="align-items-center">
              <Row>
                <Col className="ml-auto mr-auto" lg="4" md="6">
                  <Card className="card-coin card-plain">
                    <CardHeader>
                      <img
                        alt="..."
                        className="img-center img-fluid rounded-circle"
                        src={require("assets/img/mike.jpg")}
                      />
                      <h4 className="title">{this.state.userName}</h4>
                      <Button onClick={e => {
                        this.copyMessage(this.state.publicKey)
                        ToastStore.success("Public Key Copied to Clipboard");

                      }} id="bottom">{this.state.publicKey.substring(0, 15)}...</Button>
                      <UncontrolledTooltip placement="bottom" target="bottom" delay={0}>Click to Copy PublicKey</UncontrolledTooltip>
                    </CardHeader>
                    <CardBody>
                      <Nav
                        className="nav-tabs-primary justify-content-center"
                        tabs
                      >
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: this.state.tabs === 1
                            })}
                            onClick={e => this.toggleTabs(e, "tabs", 1)}
                            href="#pablo"
                          >
                            Wallet
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: this.state.tabs === 2
                            })}
                            onClick={e => this.toggleTabs(e, "tabs", 2)}
                            href="#pablo"
                          >
                            Send
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: this.state.tabs === 3
                            })}
                            onClick={e => this.toggleTabs(e, "tabs", 3)}
                            href="#pablo"
                          >
                            News
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent
                        className="tab-subcategories"
                        activeTab={"tab" + this.state.tabs}
                      >
                        <TabPane tabId="tab1">
                          <Table className="tablesorter" responsive>
                            <thead className="text-primary">
                              <tr>
                                <th className="header">COIN</th>
                                <th className="header">AMOUNT</th>
                              </tr>
                            </thead><tbody>
                              <div hidden={!this.state.showSpinner} id="myModal" class="modal">
                                <ReactLoading class="modal-content" type={"cubes"} color="#fff" />
                              </div>
                              {this.state.balance.map((item, i) => (
                                <tr key={i + "g"}>
                                  <td>{item.assetCode != null ? item.assetCode : "XLM"}</td>
                                  <td>{item.balance}</td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </TabPane>
                        <TabPane tabId="tab2">
                          <Row>
                            <Label sm="3">Pay to</Label>
                            <Col sm="9">
                              <FormGroup>
                                <Input
                                  placeholder="e.g. 1Nasd92348hU984353hfid"
                                  type="text"
                                />
                                <FormText color="default" tag="span">
                                  Please enter a valid address.
                                </FormText>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Label sm="3">Amount</Label>
                            <Col sm="9">
                              <FormGroup>
                                <Input placeholder="1.587" type="text" />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Button
                            className="btn-simple btn-icon btn-round float-right"
                            color="primary"
                            type="submit"
                          >
                            <i className="tim-icons icon-send" />
                          </Button>
                        </TabPane>
                        <TabPane tabId="tab3">
                          <Table className="tablesorter" responsive>
                            <thead className="text-primary">
                              <tr>
                                <th className="header">Latest Crypto News</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>The Daily: Nexo to Pay on Stable...</td>
                              </tr>
                              <tr>
                                <td>Venezuela Begins Public of Nation...</td>
                              </tr>
                              <tr>
                                <td>PR: BitCanna – Dutch Blockchain...</td>
                              </tr>
                            </tbody>
                          </Table>
                        </TabPane>
                      </TabContent>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>

          <Footer />
        </div>
      </>
    );
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(withRouter(Profile));

import React from "react";
import classnames from "classnames";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
// reactstrap components
import {
  Button, Card, CardHeader, CardBody, Label, FormGroup, Input, FormText, NavItem, NavLink,
  Nav, Table, TabContent, TabPane, Container, Row, Col, UncontrolledTooltip
} from "reactstrap";

// core components
import Footer from "components/Footer/Footer.jsx";
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import withAuthorization from "components/Authentication/Index.jsx";
import { getWalletBalance, getUserSession } from "services/UserManagement";
import { ToastContainer, ToastStore } from 'react-toasts';
import ReactLoading from "react-loading";
import { goToTop } from 'react-scrollable-anchor'
import { store } from "variables/redux";
import Transfer from "views/profile/transfer"
import Convert from "views/profile/convert"

import { withRouter } from 'react-router-dom';

let ps = null;

// const sample = [{ assetCode: "JIGXU", amount: "10000" }];
class Profile extends React.Component {
  constructor(props) {
    super(props);
    const user = getUserSession()
    this.state = {
      tabs: 1,
      balance: [],
      userName: user != null ? user.alias : "",
      publicKey: user != null ? user.publicKey : "",
      showSpinner: false,
      loadingMessage: 'something is happenning...'

    };

    this.handleChange = this.handleChange.bind(this)
    this.updateWallet = this.updateWallet.bind(this)
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
  async updateWallet() {
    const user = getUserSession()
    if (user != null) {
      this.setState({ showSpinner: true })
      const balance = await getWalletBalance(user.publicKey);
      if (balance != null) {

        this.setState({ balance: balance });
        this.setState({ showSpinner: false })
        //console.log(balance);
      }
    }
  }
  async componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.body.classList.toggle("profile-page");
    store.subscribe(this.handleChange)

    goToTop()
    const user = getUserSession()
    if (user != null) {
      this.setState({ showSpinner: true })
      const balance = await getWalletBalance(user.publicKey);
      if (balance != null) {

        this.setState({ balance: balance });
        this.setState({ showSpinner: false })
        //console.log(balance);
      }
    }


    // this.getBalance()

  }

  handleChange() {
    //console.log(store.getState())
    this.setState({ loadingMessage: store.getState() + '...' })
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
                <Col className="ml-auto mr-auto" lg="6" sm="12">
                  <Card className="card-coin card-plain">

                    <CardHeader>
                      <img
                        alt="..."
                        className="img-center img-fluid rounded-circle"
                        src={require("assets/img/nightking.jpeg")}
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
                            Transfer
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
                            Convert
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent
                        className="tab-subcategories"
                        activeTab={"tab" + this.state.tabs}
                      >
                        <TabPane tabId="tab1">
                          {/* <div hidden={!this.state.showSpinner} id="myModal" className="modal">
                          <ReactLoading className="modal-content" type={"cubes"} color="#fff" />
                        </div> */}
                          <Table className="tablesorter" responsive>
                            <thead className="text-primary">
                              <tr>
                                <th className="header">COIN</th>
                                <th className="header">AMOUNT</th>
                              </tr>
                            </thead><tbody>
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
                          <Transfer alias={this.state.userName} updateWallet={this.updateWallet}></Transfer>
                        </TabPane>
                        <TabPane tabId="tab3">
                          <Convert updateWallet={this.updateWallet} balance={this.state.balance}></Convert>
                        </TabPane>
                      </TabContent>
                    </CardBody>
                    <div hidden={!this.state.showSpinner} id="myModal" className="modalLoad">
                      <div className="modalLoad-content" >
                        <ReactLoading className="modalLoad-content" type={"spinningBubbles"} color="#fff" />
                      </div> <h3 className="loadingMessage" style={{ "textAlign": "center" }}>{this.state.loadingMessage}</h3>

                    </div>
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

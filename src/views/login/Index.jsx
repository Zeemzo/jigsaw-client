import React from "react";
import classnames from "classnames";
import { Link, withRouter } from "react-router-dom";
import { login } from "services/UserManagement";
import Switch from "react-bootstrap-switch";
import { goToTop } from 'react-scrollable-anchor'
import { loadReCaptcha, ReCaptcha } from 'react-recaptcha-v3'
// import { ReCaptcha } from 'react-recaptcha-v3'

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import Footer from "components/Footer/Footer.jsx";
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import { ToastContainer, ToastStore } from 'react-toasts';
import ReactLoading from "react-loading";
import { loginWithSecret } from "../../services/UserManagement";

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      squares1to6: "",
      squares7and8: "",
      txtEmail: "",
      txtPassword: "",
      invalidEmail: false,
      showSpinner: false,
      privateLogin: false

    }
  }
  componentDidMount() {
    loadReCaptcha("6Lek76sUAAAAAILsTOL7ixa863iywT6tvwSnzvYb");

    goToTop()
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", this.followCursor);
  }
  componentWillUnmount() {
    document.body.classList.toggle("register-page");
    document.documentElement.removeEventListener(
      "mousemove",
      this.followCursor
    );


  }
  followCursor = event => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    this.setState({
      squares1to6:
        "perspective(500px) rotateY(" +
        posX * 0.05 +
        "deg) rotateX(" +
        posY * -0.05 +
        "deg)",
      squares7and8:
        "perspective(500px) rotateY(" +
        posX * 0.02 +
        "deg) rotateX(" +
        posY * -0.02 +
        "deg)"
    });
  };


  verifyCallback = (recaptchaToken) => {
    // Here you will get the final recaptchaToken!!!  
    console.log(recaptchaToken, "<= your recaptcha token")
  }

  render() {
    const isInvalid = this.state.privateLogin ?
      this.state.txtPassword === "" :
      this.state.invalidEmail || this.state.txtPassword === "" || this.state.txtEmail === "";
    return (
      <>
        {/* <ExamplesNavbar /> */}
        <IndexNavbar />
        <ToastContainer className="toastColor" position={ToastContainer.POSITION.BOTTOM_RIGHT} store={ToastStore} />


        <div className="wrapper">
          <div className="page-header">
            <div className="page-header-image" />
            <div className="content">
              <Container>
                <Row>
                  <Col className="offset-lg-0 offset-md-3" lg="5" md="6" sm="12">
                    <Card className="card-register">
                      <CardHeader>
                        <CardImg
                          alt="..."
                          src={require("assets/img/square1.png")}
                        />
                        <CardTitle tag="h4">Login</CardTitle>
                      </CardHeader>
                      <CardBody>
                        <ReCaptcha
                          size="normal"
                          data-theme="dark"
                          render="explicit"
                          sitekey="6Lek76sUAAAAAILsTOL7ixa863iywT6tvwSnzvYb"
                          action='homepage'
                          verifyCallback={this.verifyCallback}
                        />
                        <Form className="form">
                          <Col lg="6" sm="6">
                            <p className="category">Secret Key Login</p>
                            {/* <Switch offColor="" offText="" onColor="" onText="" /> */}
                            {/* <br /> */}
                            <Switch onChange={e => {
                              this.setState({ privateLogin: e.state.value });
                            }} defaultValue={false} offColor="" onColor="blue" />
                          </Col>
                          <FormGroup hidden={this.state.privateLogin}
                            className={this.state.invalidEmail ? "has-danger" : null}
                          >
                            <InputGroup
                              className={this.state.invalidEmail ? "has-danger" : classnames({
                                "input-group-focus": this.state.emailFocusLogin
                              })}

                            >
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="tim-icons icon-email-85" />
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input
                                placeholder="Email"
                                type="text"
                                onFocus={e => this.setState({ emailFocusLogin: true })}
                                onBlur={e => {
                                  this.setState({ emailFocusLogin: false })
                                  const regex = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$');
                                  if (!regex.test(this.state.txtEmail)) {
                                    this.setState({ invalidEmail: true })
                                  } else {
                                    this.setState({ invalidEmail: false })
                                  }
                                }}
                                onChange={e => {
                                  this.setState({ txtEmail: e.target.value })
                                  if (this.state.txtEmail.length == 0) {
                                    this.setState({ invalidEmail: false })
                                  }
                                }}
                              />
                            </InputGroup></FormGroup>

                          <InputGroup
                            className={classnames({
                              "input-group-focus": this.state.passwordFocusLogin
                            })}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-lock-circle" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder={!this.state.privateLogin ? "Password" : "Secret Key"}
                              type="password"
                              onFocus={e => this.setState({ passwordFocusLogin: true })}
                              onBlur={e => this.setState({ passwordFocusLogin: false })}
                              onChange={e => {
                                this.setState({ txtPassword: e.target.value })
                              }}
                            />
                          </InputGroup>
                        </Form>
                      </CardBody>
                      <CardFooter>
                        <div hidden={!this.state.showSpinner} id="myModal" class="modalLoad">
                          <div class="modalLoad-content" >
                            <ReactLoading class="modalLoad-content" type={"spinningBubbles"} color="#fff" />
                          </div> <h3 style={{ "textAlign": "center" }}>something is happenning...</h3>

                        </div>
                        <Button className="btn-round" color="info" size="lg" onClick={
                          async () => {
                            if (navigator.onLine) {
                              if (!this.state.privateLogin) {
                                this.setState({ showSpinner: true });

                                const responseStatus = await login(this.state.txtEmail, this.state.txtPassword)

                                switch (responseStatus) {
                                  case 200:
                                    this.setState({ showSpinner: false });
                                    ToastStore.success("Login Successful");
                                    this.props.history.push('/profile'); break;
                                  case 203:
                                    this.setState({ showSpinner: false });
                                    ToastStore.warning("Account Doesn't Exist"); break;
                                  case 201:
                                    this.setState({ showSpinner: false });
                                    ToastStore.error("Password is incorrect"); break;
                                  case null:
                                    this.setState({ showSpinner: false });
                                    ToastStore.error("Login Failed");
                                }
                              } else {
                                this.setState({ showSpinner: true });

                                const responseStatus = await loginWithSecret(this.state.txtPassword)

                                switch (responseStatus) {
                                  case 200:
                                    this.setState({ showSpinner: false });
                                    ToastStore.success("Login Successful");
                                    this.props.history.push('/profile'); break;
                                  case 203:
                                    this.setState({ showSpinner: false });
                                    ToastStore.warning("Account Doesn't Exist"); break;
                                  case 201:
                                    this.setState({ showSpinner: false });
                                    ToastStore.error("Private Key is incorrect"); break;
                                  case null:
                                    this.setState({ showSpinner: false });
                                    ToastStore.error("Login Failed");
                                }
                              }

                            } else {
                              ToastStore.error("You are offline");

                            }

                          }
                        } type="submit" disabled={isInvalid}>
                          Login
                  </Button>{" "}<Label check> Not a Member? <Link to="/register" tag={Link}>
                          Register
                  </Link></Label>
                      </CardFooter>
                    </Card>
                  </Col>
                </Row>
                <div className="register-bg" />
                <div
                  className="square square-1"
                  id="square1"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-2"
                  id="square2"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-3"
                  id="square3"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-4"
                  id="square4"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-5"
                  id="square5"
                  style={{ transform: this.state.squares1to6 }}
                />
                <div
                  className="square square-6"
                  id="square6"
                  style={{ transform: this.state.squares1to6 }}
                />
              </Container>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }
}

export default withRouter(Login);

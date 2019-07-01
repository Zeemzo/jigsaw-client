import React from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { login } from "services/UserManagement";

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
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import { ToastContainer, ToastStore } from 'react-toasts';
import ReactLoading from "react-loading";
import { withToastManager } from 'react-toast-notifications';

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      squares1to6: "",
      squares7and8: "",
      txtEmail: "",
      txtPassword: "",
      invalidEmail: false,
      showSpinner: false

    }
  }
  componentDidMount() {
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
  render() {
    const isInvalid =
      this.state.txtPassword === "" ||
      this.state.txtEmail === "";
    return (
      <>
        {/* <ExamplesNavbar /> */}
        <IndexNavbar />
        <ToastContainer position={ToastContainer.POSITION.BOTTOM_RIGHT} store={ToastStore} />

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
                        <Form className="form">
                          <InputGroup
                            className={classnames({
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
                                if (this.state.txtEmail.length > 5 && !regex.test(this.state.txtEmail)) {
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
                          </InputGroup>
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
                              placeholder="Password"
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
                        <div hidden={!this.state.showSpinner} id="myModal" class="modal">
                          <ReactLoading class="modal-content" type={"spinningBubbles"} color="#fff" />
                        </div>
                        <Button className="btn-round" color="info" size="lg" onClick={
                          async () => {
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

export default Login;

import React from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { register } from "services/UserManagement";
import ReactLoading from "react-loading";
import { goToTop } from 'react-scrollable-anchor'
import {withRouter} from 'react-router-dom';

// reactstrap components
import {
  Button, Card, CardHeader, CardBody, CardFooter, CardImg, CardTitle, Label, FormGroup, Form, Modal,
  Input, InputGroupAddon, InputGroupText, InputGroup, Container, Row, Col, Alert
} from "reactstrap";
import { ToastContainer, ToastStore } from 'react-toasts';

// core components
import Footer from "components/Footer/Footer.jsx";
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";

var setup = require("hsimp-purescript");
var characterSets = require("hsimp-purescript/dictionaries/character-sets.json");
var periods = require("hsimp-purescript/dictionaries/periods.json");
var namednumbers = require("hsimp-purescript/dictionaries/named-numbers.json");
var top10k = require("hsimp-purescript/dictionaries/top10k.json");
var patterns = require("hsimp-purescript/dictionaries/patterns.json");
var checks = require("hsimp-purescript/dictionaries/checks.json");
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      squares1to6: "",
      squares7and8: "",
      txtEmail: "",
      txtPassword: "",
      txtFullName: "",
      txtConfirmPassword: "",
      passwordStrength: "a second",
      showPasswordMeter: false,
      revealPassword: "password",
      passwordMatched: true,
      invalidEmail: false,
      showSpinner: false,
      iAgree: false,
      demoModal: false

    }
  }
  componentDidMount() {
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

  toggleModal = modalState => {
    this.setState({
      [modalState]: !this.state[modalState]
    });
  };
  checkStrength() {
    const hsimp = setup({
      calculation: {
        calcs: 40e9,
        characterSets: characterSets
      },
      time: {
        periods: periods,
        namedNumbers: namednumbers,
        forever: 'Forever',
        instantly: 'an Instant'
      },
      checks: {
        dictionary: top10k,
        patterns: patterns,
        messages: checks
      }
    });

    this.setState({ passwordStrength: hsimp(this.state.txtPassword).time });
  }


  render() {
    const isInvalid = this.state.invalidEmail ||
      this.state.txtPassword !== this.state.txtConfirmPassword ||
      this.state.txtPassword === "" ||
      this.state.txtEmail === "" ||
      this.state.txtFullName === "" || !this.state.iAgree;
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
                  <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                    <div
                      className="square square-7"
                      id="square7"
                      style={{ transform: this.state.squares7and8 }}
                    />
                    <div
                      className="square square-8"
                      id="square8"
                      style={{ transform: this.state.squares7and8 }}
                    />
                    <Card className="card-register">

                      <CardHeader>
                        <Modal
                          id="termsModal" modalClassName="modal-black"
                          isOpen={this.state.demoModal}
                          toggle={() => this.toggleModal("demoModal")}
                        >
                          <div className="modal-header justify-content-center">
                            <button
                              className="close"
                              onClick={() => this.toggleModal("demoModal")}
                            >
                              <i className="tim-icons icon-simple-remove" />
                            </button>
                            <h4 className="title title-up">Terms and Conditions</h4>
                          </div>
                          <div className="modal-body">
                            <p>
                              Far far away, behind the word mountains, far from the
                              countries Vokalia and Consonantia, there live the blind texts.
                              Separated they live in Bookmarksgrove right at the coast of
                              the Semantics, a large language ocean. A small river named
                              Duden flows by their place and supplies it with the necessary
                              regelialia. It is a paradisematic country, in which roasted
                              parts of sentences fly into your mouth.
                </p>
                          </div>
                          <div className="modal-footer">
                            <Button color="default" type="button" onClick={e => {
                                this.setState({ iAgree: !this.state.iAgree })
                                this.toggleModal("demoModal")
                              }} >{this.state.iAgree?"I Disagree":"I Agree"}
                              
                </Button>
                            <Button
                              color="danger"
                              type="button"
                              onClick={() => this.toggleModal("demoModal")}
                            >
                              Close
                </Button>
                          </div>
                        </Modal>
                        <CardImg
                          alt="..."
                          src={require("assets/img/square-purple-1.png")}
                        />
                        <CardTitle tag="h4">Register</CardTitle>
                      </CardHeader>
                      <CardBody>
                        <Form className="form">
                          <InputGroup
                            className={classnames({
                              "input-group-focus": this.state.fullNameFocus
                            })}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-single-02" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Alias"
                              type="text"
                              onFocus={e => this.setState({ fullNameFocus: true })}
                              onBlur={e => this.setState({ fullNameFocus: false })}
                              onChange={e => { this.setState({ txtFullName: e.target.value }) }}
                            />
                          </InputGroup>

                          <FormGroup className={this.state.invalidEmail ? "has-danger" : null}>
                            <InputGroup
                              className={this.state.invalidEmail ? "has-danger" : classnames({
                                "input-group-focus": this.state.emailFocus
                              })}
                            >
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="tim-icons icon-email-85" />
                                </InputGroupText>
                              </InputGroupAddon>

                              <Input
                                className="form-control-danger"

                                placeholder="Email"
                                type="text"
                                onFocus={e => this.setState({ emailFocus: true })}
                                onBlur={e => {
                                  this.setState({ emailFocus: false })
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
                          </FormGroup>
                          {this.state.showPasswordMeter && this.state.passwordFocus?
                            <Alert color="warning">
                              It takes {this.state.passwordStrength} to crack your password!</Alert>
                            : null}
                          {this.state.passwordFocus&&!this.state.showPasswordMeter ? <Alert color="danger">
                            THIS IS A ONE TIME PASSWORD, DON'T FORGET IT!!!</Alert> : null}
                          {/* <UncontrolledTooltip placement="top" target="txtPassword" delay={0}>THIS IS A ONE TIME PASSWORD, DON'T FORGET IT!!!</UncontrolledTooltip> */}

                          <InputGroup
                            className={classnames({
                              "input-group-focus": this.state.passwordFocus
                            })}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="tim-icons icon-lock-circle" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              id="txtPassword"
                              placeholder="Password"
                              type="password"
                              onFocus={e => this.setState({ passwordFocus: true })}
                              onBlur={e => this.setState({ passwordFocus: false })}
                              onChange={e => {
                                this.setState({ txtPassword: e.target.value })
                                this.checkStrength();
                                if (e.target.value.length != 0) {
                                  this.setState({ showPasswordMeter: true })
                                } else {
                                  this.setState({ showPasswordMeter: false })
                                }
                              }}
                            />
                          </InputGroup>
                          <FormGroup className={!this.state.passwordMatched ? "has-danger" : null}>

                            <InputGroup
                              className={this.state.passwordMatched ? classnames({
                                "input-group-focus": this.state.confirmPasswordFocus
                              }) : "has-danger"}
                            >
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                  <i className="tim-icons icon-lock-circle" />
                                </InputGroupText>
                              </InputGroupAddon>

                              <Input
                                placeholder="Confirm Password"
                                type="password"
                                onFocus={e => this.setState({ confirmPasswordFocus: true })}
                                onBlur={e => this.setState({ confirmPasswordFocus: false })}
                                onChange={e => {
                                  this.setState({ txtConfirmPassword: e.target.value })
                                  if (e.target.value.length >= this.state.txtPassword.length && e.target.value != this.state.txtPassword) {
                                    this.setState({ passwordMatched: false })
                                  } else {
                                    this.setState({ passwordMatched: true })
                                    this.setState({ showPasswordMeter: false })
                                  }
                                }}
                              />


                            </InputGroup></FormGroup>

                          
                          {/* 
                          {!this.state.passwordMatched ? <Alert color="danger">
                            Your password confirmation doesn't match  </Alert> : null} */}
                          <FormGroup check className="text-left">
                            <Label check>
                              <Input type="checkbox" onClick={e => {
                                this.setState({ iAgree: !this.state.iAgree })
                              }} checked={this.state.iAgree}/>
                              <span className="form-check-sign" />I agree to the{" "}
                              <a href="#pablo"
                                onClick={() => this.toggleModal("demoModal")}
                              >terms and conditions
                              </a>.
                              <span />
                            </Label>
                          </FormGroup>
                        </Form>
                      </CardBody>

                      <CardFooter>
                        <Button onClick={
                          async () => {
                            this.setState({ showSpinner: true })

                            const responseStatus = await register(this.state.txtEmail, this.state.txtPassword, this.state.txtFullName)

                            if (responseStatus != null) {
                              console.log(responseStatus)
                            }

                            switch (responseStatus) {
                              case 200:
                                console.log("Registration Successful")
                                this.setState({ showSpinner: false });
                                ToastStore.success("Registration Successful");
                                this.props.history.push('/blockchainAccount');
                                break;
                              case 203:
                                console.log("Account Already Exists")
                                this.setState({ showSpinner: false });
                                ToastStore.warning("Account Already Exists"); break;
                              case null:
                                this.setState({ showSpinner: false });
                                ToastStore.error("Registration Failed");
                            }

                          }
                        } type="submit" disabled={isInvalid}
                          className="btn-round" color="primary" size="lg" >
                          Get Started
                        </Button>{" "}
                        <Label check> Already a user? <Link to="/login" tag={Link}>
                          Login
                  </Link></Label>
                  <div hidden={!this.state.showSpinner} id="myModal" class="modalLoad">
                          <div class="modalLoad-content" >
                            <ReactLoading class="modalLoad-content" type={"spinningBubbles"} color="#fff" />
                          </div> <h3 style={{ "textAlign": "center" }}>something is happenning...</h3>

                        </div>

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

export default withRouter(Register);

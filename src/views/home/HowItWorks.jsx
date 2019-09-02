import React from "react";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

class HowItWorks extends React.Component {
    render() {
        return (
            <div className="section" id="how" style={{ overflow: "hidden" }}>
                <div className="squares square2" />
                <div className="squares square3" />
                <div className="squares square4" />
                <div className="squares square5" />
                <div className="squares square6" />
                <div className="squares square7" />
                <Container>
                    <div className="space-50" />
                    <div>
                        <h1>How it works?</h1>
                        <hr className="line-success" />
                    </div>
                    <div className="space-50" />
                    <Row>
                        <Col lg="12" className='howItWorksContainer'>
                            <Row>
                                <Col lg="12" className="text-center" >
                                    <h2>EVERYTHING HAPPENS WITH <span style={{ color: "#1D8CF8", fontWeight: "bold", fontSize: "2.0625rem" }}>BLOCKCHAIN</span></h2>
                                </Col>
                            </Row>
                            <div className="space-50 d-none d-lg-block" />
                            <Row className="text-center d-none d-lg-flex d-md-flex">
                                <Col md='1' lg='1' />
                                <Col md='1' lg='1'>
                                    <h3 className="font-weight-bold" >1</h3>
                                </Col>
                                <Col md='2' lg='2'>
                                    <img
                                        alt="why"
                                        className="img-fluid"
                                        src={require("assets/img/howItWorks/arrow.svg")}
                                    />
                                </Col>
                                <Col md='1' lg='1'>
                                    <h3 className="font-weight-bold" >2</h3>
                                </Col>
                                <Col md='2' lg='2'>
                                    <img
                                        alt="why"
                                        className="img-fluid"
                                        src={require("assets/img/howItWorks/arrow.svg")}
                                    />
                                </Col>
                                <Col md='1' lg='1'>
                                    <h3 className="font-weight-bold" >3</h3>
                                </Col>
                                <Col md='2' lg='2'>
                                    <img
                                        alt="why"
                                        className="img-fluid"
                                        src={require("assets/img/howItWorks/arrow.svg")}
                                    />
                                </Col>
                                <Col md='1' lg='1'>
                                    <h3 className="font-weight-bold" >4</h3>
                                </Col>
                            </Row>
                            
                            <div className="space-50" />
                            <Row className="text-center">
                                <Col md='3' lg='3'>
                                    <h3 className="font-weight-bold d-lg-none d-xl-none d-md-none" >1</h3>
                                    <img
                                        alt="Register"
                                        className="img-fluid"
                                        src={require("assets/img/howItWorks/register2.svg")}
                                    />
                                    <div className="space-25" />
                                    <h4 className="text-uppercase" >Register</h4>
                                    <p>Register to JIGSAW</p>
                                    <div className="space-25 d-lg-none d-xl-none d-md-none" />
                                    <img
                                        alt="arrow"
                                        className="d-lg-none d-xl-none d-md-none"
                                        style={{ width: 50, height: 50 }}
                                        src={require("assets/img/howItWorks/small-arrow.svg")}
                                    />
                                    <div className="space-25 d-lg-none d-xl-none d-md-none" />
                                </Col>
                                <Col md='3' lg='3'>
                                    <h3 className="font-weight-bold d-lg-none d-xl-none d-md-none" >2</h3>
                                    <img
                                        alt="Get Ticket"
                                        className="img-fluid"
                                        src={require("assets/img/howItWorks/crypto.svg")}
                                    />
                                    <div className="space-25" />
                                    <h4 className="text-uppercase" >Acquire JIGX Assets</h4>
                                    <p>Feed your wallet through Stellar</p>
                                    <div className="space-25 d-lg-none d-xl-none d-md-none" />
                                    <img
                                        alt="arrow"
                                        className="d-lg-none d-xl-none d-md-none"
                                        style={{ width: 50, height: 50 }}
                                        src={require("assets/img/howItWorks/small-arrow.svg")}
                                    />
                                    <div className="space-25 d-lg-none d-xl-none d-md-none" />
                                </Col>
                                <Col md='3' lg='3'>
                                    <h3 className="font-weight-bold d-lg-none d-xl-none d-md-none" >3</h3>
                                    <img
                                        alt="QR Code"
                                        className="img-fluid"
                                        src={require("assets/img/howItWorks/knowledge.svg")}
                                    />
                                    <div className="space-25" />
                                    <h4 className="text-uppercase" >Create Knowledge</h4>
                                    <p>Create a topic to share</p>
                                    <div className="space-25 d-lg-none d-xl-none d-md-none" />
                                    <img
                                        alt="arrow"
                                        className="d-lg-none d-xl-none d-md-none"
                                        style={{ width: 50, height: 50 }}
                                        src={require("assets/img/howItWorks/small-arrow.svg")}
                                    />
                                    <div className="space-25 d-lg-none d-xl-none d-md-none" />
                                </Col>
                                <Col md='3' lg='3'>
                                    <h3 className="font-weight-bold d-lg-none d-xl-none d-md-none" >4</h3>
                                    <img
                                        alt="Scan"
                                        className="img-fluid"
                                        src={require("assets/img/howItWorks/contribution.svg")}
                                    />
                                    <div className="space-25" />
                                    <h4 className="text-uppercase" >Read and contribute</h4>
                                    <p>Read existing knowledge and provide your valuable contribution</p>
                                    <div className="space-25 d-lg-none d-xl-none d-md-none" />
                                    <img
                                        alt="arrow"
                                        className="d-lg-none d-xl-none d-md-none"
                                        style={{ width: 50, height: 50 }}
                                        src={require("assets/img/howItWorks/small-arrow.svg")}
                                    />
                                    <div className="space-25 d-lg-none d-xl-none d-md-none" />
                                </Col>
                            </Row>

                            <div className="space-50 d-none d-lg-block" />
                            <Row className="text-center d-none d-lg-flex d-md-flex">
                                <Col md='1' lg='1' />
                                <Col md='1' lg='1'>
                                    <h3 className="font-weight-bold" >5</h3>
                                </Col>
                                <Col md='2' lg='2'>
                                    <img
                                        alt="why"
                                        className="img-fluid"
                                        src={require("assets/img/howItWorks/arrow.svg")}
                                    />
                                </Col>
                                <Col md='1' lg='1'>
                                    <h3 className="font-weight-bold" >6</h3>
                                </Col>
                                <Col md='2' lg='2'>
                                    <img
                                        alt="why"
                                        className="img-fluid"
                                        src={require("assets/img/howItWorks/arrow.svg")}
                                    />
                                </Col>
                                <Col md='1' lg='1'>
                                    <h3 className="font-weight-bold" >7</h3>
                                </Col>
                                <Col md='2' lg='2'>
                                    <img
                                        alt="why"
                                        className="img-fluid"
                                        src={require("assets/img/howItWorks/arrow.svg")}
                                    />
                                </Col>
                                <Col md='1' lg='1'>
                                    <h3 className="font-weight-bold" >8</h3>
                                </Col>
                            </Row>


                            <div className="space-50" />
                            <Row className="text-center">
                                <Col md='3' lg='3'>
                                    <h3 className="font-weight-bold d-lg-none d-xl-none d-md-none" >5</h3>
                                    <img
                                        alt="Register"
                                        className="img-fluid"
                                        src={require("assets/img/howItWorks/vote.svg")}
                                    />
                                    <div className="space-25" />
                                    <h4 className="text-uppercase" >Vote</h4>
                                    <p>Vote to contributions made to knowledge</p>
                                    <div className="space-25 d-lg-none d-xl-none d-md-none" />
                                    <img
                                        alt="arrow"
                                        className="d-lg-none d-xl-none d-md-none"
                                        style={{ width: 50, height: 50 }}
                                        src={require("assets/img/howItWorks/small-arrow.svg")}
                                    />
                                    <div className="space-25 d-lg-none d-xl-none d-md-none" />
                                </Col>
                                <Col md='3' lg='3'>
                                    <h3 className="font-weight-bold d-lg-none d-xl-none d-md-none" >6</h3>
                                    <img
                                        alt="Get Ticket"
                                        className="img-fluid"
                                        src={require("assets/img/howItWorks/crypto.svg")}
                                    />
                                    <div className="space-25" />
                                    <h4 className="text-uppercase" >Get Rewards</h4>
                                    <p>Get rewarded for your actions</p>
                                    <div className="space-25 d-lg-none d-xl-none d-md-none" />
                                    <img
                                        alt="arrow"
                                        className="d-lg-none d-xl-none d-md-none"
                                        style={{ width: 50, height: 50 }}
                                        src={require("assets/img/howItWorks/small-arrow.svg")}
                                    />
                                    <div className="space-25 d-lg-none d-xl-none d-md-none" />
                                </Col>
                                <Col md='3' lg='3'>
                                    <h3 className="font-weight-bold d-lg-none d-xl-none d-md-none" >7</h3>
                                    <img
                                        alt="QR Code"
                                        className="img-fluid"
                                        src={require("assets/img/howItWorks/certificate.svg")}
                                    />
                                    <div className="space-25" />
                                    <h4 className="text-uppercase" >Gain Reputation</h4>
                                    <p>Increase your reputation as a scholar in the community</p>
                                    <div className="space-25 d-lg-none d-xl-none d-md-none" />
                                    <img
                                        alt="arrow"
                                        className="d-lg-none d-xl-none d-md-none"
                                        style={{ width: 50, height: 50 }}
                                        src={require("assets/img/howItWorks/small-arrow.svg")}
                                    />
                                    <div className="space-25 d-lg-none d-xl-none d-md-none" />
                                </Col>
                                <Col md='3' lg='3'>
                                    <h3 className="font-weight-bold d-lg-none d-xl-none d-md-none" >8</h3>
                                    <img
                                        alt="Scan"
                                        className="img-fluid"
                                        src={require("assets/img/howItWorks/forever.svg")}
                                    />
                                    <div className="space-25" />
                                    <h4 className="text-uppercase" >Earn Forever</h4>
                                    <p>Convert gained reputation to crypto currency</p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default HowItWorks;

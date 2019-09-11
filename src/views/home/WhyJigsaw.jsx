import React from "react";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

class WhyBlockEvent extends React.Component {
    render() {
        return (
            <div className="section" id="why">
                <div className="space-50" />
                <Container>
                    <Row>
                        <Col lg='6' md='6'>
                            <div className="space-50" />
                            <img
                                alt="why"
                                className="img-fluid"
                                src={require("assets/img/favicon.ico")}
                            />
                        </Col>
                        <Col lg='6' md='6'>
                            <div className="space-50" />
                            <div>
                                <h1>Why JIGSAW?</h1>
                                <hr className="line-success" />
                            </div>


                            <div className='list-why'>
                                <ul>
                                    <li>Decentralised Knowledge sharing platform</li>
                                    <li>Using a Stellar blockchain as a medium to regulate, incentivise and track user actions.</li>
                                    <li>An On-Chain and Off-Chain Storage Model</li>
                                    <li>Track each user action in a virtual chain within stellar blockchain</li>
                                    <li>100% anonymity</li>
                                    <li>Consensus mechanism to select the knowledge</li>
                                    <li>3-5 second fast transaction</li>
                                    <li>High security, trust and transparency</li>

                                    {/* <li>On-chain ticket storage and tracking</li>
                                    <li>On-chain smart ticket verification</li>
                                    <li>100% on-chain process</li> */}
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div className="space-50" />
            </div>
        );
    }
}

export default WhyBlockEvent;

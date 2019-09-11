import React from "react";
// reactstrap components
import { Container, Row, Col, Button, InputGroup, InputGroupAddon, InputGroupText, Input,NavItem } from "reactstrap";
import Timeline from 'react-dual-timeline';
import { StyleRoot } from 'radium';


class Time extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="section" id="roadmap">
                <Container>
                    <div className="space-50" />
                    <div>
                        <h1>Roadmap</h1>
                        <hr className="line-success" />
                    </div>
                    <div className="space-50" />
                    <StyleRoot>
                        <Timeline activeColor='#1f2251'>
                            <div icon='1'><h1>Oct 2018</h1><h3>Hacktoberfest 2018 MVP named Blogchain</h3></div>
                            <div icon='2'><h1>Nov 2018 </h1><h3>Conceptualized and rebranded as Jigsaw</h3></div>
                            <div icon='3'><h1>Dec 2018 </h1><h3>Defined the distributed architecture in January 2019</h3></div>
                            <div icon='4'><h1>Jan 2019 </h1><h3>Crypto Economic Model</h3></div>
                            <div icon='5'><h1>March 2019 </h1><h3>Whitepaper <a target="_blank" href="https://firebasestorage.googleapis.com/v0/b/jigsaw-io.appspot.com/o/Jigsaw%20-%20Blockchain%20based%20decentralized%20knowledge%20sharing%20system.pdf?alt=media&token=0bf14083-3445-41d6-b7fb-152330f00866">
                                <i className="tim-icons icon-cloud-download-93" /></a></h3></div>
                            <div icon='6'><h1>June 2019 </h1><h3>Commenced development</h3></div>
                            <div icon='7'><h1>August 2019 </h1><h3>Alpha Deployment – Test net</h3></div>
                            <div icon='8'><h1>Dec 2019 </h1><h3>Bug Bounty Program launch</h3></div>
                            <div icon='9'><h1>March 2020 </h1><h3>Initial Exchange Offering release</h3></div>
                            <div icon='10'><h1>June 2020 </h1><h3>Release 1.0 – Live net</h3></div>
                        </Timeline>
                    </StyleRoot>
                </Container>
            </div>
        );

    }
}

export default Time;

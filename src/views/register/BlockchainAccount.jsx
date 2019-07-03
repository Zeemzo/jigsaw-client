import React from "react";
import ReactLoading from "react-loading";
import { Link ,withRouter} from "react-router-dom";

// reactstrap components
import {
    Button, Card, CardHeader, CardBody, CardFooter
    , Container, Row, Col, ListGroup, ListGroupItem, UncontrolledTooltip
} from "reactstrap";
import { ToastContainer, ToastStore } from 'react-toasts';

// core components
import Footer from "components/Footer/Footer.jsx";
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import * as fs from 'fs-web';

class BlockchainAccount extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            squares1to6: "",
            squares7and8: "",
        }
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
        return (
            <>
                {/* <ExamplesNavbar /> */}
                <IndexNavbar />
                <ToastContainer position={ToastContainer.POSITION.BOTTOM_RIGHT} store={ToastStore} />
                <br />
                <br />
                <br />

                <Container>
                    <Row>
                        <Col md="4">
                            <hr className="line-info" />
                            <h1>
                                A Knowledge coin{" "}
                                <span className="text-info">that fits your needs</span>
                            </h1>
                        </Col>
                    </Row><Row>
                        <Col >
                            <Card className="card-coin card-plain">
                                <CardHeader>
                                    <img
                                        alt="..."
                                        className="img-center img-fluid"
                                        src={require("assets/img/bitcoin.png")}
                                    />
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col className="text-center" md="12">
                                            <h4 className="text-uppercase">JIGX Coin</h4>
                                            <span>BUILT ON STELLAR</span><br/>
                                            <h3>This is the only time you are going to see your SECRETKEY, Keep it safe! </h3>
                                            <hr className="line-info" />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <ListGroup>
                                        
                                            {localStorage.getItem("publicKey") != null ?
                                                <ListGroupItem>Public Key: <Button onClick={e => {
                                                    this.copyMessage(localStorage.getItem("publicKey"))
                                                    ToastStore.success("Public Key Copied to Clipboard");
                                                }} id="publicKey">{localStorage.getItem("publicKey").substring(0, 20)}...</Button>
                                                </ListGroupItem> : null}
                                            {localStorage.getItem("secretKey") != null ?
                                                <ListGroupItem>Secret Key: <Button onClick={e => {
                                                    this.copyMessage(localStorage.getItem("secretKey"))
                                                    ToastStore.success("Secret Key Copied to Clipboard");
                                                }} id="secretKey">{localStorage.getItem("secretKey").substring(0, 20)}...</Button>
                                                </ListGroupItem> : null}
                                        </ListGroup>
                                        <UncontrolledTooltip placement="bottom" target="publicKey" delay={0}>Click to Copy PublicKey</UncontrolledTooltip>
                                        <UncontrolledTooltip placement="bottom" target="secretKey" delay={0}>Click to Copy SecretKey</UncontrolledTooltip>

                                    </Row>
                                </CardBody>
                                <CardFooter className="text-center">
                                    <Button className="btn-simple" color="info" onClick={e => {
                                        if (localStorage.getItem("secretKey") != null && localStorage.getItem("publicKey") != null) {

                                            var FileSaver = require('file-saver');
                                            var blob = new Blob(['PublicKey: '+ localStorage.getItem("publicKey") 
                                                + ' \nSecretKey: ' + localStorage.getItem("secretKey")], { type: "text/plain;charset=utf-8" });
                                            FileSaver.saveAs(blob, "JigsawCredentials.txt");
                                     
                                        }

                                    }}>
                                        Export to File</Button>
                                    <Link to="/" tag={Link}>
                                        <Button onClick={e => {
                                            localStorage.removeItem("secretKey");
                                            localStorage.removeItem("publicKey");
                                        }} className="btn-simple" color="info">
                                            Proceed
                                    </Button></Link>

                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <Footer />

            </>
        );
    }
}

export default withRouter(BlockchainAccount);

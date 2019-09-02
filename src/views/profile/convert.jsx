import React from "react";
import withAuthorization from "components/Authentication/Index.jsx";
import {
    Button, Card, CardHeader, CardBody, Label, FormGroup, Input, FormText, NavItem, NavLink,
    Nav, Table, TabContent, TabPane, Container, Row, Col, UncontrolledTooltip
} from "reactstrap";
import { withRouter } from 'react-router-dom';
import { ConvertXLMToJIGXUAsset } from "services/UserManagement";
import { ToastContainer, ToastStore } from 'react-toasts';
import ReactLoading from "react-loading";
import { store } from "variables/redux";

class Convert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: "",
            password: "",
            showSpinner: false,
            loadingMessage: 'something is happenning...'

        };
        this.handleChange = this.handleChange.bind(this)

    }
    componentDidMount() {
        store.subscribe(this.handleChange)

    }
    handleChange() {
        //console.log(store.getState())
        this.setState({ loadingMessage: store.getState() + '...' })
    }

    render() {
        return (
            <div>
                <ToastContainer className="toastColor" position={ToastContainer.POSITION.BOTTOM_RIGHT} store={ToastStore} />
                <div hidden={!this.state.showSpinner} id="myModal" className="modalLoad">
                    <div className="modalLoad-content" >
                        <ReactLoading className="modalLoad-content" type={"spinningBubbles"} color="#fff" />
                    </div> <h3 className="loadingMessage" style={{ "textAlign": "center" }}>{this.state.loadingMessage}</h3>

                </div>
                <h3 className="title">XLM to JIGXU</h3>
                <h4 className="title">Rate: 1 XLM = 1 JIGXU</h4>
                <Row>
                    <Label sm="3">Amount</Label>
                    <Col sm="9">
                        <FormGroup>
                            <Input placeholder="100" type="text" onChange={e => {
                                this.setState({ amount: e.target.value })
                            }} />
                            <FormText color="default" tag="span">
                                Please enter a value within Wallet limit.
                                </FormText>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Label sm="3">Passkey</Label>

                    <Col sm="9">
                        <FormGroup>
                            <Input
                                placeholder="*********"
                                type="password"
                                onChange={e => {
                                    this.setState({ password: e.target.value })
                                }}
                            />
                            <FormText color="default" tag="span">
                                Please enter your password.
                                </FormText>
                        </FormGroup>
                    </Col>

                </Row>
                <Button
                    className="btn-simple btn-icon btn-round float-right"
                    color="primary"
                    type="submit"
                    onClick={async () => {

                        this.setState({ showSpinner: true })

                        const res = await ConvertXLMToJIGXUAsset(this.state.amount, this.state.password, this.props.balance)
                        if (res != null) {
                            this.setState({ showSpinner: false })

                            switch (res.status) {
                                case 200:

                                    ToastStore.success("converted!");
                                    this.props.updateWallet();
                                    this.props.afterTransfer()
                                    break;
                                case 201:
                                    ToastStore.error("stellar did not respond!");
                                    ; break;
                                case 202:
                                    ToastStore.error("insufficient fund!");
                                    ; break;
                                case 203:
                                    ToastStore.error("invalid signers!");
                                    ; break;
                                case 204:
                                    ToastStore.error("failed!");
                                    ; break;
                                case 403:
                                    ToastStore.error("session timed out!");
                                    this.props.history.push('/login');

                                    ; break;

                            }
                            console.log(res)
                            this.setState({ amount: '', password: '' })
                        } else {
                            this.setState({ showSpinner: false })
                            ToastStore.error("failed!");

                            console.log("failed")
                        }
                    }}
                >
                    <i className="tim-icons icon-send" />
                </Button>
            </div>
        );
    }
}



const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(withRouter(Convert));

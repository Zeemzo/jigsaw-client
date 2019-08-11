import React from "react";
import withAuthorization from "components/Authentication/Index.jsx";
import {
    Button, Card, CardHeader, CardBody, Label, FormGroup, Input, FormText, NavItem, NavLink,
    Nav, Table, TabContent, TabPane, Container, Row, Col, UncontrolledTooltip
} from "reactstrap";
import { withRouter } from 'react-router-dom';
import ReactLoading from "react-loading";
import { GetAllUsers, TransferJIGXUAsset } from "services/UserManagement";
import { ToastContainer, ToastStore } from 'react-toasts';
import { store } from "variables/redux";

import SelectSearch from 'react-select-search'
const options = [
    { name: 'Swedish', value: 'sv' },
    { name: 'English', value: 'en' },
];
class Transfer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            destinationKey: '',
            amount: "",
            password: "",
            showSpinner: false,
            loadingMessage: 'something is happenning...'
        };
        this.handleChange = this.handleChange.bind(this)

    }

    async componentDidMount() {
        store.subscribe(this.handleChange)

        const res = await GetAllUsers()
        if (res != null) {
            console.log(res.data.publicKeys)
            var arr = []
            res.data.publicKeys.forEach(element => {
                if (this.props.alias != element.alias) {
                    arr.push({ name: element.alias, value: element.publicKey })
                }
            })
            this.setState({ options: arr })
        }
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
                <Row>
                    <Label sm="3">Pay to</Label>
                    <Col >

                        <SelectSearch sm="6" options={this.state.options} value={this.state.destinationKey} name="alias" placeholder="Choose a User"
                            onChange={(value, state, props) => {
                                this.setState({ destinationKey: value.value })

                            }}
                        />

                    </Col>
                </Row>
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

                        const res = await TransferJIGXUAsset(this.state.destinationKey, this.state.amount, this.state.password)
                        if (res != null) {
                            this.setState({ showSpinner: false })
                            this.props.updateWallet()
                            // switch (res.status) {
                            //     case 200:
                                    ToastStore.success("transfered!");
                            //         this.props.updateWallet(); break;
                            //     case 201:
                            //         ToastStore.error("stellar did not respond!");
                            //         ; break;
                            //     case 202:
                            //         ToastStore.error("insufficient fund!");
                            //         ; break;
                            //     case 203:
                            //         ToastStore.error("invalid signers!");
                            //         ; break;
                            //     case 204:
                            //         ToastStore.error("failed!");
                            //         ; break;
                            //     case 403:
                            //         ToastStore.error("session timed out!");
                            //         this.props.history.push('/login');

                            //         ; break;

                            // }
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

export default withAuthorization(authCondition)(withRouter(Transfer));

import React from 'react';
import { ListGroupItem, Collapse, UncontrolledTooltip, Button } from 'reactstrap';
import { DiffieHellman } from 'crypto';
import { AddVote } from '../../services/KnowledgeManagement';
import {
    Modal,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row, Col
} from "reactstrap";
import classnames from "classnames";
import { ToastContainer, ToastStore } from 'react-toasts';
import ReactLoading from "react-loading";
import { store } from "variables/redux";

class ListGroupCollapse extends React.Component {
    constructor(props) {
        super(props);


        this.toggle = this.toggle.bind(this);
        this.state = {
            collapse: this.props.collapse,
            votes: this.props.item.votes,
            showPasswordPop: false,
            demoModal: false,
            password: '',
            showSpinner: false,

            loadingMessage: 'something is happenning...'
        };
        this.handleLoadChange = this.handleLoadChange.bind(this)

    }

    componentDidMount() {
        store.subscribe(this.handleLoadChange)

    }
    toggleModal = modalState => {
        this.setState({
            [modalState]: !this.state[modalState]
        });
    };
    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    handleLoadChange() {
        //console.log(store.getState())
        this.setState({ loadingMessage: store.getState() + '...' })
    }

    render() {
        const { item, html, no, diff } = this.props;
        return (
            <ListGroupItem className="card-plain">
                <ToastContainer className="toastColor" position={ToastContainer.POSITION.BOTTOM_RIGHT} store={ToastStore} />
                <div hidden={!this.state.showSpinner} id="myModal" className="modalLoad">
                    <div className="modalLoad-content" >
                        <ReactLoading className="modalLoad-content" type={"spinningBubbles"} color="#fff" />
                    </div> <h3 className="loadingMessage" style={{ "textAlign": "center" }}>{this.state.loadingMessage}</h3>
                </div>
                <p style={{ "textAlign": "center" }}
                    onClick={this.toggle}><strong width="300px">{(item.hash).substring(0, 30) + "... By: " + item.alias}</strong>
                </p>
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
                        <h3 className="title title-up">Confirm Action</h3>

                    </div>
                    <Row>
                        <Col className="text-center" md="12">
                        <hr className="line-info" />

                            <h4>Warning!</h4>
                            <p>You will spend 1 JIGXU for this action</p>
                        </Col>
                    </Row>
                    <Form className="form">
                        <FormGroup
                        >
                            <InputGroup
                                className={classnames({
                                    "input-group-focus": this.state.passwordFocus
                                })}

                            >
                                <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="tim-icons icon-paper" />
                                    </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                    // value={this.state.txtTitle}
                                    placeholder="Password"
                                    type="password"
                                    onFocus={e => this.setState({ passwordFocus: true })}
                                    onBlur={e => {
                                        this.setState({ passwordFocus: false })
                                    }}
                                    onChange={e => {
                                        this.setState({ password: e.target.value })
                                    }}
                                />
                            </InputGroup></FormGroup>


                    </Form>
                    <div className="modal-footer">
                        <Button
                            color="danger"
                            type="button"
                            onClick={() => this.toggleModal("demoModal")}
                        >
                            Close </Button>
                        <Button color="default" type="button" onClick={async (e) => {
                            this.setState({ showSpinner: true });

                            e.preventDefault()
                            const response = await AddVote(item.kId, item.hash, this.state.password)
                            if (response != null) {
                                this.setState({ showSpinner: false });
                                this.setState({ votes: this.state.votes + 1 })
                                // //console.log(response)
                                ToastStore.success("Success");
                                // this.props.history.push(`/knowledge/${id}`);
                            }
                            else {
                                this.setState({ showSpinner: false });

                                ToastStore.error("Failed");

                            }
                            this.toggleModal("demoModal")

                        }} >Proceed
                    </Button>

                    </div>
                </Modal>
                <Collapse isOpen={this.state.collapse}>
                    <hr className="line-primary" />
                    <p dangerouslySetInnerHTML={{ __html: html }} />
                    <UncontrolledTooltip placement="bottom" target={item.alias + no} delay={0}>{item.alias + " contributed at: " + item.timestamp}</UncontrolledTooltip>
                    <i className="tim-icons icon-heart-2 iconHeart" onClick={
                        async (e) => {
                            e.preventDefault()
                            if (localStorage.getItem("secretKey")) {
                                this.setState({ showSpinner: true });

                                this.setState({ password: '' })

                                const response = await AddVote(item.kId, item.hash, this.state.password)
                                if (response != null) {
                                    this.setState({ showSpinner: false });
                                    this.setState({ votes: this.state.votes + 1 })
                                    // //console.log(response)
                                    ToastStore.success("Success");
                                    // this.props.history.push(`/knowledge/${id}`);
                                }
                                else {
                                    this.setState({ showSpinner: false });

                                    ToastStore.error("Failed");

                                }
                            } else {
                                this.setState({ demoModal: true })
                                this.toggleModal("demoModal")
                            }
                        }
                    } ></i>{this.state.votes}

                </Collapse>
            </ListGroupItem>
        );
    }
}

export default ListGroupCollapse
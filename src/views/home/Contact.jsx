import React from "react";
// reactstrap components
import { Container, Row, Col, Button, InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
import ContactButton from "components/ContactButton";
import { RecordUserMessage } from 'services/UserManagement';

class Contact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            message: '',
            focused: ""
        };
    }
    onFocus = () => {
        this.setState({
            focused: "input-group-focus"
        });
    };
    onBlur = () => {
        this.setState({
            focused: ""
        });
    };

    render() {
        return (
            <div className="section" id="contact">
                <Container className='text-center'>
                    <Row>
                        <Col lg='12' md='12'>
                            <div className="space-50" />
                            <div>
                                <h2 className='text-center'>Contact Us</h2>
                                <hr className="line-success hr-center" />
                            </div>
                            <div className='text-center'>
                                <h4>Contact us for more info.</h4>
                            </div>
                            <div className="space-50" />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg='3' md='3' />
                        <Col lg='6' md='6'>
                            <form>
                                <InputGroup className={this.state.focused}>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="tim-icons icon-email-85" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input

                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Add your email here"
                                        onChange={(e) => {
                                            this.setState({ email: e.target.value })
                                        }}
                                    />
                                </InputGroup>
                                <Input type="textarea" name="text" id="exampleText" placeholder="Add your message here" onChange={(e) => {
                                    this.setState({ message: e.target.value })
                                }} />
                            </form>
                        </Col>
                    </Row>
                    <div className="space-50" />
                    <Button color="info" onClick={(e) => {

                        RecordUserMessage(this.state.email,this.state.message)
                        document.getElementById("email").value = ""
                        document.getElementById("exampleText").value = ""
                        e.preventDefault()
                    }} >Submit</Button>
                    <div className="space-50" />
                    {/* <Row>
                        <Col lg='12' md='12' className='text-center'>
                            <ContactButton icon="twitter" url="https://www.facebook.com/jigsaw.io" />
                            <ContactButton icon="facebook" url="https://www.facebook.com/jigsaw.io" />
                            <ContactButton icon="linkedin" url="https://www.facebook.com/jigsaw.io" />
                            <ContactButton icon="slack" url="https://www.facebook.com/jigsaw.io" />
                            <ContactButton icon="youtube" url="https://www.facebook.com/jigsaw.io" />
                            <ContactButton icon="medium" url="https://www.facebook.com/jigsaw.io" />
                            <ContactButton icon="reddit" url="https://www.facebook.com/jigsaw.io" />
                            <ContactButton icon="github" url="https://www.facebook.com/jigsaw.io" />
                        </Col>
                    </Row> */}
                </Container>
            </div>
        );
    }
}

export default Contact;

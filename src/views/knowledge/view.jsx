import React from "react";
import 'react-quill/dist/quill.snow.css'; // ES6
import 'react-quill/dist/quill.bubble.css'; // ES6
import Switch from "react-bootstrap-switch";

// reactstrap components
import {
    Button, Card, CardHeader, CardBody, CardFooter, CardImg, CardTitle, Label, FormGroup, Form, Modal,
    Input, InputGroupAddon, InputGroupText, InputGroup, Container, Row, Col, Alert
} from "reactstrap";
import Footer from "components/Footer/Footer.jsx";
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import { getKnowledge } from 'services/KnowledgeManagement';
import { getUserSession } from 'services/UserManagement';

const jwt = require('jsonwebtoken');

class View extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            draft: '',
            cover: '',
            showContributions: false,
            isAuthenticated: false

        }

    }
    async componentDidMount() {
        const { id } = this.props.match.params

        console.log(id)
        const res = await getKnowledge(id)
        if (res != null) {
            console.log(res)
            this.setState(
                {
                    title: res.data.knowledge.title,
                    draft: res.data.knowledge.draft,
                    cover: res.data.knowledge.cover
                }
            )
        }

        const user = getUserSession()
        if (user != null) {
            this.setState({ isAuthenticated: true })
        }

    }




    render() {
        return (
            <div>

                <IndexNavbar />
                <section >
                    <Container><br /><br /><br />

                        <Card body >

                            {/* <Switch offColor="" offText="" onColor="" onText="" /> */}
                            {/* <br /> */}
                            {this.state.isAuthenticated ?
                                <div>
                                    <p className="category">Contributions Mode</p>
                                    <Switch onChange={e => {
                                        this.setState({ showContributions: e.state.value });
                                    }} defaultValue={this.state.showContributions} offColor="" onColor="blue" />
                                </div>

                                : null}

                            <h4 className="info-title">{this.state.title}</h4>
                            <img width="50%" src={this.state.cover}/>
                            <hr className="line-primary" />
                            <div dangerouslySetInnerHTML={{ __html: this.state.draft }} />
                        </Card>
                    </Container>
                </section>
                <Footer />

            </div>
        );

    }
}

export default View;
import React from "react";
import 'react-quill/dist/quill.snow.css'; // ES6
import 'react-quill/dist/quill.bubble.css'; // ES6
import Switch from "react-bootstrap-switch";
import { goToTop } from 'react-scrollable-anchor'

// reactstrap components
import {
    Button, Card, CardHeader, CardBody, CardFooter, CardImg, CardTitle, Label, FormGroup, Form, Modal,
    Input, InputGroupAddon, InputGroupText, InputGroup, Container, Row, Col, Alert
} from "reactstrap";
import Footer from "components/Footer/Footer.jsx";
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import { getKnowledge } from 'services/KnowledgeManagement';
import { getUserSession } from 'services/UserManagement';
import Diff from './diffViewer.jsx'
const jwt = require('jsonwebtoken');
var TDiff = require('text-diff');

class View extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            draft: '',
            cover: '',
            showContributions: false,
            isAuthenticated: false,
            textDraft: ''
        }

    }
    async componentDidMount() {
        goToTop()

        const { id } = this.props.match.params

        console.log(id)
        const res = await getKnowledge(id)
        if (res != null) {
            console.log(res)
            this.setState(
                {
                    title: res.data.knowledge.title,
                    draft: res.data.knowledge.draft,
                    cover: res.data.knowledge.cover,
                    textDraft: res.data.knowledge.textDraft
                }
            )
        }

        const user = getUserSession()
        if (user != null) {
            this.setState({ isAuthenticated: true })
        }

        var diff = new TDiff(); // options may be passed to constructor; see below
        var textDiff = diff.main(
            "I am the very model of a modern Major-General,I've information vegetable, animal, and mineral,I know the kings of England, and I quote the fights historical,From Marathon to Waterloo, in order categorical.",
            `I am the very model of a cartoon individual,My animation's comical, unusual, and whimsical,I'm quite adept at funny gags, comedic theory I have read,From wicked puns and stupid jokes to anvils that drop on your head.`); // produces diff array
        console.log(textDiff)

        diff.cleanupSemantic(textDiff)
        console.log(textDiff)
        this.setState({ textDraftDiff: diff.prettyHtml(textDiff) });

    }




    render() {
        const { textDraftDiff } = this.state;
        return (
            <div>
                {/* <meta name="description" content={this.state.title} />
                <meta property="og:title" content={this.state.title} />
                <meta property="og:url" content={"https://jigsaw.cf/knowledge/"+this.props.match.params.id} />
                <meta property="og:description" content={this.state.title} />
                <meta property="og:image" content={this.state.cover} />
                <meta property="og:type" content="article" />
                <meta property="og:locale" content="en_GB" /> */}
                <IndexNavbar />
                <section >
                    <Container><br /><br /><br /><br /><br />

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
                            <img width="100%"src={this.state.cover} />
                            <hr className="line-primary" />

                            {this.state.showContributions ?
                                <div dangerouslySetInnerHTML={{ __html: textDraftDiff }} /> :
                                <div dangerouslySetInnerHTML={{ __html: this.state.draft }} />}

                            {/* <Diff textDraft={this.state.textDraft!=''?this.state.textDraft:null}/> */}
                        </Card>
                    </Container>
                </section>
                <Footer />

            </div>
        );

    }
}

export default View;
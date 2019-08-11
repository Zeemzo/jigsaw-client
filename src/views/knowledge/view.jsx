import React from "react";
import 'react-quill/dist/quill.snow.css'; // ES6
import 'react-quill/dist/quill.bubble.css'; // ES6
import Switch from "react-bootstrap-switch";
import { goToTop } from 'react-scrollable-anchor'
import ListGroupCollapse from "views/knowledge/listGroup.jsx"
// reactstrap components
import { Link, withRouter } from 'react-router-dom';
import ReactLoading from "react-loading";
import { ToastContainer, ToastStore } from 'react-toasts';
import { store } from "variables/redux";
import { TextBlock, MediaBlock, TextRow, RectShape, RoundShape } from 'react-placeholder/lib/placeholders';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import {
    Card, Container, UncontrolledTooltip, Collapse, ListGroupItem, Button, ListGroup
} from "reactstrap";
import Footer from "components/Footer/Footer.jsx";
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import { getKnowledge, getContributions } from 'services/KnowledgeManagement';
import { getUserSession } from 'services/UserManagement';
// import Diff from './diffViewer.jsx'
// const jwt = require('jsonwebtoken');
// var TDiff = require('text-diff');
const DiffMatchPatch = require('diff-match-patch');
const dmp = new DiffMatchPatch();

function prettyHtml(diffs, alias) {
    var html = [];
    for (var x = 0; x < diffs.length; x++) {
        var op = diffs[x][0];    // Operation (insert, delete, equal)
        var data = diffs[x][1];  // Text of change.
        //   var text = data.replace(pattern_amp, '&amp;').replace(pattern_lt, '&lt;')
        //       .replace(pattern_gt, '&gt;').replace(pattern_para, '&para;<br>');
        switch (op) {
            case 1:
                html[x] = '<ins id="' + alias + '" style="background:transparent;">' + data + '</ins>';
                break;
            case -1:
                html[x] = '<del id="' + alias + '" style="background:transparent;">' + data + '</del>';
                break;
            case 0:
                html[x] = '<span style="background:transparent;">' + data + '</span>';
                break;
        }
    }
    return html.join('');
};

class View extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            draft: '',
            cover: '',
            showContributions: false,
            isAuthenticated: false,
            textDraft: '',
            showSpinner: false,
            contributions: null,
            textDraftDiff: '',
            loadingMessage: 'something is happenning...'
        }
        this.handleLoadChange = this.handleLoadChange.bind(this)

    }

    async componentDidMount() {
        store.subscribe(this.handleLoadChange)

        this.setState({ showSpinner: true });

        goToTop()

        const { id } = this.props.match.params

        //console.log(id)
        const res = await getKnowledge(id)
        if (res !== null) {
            //console.log(res)
            this.setState(
                {
                    title: res.data.knowledge.title,
                    draft: res.data.knowledge.draft,
                    cover: res.data.knowledge.cover,
                    textDraft: res.data.knowledge.textDraft
                }
            )

        }

        const res1 = await getContributions(id)
        if (res1 != null && res != null) {
            //console.log(res1)
            this.setState(
                {
                    contributions: res1.data.contributions
                }
            )

            var previousResult = this.state.draft

            if (this.state.contributions != null) {
                this.state.contributions.forEach((item, index) => {
                    if (item.votes >= 5) {
                        var diff = dmp.diff_main(item.data.previousSnapshot, item.data.draft)

                        //console.log(diff)
                        var patch = dmp.patch_make(diff)

                        var result = dmp.patch_apply(patch, previousResult)
                        //console.log(index + ": " + result[0] + "\n")
                        previousResult = result[0]
                    }

                })
                //console.log(previousResult)
                this.setState({ draft: previousResult })
            }


        }

        const user = getUserSession()
        if (user != null) {
            this.setState({ isAuthenticated: true })
        }




        this.setState({ showSpinner: false });


    }



    handleLoadChange() {
        //console.log(store.getState())
        this.setState({ loadingMessage: store.getState() + '...' })
    }

    render() {
        const { id } = this.props.match.params
        const awesomePlaceholder = (
            <div className='my-awesome-placeholder loadingView'>

                <TextBlock rows={1} color='grey' />
                <hr className="line-primary" />
                <RectShape color='grey' style={{height:"200px",width:"100%"}}/>
                <TextBlock rows={5} color='grey' />


            </div>
        );
        // const { textDraftDiff } = this.state;
        return (
            <div>
                <ToastContainer className="toastColor" position={ToastContainer.POSITION.BOTTOM_RIGHT} store={ToastStore} />
                <div hidden={!this.state.showSpinner} id="myModal" className="modalLoad">
                        <div className="modalLoad-content" >
                          <ReactLoading className="modalLoad-content" type={"spinningBubbles"} color="#fff" />
                        </div> <h3 className="loadingMessage" style={{ "textAlign": "center" }}>{this.state.loadingMessage}</h3>

                      </div>
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
                                    <p className="category">View Contributions</p>
                                    <Switch onChange={e => {
                                        this.setState({ showContributions: e.state.value });
                                    }} defaultValue={this.state.showContributions} offColor="" onColor="blue" />

                                    <Link style={{ float: "right" }} to={`/contribute/${id}`} tag={Link}><Button color="primary">Contribute</Button></Link>
                                </div>

                                : null}

                            <h4 className="info-title">{this.state.title}</h4>
                            {/* <img width="100%" alt="..." src={this.state.cover} />
                            <hr className="line-primary" /> */}

                            {this.state.showContributions ? (this.state.contributions != null ?


                                this.state.contributions.map((item, key) => {
                                    //console.log(item)
                                    let diff = dmp.diff_main(item.data.previousSnapshot, item.data.draft)

                                    var collapse = false
                                    if (key == 0) {
                                        collapse = true
                                    }
                                    dmp.diff_cleanupSemantic(diff)
                                    //console.log(diff)
                                    // const lol = (<div>
                                    //     <p dangerouslySetInnerHTML={{ __html: prettyHtml(diff, item.alias + key) }} />
                                    //     <UncontrolledTooltip placement="bottom" target={item.alias + key} delay={0}>{item.alias + " at: " + item.timestamp}</UncontrolledTooltip>
                                    // </div>
                                    // );
                                    return (
                                        <ListGroupCollapse collapse={collapse} diff={diff} key={key} no={key} item={item} html={prettyHtml(diff, item.alias + key)}>

                                        </ListGroupCollapse>

                                    )
                                })
                                : <h3>Sorry, no contributions yet!</h3>)
                                : (this.state.showSpinner ?
                                    <ReactPlaceholder ready={this.state.ready} customPlaceholder={awesomePlaceholder}>
                                    </ReactPlaceholder> : <div><img width="100%" alt="..." src={this.state.cover} />
                                        <hr className="line-primary" /> <div dangerouslySetInnerHTML={{ __html: this.state.draft }} /></div>)


                            }

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
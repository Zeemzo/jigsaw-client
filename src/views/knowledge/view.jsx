import React from "react";
import 'react-quill/dist/quill.snow.css'; // ES6
import 'react-quill/dist/quill.bubble.css'; // ES6
import Switch from "react-bootstrap-switch";
import { goToTop } from 'react-scrollable-anchor'

// reactstrap components
import {
    Card, Container
} from "reactstrap";
import Footer from "components/Footer/Footer.jsx";
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import { getKnowledge } from 'services/KnowledgeManagement';
import { getUserSession } from 'services/UserManagement';
// import Diff from './diffViewer.jsx'
// const jwt = require('jsonwebtoken');
// var TDiff = require('text-diff');
const DiffMatchPatch = require('diff-match-patch');
const dmp = new DiffMatchPatch();

function prettyHtml(diffs) {
    var html = [];
    var pattern_amp = /&/g;
    var pattern_lt = /</g;
    var pattern_gt = />/g;
    var pattern_para = /\n/g;
    for (var x = 0; x < diffs.length; x++) {
      var op = diffs[x][0];    // Operation (insert, delete, equal)
      var data = diffs[x][1];  // Text of change.
    //   var text = data.replace(pattern_amp, '&amp;').replace(pattern_lt, '&lt;')
    //       .replace(pattern_gt, '&gt;').replace(pattern_para, '&para;<br>');
      switch (op) {
        case 1:
          html[x] = '<ins style="background:transparent;">' + data + '</ins>';
          break;
        case -1:
          html[x] = '<del style="background:transparent;">' + data + '</del>';
          break;
        case 0:
          html[x] = '<span style="background:transparent;">' + data + '</span>';
          break;
      }
    }
    return html.join('');
  };
  
var genesis = "<p>Many of us treat the question what women really want as a funny mystery.</p>"
var contributions = []

contributions.push({
    alias: "azeem", publicKey: "", textDraft: "<p>Many of us treat the question what women really want as a funny mystery." +
        "If you ask a women what she wants, this is her list:</p>",
    votes: 6, previousSnapshot: genesis
})

contributions.push({
    alias: "farhan", publicKey: "", textDraft: "<p>Many of us treat the question what women really want as a funny mystery.</p>" +
        "<ol><li>To eat her Chocolate without judgement and still fit into that Zara dress on display.</li></ol>",
    votes: 7, previousSnapshot: genesis
})

contributions.push({
    alias: "sarah", publicKey: "", textDraft: "<p>Many of us treat the question what women really want as a funny mystery.</p><ol><li>To eat her Chocolate without judgement and still fit into that Zara dress on display.</li></ol>",
    votes: 5,
    previousSnapshot: "<p>Many of us treat the question what women really want as a funny mystery.</p>" +
    "<ol><li>To eat her Chocolate without judgement and still fit into that Zara dress on display.</li></ol>"
})



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
            contributions: [],
            textDraftDiff: ''
        }

    }
    async componentDidMount() {
        goToTop()

        const { id } = this.props.match.params

        console.log(id)
        const res = await getKnowledge(id)
        if (res !== null) {
            console.log(res)
            // this.setState(
            //     {
            //         title: res.data.knowledge.title,
            //         draft: res.data.knowledge.draft,
            //         cover: res.data.knowledge.cover,
            //         textDraft: res.data.knowledge.textDraft
            //     }
            // )
            this.setState(
                {
                    title: res.data.knowledge.title,
                    draft: res.data.knowledge.draft,
                    cover: res.data.knowledge.cover,
                    textDraft: genesis
                }
            )


        }

        const user = getUserSession()
        if (user !== null) {
            this.setState({ isAuthenticated: true })
        }

        // var diff = new TDiff(); // options may be passed to constructor; see below
        // var textDiff = diff.main(
        //     "I am the very model of a modern Major-General,I've information vegetable, animal, and mineral,I know the kings of England, and I quote the fights historical,From Marathon to Waterloo, in order categorical.",
        //     `I am the very model of a cartoon individual,My animation's comical, unusual, and whimsical,I'm quite adept at funny gags, comedic theory I have read,From wicked puns and stupid jokes to anvils that drop on your head.`); // produces diff array
        // console.log(textDiff)

        // diff.cleanupSemantic(textDiff)
        // console.log(textDiff)
        // this.setState({ textDraftDiff: diff.prettyHtml(textDiff) });

        this.setState({ contributions: contributions })

        var previousResult = this.state.textDraft

        this.state.contributions.forEach((item, index) => {
            if (item.votes >= 5) {
                var diff = dmp.diff_main(item.previousSnapshot, item.textDraft)

                var patch = dmp.patch_make(diff)

                var result = dmp.patch_apply(patch, previousResult)
                console.log(index + ": " + result[0] + "\n")
                previousResult = result[0]
            }



        })

        console.log(previousResult)
        this.setState({ textDraft: previousResult })
    }




    render() {
        // const { textDraftDiff } = this.state;
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
                            <img width="100%" alt="..." src={this.state.cover} />
                            <hr className="line-primary" />

                            {this.state.showContributions ?

                                this.state.contributions.map((item, key) => {
                                    console.log(item)
                                    let diff = dmp.diff_main(item.previousSnapshot, item.textDraft)

                                    // dmp.diff_cleanupSemantic(diff)
                                    console.log(diff)
                                    

                                    // var rep1 = (dmp.diff_prettyHtml(diff)).replace(/<span>/g, '')
                                    // var rep2 = rep1.replace(/<\/span>/g, '')
                                    // console.log(rep2)
                                    return (
                                        <div key={key}>{item.alias}
                                            {/* {diff.map((item1, i) => {

                                            switch (item1[0]) {
                                                case 0: return (
                                                    <p key={i} style={{color :"blue"}} dangerouslySetInnerHTML={{ __html: item1[1] }} />
                                                );
                                                case 1: return (
                                                    <p key={i} style={{color :"lime"}} dangerouslySetInnerHTML={{ __html: item1[1] }} />
                                                ); 
                                                case -1:return (
                                                    <p key={i} style={{color: "red"}} dangerouslySetInnerHTML={{ __html: item1[1] }} />
                                                ); 
                                            }

                                        })

                                        } */}


                                            <p dangerouslySetInnerHTML={{ __html: prettyHtml(diff) }} />

                                        </div>
                                    )

                                }
                                ) :
                                // <p>{this.state.textDraft}</p>
                                <div dangerouslySetInnerHTML={{ __html: this.state.textDraft }} />
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
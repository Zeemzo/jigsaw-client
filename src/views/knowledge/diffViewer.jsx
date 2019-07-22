import React from 'react';
// import ReactDiffViewer from 'react-diff-viewer';
// import Prism from 'react-prism';

var TDiff = require('text-diff');

class Diff extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            textDraft: ''
        }
        // var diff = new TDiff(); // options may be passed to constructor; see below
        // var textDiff = diff.main('text1', 'text2'); // produces diff array
        // diff.prettyHtml(textDiff); // produces a formatted HTML string

        // console.log(diff.prettyHtml(textDiff))
    }
    componentWillMount() {
        if (this.props.textDraft != null) {
            this.setState({ textDraft: this.props.textDraft })
            console.log(this.state.textDraft)
        }


    }


    render = () => {
        var diff = new TDiff(); // options may be passed to constructor; see below
        var textDiff = diff.main('text1 jgjjhh \n khkjk', 'text2'); // produces diff array
        diff.prettyHtml(textDiff);

        // produces a formatted HTML string

        // {}

        return (

            <div dangerouslySetInnerHTML={{ __html: diff.prettyHtml(textDiff) }} />
        )
    }
}

export default Diff;
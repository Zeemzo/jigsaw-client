import React from "react";
import 'react-perfect-scrollbar/dist/css/styles.css';
import classnames from "classnames";
import { ToastContainer, ToastStore } from 'react-toasts';
import ReactLoading from "react-loading";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import withAuthorization from "components/Authentication/Index.jsx";
import { withRouter } from 'react-router-dom';
import { AddKnowledge, getContributions, getKnowledge } from 'services/KnowledgeManagement';
import ImageSelectPreview from 'react-image-select-pv';

import QuillEditor from "views/contribution/QuillEditor.jsx";
import ScrollableAnchor, { goToTop } from 'react-scrollable-anchor'

import {
  Modal,
  Button,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row, Col
} from "reactstrap";


const uploaderStyle = {
  'background-color': 'black',
};

let editorHtml = ''
let txtTitle = ''

const DiffMatchPatch = require('diff-match-patch');
const dmp = new DiffMatchPatch();

class Contribution extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      editorHtml: '',
      previousSnapshot: '',
      showPasswordPop: false,
      demoModal: false,
      txtCover: '',
      password: '',
      text: '',
      textDraft: '',
      contributions: null,
      showSpinner: false

    }
    this.getChange = this.getChange.bind(this)
    this.setChange = this.setChange.bind(this)

  }
  async componentDidMount() {
    this.setState({ showSpinner: true });

    document.body.classList.toggle("index-page");
    goToTop()
    const { id } = this.props.match.params
    const res = await getKnowledge(id)
    if (res !== null) {

      console.log(res)
      this.setState(
        {
          editorHtml: res.data.knowledge.draft
        }
      )
    }
    // this.setState({ contributions: contributions })
    const res1 = await getContributions(id)
    if (res1 != null && res != null) {
      console.log(res1)
      this.setState({ showSpinner: false });

      this.setState(
        {
          contributions: res1.data.contributions
        }
      )

      var previousResult = this.state.editorHtml

      if (this.state.contributions != null) {
        this.state.contributions.forEach((item, index) => {
          if (item.votes >= 5) {
            var diff = dmp.diff_main(item.data.previousSnapshot, item.data.draft)

            var patch = dmp.patch_make(diff)

            var result = dmp.patch_apply(patch, previousResult)
            console.log(index + ": " + result[0] + "\n")
            previousResult = result[0]
          }

        })
      }

      this.setState({ editorHtml: previousResult, previousSnapshot: previousResult })


    }






    // console.log(previousResult)
  }


  componentWillUnmount() {
    document.body.classList.toggle("index-page");


  }


  toggleModal = modalState => {
    this.setState({
      [modalState]: !this.state[modalState]
    });
  };
  getChange(data, text) {
    console.log(data)
    console.log(text)

    this.setState({
      editorHtml: data,
      text: text
    })
  }

  setChange() {
    this.setState({ editorHtml: '' })
    this.setState({ txtTitle: '' })

  }

  render() {
    const { id } = this.props.match.params

    const isInvalid = this.state.editorHtml === "";
    return (
      <>
        <ToastContainer className="toastColor" position={ToastContainer.POSITION.BOTTOM_RIGHT} store={ToastStore} />
        <div hidden={!this.state.showSpinner} id="myModal" class="modalLoad">
          <div class="modalLoad-content" >
            <ReactLoading class="modalLoad-content" type={"spinningBubbles"} color="#fff" />
          </div> <h3 style={{ "textAlign": "center" }}>something is happenning...</h3>

        </div>        <IndexNavbar />


        <div className="wrapper">
          <div >
            <br /><br /><br /><br />
            <Container className="align-items-center">
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
                  <h4 className="title title-up">Confirm Action</h4>
                </div>
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
                  <Button color="default" type="button" onClick={async (e) => {
                    this.setState({ showSpinner: true });

                    e.preventDefault()
                    const Knowledge = {
                      previousSnapshot: this.state.previousSnapshot,
                      draft: this.state.editorHtml,
                      textDraft: this.state.text
                    }
                    const response = await AddKnowledge(id, Knowledge, this.state.password)
                    if (response != null) {
                      this.setState({ showSpinner: false });

                      // console.log(response)
                      ToastStore.success("Success");
                      this.props.history.push(`/knowledge/${id}`);
                    }
                    else {
                      this.setState({ showSpinner: false });

                      ToastStore.error("Failed");

                    }
                    this.toggleModal("demoModal")

                  }} >Proceed
                    </Button>
                  <Button
                    color="danger"
                    type="button"
                    onClick={() => this.toggleModal("demoModal")}
                  >
                    Close
                </Button>
                </div>
              </Modal>
              <Form className="form">

                <QuillEditor dataFunc={this.getChange} placeholder={""} setData={this.state.editorHtml} />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />

                {/* <Button className="btn-round float-right" color="info" size="lg" onClick={() => { }} type="submit" disabled={isInvalid}>
                    Save Draft
                  </Button> */}
                <Button className="btn-round float-right" color="success" size="lg" onClick={
                  async (e) => {
                    e.preventDefault()
                    if (localStorage.getItem("secretKey")) {
                      this.setState({ showSpinner: true });

                      this.setState({ password: '' })
                      const Knowledge = {
                        previousSnapshot: this.state.previousSnapshot,
                        draft: this.state.editorHtml,
                        textDraft: this.state.text
                      }
                      const response = await AddKnowledge(id, Knowledge, this.state.password)
                      if (response != null) {
                        this.setState({ showSpinner: false });

                        // console.log(response)
                        ToastStore.success("Success");
                        this.props.history.push(`/knowledge/${id}`);
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
                } type="submit" disabled={isInvalid}>
                  Publish                  </Button>
                <Button className="btn-round float-left" color="danger" size="lg" onClick={() => {
                  this.setChange()
                }} type="submit" disabled={isInvalid}>
                  Clear
                  </Button>
              </Form>

            </Container></div>


          <br />
          <br />
          <br />
          <br />
          <br />
          <br /><Footer />
        </div>
      </>
    );
  }
}

///dont mistake the displayName, it has the user role data in it.
const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(withRouter(Contribution));
// export default Contribution;

import React from "react";
import 'react-perfect-scrollbar/dist/css/styles.css';
import classnames from "classnames";
import { ToastContainer, ToastStore } from 'react-toasts';

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import withAuthorization from "components/Authentication/Index.jsx";
import { withRouter } from 'react-router-dom';
import { createKnowledge } from 'services/KnowledgeManagement';
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
class Contribution extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      editorHtml: editorHtml,
      txtTitle: txtTitle,
      noTitle: false,
      showPasswordPop: false,
      demoModal: false,
      txtCover: '',
      password: '',
      text: ''

    }
    this.getChange = this.getChange.bind(this)
    this.setChange = this.setChange.bind(this)

  }
  componentDidMount() {
    document.body.classList.toggle("index-page");
    goToTop()
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
    const isInvalid =
      this.state.txtTitle === "" || this.state.editorHtml === "";
    return (
      <>
        {/* <ToastContainer className="toastColor" position={ToastContainer.POSITION.BOTTOM_RIGHT} store={ToastStore} /> */}


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
                      e.preventDefault()

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
            <br />
          </div>
      </>
    );
  }
}

///dont mistake the displayName, it has the user role data in it.
const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(withRouter(Contribution));
// export default Contribution;

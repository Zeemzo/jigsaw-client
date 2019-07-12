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
let editorHtml = ''
let txtTitle = ''
class Contribution extends React.Component {
  constructor(props) {
    super(props)
    if (localStorage.getItem("editorHtml") && localStorage.getItem("txtTitle")) {
      editorHtml = localStorage.getItem("editorHtml")
      txtTitle = localStorage.getItem("txtTitle")
      ToastStore.success("Knowledge Retrieved from Local Draft");

    }

    this.state = {
      editorHtml: editorHtml,
      txtTitle: txtTitle,
      noTitle: false,
      showPasswordPop: false,
      demoModal: false,

      password: ''

    }
    this.getChange = this.getChange.bind(this)
    this.setChange = this.setChange.bind(this)
  }
  componentDidMount() {
    goToTop()
    document.body.classList.toggle("index-page");
  }


  componentWillUnmount() {
    document.body.classList.toggle("index-page");

    if (this.state.editorHtml !== ''
      && this.state.txtTitle !== '') {
      localStorage.setItem("editorHtml", this.state.editorHtml)
      localStorage.setItem("txtTitle", this.state.txtTitle)
      ToastStore.warning("Knowledge Drafted Locally");

    } else {
      localStorage.removeItem("editorHtml")
      localStorage.removeItem("txtTitle")
    }
  }



  toggleModal = modalState => {
    this.setState({
      [modalState]: !this.state[modalState]
    });
  };
  getChange(data) {
    console.log(data)
    this.setState({ editorHtml: data })
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
        <ToastContainer className="toastColor" position={ToastContainer.POSITION.BOTTOM_RIGHT} store={ToastStore} />

        <IndexNavbar />
        <ScrollableAnchor id={'Editor'}>

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
                    <h4 className="title title-up">Terms and Conditions</h4>
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
                    <Button color="default" type="button" onClick={async e => {
                      this.toggleModal("demoModal")
                      const Knowledge = { title: this.state.txtTitle, draft: this.state.editorHtml }
                      const response = await createKnowledge(Knowledge, this.state.password)
                      if (response != null) {
                        console.log(response)
                        ToastStore.success("Success");

                      }
                      else { 
                        ToastStore.error("Failed");

                      }
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
                  <FormGroup
                    className={this.state.noTitle ? "has-danger" : null}
                  >
                    <InputGroup
                      className={this.state.noTitle ? "has-danger" : classnames({
                        "input-group-focus": this.state.titleFocus
                      })}

                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="tim-icons icon-paper" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        value={this.state.txtTitle}
                        placeholder="Title"
                        type="text"
                        onFocus={e => this.setState({ titleFocus: true })}
                        onBlur={e => {
                          this.setState({ titleFocus: false })
                          if (this.state.txtTitle.length == 0) {
                            this.setState({ noTitle: true })
                          } else {
                            this.setState({ noTitle: false })
                          }

                        }}
                        onChange={e => {
                          this.setState({ txtTitle: e.target.value })
                          if (this.state.txtTitle.length > 0) {
                            this.setState({ noTitle: false })
                          } else {
                            this.setState({ noTitle: true })
                          }

                        }}
                      />
                    </InputGroup></FormGroup>
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
                    async () => {
                      if (localStorage.getItem("secretKey")) {
                        this.setState({ password: '' })
                        const Knowledge = { title: this.state.txtTitle, draft: this.state.editorHtml }
                        const response = await createKnowledge(Knowledge, this.state.password)
                        if (response != null) {
                          console.log(response)
                          ToastStore.success("Success");

                        }
                        else { 
                          ToastStore.error("Failed");

                        }
                      } else {
                        this.setState({ demoModal: true })
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
            <Footer />
          </div></ScrollableAnchor>

      </>
    );
  }
}

///dont mistake the displayName, it has the user role data in it.
const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(withRouter(Contribution));
// export default Contribution;

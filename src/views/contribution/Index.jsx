import React from "react";
import 'react-perfect-scrollbar/dist/css/styles.css';
import classnames from "classnames";
import { ToastContainer, ToastStore } from 'react-toasts';
import ReactLoading from "react-loading";
import { store } from "variables/redux";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import withAuthorization from "components/Authentication/Index.jsx";
import { createKnowledge, getKnowledgeList } from 'services/KnowledgeManagement';
// import ImageSelectPreview from 'react-image-select-pv';

import QuillEditor from "views/contribution/QuillEditor.jsx";
import Crop from "views/contribution/Crop.jsx";

import ScrollableAnchor, { goToTop } from 'react-scrollable-anchor'
import { Link, withRouter } from "react-router-dom";

import {Row,Col,
  Modal,
  Button,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  // Row, Col
} from "reactstrap";


// const uploaderStyle = {
//   'background-color': 'black',
// };

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
      txtCover: '',
      password: '',
      text: '',
      showSpinner: false,
      loadingMessage: 'something is happenning...',
      knowledgList: [],
      titleErrorMessage: '',
      titleOk: true,
      takenId:''
    }
    this.handleLoadChange = this.handleLoadChange.bind(this)
    this.getChange = this.getChange.bind(this)
    this.setChange = this.setChange.bind(this)
    this.getImage = this.getImage.bind(this)
  }
  async componentDidMount() {
    document.body.classList.toggle("index-page");
    goToTop()

    store.subscribe(this.handleLoadChange)

    if (this.state.editorHtml != '' && this.state.txtTitle != null)
      ToastStore.success("Knowledge Retrieved from Local Draft");

    const res = await getKnowledgeList()
    if (res != null) {
      console.log(res)
      this.setState({ knowledgList: res.data.knowledge })
    }

  }


  componentWillUnmount() {
    document.body.classList.toggle("index-page");

    if (this.state.editorHtml == ""
      && this.state.txtTitle == "") {

      // localStorage.removeItem("editorHtml")
      // localStorage.removeItem("txtTitle")
    } else {
      // localStorage.setItem("editorHtml", this.state.editorHtml)
      // localStorage.setItem("txtTitle", this.state.txtTitle)
      // ToastStore.warning("Knowledge Drafted Locally");
    }
  }

  getImage(image) {
    this.setState({ txtCover: image })
  }


  toggleModal = modalState => {
    this.setState({
      [modalState]: !this.state[modalState]
    });
  };
  getChange(data, text) {
    //console.log(data)
    //console.log(text)

    this.setState({
      editorHtml: data,
      text: text
    })
  }

  setChange() {
    this.setState({ editorHtml: '' })
    this.setState({ txtTitle: '' })

  }

  handleLoadChange() {
    //console.log(store.getState())
    this.setState({ loadingMessage: store.getState() + '...' })
  }
  render() {
    const isInvalid =
      this.state.txtTitle === "" || this.state.editorHtml === ""||!this.state.titleOk;
    return (
      <>
        <ToastContainer className="toastColor" position={ToastContainer.POSITION.BOTTOM_RIGHT} store={ToastStore} />
        <div hidden={!this.state.showSpinner} id="myModal" className="modalLoad">
          <div className="modalLoad-content" >
            <ReactLoading className="modalLoad-content" type={"spinningBubbles"} color="#fff" />
          </div> <h3 className="loadingMessage" style={{ "textAlign": "center" }}>{this.state.loadingMessage}</h3>

        </div>               <IndexNavbar />
        <ScrollableAnchor id={'Editor'}>

          <div className="wrapper">
            <div >
              <br /><br /><br /><br />        <br />

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
                  <Row>
                        <Col className="text-center" md="12">
                        <hr className="line-info" />

                            <h4>Warning!</h4>
                            <p>You will spend 5 JIGXU for this action</p>
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
                  <div className="modal-footer">  <Button
                      color="danger"
                      type="button"
                      onClick={() => this.toggleModal("demoModal")}
                    >
                      Close
                </Button>
                    <Button color="default" type="button" onClick={async (e) => {
                      e.preventDefault()
                      this.setState({ showSpinner: true });

                      this.toggleModal("demoModal")
                      const Knowledge = {
                        title: this.state.txtTitle,
                        draft: this.state.editorHtml,
                        cover: this.state.txtCover,
                        textDraft: this.state.text
                      }
                      const response = await createKnowledge(Knowledge, this.state.password)
                      if (response != null) {
                        console.log(response)
                        // localStorage.removeItem("editorHtml")
                        // localStorage.removeItem("txtTitle")

                        this.setState({ showSpinner: false });

                        ToastStore.success("Success");
                        this.props.history.push(`/knowledge/${response.data.txn}`);
                      }
                      else {
                        this.setState({ showSpinner: false });

                        ToastStore.error("Failed");
                      }
                    }} >Proceed
                    </Button>
                  
                  </div>
                </Modal>
                <Form className="form">
                  <FormGroup
                    className={this.state.noTitle || !this.state.titleOk ? "has-danger" : null}
                  >
                    <InputGroup
                      className={this.state.noTitle || !this.state.titleOk ? "has-danger" : classnames({
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
                        onFocus={e => {
                          this.setState({ titleFocus: true })
                          this.state.knowledgList.forEach(element => {
                            if (this.state.txtTitle == element.title) {
                              this.setState({ titleOk: false, titleErrorMessage: 'title already taken' })
                              return
                            }
                          })
                        }}
                        onBlur={e => {
                          this.setState({ titleFocus: false })
                          if (this.state.txtTitle.length == 0) {
                            this.setState({ noTitle: true })
                          } else {
                            this.setState({ noTitle: false })
                          }

                          this.state.knowledgList.forEach(element => {
                            if (e.target.value == element.title) {
                              this.setState({ titleOk: false, titleErrorMessage: 'title is already taken',takenId:element.id })
                              return
                            }
                          })

                        }}
                        onChange={e => {
                          this.setState({ titleOk: true })

                          this.setState({ txtTitle: e.target.value })
                          if (e.target.value.length == 0) {
                            this.setState({ noTitle: true })
                          } else {
                            this.setState({ noTitle: false })
                          }


                          this.state.knowledgList.forEach(element => {
                            if (e.target.value == element.title) {
                              this.setState({ titleOk: false, titleErrorMessage: 'title is already taken',takenId:element.id })
                              return
                            }
                          })

                        }}
                      />
                      {/* <ImageSelectPreview
                        componentLabel="Cover Photo"
                        buttonText="Select An Image"
                        style={uploaderStyle}
                        imageStyle={uploaderStyle}
                        max={1}
                        maxImageSize="204800"
                        onChange={data => {
                          //console.log(data)
                          this.setState({ txtCover: data[0].content })
                        }}

                      /> */}
                    </InputGroup>
                    {!this.state.titleOk ? <><p style={{ color: "red" }}>{this.state.titleErrorMessage}</p><Link to={`/knowledge/${this.state.takenId}`} tag={Link}>
                          Click to view and contribute to existing Knowledge
                  </Link></> : null}
                  </FormGroup>

                  <Crop imageAlt="cover pic" getImage={this.getImage}></Crop>


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
                          title: this.state.txtTitle,
                          draft: this.state.editorHtml,
                          cover: this.state.txtCover,
                          textDraft: this.state.text
                        }
                        const response = await createKnowledge(Knowledge, this.state.password)
                        if (response != null) {
                          // //console.log(response)
                          // localStorage.removeItem("editorHtml")
                          // localStorage.removeItem("txtTitle")
                          this.setState({ showSpinner: false });

                          ToastStore.success("Success");
                          this.props.history.push(`/knowledge/${response.data.txn}`);

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

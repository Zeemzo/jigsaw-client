import React from "react";
import FilterResults from 'react-filter-search';
import {
  // Button,
  Card,
  CardBody,
  Container,
  Row, Input, InputGroupAddon, InputGroupText, InputGroup,
  Col,
} from "reactstrap";
import classnames from "classnames";
import { Link, withRouter } from 'react-router-dom';
import ReactLoading from "react-loading";
import { store } from "variables/redux";
// core components
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import ScrollableAnchor, { goToTop } from 'react-scrollable-anchor'
import { findKnowledge } from 'services/KnowledgeManagement';
import { TextBlock, MediaBlock, TextRow, RectShape, RoundShape } from 'react-placeholder/lib/placeholders';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
;
class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      covers: null,
      value: '',
      showSpinner: false,
      loadingMessage: 'something is happenning...'

    };
    //console.log(this.props.location)
    this.handleLoadChange = this.handleLoadChange.bind(this)

  }

  handleChange = event => {
    const { value } = event.target;
    this.setState({ value });
  };

  async componentDidMount() {
    document.body.classList.toggle("index-page");
    goToTop()
    store.subscribe(this.handleLoadChange)
    this.setState({ showSpinner: true });

    // console.log(this.props.location.search)

    const { key } = this.props.match.params
    if (key == " ") {
      this.setState({ value: "" });

    } else {
      this.setState({ value: key });

    }


    const res = await findKnowledge()
    if (res != null) {
      console.log(res)
      var arrayData = []
      var objectImage = {}

      res.data.knowledge.forEach((element) => {
        arrayData.push(
          {
            id: element.id,
            title: element.title,
            alias: element.alias,
            publicKey: element.publicKey

          }
        )
        objectImage[element.id] = element.cover

      })
      this.setState({ data: arrayData, covers: objectImage })
      this.setState({ showSpinner: false });

    }

  }


  // async componentDidUpdate() {
  //   const { key } = this.props.match.params
  //     this.setState({ value:key });
  // }

  handleLoadChange() {
    //console.log(store.getState())
    this.setState({ loadingMessage: store.getState() + '...' })
  }
  componentWillUnmount() {
    document.body.classList.toggle("index-page");

  }
  render() {
    const awesomePlaceholder = (
      <div className='my-awesome-placeholder'>
        <Row className="row-grid justify-content-center">
          {[0, 1, 2, 3, 4, 5, 6, 7].map(i =>
            <Col key={i} lg="3">
              <Card className="loadingCard">
                <CardBody>
                  <TextBlock rows={1} color='grey' />
                  <hr className="line-primary" />
                  <RectShape color='grey' />
                </CardBody></Card>
            </Col>
          )}

        </Row>
      </div>
    );
    return (
      <>
        <IndexNavbar />
        <div className="wrapper">
          <ScrollableAnchor>
            <section className="section section-lg">
              <Container><br /><br /><br />
                <InputGroup
                  className={classnames({
                    "input-group-focus": this.state.fullNameFocus
                  })}
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="tim-icons icon-zoom-split" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Search Knowledge"
                    type="text"
                    value={this.state.value}
                    onFocus={e => this.setState({ fullNameFocus: true })}
                    onBlur={e => this.setState({ fullNameFocus: false })}
                    onChange={this.handleChange}
                  />
                </InputGroup>

                {/* 
                <div hidden={!this.state.showSpinner} id="myModal" className="modalLoad">
                        <div className="modalLoad-content" >
                          <ReactLoading className="modalLoad-content" type={"spinningBubbles"} color="#fff" />
                        </div> <h3 className="loadingMessage" style={{ "textAlign": "center" }}>{this.state.loadingMessage}</h3>

                      </div> */}
                <Row className="justify-content-center">
                  <Col lg="12">
                    {this.state.data != null ?
                      <FilterResults
                        value={this.state.value}
                        data={this.state.data}
                        renderResults={results => (
                          <Row className="row-grid justify-content-center">
                            {results.map(el => (
                              <Col lg="3" key={el.id}>
                                <Link to={`/knowledge/${el.id}`} tag={Link}>

                                  <Card className="articleCard">
                                    <CardBody>
                                      <h4 className="info-title">{el.title}</h4>
                                      <hr className="line-primary" />
                                      <img width="100%" alt="cover"
                                        className="img-fluid rounded shadow" src={this.state.covers[el.id]} />
                                      {/* <p dangerouslySetInnerHTML={{ __html: el.draft }} /> */}
                                      by: {el.alias}
                                    </CardBody>
                                    {/* <div>
                                      <Link to={`/knowledge/${el.id}`} tag={Link}>
                                        <Button className="expandButton" color="primary" >View</Button></Link>
                                    </div> */}
                                  </Card> </Link>
                              </Col>
                            ))}
                          </Row>
                        )}
                      />
                      : <div>
                        <Row className="justify-content-center">
                          <Col lg="12">
                            <ReactPlaceholder ready={!this.state.showSpinner == true && this.state.data == null ? true : false} customPlaceholder={awesomePlaceholder}>{""}
                            </ReactPlaceholder>
                          </Col></Row>
                        <div hidden={!this.state.showSpinner} id="myModal" className="modalLoad">
                          <div className="modalLoad-content" >
                            <ReactLoading className="modalLoad-content" type={"spinningBubbles"} color="#fff" />
                          </div> <h3 className="loadingMessage" style={{ "textAlign": "center" }}>{this.state.loadingMessage}</h3>

                        </div></div>
                    }

                  </Col>
                </Row>
              </Container>
            </section>
          </ScrollableAnchor>

          <Footer />
        </div>
      </>
    );
  }
}

export default withRouter(Feed);

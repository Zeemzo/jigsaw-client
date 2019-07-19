import React from "react";
import FilterResults from 'react-filter-search';
import {
  Button,
  Card,
  CardBody,
  Container,
  Row, Input, InputGroupAddon, InputGroupText, InputGroup,
  Col,Media
} from "reactstrap";
import classnames from "classnames";
import { Link, withRouter } from 'react-router-dom';

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ScrollableAnchor, { goToTop } from 'react-scrollable-anchor'
import { findKnowledge } from 'services/KnowledgeManagement';


class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: ''
    };
    console.log(this.props.location)
  }

  handleChange = event => {
    const { value } = event.target;
    this.setState({ value });
  };

  async componentDidMount() {
    document.body.classList.toggle("index-page");
    goToTop()

    const res = await findKnowledge()
    if (res != null) {
      console.log(res)
      this.setState({ data: res.data.knowledge })
    }

  }
  componentWillUnmount() {
    document.body.classList.toggle("index-page");

  }
  render() {
    return (
      <>
        <IndexNavbar />
        <div className="wrapper">
          <ScrollableAnchor id={'Home'}>
            <div className="page-header header-filter">
              <div className="squares square1" />
              <div className="squares square2" />
              <div className="squares square3" />
              <div className="squares square4" />
              <div className="squares square5" />
              <div className="squares square6" />
              <div className="squares square7" />
              <Container>
                <div className="content-center brand">
                  <h1 className="h1-seo">JIGSAW</h1>
                  <h3 className="d-none d-sm-block">
                    Blockchain Based Knowledge Sharing and Organizing.</h3>
                </div>
              </Container>
            </div></ScrollableAnchor>
          <ScrollableAnchor id={'findKnowledge'}>
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
                    placeholder="Find Knowledge"
                    type="text"
                    value={this.state.value}
                    onFocus={e => this.setState({ fullNameFocus: true })}
                    onBlur={e => this.setState({ fullNameFocus: false })}
                    onChange={this.handleChange}
                  />
                </InputGroup>
                <Row className="justify-content-center">
                  <Col lg="12">
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
                                  <img width="100%"
                                    className="img-fluid rounded shadow" src={el.cover}/>
                                  {/* <p dangerouslySetInnerHTML={{ __html: el.draft }} /> */}
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

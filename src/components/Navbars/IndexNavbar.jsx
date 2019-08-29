import React from "react";
import { Link, withRouter } from "react-router-dom";
// import { Route } from 'react-router';
import classnames from "classnames";
import { getUserSession } from "services/UserManagement";

// reactstrap components
import {
  Button, UncontrolledPopover,
  PopoverBody,
  PopoverHeader, UncontrolledTooltip, Tooltip, Collapse, FormGroup, Input, Form,
  NavbarBrand, Navbar, NavItem, NavLink, Nav, Container, Row, Col, DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from "reactstrap";
import Switch from "react-bootstrap-switch";

class ComponentsNavbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      color: "navbar-transparent",
      // options: options,
      key: "",
      isPublicNetwork: false,
      alias: ""

    };
    //console.log(this.props.location.pathname)
  }
  componentDidMount() {
    window.addEventListener("scroll", this.changeColor);
    const user = getUserSession()

    if (user != null) {
      this.setState({ alias: user.alias })
    }
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.changeColor);
  }
  changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      this.setState({
        color: "bg-info"
      });
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      this.setState({
        color: "navbar-transparent"
      });
    }
  };
  toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  onCollapseExiting = () => {
    this.setState({
      collapseOut: "collapsing-out"
    });
  };
  onCollapseExited = () => {
    this.setState({
      collapseOut: ""
    });
  };
  scrollToDownload = () => {
    document
      .getElementById("download-section")
      .scrollIntoView({ behavior: "smooth" });
  };
  render() {
    return (
      <Navbar
        className={"fixed-top " + this.state.color}
        color-on-scroll="100"
        expand="lg"
      >
        <Container>
          <div className="navbar-translate">

            <NavbarBrand
              data-placement="bottom"
              to="/"
              title="Blockchain Based Blogging"
              tag={Link}
            >
              {/* <div className="logo">

                <img src={require("assets/img/favicon.ico")} alt="logo" height={50} />
                <h3 style={{ marginTop: 10, marginLeft: 5, marginBottom: 0 }}>JIGSAW</h3>
              </div> */}
              <span>JIGSAW</span>

            </NavbarBrand><div id="network">
              <Switch width="150px" onChange={e => {
                // alert(e.state.value)
              }} defaultValue={false} value={this.state.isPublicNetwork} offColor="" onColor="" onText="Public" offText="Test" >net</Switch>
            </div>
            <UncontrolledTooltip placement="bottom" target="network" delay={0}>
              PublicNet is Coming Soon</UncontrolledTooltip>
            {/* <span>JIGSAW</span> */}


            <button
              aria-expanded={this.state.collapseOpen}
              className="navbar-toggler navbar-toggler"
              onClick={this.toggleCollapse}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <Collapse
            className={"justify-content-end " + this.state.collapseOut}
            navbar
            isOpen={this.state.collapseOpen}
            onExiting={this.onCollapseExiting}
            onExited={this.onCollapseExited}
          >
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/" tag={Link}>
                    JIGSAW
                  </Link>
                </Col>
                <Col className="collapse-close text-right" xs="6">
                  <button
                    aria-expanded={this.state.collapseOpen}
                    className="navbar-toggler"
                    onClick={this.toggleCollapse}
                  >
                    <i className="tim-icons icon-simple-remove" />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav navbar className="justify-content-left">
              <NavItem>
                {this.props.location.pathname === "/" ? <a href="#Home"><NavLink
                >Home
              </NavLink></a> :
                  <NavLink
                    to="/#Home" tag={Link}
                  >Home
              </NavLink>}
              </NavItem>
              <NavItem>
                {this.props.location.pathname === "/" ? <a href="#why"><NavLink
                >Why
              </NavLink></a> :
                  <NavLink
                    to="/#why" tag={Link}
                  >Why
              </NavLink>}
              </NavItem>
              <NavItem>
                {this.props.location.pathname === "/" ? <a href="#how"><NavLink
                >How
              </NavLink></a> :
                  <NavLink
                    to="/#how" tag={Link}
                  >How
              </NavLink>}
              </NavItem>
              <NavItem>
                <NavLink to="/wallet" tag={Link}>
                  Wallet
                  </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/create/#Editor" tag={Link}>
                  Create
                  </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/explore/ " tag={Link}>
                  Explore
                  </NavLink>
              </NavItem>
              <NavItem>
                {this.props.location.pathname === "/" ? <a href="#contact"><NavLink
                >Contact
              </NavLink></a> :
                  <NavLink
                    to="/#contact" tag={Link}
                  >Contact
              </NavLink>}
              </NavItem>
              {/* <NavItem>{this.props.location.pathname === "/" ? <a href="#findKnowledge"><NavLink>Find Knowledge
                   </NavLink> </a> : <NavLink
                  to="/#findKnowledge" tag={Link}
                >Find Knowledge
              </NavLink>}
              </NavItem> */}

              {/* <UncontrolledDropdown nav>
                <DropdownToggle
                  aria-expanded={false}
                  aria-haspopup={true}
                  caret
                  color="default"
                  data-toggle="dropdown"
                  href="#pablo"
                  id="navbarDropdownMenuLink"
                  nav
                  onClick={e => e.preventDefault()}
                >
                  Explore
                   </DropdownToggle>
                <DropdownMenu style={{ background: "#242c45" ,color:"#ffffff"}} >
                  <DropdownItem >
                    <NavItem >
                      {this.props.location.pathname === "/" ? <a href="#why"><NavLink
                      >Why</NavLink></a> :
                        <NavLink
                          to="/#why" tag={Link}
                        >Why</NavLink>}
                    </NavItem>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}

            </Nav>

            {/* <SelectSearch sm="6" 
            options={this.state.options} 
            value={this.state.destinationKey} 
            name="key" 
            placeholder="Search Something"
              onChange={(value, state, props) => {
                this.setState({ key: value.value })
                console.log(value.value)
              }}
              
            />  */}
            {this.props.location.pathname ? ((this.props.location.pathname.split("/"))[1] != "explore" ?


              <Form className="form-inline ml-auto" onSubmit={(e) => {

                // console.log(e.key)
                // console.log(this.state.key)

                this.props.history.push(`/explore/${this.state.key}`);
                e.preventDefault()

              }}>
                <FormGroup className="no-border">
                  <Input placeholder="Search Knowledge" type="text"

                    onChange={(e) => {
                      // console.log(e.target.value)
                      this.setState({ key: e.target.value })
                    }}

                  />
                </FormGroup>
              </Form>


              : null) : null}

            <Nav>{
              localStorage.getItem("token") != null ?

                // <NavItem><NavLink to="/" tag={Link}>
                //   <Button onClick={e => {
                //     localStorage.removeItem("token");
                //   }}>Logout</Button>
                // </NavLink></NavItem>

                <NavItem>
                  <img id="userImage"
                    width="50px"
                    alt="..."
                    className="img-center img-fluid rounded-circle"
                    src={require("assets/img/nightking.jpeg")}
                  />
                  <UncontrolledPopover placement="bottom" target="userImage">
                    <PopoverHeader>{this.state.alias.toUpperCase()}</PopoverHeader>
                    <PopoverBody>
                      <NavLink to="/" tag={Link}>
                        <Button onClick={e => {
                          localStorage.removeItem("token");
                        }}>Logout</Button>
                      </NavLink>
                    </PopoverBody>
                  </UncontrolledPopover>

                </NavItem>
                : <NavItem><NavLink to="/login" tag={Link}>
                  <Button onClick={e => {
                    localStorage.removeItem("token");
                  }}>Login</Button>
                </NavLink></NavItem>

            }

            </Nav>

            <Nav>

            </Nav>

          </Collapse>

        </Container>

      </Navbar >
    );
  }
}

export default withRouter(ComponentsNavbar);

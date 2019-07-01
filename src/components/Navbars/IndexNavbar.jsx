import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button, Collapse, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown,
  NavbarBrand, Navbar, NavItem, NavLink, Nav, Container, Row, Col
} from "reactstrap";

class ComponentsNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      color: "navbar-transparent"
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.changeColor);
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
              <span>JIGSAW</span>
            </NavbarBrand>
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
            <Nav navbar>
              <NavItem>
                <NavLink to="/" tag={Link}>
                  Home
                  </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/profile" tag={Link}>
                  Profile
                  </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/contribution-page" tag={Link}>
                  Write
                  </NavLink>
              </NavItem>

              {
                localStorage.getItem("token") != null ? <NavItem><NavLink to="/" tag={Link}>
                  <Button onClick={e => {
                    localStorage.removeItem("token");
                  }}>Logout</Button>
                </NavLink></NavItem> : <NavItem><NavLink to="/login" tag={Link}>
                  <Button onClick={e => {
                    localStorage.removeItem("token");
                  }}>Login</Button>
                </NavLink></NavItem>

              }
            </Nav>
          </Collapse>
        </Container>
      </Navbar >
    );
  }
}

export default ComponentsNavbar;

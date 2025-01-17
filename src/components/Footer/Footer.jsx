import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Container>
          <Row>
            <Col md="3">
              <h1 className="title">JIGSAW</h1>
            </Col>
            <Col md="3">
              <Nav>
                <NavItem>
                  <NavLink to="/" tag={Link}>
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/register" tag={Link}>
                    Register
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/profile" tag={Link}>
                    Profile
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
            <Col md="3">
              <Nav>
                <NavItem>
                  <NavLink href="https://github.com/Zeemzo">
                    Contact Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://github.com/Zeemzo">
                    About Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://github.com/Zeemzo">
                    Blog
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://opensource.org/licenses/MIT">
                    License
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
            {/* <Col md="3">
              <h3 className="title">Follow us:</h3>
              <div className="btn-wrapper profile">
            
                <Button
                  className="btn-icon btn-neutral btn-round btn-simple"
                  color="default"
                  href="https://www.facebook.com/azeemashraff"
                  id="tooltip230450801"
                  target="_blank"
                >
                  <i className="fab fa-facebook-square" />
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip230450801">
                  Join us
                </UncontrolledTooltip>
              </div>
            </Col> */}
          </Row>
        </Container>
      </footer>
    );
  }
}

export default Footer;

import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ReactTooltip from "react-tooltip";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faCopy } from "@fortawesome/free-solid-svg-icons";

const Header = (props) => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="mb-3"
    >
      <Navbar.Brand>
        <FontAwesomeIcon className="mr-2" icon={faGraduationCap} />
        Diplomas DApp
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Nav className="mr-auto">
          <NavDropdown title="Actions" id="collasible-nav-dropdown">
            <NavDropdown.Item>
              <Link to="/" className="header_links_menu">
                Create Diploma
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/get_diploma" className="header_links_menu">
                Get Diploma
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/invalidate_diploma" className="header_links_menu">
                Invalidate Diploma
              </Link>
            </NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title="Validations" id="collasible-nav-dropdown">
            <NavDropdown.Item>
              <Link to="/validate" className="header_links_menu">
                Validate Diploma
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link to="/pof" className="header_links_menu">
                Proof of existence
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <CopyToClipboard text={props.accounts}>
          <Navbar.Text data-tip="Click to copy">
            Signed in as: <span className="text-white">{props.accounts}</span>{" "}
            <FontAwesomeIcon className="mr-2" icon={faCopy} />
            <ReactTooltip />
          </Navbar.Text>
        </CopyToClipboard>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Header;

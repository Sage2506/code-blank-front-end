import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

export class Layout extends Component {


  componentDidMount = () => {
  }

  render() {
      return (
        <div>
          <header className="sticky-top" >
            <Navbar bg="primary" variant="dark" >
              <Nav className="mr-auto">
                <NavItem><LinkContainer to="/"><Nav.Link ><p>Home</p></Nav.Link></LinkContainer></NavItem>
              </Nav>
            </Navbar>
          </header>
            {this.props.children}
        </div>
      );
    }
}

const mapStateToProps = store => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout)

import React, { Component } from 'react';
import { Router, Route } from "react-router-dom";
import { connect } from 'react-redux';
import ProspectsIndex from './components/prospects';

export class Router extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" Component={ProspectsIndex} />
      </Routes>
    );
  }
}

const mapStateToProps = (store) => ({
})

export default connect(mapStateToProps, null)(Router);

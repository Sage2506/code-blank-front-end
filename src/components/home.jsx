import React,{ Component } from 'react';
import { connect } from 'react-redux';

export class Home extends Component {

  render (  ) {
    return(
    <div>
      Home Works!
    </div>
    );
  }
}

const mapStateToProps = store => ({
})

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(Home)
import React,{ Component } from 'react';
import { connect } from 'react-redux';

export class ProspectRow extends Component {

  render (  ) {
    let { selectedProspect, prospect } = this.props
    let { id, name, middle_name, last_name, phone_number } = this.props.prospect
    return(
    <tr onClick={() => selectedProspect(prospect)}>
      <td>{id+" " +name + " " +middle_name+ " " + last_name }</td>
      <td>{phone_number}</td>
      <td>Actions</td>
    </tr>
    );
  }
}

const mapStateToProps = store => ({
})

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(ProspectRow)
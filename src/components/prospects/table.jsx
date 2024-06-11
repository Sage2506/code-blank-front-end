import React,{ Component } from 'react';
import { Table} from "react-bootstrap";
import { connect } from 'react-redux';
import ProspectRow from './row';
export class ProspectTable extends Component {

  render ( ) {
    let { prospects, selectedProspect } = this.props;
    return(
    <div>
      <Table>
        <thead>
          <tr>
            <th>name</th>
            <th>phone number</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {prospects.map( (prospect, position ) =>
          <ProspectRow key={"prospect_"+prospect.id} prospect={prospect} selectedProspect={selectedProspect} ></ProspectRow>)}
        </tbody>
      </Table>
    </div>
    );
  }
}

const mapStateToProps = store => ({
  prospects : store.prospectReducer.prospects
})

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect( mapStateToProps, mapDispatchToProps)(ProspectTable)
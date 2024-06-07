import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProspects,postProspect, putProspect } from '../../services/prospect_request';
import ProspectTable from './table';
import { default as Pagination } from '../common/pagination';
import ProspectModalForm from './modalForm';

export class ProspectsIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prospect: { name: ""},
      showModal: false
    }
  }

  componentDidMount() {
    this.props.getProspects();
  }

  componentDidUpdate(){
    if(!!this.props.prospect.id){
      let { pagination, getProspects } = this.props
      getProspects({page: pagination.currentPage});
    }
  }

  selectedProspect = prospect => {
    this.setState({prospect, showModal: true})
  }

  handleInputChange = e => {
    this.setState({
      prospect: {
        ...this.state.prospect,
        [e.target.id] : e.target.value
      }
    })
  }

  close = () => {
    this.setState({showModal: false})
  }

  submit = () => {
    this.setState({showModal:false})
    if(this.state.prospect.id){
      this.props.putProspect(this.state.prospect.id, this.state.prospect);
    } else {
      this.props.postProspect(this.state.prospect);
    }

  }
  render() {
    let { pagination, getProspects } = this.props;
    return (
      <div>
        <ProspectModalForm
        showModal={this.state.showModal}
        prospect={this.state.prospect}
        handleInputChange={this.handleInputChange}
        submit={this.submit}
        close={this.close}/>

        <ProspectTable selectedProspect={this.selectedProspect} />
        <Pagination pagination={pagination} paginationRequest={getProspects} />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  pagination: store.prospectReducer.pagination,
  prospect: store.prospectReducer.prospect,
})

const mapDispatchToProps = dispatch => {
  return {
    getProspects: params => {
      dispatch(getProspects(params))
    },
    putProspect : (id,data) => {
      dispatch(putProspect({id, data}))
    },
    postProspect : data => {
      dispatch(postProspect(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProspectsIndex)
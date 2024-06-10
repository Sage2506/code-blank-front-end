import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProspects, postProspect, putProspect } from '../../services/prospect_request';
import { Button } from 'react-bootstrap';
import ProspectTable from './table';
import { default as Pagination } from '../common/pagination';
import ProspectModalForm from './modalForm';
import axios from "axios";
export class ProspectsIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prospect: {},
      showModal: false,
      attachments: []
    }
  }

  componentDidMount() {
    this.props.getProspects();
  }

  componentDidUpdate() {
    if (!!this.props.prospect.name) {
      if (!this.props.prospect.file && this.state.attachments && this.state.attachments.length > 0) {
        this.uploadFiles()
      }
    }
  }

  selectedProspect = prospect => {
    this.setState({ prospect, showModal: true })
  }

  openFormModal = () => {
    this.setState({ showModal: true, prospect: {} });
  }

  handleInputChange = e => {
    if (e.target.id === "attachment") {
      const file = e.target.files[0];
      const fileName = e.target.files[0].name;
      this.setState({
        prospect: { ...this.state.prospect, attachment: file, attachment_name: fileName }
      })
    } else {
      this.setState({
        prospect: { ...this.state.prospect, [e.target.id]: e.target.value }
      })
    }
  }

  close = () => {
    this.setState({ showModal: false, attachments: [] })
  }

  submit = (attachments) => {
    this.setState({ showModal: false, attachments })
    if (this.state.prospect.id) {
      this.props.putProspect(this.state.prospect.id, this.state.prospect);
    } else {
      this.props.postProspect(this.state.prospect);
    }
  }

  uploadFiles = () => {
    let promises = [];
    this.state.attachments.forEach(attachment => {
      if (attachment.attachment_name.length > 0) {
        promises.push(this.createFilePromise(attachment))
      }
    });
    Promise.all(promises).then(results => {
      this.setState({ prospect: {}, showModal: false, attachments: [] })
      this.props.getProspects({ page: 1 });
    })
  }

  createFilePromise = attachment => {
    const data = new FormData();
    data.append('file', attachment.attachment, attachment.attachment_name);
    data.append('prospect_id', this.props.prospect.id);
    return axios.post('http://localhost:4200/files', data);
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
          close={this.close} />
        <Button onClick={() => this.openFormModal()}>Nuevo prospecto</Button>
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
    putProspect: (id, data) => {
      dispatch(putProspect({ id, data }))
    },
    postProspect: data => {
      dispatch(postProspect(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProspectsIndex)
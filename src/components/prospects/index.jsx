import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProspects, postProspect, putProspect } from '../../services/prospect_request';
import { Button } from 'react-bootstrap';
import ProspectTable from './table';
import { default as Pagination } from '../common/pagination';
import ProspectModalForm from './modalForm';
import api from "../../services/codeblank_api";


const emptyProspect = {
  name: "",
  middle_name: "",
  last_name: "",
  street: "",
  ext_number: "",
  neighborhood: "",
  zip_code: "",
  phone_number: "",
  rfc: "",
  rejection_reason: "",
  files: [],
  status: 0
}
export class ProspectsIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prospect: emptyProspect,
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
      } else {
        this.props.getProspects({ page: 1 });
      }
    }
  }

  selectedProspect = prospect => {
    this.setState({
      prospect: { ...prospect, statusReadOnly: prospect.status !== 0 },
      showModal: true
    })
  }

  openFormModal = () => {
    this.setState({ showModal: true, prospect: emptyProspect });
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
    return api.post('files', data);

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
        <div className="container text-end">
          <Button onClick={() => this.openFormModal()} className="mb-3 mt-3 mr-0 capitalize btn-success">nuevo prospecto</Button>
        </div>
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
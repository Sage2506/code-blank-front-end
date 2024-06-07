import React, { Component } from 'react';
import { Pagination } from "react-bootstrap";


export class CustomPagination extends Component {
  render() {
    let {paginationRequest, pagination} = this.props;
    let { pages } = pagination;
    return (
      <Pagination size="lg">

        {Array.from({length: pages}, (_, i) => i + 1).map( page =>
          <Pagination.Item
            key = {page}
            active={parseInt(page) === page}
            onClick = { () => paginationRequest({page})}          >
            {page}
          </Pagination.Item>
        )}
      </Pagination>
    );
  }
}

export default CustomPagination;
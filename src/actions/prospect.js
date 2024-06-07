export const GET_PROSPECT = 'GET_PROSPECT';
export const GET_PROSPECTS = 'GET_PROSPECTS';
export const ADD_PROSPECT = 'ADD_PROSPECT';

export const setProspect = data => ({
  type: GET_PROSPECT,
  prospect: data,
});

export const addProspect = data => ({
  type: ADD_PROSPECT,
  prospect: data,
});

export const setProspectsAndPagination = (data, pagination) => {
  return {
    type: GET_PROSPECTS,
    prospects: data,
    pagination,
  }
}
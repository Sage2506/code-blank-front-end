
import { GET_PROSPECT, GET_PROSPECTS, ADD_PROSPECT} from "../actions/prospect";

const initialProspectState = {
  prospects: [],
  prospect: {},
  pagination: {
    pages: [],
    currentPage: 1,
    count: 0
  }
}
export const prospectReducer = ( state = initialProspectState, action ) => {
  switch (action.type) {
    case GET_PROSPECTS:
      return {...state, prospects: action.prospects, pagination: action.pagination, prospect:{}};
    case GET_PROSPECT:
      return {...state, prospect: action.prospect}
    case ADD_PROSPECT:
      return {...state, newProspect: action.prospect}
    default:
      return state;
  }
}
export default prospectReducer;
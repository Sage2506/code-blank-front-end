import { setProspectsAndPagination, setProspect } from "../actions/prospect"
import { getAndDispatch, postAndDispatch, putAndDispatch } from "./common_requests";

const path = 'prospects'

export const getProspects = (params = { page: 1}) => getAndDispatch({ path, action: setProspectsAndPagination, params})

export const putProspect = params => putAndDispatch({ path, action: setProspect, ...params})

export const postProspect = data => postAndDispatch({ path, action: setProspect, data})

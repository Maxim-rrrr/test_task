import { combineReducers } from 'redux'

import { getPosts } from './getPosts'
import { getComments } from './getComments'
import { getUsers } from './getUsers'


const rootReducer = combineReducers({
  getPosts,
  getComments,
  getUsers
});

export default rootReducer;
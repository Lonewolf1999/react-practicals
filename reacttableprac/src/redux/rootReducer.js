import { combineReducers } from 'redux'
import apiReducer from './actions/reducers'

const rootReducer = combineReducers({
  dealWithAPI: apiReducer
})

export default rootReducer
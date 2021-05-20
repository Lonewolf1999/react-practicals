import { combineReducers } from 'redux'
import apiReducer from './dealWithAPI/apiReducer'

const rootReducer = combineReducers({
  dealWithAPI: apiReducer
})

export default rootReducer

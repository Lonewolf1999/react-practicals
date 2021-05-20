const initialState = {
  userInfoListLoading: false,
  users: [],
  userInfoListError: '',
  formPopulation: [],
  formPopulationError: ''
}

export const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USERS_REQUEST_USERS':
      return {
        ...state,
        userInfoListLoading: true
      }
    case 'FETCH_USERS_SUCCESS_USERS':
      return {
        ...state,
        userInfoListLoading: false,
        users: action.payload,
        userInfoListError: ''
      }
    case 'FETCH_USERS_FAILURE_USERS ':
      return {
        ...state,
        userInfoListLoading: false,
        users: [],
        userInfoListError: action.payload
      }
    case 'FETCH_USERS_REQUEST_FORM':
      return state
    case 'FETCH_USERS_SUCCESS_FORM':
      return {
        ...state,
        formPopulation: action.payload,
        formPopulationError: ''
      }
    case 'FETCH_USERS_FAILURE_FORM':
      return {
        ...state,
        formPopulation: [],
        formPopulationError: action.payload
      }
    default: return state
  }
}

export default apiReducer
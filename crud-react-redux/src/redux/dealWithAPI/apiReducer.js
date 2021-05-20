const initialState = {
  memberListLoading: false,
  members: [],
  memberListError: '',
  teams: [],
  teamListError: '',
  teamListLoading: false,
  formPopulation: [],
  formPopulationError: ''
}

export const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USERS_REQUEST_MEMBERS':
      return {
        ...state,
        memberListLoading: true
      }
    case 'FETCH_USERS_SUCCESS_MEMBERS':
      return {
        ...state,
        memberListLoading: false,
        members: action.payload,
        memberListError: ''
      }
    case 'FETCH_USERS_FAILURE_MEMBERS':
      return {
        ...state,
        memberListLoading: false,
        members: [],
        memberListError: action.payload
      }
    case 'FETCH_USERS_REQUEST_TEAMS':
      return {
        ...state,
        teamListLoading: true
      }
    case 'FETCH_USERS_SUCCESS_TEAMS':
      return {
        ...state,
        teamListLoading: false,
        teams: action.payload,
        teamListError: ''
      }
    case 'FETCH_USERS_FAILURE_TEAMS':
      return {
        ...state,
        teamListLoading: false,
        teams: [],
        teamListError: action.payload
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
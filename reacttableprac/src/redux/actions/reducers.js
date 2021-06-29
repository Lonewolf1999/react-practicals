const initialState = {
  userInfoListLoading: false,
  users: [],
  userInfoListError: ''
}

export const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USERS_REQUEST':
      return {
        ...state,
        userInfoListLoading: true
      }
    case 'FETCH_USERS_SUCCESS':
      return {
        ...state,
        userInfoListLoading: false,
        users: action.payload,
        userInfoListError: ''
      }
    case 'FETCH_USERS_FAILURE':
      return {
        ...state,
        userInfoListLoading: false,
        users: [],
        userInfoListError: action.payload
      }
    default: return state
  }
}

export default apiReducer
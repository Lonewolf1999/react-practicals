import axios from 'axios'

export const fetchMembers = () => {
  return (dispatch) => {
    dispatch(fetchUsersRequestMembers())
    axios
      .get(`http://localhost:8000/members`)
      .then(response => {
        const members = response.data
        dispatch(fetchUsersSuccessMembers(members))
      })
      .catch(error => {
        dispatch(fetchUsersFailureMembers(error.message))
      })
  }
}

export const addNewMember = (data) => {
  return (dispatch) => {
    axios
      .post(`http://localhost:8000/members`, data)
      .then(() => {
        console.log('data added.')
      })
      .catch(error => {
        console.log(error.message)
      })
  }
}

export const updateMember = (data, id) => {
  return (dispatch) => {
    axios
      .put(`http://localhost:8000/members/${id}`, data)
      .then(() => {
        console.log('data updated.')
      })
      .catch(error => {
        console.log(error.message)
      })
  }
}

export const deleteMember = (data) => {
  return dispatch => {
    axios
      .delete(`http://localhost:8000/members/${data}`)
      .then(() => {
        console.log('data deleted')
      })
      .catch(error => {
        console.log(error.message)
      })
  }
}

export const fetchTeams = () => {
  return (dispatch) => {
    dispatch(fetchUsersRequestTeams())
    axios
      .get(`http://localhost:8000/teams`)
      .then(response => {
        const teams = response.data
        dispatch(fetchUsersSuccessTeams(teams))
      })
      .catch(error => {
        dispatch(fetchUsersFailureTeams(error.message))
      })
  }
}

export const populateForm = (id) => {
  return (dispatch) => {
    dispatch(fetchUsersRequestForm())
    axios
      .get(`http://localhost:8000/members/${id}`)
      .then(response => {
        const formValues = response.data
        dispatch(fetchUsersSuccessForm(formValues))
      })
      .catch(error => {
        dispatch(fetchUsersFailureForm(error.message))
        console.log(error.message)
      })
  }
}

export const fetchUsersRequestMembers = () => {
  return {
    type: 'FETCH_USERS_REQUEST_MEMBERS'
  }
}

export const fetchUsersSuccessMembers = users => {
  return {
    type: 'FETCH_USERS_SUCCESS_MEMBERS',
    payload: users
  }
}

export const fetchUsersFailureMembers = error => {
  return {
    type: 'FETCH_USERS_FAILURE_MEMBERS',
    payload: error
  }
}

export const fetchUsersRequestTeams = () => {
  return {
    type: 'FETCH_USERS_REQUEST_TEAMS'
  }
}

export const fetchUsersSuccessTeams = users => {
  return {
    type: 'FETCH_USERS_SUCCESS_TEAMS',
    payload: users
  }
}

export const fetchUsersFailureTeams = error => {
  return {
    type: 'FETCH_USERS_FAILURE_TEAMS',
    payload: error
  }
}

export const fetchUsersRequestForm = () => {
  return {
    type: 'FETCH_USERS_REQUEST_FORM'
  }
}

export const fetchUsersSuccessForm = users => {
  return {
    type: 'FETCH_USERS_SUCCESS_FORM',
    payload: users
  }
}

export const fetchUsersFailureForm = error => {
  return {
    type: 'FETCH_USERS_FAILURE_FORM',
    payload: error
  }
}
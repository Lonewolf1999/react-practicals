import axios from 'axios'

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersRequestUsers())
    axios
      .get(`http://localhost:8000/users`)
      .then(response => {
        const users = response.data
        dispatch(fetchUsersSuccessUsers(users))
      })
      .catch(error => {
        dispatch(fetchUsersFailureUsers(error.message))
      })
  }
}

export const addNewUser = (data) => {
  return (dispatch) => {
    axios
      .post(`http://localhost:8000/users`, data)
      .then(() => {
        console.log('data added.')
      })
      .catch(error => {
        console.log(error.message)
      })
  }
}

export const updateUser = (data, id) => {
  return (dispatch) => {
    axios
      .put(`http://localhost:8000/users/${id}`, data)
      .then(() => {
        console.log('data updated.')
      })
      .catch(error => {
        console.log(error.message)
      })
  }
}

export const deleteUser = (data) => {
  return dispatch => {
    axios
      .delete(`http://localhost:8000/users/${data}`)
      .then(() => {
        console.log('data deleted')
      })
      .catch(error => {
        console.log(error.message)
      })
  }
}

export const populateForm = (id) => {
  console.log(id)
  return (dispatch) => {
    console.log(id)
    dispatch(fetchUsersRequestForm())
    axios
      .get(`http://localhost:8000/users/${id}`)
      .then(response => {
        const formValues = response.data
        dispatch(fetchUsersSuccessForm(formValues))
        console.log(`form called for fetching`)
      })
      .catch(error => {
        dispatch(fetchUsersFailureForm(error.message))
        console.log(error.message)
      })
  }
}

// export const fetchMembers = () => {
//   return (dispatch) => {
//     dispatch(fetchUsersRequestMembers())
//     axios
//       .get(`http://localhost:8000/members`)
//       .then(response => {
//         const members = response.data
//         dispatch(fetchUsersSuccessMembers(members))
//       })
//       .catch(error => {
//         dispatch(fetchUsersFailureMembers(error.message))
//       })
//   }
// }

// export const addNewMember = (data) => {
//   return (dispatch) => {
//     axios
//       .post(`http://localhost:8000/members`, data)
//       .then(() => {
//         console.log('data added.')
//       })
//       .catch(error => {
//         console.log(error.message)
//       })
//   }
// }

// export const updateMember = (data, id) => {
//   return (dispatch) => {
//     axios
//       .put(`http://localhost:8000/members/${id}`, data)
//       .then(() => {
//         console.log('data updated.')
//       })
//       .catch(error => {
//         console.log(error.message)
//       })
//   }
// }

// export const deleteMember = (data) => {
//   return dispatch => {
//     axios
//       .delete(`http://localhost:8000/members/${data}`)
//       .then(() => {
//         console.log('data deleted')
//       })
//       .catch(error => {
//         console.log(error.message)
//       })
//   }
// }

// export const fetchTeams = () => {
//   return (dispatch) => {
//     dispatch(fetchUsersRequestTeams())
//     axios
//       .get(`http://localhost:8000/teams`)
//       .then(response => {
//         const teams = response.data
//         dispatch(fetchUsersSuccessTeams(teams))
//       })
//       .catch(error => {
//         dispatch(fetchUsersFailureTeams(error.message))
//       })
//   }
// }

// export const populateForm = (id) => {
//   return (dispatch) => {
//     dispatch(fetchUsersRequestForm())
//     axios
//       .get(`http://localhost:8000/members/${id}`)
//       .then(response => {
//         const formValues = response.data
//         dispatch(fetchUsersSuccessForm(formValues))
//       })
//       .catch(error => {
//         dispatch(fetchUsersFailureForm(error.message))
//         console.log(error.message)
//       })
//   }
// }

export const fetchUsersRequestUsers = () => {
  return {
    type: 'FETCH_USERS_REQUEST_USERS'
  }
}

export const fetchUsersSuccessUsers = users => {
  return {
    type: 'FETCH_USERS_SUCCESS_USERS',
    payload: users
  }
}

export const fetchUsersFailureUsers = error => {
  return {
    type: 'FETCH_USERS_FAILURE_USERS',
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



// {index >= 0 && addresses.length !== 1 && (
//   <button type='button' className="btn btn-outline-danger float-right delete-btn" onClick={() => remove(index)}>
//       Delete
//   </button>
// )}
// {addresses.length === 1 && (
//   <button type='button' disabled className="btn btn-outline-danger float-right delete-btn" onClick={() => remove(index)}>
//       Delete
//   </button>
// )}
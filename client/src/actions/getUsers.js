export function getUsersSuccess(users) {
  return {
      type: "GET_USERS_SUCCESS",
      users
  }
}

export function getUsers(url) {
  return (dispatch) => {
      fetch(url)
          .then(response => {
              if(!response.ok) {
                  throw new Error(response.statusText);
              }
              return response;
          })
          .then(response => response.json())
          .then(users => dispatch(getUsersSuccess(users)))
          .catch(()=>{});
  }
}
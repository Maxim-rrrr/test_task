export function getUsers (state = '', action) {
  switch (action.type) {
      case 'GET_USERS_SUCCESS':
          return action.users;
      default:
          return state;
  }
}
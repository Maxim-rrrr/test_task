export function getCommentsSuccess(comments) {
  return {
      type: "GET_COMMENTS_SUCCESS",
      comments
  }
}

export function getComments(url) {
  return (dispatch) => {
      fetch(url)
          .then(response => {
              if(!response.ok) {
                  throw new Error(response.statusText);
              }
              return response;
          })
          .then(response => response.json())
          .then(comments => dispatch(getCommentsSuccess(comments)))
          .catch(()=>{});
  }
}
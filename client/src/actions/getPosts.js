export function getPostsSuccess(posts) {
  return {
      type: "GET_POSTS_SUCCESS",
      posts
  }
}

export function getPosts(url) {
  return (dispatch) => {
      fetch(url)
          .then(response => {
              if(!response.ok) {
                  throw new Error(response.statusText);
              }
              return response;
          })
          .then(response => response.json())
          .then(posts => dispatch(getPostsSuccess(posts)))
          .catch(()=>{});
  }
}
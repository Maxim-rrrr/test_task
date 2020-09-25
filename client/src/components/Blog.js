import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts } from '../actions/getPosts'
import { getComments } from '../actions/getComments'
import { getUsers } from '../actions/getUsers'

import '../style/css/style.css'

class Blog extends Component {
  constructor(props) {
    super (props)

    this.state = {
      loading: true
    }
  }


  componentDidMount() {
    this.props.getPosts('https://jsonplaceholder.typicode.com/posts/')
    this.props.getComments('https://jsonplaceholder.typicode.com/comments')
    this.props.getUsers('https://jsonplaceholder.typicode.com/users')

    let checkLoading = setInterval(() => {
      if (this.props.getPostsResponse && this.props.getCommentsResponse && this.props.getUsersResponse) {
        this.setState({
          loading: false
        })

        clearInterval(checkLoading)
      }
      
    })
  }

  render() {
    // https://loading.io/css/
    let content = 
      <div className='loader'>
        <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>

    if (!this.state.loading) {
      content = this.props.getPostsResponse.map(post => {

        // Отбираем комментарии
        let comments = []
        this.props.getCommentsResponse.forEach(comment => {
          if (comment.postId === post.id) {
            comments.push(comment)
          }
        });

        // Автор поста
        /*
         *  Можно было бы не проходить циклом так как 
         *  с сервера пользователи уже приходят отсортированные по id, 
         *  но на всякий 
         */
        let author
        this.props.getUsersResponse.forEach(user => {
          if (user.id === post.userId) {
            author = user
            return
          }
        });

        return(
        <div className='post' key = {post.id}> 
          <div className='user-name post__author-name'> 
            { author.name } 
            <span className='user-name__email post__author-email'> { author.email } </span>
          </div>

          <div className='post__title'> { post.title } </div>  

          <div className='post__body'> { post.body } </div>
          
          { comments.map(comment => 
            <div className='comment post__comment' key = {comment.id}>
              <div className='user-name'> 
                { comment.name } 
                <span className='user-name__email'> { comment.email } </span>
              </div>

              <div className="comment__body">
                { comment.body }
              </div>
              
            </div>) 
          }

        </div>
        )
      })
    }

    return (
      <div className="container">
        { content }
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    getPostsResponse: state.getPosts,
    getCommentsResponse: state.getComments,
    getUsersResponse: state.getUsers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPosts: url => dispatch(getPosts(url)),
    getComments: url => dispatch(getComments(url)),
    getUsers: url => dispatch(getUsers(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);

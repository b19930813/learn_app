import React from 'react'
import axios from 'axios'

class Posts extends React.Component {
  state = {
    posts: []
  };

  componentDidMount() {
    axios
      .get('/api/posts')
      .then(response => {
        this.setState({ posts: response.data.posts });
      })
  }

  renderAllPosts = () => {
    return(
      <ul>
        {this.state.posts.map(post => (
          <li key={post}>{post}</li>
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div>
        {this.renderAllPosts()}
      </div>
    )
  }
}

export default Posts
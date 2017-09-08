import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FaEdit from 'react-icons/lib/fa/edit';
import FaClose from 'react-icons/lib/fa/close';
import FaTrashO from 'react-icons/lib/fa/trash-o';
import {
  getPost,
  deletePost,
  getComments,
  updatePostVoteScore } from './../actions';

class PostDetails extends React.Component {

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.getPost(id);
    this.props.getComments(id);
  }

  deletePost = () => {
    const { id } = this.props.match.params;
    this.props.deletePost(id);

  }

  increaseScore = (increase) => (e) => {
    e.preventDefault();

    const { id } = this.props.match.params;

    this.props.updatePostVoteScore(id, increase);
  }

  render() {
    let title = '';
    let category = '';
    let body = '';
    let author = '';
    let id = '';
    let timestamp = '';
    let voteScore = '';

    if (this.props.post) {
      id = this.props.post.id;
      title = this.props.post.title;
      category = this.props.post.category;
      body = this.props.post.body;
      author = this.props.post.author;
      timestamp = this.props.post.timestamp;
      voteScore = this.props.post.voteScore;
    }


console.log(this.props);

    return (
      <div className="container">
        <div className="navPost">
          <h1>Post Details</h1>
          <Link to={`edit/${id}`} className="closePostAction">
            <FaEdit size={30}/>
            <h2>Edit Post</h2>
          </Link>
          <Link to='/' className="closePostAction" onClick={this.deletePost} >
            <FaTrashO size={30}/>
            <h2>Delete Post</h2>
          </Link>
          <Link to='/' className="closePostAction">
            <FaClose size={30}/>
            <h2>Close</h2>
          </Link>

        </div>
        <form>
          <div className="postForm">
            <label>Title:</label>
            <label>{title}</label>

            <label>Category:</label>
            <label>{category}</label>

            <label>Body:</label>
            <textarea name='body' value={body} disabled/>

            <label>Author:</label>
            <label>{author}</label>

            <label>Date:</label>
            <label>{(new Date(timestamp)).toUTCString()}</label>

            <label>VoteScore:</label>
            <label>{voteScore}</label>

            <div className="btnVoteScore">
              <button className="btnVoteScore" onClick={this.increaseScore(true)} > Increase VoteScore</button>
              <button className="btnVoteScore" onClick={this.increaseScore(false)}> Decrease ScoreScore</button>
            </div>

            <h3>Comments ({this.props.comments && this.props.comments.length}):</h3>



          </div>
        </form>
      </div>

    );
  }
}

const mapStateToProps = state => {
  const { post } = state.posts.postDetails;
  const { comments } = state.posts;

  return { post, comments };
};

export default connect(mapStateToProps, {
  getPost,
  deletePost,
  getComments,
  updatePostVoteScore
}, null, {pure:false})(PostDetails);

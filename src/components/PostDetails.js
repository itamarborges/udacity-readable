import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import serializeForm from 'form-serialize';
import FaEdit from 'react-icons/lib/fa/edit';
import FaClose from 'react-icons/lib/fa/close';
import { getPost } from './../actions';
import * as PostsAPI from '../PostsAPI';

class PostDetails extends React.Component {

  handleSubmit = (e) => {

    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    values.timestamp = Date.now();
    values.id = Date.now().toString();
    PostsAPI.createPost(values);
    this.props.onGoBack();

}

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.getPost(id);
  }

  render() {
    let title = '';
    let category = '';
    let body = '';
    let author = '';
    let id = '';

    if (this.props.post) {
      id = this.props.post.id;
      title = this.props.post.title;
      category = this.props.post.category;
      body = this.props.post.body;
      author = this.props.post.author;
    }


    return (
      <div className="container">
        <div className="navPost">
          <h1>Post Details</h1>
          <Link to={`edit/${id}`} className="closePostAction">
            <FaEdit size={30}/>
            <h2>Edit Post</h2>
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


          </div>
        </form>
      </div>

    );
  }
}

const mapStateToProps = state => {
  const { post } = state.posts.postDetails;

  return { post };
};

export default connect(mapStateToProps, {
  getPost,
}, null, {pure:false})(PostDetails);

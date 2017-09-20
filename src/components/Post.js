import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import serializeForm from 'form-serialize';
import FaClose from 'react-icons/lib/fa/close';
import { getPost, updatePost } from './../actions';
import * as PostsAPI from '../PostsAPI';
import Page404 from './Page404';

class Post extends React.Component {

  handleSubmit = (e) => {
    const id = this.props.match ? this.props.match.params.id : null;

    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    if (!id) {
      values.timestamp = Date.now();
      values.id = Date.now().toString();
      PostsAPI.createPost(values);
    } else {
      PostsAPI.updatePost(id, values);
    }

    this.props.onGoBack();

}

componentDidMount() {
  const id = this.props.match ? this.props.match.params.id : null;
  id && this.props.getPost(id);
}

onPostChange = () => {
  const id = this.props.match ? this.props.match.params.id : null;
  if (id) {
    const title = this.titleInput.value;
    const category = this.categorySelect.value;
    const body = this.bodyTextArea.value;
    const author = this.authorInput.value;

    this.props.updatePost({
      title,
      category,
      body,
      author
    });
  }
}

render() {
  if (this.props.deleted) {
    return (
      <Page404 />
    )
  }
  const id = this.props.match ? this.props.match.params.id : null;


  let title = '';
  let category = 'disabled';
  let body = '';
  let author = '';

  //if there is a id, it`s editing a post
  if (this.props.post && id) {
    title = this.props.post.title;
    category = this.props.post.category;
    body = this.props.post.body;
    author = this.props.post.author;
  }

  const headerTitle = (id) ? 'Edit Post' : 'New Post';
  const urlClose = (id) ? `/${category}/${id}` : '/';
  const labelBtn = (id) ? 'Update Post' : 'Save Post';

    return (
      <div className="container">
        <div className="navPost">
          <h1>{headerTitle}</h1>
          <Link to={urlClose} className="closePostAction">
          <FaClose size={30}/>
          <h2>Close</h2>
          </Link>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="postForm">
            <label>Title:</label>
            <input
              type='text'
              name='title'
              defaultValue={title}
              ref={(input) => { this.titleInput = input; }}
              onChange={this.onPostChange}/>

            <label>Category:</label>
            <select
              defaultValue={category}
              name="category"
              className="categorySelect"
              ref={(el) => { this.categorySelect = el; }}
              onChange={this.onPostChange}
            >
              {this.props.categories && this.props.categories.length > 0 && this.props.categories.map((item) => (
                <option key={item.name} value={item.name}>{item.name}</option>
              ))}
            </select>

            <label>Body:</label>
            <textarea
              name='body'
              defaultValue={body}
              onChange={this.onPostChange}
              ref={(text) => { this.bodyTextArea = text; }}
            />

            <label>Author:</label>
            <input
              type='text'
              name='author'
              defaultValue={author}
              onChange={this.onPostChange}
              ref={(input) => { this.authorInput = input; }}
            />

            <button className="btnAddPost">{labelBtn}</button>
          </div>
        </form>
      </div>

    );
  }
}

const mapStateToProps = state => {
  const { post, deleted } = state.posts.postDetails;

  return { post, deleted };
};

export default connect(mapStateToProps, {
  getPost,
  updatePost
}, null, {pure:false})(Post);

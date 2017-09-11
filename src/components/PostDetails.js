import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Comment from './Comment';
import serializeForm from 'form-serialize';
import FaEdit from 'react-icons/lib/fa/edit';
import FaClose from 'react-icons/lib/fa/close';
import FaTrashO from 'react-icons/lib/fa/trash-o';
import Modal from 'react-modal';
import {
  getPost,
  deletePost,
  getComments,
  updatePostVoteScore,
  createComment,
  setSortCommentBy,
  editComment,
  updateComment
} from './../actions';

class PostDetails extends React.Component {

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.getPost(id);
    this.props.getComments(id);
  }

  closeModal = () => {
    this.props.editComment(false);
  }
  onClickComment = (id) => {
    this.props.editComment(true, id);
  }

  deletePost = () => {
    const { id } = this.props.match.params;
    this.props.deletePost(id);

  }

  handleEdit = (idComment) => (e) => {
    e.preventDefault();

    const { id } = this.props.match.params;

    const values = serializeForm(e.target, { hash: true });

    this.props.updateComment(idComment, values, id);
    this.closeModal();
  }

  handleSubmit = (e) => {
    const id = this.props.match ? this.props.match.params.id : null;
    debugger;
    e.preventDefault();
    const values = serializeForm(e.target, { hash: true });
    values.timestamp = Date.now();
    values.id = Date.now().toString();
    values.parentId = id;
    this.props.createComment(values);
    this.authorInput.value = '';
    this.bodyTextArea.value = '';
  }

  increaseScore = (increase) => (e) => {
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

    const comments =
    this.props.comments &&
    this.props.comments.filter((item) => !item.deleted).length > 0;

    const { sortByComment } = this.props;

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

          <div className="headerTable">
            <h3>Comments ({
              this.props.comments &&
              this.props.comments.filter((item) => !item.deleted).length}):</h3>
            {comments &&
            <div className="sortOptions">
              <h3>Sort by</h3>
              <div className="sortByComment">
                <label>
                  <input
                    type="radio"
                    value="voteScore"
                    name="sortBy"
                    checked={sortByComment === 'voteScore'}
                    onChange={() => this.props.setSortCommentBy('voteScore')}
                    /> voteScore
                </label>
              </div>
              <div className="sortByComment">
                <label>
                  <input
                    type="radio"
                    value="timestamp"
                    name="sortBy"
                    checked={sortByComment === 'timestamp'}
                    onChange={() => this.props.setSortCommentBy('timestamp')}
                    /> timestamp
                </label>
              </div>
            </div>
          }
        </div>
            {this.props.comments &&
             this.props.comments.length > 0 &&
             this.props.comments.map((item) => !item.deleted && (
                 <Comment
                   key={item.id}
                   comment={item}
                   onClick={() => this.onClickComment(item.id)}/>
            ))}
            <h3>New Comment</h3>
            <form onSubmit={this.handleSubmit}>
              <label>Author:</label>
              <input
                type='text'
                name='author'
                defaultValue=''
                ref={(input) => { this.authorInput = input; }}
              />
              <label>Comment:</label>
              <textarea
                name='body'
                defaultValue=''
                ref={(text) => { this.bodyTextArea = text; }}
              />
              <button className="btnAddComment">Add Comment</button>
            </form>

            <Modal
              className='modal'
              isOpen={this.props.openModal}
              onRequestClose={this.closeModal}
              contentLabel='Modal'
              >

                  {this.props.editingComment.comment && (
                  <div className="editComment">
                    <form onSubmit={this.handleEdit(this.props.editingComment.comment.id)}>
                      <label>Author:</label>
                      <input
                        type='text'
                        name='author'
                        defaultValue={this.props.editingComment.comment.author}
                        ref={(input) => { this.authorEditInput = input; }}
                      />
                      <label>Comment:</label>
                      <textarea
                        name='body'
                        defaultValue={this.props.editingComment.comment.body}
                        ref={(text) => { this.bodyEditTextArea = text; }}
                      />
                      <button className="btnEditComment">Edit Comment</button>
                    </form>
                  </div>

                  )}


            </Modal>
          </div>

      </div>

    );
  }
}

const mapStateToProps = state => {
  const { post } = state.posts.postDetails;
  const { comments, sortByComment, openModal, editingComment } = state.posts;

  return { post, comments, sortByComment, openModal, editingComment };
};

export default connect(mapStateToProps, {
  getPost,
  deletePost,
  getComments,
  updatePostVoteScore,
  createComment,
  setSortCommentBy,
  editComment,
  updateComment
}, null, {pure:false})(PostDetails);

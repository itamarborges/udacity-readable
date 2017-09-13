import React from 'react';
import { connect } from 'react-redux';
import FaTrashO from 'react-icons/lib/fa/trash-o';
import FaEdit from 'react-icons/lib/fa/edit';
import {
  updatePostVoteScoreComment,
  deleteComment
} from '../actions';

class Comment extends React.Component {

  increaseScoreComment = (increase) => (e) => {
    e.preventDefault();

    const { comment } = this.props;

    this.props.updatePostVoteScoreComment(comment, increase);

  }

  deleteComment = () => {
    const { id, parentId } = this.props.comment;

    this.props.deleteComment(id, parentId);
  }

  maisUm = (value) => {
  console.log(`rodou2222 ${value}`);
  }


  render() {
    const { comment } = this.props;

    return (
      <div className="comment">
        <div className="headerComment">
          <label onClick={this.props.onClick}>By: {comment.author} in {(new Date(comment.timestamp)).toUTCString()}</label>
          <a className="headerDeleteComment" onClick={this.props.onClick}>
            <FaEdit size={30}/>
            <h3>Edit Comment</h3>
          </a>
            <a className="headerDeleteComment" onClick={this.deleteComment}>
              <FaTrashO size={30}/>
              <h3>Delete Comment</h3>
            </a>
        </div>
        <label onClick={this.props.onClick}>{comment.body}</label>
        <label>voteScore: {comment.voteScore}</label>
        <div className="btnVoteScoreComment">
          <button className="btnVoteScore" onClick={this.increaseScoreComment(true)} > Increase VoteScore Comment</button>
          <button className="btnVoteScore" onClick={this.increaseScoreComment(false)}> Decrease ScoreScore Comment</button>
        </div>

      </div>

    );
  }
}

export default connect(null, {
  updatePostVoteScoreComment,
  deleteComment
})(Comment);

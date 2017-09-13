import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FaTrashO from 'react-icons/lib/fa/trash-o';
import {
  updatePostVoteScore,
  deletePost
} from './../actions';

class PostSummary extends React.Component {

  increaseScore = (increase, id) => (e) => {
    e.preventDefault();
    this.props.updatePostVoteScore(id, increase);
  }

  deletePost = (id) => (e) => {
    e.preventDefault();
    this.props.deletePost(id);
  }

  render() {
    const {
      id,
      title,
      category,
      voteScore,
      timestamp,
      author,
    } = this.props.post;

const urlPost = `/post/${id}`;

    return (
        <Link className="postSummary noUnderline" to={urlPost} >
          <div className="postSummaryTitle"><h4>{title}</h4>&nbsp;by&nbsp;<h4>{author}</h4></div>
          <div className="postSummaryDetails">
            <div className="postSummaryCategory">Category: {category}</div>
            <div className="postSummaryValues">
              <div className="postSummaryVoteScore">Comments: {this.props.qtdComents}</div>
              <div className="postSummaryVoteScore">voteScore: {voteScore}</div>
              <div className="postSummaryTimeStamp">{(new Date(timestamp)).toUTCString()}</div>
          </div>
         </div>
         <div className="btnVoteScore">
           <button className="btnVoteScore" onClick={this.increaseScore(true, id)} > Increase VoteScore</button>
           <button className="btnVoteScore" onClick={this.increaseScore(false, id)}> Decrease ScoreScore</button>
           <Link className="postSummary noUnderline" to={urlPost} >
             <button className="btnVoteScore" > POST DETAILS </button>
           </Link>
           <button className="btnVoteScore" onClick={this.deletePost(id)}> DELETE POST</button>
         </div>
      </Link>

    );
  }
}

export default connect(null, {
  updatePostVoteScore,
  deletePost
})(PostSummary);

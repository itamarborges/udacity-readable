import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  updatePostVoteScore,
  deletePost
} from './../actions';

class PostSummary extends React.Component {

  increaseScore = (increase, id, category) => (e) => {
    e.preventDefault();
    this.props.updatePostVoteScore(id, increase, category);
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

    const urlPost = `/${category}/${id}`;
    const categoryFilter = this.props.category !== '' ? this.props.category:  null;

    return (
        <div>
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
           <button className="btnVoteScore" onClick={this.increaseScore(true, id, categoryFilter)} > Increase VoteScore</button>
           <button className="btnVoteScore" onClick={this.increaseScore(false, id, categoryFilter)}> Decrease ScoreScore</button>
           <Link className="postSummary noUnderline" to={urlPost} >
             <button className="btnVoteScore" > POST DETAILS </button>
           </Link>
           <button className="btnVoteScore" onClick={this.deletePost(id)}> DELETE POST</button>
         </div>
      </div>

    );
  }
}

export default connect(null, {
  updatePostVoteScore,
  deletePost
},null, {pure:false})(PostSummary);

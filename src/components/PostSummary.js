import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PostSummary extends React.Component {

  render() {
    const {
      id,
      title,
      category,
      voteScore,
      timestamp
     } = this.props;

const urlPost = `/post/${id}`;

    return (
      <Link className="postSummary" to={urlPost} >
          <div className="postSummaryTitle"><h4>{title}</h4></div>
          <div className="postSummaryDetails">
            <div className="postSummaryCategory">Category: {category}</div>
            <div className="postSummaryValues">
              <div className="postSummaryVoteScore">voteScore: {voteScore}</div>
              <div className="postSummaryTimeStamp">{(new Date(timestamp)).toUTCString()}</div>
          </div>
         </div>
      </Link>

    );
  }
}

export default connect(null, null)(PostSummary);

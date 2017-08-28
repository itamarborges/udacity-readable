import React from 'react';
import { connect } from 'react-redux';

class PostSummary extends React.Component {

  render() {
    const {
      title,
      category,
      voteScore,
      timestamp
     } = this.props;

    return (
      <div className="postSummary">
        <div className="postSummaryTitle"><h4>{title}</h4></div>
        <div className="postSummaryDetails">
          <div className="postSummaryCategory">Category: {category}</div>
          <div className="postSummaryValues">
            <div className="postSummaryVoteScore">voteScore: {voteScore}</div>
            <div className="postSummaryTimeStamp">{(new Date(timestamp)).toUTCString()}</div>
        </div>
       </div>
      </div>

    );
  }
}

export default connect(null, null)(PostSummary);

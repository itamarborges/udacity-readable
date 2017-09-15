import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Category extends React.Component {

  render() {
    const { selected, categoryName } = this.props;

    return (
      <Link to={this.props.categoryFilter === categoryName ? '' : `/${categoryName}`}>
        <div
          key={categoryName}
          className={selected === 'yes' ? "selectedCategory": "category"}
        >
        <div className="categoryName">{categoryName}</div>
      </div>
      </Link>

    );
  }
}

  const mapStateToProps = state => {
    const { categoryFilter } = state.posts;

    return { categoryFilter };
  };

export default connect(mapStateToProps, null, null, {pure:false})(Category);

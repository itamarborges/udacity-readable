import React from 'react';
import { connect } from 'react-redux';
import { setFilterPostByCategories } from '../actions';

class Category extends React.Component {

  onClickCategory = (categoryName) => {
    this.props.setFilterPostByCategories(categoryName);
  }

  render() {
    const { selected, categoryName } = this.props;

    return (
      <div
        key={categoryName}
        className={selected === 'yes' ? "selectedCategory": "category"}
        onClick={() => this.onClickCategory(categoryName)}>
        <div className="categoryName">{categoryName}</div>
      </div>

    );
  }
}

export default connect(null, { setFilterPostByCategories })(Category);

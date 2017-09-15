import React from 'react';

class CategorySelect extends React.Component {

  render() {
    const { categories, selectedCategory } = this.props;
    return (
      <div >
        <select
          value={selectedCategory}
          name="category"
          className="categorySelect"
          onChange={this.props.onChange}
        >
          {categories && categories.length > 0 && categories.map((item) => (
            <option key={item.name} value={item.name}>{item.name}</option>
          ))}
        </select>
      </div>

    );
  }
}

export default CategorySelect;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadAllCategories, loadAllPosts } from './actions';
import Category from './components/Category';
import PostSummary from './components/PostSummary';
import PlusSquare from 'react-icons/lib/fa/plus-square-o';
import './App.css';

class App extends Component {

  componentDidMount() {
    this.props.loadAllCategories();
    this.props.loadAllPosts();
  }

selectedCategory = (categoryName) => {

    const { categoriesFilter } = this.props.posts;

    return (categoriesFilter &&
    categoriesFilter.filter((item) => item === categoryName).length > 0)
    ? "yes"
    : "no";
}

  render() {
    return (
      <div className="container">
        <div className="nav">
          <h1> Readable </h1>
          <div className="newPost" >
            <PlusSquare size={30}/>
            <h2> New Post </h2>
          </div>
        </div>

        <div>
          <h2>Filter by Category</h2>
          <div className="categoriesList">
            {this.props.categories.allCategories.length > 0 &&
             this.props.categories.allCategories.map((item) => (
              <Category
                key={item.name}
                categoryName={item.name}
                selected={this.selectedCategory(item.name)}
              />
            ))}
          </div>
        </div>

        <div className="board">
          <h2>Posts</h2>
          {this.props.posts.filteredPosts.length > 0 &&
           this.props.posts.filteredPosts.map((item) => (
            <PostSummary
              key={item.id}
              title={item.title}
              category={item.category}
              voteScore={item.voteScore}
              timestamp={item.timestamp}
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { categories, posts } = state;

  return { categories, posts };
};

export default connect(mapStateToProps, {
  loadAllCategories,
  loadAllPosts
})(App);

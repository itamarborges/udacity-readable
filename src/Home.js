import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import {
  loadAllCategories,
  loadAllPosts,
  setSortBy,
  setFilterPostByCategory } from './actions';
import Category from './components/Category';
import PostSummary from './components/PostSummary';
import Post from './components/Post';
import PostDetails from './components/PostDetails';
import PlusSquare from 'react-icons/lib/fa/plus-square-o';
import './App.css';

class Home extends Component {

  componentWillReceiveProps(nextProps) {
    debugger;
    if (nextProps.category &&
        nextProps.category !== this.props.category) {
          console.log('disparou');
          debugger;
      this.props.setFilterPostByCategory(nextProps.category);
    }
    console.log(nextProps);
    console.log('aqui 123');
    console.log(this.props);
  }


  componentDidMount() {
    debugger;
    const category = this.props.category ? this.props.category : null;

    this.props.loadAllPosts(category);
  }

selectedCategory = (categoryName) => {

    const category = this.props.category ? this.props.category : null;

    return (category === categoryName)
    ? "yes"
    : "no";
}

  render() {
    const category = this.props.category ? this.props.category : '';
    const { filteredPosts, sortBy, allComments } = this.props.posts;

    return (
      <div>
          <div className="container">
            <div className="nav">
              <h1> Readable </h1>
              <Link className="newPostAction" to='/post' >
                <PlusSquare size={30}/>
                <h2> New Post </h2>
              </Link>
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
              <div className="headerTable">
                <h2>Posts</h2>
                <div className="sortOptions">
                  <h2>Sort by</h2>
                  <div className="voteScore">
                    <label>
                      <input
                        type="radio"
                        value="voteScore"
                        name="sortBy"
                        checked={sortBy === 'voteScore'}
                        onChange={() => this.props.setSortBy('voteScore')} /> voteScore
                    </label>
                  </div>
                  <div className="timestamp">
                    <label>
                      <input
                        type="radio"
                        value="timestamp"
                        name="sortBy"
                        checked={sortBy === 'timestamp'}
                        onChange={() => this.props.setSortBy('timestamp')}/> timestamp
                    </label>
                  </div>
                </div>
              </div>
                {filteredPosts.length > 0 &&
               filteredPosts.map((item) => !item.deleted && (
                <PostSummary
                  key={item.id}
                  post={item}
                  category={category}
                  qtdComents={allComments[item.id] && allComments[item.id].length.toString()}
                />
              ))}
            </div>
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
  loadAllPosts,
  setSortBy,
  setFilterPostByCategory
  }, null, {pure:false})(Home);

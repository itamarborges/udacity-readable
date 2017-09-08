import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';
import {
  loadAllCategories,
  loadAllPosts,
  setSortBy } from './actions';
import Category from './components/Category';
import PostSummary from './components/PostSummary';
import Post from './components/Post';
import PostDetails from './components/PostDetails';
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

    const { filteredPosts, sortBy } = this.props.posts;

    return (
      <div>
        <Route exact path='/' render={() => (
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
                  id={item.id}
                  title={item.title}
                  category={item.category}
                  voteScore={item.voteScore}
                  timestamp={item.timestamp}
                />
              ))}
            </div>
          </div>
        )} />

        <Route exact path='/post' render={({ history }) => (
          <Post
            categories={this.props.categories.allCategories}
            onGoBack={() => {
              history.push('/');
              this.props.loadAllPosts();
            }
          }/>
        )} />

        <Route exact path='/post/:id' render={({ history, match }) => (
          <PostDetails
            categories={this.props.categories.allCategories}
            match={match}
            onGoBack={() => {
              history.push('/');
              this.props.loadAllPosts();
            }
          }/>
        )} />

        <Route exact path='/post/edit/:id' render={({ history, match }) => (
          <Post
            categories={this.props.categories.allCategories}
            match={match}
            onGoBack={() => {
              history.push(`/post/${match.params.id}`);
              this.props.loadAllPosts();
            }
          }/>
        )} />
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
  setSortBy
  }, null, {pure:false})(App);

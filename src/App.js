import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link, Switch } from 'react-router-dom';
import {
  loadAllCategories,
  loadAllPosts,
  setSortBy } from './actions';
import Category from './components/Category';
import PostSummary from './components/PostSummary';
import Post from './components/Post';
import PostDetails from './components/PostDetails';
import PlusSquare from 'react-icons/lib/fa/plus-square-o';
import Home from './Home';
import './App.css';

class App extends Component {

componentDidMount() {
  this.props.loadAllCategories();
}

selectedCategory = (categoryName) => {

    const { categoryFilter } = this.props.posts;

    return (categoryFilter === categoryName)
    ? "yes"
    : "no";
}

  render() {

    const { filteredPosts, sortBy, allComments, categoryFilter } = this.props.posts;

    return (
      <div>
        <Route exact path='/' component={Home} />

        <Switch>
          <Route exact path='/post' render={({ history }) => (
            <Post
              categories={this.props.categories.allCategories}
              onGoBack={() => {
                history.push('/');
                this.props.loadAllPosts();
              }
            }/>
          )} />

          <Route exact path='/:category/edit/:id' render={({ history, match }) => (
            <Post
              categories={this.props.categories.allCategories}
              match={match}
              onGoBack={() => {
                history.push(`/${match.params.category}/${match.params.id}`);
                this.props.loadAllPosts();
              }
            }/>
          )} />

          <Route exact path='/:category/:id' render={({ history, match }) => (
            <PostDetails
              categories={this.props.categories.allCategories}
              match={match}
              onGoBack={() => {
                history.push('/');
                this.props.loadAllPosts();
              }
            }/>
          )} />

        <Route exact path='/:category' render={({ match }) => (
          <Home
            category={`${match.params.category}`}/>
        )} />
      </Switch>
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

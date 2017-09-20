import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import {
  loadAllCategories,
  loadAllPosts,
  setSortBy } from './actions';
import Post from './components/Post';
import PostDetails from './components/PostDetails';
import Home from './Home';
import './App.css';
import Page404 from './components/Page404';

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

    return (
      <div>
        <Switch>
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
          <Route component={Page404} />
        </Switch>
        <Route component={Page404} />
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

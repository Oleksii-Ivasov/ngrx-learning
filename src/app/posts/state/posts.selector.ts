import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './posts.state';

export const POSTS_STATE_NAME = 'posts'

const getPostsState = createFeatureSelector<PostsState>(POSTS_STATE_NAME);

export const getPosts = createSelector(getPostsState, (state) => state.posts);

export const getPostById = (props: { id: number }) => {
  return createSelector(getPostsState, (state) => {
    return state.posts.find((post) => post.id === props.id);
  });
};

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { getPosts } from '../state/posts.selector';
import { deletePost } from '../state/posts.actions';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent {
  constructor(private store: Store<AppState>) {}

  posts$!: Observable<Post[]>;
  ngOnInit() {
    this.posts$ = this.store.select(getPosts);
  }

  onDeletePost(id: number | undefined) {
    if (id) {
      if (confirm('Are you sure you want to delete?')) {
        this.store.dispatch(deletePost({id}))
      }
    }
  }
}

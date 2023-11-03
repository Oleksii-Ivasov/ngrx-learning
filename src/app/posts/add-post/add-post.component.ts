import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/posts.model';
import { AppState } from 'src/app/store/app.state';
import { addPost } from '../state/posts.actions';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent {
  constructor(private store: Store<AppState>) {}
  postForm!: FormGroup;
  ngOnInit() {
    this.postForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }
  showDescriptionErrors() {
    const descriptionForm = this.postForm.controls['description'];
    if (descriptionForm.errors?.['required']) {
      return 'Description is required';
    }
    if (descriptionForm.errors?.['minlength']) {
      return 'Description should be of minimum 10 characters length';
    }
    return;
  }
  showTitleErrors() {
    const titleForm = this.postForm.controls['title'];
    if (titleForm.errors?.['required']) {
      return 'Title is required';
    }
    if (titleForm.errors?.['minlength']) {
      return 'Title should be of minimum 6 characters length';
    }
    return;
  }
  onAddPost() {
    if (!this.postForm.valid) {
      return;
    }
    const post: Post = {
      title: this.postForm.value.title,
      description: this.postForm.value.description
    }
    this.store.dispatch(addPost({post}))
  }
}

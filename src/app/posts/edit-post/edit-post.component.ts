import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getPostById } from '../state/posts.selector';
import { Post } from 'src/app/models/posts.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { updatePost } from '../state/posts.actions';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent {
  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private router: Router
  ) {}

  post!: Post | null;
  postForm!: FormGroup;
  postSubscription!: Subscription;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        const getPostsByIdClosure = getPostById({ id: +id });
        this.postSubscription = this.store
          .select(getPostsByIdClosure)
          .subscribe((data) => {
            this.post = data ? data : null;
            this.createForm();
          });
      } else {
        this.post = null;
      }
    });
  }

  createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(this.post?.title, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(this.post?.description, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  onSubmit() {
    if (!this.postForm.valid) {
      return;
    }
    const title = this.postForm.value.title;
    const description = this.postForm.value.description;
    const post: Post = {
      id: this.post?.id,
      title,
      description,
    };
    this.store.dispatch(updatePost({ post }));
    this.router.navigate(['posts']);
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

  ngOnDestroy() {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }
}

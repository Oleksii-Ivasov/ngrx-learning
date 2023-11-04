import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss'],
})
export class StateComponent {
  constructor(private store: Store<AppState>) {}

  store$!: Observable<AppState>;

  ngOnInit() {
    this.store$ = this.store;
  }
}

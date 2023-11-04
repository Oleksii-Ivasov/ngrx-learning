import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { changeText, customIncrement } from 'src/app/counter/state/counter.actions';
import { getText } from 'src/app/counter/state/counter.selector';
import { CounterState } from 'src/app/counter/state/counter.state';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.scss'],
})
export class CustomCounterInputComponent {
  constructor(private store: Store<AppState>) {}
  value!: number;
  text$!: Observable<string>
  ngOnInit() {
    this.text$ = this.store.select(getText)
  }
  onAdd() {
    if (+this.value) {
      this.store.dispatch(customIncrement({ count: +this.value }));
    }
  }
  onChangeText() {
    this.store.dispatch(changeText());
  }
}

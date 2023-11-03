import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { getCounter } from 'src/app/counter/state/counter.selector';
import { CounterState } from 'src/app/counter/state/counter.state';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.scss'],
})
export class CounterOutputComponent {
  constructor(private store: Store<AppState>) {}
  counter$!: Observable<number>;
  counterSubscription!: Subscription;
  ngOnInit() {
    this.counter$ = this.store.select(getCounter)
  }
}

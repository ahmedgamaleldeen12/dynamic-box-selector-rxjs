import { ChangeDetectionStrategy, Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { BoxState } from '../../services/box-state';
import { AsyncPipe } from '@angular/common';
import { Salto } from '../../models/box.selector';
import { Observable, Subject, take, takeUntil } from 'rxjs';


@Component({
  selector: 'app-box',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './box.html',
  styleUrl: './box.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Box implements OnInit, OnDestroy {

  @Input() id!: string;

  private readonly boxState = inject(BoxState);
  private readonly unsub$ = new Subject<void>();


  selectedOption$!: Observable<Salto | null>;
  readonly active$ = this.boxState.getActiveBox$();


  ngOnInit() {
    this.selectedOption$ = this.boxState.getSelection$(this.id);
  }

  activateBox() {
    // Only set active box if id is different from current active
    this.boxState.activeBox$.pipe(take(1), takeUntil(this.unsub$)).subscribe(current => {
      if (current !== this.id) {
        this.boxState.setActiveBox(this.id);
      }
    });
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}

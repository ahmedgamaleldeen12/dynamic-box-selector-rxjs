import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { BoxState } from '../../services/box-state';
import { AsyncPipe } from '@angular/common';
import { Salto } from '../../models/box.selector';
import { filter, Observable, Subject, tap, withLatestFrom } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-box',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './box.html',
  styleUrl: './box.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Box implements OnInit {

  @Input() id!: string;

  private readonly boxState = inject(BoxState);


  selectedOption$!: Observable<Salto | null>;
  readonly active$ = this.boxState.getActiveBox$();

  private readonly activate$ = new Subject<void>();


  private readonly activation$ = this.activate$.pipe(withLatestFrom(this.boxState.activeBox$),
    filter(([, current]) => current !== this.id),  
    tap(() => this.boxState.setActiveBox(this.id)),
    takeUntilDestroyed(),
  ).subscribe();

  ngOnInit() {
    this.selectedOption$ = this.boxState.getSelection$(this.id);
  }

  activateBox(): void {
    this.activate$.next();
  }
}

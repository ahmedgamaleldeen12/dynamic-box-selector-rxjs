import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BoxState } from '../../services/box-state';
import { AsyncPipe } from '@angular/common';
import { Subject,tap, withLatestFrom } from 'rxjs';
import { Salto } from '../../models/box.selector';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-option-selector',
  imports: [AsyncPipe],
  templateUrl: './option-selector.html',
  styleUrl: './option-selector.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionSelector  {

  private readonly boxState = inject(BoxState);

  readonly frontSaltos$ = this.boxState.getFrontSaltos$();
  readonly backSaltos$ = this.boxState.getBackSaltos$();
  // Active box observable
  readonly activeBox$ = this.boxState.getActiveBox$();
  readonly selectedForActiveBox$ = this.boxState.getSelectionForActiveBox$();

  private readonly saltoSelected$ = new Subject<Salto>();

  private readonly selection$ = this.saltoSelected$.pipe(withLatestFrom(this.boxState.activeBox$),
    tap(([salto, id]) => {
      if (id) {
        this.boxState.setSelection(id, salto);
        this.boxState.moveToNextBox();
      }
    }),
    takeUntilDestroyed(), 
  ).subscribe();

  public selectSalto(salto: Salto): void {
    this.saltoSelected$.next(salto);
  }
}

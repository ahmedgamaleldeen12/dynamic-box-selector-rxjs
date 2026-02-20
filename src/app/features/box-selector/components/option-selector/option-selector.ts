import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';
import { BoxState } from '../../services/box-state';
import { AsyncPipe } from '@angular/common';
import { Subject, take, takeUntil } from 'rxjs';
import { Salto } from '../../models/box.selector';

@Component({
  selector: 'app-option-selector',
  imports: [AsyncPipe],
  templateUrl: './option-selector.html',
  styleUrl: './option-selector.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionSelector implements OnDestroy {

  private readonly boxState = inject(BoxState);
  private readonly unsub$ = new Subject<void>();

  readonly frontSaltos$ = this.boxState.getFrontSaltos$();
  readonly backSaltos$ = this.boxState.getBackSaltos$();
  // Active box observable
  readonly activeBox$ = this.boxState.getActiveBox$();
  readonly selectedForActiveBox$ = this.boxState.getSelectionForActiveBox$();

  public selectSalto(salto: Salto) {
    // no need to use combineLatest RXJS operator it will make it more complex so i used imperative pattern instead of declarative pattern
    this.boxState.activeBox$.pipe(take(1),takeUntil(this.unsub$)).subscribe((id) => {
      if (id) {
        this.boxState.setSelection(id, salto);
        this.boxState.moveToNextBox();
      }
    });
  }
  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}

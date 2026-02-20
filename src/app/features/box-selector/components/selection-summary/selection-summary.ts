import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { BoxState } from '../../services/box-state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-selection-summary',
  imports: [CommonModule],
  templateUrl: './selection-summary.html',
  styleUrl: './selection-summary.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectionSummary {

  private readonly boxState = inject(BoxState);
  // Compute total of all selected Saltos
  readonly total$ = this.boxState.selections$.pipe(map(all => Object.values(all).reduce((total, salto) => total + salto.value, 0)))

  // Clear all selections
  clearAll() {
    this.boxState.clearSelections();
  }
}

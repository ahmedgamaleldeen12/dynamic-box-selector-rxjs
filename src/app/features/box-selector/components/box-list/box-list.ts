import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Box } from "../box/box";
import { BoxState } from '../../services/box-state';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-box-list',
  imports: [Box, AsyncPipe],
  templateUrl: './box-list.html',
  styleUrl: './box-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxList {
  private readonly boxState = inject(BoxState);
  
  readonly boxes$ = this.boxState.getBoxes$();

}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OptionSelector } from "./components/option-selector/option-selector";
import { BoxList } from "./components/box-list/box-list";
import { SelectionSummary } from "./components/selection-summary/selection-summary";

@Component({
  selector: 'app-box-selector',
  imports: [OptionSelector, BoxList, SelectionSummary],
  templateUrl: './box-selector.html',
  styleUrl: './box-selector.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxSelector {

}

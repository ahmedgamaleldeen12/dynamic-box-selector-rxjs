import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map, Observable, of, shareReplay, switchMap } from 'rxjs';
import { backSaltos, boxes, frontSaltos, Salto } from '../models/box.selector';

@Injectable({
  providedIn: 'root',
})
export class BoxState {

  // Key used to persist selections in localStorage
  private readonly STORAGE_KEY = 'box-selections';

  // -----------------------------
  // Active Box State
  // -----------------------------
  // Tracks the currently active box (null if none)
  private activeBoxSubject = new BehaviorSubject<string | null>(null);
  activeBox$ = this.activeBoxSubject.asObservable().pipe(
    shareReplay(1) // ensure all subscribers get the latest active box
  );

  // -----------------------------
  // Selections State
  // -----------------------------
  // Tracks the selected Salto for each box
  private selectionsSubject = new BehaviorSubject<Record<string, Salto>>(this.loadSelections());
  selections$ = this.selectionsSubject.asObservable().pipe(
    shareReplay(1) // allow multiple subscribers without re-emitting unnecessarily
  );

  // -----------------------------
  // Saltos (front/back) & Boxes
  // -----------------------------
  getFrontSaltos$(): Observable<Salto[]> {
    return of(frontSaltos); // always return the static array
  }

  getBackSaltos$(): Observable<Salto[]> {
    return of(backSaltos);
  }

  getBoxes$(): Observable<string[]> {
    return of(boxes);
  }

  // -----------------------------
  // Active Box API
  // -----------------------------
  setActiveBox(id: string | null) {
    // Update the currently active box
    this.activeBoxSubject.next(id);
  }

  getActiveBox$(): Observable<string | null> {
    // Expose observable for current active box
    return this.activeBox$;
  }

  // -----------------------------
  // Selection API
  // -----------------------------
  setSelection(boxId: string, salto: Salto) {
    // Set a Salto selection for a specific box
    const current = this.selectionsSubject.value;
    const updated = { ...current, [boxId]: salto };
    this.selectionsSubject.next(updated);
    this.saveSelections(updated); // persist to localStorage
  }

  getSelection$(boxId: string): Observable<Salto | null> {
    // Get the selection of a specific box as an observable
    return this.selections$.pipe(
      map(selections => selections[boxId] || null),
      distinctUntilChanged((prev, curr) => prev?.id === curr?.id) // emit only if ID changes
    );
  }

  getSelectionForActiveBox$(): Observable<Salto | null> {
    // Get selection for the currently active box
    return this.activeBox$.pipe(
      switchMap(id => (id ? this.getSelection$(id) : of(null))) // null-safe
    );
  }

  // -----------------------------
  // Navigation
  // -----------------------------
  moveToNextBox() {
    // Move active box to the next one
    const current = this.activeBoxSubject.value;
    if (!current) return; // nothing to do if no active box

    if (current !== boxes[boxes.length - 1]) {
      // Only move forward if not the last box
      const next = (parseInt(current, 10) + 1).toString();
      this.setActiveBox(next);
    }
 
  }

  // -----------------------------
  // Clearing selections
  // -----------------------------
  clearSelections() {
    // Clear all selections and deactivate active box
    this.selectionsSubject.next({});
    localStorage.removeItem(this.STORAGE_KEY);
    this.setActiveBox(null);
  }

  // -----------------------------
  // LocalStorage helpers
  // -----------------------------
  private saveSelections(selections: Record<string, Salto>) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(selections));
    } catch (e) {
      console.error('Failed to save selections', e);
    }
  }

  private loadSelections(): Record<string, Salto> {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load selections', e);
    }
    return {}; // return empty if not found or failed to parse
  }
}

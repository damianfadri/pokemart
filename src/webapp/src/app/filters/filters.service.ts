import { Injectable, signal } from "@angular/core";
import { Filters } from "./filters.model";

@Injectable({ providedIn: 'root' })
export class FiltersService {
  filters = signal<Filters>({});
}
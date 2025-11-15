import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters';

describe('Filters', () => {
  describe('toggle should', () => {
    it('add category when val is true and not in categories', () => {
      var fixture = 
        new SutBuilder()
          .withSelectedCategories([])
          .build();

      fixture.componentInstance.toggle('Category1', true);

      expect([...fixture.componentInstance.selectedCategories()])
      .toEqual(['Category1']);
    });

    it('do nothing when val is true and in categories', () => {
      var fixture = 
        new SutBuilder()
          .withSelectedCategories(['Category1'])
          .build();

      fixture.componentInstance.toggle('Category1', true);

      expect([...fixture.componentInstance.selectedCategories()])
      .toEqual(['Category1']);
    });

    it('remove category when val is false and in categories', () => {
      var fixture = 
        new SutBuilder()
          .withSelectedCategories(['Category1'])
          .build();

      fixture.componentInstance.toggle('Category1', false);

      expect([...fixture.componentInstance.selectedCategories()])
      .toEqual([]);
    });

    it('do nothing when val is false and not in categories', () => {
      var fixture = 
        new SutBuilder()
          .withSelectedCategories(['Category2'])
          .build();

      fixture.componentInstance.toggle('Category1', false);

      expect([...fixture.componentInstance.selectedCategories()])
      .toEqual(['Category2']);
    });
  });

  describe('toggled should', () => {
    it('return true if in categories', () => {
      var fixture = 
        new SutBuilder()
          .withSelectedCategories(['Category1'])
          .build();

      expect(fixture.componentInstance.toggled('Category1')).toBeTrue();
    });

    it('return false if not in categories', () => {
      var fixture = 
        new SutBuilder()
          .withSelectedCategories(['Category2'])
          .build();

      expect(fixture.componentInstance.toggled('Category1')).not.toBeTrue();
    });
  });

  describe('onApply should', () => {
    it('call filtersService.filters with the correct filter', () => {
      var fixture = 
        new SutBuilder()
          .withSelectedCategories(['Category1'])
          .build();

      spyOn(fixture.componentInstance.filtersService.filters, 'update');

      fixture.componentInstance.onApply();

      expect(fixture.componentInstance.filtersService.filters.update).toHaveBeenCalled();
    });
  });
});

class SutBuilder {
  private selectedCategories: string[] = [];

  withSelectedCategories(categories: string[]): SutBuilder {
    this.selectedCategories = categories;
    return this;
  }

  build(): ComponentFixture<FiltersComponent> {
    TestBed.configureTestingModule({
      imports: [FiltersComponent],
    });
    
    const fixture = TestBed.createComponent(FiltersComponent);

    fixture.componentInstance.selectedCategories.set(
      new Set<string>(this.selectedCategories)
    );

    return fixture;
  }
}

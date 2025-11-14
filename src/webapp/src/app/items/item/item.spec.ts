import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemComponent } from './item';
import { input } from '@angular/core';

describe('Item', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemComponent],

    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('name', 'Potion');
    fixture.componentRef.setInput('price', 300);
    fixture.componentRef.setInput('category', 'Potions');
    fixture.componentRef.setInput('description', 'Heals 20 HP');

    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('name should', () => {
    it('be rendered', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid=item-name]')?.textContent).toContain('Potion');
    });
  });

  describe('price should', () => {
    it('be rendered', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid=item-price')?.textContent).toContain('300');
    });
  });

  describe('category should', () => {
    it('be rendered', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid=item-category')?.textContent).toContain('Potions');
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemComponent } from './item';
import { input } from '@angular/core';
import { Item } from './item.model';

describe('Item', () => {
  describe('item should', () => {
    it('be initialized', () => {
      const fixture = new SutBuilder()
        .withName('Potion')
        .withPrice(300)
        .withCategory('Healing')
        .withDescription('Something')
        .build();

      fixture.detectChanges();

      expect(fixture.componentInstance.item().name).toBe('Potion');
    });

    it('render name', () => {
      const fixture = new SutBuilder()
        .withName('Potion')
        .withPrice(300)
        .withCategory('Healing')
        .withDescription('Heals 20 HP')
        .build();

      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid=item-name]')?.textContent).toContain('Potion');
    });

    it('render price', () => {
      const fixture = new SutBuilder()
        .withName('Potion')
        .withPrice(300)
        .withCategory('Healing')
        .withDescription('Heals 20 HP')
        .build();

      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid=item-price')?.textContent).toContain('300');
    });

    it('render category', () => {
      const fixture = new SutBuilder()
        .withName('Potion')
        .withPrice(300)
        .withCategory('Healing')
        .withDescription('Heals 20 HP')
        .build();

      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('[data-testid=item-category')?.textContent).toContain('Healing');
    });
  });

  describe('addToCart should', () => {
    it('call cartService.addItem with the correct item', async () => {
      const fixture = new SutBuilder()
        .withId('1')
        .withName('Potion')
        .withPrice(300)
        .build();

      spyOn(fixture.componentInstance.cartService, 'addItem');

      fixture.componentInstance.addToCart();

      expect(fixture.componentInstance.cartService.addItem)
        .toHaveBeenCalledWith({ 
          item: {
            id: '1',
            name: 'Potion',
            price: 300
          },
          quantity: 1, 
        });
    });
  });
});

class SutBuilder {
  private id: string = '1';
  private name: string = 'Potion';
  private price: number = 300;
  private category?: string;
  private description?: string;

  withId(id: string): SutBuilder {
    this.id = id;
    return this;
  }

  withName(name: string): SutBuilder {
    this.name = name;
    return this;
  }

  withPrice(price: number): SutBuilder {
    this.price = price;
    return this;
  }

  withCategory(category: string): SutBuilder {
    this.category = category;
    return this;
  }

  withDescription(description: string): SutBuilder {
    this.description = description;
    return this;
  }

  build() : ComponentFixture<ItemComponent> {
      TestBed.configureTestingModule({
      imports: [ItemComponent],
    });
    
    const fixture = TestBed.createComponent(ItemComponent);

    const item: Item = {
      id: this.id,
      name: this.name,
      price: this.price,
    };

    if (this.category) {
      item.category = this.category;
    }

    if (this.description) {
      item.description = this.description;
    }

    fixture.componentRef.setInput('item', item);

    return fixture;
  }
}

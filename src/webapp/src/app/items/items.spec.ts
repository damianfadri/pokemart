import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsComponent } from './items.component';
import { ItemsService } from './items.service';
import { Item } from './item/item.model';

describe('Items', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;

  const itemsService = jasmine.createSpyObj(ItemsService, ['getItems']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsComponent],
      providers: [
        { provide: ItemsService, useValue: itemsService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('items should', () => {
    it('get items', () => {

      const expected: Item[] = [
        { id: '1', name: 'Potion', price: 300 },
        { id: '2', name: 'Great Ball', price: 600 }
      ];

      itemsService.getItems
        .and.returnValue(
          Promise.resolve(expected));

      fixture.detectChanges();
      
      const actual = fixture.componentInstance.items.value() ?? [];

      expect([
        { id: '1', name: 'Potion', price: 300 },
        { id: '2', name: 'Great Ball', price: 600 }
      ]).toEqual(actual);
    });
  });
});

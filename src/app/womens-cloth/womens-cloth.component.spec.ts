import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomensClothComponent } from './womens-cloth.component';

describe('WomensClothComponent', () => {
  let component: WomensClothComponent;
  let fixture: ComponentFixture<WomensClothComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WomensClothComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WomensClothComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

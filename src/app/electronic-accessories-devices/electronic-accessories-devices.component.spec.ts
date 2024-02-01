import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicAccessoriesDevicesComponent } from './electronic-accessories-devices.component';

describe('ElectronicAccessoriesDevicesComponent', () => {
  let component: ElectronicAccessoriesDevicesComponent;
  let fixture: ComponentFixture<ElectronicAccessoriesDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElectronicAccessoriesDevicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElectronicAccessoriesDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

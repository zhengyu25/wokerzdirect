import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchDataUploadComponent } from './batch-data-upload.component';

describe('BatchDataUploadComponent', () => {
  let component: BatchDataUploadComponent;
  let fixture: ComponentFixture<BatchDataUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchDataUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchDataUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

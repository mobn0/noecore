import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Messageboard } from './messageboard';

describe('Messageboard', () => {
  let component: Messageboard;
  let fixture: ComponentFixture<Messageboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Messageboard],
    }).compileComponents();

    fixture = TestBed.createComponent(Messageboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

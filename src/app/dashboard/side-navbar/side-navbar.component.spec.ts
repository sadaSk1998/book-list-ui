import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideNavbarComponent } from './side-navbar.component';
import { navData } from 'src/app/shared/constants/app-constants-config';

describe('SideNavbarComponent', () => {
  let component: SideNavbarComponent;
  let fixture: ComponentFixture<SideNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideNavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SideNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize collapsed to true', () => {
    expect(component.collapsed).toBeTrue();
  });

  it('should initialize activeTab to 0', () => {
    expect(component.activeTab).toBe(0);
  });

  it('should set activeTab and collapse menu on menu click with id 1', () => {
    const mockNavData = { id: 1 };
    component.onMenuClick(mockNavData);

    expect(component.activeTab).toBe(1);
    expect(component.collapsed).toBeFalse(); // Should toggle collapse to false
  });

  it('should set activeTab and collapse menu on menu click with other id', () => {
    const mockNavData = { id: 2 };
    component.onMenuClick(mockNavData);

    expect(component.activeTab).toBe(2);
    expect(component.collapsed).toBeFalse(); // Should remain collapsed
  });

  it('should toggle collapsed when menu with id 1 is clicked twice', () => {
    const mockNavData = { id: 1 };

    // First click
    component.onMenuClick(mockNavData);
    expect(component.collapsed).toBeFalse(); // Should collapse

    // Second click
    component.onMenuClick(mockNavData);
    expect(component.collapsed).toBeTrue(); // Should un-collapse
  });
});

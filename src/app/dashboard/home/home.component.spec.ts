import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let apiService: jasmine.SpyObj<ApiService>;
  const mockResponse = {
    items: [
      {
        id: '1',
        volumeInfo: {
          title: 'Book Title 1',
          publisher: 'Publisher 1',
          publishedDate: '2021-01-01',
          authors: ['Author 1'],
        },
      },
    ],
  };
  beforeEach(() => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getDetails']);

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [{ provide: ApiService, useValue: apiServiceSpy }],
      imports: [HttpClientTestingModule, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    jasmine.clock().uninstall();
    jasmine.clock().install();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getBookDetails on init', () => {
    spyOn(component, 'getBookDetails').and.callThrough();
    apiService.getDetails.and.returnValue(of(mockResponse));
    component.ngOnInit();

    expect(component.getBookDetails).toHaveBeenCalled();
  });

  it('should fetch book details successfully', () => {
    apiService.getDetails.and.returnValue(of(mockResponse));
    component.getBookDetails();

    expect(component.bookArr.length).toBe(1);
    expect(component.bookArr[0].title).toBe('Book Title 1');
  });

  it('should handle API error', () => {
    apiService.getDetails.and.returnValue(throwError('Error fetching books'));
    component.getBookDetails();

    expect(component.errorMessage).toBe(
      'Currently we are experiencing technical issue, Please try again later.'
    );
  });

  it('should filter book details correctly', () => {
    // @ts-ignore
    component.bookAPIResponse = [
      {
        id: '1',
        title: 'CAT',
        authors: 'test',
        publishedDate: '2023/01/01',
        publisher: 'CAT org',
      },
      {
        id: '2',
        title: 'APD',
        authors: 'test',
        publishedDate: '2023/01/01',
        publisher: 'CAT org',
      },
    ];

    const inputEvent = {
      target: {
        value: 'CAT',
      },
    };
    component.filterBookDetails(inputEvent);
    jasmine.clock().tick(1000);
    expect(component.bookArr.length).toBe(1);
    expect(component.bookArr[0].title).toBe('CAT');
  });

  it('should unsubscribe on destroy', () => {
    spyOn(component['destroySub$'], 'next').and.callThrough();
    spyOn(component['destroySub$'], 'complete').and.callThrough();

    component.ngOnDestroy();

    expect(component['destroySub$'].next).toHaveBeenCalled();
    expect(component['destroySub$'].complete).toHaveBeenCalled();
  });
});

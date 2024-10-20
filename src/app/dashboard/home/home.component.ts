import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import {
  appEndpoints,
  common,
  errorConstants,
} from 'src/app/shared/constants/app.constants';
import {
  Book,
  BookDetails,
  GetBooksResponse,
} from 'src/app/shared/models/app.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroySub$ = new Subject<void>();
  private timer: any;
  errorMessage = '';
  noRecords = common.noRecords;
  private bookAPIResponse: Book[] = [];
  bookArr: Book[] = [];
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getBookDetails();
  }
  /**
   * get API to load books
   */
  getBookDetails() {
    this.apiService
      .getDetails(appEndpoints.getBooks)
      .pipe(takeUntil(this.destroySub$))
      .subscribe({
        next: (response: GetBooksResponse) => {
          response.items.forEach(
            (data: { volumeInfo: BookDetails; id: string }) => {
              this.bookArr.push({
                id: data.id,
                title: data.volumeInfo.title,
                publisher: data.volumeInfo.publisher,
                publishedDate: data.volumeInfo.publishedDate,
                authors: data.volumeInfo.authors.join('and'),
              });
            }
          );
          this.bookAPIResponse = [...this.bookArr];
        },
        error: (err) => {
          this.errorMessage = errorConstants.techError;
          console.log('error while fetching book details', err);
        },
      });
  }
  /**
   *
   * @param input
   * filtering data based on book title
   */
  filterBookDetails(inputVal: any) {
    console.log(inputVal);
    this.timer = setTimeout(() => {
      clearTimeout(this.timer);
      const arr = this.bookAPIResponse.filter((el) => {
        return el.title
          .toLowerCase()
          .includes(inputVal.target.value.toLowerCase());
      });
      console.log('arr', arr);
      this.bookArr = [...arr];
    }, 1000);
  }
  trackByBookId(index: number, item: Book) {
    return item.id;
  }
  ngOnDestroy(): void {
    this.destroySub$.next();
    this.destroySub$.complete();
  }
}

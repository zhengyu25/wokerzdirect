import { Component, Injectable, NgModule } from "@angular/core";
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from "@angular/material/paginator";
import { Subject, Subscription } from "rxjs";
import { DataService } from "../services";

@Injectable()
export class CustomPaginator implements MatPaginatorIntl {
  changes = new Subject<void>();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel = $localize`First page`;
  itemsPerPageLabel = $localize`Items per page:`;
  lastPageLabel = $localize`Last page`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = "Next page";
  previousPageLabel = "Previous page";

  page = {
    en: {
      page: "Page",
    },
    zh_CN: {
      page: "页数",
    },
  };

  lang: any = this.page[this._dataService.language];
  lang$: Subscription = new Subscription();

  constructor(private _dataService: DataService) {
    this.lang$ = this._dataService.language$.subscribe(
      (lang) => (this.lang = this.page[lang])
    );
  }

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return $localize` ${this.lang.page} 1/1`;
    }
    const amountPages = Math.ceil(length / pageSize);

    return $localize`${this.lang.page} ${page + 1}/${amountPages}`;
  }
}

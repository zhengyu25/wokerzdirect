import { Component, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { DataService, HttpService, LoggerService } from "app/services/index";
import { environment } from "env/environment";
import { Subscription } from "rxjs";
import { DialogChangePasswordComponent } from "../dialog-change-password/dialog-change-password.component";
import { DialogNewUserComponent } from "../dialog-new-user/dialog-new-user.component";
import { MatSort } from "@angular/material/sort";
import Swal from "sweetalert2";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent {
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  @ViewChild("paginator", { read: MatPaginator, static: false })
  paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pageSize = environment.pageSize;
  page = {
    en: {
      table: {
        filter: "Search",
        column: {
          placeholder: "Name",
          name: "Name",
          email: "Email",
          status: "Status",
          created_at: "Created At",
          action: "Action",
        },
      },
      button: {
        create: "New User",
        viewDetail: "View Detail",
        changePassword: "Change Password",
        delete: "Delete",
      },
      delete: {
        btn: {
          confirm: "Delete",
          cancel: "Cancel",
        },
        msg: {
          confirmation: "Are you sure to delete user [name] ?",
          success: "Delete Success",
        },
      },
      noRecords: "No Record Found",
    },
    zh_CN: {
      table: {
        filter: "搜索",
        column: {
          placeholder: "搜索",
          name: "Name",
          email: "Email",
          status: "Status",
          created_at: "Created At",
          action: "Action",
        },
      },
      button: {
        create: "Create",
        viewDetail: "View Detail",
        changePassword: "Change Password",
        delete: "Delete",
      },
      delete: {
        btn: {
          confirm: "Delete",
          cancel: "Cancel",
        },
        msg: {
          confirmation: "Are you sure to delete user [name] ?",
          success: "Delete Success",
        },
      },
      noRecords: "暂无资料",
    },
  };

  isLoadingResults: boolean = false;
  pageSizeOpt = environment.pageSizeOptions;

  lang: any = this.page[this._dataService.language];
  lang$: Subscription = new Subscription();

  // TAB TABLE COLUMN
  tableColumns = [
    {
      columnDef: "name",
      cell: (element: any) => `${element.name}`,
    },
    {
      columnDef: "email",
      cell: (element: any) => `${element.email}`,
    },
    {
      columnDef: "status",
      cell: (element: any) => `${element.status}`,
    },
    {
      columnDef: "created_at",
      cell: (element: any) => `${element.created_at}`,
    },
    {
      columnDef: "action",
      cell: (element: any) => `${element.action}`,
    },
  ];

  displayedColumns = this.tableColumns.map((c) => c.columnDef);
  endPoint = "user";

  constructor(
    private _router: Router,
    private _dataService: DataService,
    private _httpService: HttpService,
    private _toastr: ToastrService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.lang$ = this._dataService.language$.subscribe((lang) => {
      this.lang = this.page[lang];
    });

    this.getData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getData(page = 1, search = "", per_page = this.pageSize) {
    this.isLoadingResults = true;
    let $url = `${this.endPoint}?page=${page}&per_page=${per_page}&search=${search}`;

    this._httpService.get($url).subscribe(
      ({ data }) => {
        this.isLoadingResults = false;

        //Set DATA to DATA SOURCE
        this.dataSource.data = data;
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      },
      (err) => this._httpService.handleError(err)
    );
  }

  create() {
    let dialogRef = this._dialog.open(DialogNewUserComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getData();
      }
    });
  }

  viewDetail({ id }) {
    this._router.navigate(["users", id]);
  }

  deleteUser({ id, name }) {
    let selectedMsg = this.lang.delete;

    return Swal.fire({
      title: selectedMsg.msg.confirmation.replace("[name]", name),
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: selectedMsg.btn.confirm,
      cancelButtonText: selectedMsg.btn.cancel,
    }).then(async (result) => {
      if (result.isConfirmed) {
        this._httpService.post("user/delete", { id: id }).subscribe(
          (res) => this._toastr.success(selectedMsg.msg.success),
          (err) => this._httpService.handleError(err),
          () => this.getData()
        );
      }
    });
  }

  changePassword(data) {
    this._dialog.open(DialogChangePasswordComponent, {
      data: data,
    });
  }

  // TABLE FILTER
  applyFilter(ds: MatTableDataSource<any>, filterValue: string) {
    ds.filter = filterValue.trim().toLowerCase();

    if (ds.paginator) {
      ds.paginator.firstPage();
    }
  }

  // TABLE PAGE PAGINATOR
  onPageChange(ds: MatTableDataSource<any>, page) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    // this.getData(page.pageIndex + 1, "");
  }
}

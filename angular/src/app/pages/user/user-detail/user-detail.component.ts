import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { DataService, HttpService, LoggerService } from "app/services/index";
import { environment } from "env/environment";
import { map, Subscription } from "rxjs";
import { DialogUpdateUserComponent } from "../dialog-update-user/dialog-update-user.component";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.scss"],
})
export class UserDetailComponent implements OnInit {
  id = null;
  data = null;

  page = {
    en: {
      tabMenus: {
        profile: "Profile",
        strategy: "Strategy",
        position: "Position",
      },
      suspend: {
        btn: {
          confirm: "Suspend",
          cancel: "Cancel",
        },
        msg: {
          confirmation: "Confirm to suspend user ?",
          success: "User Suspend Success",
        },
      },
      unsuspend: {
        btn: {
          confirm: "Active",
          cancel: "Cancel",
        },
        msg: {
          confirmation: "Confirm to active user ?",
          success: "User Active Success",
        },
      },
      button: {
        update: "Edit",
        suspend: "Suspend",
        active: "Active",
      },
      noRecords: "No Record Found",
    },
    zh_CN: {
      tabMenus: {
        profile: "Profile",
        strategy: "Strategy",
        position: "Position",
      },
      button: {
        update: "Edit",
      },
      noRecords: "No Record Found",
    },
  };

  tabMenus = ["profile"];
  selectedTab = this.tabMenus[0];

  lang: any = this.page[this._dataService.language];
  lang$: Subscription = new Subscription();

  constructor(
    private _dataService: DataService,
    private _httpService: HttpService,
    private _activatedRoute: ActivatedRoute,
    private _dialog: MatDialog,
    private _toastr: ToastrService
  ) {
    this.lang$ = this._dataService.language$.subscribe((lang) => {
      this.lang = this.page[lang];
    });
    this.selectedTab = this.tabMenus[0];
    this.id = this._activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this._httpService.get(`user/${this.id}`).subscribe(
      ({ data }) => {
        this.data = data;
        LoggerService.log(data, "user details");
      },
      (err) => this._httpService.handleError(err)
    );
  }

  updateUser() {
    let dialogRef = this._dialog.open(DialogUpdateUserComponent, {
      data: this.data,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getData();
      }
    });
  }

  suspendUser() {
    let selectedMsg = this.lang.suspend;

    return Swal.fire({
      title: selectedMsg.msg.confirmation,
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: selectedMsg.btn.confirm,
      cancelButtonText: selectedMsg.btn.cancel,
    }).then(async (result) => {
      if (result.isConfirmed) {
        this._httpService
          .post(`user/suspend`, { id: this.data.id })
          .subscribe(
            ({ data }) => {
              this._toastr.success(selectedMsg.msg.success);
              this.getData();
            },
            (err) => this._httpService.handleError(err)
          );
      }
    });
  }

  unsuspendUser() {
    let selectedMsg = this.lang.unsuspend;

    return Swal.fire({
      title: selectedMsg.msg.confirmation,
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: selectedMsg.btn.confirm,
      cancelButtonText: selectedMsg.btn.cancel,
    }).then(async (result) => {
      if (result.isConfirmed) {
        this._httpService
          .post(`user/unsuspend`, { id: this.data.id })
          .subscribe(
            ({ data }) => {
              this._toastr.success(selectedMsg.msg.success);
              this.getData();
            },
            (err) => this._httpService.handleError(err)
          );
      }
    });
  }
}

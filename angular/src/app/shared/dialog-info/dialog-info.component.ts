import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { DataService } from "app/services";
import { Subscription } from "rxjs";

@Component({
  selector: "app-dialog-info",
  templateUrl: "./dialog-info.component.html",
  styleUrls: ["./dialog-info.component.scss"],
})
export class DialogInfoComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dataService: DataService
  ) {}

  page = {
    en: {
      btn: {
        close: "Close",
        cancel: "Cancel",
      },
    },
    zh_CN: {
      btn: {
        close: "关闭",
        cancel: "取消",
      },
    },
  };

  lang: any = this.page[this._dataService.language];
  lang$: Subscription = new Subscription();

  title = this.data.title || "";
  subtitle = this.data.subtitle || "";
  infos = this.data.infos || [];
  image = this.data.img ?? null;

  btn = this.lang.btn[this.data.closeBtn] ??  this.lang.btn.close;

  ngOnInit(): void {
    this.dialogRef.disableClose = this.data.disableClose ?? true;
  }
}

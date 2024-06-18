import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-custom-alert",
  templateUrl: "./custom-alert.component.html",
  styleUrls: ["./custom-alert.component.css"]
})
export class CustomAlertComponent implements OnInit {
  @Input() alertClass: string;
  @Input() alertMessage: any;
  message: any;

  constructor() {}

  ngOnInit() {
    if (Array.isArray(this.alertMessage)) {
      this.message = "";
      this.alertMessage.forEach(msg => {
        this.message += `<li>${msg}</li>`;
      });
    } else {
      this.message = this.alertMessage;
    }
  }
}

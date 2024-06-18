import { Component, OnInit } from "@angular/core";
import { environment } from "env/environment";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent implements OnInit {
  today: Date = new Date();
  project = environment.project;

  constructor() {}

  ngOnInit() {}
}

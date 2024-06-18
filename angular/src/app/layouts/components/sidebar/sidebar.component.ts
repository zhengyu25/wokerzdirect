import { Component, OnInit } from "@angular/core";
import { environment } from "env/environment";
import { MenuRoutes } from "./menuItems";


@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  project = environment.project;
  public MenuRoutes: any[] = MenuRoutes;
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.project.title = 'WorkerzDIRECT'
    this.menuItems = MenuRoutes.filter((menuItem) => menuItem);
  }
}

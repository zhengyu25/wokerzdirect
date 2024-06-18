import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DataService {
  lang = ["en", "zh"];
  language$ = new Subject<string>();

  constructor() {}

  // Bearer Token
  get accessToken() {
    return localStorage.getItem("token");
  }

  set accessToken(token) {
    localStorage.setItem("token", token || null);
  }

  removeToken(): void {
    localStorage.removeItem("token");
  }

  set language(lang) {
    this.language =
      this.lang.find((item) => localStorage.getItem("language") == item) ||
      "en";

    localStorage.setItem("language", this.language);
    this.language$.next(lang);
  }

  get language() {
    return localStorage.getItem("language") || 'en';
  }
}

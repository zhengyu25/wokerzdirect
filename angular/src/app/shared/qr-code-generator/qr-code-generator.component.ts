import { Component, OnInit, Input } from "@angular/core";
import { HttpService } from "../../services/index";
import { environment } from "env/environment";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-qr-code-generator",
  templateUrl: "./qr-code-generator.component.html",
  styleUrls: ["./qr-code-generator.component.scss"],
})
export class QrCodeGeneratorComponent implements OnInit {
  @Input() content: string = "";
  @Input() imagePath: string = "";
  @Input() mode: string = "text";
  @Input() copyLink: boolean = false;

  imageToShow: any;

  constructor(
    private _snackBar: MatSnackBar,
    private _httpService: HttpService
  ) {}

  ngOnInit(): void {
    console.log(this.content);
    if (this.mode == "image") {
      this.imagePath = environment.project.logo || this.imagePath;
      this.getImageFromService(this.imagePath);
    }

    console.log(this.content);
  }

  openSnackBar() {
    this._snackBar.open("Copied", "", {
      duration: 2000,
    });
  }

  getImageFromService(image) {
    this._httpService.getImage(image).subscribe(
      (data) => {
        this.createImageFromBlob(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        this.imageToShow = reader.result;
        this.imageToShow = this.imageToShow.replace(
          "data:image/png;base64,",
          ""
        );
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}

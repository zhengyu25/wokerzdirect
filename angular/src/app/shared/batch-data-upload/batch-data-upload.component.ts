import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-batch-data-upload",
  templateUrl: "./batch-data-upload.component.html",
  styleUrls: ["./batch-data-upload.component.scss"],
})
export class BatchDataUploadComponent implements OnInit {
  data: any = [];

  constructor() {}

  ngOnInit(): void {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const fileReader: FileReader = new FileReader();

    fileReader.onload = (e) => {
      const fileContent = fileReader.result as string;
      const rows = fileContent.split("\n"); // Split the content into rows

      // console.log(fileContent); // Output the file content to the console or process it as desired

      rows.forEach((row) => {
        // console.log(row); // Output each row to the console or process it as desired
        if (row) {
          this.data.push({
            code: row.substring(0, 8).trim(),
            desc: row.substring(8).trim(),
          });
        }
      });
      console.log(this.data);
    };

    fileReader.readAsText(file);
  }
}

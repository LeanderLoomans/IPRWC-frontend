import {NgModule} from "@angular/core";
import {WarningDialogComponent} from "./dialogs/warning-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    WarningDialogComponent
  ],
  imports: [
    MatDialogModule,
    MatButtonModule

  ],
  exports: [

  ]
})

export class SharedModule {}

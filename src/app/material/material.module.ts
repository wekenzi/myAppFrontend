import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { 
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatBadgeModule,
  MatCardModule,
  MatDialogModule,
  MatSelectModule,
  MatRadioModule,
  MatInputModule,
  MatTabsModule,
  MatChipsModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatMenuModule,
  MatCheckboxModule,
 } from '@angular/material'

const MaterialComponents = [
  MatToolbarModule,
  MatIconModule,
  MatChipsModule,
  MatSidenavModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatListModule,
  MatButtonModule,
  MatBadgeModule,
  MatDialogModule,
  MatInputModule,
  MatCardModule,
  MatSelectModule,
  MatRadioModule,
  MatTabsModule,
  MatMenuModule,
  MatFormFieldModule,
  DragDropModule,
  MatCheckboxModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }

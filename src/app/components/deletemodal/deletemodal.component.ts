import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-deletemodal',
  templateUrl: './deletemodal.component.html',
  styleUrls: ['./deletemodal.component.css']
})
export class DeletemodalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public injectedData:any,
    private deleteModal:MatDialogRef<DeletemodalComponent>
  ) { }

  ngOnInit() {
  }

  cancel(){
    this.deleteModal.close(null);
  }

  delete(){
    this.deleteModal.close(true);
  }

}

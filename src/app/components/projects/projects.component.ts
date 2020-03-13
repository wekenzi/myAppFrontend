import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FreelancersmodalComponent } from 'src/app/components/freelancersmodal/freelancersmodal.component';
import { GetTime, StringToDate } from 'src/app/globals';
import { Project } from 'src/app/classes/project';
import { ProjectService } from 'src/app/services/project.service';
import { DeletemodalComponent } from 'src/app/components/deletemodal/deletemodal.component';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private freelancerModal:MatDialog,
    private deleteModal:MatDialog,
    private projectService:ProjectService,
    private toastr: ToastrService,
    ) { }

  projects=[];
  loadingOverlay=true;
  listShow=true;
  currentProject = new Project;
  searchFilter='';
  
  // Form Validators
  nameError=false;
  freelancersError=false;
  durationError=false;
  // ============

  ngOnInit() {
    this.projectService.GetList()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data=>{
      console.log(data);
      this.projects = data;
      this.loadingOverlay = false;
    })
  }

  onlyNumbers(event){
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;  
  }

  // Add Shift
  addProject(){
    this.currentProject = new Project;
    this.nameError=false;
    this.freelancersError=false;
    this.durationError=false;
    this.listShow = false;
  }

  // Back To List
  backToList(){
    this.currentProject = new Project;
    this.listShow = true;
  }

  // Employees Modal 
  openFreelancersModal(){
    let matDialog = new MatDialogConfig();
    matDialog.disableClose = true;
    matDialog.width="90%";
    matDialog.data=this.currentProject.freelancers;
    this.freelancerModal.open(FreelancersmodalComponent,matDialog)
    .afterClosed().subscribe(res=>{
      if(res == null || res == undefined){
        return false
      }else{
        while (this.currentProject.freelancers.length > 0) {
          this.currentProject.freelancers.pop();
        }
        if(res.length == 0){
          this.freelancersError = true;
        }else{
          this.freelancersError = false;
          this.currentProject.freelancers = res.map(emp => emp._id);
        }
        
        console.log(res);
      }
    });
  }

  //Submit Shift
  submitShift(){
    if(!this.currentProject.name){this.nameError = true;}else{this.nameError = false;}
    if(!this.currentProject.duration){this.durationError = true;}else{this.durationError = false;}
    if(this.currentProject.freelancers.length == 0){this.freelancersError = true;}else{this.freelancersError = false;}
    if(this.nameError == false&&this.freelancersError == false&&this.durationError == false){
      this.loadingOverlay = true;
      if(this.currentProject._id != null){
        this.projectService.Edit(this.currentProject,this.currentProject._id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data:any)=>{
          console.log(data);
          this.projects.forEach(project=> {
            if(data._id == project._id){
              project.name = data.name;
              project.desc = data.desc;
              project.duration = data.duration;
              project.freelancers = data.freelancers;
            }
          });
          this.loadingOverlay = false;
          this.toastr.success('Project has been edited', 'Success');
          this.backToList();
        },err=>{
          console.log(err);
          this.toastr.error(err.error.message, 'Failed');
        })
      }else{ 
        this.projectService.Add(this.currentProject)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data:any)=>{
          console.log(data);
          this.projects.unshift(data);
          this.loadingOverlay = false;
          this.toastr.success('Project has been added', 'Success');
          this.backToList();
        },err=>{
          console.log(err);
          this.toastr.error(err.error.message, 'Failed');
        })
      }
      
    }
  }

  editItem(_id){
    this.loadingOverlay = true;
    this.projectService.Get(_id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
      console.log(data);
      this.currentProject = data;
      this.loadingOverlay = false;
      this.listShow = false;
    })
  }

  deleteItem(_id){
    let matDialog = new MatDialogConfig();
    matDialog.disableClose = true;
    matDialog.maxWidth="350px";
    this.deleteModal.open(DeletemodalComponent,matDialog)
    .afterClosed().subscribe(res=>{
      if(res == null || res == undefined){
        return false
      }else{
        this.loadingOverlay = true;
        this.projectService.Delete(_id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data:any)=>{
          this.projects.forEach(project => {
            if(data._id == project._id){
              this.projects.splice(this.projects.indexOf(project), 1);
            }
          });
          this.loadingOverlay = false;
          this.toastr.success('Project has been deleted', 'Success');
        },err=>{
          console.log(err);
          this.toastr.error(err.error.message, 'Failed');
        })        
      }
    });
    
  }




}

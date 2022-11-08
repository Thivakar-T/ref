import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { MasterService } from 'src/app/services/master.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
declare let $: any;

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.scss'],
})
export class MaterialListComponent implements OnInit {
  masters: any = [];
  submitted = false;
  error = '';
  buttonText: string = '';
  projectObj: any;
  subjectSubmitted = false;
  result: any;
  id: any;
  masterid: any;
  editdata: any;
  masterObj: any = {};
  list: any = [];
  acceptSubmitted = false;
  // master:any =[];
  content: any;
  masterForm: FormGroup | any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public toast: ToastrService,
    private router: Router,
    private modalService: NgbModal,
    private service: MasterService,
    private spinner: NgxSpinnerService
  ) {
    this.masterid = this.route.snapshot.paramMap.get('id');
    if (this.masterid != null) {
      this.editBatch(this.list, this.content);
      this.acceptSubmitted = true;
    }
  }

  ngOnInit(): void {
    this.masterForm = this.formBuilder.group({
      description: ['', Validators.required],
      name: ['', Validators.required],
      id: [''],
    });
    console.log('came to master page');
    this.getMasterList();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.masterForm.controls;
  }

  openMaterial(content: any) {
    this.buttonText = 'Submit';
    // this.projectAssignForm.reset({});
    this.projectObj = {};
    this.subjectSubmitted = false;
    this.modalService.open(content, { size: 'lg' });
  }

  getMasterList() {
    this.spinner.show();
    $('#emplist').DataTable().clear().destroy();
    this.service
      .getMaster()
      .pipe(first())
      .subscribe(
        (responce) => {
          console.log(responce);
          this.masters = responce;
          this.masters = this.masters.data;
          console.log(this.masters);
          $(document).ready(function () {
            $('#emplist').DataTable({
              iDisplayLength: 30,
              lengthMenu: [10, 25, 30, 50, 100],
            });
          });
          this.spinner.hide();
        },
        (err) => {
          if (err.error.error.reason) {
            this.toast.error(err.error.error.reason);
          }
          this.spinner.hide();
        }
      );
  }

  getMaster(model: any) {
    this.spinner.show();
    function pad(n: any) {
      return n < 10 ? '0' + n : n;
    }
    console.log(this.masterForm.value);
    if (this.masters.id) {
      console.log(this.masters.id);
      this.masterForm.value.id = this.masters.id;
      this.service
        .updateMasterById(this.masterForm.value)
        .pipe(first())
        .subscribe(
          (res) => {
            console.log(res);
            this.result = res;
            this.getMasterList();
            model.dismiss('Cross click');
            this.spinner.hide();
            this.toast.success(this.result.data);
          },
          (err) => {
            // this.spinner.hide();
            model.dismiss('Cross click');
            if (err.error.error.reason) {
              this.toast.error(err.error.error.reason);
              model.dismiss('Cross click');
            }
          }
        );
    } else {
      this.spinner.show();
      console.log(this.masterForm.value);
      this.submitted = true;
      this.service.saveMaster(this.masterForm.value).subscribe(
        (responce) => {
          console.log(responce);
          this.result = responce;
          this.getMasterList();
          model.dismiss('Cross click');
          this.toast.success(this.result.data);
          this.router.navigateByUrl('/dashboard/MaterialType');
          this.spinner.hide();
        },
        (err) => {
          if (err.error.error.reason) {
            this.toast.error(err.error.error.reason);
            this.spinner.hide();
          }
        }
      );
    }
  }

  editBatch(master: any, content: any) {
    this.spinner.show();
    console.log(master.id);
    this.buttonText = 'Update';
    this.subjectSubmitted = false;
    this.service
      .getMasterById(master.id)
      .pipe(first())
      .subscribe(
        (res) => {
          this.masterForm = res;
          this.masterForm = this.masterForm.data;
          this.masterForm = this.formBuilder.group({
            description: this.masterForm.description,
            name: this.masterForm.name,
            id: this.masterForm.id,
          });
          this.spinner.hide();
        },
        (err) => {
          if (err.error.error.reason) {
            this.toast.error(err.error.error.reason);
          }
        }
      );
    this.modalService.open(content, { size: 'lg' });
  }

  delete(id: any) {
    this.spinner.show();
    if (confirm('Do you want romove data')) {
      this.service.deleteMasterById(id).subscribe(
        (responce) => {
          this.getMasterList();
          this.result = responce;
          this.toast.success(this.result.data);
        },
        (err) => {
          if (err.error.error.reason) {
            this.toast.error(err.error.error.reason);
            this.spinner.hide();
          }
        }
      );
    }
  }
}

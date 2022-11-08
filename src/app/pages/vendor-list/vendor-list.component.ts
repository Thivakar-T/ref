import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { VendorService } from 'src/app/services/vendor.service';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
declare let $: any;

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss'],
})
export class VendorListComponent implements OnInit {
  vendors: any = [];
  result: any = {};
  constructor(
    private service: VendorService,
    private http: HttpClient,
    private toast: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    console.log('came to Vendor page');
    this.getVendorList();
  }
  getVendorList() {
    this.spinner.show();
    $('#emplist').DataTable().clear().destroy();
    console.log('came to manager page');
    this.service.getVendor().subscribe(
      (responce) => {
        this.vendors = responce;
        this.vendors = this.vendors.data;
        this.spinner.hide();
        $(document).ready(function () {
          $('#emplist').DataTable({
            iDisplayLength: 30,
            lengthMenu: [10, 25, 30, 50, 100],
          });
        });
      },
      (err) => {
        if (err.error.error.reason) {
          this.toast.error(err.error.error.reason);
          this.spinner.hide();
        }
      }
    );
  }

  delete(id: any) {
    this.spinner.show();
    console.log(id);
    if (confirm('Do you want romove data')) {
      this.service.deleteVendor(id).subscribe((responce) => {
        this.result = responce;
        this.getVendorList();
        this.spinner.hide();
        this.toast.success(this.result.data);
      });
    }
  }
}

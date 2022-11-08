import { Component, OnInit, ViewChild } from '@angular/core';
import { MENU } from '../Menu';
import { MenuItem } from '../menu.module';
import { Router, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuItems: any = [];
  subItemsArr: any = [];
  parentId: any;
  item: any;
  routerUrl: any;
  name:any={}
  title = 'construction-management';

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  constructor(private router: Router, private observer: BreakpointObserver,
    private service:AuthService) { }

  ngOnInit(): void {
    this.menuItems = MENU;
    console.log(this.menuItems);
    this.item = {};
    this.name = this.service.getName();
console.log(name)
    for (let list of this.menuItems) {
      if (list.link) {
        if (list.link == this.router.url) {
          this.item = list;
        }
      } else {
        for (let listItem of list.subItems) {
          if (listItem.link == this.router.url) {
            this.item = list;
          }
        }
      }
    }
    this.enableSubItem(this.item);
    this.router.navigate(['/' + this.router.url]);
  }
  enableSubItem(item: any) {
    this.parentId = '';
    this.subItemsArr = [];
    this.subItemsArr = item.subItems;
    if (item.subItems != undefined) {
      this.router.navigate(['/' + this.subItemsArr[0].link]);
      this.parentId = this.subItemsArr[0].parentId;
    } else {
      this.parentId = '';
    }
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width:800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }
  }



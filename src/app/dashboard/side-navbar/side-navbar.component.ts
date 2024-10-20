import { Component, OnInit } from '@angular/core';
import { navData } from 'src/app/shared/constants/app-constants-config';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss'],
})
export class SideNavbarComponent implements OnInit {
  collapsed = true;
  activeTab: number = 0;
  navData = navData;
  constructor() {}

  ngOnInit(): void {}
  /**
   * 
   * @param navData 
   */
  onMenuClick(navData: any) {
    this.activeTab = navData.id;
    if (navData.id === 1) {
      this.collapsed = !this.collapsed;
    } else {
      this.collapsed = false;
    }
  }
}

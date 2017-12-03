import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-nav-logo',
  templateUrl: './header-nav-logo.component.html',
  styleUrls: ['./header-nav-logo.component.less']
})
export class HeaderNavLogoComponent {

  @Input() text: string;
  @Input() color: string;

}

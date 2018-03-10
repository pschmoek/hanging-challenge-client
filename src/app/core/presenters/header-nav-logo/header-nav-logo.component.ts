import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-nav-logo',
  templateUrl: './header-nav-logo.component.html',
  styleUrls: ['./header-nav-logo.component.less']
})
export class HeaderNavLogoComponent {

  @Input() text: string|undefined;
  @Input() color: string|undefined;
  @Input() isActive: string|undefined;

}

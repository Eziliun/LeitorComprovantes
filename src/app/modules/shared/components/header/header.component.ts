import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @ViewChild('op')
  overlayPanel!: OverlayPanel;

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
    if (this.overlayPanel) {
      this.overlayPanel.hide();
    }
  }
}
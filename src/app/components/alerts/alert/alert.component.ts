import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsService } from '../../../services/alerts.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  @Input() alert: any;
  @Output() alertDeleted = new EventEmitter<number>(); 

  private alertsService = inject(AlertsService);


  /**
   * toggleAlert
   * Toggles the active state of the alert and updates it in the service.
   */
  toggleAlert() {
    this.alertsService.toggleAlert(this.alert.id).subscribe(() => {
      this.alert.active = !this.alert.active;
    });
  }

  /**
   * deleteAlert
   * Deletes the alert and emits the alert ID to the parent component.
   */
  deleteAlert() {
    this.alertsService.deleteAlert(this.alert.id).subscribe(() => {
      this.alertDeleted.emit(this.alert.id);
    });
  }
}

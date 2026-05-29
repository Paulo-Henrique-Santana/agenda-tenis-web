import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Card } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { EmailLogApiService } from './services/email-log-api.service';

@Component({
  selector: 'app-email-log',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TableModule, DatePipe, Card, Tag],
  templateUrl: './email-log.page.html',
  styleUrl: './email-log.page.scss',
})
export class EmailLogPage {
  private readonly emailLogApi = inject(EmailLogApiService);

  readonly emailLogs = toSignal(this.emailLogApi.findAll(), { initialValue: [] });
}

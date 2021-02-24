import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'resilia-notifications-client-user',
  template: `
    <p>
      client-user works!
    </p>
  `,
  styleUrls: ['./client-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientUserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

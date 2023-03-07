import { Component } from '@angular/core';

@Component({
  selector: 'app-styles',
  templateUrl: './styles.component.html',
  styleUrls: ['./styles.component.scss'],
})
export class StylesComponent {
  public titles: any = [
    {
      class: 'title',
      content: 'h1 title',
    },
  ];
  public margin = [
    'mt-1',
    'mt-2',
    'mt-3',
    'mt-4',
    'mt-5',
    'mt-6',
    'mt-7',
    'mt-8',
    'mt-9',
    'mt-10',
    'mt-11',
    'mt-12',
  ];

  public buttons: any = [
    {
      class: 'btn btn-primary',
      content: 'Primary',
    },
    {
      class: 'btn btn-secondary',
      content: 'Secondary',
    },
    {
      class: 'btn btn-accent',
      content: 'Accent',
    },
    {
      class: 'btn btn-success',
      content: 'Success',
    },
    {
      class: 'btn btn-danger',
      content: 'Danger',
    },
    {
      class: 'btn btn-warning',
      content: 'Warning',
    },
    {
      class: 'btn btn-light',
      content: 'Light',
    },
    {
      class: 'btn btn-info',
      content: 'Info',
    },
  ];
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-third-step',
  templateUrl: './third-step.component.html',
  styleUrls: ['./third-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThirdStepComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

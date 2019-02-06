import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-third-step',
  templateUrl: './third-step.component.html',
  styleUrls: ['./third-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThirdStepComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {
  }

  async onFinish() {
    await this.router.navigate(['../../'], {relativeTo: this.route});
  }

  async onBack() {
    await this.location.back();
  }

}

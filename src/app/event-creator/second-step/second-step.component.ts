import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecondStepComponent implements OnInit {

  constructor(private router: Router,
              private location: Location,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  async onNext() {
    await this.router.navigate(['../third'], {relativeTo: this.route});
  }

  async onBack() {
    this.location.back();
  }

  async onCancel() {
    this.location.back();
    this.location.back();
  }

}

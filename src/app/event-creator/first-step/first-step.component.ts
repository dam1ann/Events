import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirstStepComponent implements OnInit {


  constructor(private router: Router,
              private location: Location,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  async onNext() {
    await this.router.navigate(['../second'], {relativeTo: this.route});
  }

  async onCancel() {
    this.location.back();
  }
}

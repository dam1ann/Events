import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalTemplate, SuiModalService, TemplateModalConfig } from 'ng2-semantic-ui';

export interface IContext {
  data: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('modalTemplate')
  private modalTemplate: ModalTemplate<IContext, string, string>;

  constructor(private modalService: SuiModalService) {
  }

  ngOnInit() {
  }

  public open(dynamicContent: string = '') {
    const config = new TemplateModalConfig(this.modalTemplate);

    config.size = 'tiny';

    this.modalService.open(config);
  }

}

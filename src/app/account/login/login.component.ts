import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ModalTemplate, SuiModalService, TemplateModalConfig } from 'ng2-semantic-ui';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../core/models/user.interface';

import * as userActions from '../../core/store/user/user.actions';
import { tap } from 'rxjs/operators';
import { ActiveModal } from 'ng2-semantic-ui/dist';

export interface IContext {
  data: string;
}

interface AppState {
  user: User;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  user$: Observable<User>;

  @ViewChild('modalTemplate')
  private modalTemplate: ModalTemplate<IContext, string, string>;
  private modal: ActiveModal<any, any, any>;

  constructor(private modalService: SuiModalService,
              private userStore: Store<AppState>) {

  }

  ngOnInit() {
    this.user$ = this.userStore.select('user')
      .pipe(tap(user => {
        if (user.uid) {
          this.modal.destroy();
        }
      }));
  }

  loginGoogle() {
    this.userStore.dispatch(new userActions.GoogleLogin());
  }

  loginFacebook() {
    this.userStore.dispatch(new userActions.FacebookLogin());
  }


  open(dynamicContent: string = '') {
    const config = new TemplateModalConfig(this.modalTemplate);

    config.size = 'mini';

    this.modal = this.modalService.open(config);
  }

}

import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { UserEffects } from './store/user/user.effects';
import { environment } from '../../environments/environment';
import { reducers } from './store';
import { EventsService, FiltersService, NavigationService } from './services';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  imports: [
    HttpClientModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([UserEffects]),

  ],
  providers: [
    NavigationService,
    EventsService,
    FiltersService
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: []
    };
  }
}

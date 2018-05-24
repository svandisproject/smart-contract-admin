import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {appRoutes} from './app.routes';
import {AppCommonModule} from './common/AppCommonModule';
import {ContractsAdminModule} from './contractsAdmin/ContractsAdminModule';

@NgModule({
    imports: [
        AppCommonModule,
        ContractsAdminModule,
        RouterModule.forRoot(
            appRoutes,
            {enableTracing: true}
        ),
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

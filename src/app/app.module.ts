import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { MainComponent } from './routes/main/main.component';
import { WhitelistComponent } from './routes/whitelist/whitelist.component';
import { BalancesComponent } from './routes/balances/balances.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import {SvandisSaleService, Web3Service} from '../services/services'

const SERVICES = [
  SvandisSaleService,
  Web3Service,
]

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes, 
      { enableTracing: true }
    ),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    MainComponent,
    WhitelistComponent,
    BalancesComponent
  ],
  providers: [SERVICES],
  bootstrap: [AppComponent]
})
export class AppModule { }

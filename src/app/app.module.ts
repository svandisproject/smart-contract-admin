import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { MainComponent } from './routes/main/main.component';
import { WhitelistComponent } from './routes/whitelist/whitelist.component';
import { BalancesComponent } from './routes/balances/balances.component';
import { RouterModule, Routes } from '@angular/router';
import {SvandisSaleService, Web3Service} from '../services/services'

const appRoutes: Routes = [
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: 'home', component: MainComponent },
  { path: 'whitelist', component: WhitelistComponent },
  { path: 'balances', component: BalancesComponent },
];

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

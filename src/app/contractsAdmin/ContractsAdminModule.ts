import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ContractAdminRouteConfig} from './ContractsAdminRouteConfig';
import {WhitelistComponent} from './whitelist/whitelist.component';
import {SwitchTiersComponent} from './switchTiers/switchTiers.component';
import {SetRatesComponent} from './setRates/setRates.component';
import {BalancesComponent} from './balances/balances.component';
import {HomeComponent} from './home/HomeComponent';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(ContractAdminRouteConfig)
    ],
    declarations: [
        WhitelistComponent,
        HomeComponent,
        SwitchTiersComponent,
        SetRatesComponent,
        BalancesComponent
    ]
})
export class ContractsAdminModule {
}

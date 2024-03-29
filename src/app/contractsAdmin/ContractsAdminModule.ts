import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ContractAdminRouteConfig} from './ContractsAdminRouteConfig';
import {CompanyWhitelistComponent} from './companyWhitelist/companyWhitelist.component';
import {WhitelistComponent} from './whitelist/whitelist.component';
import {SwitchTiersComponent} from './switchTiers/switchTiers.component';
import {WithdrawComponent} from './withdraw/withdraw.component';
import {SetRatesComponent} from './setRates/setRates.component';
import {BalancesComponent} from './balances/balances.component';
import {HomeComponent} from './home/home.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(ContractAdminRouteConfig)
    ],
    declarations: [
        HomeComponent,
        WhitelistComponent,
        CompanyWhitelistComponent,
        SwitchTiersComponent,
        SetRatesComponent,
        BalancesComponent,
        WithdrawComponent
    ]
})
export class ContractsAdminModule {
}

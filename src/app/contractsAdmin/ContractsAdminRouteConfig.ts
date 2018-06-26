import {Route} from '@angular/router';
import {WhitelistComponent} from './whitelist/whitelist.component';
import {WhitelistComponent} from './companyWhitelist/companyWhitelist.component';
import {SetRatesComponent} from './setRates/setRates.component';
import {BalancesComponent} from './balances/balances.component';
import {SwitchTiersComponent} from './switchTiers/switchTiers.component';
import {WithdrawComponent} from './withdraw/withdraw.component';
import {HomeComponent} from './home/home.component';
import {Web3AccountResolver} from '../common/sales/Web3AccountResolver';

export const ContractAdminRouteConfig: Route[] = [
    {path: 'home', component: HomeComponent},
    {path: 'whitelist', component: WhitelistComponent, resolve: {accounts: Web3AccountResolver}},
    {path: 'companyWhitelist', component: CompanyWhitelistComponent, resolve: {accounts: Web3AccountResolver}},
    {path: 'balances', component: BalancesComponent, resolve: {accounts: Web3AccountResolver}},
    {path: 'setRates', component: SetRatesComponent, resolve: {accounts: Web3AccountResolver}},
    {path: 'switchTiers', component: SwitchTiersComponent, resolve: {accounts: Web3AccountResolver}},
    {path: 'withdraw', component: WithdrawComponent, resolve: {accounts: Web3AccountResolver}},
];

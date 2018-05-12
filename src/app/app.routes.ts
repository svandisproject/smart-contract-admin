import {Route} from "@angular/router";
import { MainComponent } from './routes/main/main.component';
import { WhitelistComponent } from './routes/whitelist/whitelist.component';
import { BalancesComponent } from './routes/balances/balances.component';

export const appRoutes: Route[] = [
    { path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    { path: 'home', component: MainComponent },
    { path: 'whitelist', component: WhitelistComponent },
    { path: 'balances', component: BalancesComponent },
];
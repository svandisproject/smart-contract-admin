import { Component, HostListener, NgZone } from '@angular/core';

import {Web3Service, SvandisSaleService} from '../../../services/services'

import { canBeNumber } from '../../../util/validation';

declare var window: any;

@Component({
    selector: 'balances-component',
    templateUrl: './balances.component.html',
    styleUrls: ['./balances.component.css']
})
export class BalancesComponent {
    account: string;
    accounts: Array<string>;

    ethAddressCheck: string;
    balance: number;
    contractBalance: number;
    status: string;
    canBeNumber = canBeNumber;

    constructor(
        private _ngZone: NgZone,
        private web3Service: Web3Service,
        private svandisSaleService: SvandisSaleService,
        ) {
        this.onReady();
    }

    onReady = () => {
    // Get the initial account balance so it can be displayed.
        this.web3Service.getAccounts().subscribe(accs => {
            this.accounts = accs;
            this.account = this.accounts[0];
        }, err => alert(err))
    };

    getBalance = () => {
        this.svandisSaleService.getBalance(this.ethAddressCheck)
            .subscribe(value => {
                this.setStatus('The address balance is '+value);
            }, e => {this.setStatus('Error getting balance; see log.')})
    };

    setStatus = message => {
        this.status = message;
    };
}

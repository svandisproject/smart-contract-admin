import { Component, HostListener, NgZone } from '@angular/core';

import {Web3Service, SvandisSaleService} from '../services/services'

declare var window: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    account: any;
    accounts: any;

    balance: number;
    contractBalance: number;
    status: string;
  
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

            // This is run from window:load and ZoneJS is not aware of it we
            // need to use _ngZone.run() so that the UI updates on promise resolution
            this._ngZone.run(() =>
                this.runInitialCalls()
            );
        }, err => alert(err))
    };

    runInitialCalls = () => {
        this.refreshBalance();
        this.getContractBalance();
    }

    getContractBalance = () => {
        this.svandisSaleService.getContractBalance(this.account)
            .subscribe(value => {
                this.contractBalance = value
            }, e => {this.setStatus('Error getting contract balance; see log.')})
    };

    refreshBalance = () => {
        this.svandisSaleService.getBalance(this.account)
            .subscribe(value => {
                this.balance = value
            }, e => {this.setStatus('Error getting balance; see log.')})
    };

    setStatus = message => {
        this.status = message;
    };
}

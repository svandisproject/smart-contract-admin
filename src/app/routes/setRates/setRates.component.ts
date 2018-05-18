import { Component, HostListener, NgZone } from '@angular/core';

import {Web3Service, SvandisSaleService} from '../../../services/services'

import { canBeNumber } from '../../../util/validation';

declare var window: any;

@Component({
    selector: 'set-rates-component',
    templateUrl: './setRates.component.html'
})
export class SetRatesComponent {
  
    account: string;
    accounts: Array<string>;

    tier1Rate: number;
    tier2Rate: number;
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

    setStatus = message => {
        this.status = message;
    };

    setTierRates = () => {
        this.setStatus('Initiating transaction... (please wait)');

        this.svandisSaleService.setTiers(this.tier1Rate, this.tier2Rate, this.account)
            .subscribe(() =>{
                this.setStatus('Tier 1 rate set to '+this.tier1Rate+', Tier 2 rate set to '+this.tier2Rate);
            }, e => this.setStatus('Error adding to whitelist; see log.'))
    };
}

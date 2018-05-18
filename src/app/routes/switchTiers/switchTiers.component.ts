import { Component, HostListener, NgZone } from '@angular/core';

import {Web3Service, SvandisSaleService} from '../../../services/services'

import { canBeNumber } from '../../../util/validation';

declare var window: any;

@Component({
    selector: 'switch-tiers-component',
    templateUrl: './switchTiers.component.html'
})
export class SwitchTiersComponent {
  
    account: string;
    accounts: Array<string>;

    tier: number;
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

    switchTiers = () => {
        this.setStatus('Initiating transaction... (please wait)');

        this.svandisSaleService.switchTiers(this.tier, this.account)
            .subscribe(() =>{
                this.setStatus('Current tier set to '+this.tier);
            }, e => this.setStatus('Error adding to whitelist; see log.'))
    };
}

import { Component, HostListener, NgZone } from '@angular/core';

import {Web3Service, SvandisSaleService} from '../../../services/services'

import { canBeNumber } from '../../../util/validation';

declare var window: any;

@Component({
    selector: 'whitelist-component',
    templateUrl: './whitelist.component.html',
    styleUrls: ['./whitelist.component.css']
})
export class WhitelistComponent {

    account: string;
    accounts: Array<string>;

    balance: number;
    contractBalance: number;
    whitelistAmount: number;
    ethAddressAdd: string;
    ethAddressRemove: string;
    ethAddressCheck: string;
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

    addToWhitelist = () => {
        this.setStatus('Initiating transaction... (please wait)');

        this.svandisSaleService.addToWhitelist(this.ethAddressAdd, this.whitelistAmount, this.account)
            .subscribe(() =>{
                this.setStatus('Address added to whitelist with '+this.whitelistAmount+' amount');
            }, e => this.setStatus('Error adding to whitelist; see log.'))
    };

    removeFromWhitelist = () => {
        this.setStatus('Initiating transaction... (please wait)');

        this.svandisSaleService.removeFromWhitelist(this.ethAddressRemove, this.account)
            .subscribe(() =>{
                this.setStatus('Address removed from whitelist!');
            }, e => this.setStatus('Error removing from whitelist; see log.'))
    };

    checkWhitelisted = () => {
        this.setStatus('Initiating transaction... (please wait)');

        this.svandisSaleService.checkWhitelisted(this.ethAddressCheck, this.account)
            .subscribe((d) =>{
                this.setStatus('Account whitelist amount is ' + d.toNumber());
            }, e => this.setStatus('Error checking whitelist; see log.'))
    };
}

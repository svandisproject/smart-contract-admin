import { Component, HostListener, NgZone } from '@angular/core';

import {Web3Service, SvandisSaleService} from '../../../services/services'

import { canBeNumber } from '../../../util/validation';

declare var window: any;

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html'
})
export class MainComponent {

  // TODO add proper types these variables
  account: any;
  accounts: any;

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

  addToWhitelist = () => {
    this.setStatus('Initiating transaction... (please wait)');

    this.svandisSaleService.addToWhitelist(this.ethAddressAdd, this.whitelistAmount, this.account)
      .subscribe(() =>{
        this.setStatus('Address added to whitelist with '+this.whitelistAmount+' amount');
        this.refreshBalance();
      }, e => this.setStatus('Error adding to whitelist; see log.'))
  };

  removeFromWhitelist = () => {
    this.setStatus('Initiating transaction... (please wait)');

    this.svandisSaleService.removeFromWhitelist(this.ethAddressRemove, this.account)
      .subscribe(() =>{
        this.setStatus('Address removed from whitelist!');
        this.refreshBalance();
      }, e => this.setStatus('Error removing from whitelist; see log.'))
  };

  checkWhitelisted = () => {
    this.setStatus('Initiating transaction... (please wait)');

    this.svandisSaleService.checkWhitelisted(this.ethAddressCheck, this.account)
      .subscribe((d) =>{
        this.setStatus('Account whitelist amount is ' + d.toNumber());
        this.refreshBalance();
      }, e => this.setStatus('Error checking whitelist; see log.'))
  };
}

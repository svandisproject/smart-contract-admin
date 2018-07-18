import {Component, NgZone} from '@angular/core';
import {SvandisSaleService} from '../../common/sales/svandis-sale.service';
import {AccountAwareComponent} from '../AccountAwareComponent';
import {ActivatedRoute} from '@angular/router';
import {Web3Service} from '../../common/sales/web3.service';

@Component({
    selector: 'withdraw-component',
    templateUrl: './withdraw.component.html',
    styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent extends AccountAwareComponent {
    public withdrawWallet: string;
    public withdrawAmount: number;
    public buyAmount: number;
    

    constructor(private _ngZone: NgZone,
                private web3Service: Web3Service,
                private svandisSaleService: SvandisSaleService,
                route: ActivatedRoute) {
        super(route);
    }

    setWithdrawWallet() {
        this.setStatus('Initiating transaction... (please wait)');

        this.svandisSaleService.setWithdrawWallet(this.withdrawWallet, this.account)
            .subscribe((transaction) => {
                transaction.then(() => {
                    this.setStatus('Withdraw wallet set to ' + this.withdrawWallet);
                })
            }, e => this.setStatus('Error withdrawing the amount.'))
    };

    doWithdraw() {
        this.setStatus('Initiating transaction... (please wait)');

        this.svandisSaleService.withdraw(this.withdrawAmount, this.account)
            .subscribe((transaction) => {
                transaction.then(() => {
                    this.setStatus('Amount withdrawn from contract');
                });
            }, e => this.setStatus('Error withdrawing the amount.'))
    };

    doBuyTokens() {
        this.setStatus('Initiating transaction... (please wait)');

        this.svandisSaleService.buyTokens(this.buyAmount, this.account)
            .subscribe((transaction) => {
                transaction.then(() => {
                    this.setStatus('Tokens purchased');
                });
            }, e => this.setStatus('Error buying tokens'))
    };


    doClaimOwnership() {
        this.setStatus('Initiating transaction... (please wait)');

        this.svandisSaleService.claimOwnership(this.account)
            .subscribe((transaction) => {
                transaction.then(() => {
                    this.setStatus('Company tokens claimed');
                });
            }, e => this.setStatus('Error claiming tokens'))
    };

    public isAddress(address: string): boolean {
        return this.web3Service.web3.utils.isAddress(address)
    }
}

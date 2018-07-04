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
    

    constructor(private _ngZone: NgZone,
                private web3Service: Web3Service,
                private svandisSaleService: SvandisSaleService,
                route: ActivatedRoute) {
        super(route);
    }

    setWithdrawWallet = () => {
        this.setStatus('Initiating transaction... (please wait)');

        this.svandisSaleService.setWithdrawWallet(this.withdrawWallet, this.account)
            .subscribe(() => {
                this.setStatus('Withdraw wallet set to ' + this.withdrawWallet);
            }, e => this.setStatus('Error withdrawing the amount.'))
    };

    doWithdraw = () => {
        this.setStatus('Initiating transaction... (please wait)');

        this.svandisSaleService.withdraw(this.account)
            .subscribe(() => {
                this.setStatus('Amount withdrawn from contract');
            }, e => this.setStatus('Error withdrawing the amount.'))
    };

    public isAddress(address: string): boolean {
        return this.web3Service.web3.utils.isAddress(address)
    }
}

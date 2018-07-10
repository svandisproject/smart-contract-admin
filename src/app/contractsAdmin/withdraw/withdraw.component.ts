import {Component, NgZone} from '@angular/core';
import {SvandisSaleService} from '../../common/sales/svandis-sale.service';
import {AccountAwareComponent} from '../AccountAwareComponent';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'withdraw-component',
    templateUrl: './withdraw.component.html'
})
export class WithdrawComponent extends AccountAwareComponent {
    public tier1Rate: number;
    public tier2Rate: number;

    constructor(private _ngZone: NgZone,
                private svandisSaleService: SvandisSaleService,
                route: ActivatedRoute) {
        super(route);
    }

    doWithdraw() {
        this.setStatus('Initiating transaction... (please wait)');

        this.svandisSaleService.withdraw(this.account)
            .subscribe(() => {
                this.setStatus('Amount withdrawn from contract');
            }, e => this.setStatus('Error withdrawing the amount.'))
    };
}

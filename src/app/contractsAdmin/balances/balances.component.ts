import {Component, NgZone} from '@angular/core';
import {SvandisSaleService} from '../../common/sales/svandis-sale.service';
import {ActivatedRoute} from '@angular/router';
import {AccountAwareComponent} from '../AccountAwareComponent';

@Component({
    selector: 'app-balances-component',
    templateUrl: './balances.component.html',
    styleUrls: ['./balances.component.css']
})
export class BalancesComponent extends AccountAwareComponent {
    public ethAddressCheck: string;

    constructor(private _ngZone: NgZone,
                private svandisSaleService: SvandisSaleService,
                route: ActivatedRoute) {
        super(route)
    }

    public getBalance = () => {
        this.svandisSaleService.getBalance(this.ethAddressCheck)
            .subscribe(call => {
                call.then(value => {
                    this.setStatus('The address balance is ' + value);
                })
            }, e => {
                this.setStatus('Error getting balance; see log.')
            })
    };

    public isNotNumber = (n) => {
        return isNaN(n);
    };
}

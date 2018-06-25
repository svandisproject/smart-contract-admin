import {Component, NgZone} from '@angular/core';
import {SvandisSaleService} from '../../common/sales/svandis-sale.service';
import {AccountAwareComponent} from '../AccountAwareComponent';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-set-rates-component',
    templateUrl: './setRates.component.html'
})
export class SetRatesComponent extends AccountAwareComponent {
    public tier1Rate: number;
    public tier2Rate: number;

    constructor(private _ngZone: NgZone,
                private svandisSaleService: SvandisSaleService,
                route: ActivatedRoute) {
        super(route);
    }

    public setTierRates = () => {
        this.setStatus('Initiating transaction... (please wait)');

        this.svandisSaleService.setTiers(this.tier1Rate, this.tier2Rate, this.account)
            .subscribe(() => {
                this.setStatus('Tier 1 rate set to ' + this.tier1Rate + ', Tier 2 rate set to ' + this.tier2Rate);
            }, e => this.setStatus('Error adding to whitelist; see log.'))
    };

    public isNotNumber = (n) => {
        return isNaN(n);
    };
}

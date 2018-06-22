import {Component, NgZone} from '@angular/core';
import {AccountAwareComponent} from '../AccountAwareComponent';
import {ActivatedRoute} from '@angular/router';
import {SvandisSaleService} from '../../common/sales/svandis-sale.service';

@Component({
    selector: 'app-switch-tiers-component',
    templateUrl: './switchTiers.component.html'
})
export class SwitchTiersComponent extends AccountAwareComponent {
    public tier: number;

    constructor(private _ngZone: NgZone,
                private svandisSaleService: SvandisSaleService,
                route: ActivatedRoute) {
        super(route);
    }

    switchTiers = () => {
        this.setStatus('Initiating transaction... (please wait)');

        this.svandisSaleService.switchTiers(this.tier, this.account)
            .subscribe(() => {
                this.setStatus('Current tier set to ' + this.tier);
            }, e => this.setStatus('Error adding to whitelist; see log.'))
    };

    get diagnostic() { return this.tier; }
}

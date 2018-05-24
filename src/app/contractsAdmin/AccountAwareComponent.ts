import * as _ from 'lodash';
import {ActivatedRouteSnapshot} from '@angular/router';

export class AccountAwareComponent {
    public account: string;
    public accounts: string[];
    public status: string;

    constructor(private route: ActivatedRouteSnapshot) {
        this.accounts = this.route.data.accounts;
        this.account = _.first(this.accounts);
    }

    public setStatus(message): void {
        this.status = message;
    };
}

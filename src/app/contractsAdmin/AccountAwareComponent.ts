import * as _ from 'lodash';
import {ActivatedRoute} from '@angular/router';

export class AccountAwareComponent {
    public account: string;
    public accounts: string[];
    public status: string;

    constructor(private route: ActivatedRoute) {
        this.accounts = this.route.snapshot.data.accounts;
        this.account = _.first(this.accounts);
    }

    public setStatus(message): void {
        this.status = message;
    };
}

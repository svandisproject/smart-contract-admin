import {Component, NgZone} from '@angular/core';
import * as XLSX from 'xlsx';
import {AccountAwareComponent} from '../AccountAwareComponent';
import {ActivatedRoute} from '@angular/router';
import {SvandisSaleService} from '../../common/sales/svandis-sale.service';
import {Web3Service} from '../../common/sales/web3.service';

@Component({
    selector: 'app-company-whitelist-component',
    templateUrl: './companyWhitelist.component.html',
    styleUrls: ['./companyWhitelist.component.css']
})
export class CompanyWhitelistComponent extends AccountAwareComponent {
    public whitelistAmount: number;
    public ethAddressAdd: string;
    public ethAddressRemove: string;
    public ethAddressCheck: string;

    public status: string;
    
    constructor(private _ngZone: NgZone,
                private web3Service: Web3Service,
                private svandisSaleService: SvandisSaleService,
                route: ActivatedRoute) {
        super(route);
    }

    public addToCompanyWhitelist() {
        this.setStatus('Initiating transaction... (please wait)');

        this.svandisSaleService.addToCompanyWhitelist(this.ethAddressAdd, this.whitelistAmount, this.account)
            .subscribe(() => {
                this.setStatus('Address added to company whitelist with ' + this.whitelistAmount + ' amount');
            }, e => this.setStatus('Error adding to whitelist; see log.'))
    };

    public removeFromCompanyWhitelist() {
        this.setStatus('Initiating transaction... (please wait)');

        this.svandisSaleService.removeFromCompanyWhitelist(this.ethAddressRemove, this.account)
            .subscribe(() => {
                this.setStatus('Address removed from company whitelist!');
            }, e => this.setStatus('Error removing from whitelist; see log.'))
    };

    public checkCompanyWhitelisted() {
        this.setStatus('Initiating transaction... (please wait)');

        this.svandisSaleService.checkCompanyWhitelisted(this.ethAddressCheck, this.account)
            .subscribe((d) => {
                this.setStatus('Account whitelist amount is ' + d);
            }, e => this.setStatus('Error checking whitelist; see log.'))
    };


    public isAddress(address: string): boolean {
        return this.web3Service.web3.utils.isAddress(address)
    }

    public isNotNumber(n: any) {
        return isNaN(n);
    };
}

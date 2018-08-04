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
    public bulkImport: any = null;
    public importedRows: any[] = [];
    public importRowAddress = 'address';
    public importRowAmount = 'amount';
    

    // TODO: those 2 are not used , delete ?
    public wopts: XLSX.WritingOptions = {bookType: 'xlsx', type: 'array'};
    public fileName = 'SheetJS.xlsx';

    constructor(private _ngZone: NgZone,
                private web3Service: Web3Service,
                private svandisSaleService: SvandisSaleService,
                route: ActivatedRoute) {
        super(route);
    }

    public addToCompanyWhitelist() {
        this.setStatus('Initiating transaction... (please wait)');

        this.svandisSaleService.addToCompanyWhitelist(this.ethAddressAdd, this.whitelistAmount, this.account)
            .subscribe((transaction) => {
                transaction.then(() => {
                    this.setStatus('Address added to company whitelist with ' + this.whitelistAmount + ' amount');
                });
            }, e => this.setStatus('Error adding to whitelist; see log.'))
    };

    public removeFromCompanyWhitelist() {
        this.setStatus('Initiating transaction... (please wait)');

        this.svandisSaleService.removeFromCompanyWhitelist(this.ethAddressRemove, this.account)
            .subscribe((transaction) => {
                transaction.then(() => {
                    this.setStatus('Address removed from company whitelist!');
                });
            }, e => this.setStatus('Error removing from whitelist; see log.'))
    };

    public checkCompanyWhitelisted() {
        this.setStatus('Initiating transaction... (please wait)');

        this.svandisSaleService.checkCompanyWhitelisted(this.ethAddressCheck, this.account)
            .subscribe((call) => {
                call.then((value) => {
                    this.setStatus('Account company whitelist amount is ' + (value / (Math.pow(10, 18))));
                });
            }, e => this.setStatus('Error checking whitelist; see log.'))
    };

    public handleFileInput(evt: any) {
        this.bulkImport = evt.target;
        const target: DataTransfer = <DataTransfer>(this.bulkImport);
        if (target.files.length !== 1) {
            throw new Error('Cannot use multiple files');
        }
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {

            /* read workbook */
            const bstr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

            /* grab first sheet */
            const wsname: string = wb.SheetNames[0];
            const ws: XLSX.WorkSheet = wb.Sheets[wsname];
            this.importedRows = XLSX.utils.sheet_to_json(ws);


        };
        reader.readAsBinaryString(target.files[0]);
    }

    public doExport() {
        let status = '';

        let addresses = [];
        let amounts = [];
        let errors = [];
        for (const row of this.importedRows) {
            if (!row[this.importRowAddress] || !row[this.importRowAmount]) {
                return this.setStatus('Incorrect header names.');
            }
            if (this.web3Service.web3.utils.isAddress(row[this.importRowAddress]) && !isNaN(row[this.importRowAmount])) {
               addresses.push(row[this.importRowAddress]);
               amounts.push(row[this.importRowAmount] * (Math.pow(10, 18)));
            } else {
                errors.push('Could not add ' + row[this.importRowAddress] + ' to whitelist with amount ' + row[this.importRowAmount]);
            }
        }
        this.svandisSaleService.addMultipleToCompanyWhitelist(addresses, amounts, this.account)
            .subscribe((transaction) => {
                transaction.then(() => {
                    let status = 'Accounts have been whitelisted ';
                    for(let error in errors) {
                        status += error;
                    }
                    this.setStatus(status);
                });
            }, e => this.setStatus('Error adding accounts to whitelist; see log.'))
        this.setStatus(status);
    }

    public isAddress(address: string): boolean {
        return this.web3Service.web3.utils.isAddress(address)
    }

    public isNotNumber(n: any) {
        return isNaN(n);
    };
}

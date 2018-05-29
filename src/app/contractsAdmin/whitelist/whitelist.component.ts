import {Component, NgZone} from '@angular/core';
import * as XLSX from 'xlsx';
import {AccountAwareComponent} from '../AccountAwareComponent';
import {ActivatedRoute} from '@angular/router';
import {SvandisSaleService} from '../../common/sales/svandis-sale.service';
import {Web3Service} from '../../common/sales/web3.service';

@Component({
    selector: 'app-whitelist-component',
    templateUrl: './whitelist.component.html',
    styleUrls: ['./whitelist.component.css']
})
export class WhitelistComponent extends AccountAwareComponent {
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

    public addToWhitelist = () => {
        this.setStatus('Initiating transaction... (please wait)');

        this.svandisSaleService.addToWhitelist(this.ethAddressAdd, this.whitelistAmount, this.account)
            .subscribe(() => {
                this.setStatus('Address added to whitelist with ' + this.whitelistAmount + ' amount');
            }, e => this.setStatus('Error adding to whitelist; see log.'))
    };

    public removeFromWhitelist = () => {
        this.setStatus('Initiating transaction... (please wait)');

        this.svandisSaleService.removeFromWhitelist(this.ethAddressRemove, this.account)
            .subscribe(() => {
                this.setStatus('Address removed from whitelist!');
            }, e => this.setStatus('Error removing from whitelist; see log.'))
    };

    public checkWhitelisted = () => {
        this.setStatus('Initiating transaction... (please wait)');

        this.svandisSaleService.checkWhitelisted(this.ethAddressCheck, this.account)
            .subscribe((d) => {
                this.setStatus('Account whitelist amount is ' + d);
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
        for (const row of this.importedRows) {
            if (!row[this.importRowAddress] || !row[this.importRowAmount]) {
                return this.setStatus('Incorrect header names.');
            }
            if (this.web3Service.web3.utils.isAddress(row[this.importRowAddress]) && !isNaN(row[this.importRowAmount])) {
                this.svandisSaleService.addToWhitelist(row[this.importRowAddress], row[this.importRowAmount], this.account)
                    .subscribe(() => {
                        status += row[this.importRowAddress] + ' added to whitelist with ' + row[this.importRowAmount] + ' amount';
                    }, e => status += 'Error adding to whitelist')
            }
        }
        this.setStatus(status);
    }

    public isAddress(address: string): boolean {
        return this.web3Service.web3.utils.isAddress(address)
    }
}

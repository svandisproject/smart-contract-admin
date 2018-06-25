import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Web3Service} from './web3.service';

@Injectable()
export class Web3AccountResolver implements Resolve<any> {

    constructor(private web3Service: Web3Service) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.web3Service.getAccounts();
    }
}

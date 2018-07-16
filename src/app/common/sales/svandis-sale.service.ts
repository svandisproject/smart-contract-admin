import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Web3Service} from './web3.service'
import {fromPromise} from 'rxjs/observable/fromPromise';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

const svandisSaleArtifacts = require('../../../../build/contracts/Sale.json');
const contract = require('truffle-contract');

@Injectable()
export class SvandisSaleService {

    Sale = contract({
        abi: svandisSaleArtifacts.abi,
    });

    contractAddress = '0xdefebf1a38df233ed18a1bb5c0924622d394e0d0';

    constructor(private web3Ser: Web3Service) {
        // Bootstrap the MetaCoin abstraction for Use

        this.Sale.setProvider(web3Ser.web3.currentProvider);
    }

    // TODO: Use this fromPromise approach for other methods in this class
    public getContractBalance(account): Observable<any> {
        let meta;
        return fromPromise(this.Sale.at(this.contractAddress))
            .pipe(
                map((instance) => {
                    meta = instance;
                    // we use call here so the call doesn't try and write, making it free
                    return meta.balanceOf.call(meta.address, {
                        from: account
                    }).then(value => {
                        return value / (Math.pow(10, 18));
                    });
                }),
                catchError((err) => {
                    console.log(err);
                    return of(err);
                })
            );
    }

    public getContractEth(account): Observable<any> {
        let meta;
        return fromPromise(this.Sale.at(this.contractAddress))
            .pipe(
                map((instance) => {
                    meta = instance;
                    // we use call here so the call doesn't try and write, making it free
                    return meta.getContractEth.call({
                        from: account
                    }).then(value => {
                        return value / (Math.pow(10, 18));
                    });
                }),
                catchError((err) => {
                    console.log(err);
                    return of(err);
                })
            );
    }

    public getBalance(account): Observable<any> {
        let meta;
        return fromPromise(this.Sale.at(this.contractAddress))
            .pipe(
                map((instance) => {
                    meta = instance;
                    // we use call here so the call doesn't try and write, making it free
                    return meta.balanceOf.call(account, {
                        from: account
                    }).then(value => {
                        return value / (Math.pow(10, 18));
                    });
                }),
                catchError((err) => {
                    console.log(err);
                    return of(err);
                })
            );
    }

    public addToWhitelist(ethAddress, amount, account): Observable<any> {
        amount = amount * (Math.pow(10, 18));
        let meta;
        return fromPromise(this.Sale.at(this.contractAddress))
            .pipe(
                map((instance) => {
                    meta = instance;
                    // we use call here so the call doesn't try and write, making it free
                    return meta.addToWhitelist(ethAddress, amount, {
                        from: account
                    });
                }),
                catchError((err) => {
                    console.log(err);
                    return of(err);
                })
            );
    }

    public addMultipleToWhitelist(ethAddresses, amounts, account): Observable<any> {
        for(let amount of amounts) {
            amount = amount * (Math.pow(10, 18));
        }
        let meta;
        return fromPromise(this.Sale.at(this.contractAddress))
            .pipe(
                map((instance) => {
                    meta = instance;
                    // we use call here so the call doesn't try and write, making it free
                    return meta.addMultipleToWhitelist(ethAddresses, amounts, {
                        from: account
                    });
                }),
                catchError((err) => {
                    console.log(err);
                    return of(err);
                })
            );
    }

    public removeFromWhitelist(ethAddress, account): Observable<any> {

        let meta;
        return fromPromise(this.Sale.at(this.contractAddress))
            .pipe(
                map((instance) => {
                    meta = instance;
                    // we use call here so the call doesn't try and write, making it free
                    return meta.removeFromWhitelist(ethAddress, {
                        from: account
                    });
                }),
                catchError((err) => {
                    console.log(err);
                    return of(err);
                })
            );
    }

    public checkWhitelisted(ethAddress, account): Observable<any> {

        let meta;
        return fromPromise(this.Sale.at(this.contractAddress))
            .pipe(
                map((instance) => {
                    meta = instance;
                    // we use call here so the call doesn't try and write, making it free
                    return meta.checkWhitelisted.call(ethAddress, {
                        from: account
                    });
                }),
                catchError((err) => {
                    console.log(err);
                    return of(err);
                })
            );
    }

    public addToCompanyWhitelist(ethAddress, amount, account): Observable<any> {
        amount = amount * (Math.pow(10, 18));
        let meta;
        return Observable.create(observer => {
            this.Sale
                .at(this.contractAddress)
                .then(instance => {
                    meta = instance;
                    return meta.addToCompanyWhitelist(ethAddress, amount, {
                        from: account
                    });
                })
                .then(() => {
                    observer.next()
                    observer.complete()
                })
                .catch(e => {
                    console.log(e);
                    observer.error(e)
                });
        })
    }

    public removeFromCompanyWhitelist(ethAddress, account): Observable<any> {
        let meta;
        return fromPromise(this.Sale.at(this.contractAddress))
            .pipe(
                map((instance) => {
                    meta = instance;
                    // we use call here so the call doesn't try and write, making it free
                    return meta.removeFromCompanyWhitelist(ethAddress, {
                        from: account
                    });
                }),
                catchError((err) => {
                    console.log(err);
                    return of(err);
                })
            );
    }

    public checkCompanyWhitelisted(ethAddress, account): Observable<any> {

        let meta;
        return fromPromise(this.Sale.at(this.contractAddress))
            .pipe(
                map((instance) => {
                    meta = instance;
                    // we use call here so the call doesn't try and write, making it free
                    return meta.checkCompanyWhitelisted.call(ethAddress, {
                        from: account
                    });
                }),
                catchError((err) => {
                    console.log(err);
                    return of(err);
                })
            );
    }

    public setPreSaleRate(rate, account): Observable<any> {

        let meta;
        return fromPromise(this.Sale.at(this.contractAddress))
            .pipe(
                map((instance) => {
                    meta = instance;
                    // we use call here so the call doesn't try and write, making it free
                    return meta.setPreSaleRate(rate, {
                        from: account
                    });
                }),
                catchError((err) => {
                    console.log(err);
                    return of(err);
                })
            );
    }

    public setTiers(tier1Rate, tier2Rate, account): Observable<any> {
        tier1Rate = tier1Rate * (Math.pow(10, 18));
        tier2Rate = tier2Rate * (Math.pow(10, 18));
        let meta;
        return fromPromise(this.Sale.at(this.contractAddress))
            .pipe(
                map((instance) => {
                    meta = instance;
                    // we use call here so the call doesn't try and write, making it free
                    return meta.setTiers(tier1Rate, tier2Rate, {
                        from: account
                    });
                }),
                catchError((err) => {
                    console.log(err);
                    return of(err);
                })
            );
    }

    public switchTiers(tier, account): Observable<any> {

        let meta;
        return fromPromise(this.Sale.at(this.contractAddress))
            .pipe(
                map((instance) => {
                    meta = instance;
                    // we use call here so the call doesn't try and write, making it free
                    return meta.switchTiers(tier, {
                        from: account
                    });
                }),
                catchError((err) => {
                    console.log(err);
                    return of(err);
                })
            );
    }

    public setWithdrawWallet(withdrawWallet, account): Observable<any> {
        let meta;
        return fromPromise(this.Sale.at(this.contractAddress))
            .pipe(
                map((instance) => {
                    meta = instance;
                    // we use call here so the call doesn't try and write, making it free
                    return meta.setWithdrawWallet(withdrawWallet, {
                        from: account
                    });
                }),
                catchError((err) => {
                    console.log(err);
                    return of(err);
                })
            );
    }

    public withdraw(account): Observable<any> {

        let meta;
        return fromPromise(this.Sale.at(this.contractAddress))
            .pipe(
                map((instance) => {
                    meta = instance;
                    // we use call here so the call doesn't try and write, making it free
                    return meta.withdraw({
                        from: account
                    });
                }),
                catchError((err) => {
                    console.log(err);
                    return of(err);
                })
            );
    }

    
}

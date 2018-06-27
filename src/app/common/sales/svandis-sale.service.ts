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

    Sale = contract(svandisSaleArtifacts).at('0x14a88e5ffd2fc39a7fa5b02821cbc64fe5893b9a');

    constructor(private web3Ser: Web3Service) {
        // Bootstrap the MetaCoin abstraction for Use
        this.Sale.setProvider(web3Ser.web3.currentProvider);
    }

    // TODO: Use this fromPromise approach for other methods in this class
    public getContractBalance(account): Observable<any> {
        let meta;
        return fromPromise(this.Sale.deployed())
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
        return fromPromise(this.Sale.deployed())
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
        return fromPromise(this.Sale.deployed())
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
        return Observable.create(observer => {
            this.Sale
                .deployed()
                .then(instance => {
                    meta = instance;
                    return meta.addToWhitelist(ethAddress, amount, {
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

    public removeFromWhitelist(ethAddress, account): Observable<any> {

        let meta;
        return Observable.create(observer => {
            this.Sale
                .deployed()
                .then(instance => {
                    meta = instance;
                    return meta.removeFromWhitelist(ethAddress, {
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

    public checkWhitelisted(ethAddress, account): Observable<any> {

        let meta;
        return Observable.create(observer => {
            this.Sale
                .deployed()
                .then(instance => {
                    meta = instance;
                    return meta.checkWhitelisted.call(ethAddress, {
                        from: account
                    });
                })
                .then((value) => {
                    value = value / (Math.pow(10, 18));
                    observer.next(value)
                    observer.complete()
                })
                .catch(e => {
                    console.log(e.ToNumber());
                    observer.error(e)
                });
        })
    }

    public setTiers(tier1Rate, tier2Rate, account): Observable<any> {

        let meta;
        return Observable.create(observer => {
            this.Sale
                .deployed()
                .then(instance => {
                    meta = instance;
                    return meta.setTiers(tier1Rate, tier2Rate, {
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

    public switchTiers(tier, account): Observable<any> {

        let meta;
        return Observable.create(observer => {
            this.Sale
                .deployed()
                .then(instance => {
                    meta = instance;
                    return meta.switchTiers(tier, {
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

    public withdraw(account): Observable<any> {

        let meta;
        return Observable.create(observer => {
            this.Sale
                .deployed()
                .then(instance => {
                    meta = instance;
                    return meta.withdraw({
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

    
}

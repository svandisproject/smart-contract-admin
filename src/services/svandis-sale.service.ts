import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Web3Service } from './web3.service'

const svandisSaleArtifacts = require('../../build/contracts/Sale.json');
const contract = require('truffle-contract');

@Injectable()
export class SvandisSaleService {

	Sale = contract(svandisSaleArtifacts);

    constructor(
      	private web3Ser: Web3Service,
      	) { 
      	// Bootstrap the MetaCoin abstraction for Use
      	this.Sale.setProvider(web3Ser.web3.currentProvider);
    }

    getContractBalance(account): Observable<number> {
        let meta;

        return Observable.create(observer => {
            this.Sale
            .deployed()
            .then(instance => {
                meta = instance;
                console.log(meta.address);
                //we use call here so the call doesn't try and write, making it free
                return meta.balanceOf.call(meta.address, {
                    from: account
                });
            })
            .then(value => {
                value = value/(Math.pow(10,18));
                observer.next(value)
                observer.complete()
            })
            .catch(e => {
                console.log(e);
                observer.error(e)
            });
        })
    }

    getBalance(account): Observable<number> {
  	    let meta;

  	    return Observable.create(observer => {
            this.Sale
      		    .deployed()
      		    .then(instance => {
      		        meta = instance;
                //we use call here so the call doesn't try and write, making it free
      		    return meta.balanceOf.call(account, {
      		        from: account
      		    });
      		})
      		.then(value => {
              value = value/(Math.pow(10,18));
      		    observer.next(value)
      		    observer.complete()
      		})
      		.catch(e => {
      		    console.log(e);
      		    observer.error(e)
      		});
      	})
    }

    addToWhitelist(ethAddress, amount, account): Observable<any>{
        amount = amount*(Math.pow(10,18));
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

    removeFromWhitelist(ethAddress, account): Observable<any>{

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

    checkWhitelisted(ethAddress, account): Observable<any>{

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
                value = value/(Math.pow(10,18));
                observer.next(value)
                observer.complete()
            })
            .catch(e => {
                console.log(e.ToNumber());
                observer.error(e)
            });
        })
    }

    setTiers(tier1Rate, tier2Rate, account): Observable<any>{

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

    switchTiers(tier, account): Observable<any>{

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
}

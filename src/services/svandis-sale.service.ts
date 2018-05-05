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
          console.log(value);
  		    observer.next(value)
  		    observer.complete()
  		  })
  		  .catch(e => {
  		    console.log(e);
  		    observer.error(e)
  		  });
  	})
  }

  sendCoin(from, to, amount): Observable<any>{

  	let meta;
  	return Observable.create(observer => {
  	  this.Sale
  	    .deployed()
  	    .then(instance => {
  	      meta = instance;
  	      return meta.sendCoin(to, amount, {
  	        from: from
  	      });
  	    })
  	    .then(() => {
  	      observer.next()
  	      observer.next()
  	    })
  	    .catch(e => {
  	    	console.log(e);
  	      observer.error(e)
  	    });
  	})
  }

}

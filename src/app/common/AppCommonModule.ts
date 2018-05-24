import {NgModule} from '@angular/core';
import {SvandisSaleService} from './sales/svandis-sale.service';
import {Web3Service} from './sales/web3.service';
import {NavigationComponent} from './navigation/navigation.component';
import {HeaderComponent} from './header/header.component';
import {Web3AccountResolver} from './sales/Web3AccountResolver';

@NgModule({
    providers: [
        SvandisSaleService,
        Web3Service,
        Web3AccountResolver,
    ],
    declarations: [
        NavigationComponent,
        HeaderComponent
    ],
    exports: [
        NavigationComponent,
        HeaderComponent
    ]
})
export class AppCommonModule {

}

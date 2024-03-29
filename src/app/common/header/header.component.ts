import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent {
    @Input() balance: number;
    @Input() contractBalance: number;
    @Input() contractEth: number;
}

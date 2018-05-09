import { Component, HostListener, NgZone } from '@angular/core';

import {Web3Service, SvandisSaleService} from '../../../services/services'

import { canBeNumber } from '../../../util/validation';

declare var window: any;

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html'
})
export class MainComponent {
  
}

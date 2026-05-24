import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RESTCountry } from '../../interfaces/rest-countries.interface';

@Component({
  selector: 'country-list',
  imports: [],
  templateUrl: './country-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryList {
  countries = input.required<RESTCountry[]>()
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CountryList } from "../../components/country-list/country-list";
import { CountrySearchInput } from "../../components/search-input/search-input";

@Component({
  selector: 'app-by-country-page',
  imports: [CountrySearchInput],
  templateUrl: './by-country-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPage {

  onSearch(value: string) {
    console.log(value)
  }
}

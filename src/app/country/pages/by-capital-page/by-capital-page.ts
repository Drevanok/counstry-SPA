import { Component, inject } from '@angular/core';
import { CountrySearchInput } from "../../components/search-input/search-input";
import { CountryList } from "../../components/country-list/country-list";
import { Router } from '@angular/router';
@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.html',
  imports: [CountrySearchInput, CountryList],
})
export class ByCapitalPage {
  private router = inject(Router);
  
  onSearch(value: string) {
    this.router.navigate(['country/by', value]);
  }

}

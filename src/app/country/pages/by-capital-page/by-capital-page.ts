import { Component, inject, signal } from '@angular/core';
import { CountrySearchInput } from '../../components/search-input/search-input';
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.html',
  imports: [CountrySearchInput, CountryList],
})
export class ByCapitalPage {
  CountryService = inject(CountryService)

  isLoading = signal(false);
  hasError = signal<string | null>(null);
  countries = signal<Country[]>([]);

  onSearch(query: string) {
    if (this.isLoading()) return

    this.isLoading.set(true);
    this.hasError.set(null);

    this.CountryService.searchByCapital(query)
      .subscribe({
        next: (countries) => {
          this.isLoading.set(false);
          this.countries.set(countries)
        },
        error: (err) => {
          this.isLoading.set(false);
          this.countries.set([]);

          this.hasError.set(err)
        }
      })
  }

}

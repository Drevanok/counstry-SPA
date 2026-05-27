import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { CountryList } from "../../components/country-list/country-list";
import { CountrySearchInput } from "../../components/search-input/search-input";
import { CountryService } from '../../services/country';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'by-country-page',
  imports: [CountrySearchInput, CountryList],
  templateUrl: './by-country-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPage {

  CountryService = inject(CountryService)
  query = signal('');

  //with rxResource - return observable
    countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);

      return this.CountryService.searchByCountry(params.query)

    }
  });
  
  //with resource - return promise async await
  // countryResource = resource({
  //   params: () => ({ query: this.query() }),
  //   loader: async ({ params }) => {
  //     if (!params.query) return [];

  //     return await firstValueFrom(
  //       this.CountryService.searchByCountry(params.query)
  //     )
  //   }
  // });
}

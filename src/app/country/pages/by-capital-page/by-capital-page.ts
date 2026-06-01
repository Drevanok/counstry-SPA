import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { CountrySearchInput } from '../../components/search-input/search-input';
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'by-capital-page',
  templateUrl: './by-capital-page.html',
  imports: [CountrySearchInput, CountryList],
})
export class ByCapitalPage {
  CountryService = inject(CountryService)
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = linkedSignal(() => this.queryParam);


  //with rxResource - return observable
  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);

      this.router.navigate(['/country/by-capital'], {
        queryParams: {
          query: params.query,
        }
      });
      return this.CountryService.searchByCapital(params.query)

    }
  });

  //with resource - return promise
  // countryResource = resource({
  //   params: () => ({ query: this.query() }),
  //   loader: async ({ params }) => {
  //     if (!params.query) return [];

  //     return await firstValueFrom(
  //       this.CountryService.searchByCapital(params.query)
  //     )
  //   }
  // });

  // isLoading = signal(false);
  // hasError = signal<string | null>(null);
  // countries = signal<Country[]>([]);

  // onSearch(query: string) {
  //   if (this.isLoading()) return

  //   this.isLoading.set(true);
  //   this.hasError.set(null);

  //   this.CountryService.searchByCapital(query)
  //     .subscribe({
  //       next: (countries) => {
  //         this.isLoading.set(false);
  //         this.countries.set(countries)
  //       },
  //       error: (err) => {
  //         this.isLoading.set(false);
  //         this.countries.set([]);

  //         this.hasError.set(err)
  //       }
  //     })
  // }

}

import { ChangeDetectionStrategy, Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryService } from '../../services/country';
import { CountryList } from "../../components/country-list/country-list";
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { Region } from '../../interfaces/regions.type';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam(queryParam: string): Region {
  queryParam = queryParam.toLowerCase()
  const validRegions: Record<string, Region> = {
    'africa': 'Africa',
    'americas': 'Americas',
    'asia': 'Asia',
    'europe': 'Europe',
    'oceania': 'Oceania',
    'antarctic': 'Antarctic',
  }

  return validRegions[queryParam] ?? 'Americas'
}

@Component({
  selector: 'by-region-page',
  imports: [CountryList],
  templateUrl: './by-region-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionPage {

  CountryService = inject(CountryService)
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';
  selectedRegion = linkedSignal<Region>(() => validateQueryParam(this.queryParam))

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  countryResource = rxResource({
    params: () => ({ region: this.selectedRegion() }),
    stream: ({ params }) => {
      if (!params.region) return of([]);

      this.router.navigate(['/country/by-region'], {
        queryParams: {
          query: params.region
        }
      });

      return this.CountryService.searchByRegion(params.region)
    }
  });

}

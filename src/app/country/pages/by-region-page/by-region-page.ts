import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CountryService } from '../../services/country';
import { CountryList } from "../../components/country-list/country-list";
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { Region } from '../../interfaces/regions.type';


@Component({
  selector: 'by-region-page',
  imports: [CountryList],
  templateUrl: './by-region-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionPage {

  CountryService = inject(CountryService)
  selectedRegion = signal<Region | null>(null);

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
      return this.CountryService.searchByRegion(params.region)
    }
  });

}

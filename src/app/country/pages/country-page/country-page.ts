import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'country-page',
  imports: [],
  templateUrl: './country-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPage {
  private route = inject(ActivatedRoute)

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params['code'])
    })
  }
}

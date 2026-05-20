import { Component } from '@angular/core';
@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {
  onSearch(value: string) {
    console.log(value)
  }
}

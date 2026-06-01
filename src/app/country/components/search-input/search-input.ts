import { ChangeDetectionStrategy, Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountrySearchInput {
  placeholder = input('Buscar')
  debounceTime = input(300);
  initialValue = input<string>();

  search = output<string>();
  inputValue = linkedSignal<string>(() => this.initialValue() ?? '')

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.search.emit(value);
    }, this.debounceTime());

    onCleanup(() => {
      clearTimeout(timeout)
    })
  })
}

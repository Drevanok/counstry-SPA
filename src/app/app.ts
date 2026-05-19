import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppFooter } from "./shared/components/app-footer/app-footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppFooter],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('country-app');
}

import { Component, HostBinding, effect, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  darkMode = signal<boolean>(
    JSON.parse(window.localStorage.getItem('darkMode') ?? 'false')
  );
  constructor(){
    effect(() => {
      document.body.className = this.darkMode() ? 'dark':'light'
      window.localStorage.setItem('darkMode', JSON.stringify(this.darkMode()));
    })
  }
  @HostBinding('class.dark') get mode() {
    return this.darkMode();
  }
}

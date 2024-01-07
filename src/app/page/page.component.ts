import { Component, HostBinding, effect, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/client/authentication.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent {
  showFiller = false;
  routerEvents: any
  url: any
  pageTitle: String = "Dashboard"
  constructor(private router: Router, private authenticationService: AuthenticationService) {
    effect(() => {
      document.body.className = this.darkMode() ? 'dark':'light'
      window.localStorage.setItem('darkMode', JSON.stringify(this.darkMode()))
    })
    this.routerEvents = this.router.events.subscribe(
      (event:any)=>{
        if(event instanceof NavigationEnd){
          if(event.url != "/user"){
            var str = event.url.substring(1).split('/')
            var title = ''
            if(str[1] == 'reports')
              title = 'Monthly '+str[1].charAt(0).toUpperCase() + str[1].slice(1)
            else if(str[1] == 'annual')
              title = str[1].charAt(0).toUpperCase() + str[1].slice(1)+' Report'
            else
              title = str[1].charAt(0).toUpperCase() + str[1].slice(1)
            this.pageTitle = title
          }
          this.url = event.url
        }
      }
    )
  }

  changeInfo() {

  }

  logout(){
    this.authenticationService.logout()
  }

  isActive(url:any){
    return url == this.url ? 'bg-slate-400 dark:bg-slate-600 rounded-sm':''
  }
  isDark = false
  darkMode = signal<boolean>(
    JSON.parse(window.localStorage.getItem('darkMode') ?? 'false')
  );

  setDarkMode = ()=>{
    this.isDark = !this.isDark
    this.darkMode.set(this.isDark)
  }

  @HostBinding('class.dark') get mode() {
    this.isDark = this.darkMode();
    return this.darkMode();
  }
}

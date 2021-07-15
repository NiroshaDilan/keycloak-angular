import {Component} from '@angular/core';
import {AuthConfig, OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';

  constructor(private oauthService: OAuthService) {
    this.configure();
  }

  authConfig: AuthConfig = {
    issuer: 'http://localhost:8080/auth/realms/angular',
    redirectUri: window.location.origin + '/heroes',
    clientId: 'spa-heroes',
    scope: 'openid profile email offline_access heroes',
    responseType: 'code',
    // at_hash is not present in id token in older versions of keycloak.
    // use the following property only if needed!
    // disableAtHashCheck: true,
    showDebugInformation: true
  };

  public login() {
    this.oauthService.initLoginFlow();
  }

  public logoff() {
    this.oauthService.logOut();
  }

  private configure() {
    this.oauthService.configure(this.authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

}

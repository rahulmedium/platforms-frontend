import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  email: any;
  password: any;
  returnUrl: string;

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    if(this.authenticationService.currentUserValue && this.authenticationService.currentUserValue.token) {
      this.router.navigate([this.returnUrl]);
    }
  }

  onSubmit() {
    this.authenticationService.login(this.email, this.password).subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
      });
  }

  ngOnDestroy() {
  }

}

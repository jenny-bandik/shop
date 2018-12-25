import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCardModule, MatGridListModule, MatIconModule, MatInputModule} from '@angular/material';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CartComponent } from './cart/cart.component';
import { UsersComponent } from './users/users.component';
import { AuthComponent } from './auth/auth.component';
import { MailingComponent } from './mailing/mailing.component';
import {Routes,RouterModule} from "@angular/router";
import { NotFoundComponent } from './not-found/not-found.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { RegistrationComponent } from './registration/registration.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import {MailingGuard} from "./mailing/mailing.guard";

const appRoutes: Routes =[
	{ path: '', component: AuthComponent},
	{ path: 'category/:id', component: CatalogComponent},
	{ path: 'mailing', component: MailingComponent, canActivate: [MailingGuard]},
	{ path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CatalogComponent,
    CartComponent,
    UsersComponent,
    AuthComponent,
    NotFoundComponent,
    RegistrationComponent,
    SubscriptionComponent,
	  MailingComponent
  ],
  imports: [
    BrowserModule,
	  BrowserAnimationsModule,
	  MatButtonModule,
	  MatGridListModule,
	  MatCardModule,
	  MatInputModule,
	  MatIconModule,
	  RouterModule.forRoot(appRoutes),
	  HttpClientModule,
	  FormsModule,
	  ReactiveFormsModule
  ],
  providers: [MailingGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

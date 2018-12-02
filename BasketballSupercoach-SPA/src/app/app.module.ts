import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AlertifyService } from './_services/alertify.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeamComponent } from './team/team.component';
import { RankingsComponent } from './rankings/rankings.component';
import { PlayersComponent } from './players/players.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { PlayersService } from './_services/players.service';
import { SharedModule } from 'primeng/components/common/shared';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { JwtModule } from '@auth0/angular-jwt';
import { PlayersdetailedComponent } from './playersdetailed/playersdetailed.component';
import { PlayersdeatiledResolver } from './_resolvers/playersdetailed.resolver';
import { PlayersResolver } from './_resolvers/players.resolver';
import { UserService } from './_services/user.service';
import { SelectplayerComponent } from './selectplayer/selectplayer.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { EditprofileResolver } from './_resolvers/editprofile.resolver';
import { DashboardResolver } from './_resolvers/dashboard.resolver';
import { SelectplayerResolver } from './_resolvers/selectplayer.resolver';
import { FilteredplayersService } from './_services/filteredplayers.service';
import { TeamdetailService } from './_services/teamdetail.service';
import { TeamsalaryService } from './_services/teamsalary.service';


export function tokenGetter() {
    return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      DashboardComponent,
      TeamComponent,
      RankingsComponent,
      PlayersComponent,
      PlayersdetailedComponent,
      SelectplayerComponent,
      EditprofileComponent,
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      SharedModule,
      TableModule,
      DropdownModule,
      ButtonModule,
      JwtModule.forRoot({
        config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
        }
      })
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      AuthGuard,
      PlayersService,
      PlayersdeatiledResolver,
      PlayersResolver,
      UserService,
      EditprofileResolver,
      DashboardResolver,
      SelectplayerResolver,
      FilteredplayersService,
      TeamdetailService,
      TeamsalaryService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }

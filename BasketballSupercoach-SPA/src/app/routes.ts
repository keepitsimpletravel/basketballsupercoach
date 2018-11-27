import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlayersComponent } from './players/players.component';
import { RankingsComponent } from './rankings/rankings.component';
import { TeamComponent } from './team/team.component';
import { AuthGuard } from './_guards/auth.guard';
import { PlayersdetailedComponent } from './playersdetailed/playersdetailed.component';
import { PlayersdeatiledResolver } from './_resolvers/playersdetailed.resolver';
import { resolve } from 'url';
import { PlayersResolver } from './_resolvers/players.resolver';
import { SelectplayerComponent } from './selectplayer/selectplayer.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { EditprofileResolver } from './_resolvers/editprofile.resolver';
import { SelectplayerResolver } from './_resolvers/selectplayer.resolver';
import { DashboardResolver } from './_resolvers/dashboard.resolver';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], resolve: { user: DashboardResolver } },
    { path: 'players', component: PlayersComponent, canActivate: [AuthGuard], resolve: { players: PlayersResolver } },
    { path: 'players/:id', component: PlayersdetailedComponent, canActivate: [AuthGuard], resolve: {player: PlayersdeatiledResolver}},
    { path: 'rankings', component: RankingsComponent, canActivate: [AuthGuard] },
    { path: 'team', component: TeamComponent, canActivate: [AuthGuard] },
    // tslint:disable-next-line:max-line-length
    { path: 'selectplayer/:pos', component: SelectplayerComponent, canActivate: [AuthGuard], resolve: { specificplayers: SelectplayerResolver } },
    // {path : 'heroes', component : HeroDetailComponent, data : {some_data : 'some value'}}
    { path: 'editprofile', component: EditprofileComponent, canActivate: [AuthGuard], resolve: {user: EditprofileResolver} },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

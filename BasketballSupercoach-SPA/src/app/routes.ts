import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PlayersComponent } from "./players/players.component";
import { RankingsComponent } from "./rankings/rankings.component";
import { TeamComponent } from "./team/team.component";
import { AuthGuard } from "./_guards/auth.guard";

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'players', component: PlayersComponent, canActivate: [AuthGuard] },
    { path: 'rankings', component: RankingsComponent, canActivate: [AuthGuard] },
    { path: 'team', component: TeamComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

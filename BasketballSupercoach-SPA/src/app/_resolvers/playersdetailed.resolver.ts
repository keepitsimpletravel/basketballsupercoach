import { Injectable } from '@angular/core';
import { Player } from '../_models/player';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { PlayersService } from '../_services/players.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Scoreforplayer } from '../_models/scoreforplayer';

@Injectable()
export class PlayersdeatiledResolver implements Resolve<Player> {
    constructor(private playerService: PlayersService, private router: Router, private alertify: AlertifyService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Scoreforplayer> {
        return this.playerService.getDetailedPlayer(route.params['id']).pipe(
            catchError(error =>  {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/players']);
                return of(null);
            })
        );
    }
}

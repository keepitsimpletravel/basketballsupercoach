import { Injectable } from '@angular/core';
import { Player } from '../_models/player';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { PlayersService } from '../_services/players.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class SelectplayerResolver implements Resolve<Player[]> {
    constructor(private playerService: PlayersService, private router: Router, private alertify: AlertifyService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Player[]> {
        console.log('here');
        return this.playerService.getPlayers().pipe(
            catchError(error =>  {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/team']);
                return of(null);
            })
        );
    }
}

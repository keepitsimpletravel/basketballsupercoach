import { Injectable } from '@angular/core';
import { Player } from '../_models/player';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { PlayersService } from '../_services/players.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FilteredplayersService } from '../_services/filteredplayers.service';

@Injectable()
export class SelectplayerResolver implements Resolve<Player[]> {
    constructor(private playerService: FilteredplayersService, private router: Router, private alertify: AlertifyService) { }

    position: number;

    resolve(route: ActivatedRouteSnapshot): Observable<Player[]> {
        this.position = +route.params['pos'];

        return this.playerService.getSpecificPlayers(this.position).pipe(
            catchError(error =>  {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/team']);
                return of(null);
            })
        );
    }
}

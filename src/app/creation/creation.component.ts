import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import { Observable } from 'rxjs';
import { UserReservation } from './userReservation';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.css']
})
export class CreationComponent implements OnInit {

  public users$: Rx.Observable<any>;
   public reservation$: Rx.Observable<any>;
   public userReservation: UserReservation[] = [];
  constructor() { }

  ngOnInit() {
   this.users$ = Rx.Observable.of([
      { id: 1111, name: 'User 1', email: 'u1@dummy.com' },
      { id: 2222, name: 'User 2', email: 'u2@dummy.com' },
      { id: 3333, name: 'User 3', email: 'u3@dummy.com' }
    ]);

    this.reservation$ = Rx.Observable.of([
      { id: 1, title: 'reservetion 1', userid: 1111 },
      { id: 2, title: 'reservation 2', userid: 2222 },
      { id: 3, title: 'reservation 3', userid: 3333 }
    ]);

    this.getRes().subscribe();

  }

getRes(): Observable<any> {


 return this.reservation$
      .switchMap(reservations => {
          return this.users$.map(users => { 
          
             reservations.forEach( (reservation) => {
                users.forEach ( (user) => {
                   if(reservation.userid == user.id){
                      let res: UserReservation = new UserReservation()
                      res.title = reservation.title;
                      res.name = user.name;
                      res.email = user.email;
                      this.userReservation.push(res);
                   }
                });
             });

             return this.userReservation;
        })
      }
  );

//return Observable.of(this.userReservation);
}
}
import { Component, OnDestroy, OnInit } from '@angular/core';
import { User, UserInfos } from '../models/user.model';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  user!: User;
  userId!: number;
  orders!: Order[];
  constructor(
    private _tokenService: TokenService,
    private _userService: UserService
  ) {}
  ngOnDestroy(): void {
    console.log('cc');
  }

  getOrders() {
    this._userService.getOrders(this.userId).subscribe({
      next: (orders) => {
        console.log(orders);

        this.orders = orders;
      },
    });
  }

  ngOnInit() {
    const user: UserInfos = this._tokenService.readToken();
    this.userId = user.id;
    this._userService.getById(this.userId).subscribe({
      next: (user: User) => {
        (this.user = user), console.log(user);
      },
      error: (err) => console.log(err),
    });
  }
}

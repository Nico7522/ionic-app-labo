import { Component, OnInit } from '@angular/core';
import { User, UserInfos } from '../models/user.model';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user!: User;
  userId!: number;
  constructor(
    private _tokenService: TokenService,
    private _userService: UserService
  ) {}

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

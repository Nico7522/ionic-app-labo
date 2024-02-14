import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from '../services/token.service';
import { User, UserInfos } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.scss'],
})
export class UserdetailsComponent implements OnInit {
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

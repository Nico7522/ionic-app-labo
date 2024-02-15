import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activeaccount',
  templateUrl: './activeaccount.component.html',
  styleUrls: ['./activeaccount.component.scss'],
})
export class ActiveaccountComponent  implements OnInit {
  id!: number;
  constructor(private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this._activatedRoute.snapshot.params["id"];
    console.log(this.id);
    
  }

}

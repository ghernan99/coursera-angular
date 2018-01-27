import { Leader } from './../shared/leader';
import { LeaderService } from './../services/leader.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private leaderService: LeaderService) { }

  leaders: Leader[];

  ngOnInit() {
    this.leaderService.getLeaders().then(leaders => this.leaders = leaders);
  }

}

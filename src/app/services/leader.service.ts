import { LEADERS } from './../shared/leaders';
import { Injectable } from '@angular/core';
import { Leader } from '../shared/Leader';

@Injectable()
export class LeaderService {

  constructor() { }

  getLeaders(): Promise<Leader[]> {
    return Promise.resolve(LEADERS);
  }

  getLeader(id: number): Promise<Leader> {
    return Promise.resolve(LEADERS.filter((Leader) => (Leader.id === id))[0]);
  }

  getFeaturedLeader(): Promise<Leader> {
    return Promise.resolve(LEADERS.filter((Leader) => Leader.featured)[0]);
  }  
}
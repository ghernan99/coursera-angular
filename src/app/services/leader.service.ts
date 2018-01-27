import { LEADERS } from './../shared/leaders';
import { Injectable } from '@angular/core';
import { Leader } from '../shared/Leader';

@Injectable()
export class LeaderService {

  constructor() { }

  getLeaders(): Promise<Leader[]> {
    return new Promise(resolve => {
      setTimeout(()=> resolve(LEADERS), 2000);
    });
  }

  getLeader(id: number): Promise<Leader> {
    return new Promise(resolve => {
      setTimeout(()=> resolve(LEADERS.filter((Leader) => (Leader.id === id))[0]), 2000);
    });
  }

  getFeaturedLeader(): Promise<Leader> {
    return new Promise(resolve =>{
      setTimeout(()=> resolve(LEADERS.filter((Leader) => Leader.featured)[0]), 2000);
    });    
  }  
}
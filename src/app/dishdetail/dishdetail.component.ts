import { DishService } from './../services/dish.service';
import { Dish } from './../shared/dish';
import { Component, Input, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;

  constructor(private dishService: DishService, 
              private location: Location,
              private route: ActivatedRoute) { }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    this.dishService.getDish(id).subscribe(dish => this.dish = dish);
  }

  goBack(): void {
    this.location.back();
  }
}

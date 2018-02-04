import { Http } from '@angular/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Injectable, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DishService {

  constructor(private http: Http, private processHTTPMsgService: ProcessHTTPMsgService, @Inject('BaseURL') private BaseURL ) { }

  getDishes(): Observable<Dish[]> {
    return this.http.get(this.BaseURL + 'dishes')
                    .map(res => { return this.processHTTPMsgService.extractData(res); })
                    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  getDish(id: number): Observable<Dish> {
    return  this.http.get(this.BaseURL + 'dishes/'+ id)
                    .map(res => { return this.processHTTPMsgService.extractData(res); })
                    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get(this.BaseURL + 'dishes?featured=true')
                    .map(res => { return this.processHTTPMsgService.extractData(res)[0]; })
                    .catch(error => { return this.processHTTPMsgService.handleError(error); });
  }

  getDishIds(): Observable<number[] | any> {
    return this.getDishes()
      .map(dishes => { return dishes.map(dish => dish.id); })
      .catch(error => { return error; } );
  }
}
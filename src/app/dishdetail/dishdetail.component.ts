import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DishService } from './../services/dish.service';
import { Dish } from './../shared/dish';
import { Component, Input, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Comment } from './../shared/comment';


@Component({
  selector: 'dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;

  commentForm: FormGroup;
  comment: Comment;  
  formErrors = {
    'author': '',
    'rating': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required':      'Your name is required.',
      'minlength':     'Your name must be at least 2 characters long.',
      'maxlength':     'Your name cannot be more than 25 characters long.'
    },
    'rating': {
      'required':      'Your rating is required.',
      'min':     'Your rating must be between 1 and 5.',
      'max':     'Your rating must be between 1 and 5.'
    },
    'comment': {
      'required':      'Your comment is required.'
    }
  };

  constructor(private dishService: DishService, 
              private location: Location,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
      this.createForm();
  }

  ngOnInit() {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
      .switchMap((params: Params) => this.dishService.getDish(+params['id']))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); this.resetCommentForm();});
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1)%this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1)%this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm(): void {
   this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      rating: [ 5, [Validators.required, Validators.min(1), Validators.max(5)] ],
      comment: ['', Validators.required ]
    });
    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
        
    this.comment = {
                rating: this.commentForm.get('rating').value,
                comment: this.commentForm.get('comment').value,
                author: this.commentForm.get('author').value,
                date: (new Date()).toISOString()
            };

    this.dish.comments.push(this.comment);

    this.resetCommentForm();
  }

  resetCommentForm(){
    this.commentForm.reset({
      author: '',
      rating: 5,
      comment: ''      
    });        
  }
}


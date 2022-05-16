import { Component, OnInit } from '@angular/core';
import { DiscountResponseModel } from 'src/app/shared/models/discount.model';
import { DiscountsService } from 'src/app/shared/services/discounts.service';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent implements OnInit {

  public discounts = new Array<DiscountResponseModel>();

  constructor(private discountService: DiscountsService,) { }

  ngOnInit(): void {
    this.discountService.getAll().subscribe(discounts => {
      this.discounts = discounts;
    })
  }

}

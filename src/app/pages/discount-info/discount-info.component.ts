import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscountResponseModel } from 'src/app/shared/models/discount.model';
import { DiscountsService } from 'src/app/shared/services/discounts.service';

@Component({
  selector: 'app-discount-info',
  templateUrl: './discount-info.component.html',
  styleUrls: ['./discount-info.component.scss']
})
export class DiscountInfoComponent implements OnInit {

  public discount!:DiscountResponseModel;
  public descriptionThese!:Array<string>;

  constructor(
    private discountsService: DiscountsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getOneDiscount();
  }

  getOneDiscount(): void {
    const DISCOUNT_ID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.discountsService.getOne(DISCOUNT_ID).subscribe(data => {
      this.discount = data;
      this.descriptionThese = this.discount.description.split('\n');
    })
  }

}

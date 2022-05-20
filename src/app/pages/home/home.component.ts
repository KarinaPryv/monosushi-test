import { Component, OnInit } from '@angular/core';
import { ProductResponseModel } from 'src/app/shared/models/product.model';
import { ProductsService } from 'src/app/shared/services/products.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public products = new Array<ProductResponseModel>();

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.getAll().subscribe(products => {
      this.products = products;
    })
  }

}

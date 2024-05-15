import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/products';

@Component({
  selector: 'app-product-details',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Fetch the product data from ProductService
    this.productService.getProductById("oOY7fKF0omgAAgIyMMuE1u2iMRm2").subscribe(product => {
      console.log(product)
      this.product = product;
    });
  }

}

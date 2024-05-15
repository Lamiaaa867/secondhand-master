import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/products';
import { Observable } from 'rxjs';
import { WishlistService } from '../../services/wishlist.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductDetailsComponent implements OnInit {
[x: string]: any;
  product?: Product;
  isInWishlist = false;
  constructor(private productService: ProductService,
    private wishlistService:WishlistService
  ) {}

  ngOnInit(): void {
    // Fetch the product data from ProductService
    this.productService.getProductById("oOY7fKF0omgAAgIyMMuE1u2iMRm2").subscribe(product => {
      console.log(product)
      this.product = product;
     // Check if product is in wishlist
     if (product) {
      this.wishlistService.productInWishlist("userId", product.id).subscribe(inWishlist => {
        this.isInWishlist = inWishlist
        })
  }
  });
  }



  addToWishlist(productId: string): void {
    this.productService.addToWishlist(productId).subscribe(() => {
      console.log('Product added to wishlist successfully.');
    }, error => {
      console.error('Error adding product to wishlist:', error);
    });
  }
 
}

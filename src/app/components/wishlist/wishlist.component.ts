// wishlist.component.ts


// wishlist.component.ts
import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlistItems: any[] | undefined;

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    // Assuming you have userId available, fetch wishlist items
    const userId = 'your-user-id';
    this.wishlistService.getWishlist(userId).subscribe(items => {
      this.wishlistItems = items;
    });
  }

  
    
  
     /* editItemInWishlist(itemId: string, newItemId: string): void {
        // Assuming you have userId available
        const userId = 'your-user-id';
        this.wishlistService.removeFromWishlist(userId, itemId).then(() => {
          console.log('Item removed from wishlist successfully.');
          // Add the new item to the wishlist
          this.addItemToWishlist(newItemId);
        }).catch(error => {
          console.error('Error removing item from wishlist:', error);
        });
      }*/
    
      /*removeItemFromWishlist(itemId: string): void {
        // Assuming you have userId available
        const userId = 'your-user-id';
        this.wishlistService.removeFromWishlist(userId, itemId).then(() => {
          console.log('Item removed from wishlist successfully.');
        }).catch(error => {
          console.error('Error removing item from wishlist:', error);
        });
      }*/
      
    }
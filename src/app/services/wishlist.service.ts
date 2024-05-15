// wishlist.service.ts

import { Injectable } from '@angular/core';
import { Firestore , collection, deleteDoc, doc, docData, getDocs, query, setDoc } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private firestore: Firestore) { }

  productInWishlist(userId: string, productId: string): Observable<boolean> {
    // Construct the Firestore document reference for the product in the user's wishlist
    const wishlistDocRef = doc(this.firestore, `users/${userId}/wishlist/${productId}`);
    
    // Retrieve the document data as an observable
    return docData(wishlistDocRef).pipe(
      // Map the document data to a boolean value indicating whether the product is in the wishlist
      map(data => !!data) // Convert to boolean
    );
  }
  
  getWishlist(userId: string): Observable<any[]> {
     // Reference to the user's wishlist collection
     const wishlistCollectionRef = collection(this.firestore, `users/${userId}/wishlist`);
    
     // Query to get all documents in the wishlist collection
     const q = query(wishlistCollectionRef);
 
     // Execute the query and return an observable of the documents' data
     // Execute the query and return an observable of the documents' data
     return new Observable<any[]>(subscriber => {
      getDocs(q).then(querySnapshot => {
        const wishlistItems: any[] | undefined = [];
        querySnapshot.forEach(doc => {
          wishlistItems.push(doc.data());
        });
        subscriber.next(wishlistItems);
      }).catch(error => {
        subscriber.error(error);
      });
    });
  }

  removeFromWishlist(userId: string, itemId: string): Promise<void> {
  // Reference to the user's wishlist document to be deleted
  const wishlistDocRef = doc(this.firestore, `users/${userId}/wishlist/${itemId}`);
    
  // Delete the document
  return deleteDoc(wishlistDocRef);
  }
}

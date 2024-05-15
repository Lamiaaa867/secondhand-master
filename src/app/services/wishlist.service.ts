// wishlist.service.ts

import { Injectable } from '@angular/core';
import { Firestore , collection, deleteDoc, doc, getDocs, query, setDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private firestore: Firestore) { }

  addToWishlist(userId: string, itemId: string): Promise<void> {
     // Reference to the user's wishlist document
     const wishlistDocRef = doc(this.firestore, `users/${userId}/wishlist/${itemId}`);
    
     // Data to be set in the wishlist document
     const data = {
       itemId: itemId,
       addedAt: new Date().toISOString()
     };
 
     // Set the document with the specified data
     return setDoc(wishlistDocRef, data);
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

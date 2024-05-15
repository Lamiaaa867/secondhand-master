import { Injectable } from '@angular/core';
import { Firestore, collection, doc, query, DocumentData, DocumentSnapshot, collectionData, docData, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsCollectionRef: any; // Firestore collection reference

  constructor(private firestore: Firestore) {
    this.productsCollectionRef = collection(firestore, 'listings');
  }

  getProducts(): Observable<Product[]> {
    const productsQuery = query(this.productsCollectionRef);
    return collectionData(productsQuery).pipe(
      map((products: DocumentData[]) => {
        return products.map(productData => {
          const id = productData['id'];
          const data = productData['data'];
          return { id, ...data } as Product;
        });
      })
    );
  }

  getProductById(productId: string): Observable<Product | undefined> {
    const productDocRef = doc(this.firestore, 'listings', productId);
    return docData(productDocRef)as Observable<Product>
  }

  addProduct(product: Product):Observable<any> {
    return from(setDoc(doc(this.firestore, 'listings', product?.id), product));
    
  }
  // Check if product is in wishlist
  productInWishlist(userId: string, productId: string): Observable<boolean> {
    const wishlistDocRef = doc(this.firestore, `users/${userId}/wishlist/${productId}`);
    return docData(wishlistDocRef).pipe(
      map(data => !!data) // Convert to boolean
    );
  }
  
  addToWishlist(productId: string): Observable<any> {
    const wishlistDocRef = doc(this.firestore, 'wishlist', productId);
    const data = { productId, addedAt: new Date().toISOString() };
    return from(setDoc(wishlistDocRef, data));
  }
}

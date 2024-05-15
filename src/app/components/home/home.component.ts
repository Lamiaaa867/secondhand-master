import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FormControl } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { combineLatest, filter, map, startWith, switchMap, tap } from 'rxjs';
import { user } from '@angular/fire/auth';
import { ProfileUser } from '../../models/user-profile';
import { ChatsService } from '../../services/chats.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  
  constructor(
    private chatRouter : Router 
    ,
    private route:ActivatedRoute
    ,private authService : AuthenticationService , private usersService: UsersService, private chatsService: ChatsService){ }
  
  user$ = this.authService.currentUser$;

  // users$ =this.usersService.allUsers$;

  searchControl = new FormControl('');
  chatListControl = new FormControl();
  messageControl =new FormControl('');

  users$ = combineLatest([this.usersService.allUsers$ ,
     this.user$,
      this.searchControl.valueChanges.pipe(startWith(''))
    ]).pipe(
      map(([users, user, searchString]) => users.filter(u => u.displayName && u.displayName.toLowerCase().includes(searchString!.toLowerCase()) && u.uid !== user?.uid))
  );

  myChats$ = this.chatsService.myChats$;

  selectedChat$ = combineLatest([
    this.chatListControl.valueChanges,
    this.myChats$
  ]).pipe(
    map((
      [value, chats]) => { 
        const urlid = value[0]; // Get the selected chat ID
      /*  if (urlid) {
          this.navigateToChat(urlid); // Navigate to the selected chat URL
        }*/
        return chats.find(c => c.id === urlid);
      }
      )
  )
   
  navigateToChat(chatId: string) {
    // Construct the URL based on the chatId
    this.chatListControl.setValue([chatId]); 
    const url = `/home/${chatId}`; // Example URL structure
  
    this.chatRouter.navigate([url], { relativeTo: this.route }); // Navigate to the chat URL
  }
    messages$ = this.chatListControl.valueChanges.pipe(
      map(value => value[0]),
      switchMap(chatId => this.chatsService.getChatMessages$(chatId))
    )
 
    ngOnInit(): void {
      this.route.params.pipe(
        filter(params => params['chatid']), // Use bracket notation to access the parameter
        map(params => params['chatid']), // Use bracket notation to access the parameter
        tap(chatId => {
          this.chatListControl.setValue([chatId]); // Set the chatListControl value to the extracted chatid
        //  this.navigateToChat(chatId); // Navigate to the selected chat URL
        })
      ).subscribe();
    }

   createChat(otherUser: ProfileUser){
     this.chatsService.createChat(otherUser).subscribe();
   }
    
   sendMessage(){
    const message = this.messageControl.value;
    const selectedChatId =this.chatListControl.value[0];

    if (message && selectedChatId) {
      this.chatsService.addChatMessage(selectedChatId, message).subscribe();
      this.messageControl.setValue('');
    }
   }
}

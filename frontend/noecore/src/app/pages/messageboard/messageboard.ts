import { Component, inject, signal, Signal, WritableSignal } from '@angular/core';
import { MessageboardService } from '../../services/messageboardService/messageboard-service';
import { GetPostsResponse } from '../../interfaces/requests';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NotificationService } from '../../services/notificationService/notification-service';
import { MatCardModule } from '@angular/material/card';

@Component({
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  selector: 'app-messageboard',
  styleUrl: './messageboard.scss',
  templateUrl: './messageboard.html',
})
export class Messageboard {
  private msgboardService = inject(MessageboardService)
  protected notificationService = inject(NotificationService)

  protected posts: WritableSignal<GetPostsResponse> = signal({posts:[]})

  private fb: FormBuilder = new FormBuilder()
  protected form: FormGroup = this.fb.group({
    message: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(150)]]
  })

  constructor() {
    this.updatePosts()
  }

  async updatePosts() {
    this.posts.set( await this.msgboardService.getPosts())
  }

  async submitForm(){
    if (this.form.valid){

      const res = await this.msgboardService.post({post: this.form.value.message})
      
      if (res !== "Success!"){
        this.notificationService.error(res)
      }
    }

    this.updatePosts()
  }
}

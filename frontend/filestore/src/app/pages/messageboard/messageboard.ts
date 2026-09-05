import { Component, inject, signal, Signal, WritableSignal } from '@angular/core';
import { MessageboardService } from '../../services/messageboardService/messageboard-service';
import { GetPostsResponse } from '../../interfaces/requests';

@Component({
  imports: [],
  selector: 'app-messageboard',
  styleUrl: './messageboard.scss',
  templateUrl: './messageboard.html',
})
export class Messageboard {
  private msgboardService = inject(MessageboardService)
  protected posts: WritableSignal<GetPostsResponse> = signal({posts:[]})

  constructor() {
    this.init()
  }

  async init() {
    this.posts.set( await this.msgboardService.getPosts())
  }
}

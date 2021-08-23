export class PostComments {

  id: number;
  user_id: number;
  comments: string;
  story_id: number;


  constructor(options: any = {}) {
    this.id = options.id || "";
    this.user_id = options.user_id || "";
    this.comments = options.comments || "";
    this.story_id = options.story_id || "";
  }
}
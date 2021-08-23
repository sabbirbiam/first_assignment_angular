import { PostComments } from "./commet-model";
import { User } from "./user-model";

export class Stories {

  id: number;
  dob: Date;
  blocked: number;
  comment: PostComments[];
  section: string;
  story: string;
  storycaption: string;
  storyimage: any;
  tags: string;
  user_id: number;
  user: User;
  created_at: Date;
  title:string;


  constructor(options: any = {}) {
    this.id = options.id || null;
    this.user_id = options.user_id || null;
    this.title = options.title || null;
    this.blocked = options.blocked || null;
    this.section = options.section || "";
    this.story = options.story || "";
    this.user = options.user ? new User(options.user) : new User();
    this.storycaption = options.storycaption || "";
    this.storyimage = options.storyimage || "";
    this.dob = options.dob ? new Date(options.dob) : null;
    this.created_at = options.created_at ? new Date(options.created_at) : null;
    this.tags = options.tags;
    this.comment = (options.comment) ? options.comment : new Array<PostComments>();
  }
}
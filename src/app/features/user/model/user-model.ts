export class User {

  email: string;
  gender: number;
  dob: Date;
  name: string;
  id: number;
  status: number;
  type: string;
  username: string;

  constructor(options: any = {}) {
    this.id = options.id || "";
    this.gender = options.gender || null;
    this.name = options.name || "";
    this.email = options.email || "";
    this.status = options.status || null;
    this.type = options.type || "";
    this.username = options.username || "";
    this.dob = options.dob ? new Date(options.dob) : null;
  }
}
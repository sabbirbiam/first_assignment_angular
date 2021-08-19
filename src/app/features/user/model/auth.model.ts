export class Registration {
  fullName:string;
  email:string;
  username:string;
  imageUrl:string;
  password:string;
  confirmPassword:string;
  constructor(options: any = {}) {
    this.fullName = options.fullName || null;
    this.email = options.email || null;
    this.username = options.username || null;
    this.imageUrl = options.imageUrl || null;
    this.password = options.password || null;
    this.confirmPassword = options.confirmPassword || null;
  }
}

export class RegistrationResponse {
  success: boolean;
  data: any;
  message: string;
  constructor(options: any = {}) {
    this.success = options.success || false;
    this.data = options.data || null;
    this.message = options.message || "";
  }
}

export class LoginResponse {
  success: boolean;
  data: LoginData;
  message: string;
  constructor(options: any = {}) {
    this.success = options.success || false;
    this.data = options.data || null;
    this.message = options.message || "";
  }
}

export class LoginData {
  token:string;
  isSuccess:boolean;
  expireDate:string;
  role:string[];
}
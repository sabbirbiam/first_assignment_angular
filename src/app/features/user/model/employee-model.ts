export class Employee {

  department: number;
  designation: string;
  dob: Date;
  firstName: string;
  id: string;
  joiningDate: Date;
  lastName: string;
  middleName: string;

  constructor(options: any = {}) {
    this.id = options.id || "";
    this.firstName = options.firstName || "";
    this.lastName = options.lastName || "";
    this.middleName = options.middleName || "";
    this.designation = options.designation || "";
    this.department = options.department || "";
    this.dob = options.dob ? new Date(options.dob) : null;
    this.joiningDate = options.joiningDate ? new Date(options.joiningDate) : null;
  }
}
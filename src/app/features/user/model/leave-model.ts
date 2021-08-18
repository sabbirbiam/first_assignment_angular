export class Leave {

  department: number;
  employeeId: string;
  strarDate: Date;
  leaveType: number;
  id: string;
  endDate: Date;
  description: string; 
  empName: string; 

  constructor(options: any = {}) {
    this.id = options.id || "";
    this.leaveType = options.leaveType || null;
    this.empName = options.empName || ""; 
    this.description = options.description || ""; 
    this.employeeId = options.employeeId || "";
    this.department = options.department || "";
    this.strarDate = options.strarDate ? new Date(options.strarDate) : null;
    this.endDate = options.endDate ? new Date(options.endDate) : null;
  }
}
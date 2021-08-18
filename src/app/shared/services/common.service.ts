import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private toast:ToastrService) {
   
  }
  public toastSuccess(desc="", title="Success"):void{
    this.toast.success(desc, title);
  }
  public toastWarning(desc = "", title ="Warning"):void{
    this.toast.warning(desc, title);
  }
  public toastError(desc = "", title ="Error"):void{
    this.toast.error(desc, title);
  }
  public toastInfo(desc = "", title ="Info"):void{
    this.toast.info(desc, title);
  }

  public getDateDashFormate(date){
    if(!date){
      return null;
    }
    let dateObj = new Date(date);
    let month:any = dateObj.getUTCMonth() + 1; //months from 1-12
    let day:any = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    if(month<10){
      month = "0"+month;
    }
    if(day<10){
      day = "0"+day;
    }

    return year + "-" + month + "-" + day;
  }

  
}

import { HighlightSearchPipe } from './../../pipe/highlight-search.pipe';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AppState } from './../../shared/app.state';
import { Feedback } from '../../redux/models/feedback.model';

import { Component, Pipe, OnInit, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { Customer } from 'src/app/redux/models/customer.model';
import { ToastService } from 'angular-toastify';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'highlight'
})
export class HighlightSearch implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(value: any, args: any): any {
    if (!args) {
      return value;
    }
    // Match in a case insensitive maneer
    const re = new RegExp(args, 'gi');
    const match = value.match(re);

    // If there's no match, just return the original value.
    if (!match) {
      return value;
    }

    const replacedValue = value.replace(re, `<mark style=" color: #b91313;
    font-weight: bold;">` + match[0] + "</mark>")
    return this.sanitizer.bypassSecurityTrustHtml(replacedValue)
  }
}
@Component({
  selector: 'app-customer-feedback',
  templateUrl: './customer-feedback.component.html',
  styleUrls: ['./customer-feedback.component.css']
})
export class CustomerFeedbackComponent implements OnInit {
  p = 1
  searchfilter: any
  feedbacksearchfilter: any
  customerList: Customer[] | any
  feedbackList: Feedback[] | any
  customer: any = "";
  showCustForm: boolean = false
  showFeedForm: boolean = false
  feedback: any = ""
  customerFeedbackList: any = [];
  currentCustomerName: any;
  customerIdToUpdate: any;
  customerToUpdate: any;
  search: any;
  showCustomerFeedbackList: boolean = false;


  constructor(private store: Store<AppState>, private toastr: ToastrService,) {
    store.pipe(select('customers')).subscribe((data: any) => {
      this.customerList = data
    })

    store.pipe(select('feedback')).subscribe((data: any) => {
      this.feedbackList = data
    })


  }

  ngOnInit() {

  }

  clearCustomerInputAndCloseForm() {
    this.customer = ''
    this.showCustForm = false
  }
  
  addCustomer(e: any) {
    let x = e.keyCode;
    if (x === 27) {
      this.clearCustomerInputAndCloseForm()
    }

    if (e.key === "Enter") {
      if (this.customer === '') {
        this.toastr.error("", "Please fill a Customer")
        return
      }
      this.store.dispatch({
        type: 'ADD_CUSTOMER',
        payload: <Customer>{
          id: this.customerList.length + 1,
          name: this.customer,
        }
      });
      this.clearCustomerInputAndCloseForm()
      this.toastr.success('', "Customer Created")

    }


  }



  showCustomerForm() {
    this.showCustForm = true
  }

  showFeedBackForm() {
    this.showFeedForm = true
  }

  getSelectedCustomerFeedback(data: any) {
    this.showCustomerFeedbackList = true
    this.store.dispatch({ type: "ALL_FEEDBACKS", payload: this.feedbackList })
    this.store.dispatch({ type: "FILTER_FEEDBACK", payload: data })
    this.currentCustomerName = data
    this.customerFeedbackList = this.feedbackList

  }

  addNewCustomerFeedback() {
    let feedback = {
      id: this.customerFeedbackList.length + 1,
      feedback: this.feedback,
      customerId: this.currentCustomerName.id
    }
    this.store.dispatch({ type: "ADD_FEEDBACK", payload: feedback })
    this.feedback = ''
    this.showFeedForm = false
    this.toastr.success('', "Feedback added")
  }
  updateSearch(e: any) {
    this.searchfilter = e.target.value
  }

}

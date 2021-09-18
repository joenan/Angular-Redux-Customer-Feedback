import { Feedback } from './../redux/models/feedback.model';
import { Customer } from 'src/app/redux/models/customer.model';
import { addCustomersReducer } from '../redux/reducers/customer.reducer';
import { feedbackReducer } from '../redux/reducers/feedback.reducer';

export interface AppState {
  customers: Customer[],
  feedback: Feedback[]
}

export const appReducer = {
  customers: addCustomersReducer,
  feedback: feedbackReducer
}

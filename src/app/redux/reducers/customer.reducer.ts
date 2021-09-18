import { Customer } from 'src/app/redux/models/customer.model';


export const ADD_CUSTOMER = 'ADD_CUSTOMER';

export const CONTACT_INITIAL_STATE: Customer[] = [
  { id: 1, name: "John Legend" },
  { id: 2, name: "Hamid Ali" },
  { id: 3, name: "Philip Kahn" },
  { id: 4, name: "Martha Johnson" }
];



export function addCustomersReducer(state: Customer[] = CONTACT_INITIAL_STATE, action: any) {
  switch (action.type) {
    case ADD_CUSTOMER:
      return [...state, action.payload];
    default:
      return state;
  }
}




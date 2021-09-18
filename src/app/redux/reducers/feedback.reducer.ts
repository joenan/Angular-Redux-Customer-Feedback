import { Feedback } from './../models/feedback.model';

var FEEDBACK_CURRENT_STATE = [
  { id: 1, feedback: "Clicked Button Liked", customerId: 1 },
  { id: 2, feedback: "Praying I have a chance to showcase my skills", customerId: 1 },
  { id: 3, feedback: "Trending in Aso Rock", customerId: 3 },
  { id: 4, feedback: "Volcanic Reaction is not good", customerId: 4 }
];


export const feedbackReducer = (state: any = FEEDBACK_CURRENT_STATE, action: any) => {
  switch (action.type) {
    case 'ADD_FEEDBACK':
      console.log(action.payload)
      FEEDBACK_CURRENT_STATE = Object.assign([], FEEDBACK_CURRENT_STATE);

      // FEEDBACK_CURRENT_STATE.push(action.payload)
      FEEDBACK_CURRENT_STATE.findIndex(x => x.feedback === action.payload.feedback) === -1 ? FEEDBACK_CURRENT_STATE.push(action.payload) : FEEDBACK_CURRENT_STATE
      //next line filters comments from a user


      var currentStateAfterUserFilter = FEEDBACK_CURRENT_STATE.filter(x => x.customerId === action.payload.customerId);
      state = currentStateAfterUserFilter
      return state;


    case 'CLEAR_FEEDBACK':
      state = []
      return state;

    case 'FILTER_FEEDBACK':
      var filteredFeedbacks = state.filter((c: any) => c.customerId === action.payload.id);
      state = filteredFeedbacks
      return state;

    case 'ALL_FEEDBACKS':
      state = FEEDBACK_CURRENT_STATE;
      return state;

    default:
      return state;

  }

};

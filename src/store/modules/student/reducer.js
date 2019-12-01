import produce from 'immer';

const INITIAL_STATE = {
  student: null,
  loading: false,
};

export default function student(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@student/REGISTER_REQUEST': {
        console.tron.log('entrou no reducer request');
        draft.loading = true;
        break;
      }
      case '@student/REGISTER_SUCCESS': {
        console.tron.log('entrou no reducer Success');
        draft.student = action.payload;
        draft.loading = false;
        break;
      }
      case '@student/REGISTER_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}

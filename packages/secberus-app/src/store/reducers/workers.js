import WorkerActions from '../actions/workers';

const initialState = async () => {
  const state = {
    workers: [],
    supportsWorkers: typeof window.Worker !== 'undefined',
  };

  return state;
};

const reducer = (state = initialState(), action) => {
  let copy = state;
  switch (action.type) {
    case WorkerActions.SET_ATTRIBUTE:
      copy[action.key] = action.value;
      break;
    case WorkerActions.SET_THREAD_UTILIZATION:
      copy.workers[action.index].utilized = action.utilized;
      break;
    case WorkerActions.CLEAR_WORKERS_REFERENCES:
      copy.workers.workers = [];
      break;
    default:
  }
  return copy;
};

export default reducer;

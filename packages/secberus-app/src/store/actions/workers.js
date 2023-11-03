const WorkerActions = {
  SET_ATTRIBUTE: 'WORKER_SET_ATTRIBUTE',
  SET_THREAD_UTILIZATION: 'WORKER_SET_THREAD_UTILIZATION',
  CLEAR_WORKERS_REFERENCES: 'WORKER_CLEAR_REFERENCES',
};

// Listed first = highest priority for workers.=
const WorkerPooling = {
  HTTP: '/workers/request.js',
};

const DedicatedWorkers = [
  {
    id: 'policy_alerts_critical',
    pool: 0.5,
    key: 'HTTP',
  },
  {
    id: 'policy_alerts_high',
    pool: 0.5,
    key: 'HTTP',
  },
  {
    id: 'policy_alerts_low',
    pool: 0.5,
    key: 'HTTP',
  },
  {
    id: 'policy_alerts_medium',
    pool: 0.5,
    key: 'HTTP',
  },
  {
    id: 'policy_alerts_quiet',
    pool: 0.1,
    key: 'HTTP',
  },
  {
    id: 'policy_exec_duration',
    pool: 0.2,
    key: 'HTTP',
  },
  {
    id: 'policy_rules_error',
    pool: 0.2,
    key: 'HTTP',
  },
  {
    id: 'policy_rules_failed',
    pool: 0.5,
    key: 'HTTP',
  },
  {
    id: 'policy_rules_passed',
    pool: 0.5,
    key: 'HTTP',
  },
  {
    id: 'policy_rules_percentage_passed',
    pool: 0.5,
    key: 'HTTP',
  },
  {
    id: 'policy_audit_data',
    pool: 0.3,
    key: 'HTTP',
  },
  {
    id: 'dpi_audit_data',
    pool: 0.3,
    key: 'HTTP',
  },
  {
    id: 'dpi_risk_scores',
    pool: 0.3,
    key: 'HTTP',
  },
  {
    id: 'policy_data',
    pool: 0.3,
    key: 'HTTP',
  },
  {
    id: 'category_posture_summary',
    pool: 0.5,
    key: 'HTTP',
  },
];

const initializeWorkers = async res => {
  const workers = !!window.Worker;
  const threadCount = navigator.hardwareConcurrency - 1 || 8;
  let newWorkers;
  if (workers) {
    newWorkers = {};
    DedicatedWorkers.forEach(({ key, pool, id }) => {
      newWorkers[id] = Array(Math.ceil(threadCount * pool)).fill(
        // eslint-disable-next-line no-undef
        new Worker(WorkerPooling[key])
      );
    });
    res(newWorkers);
  }
  res(false);
};

export const workersSetAttribute = (key, value) => dispatch =>
  dispatch({ type: WorkerActions.SET_ATTRIBUTE, key, value });

export const fillWorkers = () => async dispatch => {
  if (window.Worker) {
    const workers = await new Promise(res => initializeWorkers(res));
    dispatch(workersSetAttribute('workers', workers));
  }
};

export const terminateWorkersAndRebuild = () => async (dispatch, getState) => {
  // TERMINATE EXISTING WORKER ITEMS TO PREVENT RACE ISSUES AND MEMORY CLEANUP
  // Workers are memory hogs, and when we return a ton of requests in the
  // middle of an auth refresh, it can have consequences.
  // We need to delete references to these workers and generate new workers
  // Otherwise we will have a large amount of data returning and can slow
  // the application heavily on older machines
  if (window.Worker) {
    Object.keys(getState().workers.workers).map(workerKey => {
      const workers = getState().workers.workers[workerKey];
      if (workers.length > 0) {
        workers.forEach(worker => {
          if (worker instanceof Worker) { //eslint-disable-line
            worker.terminate();
          }
        });
      }
    });
  }
  dispatch({
    type: WorkerActions.CLEAR_WORKERS_REFERENCES,
  });
  dispatch(fillWorkers());
};

export default WorkerActions;

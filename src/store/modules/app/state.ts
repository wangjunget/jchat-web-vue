export interface States {
  tipModal: {
    title: string;
    tip: string;
  };
  tipMessage: {
    message: string;
    type: string;
  };
}

const state: States = {
  tipModal: {
    title: '',
    tip: ''
  },
  tipMessage: {
    message: '',
    type: ''
  }

}

export default state

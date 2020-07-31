import Vue, { VNode } from 'vue'

interface JMessageOptions {
  debug: boolean;
}

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }

  class JMessage {
    constructor (options?: {
      debug: boolean
    });
  }
}

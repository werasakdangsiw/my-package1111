'use babel';

import MyPackage1111View from './my-package1111-view';
import { CompositeDisposable } from 'atom';

export default {

  myPackage1111View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.myPackage1111View = new MyPackage1111View(state.myPackage1111ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.myPackage1111View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'my-package1111:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.myPackage1111View.destroy();
  },

  serialize() {
    return {
      myPackage1111ViewState: this.myPackage1111View.serialize()
    };
  },

  toggle() {
    console.log('MyPackage1111 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};


/**

  Authors: Toni Ruottu, Finland 2010-2018

  This file is part of Dark WebSocket Terminal.

  CC0 1.0 Universal, http://creativecommons.org/publicdomain/zero/1.0/

  To the extent possible under law, Dark WebSocket Terminal developers have waived all
  copyright and related or neighboring rights to Dark WebSocket Terminal.

*/

export default class Loadtext {

  constructor(dwst) {
    this._dwst = dwst;
  }

  commands() {
    return ['loadtext'];
  }

  usage() {
    return [
      '/loadtext [variable] [encoding]',
    ];
  }

  examples() {
    return [
      '/loadtext',
      '/loadtext default',
      '/loadtext default utf-8',
    ];
  }

  info() {
    return 'load text data from a file';
  }

  _run(variable = 'default', encoding) {
    const that = this;
    const upload = document.getElementById('file1');
    upload.onchange = () => {
      const file = upload.files[0];
      const ff = document.getElementById('fileframe');
      ff.innerHTML = ff.innerHTML;
      const reader = new FileReader();
      reader.onload = function (e2) {
        const text = e2.target.result;
        that._dwst.texts.set(variable, text);
        that._dwst.terminal.log(`Text file ${file.fileName} (${text.length}B) loaded to "${variable}"`, 'system');
      };
      reader.readAsText(file, encoding);
    };
    upload.click();
  }

  run(paramString) {
    if (paramString.length < 1) {
      this._run();
      return;
    }
    const params = paramString.split(' ');
    this._run(...params);
  }
}


'use strict';

var Blockly = require('./dist/blockly_compressed');

Blockly.setTheme(Blockly.Themes.Classic);
Blockly.setLocale = function(locale) {
    Blockly.Msg = Object.assign(require('./dist/i18n/blockly/' + locale), Blockly.Msg);
    if(typeof Blockly.Msg === 'function') Blockly.Msg = Blockly.Msg();
    Blockly.Msg.Custom = Object.assign(require('./dist/i18n/custom/' + locale)(Blockly), Blockly.Msg);
};

Blockly.Blocks = Object.assign(Blockly.Blocks, require('./dist/blocks_custom_compressed')(Blockly));
Blockly.setLocale('de');
Blockly.SQL = require('./dist/sql_compressed')(Blockly);

module.exports = Blockly;

import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';

export const defineValueInputBlocks = () => {
  Blockly.Blocks['freeinput'] = {
    init: function() {
      this.appendDummyInput()
        .appendField("\u201C")
        .appendField(new Blockly.FieldTextInput("\u2009"), "textInput")
        .appendField("\u201D");
      this.setOutput(true, "freeinput");
      this.setColour('#FC4758');
      this.setInputsInline(true);
      this.setTooltip("");
      this.setHelpUrl("");
      this.setOnChange(function(changeEvent){
        var parent = this.getSurroundParent();
        if(parent != null && parent.toString().includes('ORDER BY') && (this.getField('orderfI') == null)){
          this.appendDummyInput('listOrder').appendField(" ").appendField(new Blockly.FieldDropdown([["\u2009","BLANK"], ["ASC","ASC"], ["DESC","DESC"]]), "orderfI");
        }
        else if((parent == null || (!(parent.toString().includes('ORDER BY')))) && this.getField('orderfI') != null){
          this.removeInput('listOrder');
        }
      });
    }
  };

  pythonGenerator.forBlock['freeinput'] = function(block, generator) {
    var code = "\"" + (block.getFieldValue('textInput')) + "\"";
    if(code.match(/create/i) || code.match(/alter/i) || code.match(/index/i) || code.match(/drop/i) || code.match(/show/i) || code.match(/execute/i) || code.match(/insert/i) || code.match(/update/i) || code.match(/delete/i) || code.match(/file/i) || code.match(/grant/i) || code.match(/process/i) || code.match(/shutdown/i) || code.match(/reload/i) || code.match(/lock/i) || code.match(/replication/i)){
      code = '';
    }
    if(code.match(/Ä/g)){
      code = code.replace(/Ä/g, 'Ae');
    }
    if(code.match(/ä/g)){
      code = code.replace(/ä/g, 'ae');
    }
    if(code.match(/Ö/g)){
      code = code.replace(/Ö/g, 'Oe');
    }
    if(code.match(/ö/g)){
      code = code.replace(/ö/g, 'oe');
    }
    if(code.match(/Ü/g)){
      code = code.replace(/Ü/g, 'Ue');
    }
    if(code.match(/ü/g)){
      code = code.replace(/ü/g, 'ue');
    }
    var countEscape1 = (code.match(/"/g) || []).length;
    var countEscape2 = (code.match(/'/g) || []).length;
    if(countEscape1%2 != 0 || countEscape2%2 != 0 || code.includes('\u005C') || code.includes('\u002F')){
      code = '';
    }

    var chosenOrderfI = '';
    if(this.getInput('listOrder')){
      chosenOrderfI = pythonGenerator.variableDB_.getName(block.getFieldValue('orderfI'));
      if(chosenOrderfI == 'BLANK'){
        chosenOrderfI = '';
      }
      else{
        code = code + ' ' + chosenOrderfI;
      }
    }

    return code;
  };

  Blockly.defineBlocksWithJsonArray([
    {
      "type": "boolean",
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "BOOL",
          "options": [
            ["true", "TRUE"],
            ["false", "FALSE"]
          ]
        }
      ],
      "output": "Boolean",
      "colour": '#FC4758',
      "tooltip": "",
      "helpUrl": ""
    }
  ]);

  pythonGenerator.forBlock['boolean'] = function(block, generator) {
    var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
    code = '' + code;
    return code;
  };

  Blockly.Blocks['datepicker'] = {
    init: function() {
      this.appendDummyInput()
        .appendField("Year:")
        .appendField(new Blockly.FieldNumber(2018), "date_year");
      this.appendDummyInput()
        .appendField("Month:")
        .appendField(new Blockly.FieldNumber(0, 1, 12), "date_month");
      this.appendDummyInput()
        .appendField("Day:")
        .appendField(new Blockly.FieldNumber(0, 1, 31), "date_day");
      this.appendDummyInput()
        .appendField("Hour:")
        .appendField(new Blockly.FieldNumber(0, 0, 23), "date_time");
      this.setInputsInline(true);
      this.setOutput(true, "DatePicker");
      this.setColour('#FC4758');
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  pythonGenerator.forBlock['datepicker'] = function(block, generator) {
    var year = parseFloat(block.getFieldValue('date_year'));
    var month = parseFloat(block.getFieldValue('date_month'));
    var day = parseFloat(block.getFieldValue('date_day'));
    var time = parseFloat(block.getFieldValue('date_time'));
    if(month < 10){
      month = '0' + month;
    }
    if(day < 10){
      day = '0' + day;
    }
    if(time < 10){
      time = '0' + time;
    }
    time = time + '00';
    var code = '\u0022' + year + month + day + time + '\u0022';
    return code;
  };

  Blockly.defineBlocksWithJsonArray([
    {
      "type": "number",
      "message0": "%1",
      "args0": [{
        "type": "field_number",
        "name": "NUM",
        "value": 0
      }],
      "output": "Number",
      "colour": '#FC4758',
      "helpUrl": "%{BKY_MATH_NUMBER_HELPURL}",
      "tooltip": "%{BKY_MATH_NUMBER_TOOLTIP}",
      "extensions": ["parent_tooltip_when_inline"]
    }
  ]);

  pythonGenerator.forBlock['number'] = function(block, generator) {
    var code = parseFloat(block.getFieldValue('NUM'));
    code = '' + code;
    return code;
  };
};

defineValueInputBlocks();

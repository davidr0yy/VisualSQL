import * as Blockly from 'blockly/core';
import { pythonGenerator } from 'blockly/python'; // Import the Python generator
import 'blockly/python';

const tableNames = [
  ['Department', 'Department'],
  ['Professor', 'Professor'],
  ['Student', 'Student'],
  ['Course', 'Course'],
  ['Enrollment', 'Enrollment'],
  ['Class', 'Class']
];

export const defineSelectBlocks = () => {
  // Define the 'select' block
  Blockly.Blocks['select'] = {
    init: function() {
      this.appendValueInput('SELECT')
        .appendField('SELECT   ')
        .setCheck(['freeinput', 'tablename_as', 'ALL', 'CONDITIONCHOOSER', 'aggregate_min', 'aggregate_max', 'aggregate_avg', 'aggregate_sum', 'aggregate_count'])
        .appendField(new Blockly.FieldDropdown([["\u2009", 'blank'], ["ALL", 'all'], ["DISTINCT", 'distinct']]), 'option');
      this.setInputsInline(false);
      this.setPreviousStatement(true, ['SELECT', 'WHERE', 'GROUP BY', 'HAVING', 'ORDER BY', 'FROM']);
      this.setNextStatement(true, ['SELECT', 'WHERE', 'GROUP BY', 'HAVING', 'ORDER BY', 'FROM']);
      this.setColour('#8007f2');
    }
  };

  // Define the Python generator for the 'select' block
  pythonGenerator.forBlock['select'] = function(block, generator) {
    var select = pythonGenerator.statementToCode(block, 'SELECT');
    if (select.endsWith(',')) {
      select = select.slice(0, -1);
    }
    select = select.replace(/'/g, '"');
    var option = block.getFieldValue('option');
    var code = (option === 'distinct') ? 'SELECT DISTINCT ' : 'SELECT ';
    code += select + ' ';
    return code;
  };

  // Define the 'select_from' block
  Blockly.Blocks['select_from'] = {
    init: function() {
      this.appendValueInput('FROM')
        .appendField('FROM ')
        .setCheck(['TABLE', 'tablename_as']);
      this.setInputsInline(false);
      this.setPreviousStatement(true, ['SELECT']);
      this.setNextStatement(true, ['WHERE', 'GROUP BY', 'HAVING', 'ORDER BY', 'FROM']);
      this.setColour('#8007f2');
    }
  };

  // Define the Python generator for the 'select_from' block
  pythonGenerator.forBlock['select_from'] = function(block, generator) {
    var from = pythonGenerator.statementToCode(block, 'FROM');
    from = from.substring(0, from.length);
    return 'FROM ' + from + ' ';
  };

  // Define the 'select_where' block
  Blockly.Blocks['select_where'] = {
    init: function() {
      this.appendValueInput('whereInput')
        .setCheck(['BETWEEN', 'AND', 'OR', 'COMPARE', 'NULLIFIER', 'INNIFIER', 'NOT', 'freeinput'])
        .appendField("WHERE                 ");
      this.setPreviousStatement(true, ['FROM']);
      this.setNextStatement(true, ['WHERE', 'GROUP BY']);
      this.setColour('#8007f2');
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  // Define the Python generator for the 'select_where' block
  pythonGenerator.forBlock['select_where'] = function(block, generator) {
    var code = pythonGenerator.statementToCode(block, 'whereInput');
    return 'WHERE ' + code + ' ';
  };

  // Define the 'select_groupby' block
  Blockly.Blocks['select_groupby'] = {
    init: function() {
      this.appendValueInput('groupInput')
        .setCheck(['freeinput', "CONDITIONCHOOSER"])
        .appendField("GROUP BY ");
      this.setPreviousStatement(true, ['WHERE', 'FROM']);
      this.setNextStatement(true, ['GROUP BY', 'HAVING']);
      this.setColour('#8007f2');
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  // Define the Python generator for the 'select_groupby' block
  pythonGenerator.forBlock['select_groupby'] = function(block, generator) {
    var code = pythonGenerator.statementToCode(block, 'groupInput');
    return 'GROUP BY ' + code + ' ';
  };

  // Define the 'select_having' block
  Blockly.Blocks['select_having'] = {
    init: function() {
      this.appendValueInput('haveInput')
        .setCheck(["COMPARE"])
        .appendField("HAVING           ");
      this.setPreviousStatement(true, ['GROUP BY']);
      this.setNextStatement(true, ['HAVING', 'ORDER BY']);
      this.setColour('#8007f2');
      this.setTooltip("");
      this.setHelpUrl("");
      this.setInputsInline(true);
    }
  };

  // Define the Python generator for the 'select_having' block
  pythonGenerator.forBlock['select_having'] = function(block, generator) {
    var code = pythonGenerator.statementToCode(block, 'haveInput');
    return 'HAVING ' + code + ' ';
  };

  // Define the 'select_orderby' block
  Blockly.Blocks['select_orderby'] = {
    init: function() {
      this.appendValueInput('orderInput')
        .setCheck(["CONDITIONCHOOSER", 'aggregate_min', 'aggregate_avg', 'aggregate_max', 'aggregate_sum', 'aggregate_count', 'freeinput'])
        .appendField("ORDER BY        ");
      this.setPreviousStatement(true, ['GROUP BY', 'HAVING']);
      this.setNextStatement(true, ['ORDER BY']);
      this.setColour('#8007f2');
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  // Define the Python generator for the 'select_orderby' block
  pythonGenerator.forBlock['select_orderby'] = function(block, generator) {
    var code = pythonGenerator.statementToCode(block, 'orderInput');
    var i = 1;
    var countAdditionalOBs = 1;
    while (block.getInput('OB' + countAdditionalOBs)) {
      countAdditionalOBs++;
    }
    while (i <= countAdditionalOBs) {
      code = code.concat(pythonGenerator.statementToCode(block, 'OB' + i));
      i++;
    }
    code = code.replace(/blank/g, ',');
    code = code.replace(/SC/g, 'SC,');
    code = 'ORDER BY ' + code + ' ';
    code = code.replace(',;', ';');
    return code;
  };

  // Define the 'all_join' block
  Blockly.Blocks['all_join'] = {
    init: function() {
      this.appendValueInput("STATEMENT")
        .appendField(new Blockly.FieldDropdown([['\u2009', 'BLANKJ'], ['INNER', 'INNER'], ['LEFT', 'LEFT'], ['RIGHT', 'RIGHT']]), "chooseTableType")
        .appendField('JOIN')
        .appendField(new Blockly.FieldDropdown(tableNames), "chooseTableJoin2")
        .setCheck("COMPARE")
        .appendField(new Blockly.FieldDropdown([['ON', 'onModifier'], ['\u2009', 'Blank']]), "modifierActive");
      this.setOutput(true, ["INNER_JOIN"]);
      this.setColour('#8007f2');
      this.setTooltip("");
      this.setHelpUrl("");
      this.setOnChange(function(changeEvent){
        if(this.getInput("STATEMENT") == null){
          if(this.getFieldValue('modifierActive') !== 'Blank'){
            this.removeInput("noSTATEMENT");
            this.appendValueInput("STATEMENT")
              .appendField(new Blockly.FieldDropdown([['\u2009', 'BLANKJ'], ['INNER', 'INNER'], ['LEFT', 'LEFT'], ['RIGHT', 'RIGHT']]), "chooseTableType")
              .appendField('JOIN')
              .appendField(new Blockly.FieldDropdown(tableNames), "chooseTableJoin2")
              .setCheck("COMPARE")
              .appendField(new Blockly.FieldDropdown([['ON', 'onModifier'], ['\u2009', 'Blank']]), "modifierActive");
          }
        } else {
          if(this.getFieldValue('modifierActive') == 'Blank'){
            this.removeInput("STATEMENT");
            this.appendValueInput("noSTATEMENT")
              .appendField(new Blockly.FieldDropdown([['\u2009', 'BLANKJ'], ['INNER', 'INNER'], ['LEFT', 'LEFT'], ['RIGHT', 'RIGHT']]), "chooseTableType")
              .appendField('JOIN')
              .setCheck("tablename_as")
              .appendField(new Blockly.FieldDropdown([['\u2009', 'Blank'], ['ON', 'onModifier']]), "modifierActive");
          }
        }
      });
    }
  };

  // Define the Python generator for the 'all_join' block
  pythonGenerator.forBlock['all_join'] = function(block, generator) {
    var type = block.getFieldValue('chooseTableType');
    if(type == 'BLANKJ'){
      type = '';
    }
    var join = '';
    var isModifierActive = '';
    var statement = '';
    var nostatement = '';
    if(block.getInput('STATEMENT') != null){
      join = block.getFieldValue('chooseTableJoin2');
      statement = pythonGenerator.statementToCode(block, 'STATEMENT');
    } else {
      nostatement = pythonGenerator.statementToCode(block, 'noSTATEMENT');
    }
    var code = type + ' join' + ' ';
    if(block.getFieldValue('modifierActive') == 'onModifier'){
      if(statement == ''){
        code = code.concat('' + join + ' ' + 'on' + ' ');
      } else {
        code = code.concat('' + join + ' ' + 'on' + statement + ' ');
      }
    } else {
      if(nostatement == ''){
        code = code.concat('' + join + ' ');
      } else {
        code = code.concat('' + join + ' ' + nostatement + ' ');
      }
    }
    return code;
  };
};

defineSelectBlocks();

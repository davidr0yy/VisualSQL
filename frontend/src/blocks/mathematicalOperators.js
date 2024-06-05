import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';

export const defineMathematicalOperatorBlocks = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "compare",
      "message0": "%1 %2 %3",
      "args0": [
        {
          "type": "input_value",
          "name": "1ConditionC",
          "check": ["DatePicker", "MATH", "CONDITIONCHOOSER", 'HAVING', 'Boolean', 'Number', 'freeinput', 'aggregate_min', 'aggregate_avg', 'aggregate_max', 'aggregate_sum', 'aggregate_count', 'datepicker']
        },
        {
          "type": "field_dropdown",
          "name": "OP",
          "options": [
            ["=", "EQ"],
            ["\u2260", "NEQ"],
            ["<", "LT"],
            ["\u2264", "LTE"],
            [">", "GT"],
            ["\u2265", "GTE"],
            ["LIKE", 'L']
          ]
        },
        {
          "type": "input_value",
          "name": "2ConditionC",
          "check": ["DatePicker", "MATH", "CONDITIONCHOOSER", 'Boolean', 'Number', 'freeinput', 'aggregate_min', 'aggregate_avg', 'aggregate_max', 'aggregate_sum', 'aggregate_count', 'datepicker']
        }
      ],
      "inputsInline": true,
      "output": "COMPARE",
      "colour": '#3ED9D9',
      "tooltip": "",
      "helpUrl": ""
    },
    {
      "type": "compareDerived",
      "message0": "%1    %2 %3",
      "args0": [
        {
          "type": "input_value",
          "name": "1ConditionCD",
          "check": ['aggregate_AVG', 'aggregate_COUNT', 'aggregate_MAX', 'aggregate_MIN', 'aggregate_SUM', 'CONDITIONCHOOSER']
        },
        {
          "type": "field_dropdown",
          "name": "OP",
          "options": [
            ["=", "EQ"],
            ["\u2260", "NEQ"],
            ["<", "LT"],
            ["\u2264", "LTE"],
            [">", "GT"],
            ["\u2265", "GTE"]
          ]
        },
        {
          "type": "input_value",
          "name": "2ConditionCD",
          "check": ["MATH", "CONDITIONCHOOSER", 'Boolean', 'Number', 'freeinput']
        }
      ],
      "output": 'DERIVED',
      "colour": 180,
      "tooltip": "%{BKY_LOGIC_COMPARE_HELPURL}",
      "extensions": ["logic_compare", "logic_op_tooltip"]
    }
  ]);

  pythonGenerator.forBlock['compare'] = function(block, generator) {
    var OPERATORS = {
      'EQ': '=',
      'NEQ': '!=',
      'LT': '<',
      'LTE': '<=',
      'GT': '>',
      'GTE': '>=',
      'IN': 'IS NULL',
      'INN': 'IS NOT NULL',
      'I': 'IN',
      'NI': 'NOT IN',
      'L': 'LIKE'
    };
    var operator = OPERATORS[block.getFieldValue('OP')];
    var argument0 = pythonGenerator.statementToCode(block, '1ConditionC');
    var argument1 = '';
    if (operator != 'IS NULL' && operator != 'IS NOT NULL') {
      argument1 = pythonGenerator.statementToCode(block, '2ConditionC');
      if (operator == 'IN' || operator == 'NOT IN') {
        if (argument1.includes(';')) {
          if (argument1.includes(';SELECT')) {
            argument1 = argument1.replace(/;SELECT/g, '<BR> union <BR>select');
          }
          argument1 = argument1.replace(';', ' ');
        }
        argument1 = '(' + argument1 + ')';
      }
    }
    var code = argument0 + ' ' + operator + ' ' + argument1;
    return code;
  };

  pythonGenerator.forBlock['compareDerived'] = function(block, generator) {
    var OPERATORS = {
      'EQ': '=',
      'NEQ': '!=',
      'LT': '<',
      'LTE': '<=',
      'GT': '>',
      'GTE': '>='
    };
    var operator = OPERATORS[block.getFieldValue('OP')];
    var argument0 = pythonGenerator.statementToCode(block, '1ConditionCD');
    var argument1 = pythonGenerator.statementToCode(block, '2ConditionCD');
    var code = argument0 + ' ' + operator + ' ' + argument1;
    return code;
  };

  Blockly.Blocks['math'] = {
    init: function() {
      this.appendValueInput("1ConditionM")
        .setCheck(["freeinput", "CONDITIONCHOOSER", "Number", 'MATH'])
        .setAlign('CENTRE');
      this.appendValueInput("2ConditionM")
        .setCheck(["freeinput", "CONDITIONCHOOSER", "Number", 'MATH'])
        .setAlign('CENTRE')
        .appendField(new Blockly.FieldDropdown([["\u002B", "plus"], ["\u002D", "minus"], ["\u00D7", "mul"], ["\u00F7", "div"]]), "mathemator");
      this.setInputsInline(true);
      this.setOutput(true, ["MATH"]);
      this.setColour('#5BE5E5');
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  pythonGenerator.forBlock['math'] = function(block, generator) {
    var OPERATORS = {
      'plus': '+',
      'minus': '-',
      'mul': '*',
      'div': '/'
    };
    var operator = OPERATORS[block.getFieldValue('mathemator')];
    var argument0 = pythonGenerator.statementToCode(block, '1ConditionM').trim();
    var argument1 = pythonGenerator.statementToCode(block, '2ConditionM');
    var code = '(' + argument0 + ' ' + operator + ' ' + argument1 + ')';
    return code;
  };
};

defineMathematicalOperatorBlocks();

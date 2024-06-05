import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';

export const defineLogicalOperatorBlocks = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "not",
      "message0": "NOT %1",
      "args0": [
        {
          "type": "input_value",
          "name": "Con0",
          "check": ["OR", "AND", 'COMPARE', 'BETWEEN']
        }
      ],
      "output": "NOT",
      "colour": '#5270DE',
      "tooltip": "",
      "helpUrl": ""
    }
  ]);

  pythonGenerator.forBlock['not'] = function(block, generator) {
    var code = 'NOT ' + pythonGenerator.statementToCode(block, 'Con0');
    return code;
  };

  Blockly.defineBlocksWithJsonArray([
    {
      "type": "and",
      "message0": "AND %1",
      "args0": [
        {
          "type": "input_value",
          "name": "Con0",
          "check": ["Number", "COMPARE", "NULLIFIER", "INNIFIER", "OR", 'NOT', 'AND', 'BETWEEN']
        }
      ],
      "message1": "    %1",
      "args1": [
        {
          "type": "input_value",
          "name": "sCon0",
          "check": ["Number", "COMPARE", "NULLIFIER", "INNIFIER", "OR", 'NOT', 'AND', 'BETWEEN']
        }
      ],
      "output": "AND",
      "colour": '#5270DE',
      "tooltip": "",
      "helpUrl": ""
    }
  ]);

  pythonGenerator.forBlock['and'] = function(block, generator) {
    var argument0 = pythonGenerator.statementToCode(block, 'Con0');
    var argument1 = pythonGenerator.statementToCode(block, 'sCon0');
    var n = 1;
    var code = argument0 + ' AND ' + argument1 + ' ';
    while (block.getInput('Con' + n)) {
      var additionalCode = pythonGenerator.statementToCode(block, 'Con' + n);
      code = code.concat('AND ' + additionalCode);
      ++n;
    }
    code = '(' + code + ')';
    return code;
  };

  Blockly.defineBlocksWithJsonArray([
    {
      "type": "or",
      "message0": "OR %1",
      "args0": [
        {
          "type": "input_value",
          "name": "Con0",
          "check": ["COMPARE", "NULLIFIER", "INNIFIER", "AND", 'NOT', 'OR', 'BETWEEN']
        }
      ],
      "message1": "    %1",
      "args1": [
        {
          "type": "input_value",
          "name": "sCon0",
          "check": ["COMPARE", "NULLIFIER", "INNIFIER", "AND", 'NOT', 'OR', 'BETWEEN']
        }
      ],
      "output": "OR",
      "colour": '#5270DE',
      "tooltip": "",
      "helpUrl": ""
    }
  ]);

  pythonGenerator.forBlock['or'] = function(block, generator) {
    var argument0 = pythonGenerator.statementToCode(block, 'Con0');
    var argument1 = pythonGenerator.statementToCode(block, 'sCon0');
    var n = 1;
    var code = argument0 + ' OR ' + argument1 + ' ';
    while (block.getInput('Con' + n)) {
      var additionalCode = pythonGenerator.statementToCode(block, 'Con' + n);
      code = code.concat('OR ' + additionalCode);
      ++n;
    }
    code = '(' + code + ')';
    return code;
  };

  Blockly.defineBlocksWithJsonArray([
    {
      "type": "between",
      "message0": "    %1",
      "args0": [
        {
          "type": "input_value",
          "name": "Con0",
          "check": ['CONDITIONCHOOSER', 'freeinput']
        }
      ],
      "message1": "BETWEEN %1",
      "args1": [
        {
          "type": "input_value",
          "name": "Con1",
          "check": ['AND']
        }
      ],
      "output": "BETWEEN",
      "colour": '#5270DE',
      "tooltip": "",
      "helpUrl": ""
    }
  ]);

  pythonGenerator.forBlock['between'] = function(block, generator) {
    var argument0 = pythonGenerator.statementToCode(block, 'Con0');
    var argument1 = pythonGenerator.statementToCode(block, 'Con1');
    var code = argument0 + ' BETWEEN ' + argument1;
    code = code.replace('(', '');
    code = code.replace(')', '');
    return code;
  };

  Blockly.defineBlocksWithJsonArray([{
    "type": "innifier",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "input_value",
        "name": "1ConditionC",
        "check": ["MATH", "CONDITIONCHOOSER", 'freeinput'],
      },
      {
        "type": "field_dropdown",
        "name": "OP",
        "options": [
          ["IN", "I"],
          ["NOT IN", "NI"],
        ]
      },
      {
        "type": "input_statement",
        "name": "2ConditionC",
        "check": ["SELECT"],
      },
    ],
    "inputsInline": true,
    "output": "INNIFIER",
    "colour": '#5270DE',
    "tooltip": "",
    "helpUrl": ""
  }]);

  pythonGenerator.forBlock['innifier'] = function(block, generator) {
    var OPERATORS = {
      'I': 'IN',
      'NI': 'NOT IN'
    };
    var operator = OPERATORS[block.getFieldValue('OP')];
    var argument0 = pythonGenerator.statementToCode(block, '1ConditionC');
    var argument1 = pythonGenerator.statementToCode(block, '2ConditionC');
    if (operator == 'IN' || operator == 'NOT IN') {
      if (argument1.includes(';')) {
        if (argument1.includes(';SELECT')) {
          argument1 = argument1.replace(/;SELECT/g, '<BR> union <BR>select');
        }
        argument1 = argument1.replace(/;/g, ' ');
      }
      argument1 = '(' + argument1 + ')';
    }
    var code = argument0 + ' ' + operator + ' ' + argument1;
    return code;
  };
};

defineLogicalOperatorBlocks();

import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';

export const defineAggregateBlocks = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "aggregate_min",
      "message0": "MIN %1",
      "args0": [
        {
          "type": "input_value",
          "name": "min",
          "check": ["CONDITIONCHOOSER", 'freeinput']
        },
      ],
      "inputsInline": true,
      "output": 'aggregate_min',
      "colour": '#C440C4',
      "tooltip": "",
      "helpUrl": "",
      "extensions": 'aggregate_Extensions'
    },
    {
      "type": "aggregate_avg",
      "message0": "AVG %1",
      "args0": [
        {
          "type": "input_value",
          "name": "avg",
          "check": ["CONDITIONCHOOSER", 'freeinput']
        }
      ],
      "inputsInline": true,
      "output": 'aggregate_avg',
      "colour": '#C440C4',
      "tooltip": "",
      "helpUrl": "",
      "extensions": 'aggregate_Extensions'
    },
    {
      "type": "aggregate_max",
      "message0": "MAX %1",
      "args0": [
        {
          "type": "input_value",
          "name": "max",
          "check": ["CONDITIONCHOOSER", 'freeinput']
        }
      ],
      "inputsInline": true,
      "output": 'aggregate_max',
      "colour": '#C440C4',
      "tooltip": "",
      "helpUrl": "",
      "extensions": 'aggregate_Extensions'
    },
    {
      "type": "aggregate_sum",
      "message0": "SUM %1",
      "args0": [
        {
          "type": "input_value",
          "name": "sum",
          "check": ["CONDITIONCHOOSER", 'freeinput', 'MATH']
        }
      ],
      "inputsInline": true,
      "output": 'aggregate_sum',
      "colour": '#C440C4',
      "tooltip": "",
      "helpUrl": "",
      "extensions": 'aggregate_Extensions'
    },
    {
      "type": "aggregate_count",
      "message0": "COUNT %1",
      "args0": [
        {
          "type": "input_value",
          "name": "count",
          "check": ["CONDITIONCHOOSER", 'freeinput']
        }
      ],
      "inputsInline": true,
      "output": 'aggregate_count',
      "colour": '#C440C4',
      "tooltip": "",
      "helpUrl": "",
      "extensions": 'aggregate_Extensions'
    }
  ]);

  if (!Blockly.Extensions.isRegistered('aggregate_Extensions')) {
    Blockly.Extensions.register('aggregate_Extensions', function() {
      this.setOnChange(function(changeEvent) {
        var parent = this.getSurroundParent();
        if (parent != null && parent.toString().includes('ORDER BY') && (this.getField('orderA') == null)) {
          this.appendDummyInput('listOrder').appendField(" ").appendField(new Blockly.FieldDropdown([["\u2009","BLANK"], ["ASC","ASC"], ["DESC","DESC"]]), "orderA");
        } else if ((parent == null || (!(parent.toString().includes('ORDER BY')))) && this.getField('orderA') != null) {
          this.removeInput('listOrder');
        }
      });
    });
  }

  pythonGenerator.forBlock['aggregate_min'] = function(block, generator) {
    var argument = pythonGenerator.statementToCode(block, 'min');
    argument = argument.trim();
    var code = 'MIN(' + argument + ')';

    if (block.getInput('listOrder')) {
      var chosenOrderA = pythonGenerator.variableDB_.getName(block.getFieldValue('orderA'));
      if (chosenOrderA != 'BLANK') {
        code = code.concat(' ' + chosenOrderA);
      }
    }
    return code;
  };

  pythonGenerator.forBlock['aggregate_avg'] = function(block, generator) {
    var argument = pythonGenerator.statementToCode(block, 'avg');
    argument = argument.trim();
    var code = 'AVG(' + argument + ')';

    if (block.getInput('listOrder')) {
      var chosenOrderA = pythonGenerator.variableDB_.getName(block.getFieldValue('orderA'));
      if (chosenOrderA != 'BLANK') {
        code = code.concat(' ' + chosenOrderA);
      }
    }
    return code;
  };

  pythonGenerator.forBlock['aggregate_max'] = function(block, generator) {
    var argument = pythonGenerator.statementToCode(block, 'max');
    argument = argument.trim();
    var code = 'MAX(' + argument + ')';

    if (block.getInput('listOrder')) {
      var chosenOrderA = pythonGenerator.variableDB_.getName(block.getFieldValue('orderA'));
      if (chosenOrderA != 'BLANK') {
        code = code.concat(' ' + chosenOrderA);
      }
    }
    return code;
  };

  pythonGenerator.forBlock['aggregate_sum'] = function(block, generator) {
    var argument = pythonGenerator.statementToCode(block, 'sum');
    argument = argument.trim();
    var code = 'SUM(' + argument + ')';

    if (block.getInput('listOrder')) {
      var chosenOrderA = pythonGenerator.variableDB_.getName(block.getFieldValue('orderA'));
      if (chosenOrderA != 'BLANK') {
        code = code.concat(' ' + chosenOrderA);
      }
    }
    return code;
  };

  pythonGenerator.forBlock['aggregate_count'] = function(block, generator) {
    var argument = pythonGenerator.statementToCode(block, 'count');
    argument = argument.trim();
    var code = 'COUNT(' + argument + ')';

    if (block.getInput('listOrder')) {
      var chosenOrderA = pythonGenerator.variableDB_.getName(block.getFieldValue('orderA'));
      if (chosenOrderA != 'BLANK') {
        code = code.concat(' ' + chosenOrderA);
      }
    }
    return code;
  };
};

defineAggregateBlocks();

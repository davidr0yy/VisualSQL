import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';

export const defineAliasBlocks = () => {
  Blockly.defineBlocksWithJsonArray([
    {
      "type": "tablename_as",
      "message0": "%1 AS %2",
      "args0": [
        {
          "type": "input_value",
          "name": "as_oldName",
          "check": ["aggregate_min", "aggregate_max", "aggregate_avg", "aggregate_count", "aggregate_sum", "CONDITIONCHOOSER", "freeinput"]
        },
        {
          "type": "input_value",
          "name": "as_newName",
          "check": ["freeinput"]
        }
      ],
      "inputsInline": true,
      "output": 'tablename_as',
      "colour": '#0ddb69',
      "tooltip": "",
      "helpUrl": "",
      "extensions": 'assExtensions'
    }
  ]);

  // Check if the extension is already registered
  if (!Blockly.Extensions.isRegistered('assExtensions')) {
    Blockly.Extensions.register('assExtensions', function() {
      this.setOnChange(function(changeEvent) {
        var parent = this.getSurroundParent();
        if (parent != null) {
          if (parent.toDevString().includes('select_from') || parent.toDevString().includes('all_join')) {
            this.getInput('as_oldName').setCheck("TABLE");
          } else {
            this.getInput('as_oldName').setCheck(["freeinput", "aggregate_min", "aggregate_max", "aggregate_avg", "aggregate_count", "aggregate_sum", "CONDITIONCHOOSER"]);
          }
        }
      });
    });
  }

  pythonGenerator.forBlock['tablename_as'] = function(block, generator) {
    var argumentOld = pythonGenerator.statementToCode(block, 'as_oldName');
    var argumentNew = pythonGenerator.statementToCode(block, 'as_newName');
    var code = argumentOld + ' AS ' + argumentNew;
    return code;
  };
};

defineAliasBlocks();

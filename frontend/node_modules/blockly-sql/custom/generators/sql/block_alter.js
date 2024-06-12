Blockly.SQL['block_alter'] = function(block) {
    var code = "";
    var table = Blockly.SQL.valueToCode(block, 'TABLE', Blockly.SQL.ORDER_ATOMIC).trim();
    var modifier = Blockly.SQL.statementToCode(block, 'MODIFIER').trim();
    var modifierArray = createArrayOfString(modifier, "\n");
    var modifierlist = "";

    //Build modifier list
    for (let i in modifierArray) {
        modifierlist += modifierArray[i] + "\n";
    }

    //Build return value
    code += "ALTER TABLE " + table + "\n" + modifierlist + ";";
    return code;
};

Blockly.SQL['alter_rename_to'] = function(block) {
    var code = "";
    var name = Blockly.SQL.valueToCode(block, 'NEWNAME', Blockly.SQL.ORDER_ATOMIC).trim();
    code += "\nRENAME TO " + name;
    return code;
};

Blockly.SQL['alter_rename_column'] = function(block) {
    var code = "";
    var column = Blockly.SQL.valueToCode(block, 'COLUMN', Blockly.SQL.ORDER_ATOMIC).trim();
    var name = Blockly.SQL.valueToCode(block, 'NEWNAME', Blockly.SQL.ORDER_ATOMIC).trim();
    code += "\nRENAME COLUMN " + column + " TO " + name;
    return code;
};

Blockly.SQL['alter_add_column'] = function(block) {
    var code = "";
    var columndefinition = Blockly.SQL.statementToCode(block, 'COLUMNDEFINITION', Blockly.SQL.ORDER_ATOMIC).trim();
    code += "\nADD COLUMN " + columndefinition;
    return code;
};
Blockly.SQL['block_update'] = function(block) {
    var code = "";
    var table = Blockly.SQL.valueToCode(block, 'TABLE', Blockly.SQL.ORDER_ATOMIC).trim();
    var allocations = Blockly.SQL.statementToCode(block, 'ALLOCATIONS').trim();
        allocations = allocations.substring(0, allocations.length - 1); // Remove last ,
    var modifier = Blockly.SQL.statementToCode(block, 'MODIFIER').trim();
    code += "UPDATE " + table + "\nSET " + allocations + "\n" + modifier + ";";
    return code;
};

Blockly.SQL['update_where'] = function(block) {
    var code = "WHERE ";
    var condition = Blockly.SQL.statementToCode(block, 'CONDITION').trim();
    code += condition;
    return code;
};

Blockly.SQL['columntovalue'] = function(block) {
    var code = "";
    var column = Blockly.SQL.valueToCode(block, 'COLUMN', Blockly.SQL.ORDER_ATOMIC).trim();
    var value = Blockly.SQL.valueToCode(block, 'VALUE', Blockly.SQL.ORDER_ATOMIC).trim();
    code += column + " = '" + value + "', ";
    return code;
};
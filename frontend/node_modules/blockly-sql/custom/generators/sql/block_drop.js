Blockly.SQL['block_drop'] = function(block) {
    var code = "";
    var table = Blockly.SQL.valueToCode(block, 'TABLE', Blockly.SQL.ORDER_ATOMIC).trim();
    code += "DROP TABLE " + table + ";";
    return code;
};
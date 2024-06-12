Blockly.SQL['entity_table'] = function (block) {
    var code = "";
    code += block.getFieldValue('table');
    return [code, Blockly.SQL.ORDER_ATOMIC];
};

Blockly.SQL['entity_table_statement'] = function (block) {
    var code = "";
    code += block.getFieldValue('table') + ",";
    return code;
};

Blockly.SQL['entitiy_column'] = function (block) {
    var code = "";
    code += block.getFieldValue('column');
    return [code, Blockly.SQL.ORDER_ATOMIC];
};

Blockly.SQL['entity_column_statement'] = function (block) {
    var code = "";
    code += block.getFieldValue('column') + ",";
    return code;
};
Blockly.SQL['block_insert'] = function(block) {
    var code = "";
    var table = Blockly.SQL.valueToCode(block, 'TABLE', Blockly.SQL.ORDER_ATOMIC).trim();
    var columns = Blockly.SQL.statementToCode(block, 'COLUMN', Blockly.SQL.ORDER_ATOMIC);
    columns = columns.substring(0, columns.length - 1); // Remove last ,
    var columnsArray = createArrayOfString(columns, ",");
    var columnlist = generateSeparatedList(columnsArray, ", ");
    var values = Blockly.SQL.statementToCode(block, 'VALUE', Blockly.SQL.ORDER_ATOMIC);
    values = values.substring(0, values.length - 1); // Remove last ,
    var valuesArray = createArrayOfString(values, ",");
    var valuelist = generateSeparatedList(valuesArray, ", ");

    code += "INSERT INTO " + table + "(" + columnlist + ")\n" + "VALUES (" + valuelist + ");";
    return code;
};
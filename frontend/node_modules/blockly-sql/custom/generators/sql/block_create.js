Blockly.SQL['block_create'] = function(block) {
    var code = "";
    var table = Blockly.SQL.valueToCode(block, 'TABLE', Blockly.SQL.ORDER_ATOMIC).trim();
    var columndefinitions = Blockly.SQL.statementToCode(block, 'COLUMNDEFINITION').trim();
    var columndefinitionsArray = createArrayOfString(columndefinitions, "\n");
    var columndefinitionlist = "";

    //Build columndefinition list
    for (let i in columndefinitionsArray) {
        columndefinitionlist += columndefinitionsArray[i] + ", ";
    }
    //Remove last ,
    columndefinitionlist = columndefinitionlist.substring(0, columndefinitionlist.length - 2);

    //Build return value
    code += "CREATE TABLE " + table + " (" + columndefinitionlist + ");";
    return code;
};
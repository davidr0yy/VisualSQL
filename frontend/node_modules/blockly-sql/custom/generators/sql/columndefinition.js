Blockly.SQL['columndefinition'] = function(block) {
    var code = "";
    var name = block.getFieldValue('NAME');
    var type = block.getFieldValue('TYPE');
    var constraintlist = "";
    var defaultvalue = Blockly.SQL.valueToCode(block, 'DEFAULT', Blockly.SQL.ORDER_ATOMIC).trim();

    //Build Constraintlist
    if (block.getField('primarykey').getValue() === "TRUE") {
        constraintlist += "PRIMARY KEY";
        if (block.getField('autoincrement').getValue() === "TRUE") {
            constraintlist += " AUTOINCREMENT";
        }
    }
    if (block.getField('notnull').getValue() === "TRUE") {
        constraintlist += " NOT NULL";
    }
    if (block.getField('unique').getValue() === "TRUE") {
        constraintlist += " UNIQUE";
    }
    if (block.getField('default').getValue() === "TRUE") {
        constraintlist += " DEFAULT " + defaultvalue;
    }
    code += name + " " + type + " " + constraintlist.trim() + "\n";
    return code;
};
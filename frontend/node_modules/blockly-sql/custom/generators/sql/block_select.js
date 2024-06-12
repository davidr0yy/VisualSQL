'use strict';

goog.provide('Blockly.SQL.block_select');

goog.require('Blockly.SQL');

Blockly.SQL['block_select'] = function (block) {
    var code = "";
    var columns = Blockly.SQL.statementToCode(block, 'COLUMN');
    columns = columns.substring(0, columns.length - 1); // Remove last ,
    var columnsArray = createArrayOfString(columns, ",");
    var columnlist = "";
    var tables = Blockly.SQL.statementToCode(block, 'TABLE');
    tables = tables.substring(0, tables.length - 1); // Remove last ,
    var tablesArray = createArrayOfString(tables, ",");
    var tablelist = "";
    var modifier = Blockly.SQL.statementToCode(block, 'MODIFIER').trim();
    var modifierArray = createArrayOfString(modifier, "\n");
    var modifierlist = "";

    //Build columns list
    //If columns is empty select everything
    if (columns.length === 0) {
        columnlist = "*";
    } else {
        //Separate each entry with an ,
        for (let i in columnsArray) {
            columnlist += columnsArray[i] + ", ";
        }
        //Remove last ,
        columnlist = columnlist.substring(0, columnlist.length - 2);
    }

    //Build table list
    //Separate each entry with an ,
    for (let i in tablesArray) {
        tablelist += tablesArray[i] + ", ";
    }
    //Remove last ,
    tablelist = tablelist.substring(0, tablelist.length - 2);

    //Build modifier list
    for (let i in modifierArray) {
        modifierlist += modifierArray[i] + "\n";
    }

    //Build return value
    code += "SELECT " + columnlist + "\nFROM " + tablelist + modifierlist + ";";

    return code;
};

Blockly.SQL['block_subselect'] = function (block) {
    var code = "";
    var generatedcode = Blockly.SQL['block_select'](block);
    code += "(" + generatedcode.substring(0, generatedcode.length - 1) + ")";
    return code;
};

Blockly.SQL['select_join'] = function (block) {
    var code = "\n";
    var table = Blockly.SQL.valueToCode(block, 'TABLE', Blockly.SQL.ORDER_ATOMIC).trim();
    var condition = Blockly.SQL.statementToCode(block, 'CONDITION').trim();
    code += block.getFieldValue('jointype') + " JOIN " + table + " ON " + condition;
    return code;
};

Blockly.SQL['select_where'] = function (block) {
    var code = "\nWHERE ";
    var condition = Blockly.SQL.statementToCode(block, 'CONDITION').trim();
    code += condition;
    return code;
};

Blockly.SQL['select_group'] = function (block) {
    var code = "\nGROUP BY ";
    var columns = Blockly.SQL.statementToCode(block, 'COLUMN');
    columns = columns.substring(0, columns.length - 1); // Remove last ,
    var columnsArray = createArrayOfString(columns, ",");
    var columnlist = generateSeparatedList(columnsArray, ", ").trim();
    var modifier = Blockly.SQL.statementToCode(block, 'MODIFIER').trim();
    code += columnlist + " " + modifier;
    return code;
};

Blockly.SQL['select_group_having'] = function (block) {
    var code = "HAVING ";
    var condition = Blockly.SQL.statementToCode(block, 'CONDITION').trim();
    code += condition;
    return code;
};

Blockly.SQL['select_order'] = function (block) {
    var code = "\nORDER BY ";
    var columns = Blockly.SQL.statementToCode(block, 'COLUMN');
    columns = columns.substring(0, columns.length - 1); // Remove last ,
    var columnsArray = createArrayOfString(columns, ",");
    var columnlist = generateSeparatedList(columnsArray, ", ");
    code += columnlist;
    return code;
};

Blockly.SQL['select_limit'] = function (block) {
    var code = "\nLIMIT ";
    code += block.getFieldValue('limit');
    return code;
};

function createArrayOfString(string, separator) {
    var array = string.split(separator).map(function (item) {
        //Trim surrounding whitspaces
        return item.trim();
    });
    return array;
}

function generateSeparatedList(array, separator) {
    var list = "";
    //Separate each entry with an ,
    for (let i in array) {
        list += array[i] + separator;
    }
    list = list.substring(0, list.length - separator.length);

    return list;
}
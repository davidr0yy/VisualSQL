/**
 * @fileoverview Helper functions for generating SQL for blocks.
 * @author marcus@marcusleib.com
 */
'use strict';

goog.provide('Blockly.SQL');

goog.require('Blockly.Generator');

/**
 * SQL code generator
 * @type {Blockly.Generator}
 */
Blockly.SQL = new Blockly.Generator('SQL');

/**
 * List of illegal variable names.
 * Not a security feature!
 * @private
 */
Blockly.SQL.addReservedWords(
    //Based on https://www.sqlite.org/lang_keywords.html
    'ABORT,ACTION,ADD,AFTER,ALL,ALTER,ANALYZE,AND,AS,ASC,ATTACH,' +
    'AUTOINCREMENT,BEFORE,BEGIN,BETWEEN,BY,CASCADE,CASE,CAST,' +
    'CHECK,COLLATE,COLUMN,COMMIT,CONFLICT,CONSTRAINT,CREATE,CROSS,' +
    'CURRENT,CURRENT_DATE,CURRENT_TIME,CURRENT_TIMESTAMP,DATABASE,' +
    'DEFAULT,DEFERRABLE,DEFERRED,DELETE,DESC,DETACH,DISTINCT,DO,' +
    'DROP,EACH,ELSE,END,ESCAPE,EXCEPT,EXCLUDE,EXCLUSIVE,EXISTS,' +
    'EXPLAIN,FAIL,FILTER,FOLLOWING,FOR,FOREIGN,FROM,FULL,GLOB,' +
    'GROUP,GROUPS,HAVING,IF,IGNORE,IMMEDIATE,IN,INDEX,INDEXED,' +
    'INITIALLY,INNER,INSERT,INSTEAD,INTERSECT,INTO,IS,ISNULL,JOIN,' +
    'KEY,LEFT,LIKE,LIMIT,MATCH,NATURAL,NO,NOT,NOTHING,NOTNULL,NULL,' +
    'OF,OFFSET,ON,OR,ORDER,OTHERS,OUTER,OVER,PARTITION,PLAN,PRAGMA,' +
    'PRECEDING,PRIMARY,QUERY,RAISE,RANGE,RECURSIVE,REFERENCES,REGEXP,' +
    'REINDEX,RELEASE,RENAME,REPLACE,RESTRICT,RIGHT,ROLLBACK,ROW,' +
    'ROWS,SAVEPOINT,SELECT,SET,TABLE,TEMP,TEMPORARY,THEN,TIES,TO,' +
    'TRANSACTION,TRIGGER,UNBOUNDED,UNION,UNIQUE,UPDATE,USING,VACUUM,' +
    'VALUES,VIEW,VIRTUAL,WHEN,WHERE,WINDOW,WITH,WITHOUT'
);

/**
 * Order of operation ENUMs.
 */
Blockly.SQL.ORDER_ATOMIC = 0;

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.SQL.init = function (workspace) {
    if (!Blockly.SQL.variableDB_) {
        Blockly.SQL.variableDB_ =
            new Blockly.Names(Blockly.SQL.RESERVED_WORDS_);
    } else {
        Blockly.SQL.variableDB_.reset();
    }
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.SQL.finish = function (code) {
    //Clean up temporary data.
    Blockly.SQL.variableDB_.reset();
    //Close SQL Command
    return code.trim();
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.SQL.scrubNakedValue = function (line) {
    return line + '\n';
};

/**
 * Encode a string as a properly escaped SQL string, complete with
 * quotes.
 * @param {string} string Text to encode.
 * @return {string} SQL string.
 * @private
 * TODO QUOTE PRÜFEN!
 */
Blockly.SQL.quote_ = function (string) {
    // Can't use goog.string.quote since Google's style guide recommends
    // JS string literals use single quotes.
    string = string.replace(/\\/g, '\\\\')
        .replace(/\n/g, '\\\n')
        .replace(/'/g, '\\\'');
    return '\'' + string + '\'';
};

/**
 * Common tasks for generating SQL from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The SQL code created for this block.
 * @param {boolean=} opt_thisOnly True to generate code for only this statement.
 * @return {string} SQL code with comments and subsequent blocks added.
 * @private
 */
Blockly.SQL.scrub_ = function (block, code, opt_thisOnly) {
    var commentCode = '';
    // Only collect comments for blocks that aren't inline.
    if (!block.outputConnection || !block.outputConnection.targetConnection) {
        // Collect comment for this block.
        var comment = block.getCommentText();
        comment = Blockly.utils.wrap(comment, Blockly.SQL.COMMENT_WRAP - 3);
        if (comment) {
            // Use a comment block for function comments.
            commentCode += '/*\n' +
                Blockly.SQL.prefixLines(comment + '\n', ' * ') +
                ' */\n';
        }
        // Collect comments for all value arguments.
        // Don't collect comments for nested statements.
        for (var i = 0; i < block.inputList.length; i++) {
            if (block.inputList[i].type == Blockly.INPUT_VALUE) {
                var childBlock = block.inputList[i].connection.targetBlock();
                if (childBlock) {
                    var comment = Blockly.SQL.allNestedComments(childBlock);
                    if (comment) {
                        commentCode += '/*\n' +
                            Blockly.SQL.prefixLines(comment + '\n', ' * ') +
                            ' */\n';
                    }
                }
            }
        }
    }
    var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    var nextCode = opt_thisOnly ? '' : Blockly.SQL.blockToCode(nextBlock);
    return commentCode + code + nextCode;
};

/**
 * Gets a property and adjusts the value while taking into account indexing.
 * @param {!Blockly.Block} block The block.
 * @param {string} atId The property ID of the element to get.
 * @param {number=} opt_delta Value to add.
 * @param {boolean=} opt_negate Whether to negate the value.
 * @param {number=} opt_order The highest order acting on this value.
 * @return {string|number}
 */
Blockly.SQL.getAdjusted = function (block, atId, opt_delta, opt_negate,
                                    opt_order) {
    var delta = opt_delta || 0;
    var order = opt_order || Blockly.SQL.ORDER_NONE;
    if (block.workspace.options.oneBasedIndex) {
        delta--;
    }
    var defaultAtIndex = block.workspace.options.oneBasedIndex ? '1' : '0';
    if (delta > 0) {
        var at = Blockly.SQL.valueToCode(block, atId,
            Blockly.SQL.ORDER_ADDITION) || defaultAtIndex;
    } else if (delta < 0) {
        var at = Blockly.SQL.valueToCode(block, atId,
            Blockly.SQL.ORDER_SUBTRACTION) || defaultAtIndex;
    } else if (opt_negate) {
        var at = Blockly.SQL.valueToCode(block, atId,
            Blockly.SQL.ORDER_UNARY_NEGATION) || defaultAtIndex;
    } else {
        var at = Blockly.SQL.valueToCode(block, atId, order) ||
            defaultAtIndex;
    }

    if (Blockly.isNumber(at)) {
        // If the index is a naked number, adjust it right now.
        at = parseFloat(at) + delta;
        if (opt_negate) {
            at = -at;
        }
    } else {
        // If the index is dynamic, adjust it in code.
        if (delta > 0) {
            at = at + ' + ' + delta;
            var innerOrder = Blockly.SQL.ORDER_ADDITION;
        } else if (delta < 0) {
            at = at + ' - ' + -delta;
            var innerOrder = Blockly.SQL.ORDER_SUBTRACTION;
        }
        if (opt_negate) {
            if (delta) {
                at = '-(' + at + ')';
            } else {
                at = '-' + at;
            }
            var innerOrder = Blockly.SQL.ORDER_UNARY_NEGATION;
        }
        innerOrder = Math.floor(innerOrder);
        order = Math.floor(order);
        if (innerOrder && order >= innerOrder) {
            at = '(' + at + ')';
        }
    }
    return at;
};
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
Blockly.SQL['block_drop'] = function(block) {
    var code = "";
    var table = Blockly.SQL.valueToCode(block, 'TABLE', Blockly.SQL.ORDER_ATOMIC).trim();
    code += "DROP TABLE " + table + ";";
    return code;
};
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
Blockly.SQL['cond_block'] = function(block) {
    code = "";
    var left = Blockly.SQL.valueToCode(block, 'LEFT', Blockly.SQL.ORDER_ATOMIC);
    var operator = block.getFieldValue('OPERATOR');
    var right = "";
    if (block.getFieldValue('OPERATOR') === "IN") {
        if (block.getInputTargetBlock('RIGHT') && block.getInputTargetBlock('RIGHT').type === "block_subselect") {
            var subselect = Blockly.SQL.statementToCode(block, 'RIGHT', Blockly.SQL.ORDER_ATOMIC).trim();
            right += subselect;
        }  else {
            var values = Blockly.SQL.statementToCode(block, 'RIGHT', Blockly.SQL.ORDER_ATOMIC);
            values = values.substring(0, values.length - 1); // Remove last ,
            var valuesArray = createArrayOfString(values, ",");
            var valuelist = generateSeparatedList(valuesArray, "', '");
            right += "('" + valuelist + "')";
        }
    } else if (block.getFieldValue('OPERATOR') === "LIKE") {
        right += "'" + Blockly.SQL.valueToCode(block, 'RIGHT', Blockly.SQL.ORDER_ATOMIC) + "'";
    } else {
        right += Blockly.SQL.valueToCode(block, 'RIGHT', Blockly.SQL.ORDER_ATOMIC);
    }
    code += "(" + left + " " + operator + " " + right + ") ";
    return code;
};

Blockly.SQL['cond_not'] = function(block) {
    code = "";
    code += "NOT ";
    return code;
};

Blockly.SQL['cond_or'] = function(block) {
    code = "";
    code += "OR ";
    return code;
};

Blockly.SQL['cond_and'] = function(block) {
    code = "";
    code += "AND ";
    return code;
};
Blockly.SQL['data_boolean'] = function(block) {
    var code = "";
    var value = "";
    if (block.getField('BOOLEAN').getValue() === "TRUE") {
        value = 1;
    } else {
        value = 0;
    }
    code += value;
    return [code, Blockly.SQL.ORDER_ATOMIC];
};

Blockly.SQL['data_boolean_statement'] = function(block) {
    var code = "";
    var value = "";
    if (block.getField('BOOLEAN').getValue() === "TRUE") {
        value = 1;
    } else {
        value = 0;
    }
    code += value;
    return code + ",";
};

Blockly.SQL['data_string'] = function(block) {
    var code = Blockly.SQL.quote_(block.getFieldValue('STRING'));
    return [code, Blockly.SQL.ORDER_ATOMIC];
};

Blockly.SQL['data_string_statement'] = function(block) {
    var code = Blockly.SQL.quote_(block.getFieldValue('STRING'));
    return code + ",";
};

Blockly.SQL['data_number'] = function(block) {
    var code = "";
    code += block.getFieldValue('NUMBER');
    return [code, Blockly.SQL.ORDER_ATOMIC];
};

Blockly.SQL['data_number_statement'] = function(block) {
    var code = "";
    code += block.getFieldValue('NUMBER');
    return code + ",";
};

//"YYYY-MM-DD HH:MM:SS.SSS"
Blockly.SQL['data_date'] = function(block) {
    var code = "";
    code += (block.getFieldValue('YEAR')).pad(4) + "-" + (block.getFieldValue('MONTH')).pad(2) + "-" + (block.getFieldValue('DAY')).pad(2);
    code += " 00:00:00.000";
    return [code, Blockly.SQL.ORDER_ATOMIC];
};

//"YYYY-MM-DD HH:MM:SS.SSS"
Blockly.SQL['data_date_statement'] = function(block) {
    var code = "";
    code += block.getFieldValue('YEAR').pad(4) + "-" + block.getFieldValue('MONTH').pad(2) + "-" + block.getFieldValue('DAY').pad(2);
    code += " 00:00:00.000";
    return code + ",";
};

//"YYYY-MM-DD HH:MM:SS.SSS"
Blockly.SQL['data_datetime'] = function(block) {
    var code = "";
    code += block.getFieldValue('YEAR').pad(4) + "-" + block.getFieldValue('MONTH').pad(2) + "-" + block.getFieldValue('DAY').pad(2);
    code += " " + block.getFieldValue('HOUR').pad(2) + ":" + block.getFieldValue('MINUTE').pad(2) + ":00.000";
    return [code, Blockly.SQL.ORDER_ATOMIC];
};

//"YYYY-MM-DD HH:MM:SS.SSS"
Blockly.SQL['data_datetime_statement'] = function(block) {
    var code = "";
    code += block.getFieldValue('YEAR').pad(4) + "-" + block.getFieldValue('MONTH').pad(2) + "-" + block.getFieldValue('DAY').pad(2);
    code += " " + block.getFieldValue('HOUR').pad(2) + ":" + block.getFieldValue('MINUTE').pad(2) + ":00.000";
    return code + ",";
};

String.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
};
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
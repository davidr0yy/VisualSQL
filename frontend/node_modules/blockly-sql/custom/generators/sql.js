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
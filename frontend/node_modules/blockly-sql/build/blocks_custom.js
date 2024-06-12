Blockly.Blocks['block_alter'] = {
    init: function () {
        this.appendValueInput("TABLE")
            .setCheck("table")
            .appendField("ALTER TABLE");
        this.appendStatementInput("MODIFIER")
            .setCheck("altermodifier");
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.BLOCK_ALTER);
        this.setHelpUrl("");
    }
};

Blockly.Blocks['alter_rename_to'] = {
    init: function () {
        this.appendValueInput("NEWNAME")
            .setCheck("string")
            .appendField("RENAME TO");
            //.appendField(new Blockly.FieldTextInput("new_tablename"), "newname");
        this.setPreviousStatement(true, "altermodifier");
        this.setNextStatement(true, "altermodifier");
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.BLOCK_ALTER_RENAME);
        this.setHelpUrl("");
    }
};

Blockly.Blocks['alter_rename_column'] = {
    init: function () {
        this.appendValueInput("COLUMN")
            .setCheck("column")
            .appendField("RENAME COLUMN");
        this.appendValueInput("NEWNAME")
            .setCheck("string")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("TO");
            //.appendField(new Blockly.FieldTextInput("new_columnname"), "newcolumnname");
        this.setInputsInline(false);
        this.setPreviousStatement(true, "altermodifier");
        this.setNextStatement(true, "altermodifier");
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.BLOCK_ALTER_RENAME_COLUMN);
        this.setHelpUrl("");
    }
};

Blockly.Blocks['alter_add_column'] = {
    init: function () {
        this.appendStatementInput("COLUMNDEFINITION")
            .setCheck("columndefinition")
            .appendField("ADD COLUMN");
        this.setInputsInline(false);
        this.setPreviousStatement(true, "altermodifier");
        this.setNextStatement(true, "altermodifier");
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.BLOCK_ALTER_ADD_COLUMN);
        this.setHelpUrl("");
    }
};
Blockly.Blocks['block_create'] = {
    init: function () {
        this.appendValueInput("TABLE")
            .setCheck("string")
            .appendField("CREATE TABLE");
            //.appendField(new Blockly.FieldTextInput("tablename"), "tablename");
        this.appendStatementInput("COLUMNDEFINITION")
            .setCheck("columndefinition");
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.BLOCK_CREATE);
        this.setHelpUrl("");
    }
};
Blockly.Blocks['block_drop'] = {
    init: function () {
        this.appendValueInput("TABLE")
            .setCheck("table")
            .appendField("DROP TABLE");
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.BLOCK_DROP);
        this.setHelpUrl("");
    }
};
Blockly.Blocks['block_insert'] = {
    init: function () {
        this.appendValueInput("TABLE")
            .setCheck("table")
            .appendField("INSERT INTO");
        this.appendStatementInput("COLUMN")
            .setCheck("column");
        this.appendStatementInput("VALUE")
            .setCheck("value")
            .appendField("VALUES");
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.BLOCK_INSERT);
        this.setHelpUrl("");
    }
};
Blockly.Blocks['block_select'] = {
    init: function () {
        this.appendStatementInput("COLUMN")
            .setCheck("column")
            .appendField("SELECT");
        this.appendStatementInput("TABLE")
            .setCheck("table")
            .appendField("FROM");
        this.appendStatementInput("MODIFIER")
            .setCheck("selectmodifier");
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.BLOCK_SELECT);
        this.setHelpUrl("");
    }
};

Blockly.Blocks['block_subselect'] = {
    init: function () {
        this.appendStatementInput("COLUMN")
            .setCheck("column")
            .appendField("SELECT");
        this.appendStatementInput("TABLE")
            .setCheck("table")
            .appendField("FROM");
        this.appendStatementInput("MODIFIER")
            .setCheck("selectmodifier");
        this.setPreviousStatement(true, "subselect");
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.BLOCK_SELECT);
        this.setHelpUrl("");
    }
};

Blockly.Blocks['select_join'] = {
    init: function () {
        this.appendValueInput("TABLE")
            .setCheck("table")
            .appendField(new Blockly.FieldDropdown([["NATURAL", "NATURAL"], ["LEFT", "LEFT"], ["LEFT OUTER", "LEFT OUTER"], ["INNER", "INNER"]]), "jointype")
            .appendField("JOIN");
        this.appendStatementInput("CONDITION")
            .setCheck("conditionstart")
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("ON");
        this.setPreviousStatement(true, "selectmodifier");
        this.setNextStatement(true, "selectmodifier");
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.BLOCK_SELECT_JOIN);
        this.setHelpUrl("");
    }
};

Blockly.Blocks['select_where'] = {
    init: function () {
        this.appendStatementInput("CONDITION")
            .setCheck("conditionstart")
            .appendField("WHERE");
        this.setPreviousStatement(true, "selectmodifier");
        this.setNextStatement(true, "selectmodifier");
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.BLOCK_SELECT_WHERE);
        this.setHelpUrl("");
    }
};

Blockly.Blocks['select_group'] = {
    init: function () {
        this.appendStatementInput("COLUMN")
            .setCheck("column")
            .appendField("GROUP BY");
        this.appendStatementInput("MODIFIER")
            .setCheck("selectgroupmodifier");
        this.setPreviousStatement(true, "selectmodifier");
        this.setNextStatement(true, "selectmodifier");
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.BLOCK_SELECT_GROUP);
        this.setHelpUrl("");
    }
};

Blockly.Blocks['select_group_having'] = {
    init: function () {
        this.appendStatementInput("CONDITION")
            .setCheck("conditionstart")
            .appendField("HAVING");
        this.setPreviousStatement(true, "selectgroupmodifier");
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.BLOCK_SELECT_GROUP_HAVING);
        this.setHelpUrl("");
    }
};

Blockly.Blocks['select_order'] = {
    init: function () {
        this.appendStatementInput("COLUMN")
            .setCheck("column")
            .appendField("ORDER BY");
        this.setPreviousStatement(true, "selectmodifier");
        this.setNextStatement(true, "selectmodifier");
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.BLOCK_SELECT_ORDER);
        this.setHelpUrl("");
    }
};

Blockly.Blocks['select_limit'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("LIMIT")
            .appendField(new Blockly.FieldNumber(1, 0, Infinity, 1), "limit");
        this.setPreviousStatement(true, "selectmodifier");
        this.setNextStatement(true, "selectmodifier");
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.BLOCK_SELECT_LIMIT);
        this.setHelpUrl("");
    }
};
Blockly.Blocks['block_update'] = {
    init: function () {
        this.appendValueInput("TABLE")
            .setCheck("table")
            .appendField("UPDATE");
        this.appendStatementInput("ALLOCATIONS")
            .setCheck("columntovalue")
            .appendField("SET");
        this.appendStatementInput("MODIFIER")
            .setCheck("updatemodifier");
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.BLOCK_UPDATE);
        this.setHelpUrl("");
    }
};

Blockly.Blocks['update_where'] = {
    init: function () {
        this.appendStatementInput("CONDITION")
            .setCheck("conditionstart")
            .appendField("WHERE");
        this.setPreviousStatement(true, "updatemodifier");
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.BLOCK_UPDATE_WHERE);
        this.setHelpUrl("");
    }
};

Blockly.Blocks['columntovalue'] = {
    init: function () {
        this.appendValueInput("COLUMN")
            .setCheck("column");
        this.appendDummyInput()
            .appendField("=");
        this.appendValueInput("VALUE")
            .setCheck("value");
        this.setPreviousStatement(true, "columntovalue");
        this.setNextStatement(true, "columntovalue");
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.BLOCK_UPDATE_COLUMNTOVALUE);
        this.setHelpUrl("");
    }
};
Blockly.Blocks['columndefinition'] = {
    init: function () {
        this.appendDummyInput("COLUMN")
            .appendField("Columnname:")
            .appendField(new Blockly.FieldTextInput("columnname"),"NAME");
        this.appendDummyInput("TYPE")
            .appendField("Columntype:")
            .appendField(new Blockly.FieldDropdown([["TEXT", "TEXT"], ["NUMERIC", "NUMERIC"], ["INTEGER", "INTEGER"], ["REAL", "REAL"],  ["BLOB", "BLOB"]]), "TYPE");
        this.appendDummyInput();
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_LEFT)
            .appendField("Constraints:");
        this.appendDummyInput("PRIMARYKEY")
            .appendField("PRIMARY KEY")
            .appendField(new Blockly.FieldCheckbox("FALSE", function (isChecked) {
                this.sourceBlock_.selectPrimaryKey_(isChecked)
            }), "primarykey")
            .appendField("AUTOINCREMENT")
            .appendField(new Blockly.FieldCheckbox("FALSE", function (isChecked) {
                this.sourceBlock_.selectAutoincrement_(isChecked)
            }), "autoincrement");
        this.appendDummyInput("NOT NULL")
            .appendField("NOT NULL")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "notnull");
        this.appendDummyInput("UNIQUE")
            .appendField("UNIQUE")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "unique");
        this.appendValueInput("DEFAULT")
            .setCheck("value")
            .appendField("DEFAULT")
            .appendField(new Blockly.FieldCheckbox("FALSE"), "default");
        this.setPreviousStatement(true, "columndefinition");
        this.setNextStatement(true, "columndefinition");
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.BLOCK_COLUMNDEFINITION);
        this.setHelpUrl("");
    },
    selectAutoincrement_: function (isChecked) {
        //If AUTOINCREMENT is selected, PRIMARY KEY needs to be selected as well.
        if (isChecked) {
            this.getField('primarykey').setValue(true);
        }
    },
    selectPrimaryKey_: function (isChecked) {
        //If PRIMARY KEY is deselected, AUTOINCREMENT needs to be deselected as well.
        if (!isChecked) {
            this.getField('autoincrement').setValue(false);
        }
    }
};
Blockly.Blocks['cond_block'] = {
    init: function () {
        this.appendValueInput("LEFT")
            .setCheck(["column", "value"]);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["=", "="], ["<>", "<>"], [">", ">"], ["<", "<"], [">=", ">="], ["<=", "<="], ["LIKE", "LIKE"], ["IN", "IN"]], function (selection) {
                this.sourceBlock_.updateSelection_(selection)
            }), "OPERATOR");
        this.appendValueInput("RIGHT")
            .setCheck(["column", "value"]);
        this.setInputsInline(false);
        this.setPreviousStatement(true, ["conditionstart", "and", "or", "not"]);
        this.setNextStatement(true, "condition");
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.BLOCK_CONDITION);
        this.setHelpUrl("");
    },
    updateSelection_: function (selection) {
        //If LIKE is selected the input on the second needs to be a String.
        //If IN is selected the input on the second needs to be a SELECT Statement or list of values
        if (selection === "LIKE") {
            if (this.getInput("RIGHT").type !== Blockly.INPUT_VALUE) {
                this.removeInput("RIGHT");
                this.appendValueInput("RIGHT")
                    .setCheck("string");
            } else {
                this.getInput("RIGHT").setCheck("string");
            }
        } else if (selection === "IN") {
            if (this.getInput("RIGHT").type === Blockly.INPUT_VALUE) {
                this.removeInput("RIGHT");
                this.appendStatementInput("RIGHT")
                    .setCheck(["value", "subselect"]);
            } else {
                this.getInput("RIGHT").setCheck(["value", "subselect"]);
            }
        } else {
            if (this.getInput("RIGHT").type !== Blockly.INPUT_VALUE) {
                this.removeInput("RIGHT");
                this.appendValueInput("RIGHT")
                    .setCheck(["column", "value"]);
            } else {
                this.getInput("RIGHT").setCheck(["column", "value"]);
            }
        }
    }
};

Blockly.Blocks['cond_not'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("NOT");
        this.setPreviousStatement(true, "conditionstart");
        this.setNextStatement(true, "not");
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.BLOCK_CONDITION_NOT);
        this.setHelpUrl("");
    }
};

Blockly.Blocks['cond_or'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("OR");
        this.setPreviousStatement(true, "condition");
        this.setNextStatement(true, ["conditionstart", "or"]);
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.BLOCK_CONDITION_OR);
        this.setHelpUrl("");
    }
};

Blockly.Blocks['cond_and'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("AND");
        this.setPreviousStatement(true, "condition");
        this.setNextStatement(true, ["conditionstart", "and"]);
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.BLOCK_CONDITION_AND);
        this.setHelpUrl("");
    }
};
Blockly.Blocks['data_boolean'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["true", "TRUE"], ["false", "FALSE"]]), "BOOLEAN");
        this.setOutput(true, ["boolean", "value"]);
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.DATAELEMENT_BOOL);
        this.setHelpUrl("");
    }
};

Blockly.Blocks['data_boolean_statement'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["true", "TRUE"], ["false", "FALSE"]]), "BOOLEAN");
        this.setPreviousStatement(true, ["boolean", "value"]);
        this.setNextStatement(true, ["boolean", "value"]);
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.DATAELEMENT_BOOL);
        this.setHelpUrl("");
    }
};

Blockly.Blocks['data_string'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("media/quote0.png", 15, 10, "*"))
            .appendField(new Blockly.FieldTextInput("value"), "STRING")
            .appendField(new Blockly.FieldImage("media/quote1.png", 15, 10, "*"));
        this.setOutput(true, ["string", "value"]);
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.DATAELEMENT_STRING);
        this.setHelpUrl("");
    }
};

Blockly.Blocks['data_string_statement'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("media/quote0.png", 15, 10, "*"))
            .appendField(new Blockly.FieldTextInput("value"), "STRING")
            .appendField(new Blockly.FieldImage("media/quote1.png", 15, 10, "*"));
        this.setPreviousStatement(true, ["string", "value"]);
        this.setNextStatement(true, ["string", "value"]);
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.DATAELEMENT_STRING);
        this.setHelpUrl("");
    }
};

Blockly.Blocks['data_number'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("0", checkNumeric), "NUMBER");
        this.setOutput(true, ["number", "value"]);
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.DATAELEMENT_NUMBER);
        this.setHelpUrl("");
    }
};

Blockly.Blocks['data_number_statement'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("0", checkNumeric), "NUMBER");
        this.setPreviousStatement(true, ["number", "value"]);
        this.setNextStatement(true, ["number", "value"]);
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.DATAELEMENT_NUMBER);
        this.setHelpUrl("");
    }
};

Blockly.Blocks['data_date'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldNumber(1, 1, 31, 1), "DAY")
            .appendField(".")
            .appendField(new Blockly.FieldNumber(1, 1, 12), "MONTH")
            .appendField(".")
            .appendField(new Blockly.FieldNumber(2019, -9999, 9999, 1), "YEAR");
        this.setOutput(true, ["string", "value"]);
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.DATAELEMENT_DATE);
        this.setHelpUrl("");
    }
};

Blockly.Blocks['data_date_statement'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldNumber(1, 1, 31, 1), "DAY")
            .appendField(".")
            .appendField(new Blockly.FieldNumber(1, 1, 12), "MONTH")
            .appendField(".")
            .appendField(new Blockly.FieldNumber(2019, -9999, 9999, 1), "YEAR");
        this.setPreviousStatement(true, ["string", "value"]);
        this.setNextStatement(true, ["string", "value"]);
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.DATAELEMENT_DATE);
        this.setHelpUrl("");
    }
};

Blockly.Blocks['data_datetime'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldNumber(1, 1, 31, 1), "DAY")
            .appendField(".")
            .appendField(new Blockly.FieldNumber(1, 1, 12), "MONTH")
            .appendField(".")
            .appendField(new Blockly.FieldNumber(2019, -9999, 9999, 1), "YEAR")
            .appendField(" - ")
            .appendField(new Blockly.FieldNumber(1, 1, 31, 1), "HOUR")
            .appendField(":")
            .appendField(new Blockly.FieldNumber(1, 1, 31, 1), "MINUTE");
        this.setOutput(true, ["string", "value"]);
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.DATAELEMENT_DATETIME);
        this.setHelpUrl("");
    }
};

Blockly.Blocks['data_datetime_statement'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldNumber(1, 1, 31, 1), "DAY")
            .appendField(".")
            .appendField(new Blockly.FieldNumber(1, 1, 12), "MONTH")
            .appendField(".")
            .appendField(new Blockly.FieldNumber(2019, -9999, 9999, 1), "YEAR")
            .appendField(" - ")
            .appendField(new Blockly.FieldNumber(1, 1, 31, 1), "HOUR")
            .appendField(":")
            .appendField(new Blockly.FieldNumber(1, 1, 31, 1), "MINUTE");
        this.setPreviousStatement(true, ["string", "value"]);
        this.setNextStatement(true, ["string", "value"]);
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.DATAELEMENT_DATETIME);
        this.setHelpUrl("");
    }
};

function checkNumeric(string) {
    const exp = /^(([1-9]*)|(([1-9]*)\.([0-9]*)))$/g;
    string = string.replace(",", ".");
    if (string.match(exp)) {
        return string;
    } else {
        return null;
    }
}
Blockly.Blocks['entity_table'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("table"), "table");
        this.setOutput(true, "table");
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.ENTITY_TABLE);
        this.setHelpUrl("");
    }
};

Blockly.Blocks['entitiy_column'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("column"), "column");
        this.setOutput(true, "column");
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.ENTITY_COLUMN);
        this.setHelpUrl("");
    }
};

Blockly.Blocks['entity_column_statement'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("column"), "column");
        this.setPreviousStatement(true, "column");
        this.setNextStatement(true, "column");
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.ENTITY_COLUMN);
        this.setHelpUrl("");
    }
};

Blockly.Blocks['entity_table_statement'] = {
    init: function () {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("table"), "table");
        this.setPreviousStatement(true, "table");
        this.setNextStatement(true, "table");
        this.setColour(230);
        this.setTooltip(Blockly.Msg.Custom.ENTITY_TABLE);
        this.setHelpUrl("");
    }
};
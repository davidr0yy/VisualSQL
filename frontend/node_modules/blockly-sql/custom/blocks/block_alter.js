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
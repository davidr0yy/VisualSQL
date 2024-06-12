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
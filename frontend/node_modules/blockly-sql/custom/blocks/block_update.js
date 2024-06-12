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
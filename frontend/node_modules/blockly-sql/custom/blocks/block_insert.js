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
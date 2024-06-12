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
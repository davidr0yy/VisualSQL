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
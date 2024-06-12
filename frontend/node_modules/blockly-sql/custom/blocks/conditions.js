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
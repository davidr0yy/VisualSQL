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
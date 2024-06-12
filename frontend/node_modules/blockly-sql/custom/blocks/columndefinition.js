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
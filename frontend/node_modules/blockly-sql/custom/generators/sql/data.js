Blockly.SQL['data_boolean'] = function(block) {
    var code = "";
    var value = "";
    if (block.getField('BOOLEAN').getValue() === "TRUE") {
        value = 1;
    } else {
        value = 0;
    }
    code += value;
    return [code, Blockly.SQL.ORDER_ATOMIC];
};

Blockly.SQL['data_boolean_statement'] = function(block) {
    var code = "";
    var value = "";
    if (block.getField('BOOLEAN').getValue() === "TRUE") {
        value = 1;
    } else {
        value = 0;
    }
    code += value;
    return code + ",";
};

Blockly.SQL['data_string'] = function(block) {
    var code = Blockly.SQL.quote_(block.getFieldValue('STRING'));
    return [code, Blockly.SQL.ORDER_ATOMIC];
};

Blockly.SQL['data_string_statement'] = function(block) {
    var code = Blockly.SQL.quote_(block.getFieldValue('STRING'));
    return code + ",";
};

Blockly.SQL['data_number'] = function(block) {
    var code = "";
    code += block.getFieldValue('NUMBER');
    return [code, Blockly.SQL.ORDER_ATOMIC];
};

Blockly.SQL['data_number_statement'] = function(block) {
    var code = "";
    code += block.getFieldValue('NUMBER');
    return code + ",";
};

//"YYYY-MM-DD HH:MM:SS.SSS"
Blockly.SQL['data_date'] = function(block) {
    var code = "";
    code += (block.getFieldValue('YEAR')).pad(4) + "-" + (block.getFieldValue('MONTH')).pad(2) + "-" + (block.getFieldValue('DAY')).pad(2);
    code += " 00:00:00.000";
    return [code, Blockly.SQL.ORDER_ATOMIC];
};

//"YYYY-MM-DD HH:MM:SS.SSS"
Blockly.SQL['data_date_statement'] = function(block) {
    var code = "";
    code += block.getFieldValue('YEAR').pad(4) + "-" + block.getFieldValue('MONTH').pad(2) + "-" + block.getFieldValue('DAY').pad(2);
    code += " 00:00:00.000";
    return code + ",";
};

//"YYYY-MM-DD HH:MM:SS.SSS"
Blockly.SQL['data_datetime'] = function(block) {
    var code = "";
    code += block.getFieldValue('YEAR').pad(4) + "-" + block.getFieldValue('MONTH').pad(2) + "-" + block.getFieldValue('DAY').pad(2);
    code += " " + block.getFieldValue('HOUR').pad(2) + ":" + block.getFieldValue('MINUTE').pad(2) + ":00.000";
    return [code, Blockly.SQL.ORDER_ATOMIC];
};

//"YYYY-MM-DD HH:MM:SS.SSS"
Blockly.SQL['data_datetime_statement'] = function(block) {
    var code = "";
    code += block.getFieldValue('YEAR').pad(4) + "-" + block.getFieldValue('MONTH').pad(2) + "-" + block.getFieldValue('DAY').pad(2);
    code += " " + block.getFieldValue('HOUR').pad(2) + ":" + block.getFieldValue('MINUTE').pad(2) + ":00.000";
    return code + ",";
};

String.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
};
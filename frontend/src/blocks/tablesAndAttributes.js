import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';

const tables = [
  'Department', 
  'Professor', 
  'Student', 
  'Course', 
  'Enrollment', 
  'Class'
];

const columns = {
  'Department': ['DepartmentID', 'DepartmentName'],
  'Professor': ['ProfessorID', 'FirstName', 'LastName', 'Department'],
  'Student': ['StudentID', 'FirstName', 'LastName', 'EnrollmentDate'],
  'Course': ['CourseID', 'CourseName', 'Department'],
  'Enrollment': ['EnrollmentID', 'Student', 'Course', 'EnrollmentDate'],
  'Class': ['ClassID', 'Course', 'Professor', 'Schedule']
};

const fillTables = () => {
  return tables.map(table => [table, table]);
};

const fillColumns = (table) => {
  return columns[table].map(column => [column, column]);
};

const doesMatch = (selectedTable, correctColumn) => {
  return columns[selectedTable].includes(correctColumn);
};

export const defineTableBlocks = () => {
  Blockly.Blocks['allchooser'] = {
    init: function() {
      this.appendDummyInput('allInput')
        .setAlign('CENTRE')
        .appendField("*");
      this.setOutput(true, "ALL");
      this.setColour('#f1bf06');
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  pythonGenerator.forBlock['allchooser'] = function(block, generator) {
    return '*';
  };

  Blockly.Blocks['table'] = {
    init: function() {
      this.appendDummyInput('previousTables')
        .appendField('     ')
        .appendField(new Blockly.FieldDropdown(fillTables()), "chooseTableT");
      this.setOutput(true, 'TABLE');
      this.setColour('#f1bf06');
      this.setTooltip("Select a table");
      this.setHelpUrl("");
    }
  };

  pythonGenerator.forBlock['table'] = function(block, generator) {
    var chosenTableT = block.getFieldValue('chooseTableT');
    return chosenTableT;
  };

  Blockly.Blocks['conditionchooser'] = {
    init: function() {
      this.appendDummyInput('listInput')
        .appendField("     ")
        .appendField(new Blockly.FieldDropdown(fillTables(), this.updateColumns.bind(this)), "chooseTableC")
        .appendField('.', "dot")
        .appendField(new Blockly.FieldDropdown(fillColumns('Department')), "chooseColumnC");
      this.setInputsInline(true);
      this.setOutput(true, 'CONDITIONCHOOSER');
      this.setColour('#f1bf06');
      this.setTooltip("Select a table and column");
      this.setHelpUrl("");
    },
    updateColumns: function(newTable) {
      const columnDropdown = this.getField('chooseColumnC');
      if (columnDropdown) {
        columnDropdown.menuGenerator_ = fillColumns(newTable);
        columnDropdown.setValue(columnDropdown.menuGenerator_[0][1]);
      }
    },
    onchange: function(changeEvent) {
      if (changeEvent && changeEvent.element === 'field' && changeEvent.name === 'chooseTableC') {
        const selectedTable = this.getFieldValue('chooseTableC');
        this.updateColumns(selectedTable);
      }
    }
  };

  pythonGenerator.forBlock['conditionchooser'] = function(block, generator) {
    var chosenTableC = block.getFieldValue('chooseTableC');
    var chosenColumnC = block.getFieldValue('chooseColumnC');
    var chosenOrderC = '';
    if (block.getInput('listOrder')) {
      chosenOrderC = block.getFieldValue('orderC');
      if (chosenOrderC == 'BLANK') {
        chosenOrderC = '';
      }
    }
    if (chosenColumnC == 'all') {
      chosenColumnC = '*';
    }
    var code = chosenTableC + '.' + chosenColumnC + ' ' + chosenOrderC;
    return code.trim();
  };
};

defineTableBlocks();

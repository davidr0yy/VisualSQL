import React, { useState, useEffect } from 'react';
import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator as Python } from 'blockly/python'; // Import Python generator
import { defineSelectBlocks } from '../blocks/select';
import { defineTableBlocks } from '../blocks/tablesAndAttributes';
import { defineAliasBlocks } from '../blocks/aliases';
import { defineLogicalOperatorBlocks } from '../blocks/logicalOperators';
import { defineMathematicalOperatorBlocks } from '../blocks/mathematicalOperators';
import { defineValueInputBlocks } from '../blocks/valueInputs';
import { defineAggregateBlocks } from '../blocks/aggregateBlocks';
import './visprog.css';
import axios from 'axios';
import blockDiagram from '../collegediagram.png'; // Import your image

const VisualProgramming = () => {
  const [workspace, setWorkspace] = useState(null);
  const [queryResult, setQueryResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define all custom blocks before initializing Blockly
    defineSelectBlocks();
    defineTableBlocks();
    defineAliasBlocks();
    defineLogicalOperatorBlocks();
    defineMathematicalOperatorBlocks();
    defineValueInputBlocks();
    defineAggregateBlocks();

    const blocklyDiv = document.getElementById('blocklyDiv');
    const toolboxXml = `
      <xml id="toolbox" style="display: none;">
        <category name="Statements & Clauses" colour="#8007f2">
          <category name="Statements">
            <block type="select"></block>
          </category>
          <category name="Clauses">
            <block type="select_from"></block>
            <block type="all_join"></block>
            <block type="select_where"></block>
            <block type="select_groupby"></block>
            <block type="select_having"></block>
            <block type="select_orderby"></block>
          </category>
        </category>
        <category name="Tables & Attributes" colour="#f1bf06">
          <block type="allchooser"></block>
          <block type="table"></block>
          <block type="conditionchooser"></block>
        </category>
        <category name="Aliases" colour="#0ddb69">
          <block type="tablename_as"></block>
        </category>
        <category name="Operators" colour="#5270DE">
          <category name="Logical">
            <block type="not"></block>
            <block type="and"></block>
            <block type="or"></block>
            <block type="between"></block>
            <block type="innifier"></block>
          </category>
          <category name="Mathematical">
            <block type="compare"></block>
            <block type="compareDerived"></block>
            <block type="math"></block>
          </category>
        </category>
        <category name="Value Inputs" colour="#FC4758">
          <block type="freeinput"></block>
          <block type="boolean"></block>
          <block type="datepicker"></block>
          <block type="number"></block>
        </category>
        <category name="Aggregates" colour="#C440C4">
          <block type="aggregate_min"></block>
          <block type="aggregate_avg"></block>
          <block type="aggregate_max"></block>
          <block type="aggregate_sum"></block>
          <block type="aggregate_count"></block>
        </category>
      </xml>
    `;

    const workspace = Blockly.inject(blocklyDiv, {
      toolbox: toolboxXml,
    });
    setWorkspace(workspace);
  }, []);

  const generateQuery = () => {
    if (workspace) {
      const code = Python.workspaceToCode(workspace);
      console.log('Generated Query:', code);  // Log the generated query
      return code;
    }
    return '';
  };

  const executeQuery = async () => {
    const query = generateQuery();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/execute-query/', { query }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setQueryResult(response.data);
    } catch (error) {
      setError(error);
      console.error('Axios Error:', error);  // Log the error
    }
  };

  return (
    <div>
      <div id="blocklyDiv" style={{ width: '100%', height: '600px', paddingTop: '100px' }} />
      <div className="button-container">
        <button onClick={executeQuery}>Execute Query</button>
      </div>
      {queryResult && <pre>{JSON.stringify(queryResult, null, 2)}</pre>}
      {error && <p>Error: {error.message}</p>}
      <div className="center-container">
        <h2>Class Diagram</h2>
        <img src={blockDiagram} alt="Class Diagram" />
      </div>
    </div>
  );
};

export default VisualProgramming;

import React, { useState, useEffect } from 'react';
import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator as Python } from 'blockly/python';
import { defineSelectBlocks } from '../blocks/select';
import { defineTableBlocks } from '../blocks/tablesAndAttributes';
import { defineAliasBlocks } from '../blocks/aliases';
import { defineLogicalOperatorBlocks } from '../blocks/logicalOperators';
import { defineMathematicalOperatorBlocks } from '../blocks/mathematicalOperators';
import { defineValueInputBlocks } from '../blocks/valueInputs';
import { defineAggregateBlocks } from '../blocks/aggregateBlocks';
import './visprog.css';
import axios from 'axios';
import blockDiagram from '../collegediagram.png';
import RealTimePessimism from './RealTimePessimism';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const VisualProgramming = () => {
  const [workspace, setWorkspace] = useState(null);
  const [queryResult, setQueryResult] = useState(null);
  const [error, setError] = useState(null);
  const [pessimisticLevel, setPessimisticLevel] = useState('low');
  const [showGuideSidebar, setShowGuideSidebar] = useState(false);

  useEffect(() => {
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
      console.log('Generated Query:', code);
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
      setError(null);
      setShowGuideSidebar(false); // Hide guide sidebar if query is successful
    } catch (error) {
      setError(error);
      console.error('Axios Error:', error);
      setShowGuideSidebar(true); // Show guide sidebar if there's an error
    }
  };

  const renderTable = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      return <p>No data available</p>;
    }

    const headers = Object.keys(data[0]);

    return (
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {headers.map((header) => (
                  <td key={header}>{row[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <RealTimePessimism onPessimismLevelChange={setPessimisticLevel} />
      <div id="blocklyDiv" style={{ width: '100%', height: '600px', paddingTop: '100px' }} />
      <div className="button-container">
        <button onClick={executeQuery}>Execute Query</button>
      </div>
      {queryResult && renderTable(queryResult)}
      {error && <p>Error: {error.message}</p>}
      {showGuideSidebar && (
        <div className="guide-sidebar">
          <h2>Need Help?</h2>
          <p>It looks like there was an issue with your query. Here are some tips to help you out:</p>
          <ul>
            <li><Link to="/modules/">Go to module page</Link></li>
          </ul>
        </div>
      )}
      <div className="center-container">
        <h2>Class Diagram</h2>
        <img src={blockDiagram} alt="Class Diagram" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default VisualProgramming;

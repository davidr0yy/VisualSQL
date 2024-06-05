import React, { useEffect } from 'react';
import BlocklyComponent from './BlocklyComponent';
import { defineCustomBlocks } from '../blocks/select';


const BlocklyPage = () => {
  useEffect(() => {
    defineCustomBlocks();
  }, []);

  return (
    <div className="blockly-page-container">
      <h1>BlocklySQL Integration</h1>
      <BlocklyComponent />
      <p>If you see this message, BlocklyPage is rendering correctly.</p>
    </div>
  );
};

export default BlocklyPage;

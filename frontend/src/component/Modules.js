import React from 'react';
import '../App.css';
import './Modules.css';
import { CodeBlock } from 'react-code-blocks';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css/github-markdown.css';
import 'highlight.js/styles/github.css';

const topics = [
  {
    name: 'SELECT Statement',
    content: `The SELECT statement in SQL is used to fetch or retrieve data from a database. It allows users to access the data and retrieve specific data based on specific conditions. We can fetch either the entire table or according to some specified rules. The data returned is stored in a result table. This result table is also called the result set.

With the SELECT clause of a SELECT command statement, we specify the columns that we want to be displayed in the query result and, optionally, which column headings we prefer to see above the result table. The SELECT clause is the first clause and is one of the last clauses of the select statement that the database server evaluates.

The reason for this is that before we can determine what to include in the final result set, we need to know all of the possible columns that could be included in the final result set.`,
    codeBlock: (
      <CodeBlock  
        text="SELECT column1, column2 FROM table_name;"
        language="sql"          
        showLineNumbers={false}
        theme="atom-one-dark"
      />
    )
  },    
  {
    name: 'WHERE Statement',
    content: `The WHERE clause in SQL is used to filter records or rows from a table based on one or more conditions. It is typically used in conjunction with the SELECT, UPDATE, and DELETE statements to specify the criteria for retrieving, modifying, or removing data from a table.

The WHERE clause is essential when you want to retrieve specific data from a table based on certain criteria. For example, you might want to retrieve all the records of customers from a specific city or all the orders placed on a particular date.

The condition in the WHERE clause can be a simple expression or a combination of expressions using logical operators like AND, OR, and NOT. The expressions can also involve comparison operators (=, >, <, >=, <=, <>), pattern matching with LIKE, or other SQL functions.

The WHERE clause can also be used with the UPDATE and DELETE statements to modify or remove records that meet certain conditions.

It's important to note that the WHERE clause should come after the FROM clause in a SELECT, UPDATE, or DELETE statement. Additionally, proper use of parentheses and logical operators is crucial when constructing complex conditions involving multiple expressions.`,
    codeBlock: (
      <CodeBlock
        text="SELECT column1, column2, ... FROM table_name WHERE condition;"
        language="sql"
        showLineNumbers={false}
        theme="atom-one-dark"
      />
    )
  },
  {
    name: 'ORDER BY Statement',
    content: `The ORDER BY clause in SQL is used to sort the result set returned by a SELECT statement in either ascending (ASC) or descending (DESC) order based on one or more columns.

Sorting data is often necessary when you want to present the retrieved information in a specific order, such as alphabetically by name, chronologically by date, or numerically by a specific column value.

Here's the general syntax for using the ORDER BY clause:`,
    codeBlock: (
      <CodeBlock
        text="SELECT * FROM Customer ORDER BY Age DESC;"
        language="sql"
        showLineNumbers={true}
        theme="atom-one-dark"
      />
    )
  },
  {
    name: 'INSERT INTO Statements',
    content: `The INSERT INTO statement in SQL is used to add new rows or records to an existing table in a database. It is one of the fundamental operations in SQL, along with SELECT, UPDATE, and DELETE, for managing data in tables.

The INSERT INTO statement is typically used when you need to insert new data into a table, such as adding a new customer record to a customers table, or inserting a new order into an orders table.

The INSERT INTO statement specifies the table name into which you want to insert the new row(s). The list of columns within the parentheses is optional, but if provided, it should match the order of the values specified in the VALUES clause.

If you omit the column list, you must provide values for all columns in the table, respecting the order in which the columns were defined during table creation.`,
    codeBlock: (
      <CodeBlock
        text="INSERT INTO table_name VALUES (value1, value2, value);"
        language="sql"
        showLineNumbers={true}
        theme="atom-one-dark"
      />
    )
  },
  {
    name: 'UPDATE Statement',
    content: `The UPDATE statement in SQL is used to update the data of an existing table in the database. We can update single columns as well as multiple columns using the UPDATE statement as per our requirement.
    When changing a row in a table, the SQL UPDATE statement uses locks on each row; after the row is changed, the lock is released. As a result, it can use a single query to modify one row or several rows.
`,
    codeBlock: (
      <CodeBlock
        text="UPDATE table_name SET column1 = value1, column2 = value2,… WHERE condition;"
        language="sql"
        showLineNumbers={true}
        theme="atom-one-dark"
      />
    )
  },
  {
    name: 'AGGREGATE Functions',
    content: `Aggregate functions are often used with the GROUP BY clause of the SELECT statement. The GROUP BY clause splits the result-set into groups of values and the aggregate function can be used to return a single value for each group.
    The most commonly used SQL aggregate functions are:
    - MIN() - returns the smallest value within the selected column
    - MAX() - returns the largest value within the selected column
    - COUNT() - returns the number of rows in a set
    - SUM() - returns the total sum of a numerical column
    - AVG() - returns the average value of a numerical column`,
    subtopics: [
      {
        name: 'MIN() Function',
        content: 'The MIN() function returns the smallest value in a set of values. It is often used with numeric columns but can also be used with date columns to find the earliest date.',
        codeBlock: (
          <CodeBlock
            text="SELECT MIN(column_name) FROM table_name;"
            language="sql"
            showLineNumbers={false}
            theme="atom-one-dark"
          />
        )
      },
      {
        name: 'MAX() Function',
        content: 'The MAX() function returns the largest value in a set of values. It is often used with numeric columns but can also be used with date columns to find the latest date.',
        codeBlock: (
          <CodeBlock
            text="SELECT MAX(column_name) FROM table_name;"
            language="sql"
            showLineNumbers={false}
            theme="atom-one-dark"
          />
        )
      },
      {
        name: 'COUNT() Function',
        content: 'The COUNT() function returns the number of rows that match a specified criterion. It is commonly used to count the number of rows in a table or the number of non-NULL values in a column.',
        codeBlock: (
          <CodeBlock
            text="SELECT COUNT(column_name) FROM table_name;"
            language="sql"
            showLineNumbers={false}
            theme="atom-one-dark"
          />
        )
      },
      {
        name: 'SUM() Function',
        content: 'The SUM() function returns the total sum of a numeric column. It is often used to calculate the total of a particular column for a group of rows.',
        codeBlock: (
          <CodeBlock
            text="SELECT SUM(column_name) FROM table_name;"
            language="sql"
            showLineNumbers={false}
            theme="atom-one-dark"
          />
        )
      },
      {
        name: 'AVG() Function',
        content: 'The AVG() function returns the average value of a numeric column. It is often used to calculate the average of a particular column for a group of rows.',
        codeBlock: (
          <CodeBlock
            text="SELECT AVG(column_name) FROM table_name;"
            language="sql"
            showLineNumbers={false}
            theme="atom-one-dark"
          />
        )
      }
    ]
  },
  {
    name: 'DELETE Statement',
    content: `The existing table's records can be deleted using the SQL DELETE Statement. We must utilize the WHERE clause in conjunction with the DELETE statement in order to filter the data that need to be deleted (or, delete specific entries). The DELETE statement will remove every record from the table if it is executed without a WHERE clause.
    We can remove records from several tables as well as one or more rows from a single table by using the DELETE statement.`,
    codeBlock: (
      <CodeBlock
        text="DELETE FROM table_name WHERE [condition];"
        language="sql"
        showLineNumbers={true}
        theme="atom-one-dark"
      />
    )
  },
  {
    name: 'JOIN Statement',
    content: `The SQL Join clause is used to combine data from two or more tables in a database. When the related data is stored across multiple tables, joins help you to retrieve records combining the fields from these tables using their foreign keys.`,
    codeBlock: (
      <CodeBlock
        text="SELECT column_name(s) FROM table1 JOIN table2;"
        language="sql"
        showLineNumbers={true}
        theme="atom-one-dark"
      />
    )
  },
  {
    name: 'GROUP BY Statement',
    content: `The SQL GROUP BY clause is used in conjunction with the SELECT statement to arrange identical data into groups. This clause follows the WHERE clause in a SELECT statement and precedes the ORDER BY and HAVING clauses (if they exist). The main purpose of grouping the records of a table based on particular columns is to perform calculations on these groups. Therefore, The GROUP BY clause is typically used with aggregate functions such as SUM(), COUNT(), AVG(), MAX(), or MIN() etc.`,
    codeBlock: (
      <CodeBlock
        text="SELECT column_name(s) FROM table_name GROUP BY column_name(s);"
        language="sql"
        showLineNumbers={true}
        theme="atom-one-dark"
      />
    )
  },
  {
    name: 'AND Statements',
    content: `The AND operator is used to filter records based on more than one condition`,
    codeBlock: (
      <CodeBlock
        text="WHERE [condition1] AND [condition2];"
        language="sql"
        showLineNumbers={true}
        theme="atom-one-dark"
      />
    )
  },
  {
    name: 'Aliases',
    content: `The use of aliases is to address a specific table or a column in an SQL statement without changing their original name in the database. Aliases are created with the AS keyword.`,
    codeBlock: (
      <CodeBlock
        text="SELECT column1, column2.... FROM table_name AS alias_name;"
        language="sql"
        showLineNumbers={true}
        theme="atom-one-dark"
      />
    )
  }
];

function Modules() {
  const [selectedTopic, setSelectedTopic] = React.useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = React.useState(null);

  const handleTopicClick = (topic) => {
    if (selectedTopic === topic) {
      setSelectedTopic(null);
      setSelectedSubtopic(null);
    } else {
      setSelectedTopic(topic);
      setSelectedSubtopic(null);
    }
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      alert('Code copied to clipboard!');
    });
  };

  return (
    <div className="modules-container">
      <div className="modules-sidebar">
        <h1>SQL Tutorial</h1>
        <ul className="modules-list">
          {topics.map((topic, index) => (
            <React.Fragment key={index}>
              <li 
                onClick={() => handleTopicClick(topic)}
                className={selectedTopic === topic ? 'active' : ''}
              >
                <span role="img" aria-label={topic.name}>📘</span>
                {topic.name}
              </li>
              {topic === selectedTopic && topic.subtopics && (
                <ul className="subtopics-list">
                  {topic.subtopics.map((subtopic, subIndex) => (
                    <li key={subIndex} onClick={() => setSelectedSubtopic(subtopic)}>
                      <span role="img" aria-label={subtopic.name}>📗</span>
                      {subtopic.name}
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
      
      <div className="modules-content">
        {selectedSubtopic ? (
          <>
            <h1>{selectedSubtopic.name}</h1>
            <div>
              {selectedSubtopic.codeBlock}
              <button className="copy-button" onClick={() => handleCopyCode(selectedSubtopic.codeBlock.props.text)}>Copy</button>
            </div>
            <ReactMarkdown className="markdown-body" children={selectedSubtopic.content} />
          </>
        ) : selectedTopic ? (
          <>
            <h1>{selectedTopic.name}</h1>
            <div>
              {selectedTopic.codeBlock}
              <button className="copy-button" onClick={() => handleCopyCode(selectedTopic.codeBlock.props.text)}>Copy</button>
            </div>
            <ReactMarkdown className="markdown-body" children={selectedTopic.content} />
          </>
        ) : (
          <h1 className="modules-list">Select a module to view its content</h1>
        )}
      </div>
    </div>
  );
}

export default Modules;

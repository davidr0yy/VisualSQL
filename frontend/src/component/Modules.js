  import React, { useState, useEffect } from 'react';
  import '../App.css';
  import './Modules.css';
  import ReactMarkdown from 'react-markdown';
  import 'github-markdown-css/github-markdown.css';
  import 'highlight.js/styles/github.css';
  import RealTimePessimism from './RealTimePessimism';  
  import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


  const topics = [
    {
      name: 'SELECT Statement',
      path: 'select-statement',
      content: `The SELECT statement in SQL is used to fetch or retrieve data from a database. It allows users to access the data and retrieve specific data based on specific conditions. We can fetch either the entire table or according to some specified rules. The data returned is stored in a result table. This result table is also called the result set.

  With the SELECT clause of a SELECT command statement, we specify the columns that we want to be displayed in the query result and, optionally, which column headings we prefer to see above the result table. The SELECT clause is the first clause and is one of the last clauses of the select statement that the database server evaluates.

  The reason for this is that before we can determine what to include in the final result set, we need to know all of the possible columns that could be included in the final result set.

  Here's a basic example of a SELECT statement:
  \`\`\`sql
  SELECT column1, column2 FROM table_name;
  \`\`\`

  You can also use the SELECT statement with various clauses to filter, sort, and group the data:
  - **WHERE**: To filter rows based on specific conditions.
  - **ORDER BY**: To sort the result set.
  - **GROUP BY**: To group rows sharing a property so that an aggregate function can be applied to each group.

  ### Examples

  #### Simple SELECT Query
  This query retrieves all columns from the "Employees" table:
  \`\`\`sql
  SELECT * FROM Employees;
  \`\`\`

  #### SELECT with WHERE Clause
  This query retrieves employees who work in the 'Sales' department:
  \`\`\`sql
  SELECT FirstName, LastName, Department FROM Employees WHERE Department = 'Sales';
  \`\`\`

  #### SELECT with ORDER BY Clause
  This query retrieves employees ordered by their last name:
  \`\`\`sql
  SELECT FirstName, LastName FROM Employees ORDER BY LastName ASC;
  \`\`\`

  #### SELECT with GROUP BY Clause
  This query retrieves the count of employees in each department:
  \`\`\`sql
  SELECT Department, COUNT(*) as NumberOfEmployees FROM Employees GROUP BY Department;
  \`\`\`

  These are some of the common usages of the SELECT statement in SQL. Each example demonstrates a specific aspect of retrieving data using the SELECT statement.`,
    
    },   
    { 
      name: 'WHERE Clause',
      path: 'where-clause',
      content: `
  The WHERE clause in SQL is used to filter records or rows from a table based on one or more conditions. It is typically used in conjunction with the SELECT, UPDATE, and DELETE statements to specify the criteria for retrieving, modifying, or removing data from a table.
  
  The WHERE clause is essential when you want to retrieve specific data from a table based on certain criteria. For example, you might want to retrieve all the records of customers from a specific city or all the orders placed on a particular date.
  
  The condition in the WHERE clause can be a simple expression or a combination of expressions using logical operators like AND, OR, and NOT. The expressions can also involve comparison operators (=, >, <, >=, <=, <>), pattern matching with LIKE, or other SQL functions.
  
  The WHERE clause can also be used with the UPDATE and DELETE statements to modify or remove records that meet certain conditions.
  
  It's important to note that the WHERE clause should come after the FROM clause in a SELECT, UPDATE, or DELETE statement. Additionally, proper use of parentheses and logical operators is crucial when constructing complex conditions involving multiple expressions.
  
  ### Examples
  
  #### Simple WHERE Clause
  This query retrieves employees who work in the 'Sales' department:
  \`\`\`sql
  SELECT FirstName, LastName, Department FROM Employees WHERE Department = 'Sales';
  \`\`\`
  
  #### WHERE Clause with Multiple Conditions
  This query retrieves employees who work in the 'Sales' department and have a salary greater than 50000:
  \`\`\`sql
  SELECT FirstName, LastName, Department, Salary FROM Employees WHERE Department = 'Sales' AND Salary > 50000;
  \`\`\`
  
  #### WHERE Clause with OR Condition
  This query retrieves employees who work in the 'Sales' department or have a salary greater than 50000:
  \`\`\`sql
  SELECT FirstName, LastName, Department, Salary FROM Employees WHERE Department = 'Sales' OR Salary > 50000;
  \`\`\`
  
  #### WHERE Clause with LIKE Operator
  This query retrieves employees whose first name starts with 'J':
  \`\`\`sql
  SELECT FirstName, LastName FROM Employees WHERE FirstName LIKE 'J%';
  \`\`\`
  
  #### WHERE Clause with BETWEEN Operator
  This query retrieves employees whose salary is between 40000 and 60000:
  \`\`\`sql
  SELECT FirstName, LastName, Salary FROM Employees WHERE Salary BETWEEN 40000 AND 60000;
  \`\`\`
  
  These examples illustrate how the WHERE clause can be used to filter data based on various conditions.
  `,
     
    },
      {
      name: 'ORDER BY Statement',
      content: `  The ORDER BY clause in SQL is used to sort the result set returned by a SELECT statement in either ascending (ASC) or descending (DESC) order based on one or more columns.
    Sorting data is often necessary when you want to present the retrieved information in a specific order, such as alphabetically by name, chronologically by date, or numerically by a specific column value.
    Here's the general syntax for using the ORDER BY clause:

  \`\`\`sql
  SELECT column1, column2, ...
  FROM table_name
  ORDER BY column1 [ASC|DESC], column2 [ASC|DESC], ...;
  \`\`\`
  ### Examples
  
  #### ORDER BY Single Column
  This query retrieves all customers ordered by their age in descending order:
  \`\`\`sql
  SELECT * FROM Customers ORDER BY Age DESC;
  \`\`\`
  
  #### ORDER BY Multiple Columns
  This query retrieves all customers ordered first by their last name in ascending order and then by their first name in ascending order:
  \`\`\`sql
  SELECT * FROM Customers ORDER BY LastName ASC, FirstName ASC;
  \`\`\`
  
  #### ORDER BY with Numeric Values
  This query retrieves all products ordered by their price from lowest to highest:
  \`\`\`sql
  SELECT * FROM Products ORDER BY Price ASC;
  \`\`\`
  
  #### ORDER BY with Date Values
  This query retrieves all orders ordered by their order date from newest to oldest:
  \`\`\`sql
  SELECT * FROM Orders ORDER BY OrderDate DESC;
  \`\`\`
  
  #### ORDER BY with Aliases
  This query retrieves all employees ordered by their years of experience (calculated as an alias):
  \`\`\`sql
  SELECT FirstName, LastName, (CURRENT_DATE - HireDate) AS YearsOfExperience
  FROM Employees
  ORDER BY YearsOfExperience DESC;
  \`\`\`
  
  These examples illustrate how the ORDER BY clause can be used to sort data in various ways based on different criteria.`,

  },
      
    {
      name: 'INSERT INTO Statements',
      content: `The INSERT INTO statement in SQL is used to add new rows or records to an existing table in a database. It is one of the fundamental operations in SQL, along with SELECT, UPDATE, and DELETE, for managing data in tables.
    
  The INSERT INTO statement is typically used when you need to insert new data into a table, such as adding a new customer record to a customers table, or inserting a new order into an orders table.
  
  The INSERT INTO statement specifies the table name into which you want to insert the new row(s). The list of columns within the parentheses is optional, but if provided, it should match the order of the values specified in the VALUES clause.
  
  If you omit the column list, you must provide values for all columns in the table, respecting the order in which the columns were defined during table creation.
  
  ### Examples
  
  #### Insert a Single Row
  This query inserts a new customer into the Customers table:
  \`\`\`sql
  INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)
  VALUES ('Cardinal', 'Tom B. Erichsen', 'Skagen 21', 'Stavanger', '4006', 'Norway');
  \`\`\`
  
  #### Insert Multiple Rows
  This query inserts multiple new products into the Products table:
  \`\`\`sql
  INSERT INTO Products (ProductName, SupplierID, CategoryID, QuantityPerUnit, Price)
  VALUES ('Chais', 1, 1, '10 boxes x 20 bags', 18.00),
          ('Chang', 1, 1, '24 - 12 oz bottles', 19.00),
          ('Aniseed Syrup', 1, 2, '12 - 550 ml bottles', 10.00);
  \`\`\`
  
  #### Insert Data from Another Table
  This query inserts all records from the Suppliers table into the SuppliersBackup table:
  \`\`\`sql
  INSERT INTO SuppliersBackup (SupplierID, SupplierName, ContactName, Address, City, PostalCode, Country)
  SELECT SupplierID, SupplierName, ContactName, Address, City, PostalCode, Country
  FROM Suppliers;
  \`\`\`
  
  #### Insert with Specified Columns
  This query inserts a new employee into the Employees table, specifying only the columns for the first name, last name, and department:
  \`\`\`sql
  INSERT INTO Employees (FirstName, LastName, Department)
  VALUES ('John', 'Doe', 'Engineering');
  \`\`\`
  
  #### Insert Default Values
  This query inserts a new product into the Products table using default values for some columns:
  \`\`\`sql
  INSERT INTO Products (ProductName, CategoryID, Price)
  VALUES ('New Product', 1, DEFAULT);
  \`\`\`
  
  #### Insert Data with Subquery
  This query inserts data into the Employees table based on a subquery that selects data from the TempEmployees table:
  \`\`\`sql
  INSERT INTO Employees (FirstName, LastName, Department)
  SELECT FirstName, LastName, Department FROM TempEmployees WHERE StartDate > '2023-01-01';
  \`\`\`
  
  These examples demonstrate how the INSERT INTO statement can be used to add new rows to a table in various ways.`,
  
  },
    {
        name: 'UPDATE Statement',
    content: `The UPDATE statement in SQL is used to update the data of an existing table in the database. We can update single columns as well as multiple columns using the UPDATE statement as per our requirement. When changing a row in a table, the SQL UPDATE statement uses locks on each row; after the row is changed, the lock is released. As a result, it can use a single query to modify one row or several rows.

  The basic syntax of the UPDATE statement is:
  \`\`\`sql
  UPDATE table_name
  SET column1 = value1, column2 = value2, ...
  WHERE condition;
  \`\`\`

  ### Examples

  #### Update a Single Column
  This query updates the last name of an employee with EmployeeID = 1:
  \`\`\`sql
  UPDATE Employees
  SET LastName = 'Smith'
  WHERE EmployeeID = 1;
  \`\`\`

  #### Update Multiple Columns
  This query updates the last name and department of an employee with EmployeeID = 1:
  \`\`\`sql
  UPDATE Employees
  SET LastName = 'Smith', Department = 'HR'
  WHERE EmployeeID = 1;
  \`\`\`

  #### Update with a Condition
  This query updates the salary of employees in the 'Sales' department:
  \`\`\`sql
  UPDATE Employees
  SET Salary = Salary * 1.10
  WHERE Department = 'Sales';
  \`\`\`

  #### Update Using Subquery
  This query updates the department of employees whose ID matches with a list from another table:
  \`\`\`sql
  UPDATE Employees
  SET Department = 'Finance'
  WHERE EmployeeID IN (SELECT EmployeeID FROM TempEmployees WHERE Department = 'Finance');
  \`\`\`

  #### Update with JOIN
  This query updates the salary of employees based on a value from another table:
  \`\`\`sql
  UPDATE Employees
  SET Employees.Salary = TempEmployees.Salary
  FROM Employees
  INNER JOIN TempEmployees ON Employees.EmployeeID = TempEmployees.EmployeeID;
  \`\`\`

  These examples demonstrate how the UPDATE statement can be used to modify existing records in a table under various conditions and scenarios.`,

  },  
    {
      name: 'AGGREGATE Functions',
  content: `Aggregate functions are often used with the GROUP BY clause of the SELECT statement. The GROUP BY clause splits the result-set into groups of values and the aggregate function can be used to return a single value for each group.
The most commonly used SQL aggregate functions are:
- MIN() - returns the smallest value within the selected column
- MAX() - returns the largest value within the selected column
- COUNT() - returns the number of rows in a set
- SUM() - returns the total sum of a numerical column
- AVG() - returns the average value of a numerical column

### Examples

#### MIN() Function
The MIN() function returns the smallest value in a set of values. It is often used with numeric columns but can also be used with date columns to find the earliest date:
\`\`\`sql
SELECT MIN(Salary) AS LowestSalary FROM Employees;
\`\`\`

#### MAX() Function
The MAX() function returns the largest value in a set of values. It is often used with numeric columns but can also be used with date columns to find the latest date:
\`\`\`sql
SELECT MAX(Salary) AS HighestSalary FROM Employees;
\`\`\`

#### COUNT() Function
The COUNT() function returns the number of rows that match a specified criterion. It is commonly used to count the number of rows in a table or the number of non-NULL values in a column:
\`\`\`sql
SELECT COUNT(*) AS NumberOfEmployees FROM Employees;
\`\`\`

#### SUM() Function
The SUM() function returns the total sum of a numeric column. It is often used to calculate the total of a particular column for a group of rows:
\`\`\`sql
SELECT SUM(Salary) AS TotalSalaries FROM Employees;
\`\`\`

#### AVG() Function
The AVG() function returns the average value of a numeric column. It is often used to calculate the average of a particular column for a group of rows:
\`\`\`sql
SELECT AVG(Salary) AS AverageSalary FROM Employees;
\`\`\`

### Using Aggregate Functions with GROUP BY

Aggregate functions are commonly used with the GROUP BY clause to group the result-set by one or more columns and then apply the aggregate function to each group:

#### GROUP BY with COUNT()
This query retrieves the number of employees in each department:
\`\`\`sql
SELECT Department, COUNT(*) AS NumberOfEmployees
FROM Employees
GROUP BY Department;
\`\`\`

#### GROUP BY with SUM()
This query retrieves the total salaries paid in each department:
\`\`\`sql
SELECT Department, SUM(Salary) AS TotalSalaries
FROM Employees
GROUP BY Department;
\`\`\`

#### GROUP BY with AVG()
This query retrieves the average salary in each department:
\`\`\`sql
SELECT Department, AVG(Salary) AS AverageSalary
FROM Employees
GROUP BY Department;
\`\`\`

#### GROUP BY with MIN() and MAX()
This query retrieves the lowest and highest salary in each department:
\`\`\`sql
SELECT Department, MIN(Salary) AS LowestSalary, MAX(Salary) AS HighestSalary
FROM Employees
GROUP BY Department;
\`\`\`

These examples illustrate how aggregate functions can be used to perform calculations on sets of values and how they can be combined with the GROUP BY clause to organize the result-set into meaningful groups.`,
    },
  {
    name: 'DELETE Statement',
    content: `The existing table's records can be deleted using the SQL DELETE Statement. We must utilize the WHERE clause in conjunction with the DELETE statement in order to filter the data that need to be deleted (or, delete specific entries). The DELETE statement will remove every record from the table if it is executed without a WHERE clause.
  We can remove records from several tables as well as one or more rows from a single table by using the DELETE statement.
  
  The basic syntax of the DELETE statement is:
  \`\`\`sql
  DELETE FROM table_name
  WHERE condition;
  \`\`\`
  
  ### Examples
  
  #### Delete All Rows
  This query deletes all rows from the Employees table:
  \`\`\`sql
  DELETE FROM Employees;
  \`\`\`
  
  #### Delete with a Condition
  This query deletes all employees who work in the 'Sales' department:
  \`\`\`sql
  DELETE FROM Employees
  WHERE Department = 'Sales';
  \`\`\`
  
  #### Delete with Multiple Conditions
  This query deletes all employees who work in the 'Sales' department and have a salary less than 50000:
  \`\`\`sql
  DELETE FROM Employees
  WHERE Department = 'Sales' AND Salary < 50000;
  \`\`\`
  
  #### Delete Using Subquery
  This query deletes employees whose IDs match those in another table:
  \`\`\`sql
  DELETE FROM Employees
  WHERE EmployeeID IN (SELECT EmployeeID FROM TempEmployees);
  \`\`\`
  
  #### Delete with JOIN
  This query deletes records from one table based on a condition in another table:
  \`\`\`sql
  DELETE E
  FROM Employees E
  JOIN TempEmployees TE ON E.EmployeeID = TE.EmployeeID
  WHERE TE.Status = 'Inactive';
  \`\`\`
  
  #### Delete Using a Limit
  This query deletes a specified number of records:
  \`\`\`sql
  DELETE FROM Employees
  ORDER BY HireDate
  LIMIT 10;
  \`\`\`
  
  These examples demonstrate how the DELETE statement can be used to remove records from a table under various conditions and scenarios.`,
  },
  {
    name: 'JOIN Statement',
    content: `The SQL Join clause is used to combine data from two or more tables in a database. When the related data is stored across multiple tables, joins help you to retrieve records combining the fields from these tables using their foreign keys.
  
  There are several types of JOINs in SQL:
  
  - **INNER JOIN**: Returns records that have matching values in both tables.
  - **LEFT JOIN (or LEFT OUTER JOIN)**: Returns all records from the left table, and the matched records from the right table. The result is NULL from the right side if there is no match.
  - **RIGHT JOIN (or RIGHT OUTER JOIN)**: Returns all records from the right table, and the matched records from the left table. The result is NULL from the left side when there is no match.
  - **FULL JOIN (or FULL OUTER JOIN)**: Returns all records when there is a match in either left or right table. The result is NULL from the left side when there is no match in the right table, and vice versa.
  - **CROSS JOIN**: Returns the Cartesian product of both tables.
  
  ### Examples
  
  #### INNER JOIN
  This query retrieves all employees and their corresponding department names:
  \`\`\`sql
  SELECT Employees.FirstName, Employees.LastName, Departments.DepartmentName
  FROM Employees
  INNER JOIN Departments ON Employees.DepartmentID = Departments.DepartmentID;
  \`\`\`
  
  #### LEFT JOIN
  This query retrieves all employees and their corresponding department names, including those employees who do not belong to any department:
  \`\`\`sql
  SELECT Employees.FirstName, Employees.LastName, Departments.DepartmentName
  FROM Employees
  LEFT JOIN Departments ON Employees.DepartmentID = Departments.DepartmentID;
  \`\`\`
  
  #### RIGHT JOIN
  This query retrieves all departments and their corresponding employees, including those departments that do not have any employees:
  \`\`\`sql
  SELECT Employees.FirstName, Employees.LastName, Departments.DepartmentName
  FROM Employees
  RIGHT JOIN Departments ON Employees.DepartmentID = Departments.DepartmentID;
  \`\`\`
  
  #### FULL JOIN
  This query retrieves all employees and departments, matching them when possible:
  \`\`\`sql
  SELECT Employees.FirstName, Employees.LastName, Departments.DepartmentName
  FROM Employees
  FULL JOIN Departments ON Employees.DepartmentID = Departments.DepartmentID;
  \`\`\`
  
  #### CROSS JOIN
  This query retrieves the Cartesian product of Employees and Departments tables:
  \`\`\`sql
  SELECT Employees.FirstName, Employees.LastName, Departments.DepartmentName
  FROM Employees
  CROSS JOIN Departments;
  \`\`\`
  
  #### SELF JOIN
  A self join is a regular join but the table is joined with itself:
  \`\`\`sql
  SELECT A.FirstName AS Employee, B.FirstName AS Manager
  FROM Employees A, Employees B
  WHERE A.ManagerID = B.EmployeeID;
  \`\`\`
  
  These examples illustrate how different types of JOINs can be used to combine records from multiple tables in various ways.`,

  },
  
    {
    name: 'GROUP BY Statement',
    content: `The SQL GROUP BY clause is used in conjunction with the SELECT statement to arrange identical data into groups. This clause follows the WHERE clause in a SELECT statement and precedes the ORDER BY and HAVING clauses (if they exist). The main purpose of grouping the records of a table based on particular columns is to perform calculations on these groups. Therefore, The GROUP BY clause is typically used with aggregate functions such as SUM(), COUNT(), AVG(), MAX(), or MIN() etc.
  
  ### Examples
  
  #### Simple GROUP BY
  This query retrieves the count of employees in each department:
  \`\`\`sql
  SELECT Department, COUNT(*) as NumberOfEmployees
  FROM Employees
  GROUP BY Department;
  \`\`\`
  
  #### GROUP BY with SUM()
  This query retrieves the total salaries paid in each department:
  \`\`\`sql
  SELECT Department, SUM(Salary) as TotalSalaries
  FROM Employees
  GROUP BY Department;
  \`\`\`
  
  #### GROUP BY with AVG()
  This query retrieves the average salary in each department:
  \`\`\`sql
  SELECT Department, AVG(Salary) as AverageSalary
  FROM Employees
  GROUP BY Department;
  \`\`\`
  
  #### GROUP BY with MIN() and MAX()
  This query retrieves the lowest and highest salary in each department:
  \`\`\`sql
  SELECT Department, MIN(Salary) as LowestSalary, MAX(Salary) as HighestSalary
  FROM Employees
  GROUP BY Department;
  \`\`\`
  
  #### GROUP BY with HAVING
  The HAVING clause is used to filter groups based on a specified condition. This query retrieves departments with more than 5 employees:
  \`\`\`sql
  SELECT Department, COUNT(*) as NumberOfEmployees
  FROM Employees
  GROUP BY Department
  HAVING COUNT(*) > 5;
  \`\`\`
  
  #### GROUP BY with Multiple Columns
  This query retrieves the total salaries paid in each department and job title:
  \`\`\`sql
  SELECT Department, JobTitle, SUM(Salary) as TotalSalaries
  FROM Employees
  GROUP BY Department, JobTitle;
  \`\`\`
  
  #### GROUP BY with JOIN
  This query retrieves the total order amount for each customer:
  \`\`\`sql
  SELECT Customers.CustomerName, SUM(Orders.OrderAmount) as TotalOrderAmount
  FROM Customers
  JOIN Orders ON Customers.CustomerID = Orders.CustomerID
  GROUP BY Customers.CustomerName;
  \`\`\`
  
  These examples illustrate how the GROUP BY clause can be used to group records and perform aggregate calculations on these groups.`,

  },
  {
    name: 'AND Statements',
    content: `The AND operator is used to filter records based on more than one condition. When using the AND operator, all the specified conditions must be true for a record to be included in the result set. It is commonly used in the WHERE clause of SELECT, UPDATE, and DELETE statements.
  
  ### Examples
  
  #### Simple AND Condition
  This query retrieves employees who work in the 'Sales' department and have a salary greater than 50000:
  \`\`\`sql
  SELECT FirstName, LastName, Department, Salary
  FROM Employees
  WHERE Department = 'Sales' AND Salary > 50000;
  \`\`\`
  
  #### AND with Multiple Conditions
  This query retrieves products that are in stock and have a price less than 20:
  \`\`\`sql
  SELECT ProductName, Price, Stock
  FROM Products
  WHERE Stock > 0 AND Price < 20;
  \`\`\`
  
  #### AND with Date Conditions
  This query retrieves orders placed by a specific customer within the last month:
  \`\`\`sql
  SELECT OrderID, OrderDate, CustomerID
  FROM Orders
  WHERE CustomerID = 123 AND OrderDate > DATE_SUB(CURRENT_DATE, INTERVAL 1 MONTH);
  \`\`\`
  
  #### AND with JOIN
  This query retrieves employees who are in the 'Engineering' department and have been with the company for more than 5 years:
  \`\`\`sql
  SELECT Employees.FirstName, Employees.LastName, Departments.DepartmentName
  FROM Employees
  JOIN Departments ON Employees.DepartmentID = Departments.DepartmentID
  WHERE Departments.DepartmentName = 'Engineering' AND Employees.HireDate < DATE_SUB(CURRENT_DATE, INTERVAL 5 YEAR);
  \`\`\`
  
  #### AND with Nested Queries
  This query retrieves employees who have completed more than 10 projects and have a performance rating above 4:
  \`\`\`sql
  SELECT FirstName, LastName
  FROM Employees
  WHERE EmployeeID IN (
      SELECT EmployeeID
      FROM Projects
      GROUP BY EmployeeID
      HAVING COUNT(ProjectID) > 10
  ) AND PerformanceRating > 4;
  \`\`\`
  
  These examples illustrate how the AND operator can be used to combine multiple conditions to filter data in various scenarios.`,
  },
  
  ];

  const motivationalMessages = {
    low: [
      "Keep going, you're doing great!",
      "You're on the right track!",
      "Keep pushing forward!",
      "Every step forward is a step towards your goal.",
      "You have the power to achieve anything.",
      "Stay consistent and watch yourself succeed.",
      "Believe in the process and trust yourself.",
      "Keep moving forward, one step at a time.",
      "Small progress is still progress.",
      "Your efforts are paying off, keep it up!"
    ],
    medium: [
      "Don't give up, you're almost there!",
      "You're getting better, keep it up!",
      "You can do it, stay focused!",
      "Push through the challenges, success is near.",
      "Your hard work is showing, keep going!",
      "Stay determined, you're doing great!",
      "Focus on your goals and keep striving.",
      "You're stronger than you think.",
      "Every challenge you overcome makes you better.",
      "Keep your head up and keep pushing forward."
    ],
    high: [
      "Stay positive, keep pushing forward!",
      "Believe in yourself!",
      "Every mistake is a learning opportunity!",
      "You have the strength to get through this.",
      "Keep your eyes on the prize and keep working hard.",
      "Challenges are opportunities to grow.",
      "Stay resilient, success is within reach.",
      "Your potential is limitless, keep going!",
      "Embrace the journey and keep moving forward.",
      "You are capable of amazing things, don't stop now."
    ]
  };
  
  const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];

  const getRandomMessage = (level) => {
    const messages = motivationalMessages[level];
    return messages[Math.floor(Math.random() * messages.length)];
  };
  
  function Modules() {
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [selectedSubtopic, setSelectedSubtopic] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [attempts, setAttempts] = useState(0);
    const [errors, setErrors] = useState(0);
    const [correct, setCorrect] = useState(0);
    const [pessimisticLevel, setPessimisticLevel] = useState('low'); // Assume initial level is low
  
    useEffect(() => {
      setStartTime(Date.now());
    }, [selectedTopic, selectedSubtopic]);
  
    useEffect(() => {
      let interval;
  
      if (pessimisticLevel === 'high') {
        interval = setInterval(() => {
          toast.info(getRandomMessage('high'), { autoClose: 1500 });
        }, 2000); // Every 2 seconds
      } else if (pessimisticLevel === 'medium') {
        interval = setInterval(() => {
          toast.info(getRandomMessage('medium'), { autoClose: 1500 });
        }, 5000); // Every 5 seconds
      } else if (pessimisticLevel === 'low') {
        interval = setInterval(() => {
          toast.info(getRandomMessage('low'), { autoClose: 1500 });
        }, 8000); // Every 8 seconds
      }
  
      return () => clearInterval(interval);
    }, [pessimisticLevel]);
  
    const handleTopicClick = (topic) => {
      setAttempts(attempts + 1);
      if (selectedTopic === topic) {
        setSelectedTopic(null);
        setSelectedSubtopic(null);
      } else {
        setSelectedTopic(topic);
        setSelectedSubtopic(null);
      }
    };
  
    const handleSubtopicClick = (subtopic) => {
      setAttempts(attempts + 1);
      setSelectedSubtopic(subtopic);
    };
  
    return (
      <div className="modules-container">
        <RealTimePessimism
          interactionType={selectedTopic?.name || 'Module Selection'}
          attempts={attempts}
          errors={errors}
          correct={correct}
          onPessimismLevelChange={setPessimisticLevel} // Assume this prop is used to update pessimistic level
        />
        <div className="modules-sidebar">
          <h1>SQL Tutorial</h1>
          <ul className="modules-list">
            {topics.map((topic, index) => (
              <React.Fragment key={index}>
                <li 
                  onClick={() => handleTopicClick(topic)}
                  className={selectedTopic === topic ? 'active' : ''}
                >
                  <span role="img" aria-label={topic.name}></span>
                  {topic.name}
                </li>
                {topic === selectedTopic && topic.subtopics && (
                  <ul className="subtopics-list">
                    {topic.subtopics.map((subtopic, subIndex) => (
                      <li key={subIndex} onClick={() => handleSubtopicClick(subtopic)}>
                        <span role="img" aria-label={subtopic.name}></span>
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
              </div>
              <ReactMarkdown className="markdown-body" children={selectedSubtopic.content} />
            </>
          ) : selectedTopic ? (
            <>
              <h1>{selectedTopic.name}</h1>
              <div>
                {selectedTopic.codeBlock}
              </div>
              <ReactMarkdown className="markdown-body" children={selectedTopic.content} />
            </>
          ) : (
            <h1 className="modules-list">Select a module to view its content</h1>
          )}
        </div>
        <ToastContainer />
      </div>
    );
  }
  
  export default Modules;
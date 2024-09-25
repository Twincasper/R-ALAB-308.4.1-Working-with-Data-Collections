// Part 2

csv = "ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor’s Assistant,26";

let parentMatrix = [];

const csvToArrayDynamic = () => {

  let row = [];
  let cell = "";
  let parentMatrix = [];

  for (let i = 0; i < csv.length; i++) {
    if (csv[i] !== "," && csv[i] !== "\n") {
      // This means we're still on the current cell, so we add our current letter to the cell
      cell += csv[i];
    } else if (csv[i] === ",") {
      // New cell, same row. Push the current cell into the row
      row.push(cell);
      cell = ""; // Reset the cell
    } else if (csv[i] === "\n") {
      // End of the row, push the current cell and reset row
      row.push(cell); // Push the last cell in the row
      parentMatrix.push(row); // Push the completed row to the matrix
      row = []; // Reset row for the next line
      cell = ""; // Reset cell
    }
  }

  // After the loop, we need to push any remaining data in the last row
  if (cell.length > 0) {
    row.push(cell); // Push the last cell
    parentMatrix.push(row); // Push the last row to the matrix
  }

  return parentMatrix;
};


// Part 3, convert parentMatrix to array of objects

const arrayToObject = (matrix) => {
  let objParent = [];

  // Grab the headers from the first array and store those in an array
  const headers = matrix[0];

  // Loop through the rest of the rows aka the values, so we start from index 1
  for (let i = 1; i < matrix.length; i++) {
    let obj = {};
    let currentRow = matrix[i];

    // Loop through each cell in the current row
    for (let j = 0; j < headers.length; j++) {
      // J directly corresponds to the index of the header for the current cell
      obj[headers[j].toLowerCase()] = currentRow[j];
    }

    objParent.push(obj);
  }

  return objParent;
};

parentMatrix = csvToArrayDynamic(csv);

console.log("Part 2",parentMatrix);

let arrOfObjects = arrayToObject(parentMatrix);

console.log("Part 3",arrOfObjects);

// Part 4

arrOfObjects.pop();

arrOfObjects.splice(1, 0, { id: "48", name: "Barry", occupation: "Runner", age: "25" });

arrOfObjects.push({ id: "7", name: "Bilbo", occupation: "None", age: "111" });

console.log("After removal, insertion and push of part 4",arrOfObjects);

// Average ages

let totalAge = 0;

for (let i = 0; i < arrOfObjects.length; i++) {
  totalAge += parseInt(arrOfObjects[i].age);
}

let averageAge = totalAge / arrOfObjects.length;

console.log("Average Age:", averageAge);

// Part 5

// Can probably grab every key somehow and make that our first part of the csv, all of the values will essentially be the rest of the string
// Join back keys array to a string, each element separated by a ,
// Is object.keys doable here to grab the columns? Object.values to grab the rest?
// Each value will also be seperated by a , and then we need \n at the end of each obj's values
// Join all of that together in one string

const columns = Object.keys(arrOfObjects[0]).join(",");

const values = arrOfObjects.map(obj => Object.values(obj).join(",")).join("\n");

const finalCsv = `${columns}\n${values}`;

console.log("Part 5",finalCsv);

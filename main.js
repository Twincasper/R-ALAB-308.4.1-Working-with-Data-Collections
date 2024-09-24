// Part 2

csv = "ID,Name,Occupation,Age\n42,Bruce,Knight,41\n57,Bob,Fry Cook,19\n63,Blaine,Quiz Master,58\n98,Bill,Doctor’s Assistant,26";

let parentMatrix = [];

const csvToArrayDynamic = () => {

  let row = [];
  let cell = "";
  let cols = 0;

  for (let i = 0; i < csv.length; i++) {
    if (csv[i] !== "," && csv[i] !== "\n") {
      // This means we're still on the current cell, so we add our current letter to the cell
      cell += csv[i];
    } else if (csv[i] === ",") {
      // New cell, same row. So we reset cell, but increment cols
      row.push(cell);
      cell = "";
      cols++;
    } else if (csv[i] === "\n") {
      // New cell, as well as a new row. So reset everything.
      row.push(cell);
      cell = "";
      parentMatrix.push(row);
      row = [];
      cols = 0; // If we don't reset this, it'll keep adding to cols every row.
    }
    // Push the last row if there's no newline at the end of the CSV
    if (cell.length > 0) {
      row.push(cell);
      parentMatrix.push(row);
    }
    
    return parentMatrix;
  }
}

// Part 3, convert parentMatrix to array of objects


let objCell = "";
let obj = {};
let keyCounter = 0;
let objParent = [];

for (let i = csv.indexOf("\n") + 1; i < csv.length; i++) {
  if (csv[i] !== "," && csv[i] !== "\n") {
    objCell += csv[i];
  } else if (csv[i] === ",") {
    switch (keyCounter) {
      case 0:
        obj.id = objCell;
        break;
      case 1:
        obj.name = objCell;
        break;
      case 2:
        obj.occupation = objCell;
        break;
    }
    objCell = "";
    keyCounter++;
  } else if (csv[i] === "\n") {
    obj.age = objCell;
    objCell = "";
    objParent.push(obj);
    obj = {};
    keyCounter = 0;
  }
}

// Handle the last objCell if the CSV doesn't end with a newline
if (objCell !== "") {
  obj.age = objCell;
  objParent.push(obj);
}

console.log(objParent);

// Part 4

objParent.pop();

objParent.splice(1, 0, { id: "48", name: "Barry", occupation: "Runner", age: "25" });

objParent.push({ id: "7", name: "Bilbo", occupation: "None", age: "111" });

console.log("After part 4", objParent);

// Average ages

let totalAge = 0;

for (let i = 0; i < objParent.length; i++) {
  totalAge += objParent[i].age;
}

let averageAge = totalAge / objParent.length;

// Part 5

// Can probably grab every key somehow and make that our first part of the csv, all of the values will essentially be the rest of the string
// Join back keys array to a string, each element separated by a ,
// Is object.keys doable here to grab the columns? Object.values to grab the rest?
// Each value will also be seperated by a , and then we need \n at the end of each obj's values
// Join all of that together in one string

const columns = Object.keys(objParent[0]).join(",");

const values = objParent.map(obj => Object.values(obj).join(",")).join("\n");

const finalCsv = `${columns}\n${values}`;

console.log(finalCsv);
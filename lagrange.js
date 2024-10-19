const fs = require('fs'); 
function decodeValue(value, base) {
    return parseInt(value, base); 
}

function lagrangeInterpolation(points) {
    const n = points.length; 
    let result = 0; 
    
    for (let i = 0; i < n; i++) {
        let xi = points[i][0]; // x-coordinate of point i
        let yi = points[i][1]; // y-coordinate of point i

       
        let li = 1; 
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                let xj = points[j][0]; 
                li *= (0 - xj) / (xi - xj); 
            }
        }
        // Accumulate the result
        result += yi * li; 
    }

  
    return result;
}

function readInputFromFile(filePath) {
    const data = fs.readFileSync(filePath, 'utf-8'); 
    return JSON.parse(data); 
}

// Main execution
const inputFilePath = './input.json'; 
const input = readInputFromFile(inputFilePath); 
const points = []; 

// Parse the input and decode the points
for (let key in input) {
    if (key !== "keys") { 
        const base = parseInt(input[key].base, 10);
        const value = input[key].value; 
        const x = parseInt(key, 10);
        const y = decodeValue(value, base); 
        points.push([x, y]); 
    }
}

const secret = lagrangeInterpolation(points);

console.log("The constant term 'c' is:", Math.round(secret));

let globalIndex = 3; // global variable to keep track of the index of the activity
document.getElementById("addRow").onclick = function() {addRow()};

function addRow(){
    var table = document.getElementById("myTable");
    let row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);

    let len = (table.rows.length) -1;
    // Create the input boxes for the weight
    var weightbox = document.createElement('input');
    weightbox.setAttribute('type', 'text');
    weightbox.setAttribute('id', 'weight' + globalIndex);

    // Create the input boxes for the grade
    var formweight = document.createElement('form');
    var formgrade = document.createElement('form');
    formgrade.setAttribute('class', 'grade-inline');
    formgrade.setAttribute('oninput', 'updatePercentage(' + len + ')');

    var gradeboxdenom = document.createElement('input');
    gradeboxdenom.setAttribute('type', 'text');
    gradeboxdenom.setAttribute('name', 'grade' + len);
    gradeboxdenom.setAttribute('id', 'denom' + len);
    // gradeboxdenom.setAttribute('oninput', 'updatePercentage(' + len + ')');

    // gradeboxdenom.oninput("updatePercentage(" + globalIndex + ")");

    var gradeboxnum = document.createElement('input');
    gradeboxnum.setAttribute('type', 'text');
    gradeboxnum.setAttribute('name', 'grade' + len);
    gradeboxnum.setAttribute('id', 'num' + len);
    
    var percentageBox = document.createElement('p');
    percentageBox.setAttribute('id', 'percentage' + globalIndex);


    // Set the values of the cells
    cell1.innerHTML = "Activity " + globalIndex;
    cell2.innerHTML = "A" + globalIndex;
    formweight.appendChild(weightbox);
    cell3.appendChild(formweight);
    formgrade.appendChild(gradeboxnum);
    formgrade.appendChild(document.createTextNode(" / "));
    formgrade.appendChild(gradeboxdenom);
    cell4.appendChild(formgrade);
    cell5.appendChild(percentageBox);

    // gradeboxnum.addEventListener("input", function() { updatePercentage(1); });
    // gradeboxdenom.addEventListener("input", function() { updatePercentage(1); });

    globalIndex++;
}


// let weightIndex = 1;

// Define the function to calculate the weighted average
document.getElementById("weightedFunction").onclick = function() {calculateWeight()};

// Define the function to calculate the mean
document.getElementById("meanFunction").onclick = function() {calculateMean()};

// Define the function to calculate the mean
function calculateMean(){
    let table = document.getElementById("myTable");
    let sum = 0;
    for (let i = 1; i < table.rows.length; i++){
        let numerator = document.getElementsByName("grade" + i)[0].value;
        let denominator = document.getElementsByName("grade" + i)[1].value;
        let grade = (parseInt(numerator) / parseInt(denominator));
        sum += grade;
    }
    let finalGrade = sum / (table.rows.length - 1);
    finalGrade = Math.round(finalGrade * 100) / 100;
    document.getElementById("myResult").innerHTML = "Your final grade is: " + finalGrade + " (" + (finalGrade * 100) + "/100)";
}


function calculateWeight(){
    let table = document.getElementById("myTable");
    let finalGrade = 0;
    let weightSum = 0;
    for (let i = 1; i < table.rows.length; i++){
        let numerator = document.getElementsByName("grade" + i)[0].value;
        let denominator = document.getElementsByName("grade" + i)[1].value;
        let grade = (parseInt(numerator) / parseInt(denominator));
        let weight = document.getElementById("weight" + i).value;
        finalGrade += grade * Number(weight);
        weightSum += Number(weight);
    }
    finalGrade = finalGrade / weightSum;
    finalPercent = Math.round(finalGrade * 100) / 100;
    document.getElementById("myResult").innerHTML = "Your final grade is: " + finalGrade + " (" + (finalPercent * 100) + "/100)";
}


// let table = document.getElementById("myTable");
// let numActivities = table.rows.length;
// for( let i = 1; i < numActivities; i++){
//     let element = document.getElementById("grade" + i);
//     element.addEventListener("input", function() {
//         let numerator = document.getElementById("num" + i);
//         let denominator = document.getElementById("denom" + i);
//         numerator.addEventListener("input", printPercentage(numerator, denominator, i));
//         denominator.addEventListener("input", printPercentage(numerator, denominator, i));
//     });
// }

// function printPercentage(numerator, denominator, i){
//     while(numerator != "" && denominator != "" && isNaN(numerator) == false && isNaN(denominator) == false){
//         let percentage = (parseInt(numerator) / parseInt(denominator)) * 100;
//         document.getElementById("percentage" + (i)).innerHTML = percentage + "%";
//     }
// }

function updatePercentage(index) {
    let numerator = document.getElementById("num" + index).value;
    let denominator = document.getElementById("denom" + index).value;
    if (numerator && denominator && !isNaN(numerator) && !isNaN(denominator)) {
        let percentage = (parseInt(numerator) / parseInt(denominator)) * 100;
        document.getElementById("percentage" + index).innerHTML = percentage.toFixed(2) + "%";
    }
}
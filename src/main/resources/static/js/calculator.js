document.getElementById("addRow").onclick = function() {addRow()};

function addRow(){
    var table = document.getElementById("myTable");
    let row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);

    let len = (table.rows.length)-1;
    // Create the input boxes for the weight
    var weightbox = document.createElement('input');
    weightbox.setAttribute('type', 'text');
    weightbox.setAttribute('id', 'weight' + len);

    // Create the input boxes for the grade
    var formweight = document.createElement('form');
    var formgrade = document.createElement('form');
    formgrade.setAttribute('class', 'grade-inline');
    formgrade.setAttribute('oninput', 'updatePercentage(' + len + ')');

    var gradeboxdenom = document.createElement('input');
    gradeboxdenom.setAttribute('type', 'text');
    gradeboxdenom.setAttribute('name', 'grade' + len);
    gradeboxdenom.setAttribute('id', 'denom' + len);

    var gradeboxnum = document.createElement('input');
    gradeboxnum.setAttribute('type', 'text');
    gradeboxnum.setAttribute('name', 'grade' + len);
    gradeboxnum.setAttribute('id', 'num' + len);
    
    var percentageBox = document.createElement('p');
    percentageBox.setAttribute('id', 'percentage' + len);


    // Set the values of the cells
    cell1.innerHTML = "Activity " + len;
    cell2.innerHTML = "A" + len;
    formweight.appendChild(weightbox);
    cell3.appendChild(formweight);
    formgrade.appendChild(gradeboxnum);
    formgrade.appendChild(document.createTextNode(" / "));
    formgrade.appendChild(gradeboxdenom);
    cell4.appendChild(formgrade);
    cell5.appendChild(percentageBox);

}

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

function updatePercentage(index) {
    let numerator = document.getElementById("num" + index).value;
    let denominator = document.getElementById("denom" + index).value;
    if (numerator && denominator && !isNaN(numerator) && !isNaN(denominator)) {
        let percentage = (parseInt(numerator) / parseInt(denominator)) * 100;
        document.getElementById("percentage" + index).innerHTML = percentage.toFixed(2) + "%";
    }
}
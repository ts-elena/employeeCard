
// Logic for disabling Employment Related information when "None" boolean is true

var unemployed = document.getElementById('unemployed');
var company = document.getElementById("company");

   function getLocalStorageLine() {
        if (editedCell.cellIndex === 0) {
            return localStorage.getItem('Company');
        } else if (editedCell.cellIndex === 1) {
            return localStorage.getItem('Position');
        } else if (editedCell.cellIndex === 2) {
            return localStorage.getItem('startDate');
        } else if (editedCell.cellIndex === 3) {
            return localStorage.getItem('endDate');
        } else {};
    };

console.log (getLocalStorageLine);

function getElementByIdFunc(elementId) {
    return document.getElementById(elementId);
};

/**********************Hide Warning*******************************/

function hideWarnings() {
    var warning = getElementByIdFunc("warning");
    warning.style.display = "none";
};

hideWarnings();


/**********************Show/hide Save Line Button*******************************/

function getEditedCell() {
    return document.activeElement.parentElement;
};

function fetchCancelButton() {
    var cell = getEditedCell();
    var tableRow = cell.parentElement;
    var cancelButtonCell = tableRow.childNodes[4];
    var cancelButton = cancelButtonCell.childNodes[0];
    return cancelButton; 
};

function showCancelButton() {
    var cancelFinal = fetchCancelButton();
    cancelFinal.style.display = "block";
};

function hideCancelButton() {
    var cancelHide = onfocus.target;
    cancelHide.style.display = "none";
};

/**********************Automatic "Unemployed" value set by checkbox*******************************/
    
function disableIfUnemployed() {
    
  if (getElementByIdFunc("unemployed").checked === false) {
        getElementByIdFunc("company").disabled = false;
        getElementByIdFunc("positionCard").disabled = false;
        getElementByIdFunc("startDate").disabled = false;
        getElementByIdFunc("endDate").disabled = false;
        getElementByIdFunc("company").value = " ";
        getElementByIdFunc("positionCard").value = " ";
        getElementByIdFunc("startDate").value = "yyyy-MM-dd";
        getElementByIdFunc("endDate").value = "yyyy-MM-dd";

    } else {
        getElementByIdFunc("company").disabled = true;
        getElementByIdFunc("positionCard").disabled = true;
        getElementByIdFunc("startDate").disabled = true;
        getElementByIdFunc("endDate").disabled = true;
        getElementByIdFunc("company").value = "Unemployed";
        getElementByIdFunc("positionCard").value = "Unemployed";
        getElementByIdFunc("startDate").value = "yyyy-MM-dd";
        getElementByIdFunc("endDate").value = "yyyy-MM-dd";
    };
};



function today() {
    var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        };

        if (mm < 10) {
            mm = '0' + mm
        };

        return today = yyyy + '-' + mm + '-' + dd;
};

/**********************Birthday cannot be set later than today*******************************/

function birthday() {
    var dob = getElementByIdFunc("dob").value;

    if (dob > today()) {
        var dateOfBirth = getElementByIdFunc("dob");
        dateOfBirth.setAttribute("style", "border-color: red;");
        var warning = getElementByIdFunc("warning");
        warning.style.display = "block";
        var submitButton = getElementByIdFunc("submit");
        submitButton.style.cursor = "auto";
        submitButton.style.pointerEvents = "none";
        submitButton.style.backgroundColor = "#929292";
        submitButton.style.borderColor = "#e0e0e0";
    } else {
        var dateOfBirth = getElementByIdFunc("dob");
        dateOfBirth.setAttribute("style", "border-color: default;");
        hideWarnings();
        var submitButton = getElementByIdFunc("submit");
        submitButton.style.pointerEvents = "auto";
        submitButton.style.cursor = "pointer";
        submitButton.style.backgroundColor = "#e67e22";
        submitButton.style.borderColor = "#e67e22";
    };
};


/**********************Set Start Date to Today automatically*******************************/

function getDate() {
    if (document.getElementById("company").value === "" || document.getElementById("company").value === "Unemployed") {
        document.getElementById("startDate").value = "yyyy-MM-dd";
    } else {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        };

        if (mm < 10) {
            mm = '0' + mm
        };

        today = yyyy + '-' + mm + '-' + dd;
        document.getElementById("startDate").value = today;
    };
};


/**********************Clear form by "Cancel" button*******************************/

function clearEntry() {
    
    document.getElementById("demographicsForm").reset();
};


/******Check if there are existing values in Fields that get stored into the table*************/

var companyArray = JSON.parse(localStorage.getItem('Company')) || [];
var positionArray = JSON.parse(localStorage.getItem('Position')) || [];
var startDateArray = JSON.parse(localStorage.getItem('Start Date')) || [];
var endDateArray = JSON.parse(localStorage.getItem('End Date')) || [];

/**********************Save Table Updates*******************************/

 function editLocalStorage() {
     
    // Return local storage value by key, based on cell's index, because index = column, column = local storage key
    var editedCell = getEditedCell();
    function getLocalStorageValue() {
        if (editedCell.cellIndex === 0) {
            return localStorage.getItem('Company');
        } else if (editedCell.cellIndex === 1) {
            return localStorage.getItem('Position');
        } else if (editedCell.cellIndex === 2) {
            return localStorage.getItem('startDate');
        } else if (editedCell.cellIndex === 3) {
            return localStorage.getItem('endDate');
        } else {};
    };
     
     // Get index of the row where the cell is located
    var parentElement = editedCell.parentElement.rowIndex;

     // store local storage value, reeturned by the function
    var localStorageValue = getLocalStorageValue();
    // parse local storage value to be an array
    var parsedLocalStorageValue = JSON.parse(localStorageValue);
    // Find an element I want to substitude. Its position number matches the row index
    var arrowElement = parsedLocalStorageValue[parentElement];

     // Put a new value entered by the user to the same position in the array
     parsedLocalStorageValue[parentElement] = document.getElementsByTagName('table')[0].rows[parentElement].cells[editedCell.cellIndex].value

     // Stringify the array to store it back to the local storage
    var stringifyEditedArrow = JSON.stringify(parsedLocalStorageLine);


     // Rewrite the correct key's value

    if (editedCell === 0) {
        localStorage.setItem("Company", stringifyEditedArrow);
    } else if (editedCell === 1) {
        localStorage.setItem("Position", stringifyEditedArrow);
    } else if (editedCell === 2) {
        localStorage.setItem("Start Date", stringifyEditedArrow);
    } else if (editedCell === 3) {
        localStorage.setItem("End Date", stringifyEditedArrow)
    } else {

    };
    
    // Reload the page to show the updates
    //location.reload();
};

/**********************Add rows when there are existing values*******************************/

function AddHtmlRow(companys, positions, startDates, endDates) {
    if (companys.length !== 0 && positions.length !== 0) {

//???
        for (let i = 0; i < companys.length; i++) {
            var table = document.getElementsByTagName('table')[0];
            var newRow = table.insertRow(table.rows.length);
            newRow.setAttribute("id", Math.random()*10);
            
            function insertInput (cell) {
                var input = document.createElement("input");
                var wrapper = cell;
                wrapper.appendChild(input);
            };
            

            // add cells to the row
            
            var cancelButton = '<ion-icon name="close" class="tableButton" id="cancelButton"></ion-icon>';
            var saveButton = '<ion-icon name="save" class="tableButton" id="saveButton"></ion-icon>';
            
            var cell1 = newRow.insertCell(0);
            insertInput(cell1);
            cell1.setAttribute("id", Math.random()*10);
            cell1.onfocus = getEditedCell;
            cell1.firstChild.onfocus = showCancelButton;
            cell1.onblur = hideCancelButton;
            //cell1.onblur = editLocalStorage;
            
            var cell2 = newRow.insertCell(1);
            insertInput(cell2);
            cell2.setAttribute("id", Math.random()*10);
            cell2.onfocus = getEditedCell;
            cell2.firstChild.onfocus = showCancelButton;
            cell2.firstChild.onblur = hideCancelButton;
            //cell2.onblur = editLocalStorage;
            
            var cell3 = newRow.insertCell(2);
            cell3.setAttribute("id", Math.random()*10);
            insertInput(cell3);
            cell3.onfocus = getEditedCell;
            cell3.firstChild.onfocus = showCancelButton;
            cell3.firstChild.onblur = hideCancelButton;
            //cell3.onblur = editLocalStorage;
            
            var cell4 = newRow.insertCell(3);
            insertInput(cell4);
            cell4.createElement = "input";
            cell4.setAttribute("id", Math.random()*10);
            cell4.onfocus = getEditedCell;
            cell4.firstChild.onfocus = showCancelButton;
            cell4.firstChild.onblur = hideCancelButton;
            //cell4.onblur = editLocalStorage;
            
            var cell5 = newRow.insertCell(4);
            cell5.setAttribute("id", Math.random()*10);
            cell5.setAttribute("class", "narrowColumn");
            cell5.style.border = "none";
            cell5.style.padding = "1px 1px 1px 20px";
            cell5.style.width = "10px";
            
            var cell6 = newRow.insertCell(5);
            cell6.setAttribute("id", Math.random()*10);
            cell6.setAttribute("class", "narrowColumn");
            cell6.style.border = "none";
            cell6.style.padding = "1px 1px 1px 1px";
            cell6.style.width = "10px";
            
            cell1.firstChild.value = companys[i];
            cell2.firstChild.value = positions[i];
            cell3.firstChild.value = startDates[i];
            cell4.firstChild.value = endDates[i];
            cell5.innerHTML = cancelButton;
            cell6.innerHTML = saveButton;
        };
    };
};
AddHtmlRow(companyArray, positionArray, startDateArray, endDateArray); 


/**********************Add fields values to the Local Storage*******************************/


function addRow() {

    var company = document.getElementById('company').value;
    var positionCard = document.getElementById('positionCard').value;
    var startDate = getElementByIdFunc("startDate").value;
    var endDate = getElementByIdFunc("endDate").value;
    var parseC = [];
    var parseP = [];
    var parseStartDate = [];
    var parseEndDate = [];

    if (company !== '' && positionCard !== '') {
//?
        companyArray.push(company);
        positionArray.push(positionCard);
        startDateArray.push(startDate);
        endDateArray.push(endDate);

        localStorage.setItem('Company', JSON.stringify(companyArray));
        localStorage.setItem('Position', JSON.stringify(positionArray));
        localStorage.setItem('Start Date', JSON.stringify(startDateArray));
        localStorage.setItem('End Date', JSON.stringify(endDateArray));
        
        var newValueCompany = [company];
        var newValuePosition = [positionCard];
        var newValueStartDate = [startDate];
        var newValueEndDate = [endDate];

        location.reload();
        var retrieveC = localStorage.getItem('Company');
        var retrieveP = localStorage.getItem('Position');
        var retrieveStartDate = localStorage.getItem('Start Date');
        var retrieveEndDate = localStorage.getItem('End Date');
        
        var parseC = JSON.parse(retrieveC);
        var parseP = JSON.parse(retrieveP);
        var parseStartDate = JSON.parse(retrieveStartDate);
        var parseEndDate = JSON.parse(retrieveEndDate);

       
        var newValueCompany = [company];
        var newValuePosition = [positionCard];
        var newValueStartDate = [startDate];
        var newValueEndDate = [endDate];


       AddHtmlRow(newValueCompany, newValuePosition, newValueStartDate, newValueEndDate);

   };
};
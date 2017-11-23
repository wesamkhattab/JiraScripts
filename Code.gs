function onOpen() {
  var source = "BMW Jira";
  var assignee = "wesam_khattab";
  resetAssigneeSheet(assignee);
  setAssigneeTasks(source,assignee,"qxs0953");
}

function setAssigneeTasks(sourceSheet,targetSheet, name)  {
  var sourceBmwJira = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sourceSheet);  
  var assigneeSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(targetSheet);
  
  var assigneeCoulmnIndex = getColumnNrByName(sourceSheet,"Assignee");
  var data = sourceBmwJira.getDataRange().getValues();
  
  assigneeSheet.appendRow(data[0]);
  for (var rowIndex=0;rowIndex < data.length; rowIndex++) {
    if (data[rowIndex][assigneeCoulmnIndex] == name) {
      assigneeSheet.appendRow(data[rowIndex])
    }
  }
  assigneeUserStories("wesam_khattab");
}

function getColumnNrByName(sheetName, name) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var range = sheet.getRange(1, 1, 1, sheet.getMaxColumns());
  var values = range.getValues();
  
  for (var row in values) {
    for (var col in values[row]) {
      if (values[row][col] == name) {
        return parseInt(col);
      }
    }
  }
  throw 'failed to get column by name';
}

function assigneeUserStories(userName) {
  var sum = 0;
  var assigneeSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(userName);
  var storyPointsCoulmnIndex = getColumnNrByName(userName,"Custom field (Story Points)");
  var values = assigneeSheet.getRange(2,storyPointsCoulmnIndex+1,assigneeSheet.getMaxRows(),1).getValues();

  for(var i in values){
    sum += Number(values[i]);
  }
  assigneeSheet.appendRow(["sum",sum]);
}


function resetAssigneeSheet(name) {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var assigneeSheet = activeSpreadsheet.getSheetByName(name);
    if (assigneeSheet != null) {
    activeSpreadsheet.deleteSheet(assigneeSheet);
  }
  assigneeSheet = activeSpreadsheet.insertSheet();
  assigneeSheet.setName(name);
}


function onOpen() {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  var sourceBmwJira = activeSpreadsheet.getSheetByName("BMW Jira");
  
  var assigneeSheet = activeSpreadsheet.getSheetByName("wesam_khattab");
  if (assigneeSheet != null) {
    activeSpreadsheet.deleteSheet(assigneeSheet);
  }
  assigneeSheet = activeSpreadsheet.insertSheet();
  assigneeSheet.setName("wesam_khattab");
  
  setAssigneeTasks(sourceBmwJira,assigneeSheet,"qxs0953");
}

function getColumnNrByName(sheet, name) {
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


function setAssigneeTasks(sourceSheet,targetSheet, name)  {
  var assigneeCoulmnIndex = getColumnNrByName(sourceSheet,"Assignee");
  var data = sourceSheet.getDataRange().getValues();
  for (var rowIndex=0;rowIndex < data.length; rowIndex++) {
    if (data[rowIndex][assigneeCoulmnIndex] == name) {
      targetSheet.appendRow(data[rowIndex])
    }
  }
}

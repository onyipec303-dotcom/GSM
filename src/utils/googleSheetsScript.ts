export const GOOGLE_APPS_SCRIPT_CODE = `/**
 * =========================================================================
 * PECULIAR STORES — AUTOMATIC GOOGLE SHEETS ORDER LEAD RECORDER
 * =========================================================================
 * 
 * INSTRUCTIONS TO SET UP:
 * 1. Open Google Sheets (https://sheets.new) and create or open your spreadsheet.
 * 2. In the top menu, click Extensions -> Apps Script.
 * 3. Delete any default code in the editor, and PASTE THIS ENTIRE SCRIPT.
 * 4. Click the blue "Deploy" button (top right) -> select "New deployment".
 * 5. Click the gear icon next to "Select type" and choose "Web app".
 * 6. Under "Configuration":
 *    - Description: "Peculiar Stores Order Sync"
 *    - Execute as: "Me (your email)"
 *    - Who has access: "Anyone" (CRITICAL: MUST BE 'Anyone' so customer orders can post!)
 * 7. Click "Deploy", click "Authorize access", choose your Google account.
 *    (If you see "Google hasn't verified this app", click "Advanced" -> "Go to Untitled project (unsafe)" -> "Allow").
 * 8. Copy the generated "Web App URL" (ends with /exec).
 * 9. Paste that URL into the Google Sheets setup modal on your sales website and click "Save & Test Connection"!
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 10 seconds for other write operations to finish
  var hasLock = lock.tryLock(10000);

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet() || ss.getSheets()[0];
    
    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // Ensure header row exists if sheet is brand new
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Order Number",
        "Date of Order",
        "Customer Name",
        "Primary Phone",
        "WhatsApp Phone",
        "Delivery Address",
        "Product Name",
        "Quantity",
        "Total Amount (NGN)",
        "When to Receive",
        "Status"
      ]);
      sheet.getRange("A1:K1").setFontWeight("bold").setBackground("#18181b").setFontColor("#f59e0b");
      sheet.setFrozenRows(1);
    }

    // Clean and extract fields
    var orderNumber = data.orderNumber || data.id || ("ORD-" + Utilities.formatDate(new Date(), "GMT+1", "yyyyMMdd-HHmmss"));
    var orderDate = data.orderDate || data.createdAt || Utilities.formatDate(new Date(), "GMT+1", "dd/MM/yyyy HH:mm:ss");
    var name = data.name || data.customerName || "";
    // Prefix phone numbers with ' to prevent Google Sheets from stripping leading zero (e.g. 08068515242)
    var rawPhone1 = (data.phone1 || data.primaryPhone || "").toString().trim();
    var phone1 = rawPhone1 ? ("'" + rawPhone1) : "";
    var rawPhone2 = (data.phone2 || data.whatsappPhone || "").toString().trim();
    var phone2 = rawPhone2 ? ("'" + rawPhone2) : "";
    var address = data.address || data.deliveryAddress || "";
    var productName = data.productName || "Rechargeable GSM Landline Phone";
    var quantity = Number(data.quantity) || 1;
    var amount = Number(data.amount) || (quantity === 2 ? 70000 : 38000);
    var whenToReceive = data.whenToReceive || "As soon as possible";
    var status = data.status || "New Lead (Pending Dispatch)";

    // Prevent duplicate entries in Google Sheets
    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      // Read existing Order Numbers (Column A) and Phones (Column D) from row 2 downward
      var existingData = sheet.getRange(2, 1, lastRow - 1, 4).getValues();
      for (var i = 0; i < existingData.length; i++) {
        var existingOrderNo = (existingData[i][0] || "").toString().trim();
        var existingPhone = (existingData[i][3] || "").toString().replace(/['\\s]/g, "");
        var incomingPhoneClean = rawPhone1.replace(/['\\s]/g, "");

        // If order number matches, or identical phone placed order in the last row
        if (existingOrderNo === orderNumber.toString().trim() || (i === existingData.length - 1 && incomingPhoneClean && existingPhone === incomingPhoneClean)) {
          return ContentService.createTextOutput(JSON.stringify({
            result: "success",
            orderNumber: orderNumber,
            message: "Order already recorded in Google Sheets (Duplicate prevented)."
          })).setMimeType(ContentService.MimeType.JSON);
        }
      }
    }

    // Append the order record
    sheet.appendRow([
      orderNumber,
      orderDate,
      name,
      phone1,
      phone2,
      address,
      productName,
      quantity,
      amount,
      whenToReceive,
      status
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      result: "success",
      orderNumber: orderNumber,
      message: "Lead successfully recorded in Google Sheets!"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      result: "error",
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    if (hasLock) {
      lock.releaseLock();
    }
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "active",
    message: "Peculiar Stores Google Sheets Webhook is active and online!"
  })).setMimeType(ContentService.MimeType.JSON);
}
`;


/**
 * @NApiVersion 2.x
 * @NModuleScope SameAccount
 *
 * Appficiency Copyright 2020
 *
 * Description: Parser library
 *
 * Author: marlon
 * Date: May 22, 2021
 */

define(
    [],

    function() {
        var PREFIX = 'PARSER-TYPES.';
        var UI_FIELD_TYPE = 'UI.FieldType.';
        var UI_REC_TYPE = 'RECORD.Type.';
        
        var _fld_types = [
            {
                "id": "",
                "label": "--",
                "value": "",
            },
            {
                "id": "checkbox",
                "label": "Checkbox",
                "value": UI_FIELD_TYPE + "CHECKBOX",
            },
            {
                "id": "list",
                "label": "List/Record",
                "value": UI_FIELD_TYPE + "SELECT",
            },
            {
                "id": "text",
                "label": "Free-Form Text",
                "value": UI_FIELD_TYPE + "TEXT",
            },
        ];
        
        var _rec_types = [
            {
                "value": "",
                "text": ""
            }, {
                "value": "-112",
                "text": "Account"
            }, {
                "value": "-215",
                "text": "Account Type"
            }, {
                "value": "-414",
                "text": "Accounting Context"
            }, {
                "value": "-105",
                "text": "Accounting Period"
            }, {
                "value": "-289",
                "text": "Address"
            }, {
                "value": "-137",
                "text": "Address Book"
            }, {
                "value": "-387",
                "text": "Advanced PDF/HTML Template"
            }, {
                "value": "-138",
                "text": "Allocation Schedule"
            }, {
                "value": "-278",
                "text": "Allocation Type"
            }, {
                "value": "-232",
                "text": "Amortization Type"
            }, {
                "value": "-243",
                "text": "Approval Status"
            }, {
                "value": "-419",
                "text": "As Charged Project Revenue Rule"
            }, {
                "value": "-381",
                "text": "Automatic Location Assignment Configuration"
            }, {
                "value": "-385",
                "text": "Automatic Location Assignment Rule"
            }, {
                "value": "-408",
                "text": "Bank Import History"
            }, {
                "value": "-333",
                "text": "Billing Account"
            }, {
                "value": "-139",
                "text": "Billing Class"
            }, {
                "value": "-140",
                "text": "Billing Milestone"
            }, {
                "value": "-412",
                "text": "Billing Rate Card"
            }, {
                "value": "-141",
                "text": "Billing Schedule"
            }, {
                "value": "-234",
                "text": "Billing Schedule Type"
            }, {
                "value": "-344",
                "text": "Billing Subscription Line Status"
            }, {
                "value": "-338",
                "text": "Billing Subscription Status"
            }, {
                "value": "-420",
                "text": "Budget"
            }, {
                "value": "-396",
                "text": "Budget Category"
            }, {
                "value": "-555",
                "text": "Budget Exchange Rate"
            }, {
                "value": "-136",
                "text": "Buying Reason"
            }, {
                "value": "-135",
                "text": "Buying Time Frame"
            }, {
                "value": "-22",
                "text": "Call"
            }, {
                "value": "-24",
                "text": "Campaign"
            }, {
                "value": "-142",
                "text": "Campaign Audience"
            }, {
                "value": "-143",
                "text": "Campaign Category"
            }, {
                "value": "-144",
                "text": "Campaign Channel"
            }, {
                "value": "-229",
                "text": "Campaign Email"
            }, {
                "value": "-226",
                "text": "Campaign Event Response"
            }, {
                "value": "-227",
                "text": "Campaign Event Type"
            }, {
                "value": "-145",
                "text": "Campaign Family"
            }, {
                "value": "-146",
                "text": "Campaign Offer"
            }, {
                "value": "-131",
                "text": "Campaign Response Type"
            }, {
                "value": "-148",
                "text": "Campaign Search Engine"
            }, {
                "value": "-149",
                "text": "Campaign Subscription"
            }, {
                "value": "-150",
                "text": "Campaign Vertical"
            }, {
                "value": "-286",
                "text": "Cap Type"
            }, {
                "value": "-23",
                "text": "Case"
            }, {
                "value": "-151",
                "text": "Case Issue"
            }, {
                "value": "-152",
                "text": "Case Origin"
            }, {
                "value": "-153",
                "text": "Case Priority"
            }, {
                "value": "-320",
                "text": "Case Profile"
            }, {
                "value": "-132",
                "text": "Case Status"
            }, {
                "value": "-163",
                "text": "Case Territory"
            }, {
                "value": "-154",
                "text": "Case Type"
            }, {
                "value": "-228",
                "text": "Category 1099 Misc"
            }, {
                "value": "-290",
                "text": "Charge"
            }, {
                "value": "-319",
                "text": "Charge Billing Mode"
            }, {
                "value": "-276",
                "text": "Charge Rule"
            }, {
                "value": "-285",
                "text": "Charge Rule Type"
            }, {
                "value": "-296",
                "text": "Charge Stage"
            }, {
                "value": "-293",
                "text": "Charge Type"
            }, {
                "value": "-2",
                "text": "Client"
            }, {
                "value": "-109",
                "text": "Client Category"
            }, {
                "value": "-4011",
                "text": "Client Invoice Group"
            }, {
                "value": "-161",
                "text": "Client Message"
            }, {
                "value": "-108",
                "text": "Competitor"
            }, {
                "value": "-322",
                "text": "Consolidated Exchange Rate"
            }, {
                "value": "-240",
                "text": "Consolidated Rate Type"
            }, {
                "value": "-6",
                "text": "Contact"
            }, {
                "value": "-158",
                "text": "Contact Category"
            }, {
                "value": "-157",
                "text": "Contact Role"
            }, {
                "value": "-207",
                "text": "Cost Estimate Type"
            }, {
                "value": "-184",
                "text": "Costing Method Type"
            }, {
                "value": "-159",
                "text": "Country"
            }, {
                "value": "-349",
                "text": "Create Revenue Plans On"
            }, {
                "value": "-160",
                "text": "Credit Hold Override Type"
            }, {
                "value": "-122",
                "text": "Currency"
            }, {
                "value": "-282",
                "text": "Currency Symbol Placement"
            }, {
                "value": "-544",
                "text": "Custom GL Lines Configuration"
            }, {
                "value": "-315",
                "text": "Custom Recognition Event Type"
            }, {
                "value": "-102",
                "text": "Department"
            }, {
                "value": "-375",
                "text": "Device Id"
            }, {
                "value": "-438",
                "text": "Domain"
            }, {
                "value": "-241",
                "text": "Edition"
            }, {
                "value": "-165",
                "text": "Email Preference Type"
            }, {
                "value": "-120",
                "text": "Email Template"
            }, {
                "value": "-4",
                "text": "Employee"
            }, {
                "value": "-914",
                "text": "Employee Expense Source Type"
            }, {
                "value": "-166",
                "text": "Employee Status"
            }, {
                "value": "-1403",
                "text": "Employee Status Category"
            }, {
                "value": "-111",
                "text": "Employee Type"
            }, {
                "value": "-1404",
                "text": "Employee Type Category"
            }, {
                "value": "-9",
                "text": "Entity"
            }, {
                "value": "-8",
                "text": "Entity Group"
            }, {
                "value": "-223",
                "text": "Entity Stage"
            }, {
                "value": "-104",
                "text": "Entity Status"
            }, {
                "value": "-214",
                "text": "Entity Type"
            }, {
                "value": "-167",
                "text": "Entry Form"
            }, {
                "value": "-168",
                "text": "Ethnicity"
            }, {
                "value": "-20",
                "text": "Event"
            }, {
                "value": "-222",
                "text": "Event Priority"
            }, {
                "value": "-169",
                "text": "Event Reminder Duration"
            }, {
                "value": "-170",
                "text": "Event Reminder Type"
            }, {
                "value": "-230",
                "text": "Event Response Type"
            }, {
                "value": "-218",
                "text": "Event Status"
            }, {
                "value": "-126",
                "text": "Expense Category"
            }, {
                "value": "-340",
                "text": "Fair Value Dimension"
            }, {
                "value": "-335",
                "text": "Fair Value Formula"
            }, {
                "value": "-332",
                "text": "Fair Value Price"
            }, {
                "value": "-124",
                "text": "Field"
            }, {
                "value": "-213",
                "text": "Field Type"
            }, {
                "value": "326",
                "text": "File Attachment"
            }, {
                "value": "-147",
                "text": "File Type"
            }, {
                "value": "-548",
                "text": "Financial Institution"
            }, {
                "value": "-262",
                "text": "Fiscal Calendar"
            }, {
                "value": "-410",
                "text": "Fixed Amount Project Revenue Rule"
            }, {
                "value": "-514",
                "text": "Foreign Currency Variance Posting Rule"
            }, {
                "value": "-553",
                "text": "Format Profile"
            }, {
                "value": "-310",
                "text": "Generic Resource"
            }, {
                "value": "-302",
                "text": "GL Audit Numbering Sequence"
            }, {
                "value": "-543",
                "text": "GL Numbering Sequence"
            }, {
                "value": "-556",
                "text": "Import Account Mapping"
            }, {
                "value": "-902",
                "text": "Imported Employee Expense"
            }, {
                "value": "-913",
                "text": "Imported Employee Expense Status"
            }, {
                "value": "-427",
                "text": "Inbound Shipment"
            }, {
                "value": "-324",
                "text": "Incoterm"
            }, {
                "value": "-10",
                "text": "Item"
            }, {
                "value": "-460",
                "text": "Item Collection"
            }, {
                "value": "-461",
                "text": "Item Collection-Item map"
            }, {
                "value": "-506",
                "text": "Item Location Configuration"
            }, {
                "value": "-331",
                "text": "Item Revenue Category"
            }, {
                "value": "-106",
                "text": "Item Type"
            }, {
                "value": "-224",
                "text": "Language"
            }, {
                "value": "-101",
                "text": "Line of Business"
            }, {
                "value": "-237",
                "text": "Locale"
            }, {
                "value": "-103",
                "text": "Location"
            }, {
                "value": "-371",
                "text": "Location Type"
            }, {
                "value": "-178",
                "text": "Marital Status"
            }, {
                "value": "-865",
                "text": "Memorized Transaction"
            }, {
                "value": "-179",
                "text": "Merchant Account"
            }, {
                "value": "-281",
                "text": "Negative Number Format"
            }, {
                "value": "-532",
                "text": "News Item"
            }, {
                "value": "-400",
                "text": "Nexus"
            }, {
                "value": "-180",
                "text": "Note Type"
            }, {
                "value": "-280",
                "text": "Number Format"
            }, {
                "value": "-31",
                "text": "Opportunity"
            }, {
                "value": "-244",
                "text": "Order Status"
            }, {
                "value": "-4117",
                "text": "Originating Lead"
            }, {
                "value": "-181",
                "text": "Other Name Category"
            }, {
                "value": "-5",
                "text": "Partner"
            }, {
                "value": "-182",
                "text": "Partner Category"
            }, {
                "value": "-183",
                "text": "Payment Method"
            }, {
                "value": "-411",
                "text": "Percent Complete Project Revenue Rule"
            }, {
                "value": "-261",
                "text": "Period Subsidiary"
            }, {
                "value": "-220",
                "text": "Phone Call Status"
            }, {
                "value": "-508",
                "text": "Price Book"
            }, {
                "value": "-186",
                "text": "Price Level"
            }, {
                "value": "-507",
                "text": "Price Plan"
            }, {
                "value": "-187",
                "text": "Pricing Group"
            }, {
                "value": "-225",
                "text": "Product Tax"
            }, {
                "value": "-4106",
                "text": "Profile Type"
            }, {
                "value": "-7",
                "text": "Project"
            }, {
                "value": "-211",
                "text": "Project Constraint Type"
            }, {
                "value": "-287",
                "text": "Project Expense Type"
            }, {
                "value": "-517",
                "text": "Project Resource Role"
            }, {
                "value": "-27",
                "text": "Project Task"
            }, {
                "value": "-321",
                "text": "Project Template"
            }, {
                "value": "-528",
                "text": "Project Time Approval Type"
            }, {
                "value": "-177",
                "text": "Project Type"
            }, {
                "value": "-121",
                "text": "Promotion Code"
            }, {
                "value": "-233",
                "text": "Promotion Code Discount Type"
            }, {
                "value": "-205",
                "text": "Quantity Pricing Schedule"
            }, {
                "value": "-206",
                "text": "Quantity Pricing Type"
            }, {
                "value": "-284",
                "text": "Rate Rounding Type"
            }, {
                "value": "-283",
                "text": "Rate Source Type"
            }, {
                "value": "-1503",
                "text": "Recognition Treatment Rule"
            }, {
                "value": "-123",
                "text": "Record Type"
            }, {
                "value": "-343",
                "text": "Reforecast Method"
            }, {
                "value": "-353",
                "text": "Region"
            }, {
                "value": "-337",
                "text": "Renewal Type"
            }, {
                "value": "-188",
                "text": "Resident Status"
            }, {
                "value": "-28",
                "text": "Resource Allocation"
            }, {
                "value": "-301",
                "text": "Resource Allocation Approval Status"
            }, {
                "value": "-533",
                "text": "Resource Group"
            }, {
                "value": "-348",
                "text": "Revenue Allocation Group"
            }, {
                "value": "-336",
                "text": "Revenue Element"
            }, {
                "value": "-314",
                "text": "Revenue Recognition Event"
            }, {
                "value": "-365",
                "text": "Revenue Recognition Field Mapping"
            }, {
                "value": "-347",
                "text": "Revenue Recognition Plan"
            }, {
                "value": "-357",
                "text": "Revenue Recognition Rule"
            }, {
                "value": "-1502",
                "text": "Revenue Recognition Treatment"
            }, {
                "value": "-118",
                "text": "Role"
            }, {
                "value": "-190",
                "text": "Sales Forecast Type"
            }, {
                "value": "-134",
                "text": "Sales Readiness"
            }, {
                "value": "-191",
                "text": "Sales Role"
            }, {
                "value": "-162",
                "text": "Sales Territory"
            }, {
                "value": "-119",
                "text": "Saved Search"
            }, {
                "value": "-417",
                "text": "Script"
            }, {
                "value": "-418",
                "text": "Script Deployment"
            }, {
                "value": "-125",
                "text": "Scripted Record Type"
            }, {
                "value": "-1504",
                "text": "Secret"
            }, {
                "value": "-192",
                "text": "Shipping Method"
            }, {
                "value": "-193",
                "text": "Shipping Package"
            }, {
                "value": "-245",
                "text": "Shipping Status"
            }, {
                "value": "-185",
                "text": "Site Category"
            }, {
                "value": "-194",
                "text": "Site Template"
            }, {
                "value": "-195",
                "text": "State"
            }, {
                "value": "-565",
                "text": "Status"
            }, {
                "value": "-330",
                "text": "Subscription"
            }, {
                "value": "-359",
                "text": "Subscription Change Order"
            }, {
                "value": "-360",
                "text": "Subscription Change Order Action"
            }, {
                "value": "-364",
                "text": "Subscription Change Order Reactivation Option"
            }, {
                "value": "-361",
                "text": "Subscription Change Order Status"
            }, {
                "value": "-342",
                "text": "Subscription Line"
            }, {
                "value": "-197",
                "text": "Subscription Status"
            }, {
                "value": "-395",
                "text": "Subscription Term"
            }, {
                "value": "-117",
                "text": "Subsidiary"
            }, {
                "value": "-551",
                "text": "Subsidiary Settings"
            }, {
                "value": "-264",
                "text": "Task Item Status"
            }, {
                "value": "-219",
                "text": "Task Status"
            }, {
                "value": "-128",
                "text": "Tax Code"
            }, {
                "value": "-127",
                "text": "Tax Period"
            }, {
                "value": "-239",
                "text": "Tax Rounding Type"
            }, {
                "value": "-198",
                "text": "Tax Type"
            }, {
                "value": "-199",
                "text": "Term"
            }, {
                "value": "-256",
                "text": "Time"
            }, {
                "value": "-292",
                "text": "Timesheet"
            }, {
                "value": "-238",
                "text": "Timezone"
            }, {
                "value": "-30",
                "text": "Transaction"
            }, {
                "value": "-171",
                "text": "Transaction Form"
            }, {
                "value": "-164",
                "text": "Transaction Status"
            }, {
                "value": "-100",
                "text": "Transaction Type"
            }, {
                "value": "-554",
                "text": "Transaction Type Code"
            }, {
                "value": "-221",
                "text": "Unit"
            }, {
                "value": "-201",
                "text": "Units Type"
            }, {
                "value": "-905",
                "text": "Unlocked Time Period"
            }, {
                "value": "-362",
                "text": "Usage"
            }, {
                "value": "-3",
                "text": "Vendor"
            }, {
                "value": "-110",
                "text": "Vendor Category"
            }, {
                "value": "-549",
                "text": "Vendor-Subsidiary Relationship"
            }, {
                "value": "-202",
                "text": "Visa Type"
            }, {
                "value": "-268",
                "text": "Website"
            }, {
                "value": "-203",
                "text": "Win/Loss Reason"
            }, {
                "value": "-156",
                "text": "Work Calendar"
            }, {
                "value": "-129",
                "text": "Workflow"
            }, {
                "value": "-236",
                "text": "Workflow Release Status"
            }, {
                "value": "-235",
                "text": "Workflow Trigger Type"
            }, {
                "value": "-196",
                "text": "Workplace"
            }
        ];
        
        var _rec_types_2_0 = [
            {
                "id": "account",
                "value": UI_REC_TYPE + "ACCOUNT",
                "text": "Account"
            }, {
                "id": "accountingbook",
                "value": UI_REC_TYPE + "ACCOUNTING_BOOK",
                "text": "Accounting Book"
            }, {
                "id": "accountingcontext",
                "value": UI_REC_TYPE + "ACCOUNTING_CONTEXT",
                "text": "Accounting Context"
            }, {
                "id": "accountingperiod",
                "value": UI_REC_TYPE + "ACCOUNTING_PERIOD",
                "text": "Accounting Period"
            }, {
                "id": "advintercompanyjournalentry",
                "value": UI_REC_TYPE + "ADV_INTER_COMPANY_JOURNAL_ENTRY",
                "text": "Advanced Intercompany Journal Entry"
            }, {
                "id": "allocationschedule",
                "value": UI_REC_TYPE + "ALLOCATION_SCHEDULE",
                "text": "Allocation Schedule"
            }, {
                "id": "amortizationschedule",
                "value": UI_REC_TYPE + "AMORTIZATION_SCHEDULE",
                "text": "Amortization Schedule"
            }, {
                "id": "amortizationtemplate",
                "value": UI_REC_TYPE + "AMORTIZATION_TEMPLATE",
                "text": "Amortization Schedule"
            }, {
                "id": "assemblybuild",
                "value": UI_REC_TYPE + "ASSEMBLY_BUILD",
                "text": "Assembly Build"
            }, {
                "id": "assemblyunbuild",
                "value": UI_REC_TYPE + "ASSEMBLY_UNBUILD",
                "text": "Assembly Unbuild"
            }, {
                "id": "billingschedule",
                "value": UI_REC_TYPE + "BILLING_SCHEDULE",
                "text": "Billing Schedule"
            }, {
                "id": "bom",
                "value": UI_REC_TYPE + "BOM",
                "text": "Bill of Materials"
            }, {
                "id": "bin",
                "value": UI_REC_TYPE + "BIN",
                "text": "Bin"
            }, {
                "id": "bintransfer",
                "value": UI_REC_TYPE + "BIN_TRANSFER",
                "text": "Bin Transfer"
            }, {
                "id": "binworksheet",
                "value": UI_REC_TYPE + "BIN_WORKSHEET",
                "text": "Bin Worksheet"
            }, {
                "id": "campaign",
                "value": UI_REC_TYPE + "CAMPAIGN",
                "text": "Campaign"
            }, {
                "id": "supportcase",
                "value": UI_REC_TYPE + "SUPPORT_CASE",
                "text": "Case"
            }, {
                "id": "cashrefund",
                "value": UI_REC_TYPE + "CASH_REFUND",
                "text": "Cash Refund"
            }, {
                "id": "cashsale",
                "value": UI_REC_TYPE + "CASH_SALE",
                "text": "Cash Sale"
            }, {
                "id": "charge",
                "value": UI_REC_TYPE + "CHARGE",
                "text": "Charge"
            }, {
                "id": "check",
                "value": UI_REC_TYPE + "CHECK",
                "text": "Check"
            }, {
                "id": "classification",
                "value": UI_REC_TYPE + "CLASSIFICATION",
                "text": "Class"
            }, {
                "id": "contact",
                "value": UI_REC_TYPE + "CONTACT",
                "text": "Contact"
            }, {
                "id": "creditmemo",
                "value": UI_REC_TYPE + "CREDIT_MEMO",
                "text": "Credit Memo"
            }, {
                "id": "currency",
                "value": UI_REC_TYPE + "CURRENCY",
                "text": "Currency"
            }, {
                "id": "customer",
                "value": UI_REC_TYPE + "CUSTOMER",
                "text": "Customer"
            }, {
                "id": "customercategory",
                "value": UI_REC_TYPE + "CUSTOMER_CATEGORY",
                "text": "Customer Category"
            }, {
                "id": "customerdeposit",
                "value": UI_REC_TYPE + "CUSTOMER_DEPOSIT",
                "text": "Customer Deposit"
            }, {
                "id": "customerpayment",
                "value": UI_REC_TYPE + "CUSTOMER_PAYMENT",
                "text": "Customer Payment"
            }, {
                "id": "customerrefund",
                "value": UI_REC_TYPE + "CUSTOMER_REFUND",
                "text": "Customer Refund"
            }, {
                "id": "customerstatus",
                "value": UI_REC_TYPE + "CUSTOMER_STATUS",
                "text": "Customer Status"
            }, {
                "id": "department",
                "value": UI_REC_TYPE + "DEPARTMENT",
                "text": "Department"
            }, {
                "id": "deposit",
                "value": UI_REC_TYPE + "DEPOSIT",
                "text": "Deposit"
            }, {
                "id": "depositapplication",
                "value": UI_REC_TYPE + "DEPOSIT_APPLICATION",
                "text": "Deposit Application"
            }, {
                "id": "employee",
                "value": UI_REC_TYPE + "EMPLOYEE",
                "text": "Employee"
            }, {
                "id": "estimate",
                "value": UI_REC_TYPE + "ESTIMATE",
                "text": "Estimate"
            }, {
                "id": "calendarevent",
                "value": UI_REC_TYPE + "CALENDAR_EVENT",
                "text": "Event"
            }, {
                "id": "expensereport",
                "value": UI_REC_TYPE + "EXPENSE_REPORT",
                "text": "Expense Report"
            }
        ];
        
        function _getRecordTypes(version) {
            switch(version) {
                case '1.0': {
                    return _rec_types;
                    break;
                }
                case '2.0': {
                    return _rec_types_2_0;
                    break;
                }
            }
        }
        
        return {
            FIELD_TYPES: _fld_types,
            RECORD_TYPES: _getRecordTypes
        }
    }
);
        

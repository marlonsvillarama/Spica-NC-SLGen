/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 * 
 * Appficiency Copyright 2020
 * 
 * Description: Generates custom PDF layout depending on PDF template assigned to CI record.
 * 
 * Script Name : Appf-Create Client CI Validations CL
 * Script Type : Client
 * Description : 
 * Company     : Appficiency Inc.
 * Author      : marlon
 * Date        : Nov 19, 2020
 */

define(
    [
        'N/currentRecord',
        'N/log',
        'N/search'
    ],
    
    function (
        CR,
        LOG,
        SEARCH
    ) {
        var APP = 'lrnl';
        var PREFIX = 'custpage_' + APP + '_ui_';
        var FORM_CONFIG = {
            GROUPS: {
                SL_MAIN: PREFIX + 'grpmain'
            },
            FIELDS: {
                SL_TYPE: PREFIX + 'sltype'
            },
            BUTTONS: {
                SAVE: PREFIX + 'btnsave'
            }
        };
        
        function fieldChanged(ctx) {
            var cr = ctx.currentRecord;
            
            if (ctx.fieldId == FORM_CONFIG.FIELDS.SL_TYPE) {
                alert(FORM_CONFIG.FIELDS.SL_TYPE + ' = ' + cr.getValue({ fieldId: FORM_CONFIG.FIELDS.SL_TYPE }));
            }
        }
        
        function forImplem() {
            alert('TO be implemented...');
        }
        
        function submitForm() {
            
        }
        
        return {
            fieldChanged: fieldChanged,
            forImplem: forImplem,
            
            submitForm: submitForm
        };
    }
);
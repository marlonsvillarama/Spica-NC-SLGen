/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 *
 * Appficiency Copyright 2020
 *
 * Description: Generates custom PDF layout depending on PDF template assigned to CI record.
 *
 * Author: roach
 * Date: Aug 03, 2020
 */

 define(
    [
        'N/file',
        'N/log',
        'N/record',
        'N/runtime',
        'N/search',
        'N/ui/serverWidget',
        'N/url',
        
        './Assets/nc-types.js'
    ],

    function(
        FILE,
        LOG,
        RECORD,
        RUNTIME,
        SEARCH,
        UI,
        URL,
        
        TYPES
    ) {
        var APP = '_nc_';
        var PREF = {
            CUSREC: 'customrecord',
            CUSRECFLD: 'custrecord',
            SCRIPT: 'customscript',
            DEPLOY: 'customdeploy',
            PAGE: 'custpage',
            
            CONF: {
                RECORD: APP + 'conf_',
                HTML: 'html',
                CSS: 'css',
                JS: 'js'
            },
            UI: {
                RECORD: APP + 'sl_ui_',
                NAME: 'name',
                CONTENT: 'content',
                SCRIPT: 'scr',
                DEPLOY: 'dep'
            }
        };
        /* var APP = {
            UI: {
                RECORD: 'sl_ui'
            }
        }; */
        // var PREFIX = 'custpage_' + APP + '_ui_';
        var FORM_CONFIG = {
            GROUPS: {
                SL_MAIN: PREF.PAGE + APP + 'grpmain'
            },
            FIELDS: {
                SL_TYPE: PREF.PAGE + APP + 'sltype',
                LAYOUT_HTML: PREF.CUSRECFLD + APP + 'conf_html',
                LAYOUT_CSS: PREF.CUSRECFLD + APP + 'conf_css',
                LAYOUT_JS: PREF.CUSRECFLD + APP + 'conf_js'
            },
            BUTTONS: {
                SAVE: PREF.PAGE + APP + 'btnsave'
            }
        };
        var APP_FOLDER = 'SuiteScripts/nc/';
        var ASSETS_FOLDER = APP_FOLDER + 'Assets/';
        var CLIENT_SCRIPT = APP_FOLDER + 'nc-cs-ui-dev.js';
        var BACKEND_RL = {
            SCRIPT: PREF.SCRIPT + APP + 'rl',
            DEPLOY: PREF.DEPLOY + APP + 'rl'
        }
        
        /**
         */
        function buildSLForm(form, params) {
            var LOG_TITLE = 'buildSLForm';
            LOG.debug({ title: LOG_TITLE, details: '*** START ***' });
            LOG.debug({ title: LOG_TITLE, details: '*** END ***' });
        }
        
        /**
         */
        function buildSLList(form, params) {
            var LOG_TITLE = 'buildSLList';
            LOG.debug({ title: LOG_TITLE, details: '*** START ***' });
            LOG.debug({ title: LOG_TITLE, details: '*** END ***' });
        }
        
        function getFileContents(fileId) {
            var LOG_TITLE = 'getFileContents';
            LOG.debug({ title: LOG_TITLE, details: '*** START ***' });
            
            var str = '';
            try {
                LOG.debug({ title: LOG_TITLE, details: 'fileId = ' + fileId });
                var file = FILE.load({ id: fileId });
                if (file) {
                    str = file.getContents();
                }
            }
            catch (ex) {
                var msg = 'Unable to load file : ' + fileId;
                LOG.error ({ title: LOG_TITLE, details: msg });
                return 'ERR: ' + msg;
            }
            
            LOG.debug({ title: LOG_TITLE, details: '*** END ***' });
            return str;
        }
        
        function resolveUrls() {
            var LOG_TITLE = 'resolveUrls';
            LOG.debug({ title: LOG_TITLE, details: '*** START ***' });
            
            var obj = {};
            obj.backend = URL.resolveScript({
                scriptId: BACKEND_RL.SCRIPT,
                deploymentId: BACKEND_RL.DEPLOY,
            });
            obj.script = '/app/common/scripting/script.nl';
            obj.deploy = '/app/common/scripting/scriptrecord.nl';
            
            LOG.debug({ title: LOG_TITLE, details: '*** END ***' });
            return obj;
        }
        
        function buildHtmlLayout() {
            var LOG_TITLE = 'buildHtmlLayout';
            LOG.debug({ title: LOG_TITLE, details: '*** START ***' });
            
            var str = '';
            var rtype = 'customrecord_nc_conf';
            var rid = '1';
            var config;
            
            try {
                config = RECORD.load({
                    type: rtype,
                    id: rid
                });
            }
            catch (ex) {
                var msg = 'Unable to load CONFIG record : ' + rid;
                LOG.error ({ title: LOG_TITLE, details: msg });
                return 'ERR: ' + msg;
            }
            
            LOG.debug({ title: LOG_TITLE, details: JSON.stringify(FORM_CONFIG.FIELDS.LAYOUT_HTML) });
            //var strHTML = getFileContents(config.getValue({ fieldId: FORM_CONFIG.FIELDS.LAYOUT_HTML }));
            var strHTML = getFileContents(config.getValue({ fieldId: 'custrecord_nc_conf_html' }));
            if (strHTML.indexOf('ERR') >= 0) {
                return str;
            }
            
            //var strCSS = getFileContents(config.getValue({ fieldId: FORM_CONFIG.FIELDS.LAYOUT_CSS }));
            var strCSS = getFileContents(config.getValue({ fieldId: 'custrecord_nc_conf_css' }));
            if (strCSS.indexOf('ERR') >= 0) {
                return str;
            }
            strHTML = strHTML.replace('{{__styles__}}', strCSS);
            
            //var strJS = getFileContents(config.getValue({ fieldId: FORM_CONFIG.FIELDS.LAYOUT_JS }));
            var strJS = getFileContents(config.getValue({ fieldId: 'custrecord_nc_conf_js' }));
            if (strJS.indexOf('ERR') >= 0) {
                return str;
            }
            strHTML = strHTML.replace('{{__scripts__}}', strJS);
            
            var globals = {
                url: resolveUrls(),
                user: RUNTIME.getCurrentUser().id,
                fieldTypes: TYPES.FIELD_TYPES,
                recTypes: TYPES.RECORD_TYPES('2.0'),
            };
            strHTML = strHTML.replace('{{__globals__}}', JSON.stringify(globals));
            
            str = strHTML;
            LOG.debug({ title: LOG_TITLE, details: '*** END ***' });
            return str;
        }
        
        /**
         */
        function buildMainUI(form, params) {
            var LOG_TITLE = 'buildMainUI';
            LOG.debug({ title: LOG_TITLE, details: '*** START ***' });
            
            var grp, fld;
            
            fld = form.addField({
                id: FORM_CONFIG.FIELDS.SL_TYPE,
                type: UI.FieldType.INLINEHTML,
                label: 'Canvas'
            });
            fld.defaultValue = buildHtmlLayout();
            
            if (params.type) {
                switch(params.type.toLowerCase()) {
                    case 'form': {
                        buildSLForm(form, params);
                        break;
                    }
                    case 'list': {
                        buildSLList(form, params);
                        break;
                    }
                    default: break;
                }
            }
            
            LOG.debug({ title: LOG_TITLE, details: '*** END ***' });
        }
        
        /**
        * Definition of the Suitelet script trigger point.
        *
        * @param {Object} context
        * @param {ServerRequest} context.request - Encapsulation of the incoming request
        * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
        * @Since 2015.2
        */
        function onRequest(params) {
            var LOG_TITLE = 'onRequest';
            LOG.debug({ title: LOG_TITLE, details: '*** START ***' });
            
            var script = RUNTIME.getCurrentScript();         
            var req = params.request;
            var form = UI.createForm({ title: 'Larnell' });
            form.clientScriptModulePath = CLIENT_SCRIPT;
           
            buildMainUI(form, req.parameters);
            params.response.writePage(form);
            
            LOG.debug({ title: LOG_TITLE, details: '*** END ***' });
        }
        
        return {
            onRequest: onRequest
        };
    }
);

/**
 * @NApiVersion 2.x
 * @NScriptType Restlet
 * @NModuleScope SameAccount
 */

 define(
    [
        'N/file',
        'N/https',
        'N/log',
        'N/record',
        'N/runtime',
        'N/search',
        'N/url',
        
        './nc-rl-lib-parser-dev.js'
    ],

    function(
        FILE,
        HTTPS,
        LOG,
        RECORD,
        RUNTIME,
        SEARCH,
        URL,
        
        PARSER
    ) {
        var APP = '';
        var APP = '_nc_sl_';
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
        // var PREFIX = 'custpage_' + APP + '_ui_';
        /* var FORM_CONFIG = {
            GROUPS: {
                SL_MAIN: PREFIX + 'grpmain'
            },
            FIELDS: {
                SL_TYPE: PREFIX + 'sltype',
                LAYOUT_HTML: 'custrecord_nc_conf_layout',
                LAYOUT_CSS: 'custrecord_nc_conf_css',
                LAYOUT_JS: 'custrecord_nc_conf_js'
            },
            BUTTONS: {
                SAVE: PREFIX + 'btnsave'
            }
        }; */
        var APP_FOLDER = 'SuiteScripts/nc/';
        var ASSETS_FOLDER = APP_FOLDER + 'Assets/';
        // var OUTPUT_FOLDER = APP_FOLDER + 'Output/';
        var URLS = {
            SCRIPT_POST: '/app/common/scripting/script.nl'
        };
        
        /* var CLIENT_SCRIPT = APP_FOLDER + 'cs-gen-ui-dev.js';
        var SRC_FILES = {
            UI: {
                HTML: ASSETS_FOLDER + 'gen-ui-layout.html',
                CSS: ASSETS_FOLDER + 'gen-ui-layout.css',
                JS: ASSETS_FOLDER + 'gen-ui-layout.js'
            }
        }; */
        var RECORDS = {
            SL: {
                TYPE: 'customrecord_nc_sl_ui',
                FIELDS: {
                    /*FORM: 'custrecord_lrnl_sl_frm',
                    LIST: 'custrecord_lrnl_sl_list',
                    SCRIPT: 'custrecord_lrnl_sl_scr',
                    DEPLOYMENT: 'custrecord_lrnl_sl_dep'*/
                    NAME: 'custrecord_nc_sl_ui_name',
                    CONTENT: 'custrecord_nc_sl_ui_content',
                    SCRIPT: 'custrecord_nc_sl_ui_scr',
                    DEPLOYMENT: 'custrecord_nc_sl_ui_dep'
                }
            },
            SUITELET: {
                TYPE: 'suitelet',
                DEF_ID: 517
            },
            DEPLOYMENT: {
                TYPE: 'scriptdeployment',
                DEF_ID: 1,
                FIELDS: {
                    URL: 'url'
                }
            }
        };
        var TEMPLATES = {
            SUITELET: ASSETS_FOLDER + 'temp-sl.txt',
            UI_FORM: ASSETS_FOLDER + 'temp-sl-form.txt',
            UI_LIST: ASSETS_FOLDER + 'temp-sl-list.txt'
        };
        /* var FN_NAMES = {
            BUILD_FORM: {
                NAME: 'buildForm({{__parms__}})',
                PARAMS: [
                    'frm',
                    'context'
                ]
            },
            BUILD_LIST: {
                NAME: 'buildList({{__parms__}})',
                PARAMS: [
                    ''
                ]
            }
        }; */
        
        /**
         */
        /* function buildSLForm(form, params) {
            var LOG_TITLE = 'buildSLForm';
            LOG.debug({ title: LOG_TITLE, details: '*** START ***' });
            LOG.debug({ title: LOG_TITLE, details: '*** END ***' });
        } */
        
        /**
         */
        /* function buildSLList(form, params) {
            var LOG_TITLE = 'buildSLList';
            LOG.debug({ title: LOG_TITLE, details: '*** START ***' });
            LOG.debug({ title: LOG_TITLE, details: '*** END ***' });
        } */
        
        /**
         */
        /* function getFileContents(fileId) {
            var LOG_TITLE = 'getFileContents';
            LOG.debug({ title: LOG_TITLE, details: '*** START ***' });
            
            var str = '';
            try {
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
        } */
        
        /**
         */
        /* function buildHtmlLayout() {
            var LOG_TITLE = 'buildHtmlLayout';
            LOG.debug({ title: LOG_TITLE, details: '*** START ***' });
            
            var str = '';
            var rtype = 'customrecord_lrnl_gen_conf';
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
            
            var strHTML = getFileContents(config.getValue({ fieldId: FORM_CONFIG.FIELDS.LAYOUT_HTML }));
            if (strHTML.indexOf('ERR') >= 0) {
                return str;
            }
            
            var strCSS = getFileContents(config.getValue({ fieldId: FORM_CONFIG.FIELDS.LAYOUT_CSS }));
            if (strCSS.indexOf('ERR') >= 0) {
                return str;
            }
            
            var strJS = getFileContents(config.getValue({ fieldId: FORM_CONFIG.FIELDS.LAYOUT_JS }));
            if (strJS.indexOf('ERR') >= 0) {
                return str;
            }
            
            str = strHTML.replace('{{styles}}', strCSS).replace('{{scripts}}', strJS);
            
            LOG.debug({ title: LOG_TITLE, details: '*** END ***' });
            return str;
        } */
        
        /**
         */
        function readFile(fileId) {
            var LOG_TITLE = 'readFile';
            LOG.debug({ title: LOG_TITLE, details: '*** START ***' });
            
            var str = '';
            LOG.debug({ title: LOG_TITLE, details: 'fileId = ' + fileId });
            
            try {
                var file = FILE.load({ id: fileId });
                str = file.getContents();
            }
            catch (ex) {
                var msg = 'Unable to read file : ' + fileId;
                LOG.error ({ title: LOG_TITLE, details: msg });
                return { error: 'ERR: ' + msg }
            }
            
            LOG.debug({ title: LOG_TITLE, details: '*** END ***' });
            return { content: str };
        }
        
        /**
         * 1. Parse input
         * 2. If r
         */
        function saveContent(params) {
            var LOG_TITLE = 'saveContent';
            LOG.debug({ title: LOG_TITLE, details: '*** START ***' });
            
            var str = '';
            // var objContent = JSON.parse(params.content);
            var objContent = params.content;
            var idFile = params.file;
            var idScript = params.script;
            LOG.debug({ title: LOG_TITLE + ' content', details: objContent });
            LOG.debug({ title: LOG_TITLE + ' idFile', details: idFile });
            // LOG.debug({ title: LOG_TITLE + ' content type', details: Object.prototype.toString.call(objContent) });
            
            /* var objConfig = JSON.parse(params.config);
            LOG.debug({ title: LOG_TITLE + ' config', details: objConfig });
            LOG.debug({ title: LOG_TITLE, details: 'record id = ' + objConfig.id });
            LOG.debug({ title: LOG_TITLE + ' config type', details: Object.prototype.toString.call(objConfig) }); */
            
            // var rid = 0;
            var rec = null;
            var obj = {};
            try {
                if (objContent.id) {
                    var objSL = {
                        
                    }
                    RECORD.submitFields({
                        type: RECORDS.SL.TYPE,
                        id: objContent.id,
                        values: {
                            'custrecord_nc_sl_ui_name': objContent.name ? objContent.name : 'Suitelet_' + (new Date()).getTime().toString(),
                            'custrecord_nc_sl_ui_content': (objContent.form ? JSON.stringify(objContent.form) : '')
                            // 'custrecord_lrnl_sl_lst': (objContent.list ? JSON.stringify(objContent.list) : '')
                        }
                    });
                    // rid = objContent.id;
                    // str = rid;
                    obj.id = objContent.id;
                }
                else {
                    rec = RECORD.create({
                        type: RECORDS.SL.TYPE
                    });
                    LOG.debug({ title: LOG_TITLE + ' saving name', details: objContent.name });
                    rec.setValue({
                        fieldId: RECORDS.SL.FIELDS.NAME,
                        value: objContent.name
                    });
                    
                    if (objContent.form) {
                        LOG.debug({ title: LOG_TITLE + ' saving ' + RECORDS.SL.FIELDS.FORM, details: objContent.form });
                        rec.setValue({
                            fieldId: RECORDS.SL.FIELDS.CONTENT,
                            value: JSON.stringify(objContent.form)
                        });
                    }
                    /*NAME: 'custrecord_nc_sl_ui_name',
                    CONTENT: 'custrecord_nc_sl_ui_content',
                    SCRIPT: 'custrecord_nc_sl_ui_scr',
                    DEPLOYMENT: 'custrecord_nc_sl_ui_dep'
                    */
                    /*if (objContent.list) {
                        LOG.debug({ title: LOG_TITLE + ' saving ' + RECORDS.SL.FIELDS.LIST, details: objContent.list });
                        rec.setValue({
                            fieldId: RECORDS.SL.FIELDS.LIST,
                            value: JSON.stringify(objContent.list)
                        });
                    }*/
                    
                    obj.id = rec.save();
                    LOG.debug({ title: LOG_TITLE, details: 'new id = ' + obj.id });
                    
                    // params.config = JSON.stringify(objConfig);
                }
                
                // Generate suitelet code from JSON
                var dtNow = new Date();
                // var idNow = dtNow.getTime().toString();
                var objSL = parseSuitelet(objContent, dtNow);
                
                //Load template file and replace all placeholders
                var fTemp = FILE.load({ id: TEMPLATES.SUITELET });
                var fTempContent = fTemp.getContents();
                str = fTempContent;
                str = str.replace('{{__datenow__}}', dtNow.toString());
                // str = str.replace('{{__moduleList__}}', JSON.stringify(objSL.moduleList));
                // str = str.replace('{{__moduleAlias__}}', JSON.stringify(objSL.moduleAlias));
                LOG.debug({ title: LOG_TITLE + ' formContent', details: objSL.formContent });
                str = str.replace('{{__formContent__}}', objSL.formContent);
                LOG.debug({ title: LOG_TITLE + ' listContent', details: objSL.listContent });
                str = str.replace('{{__listContent__}}', objSL.listContent);
                LOG.debug({ title: LOG_TITLE + ' entryLines', details: objSL.entryLines.join(';') });
                str = str.replace('{{__entryLines__}}', objSL.entryLines.join(';'));
                
                var fOutput = '';
                var fId = '';
                // if (objContent.file) {
                    // fOutput = FILE.load({
                        // id: objContent.file.id
                    // });
                // }
                // else {
                    var dtNowTime = dtNow.getTime().toString();
                    var slName = 'SL_' + dtNowTime;
                    fOutput = FILE.create({
                        name: slName + '.js',
                        fileType: FILE.Type.JAVASCRIPT,
                        contents: str,
                        folder: 1215,
                        description: 'Auto-generated Suitelet'
                    });
                    fId = fOutput.save();
                    obj.file = {
                        id: fId,
                        name: dtNowTime
                    };
                // }
                LOG.debug({ title: LOG_TITLE + ' output file', details: fId });
                
                // If the script record is specified, we replace its script file and delete the old file.
                if (idScript) {
                    var slLookup = SEARCH.lookupFields({
                        type: 'suitelet',
                        id: idScript,
                        columns: [ 'scriptfile' ]
                    });
                    LOG.debug({ title: LOG_TITLE, details: JSON.stringify(slLookup) });
                    // RECORD.submitFields({
                    //     type: 'suitelet',
                    //     id: idScript,
                    //     values: {
                    //         scriptfile: fId
                    //     }
                    // });
                }
            }
            catch (ex) {
                var msg = 'Unable to save content: ' + ex.toString();
                LOG.error ({ title: LOG_TITLE, details: msg });
                obj.error = 'ERR: ' + msg;
            }
            // str = rid;
            
            // if (objConfig) {
                // if (objConfig.build == true) {
                    // // str = buildScript(str);
                    // buildScript(obj, params);
                // }
                
                // if (objConfig.deploy == true) {
                    // // str = deployScript(str);
                    // deployScript(params);
                // }
            // }
            
            LOG.debug({ title: LOG_TITLE, details: '*** END ***' });
            return obj;
        }
        
        function writeFields(flds, column) {
            var LOG_TITLE = 'writeFields';
            LOG.debug({ title: LOG_TITLE, details: '*** START ***' });
            LOG.debug({ title: LOG_TITLE + ' flds', details: JSON.stringify(flds) });

            var str = '';
            var colFlds = [];
            colFlds = flds.filter(function (x) {
                return x.col == column;
            });
            LOG.debug({ title: LOG_TITLE + ' colFlds.length = ' + colFlds.length, details: JSON.stringify(colFlds) });

            for (var i=0, n=colFlds.length; i<n; i++) {
                LOG.debug({ title: LOG_TITLE + ', i = ' + i, details: JSON.stringify(colFlds[i]) });
                str += PARSER.addField({ fld: colFlds[i], newColumn: (i == 0 && column == 2) });
                LOG.debug({ title: LOG_TITLE, details: 'i after writing field = ' + i });
            }

            LOG.debug({ title: LOG_TITLE, details: '*** END ***' });
            return str;
        }
        /**
         */
        // function parseForm(idFrm, params, name) {
        function parseForm(params, name) {
            var LOG_TITLE = 'parseForm';
            LOG.debug({ title: LOG_TITLE, details: '*** START ***' });
            
            var str = '';
            var i, n;
            
            // str += 'var ' + idFrm + ' = UI.createForm({ name: "' + name + '" });';
            
            if (params.btns) {
                for (i=0, n=params.btns.length; i<n; i++) {
                    str += PARSER.addButton(params.btns[i]);
                }
            }
            
            if (params.grps) {
                for (i=0, n=params.grps.length; i<n; i++) {
                    str += PARSER.addGroup(params.grps[i]);
                }
            }
            
            if (params.flds) {
                str += writeFields(params.flds, 1);
                str += writeFields(params.flds, 2);
                /* var colFlds = [];
                colFlds = params.flds.filter(function (x) {
                    return x.col == 1;
                });
                for (i=0, n=colFlds.length; i<n; i++) {
                    str += PARSER.addField({ fld: colFlds[i], index: i });
                }

                colFlds = params.flds.filter(function (x) {
                    return x.col == 2;
                });
                for (i=0, n=colFlds.length; i<n; i++) {
                    str += PARSER.addField({ fld: colFlds[i], index: i });
                } */
            }
            
            LOG.debug({ title: LOG_TITLE + ' str', details: str });
            LOG.debug({ title: LOG_TITLE, details: '*** END ***' });
            return str;
        }

        /**
         */
        function parseList(idFrm, params) {
            var LOG_TITLE = 'parseList';
            LOG.debug({ title: LOG_TITLE, details: '*** START ***' });
            
            var str = '';
            
            LOG.debug({ title: LOG_TITLE, details: '*** END ***' });
            return str;
        }
        
        /**
         */
        function parseSuitelet(objContent, dt) {
            var LOG_TITLE = 'parseSuitelet';
            LOG.debug({ title: LOG_TITLE, details: '*** START ***' });
            
            var fname = objContent.name;
            var form = objContent.form;
            var list = objContent.list;
            // var form = objContent[RECORDS.SL.FIELDS.FORM];
            // var list = objContent[RECORDS.SL.FIELDS.LIST];
            // var scr = objContent[RECORDS.SL.FIELDS.SCRIPT];
            
            var obj = {
                formContent: '',
                listContent: '',
                entryLines: []
            };
            
            var str = '';
            // var idFrm = PARSER.genFormId(true);
            var idFrm = 'frm_' + dt.getTime().toString();
            LOG.debug({ title: LOG_TITLE, details: 'idFrm = ' + idFrm });
            
            var fTemp, fContent;
            if (form || list) {
                obj.entryLines.push('var ' + idFrm + ' = UI.createForm({ title: "' + fname + '" })');
                
                if (form) {
                    fTemp = FILE.load({ id: TEMPLATES.UI_FORM });
                    fContent = fTemp.getContents();
                    obj.formContent = fContent.replace('{{__content__}}', parseForm(form, fname));
                    obj.entryLines.push('buildForm(' + idFrm + ', params)');
                }
                
                if (list) {
                    fTemp = FILE.load({ id: TEMPLATES.UI_LIST });
                    fContent = fTemp.getContents();
                    obj.listContent = fContent.replace('{{__content__}}', parseList(list));
                    obj.entryLines.push('buildList(' + idFrm + ', params)');
                }
                
                obj.entryLines.push('params.response.writePage(' + idFrm + ');');
            }
            
            LOG.debug({ title: LOG_TITLE, details: '*** END ***' });
            return obj;
        }
        
        /**
         */
        // function createScript(params) {
        // }
        
        /**
         */
        function buildScript(params) {
            var LOG_TITLE = 'buildScript';
            LOG.debug({ title: LOG_TITLE, details: '*** START ***' });
            
            var str = '';
            // var objConfig = JSON.parse(params.config);
            // var objConfig = params.config;
            LOG.debug({ title: LOG_TITLE, details: 'recId = ' + obj.id });
            
            if (!obj.id) {
                var msg = 'Missing object ID. Exiting...';
                LOG.debug({ title: LOG_TITLE, details: msg });
                obj.error = msg;
                return;
            }
            
            // Get details from SL record
            var rec = null;
            rec = SEARCH.lookupFields({
                type: RECORDS.SL.TYPE,
                id: obj.id,
                columns: [
                    'name',
                    RECORDS.SL.FIELDS.FORM,
                    RECORDS.SL.FIELDS.LIST,
                    RECORDS.SL.FIELDS.SCRIPT,
                    RECORDS.SL.FIELDS.DEPLOYMENT
                ]
            });
            LOG.debug({ title: LOG_TITLE + ' rec', details: JSON.stringify(rec) });
            
            // // Generate suitelet code from JSON
            // var dtNow = new Date();
            // // var idNow = dtNow.getTime().toString();
            // var objSL = parseSuitelet(rec, dtNow);
            
            // //Load template file and replace all placeholders
            // var fTemp = FILE.load({ id: TEMPLATES.SUITELET });
            // var fTempContent = fTemp.getContents();
            // str = fTempContent;
            // str = str.replace('{{__datenow__}}', dtNow.toString());
            // // str = str.replace('{{__moduleList__}}', JSON.stringify(objSL.moduleList));
            // // str = str.replace('{{__moduleAlias__}}', JSON.stringify(objSL.moduleAlias));
            // LOG.debug({ title: LOG_TITLE + ' formContent', details: objSL.formContent });
            // str = str.replace('{{__formContent__}}', objSL.formContent);
            // LOG.debug({ title: LOG_TITLE + ' listContent', details: objSL.listContent });
            // str = str.replace('{{__listContent__}}', objSL.listContent);
            // LOG.debug({ title: LOG_TITLE + ' entryLines', details: objSL.entryLines.join(';') });
            // str = str.replace('{{__entryLines__}}', objSL.entryLines.join(';'));
            
            // var slName = 'SL_' + dtNow.getTime().toString();
            // var fOutput = FILE.create({
                // name: slName + '.js',
                // fileType: FILE.Type.JAVASCRIPT,
                // contents: str,
                // folder: 1215,
                // description: 'Auto-generated Suitelet'
            // });
            // var fId = fOutput.save();
            // LOG.debug({ title: LOG_TITLE + ' output file', details: fId });
            
            // Create/load suitelet record
            var recScr = null;
            if (rec[RECORDS.SL.FIELDS.SCRIPT].length > 0) {
                // LOG.debug({ title: LOG_TITLE, details: 'Working on script record... id = ' + rec[RECORDS.SL.FIELDS.SCRIPT][0].value });
                LOG.debug({ title: LOG_TITLE, details: 'Working on script record... id = ' + RECORDS.SUITELET.DEF_ID });
                
                
                
                // recScr = RECORD.load({
                    // type: RECORDS.SUITELET.TYPE,
                    // // id: rec[RECORDS.SL.FIELDS.SCRIPT][0].value
                    // id: RECORDS.SUITELET.DEF_ID
                // });
            }
            else {
                var scrName = '[AUTO] ' + slName;
                var urlDomain = URL.resolveDomain({
                    hostType:  URL.HostType.APPLICATION,
                    accountId: RUNTIME.accountId
                });
                LOG.debug({ title: LOG_TITLE + ' domain', details: urlDomain });
                
                var scrData = {
                    'submitter': 'Save',
                    'scripttype': 'SCRIPTLET',
                    'name': scrName,
                    'scriptid': '_' + slName.toLowerCase(),
                    'apiversion': '2.0',
                    'description': 'Auto-generated Suitelet on ' + dtNow.toString(),
                    'owner': RUNTIME.getCurrentUser().id,
                    'type': 'script',
                    'id': '',
                    'scriptfile': fId
                };
                var scrRes = HTTPS.post({
                    url: 'https://' + urlDomain + URLS.SCRIPT_POST,
                    body: scrData
                });
                
                var scrResH = scrRes.headers;
                var scrResC = scrRes.code;
                var scrResB = scrRes.body;
                LOG.debug({ title: LOG_TITLE + ' code', details: scrResC });
                LOG.debug({ title: LOG_TITLE + ' body', details: scrResB });
                
                for (var x in scrResH) {
                    if (scrResH.hasOwnProperty(x)) {
                        LOG.debug({ title: LOG_TITLE + ' ' + x, details: scrResH[x] });
                    }
                }
                // LOG.debug({ title: LOG_TITLE, details: 'Creating new ' + RECORDS.DEPLOYMENT.TYPE + ' record' });
                // recScr = RECORD.create({
                    // type: RECORDS.DEPLOYMENT.TYPE
                // });
            }
            // recScr.setValue({ fieldId: 'name', value: slName });
            // recScr.setValue({ fieldId: 'scriptid', value: 'customscript_' + slName.toLowerCase() });
            // recScr.setValue({ fieldId: 'description', value: 'Auto Generated Suitelet on ' + dtNow.toString() });
            // recScr.setValue({ fieldId: 'scripttype', value: 'SCRIPTLET' });
            // recScr.setValue({ fieldId: 'scriptfile', value: fId });
            // var idSL = recScr.save();
            // LOG.debug({ title: LOG_TITLE, details: 'idSL = ' + idSL });
            
            // Deploy script
            // LOG.debug({ title: LOG_TITLE, details: 'Working on deployment... id = ' + RECORDS.DEPLOYMENT.DEF_ID });
            // var recDep = null;
            /* if (rec[RECORDS.SL.FIELDS.DEPLOYMENT].length > 0) {
                recDep = RECORD.load({
                    type: RECORDS.DEPLOYMENT.TYPE,
                    // id: rec[RECORDS.SL.FIELDS.DEPLOYMENT][0].value
                    id: RECORDS.DEPLOYMENT.DEF_ID
                });
            }
            else {
                recDep = RECORD.create({
                    type: RECORDS.DEPLOYMENT.TYPE
                });
            } */
            /* // recDep.setValue({ fieldId: 'name', value: slName });
            // recDep.setValue({ fieldId: 'scriptid', value: 'customdeploy_' + slName.toLowerCase() });
            // recDep.setValue({ fieldId: 'script', value: idSL });
            // recDep.setValue({ fieldId: 'description', value: 'Auto Generated Suitelet Deployment on ' + dtNow.toString() });
            // recDep.setValue({ fieldId: 'status', value: 'TESTING' });
            // var idDep = recDep.save();
            
            // recDep = SEARCH.lookupFields({
                // type: RECORDS.DEPLOYMENT.TYPE,
                // id: RECORDS.DEPLOYMENT.DEF_ID,
                // columns: [
                    // 'url'
                // ]
            // }); */
            // url = URL.resolveScript({
                // scriptId: RECORDS.SUITELET.DEF_ID,
                // deploymentId: RECORDS.DEPLOYMENT.DEF_ID
            // });
                
            // LOG.debug({ title: LOG_TITLE + ' recDep', details: JSON.stringify(recDep) });
            // str = recDep[RECORDS.DEPLOYMENT.FIELDS.URL];
            // LOG.debug({ title: LOG_TITLE, details: 'url = ' + url });
            // LOG.debug({ title: LOG_TITLE, details: 'obj = ' + JSON.stringify(obj) });
            // obj.url = url;
            
            LOG.debug({ title: LOG_TITLE, details: '*** END ***' });
            // return str;
        }
        
        /**
         */
        function deployScript(params) {
            var LOG_TITLE = 'deployScript';
            LOG.debug({ title: LOG_TITLE, details: '*** START ***' });
            
            var str = '';
            LOG.debug({ title: LOG_TITLE, details: 'recId = ' });
            
            var rec = null;
            
            LOG.debug({ title: LOG_TITLE, details: '*** END ***' });
            return str;
        }
        
        /**
        * Definition of the Suitelet script trigger point.
        *
        * @param {Object} context
        * @param {ServerRequest} context.request - Encapsulation of the incoming request
        * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
        * @Since 2015.2
        */
        function processPost(reqBody) {
            var LOG_TITLE = 'processPost';
            LOG.debug({ title: LOG_TITLE, details: '*** START ***' });
            
            var script = RUNTIME.getCurrentScript();
            LOG.debug({ title: LOG_TITLE, details: reqBody });
            
            if (!reqBody) {
                LOG.debug({ title: LOG_TITLE, details: 'Missing request body. Exiting...' });
                return;
            }
            
            var reqObj = reqBody;
            LOG.debug({ title: LOG_TITLE + ' reqObj', details: reqObj });
            var reqType = reqObj.type;
            
            if (!reqType) {
                return 'ERR: No type specified';
            }
            
            var obj = {};
            switch(reqType.toLowerCase()) {
                case 'readfile': {
                    if (reqObj.fileid) {
                        obj = readFile(reqObj.fileid);
                    }
                    break;
                }
                case 'save': {
                    if (reqObj.content) {
                        obj = saveContent(reqObj);
                    }
                    break;
                }
                case 'build': {
                    if (reqObj.content) {
                        obj = buildScript(reqObj);
                    }
                    break;
                }
                default: break;
            }
            
            LOG.debug({ title: LOG_TITLE, details: 'return obj = ' + JSON.stringify(obj) });
            LOG.debug({ title: LOG_TITLE, details: '*** END ***' });
            return obj;
        }
        
        return {
            post: processPost
        };
    }
);

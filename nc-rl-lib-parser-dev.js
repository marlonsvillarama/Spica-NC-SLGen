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
    [
        'N/file',
        'N/log',
        'N/record',
        'N/runtime',
        'N/search',
        
        './Assets/gen-types.js'
    ],

    function(
        FILE,
        LOG,
        RECORD,
        RUNTIME,
        SEARCH,
        
        CONSTANTS
    ) {
        var PREFIX = 'PARSER-LIB.';
        
        function _genFormId(auto) {
            var str = 'frm';
            
            if (auto == true) {
                str += '_' + (new Date()).getTime().toString();
            }
            
            return str;
        }
        
        function _getFieldId(id) {
            var str = 'custpage'
            
            if (id) {
                str += id;
            }
            else {
                str += (new Date()).getTime().toString();
            }
            
            return str;
        }
        
        /**
         */
        function _getTypeObject(type, arrTypes) {
            var LOG_TITLE = PREFIX + '_getTypeObject';
            LOG.debug({ title: LOG_TITLE, details: '*** START ***' });
            
            var obj = '';
            
            for (var i=0, n=arrTypes.length; i<n; i++) {
                var ft = arrTypes[i];
                if (ft.id == type) {
                    obj = ft;
                    break;
                }
            }
            
            LOG.debug({ title: LOG_TITLE, details: '*** END ***' });
            return obj;
        }
        
        
        
        /**
         */
        function _addButton(params) {
            var LOG_TITLE = PREFIX + '_addButton';
            LOG.debug({ title: LOG_TITLE, details: '*** START ***' });
            LOG.debug({ title: LOG_TITLE + ' params', details: JSON.stringify(params) });
            
            var str = '';
            str += 'btn = frm.add' + (params.submit == true ? 'Submit' : '') + 'Button({';
            
            var arr = [];
            arr.push('"id":"' + _getFieldId(params.id) + '"');
            arr.push('"label":"' + params.lbl + '"');
            // arr.push('"functionName":"' + params.lbl + '"');
            
            str += arr.join(',');
            str += '});';
            
            LOG.debug({ title: LOG_TITLE, details: '*** END ***' });
            return str;
        }
        
        /**
         */
        function _addField(params) {
            var LOG_TITLE = PREFIX + '_addField';
            LOG.debug({ title: LOG_TITLE, details: '*** START ***' });
            LOG.debug({ title: LOG_TITLE + ' params', details: JSON.stringify(params) });
            
            var str = '';
            str += 'fld = frm.addField({';
            
            var arr = [];
            arr.push('"id":"' + _getFieldId(params.id) + '"');
            arr.push('"label":"' + params.lbl + '"');
            
            var obj =_getTypeObject(params.type, CONSTANTS.FIELD_TYPES);
            arr.push('"type":' + (obj ? obj.value : 'UI.FieldType.TEXT'));
            
            if (params.type == 'list' && params.src) {
                obj = _getTypeObject(params.src, CONSTANTS.RECORD_TYPES('2.0'));
                arr.push('"source":' + obj.value);
            }
            
            if (params.container) {
                arr.push('"container":"custpage' + params.container + '"');
            }
            
            str += arr.join(',');
            str += '});';
            LOG.debug({ title: LOG_TITLE + ' str', details: str });
            
            LOG.debug({ title: LOG_TITLE, details: '*** END ***' });
            return str;
        }
        
        /**
         */
        function _addGroup(params) {
            var LOG_TITLE = PREFIX + '_addGroup';
            LOG.debug({ title: LOG_TITLE, details: '*** START ***' });
            
            var str = '';
            str += 'grp = frm.addFieldGroup({';
            
            var arr = [];
            arr.push('"id":"' + _getFieldId(params.id) + '"');
            arr.push('"label":"' + params.lbl + '"');
            
            if (params.tab) {
                arr.push('"tab":"' + params.tab + '"');
            }
            
            str += arr.join(',');
            str += '});';
            LOG.debug({ title: LOG_TITLE + ' str', details: str });
            
            LOG.debug({ title: LOG_TITLE, details: '*** END ***' });
            return str;
        }
        
        return {
            addButton: _addButton,
            addField: _addField,
            addGroup: _addGroup,
            genFormId: _genFormId
        }
    }
);

(function() {
    console.log('hi guys');
    var jq = NS.jQuery || jQuery;
    var globals = {{__globals__}};
    var doc = document || {};
    var nsResp = {};
    var objSL = {};
    var CLASSES = {
        group: 'ui-fgrp',
        grptitle: 'ui-fgrp-title',
        content: 'ui-fgrp-fcontent',
        row: 'ui-fgrp-row',
        fldset: 'ui-fldset',
        btn: 'ui-btn',
        btndef: 'ui-btn-def'
    };
    var PREFIX = {
        group: 'gdiv'
    };
    var url = '';
    console.log('backend = ' + globals.url.backend);
    
    //#region Validation Functions
    function validateForm() {
        console.log('validateForm');
        var ok = true;
        
        var elSLName = doc.getElementById('slName');
        var slname = elSLName.value;
        console.log('Checking SL name = ' + slname);
        if (!slname) {
            alert('Please provide a name for the Suitelet.');
            elSLName.focus();
            return false;
        }
        
        return ok;
    }
    //#endregion
    
    //#region Script Object Functions
    /* function getObjIndex(arr, key, val) {
        console.log('** getObjIndex **');
        var k = -1;
        for (var i=0, n=arr.length; i<n; i++) {
            var obj = arr[i];
            console.log('i = ' + i + ', id = ' + obj.id);
            
            if (key == 'id') {
                if (val.indexOf(obj.id) >= 0) {
                    k = i;
                    break;
                }
            }
            else {
                if (obj[key] == val) {
                    k = i;
                    break;
                }
            }
        }

        return k;
    } */

    function resetSLObj() {
        objSL = {
            form: {
                grps: [],
                flds: [],
                btns: []
            },
            list: {},
            script: {},
            deploy: {}
        };
    }

    function updateSLObj() {
        console.log('...updating SL object...');
        var elArr = doc.getElementById('ncGroups');
        var arr = elArr.getElementsByClassName('nc-grp');
        var i, ilen;

        // Clear all data
        resetSLObj();

        objSL.name = doc.getElementById('slName').value;
        
        for (i=0, ilen=arr.length; i<ilen; i++) {
            // console.log('looping arrGrps i = ' + i);
            var elGrp = arr[i];
            // var idGrpArr = elGrp.id.split('_');
            var elGrpHdr = elGrp.getElementsByClassName('hdr')[0].getElementsByTagName('input')[0];

            objSL.form.grps.push({
                id: elGrp.id.substring('ncGrp_'.length),
                lbl: elGrpHdr.value
            });

            var elGrpCols = elGrp.getElementsByClassName('layout-col');
            for (var j=0, jlen=elGrpCols.length; j<jlen; j++) {
                // console.log('looping elGrpCols j = ' + j);
                var idCol = elGrpCols[j].id;
                var idColArr = idCol.split('_');

                var elColFlds = elGrpCols[j].getElementsByClassName('nc-fld');
                for (var k=0, klen=elColFlds.length; k<klen; k++) {
                    // console.log('looping elColFlds k = ' + k);
                    // console.log(elColFlds[k]);
                    var idFld = elColFlds[k].id;
                    var idFldArr = idFld.split('_');
                    var elFld = doc.getElementById(idFld);

                    objSL.form.flds.push({
                        col: idColArr[2],
                        container: idColArr[1],
                        id: idFldArr[1],
                        lbl: elColFlds[k].getElementsByTagName('label')[0].innerHTML,
                        src: elFld.getAttribute('data-src'),
                        type: elFld.getAttribute('data-type')
                        // type: idFldArr[1]
                    });
                }
            }
        }

        elArr = doc.getElementById('ncBtns');
        arr = elArr.getElementsByClassName('nc-btn');

        for (i=0, ilen=arr.length; i<ilen; i++) {
            var elBtn = arr[i];

            objSL.form.btns.push({
                id: elBtn.id,
                lbl: elBtn.innerHTML,
                submit: elBtn.hasAttribute('data-def') == true
            });
        }
        
        console.log(objSL);
    }
    
    // NOT NEEDED
    /* function buildCompParams(params) {
        var objParams = {
            'type': params.type,
            'class': params.cls.join(' ')
        };
        if (params.id) {
            objParams.id = params.id;
        }
        if (params.conf) {
            for (var k in params.conf) {
                if (params.conf.hasOwnProperty(k)) {
                    objParams[k] = params.conf[k];
                }
            }
        }
        
        return objParams;
    } */
    //#endregion

    //#region Helper Functions
    function getTS() {
        return (new Date()).getTime().toString();
    }

    function parseDate(dt, time) {
        var str = '';
        str = dt.getDate().toString() + '/';
        str += (dt.getMonth() + 1).toString() + '/';
        str += dt.getFullYear();

        if (time) {
            str += ' ';
            str += (dt.getHours() + 1).toString() + ':';
            str += (dt.getMinutes()).toString();
        }
        return str;
    }

    function getElContent(type) {
        var str = 'Text';
        var num = 123.45;
        var dt = new Date();

        switch (type) {
            case 'curr':
            case 'flt':
            case 'pct': {
                str = (type == 'curr' ? 'USD ' : '') + parseFloat(num).toString() + (type == 'pct' ? ' %' : '');
                break;
            }
            case 'date': {
                str = parseDate(dt);
                break;
            }
            case 'datetime': {
                str = parseDate(dt, true);
                break;
            }
            case 'file': {
                str = 'File_Name.txt';
                break;
            }
            case 'int': {
                str = parseInt(num).toString();
                break;
            }
            case 'list':
            case 'multiselect': {
                str = 'Select ' + (type == 'multiselect' ? 'multiple ' : '') + 'from list';
                break;
            }
            case 'pwd': {
                str = '********';
                break;
            }
            case 'url': {
                str = 'http://url.com';
                break;
            }
            default: {
                break;
            }
        }
        return str;
    }

    function createNewEl(params) {
        var el = doc.createElement(params.type);
        
        if (params.attr) {
            for (var a in params.attr) {
                el.setAttribute(a, params.attr[a]);
            }
        }

        if (params.evs) {
            for (var e in params.evs) {
                el.addEventListener(e, params.evs[e]);
            }
        }

        if (params.html) {
            el.innerHTML = params.html;
        }

        return el;
    }

    //#region Modal Functions
    function toggleModal(params) {
        var modal = doc.querySelector('.nc-modal');
        modal.classList.toggle('show-modal');
        console.log(params);

        /* if (modal.classList.contains('show-modal')) {
            console.log('showing modal...');
            // doc.getElementById('btnModalOK').addEventListener('click', function(e) {
            //     modalFldBtnClk({ ok: true });
            // });
    
            // doc.getElementById('btnModalCancel').addEventListener('click', function(e) {
            //     modalFldBtnClk({ cancel: true });
            // });
        }
        else {
            console.log('hiding modal...');
            // doc.getElementById('btnModalOK').removeEventListener('click', function(e) {
            //     modalFldBtnClk({ ok: true });
            // });
            // doc.getElementById('btnModalCancel').removeEventListener('click', function(e) {
            //     modalFldBtnClk({ cancel: true });
            // });
        } */

        if (params) {
            var arrInner = modal.getElementsByClassName('nc-modal-content');
            for (var i=0, n=arrInner.length; i<n; i++) {
                if (arrInner[i].classList.contains('nc-hidden') == false) {
                    arrInner[i].classList.add('nc-hidden');
                }
            }
            
            var innerModal = doc.getElementById('nc' + params.modal + 'Modal');
            if (innerModal) {
                console.log('showing modal form = ' + params.modal);
                innerModal.classList.remove('nc-hidden');
            }

            switch(params.modal) {
                case 'btn': {
                    console.log('toggle btn modal');
                    if (params.id) {
                        /* var fldSrc = doc.getElementById('fldSrc');
                        if (!fldSrc) {
                            return;
                        } */
                        
                        /* var fldData = doc.getElementById('ncEl_' + params.id);
                        if (['list', 'multi'].indexOf(fldData.getAttribute('data-type')) >= 0) {
                            if (fldSrc.classList.contains('nc-hidden') == true) {
                                fldSrc.classList.remove('nc-hidden');
                            }
                        }
                        else {
                            if (fldSrc.classList.contains('nc-hidden') == false) {
                                fldSrc.classList.add('nc-hidden');
                            }
                        } */
                    }
                    break;
                }
                case 'fld': {
                    console.log('toggle fld modal');
                    if (params.id) {
                        var fldSrc = doc.getElementById('fldSrc');
                        if (!fldSrc) {
                            return;
                        }
                        
                        var fldData = doc.getElementById('ncEl_' + params.id);
                        if (['list', 'multiselect'].indexOf(fldData.getAttribute('data-type')) >= 0) {
                            if (fldSrc.classList.contains('nc-hidden') == true) {
                                fldSrc.classList.remove('nc-hidden');
                            }
                        }
                        else {
                            if (fldSrc.classList.contains('nc-hidden') == false) {
                                fldSrc.classList.add('nc-hidden');
                            }
                        }
                    }
                    break;
                }
                default: {
                    break;
                }
            }
        }
    }

    function getModalFldEls() {
        var modalFldName = doc.getElementById('modalFldName');
        if (!modalFldName) {
            console.log('Cannot find modalFldName...');
        }

        var modalFldSrc = doc.getElementById('modalFldSrc');
        if (!modalFldSrc) {
            console.log('Cannot find modalFldSrc...');
        }

        var modalBtnLbl = doc.getElementById('modalBtnLbl');
        if (!modalBtnLbl) {
            console.log('Cannot find modalBtnLbl...');
        }

        var modalBtnIsDef = doc.getElementById('modalBtnIsDef');
        if (!modalBtnIsDef) {
            console.log('Cannot find modalBtnIsDef...');
        }
        
        return {
            modalFldName: modalFldName,
            modalFldSrc: modalFldSrc,
            modalBtnLbl: modalBtnLbl,
            modalBtnIsDef: modalBtnIsDef
        };
    }

    function showEditBtn(id) {
        console.log('showEditBtn = ' + id);
        toggleModal({
            modal: 'btn',
            id: id
        });

        var btnId = 'ncBtn_' + id;
        var btn = doc.getElementById(btnId);
        if (!btn) {
            console.log('Cannot find ncBtn_' + id + '. Exiting...');
            return;
        }

        globals.btnEdit = btnId;
        var modalEls = getModalFldEls();

        var btnName = modalEls.modalBtnLbl;
        btnName.value = btn.innerHTML;
        btnName.focus();
        btnName.select();

        var btnIsDef = modalEls.modalBtnIsDef;
        btnIsDef.checked = btn.hasAttribute('data-def');
        console.log('btnIsDef = ' + btnIsDef.checked);
        // if (btn.classList.contains(''))
    }

    // function showEditFld(type, id) {
    function showEditFld(id) {
        console.log('showEditFld = ' + id);
        toggleModal({
            modal: 'fld',
            id: id
            // fldtype: type
        });

        // var fldId = 'ncEl_' + type + '_' + id;
        var fldId = 'ncEl_' + id;
        var fld = doc.getElementById(fldId);
        if (!fld) {
            console.log('Cannot find ncEl_' + id + '. Exiting...');
            return;
        }

        globals.fldEdit = fldId;
        var modalEls = getModalFldEls();
        var fldName = modalEls.modalFldName;
        fldName.value = fld.getElementsByTagName('label')[0].innerHTML;
        fldName.focus();
        fldName.select();

        var fldSrc = modalEls.modalFldSrc;
        var gfld = objSL.form.flds.filter(function (x) {
            return x.id == id;
        });

        if (gfld.length > 0) {
            console.log('gfld.length > 0');
            console.log(gfld);
            fldSrc.value = gfld[0].src;
        }
    }

    function modalFldBtnClk(params) {
        console.log(params);

        if (params.ok) {
            console.log('clicked ok');
            var modalEls = getModalFldEls();

            switch(params.modal) {
                case 'btn': {
                    var btnLbl = modalEls.modalBtnLbl;
                    var cbDef = modalEls.modalBtnIsDef;

                    if (!globals.btnEdit) {
                        return;
                    }

                    var btnEdit = doc.getElementById(globals.btnEdit);
                    btnEdit.innerHTML = btnLbl.value;

                    if (cbDef.checked == true) {
                        if (btnEdit.classList.contains('nc-btn-def') == false) {
                            btnEdit.classList.add('nc-btn-def');
                            btnEdit.setAttribute('data-def', true);
                        }
                    }
                    else {
                        if (btnEdit.classList.contains('nc-btn-def') == true) {
                            btnEdit.classList.remove('nc-btn-def');
                            btnEdit.removeAttribute('data-def');
                        }
                    }

                    // type = 'btn';
                    break;
                }
                case 'fld': {
                    console.log('ncfldModal');
                    var fldName = modalEls.modalFldName;
                    var fldSrc = modalEls.modalFldSrc;
                    // console.log('edited field = ' + globals.fldEdit);
                    
                    if (!globals.fldEdit) {
                        return;
                    }
                    
                    var fldEdit = doc.getElementById(globals.fldEdit);
        
                    if (['list', 'multiselect'].indexOf(fldEdit.getAttribute('data-type')) >= 0) {
                        fldEdit.setAttribute('data-src', fldSrc.value);
                    }
        
                    fldEdit.getElementsByTagName('label')[0].innerHTML = fldName.value.toUpperCase();

                    // type = 'fld';
                    break;
                }
                default: {
                    break;
                }
            }
            updateSLObj();
            
            /* var arrEditId = globals.fldEdit.split('_');
            var gfld = globals.form.flds.filter(function (x) {
                return x.id == arrEditId[2];
            });

            if (gfld.length > 0) {

            } */
        }
        
        if (params.cancel) {
            console.log('clicked cancel');
        }

        toggleModal({ modal: params.modal });
    }
    //#endregion Modal Functions

    function removeEl(params) {
        console.log('removeEl = ' + params.type + '; ' + params.id);

        var isOk = (!params.isMove) ?
            confirm('Are you sure you want to delete this ' + params.type + '?') :
            true;
        
        if (isOk) {
            var el, par, idEl;

            switch(params.type) {
                case 'btn': {
                    idEl = 'ncBtn_' + id;
                    el = doc.getElementById(idEl);
                    par = doc.getElementById('ncBtns');
                    par.removeChild(el);

                    var arr = par.getElementsByClassName('nc-btn');
                    if (arr.length <= 0) {
                        togglePlaceholder(par, true);
                    }
                }
                case 'field': {
                    idEl = 'ncEl_' + params.id;
                    console.log('idEl = ' + idEl);
                    el = doc.getElementById(idEl);
                    par = el.closest('.layout-col');
                    par.removeChild(el);
                    break;
                }
                case 'group': {
                    idEl = 'ncGrp_' + params.id;
                    console.log('idEl = ' + idEl);
                    el = doc.getElementById(idEl);
                    par = doc.getElementById('ncGroups');
                    par.removeChild(el);

                    var arrGrps = par.getElementsByClassName('nc-grp');
                    if (arrGrps.length <= 0) {
                        togglePlaceholder(par, true);
                    }
                    /* var gid = jq(this).attr('id');
                    console.log('clicked ' + gid);
                    
                    if (confirm('This action cannot be undone. Are you sure?') == false) {
                        return;
                    }
                    
                    idRem = gid.substring(gid.indexOf('_'));
                    var k = getObjIndex(objSL.form.grps, 'id', params.id);
                    var k = getObjIndex(objSL.form.grps, 'id', idRem);
                    for (var i=0, n=objSL.form.grps.length; i<n; i++) {
                        var og = objSL.form.grps[i];
                        // console.log('i = ' + i + ', og.id = ' + objSL.form.grps[i].id);
                        
                        if (objSL.form.grps[i].id == idRem) {
                            k = i;
                            break;
                        }
                    }
                    
                    if (k >= 0) {
                        console.log('removing group');
                        objSL.form.grps.splice(k, 1);
                    }
                    console.log(objSL);
                    
                    console.log('to remove = #gdiv' + idRem);
                    jq('#gdiv' + idRem).remove();
                    
                    Also remove all fields from the Suitelet Object
                    if (objSL.form.flds) {
                        for (i=objSL.form.flds.length - 1; i>=0; i--) {
                            if (objSL.form.flds[i].container == idRem) {
                                objSL.form.flds.splice(i, 1);
                            }
                        }
                    } */
                }
                default: {
                    break;
                }
            }
        }
        updateSLObj();
        // console.log(objSL);
    }

    // IN PROGRESS
    function shiftEl(e) {
        console.log(e);

        var idTarget = e.target.id;
        console.log('shiftEl; id = ' + idTarget);

        var params = idTarget.split('_');

        var elFld = e.target.closest('.nc-fld');
        console.log(elFld);
        
        var elCol = elFld.closest('.layout-col');
        console.log(elCol);

        var goUp = params[1] == 'up';
        var colFlds = elCol.getElementsByClassName('nc-fld');
        console.log(colFlds);

        var i, n, index = -1;
        var refFld = null;
        var moveFld = null;
        for (i=0, n=colFlds.length; i<n; i++) {
            if (colFlds[i].id == elFld.id) {
                console.log('fld id = ' + colFlds[i].id);
                index = i;
                refFld = colFlds[i];
                moveFld = elFld;
                break;
            }
        }
        console.log('index = ' + index);
        console.log(refFld);

        if (index <= 0) {
            return;
        }

        refFld.insertAdjacentHTML('beforebegin', moveFld.outerHTML);
        elCol.removeChild(elFld);
    }

    function hiliteDrop(e) {
        var dropEl = e.target.closest('.layout-col');
        dropEl.classList.add('nc-drop-hilite');
    }

    function lowliteDrop() {
        var droppables = doc.getElementsByClassName('layout-col');
        for (var i=0, n=droppables.length; i<n; i++) {
            droppables[i].classList.remove('nc-drop-hilite');
        }
    }

    function togglePlaceholder(con, show) {
        var ph = con.getElementsByClassName('placeholder')[0];
        if (show && ph.classList.contains('nc-hidden')) {
            ph.classList.remove('nc-hidden');
        }
        else if (!show && (ph.classList.contains('nc-hidden') == false)) {
            ph.classList.add('nc-hidden');
        }
    }

    function addBtn() {
        var btnName = '';
        var elBtn, elDiv;

        var idNew = getTS();
        var ncBtns = doc.getElementById('ncBtns');
        togglePlaceholder(ncBtns);

        var elBtnDisp = createNewEl({
            type: globals.elements.DIV,
            attr: {
                class: 'nc-btn',
                id: 'ncBtn_' + idNew
            },
            evs: {
                click: function(e) {
                    showEditBtn(idNew);
                    // updateSLObj();
                }
            },
            html: 'Button'
        });

        ncBtns.appendChild(elBtnDisp);
        showEditBtn(idNew);
    }

    function addFldGrp() {
        var grpName = '';
        var elGrp, elDiv;

        // grpName = prompt('Enter the name of the Field Group');
        // if (!grpName) {
        //     return;
        // }
        
        var idNew = getTS();
        console.log('grpName = ' + grpName + ', idNew = ' + idNew);

        //#region Create group HTML elements
        // Creating the group...
        elGrp = createNewEl({
            type: globals.elements.DIV,
            attr: {
                class: 'nc-grp',
                id: 'ncGrp_' + idNew
            }
        });

        // Group header
        elDiv = createNewEl({
            type: globals.elements.DIV,
            attr: {
                class: 'hdr nc-flex-row nc-flex-jc-sb nc-flex-ai-ctr'
            }
        });
        elDiv.appendChild(
            createNewEl({
                type: globals.elements.INPUT,
                attr: {
                    type: 'text',
                    value: grpName,
                    id: 'grpName_' + idNew
                },
                evs: {
                    blur: function(e) {
                        updateSLObj();
                    }
                }
            })
        );

        // Group action buttons
        elAct = createNewEl({
            type: globals.elements.DIV,
            attr: {
                class: 'hdr-actions nc-flex-row'
            }
        });

        elAct.appendChild(
            createNewEl({
                type: globals.elements.DIV,
                attr: {
                    class: 'btn-grp-act'
                },
                evs: {
                    click: function(e) {
                        removeEl({ type: 'group', id: idNew });
                    }
                },
                html: 'Remove'
            })
        );
        elDiv.appendChild(elAct);
        elGrp.appendChild(elDiv);

        // Creating the group column container...
        elDiv = createNewEl({
            type: globals.elements.DIV,
            attr: {
                class: 'con layout-grp'
            }
        });

        // 1st Group Column
        for (var i=1; i<=2; i++) {
            elDiv.appendChild(
                createNewEl({
                    type: globals.elements.DIV,
                    attr: {
                        class: 'layout-col nc-flex-col',
                        id: 'ncGrpCol_' + idNew + '_' + i.toString()
                    },
                    evs: {
                        dragenter: function(e) {
                            hiliteDrop(e);
                        },
                        dragleave: function(e) {
                            lowliteDrop();
                        },
                        dragover: function(e) {
                            hiliteDrop(e);
                            onDragOver(e);
                        },
                        drop: function(e) {
                            lowliteDrop();
                            onDrop(e);
                        }
                    }
                })
            );
        }

        elGrp.appendChild(elDiv);
        var ncGrps = doc.getElementById('ncGroups');
        ncGrps.appendChild(elGrp);
        doc.getElementById('grpName_' + idNew).focus({})

        togglePlaceholder(ncGrps);
        //#endregion
        
        //#region Add group to Suitelet Object
        // console.log('Adding group ' + idNew + ' to SL object');
        updateSLObj();
        /* if (!objSL.form.grps) {
            objSL.form.grps = [];
        }
        
        var k = getObjIndex(objSL.form.grps, 'id', idNew);
        if (k >= 0) {
            console.log('editing group');
            objSL.form.grps[k].lbl = grpName;
        }
        else {
            console.log('adding group');
            objSL.form.grps.push({
                id: idNew,
                lbl: grpName
            });
        } */
        
        // console.log(objSL);
        //#endregion
    }
    //#endregion

    //#region Event Handlers
    function onDragStart(e) {
        console.log('onDragStart id = ' + e.target.id);
        e.dataTransfer.setData('text/html', e.target.id);
    }

    function onDragOver(e) {
        e.preventDefault();
    }
    
    function onDrop(e) {
        var id = e.dataTransfer.getData('text/html');
        var dragEl = doc.getElementById(id);
        var idEl = dragEl.id, idNew;
        var elType = '';
        var elFld = null;
        console.log('onDrop = ' + idEl);

        var dropCol = e.target.closest('.layout-col');
        console.log('dropping ' + dragEl.id);

        if (idEl.indexOf('ncComp') >= 0) {
            //#region Dropping component from sidebar
            e.preventDefault();

            //#region Clone component into field group
            dragEl = doc.getElementById(id).cloneNode(true);
            elName = dragEl.getElementsByTagName('span')[0].innerHTML;
            elType = idEl.substring('ncComp'.length).toLowerCase();
            
            idNew = getTS();
            elFld = createNewEl({
                type: globals.elements.DIV,
                attr: {
                    class: 'nc-fld nc-fld-text',
                    draggable: 'true',
                    id: 'ncEl_' + idNew,
                    'data-type': elType
                },
                evs: {
                    dragstart: function(e) {
                        onDragStart(e);
                    }
                }
            });

            elFld.appendChild(
                createNewEl({
                    type: globals.elements.LABEL,
                    html: elName.toUpperCase()
                })
            );

            var elFldDisp = createNewEl({
                type: globals.elements.DIV,
                attr: {
                    class: 'nc-fld-disp nc-flex-row nc-flex-ai-fs'
                }
            });

            elFldDisp.appendChild(
                createNewEl({
                    type: globals.elements.DIV,
                    attr: {
                        class: 'nc-fld-type-' + elType
                    },
                    html: getElContent(elType)
                })
            );

            elFldDisp.appendChild(
                createNewEl({
                    type: globals.elements.BUTTON,
                    attr: {
                        type: 'button',
                        class: 'nc-fld-btn-edit',
                        id: 'ncFldBtn_edit_' + idNew
                    },
                    evs: {
                        click: function(e) {
                            showEditFld(idNew);
                        }
                    },
                    html: 'Edit'
                })
            );

            elFldDisp.appendChild(
                createNewEl({
                    type: globals.elements.BUTTON,
                    attr: {
                        type: 'button',
                        class: 'nc-fld-btn-rem',
                        id: 'ncFldBtn_rem_' + idNew
                    },
                    evs: {
                        click: function(e) {
                            removeEl({ type: 'field', id: idNew, subtype: elType });
                        }
                    },
                    html: 'Remove'
                })
            );

            elFld.appendChild(elFldDisp);
            dropCol.appendChild(elFld);

            showEditFld(idNew);

            // var idArrCol = dropCol.id.split('_');
            //#endregion

            //#region Update Suitelet Object
            // updateSLObj();
            /* if (!objSL.form.flds) {
                objSL.form.flds = [];
            }
            
            objSL.form.flds.push({
                id: idNew,
                lbl: elName,
                type: elType,
                src: '',
                container: idArrCol[1],
                col: idArrCol[2]
            }); */
        
            // console.log(objSL);
            //#endregion

            //#region TO_DELETE
            // var id = fid.substring(fid.indexOf('_'));
            // var val = jq(this).val();
            
            // var k = getObjIndex(objSL.form.flds, 'id', jq(this).attr('id'));
            // for (var i=0, n=objSL.form.flds.length; i<n; i++) {
                // var og = objSL.form.flds[i];
                // console.log('i = ' + i + ', og.id = ' + objSL.form.flds[i].id);
                
                // if (jq(this).attr('id').indexOf(objSL.form.flds[i].id) >= 0) {
                    // k = i;
                    // break;
                // }
            // }
            
            // if (k >= 0) {
            //     console.log('editing field');
            //     objSL.form.flds[k].lbl = val;
            // }
            // else {
            //     console.log('adding field');
            //     objSL.form.flds.push({
            //         id: fid.substring(fid.indexOf('_')),
            //         lbl: val
            //     });
            // }
            //#endregion
            //#endregion
        }
        else if (idEl.indexOf('ncEl') >= 0) {
            e.preventDefault();
            elFld = dragEl;
            var elCol = dragEl.closest('.layout-col');

            if (dropCol.id != elCol.id) {
                elCol.removeChild(dragEl);
                dropCol.appendChild(elFld);
                
                /* var id = fid.substring(fid.indexOf('_'));
                console.log('id = ' + id);
                
                var k = getObjIndex(objSL.form.flds, 'id', dragEl.id); */
                // var k = getObjIndex(objSL.form.flds, 'id', jq(this).attr('id'));
                // var k = -1;
                // for (var i=0, n=objSL.form.flds.length; i<n; i++) {
                    // var og = objSL.form.flds[i];
                    // console.log('i = ' + i + ', og.id = ' + objSL.form.flds[i].id);
                    
                    // if (jq(this).attr('id').indexOf(objSL.form.flds[i].id) >= 0) {
                        // k = i;
                        // break;
                    // }
                // }
                
                /* if (k >= 0) {
                    console.log('removing field');
                    objSL.form.flds.splice(k, 1);
                } */
            }
        }
        
        updateSLObj();
        e.dataTransfer.clearData();
    }

    function toggleBtn(btn, cls, isOn) {
        var clsDisabled = cls + '-disabled';
        if (btn.classList.contains(clsDisabled) == (isOn) ? true : false) {
            btn.classList.remove(cls);
            btn.classList.remove(clsDisabled);
        }
    }

    /* function urlencodeFormData(fd){
        var s = '';
        function encode(s){ return encodeURIComponent(s).replace(/%20/g,'+'); }
        for(var pair of fd.entries()){
            if(typeof pair[1]=='string'){
                s += (s?'&':'') + encode(pair[0])+'='+encode(pair[1]);
            }
        }
        return s;
    } */

    function sendToNS(params) {
        console.log('*** sendToNS ***');
        var url = '', contentType = '', data = params.data;

        var reqObj = {
            type: 'POST',
            data: data
        };

        switch(params.step) {
            case 'build': {
                reqObj.url = globals.url.script;
                break;
            }
            case 'deploy': {
                reqObj.url = globals.url.deploy;
                break;
            }
            default: {
                reqObj.url = globals.url.backend;
                reqObj.contentType = 'application/json';
                reqObj.data = JSON.stringify(params.data);
                break;
            }
        }

        return jq.ajax(reqObj);
    }

    async function buildScript(params) {
        console.log('*** buildScript ***');

        // Step 1: Save the contents into the custom record
        var apiResult = await sendToNS({ data: params.data, step: 'save' });
        console.log('finished ajax call (save)... ');
        console.log(apiResult);
        nsResp = apiResult;

        // Step 2: Create the Suitelet script record
        var fname = apiResult.file.name;
        var sname = '[AUTO] SL' + fname;
        var apiData = {
            'submitter': 'Save and Deploy',
            'scripttype': 'SCRIPTLET',
            'name': sname,
            'scriptid': '_' + fname.toLowerCase(),
            'apiversion': '2.0',
            'description': 'Auto-generated Suitelet on ' + fname,
            '_multibtnstate_': 'EDIT_SCRIPT:submitter:submitdeploy',
            'owner': globals.user,
            'type': 'script',
            'id': (nsResp.script ? nsResp.script.id : ''),
            // 'id': 569,
            'scriptfile': nsResp.file.id
        };
        // var fd = new FormData();
        // if (objSL.script.id) {
        //     scrData.id = objSL.script.id;
        // }
        apiResult = await sendToNS({ data: apiData, step: 'build' });
        /* jq.ajax({
            url: globals.url.script,
            type: 'POST',
            data: scrData
        }); */

        /* for (var key in scrData) {
            if (!scrData.hasOwnProperty(key)) {
                continue;
            }
            fd.append(key, scrData[key]);
        }

        sendResult = await sendToNS({ data: fd, step: 'build' }); */
        console.log('finished ajax call (build)... ');
        console.log(apiResult);

        var s1 = apiResult.substring(apiResult.indexOf('copytoaccount.nl'));
        var s2 = s1.substring(s1.indexOf('id=') + 3, s1.indexOf('"'));
        console.log('s2 = ' + s2);
        nsResp.script = { id: s2 };
        
        if (nsResp.deploy) {
            console.log('deployment exists... exiting now');
            
            /* $btn.text(btnBuildTxt);
            if ($btn.hasClass('ui-btn-disabled')) {
                $btn.removeClass('ui-btn-disabled');
                $btn.addClass('ui-btn-def');
            } */
            
            return;
        }

        // Step 3: Deploy the Suitelet script
        apiData = {
            'submitter': 'Save',
            'script': s2,
            'title': sname,
            'scriptid': '_' + fname.toLowerCase(),
            'isdeployed': 'T',
            'status': 'TESTING',
            'loglevel': 'DEBUG',
            'runasrole': 3,
            'type': 'scriptrecord',
            'id': (nsResp.deploy ? nsResp.deploy.record : ''),
            'deploymentid': (nsResp.deploy ? nsResp.deploy.id : '')
        };

        apiResult = await sendToNS({ data: apiData, step: 'deploy' });

        var sUrl = 'fldUrlWindow';
        var d1, d2;
        
        d1 = apiResult.substring(apiResult.indexOf('id="entryformquerystring"')+'id="entryformquerystring"'.length);
        d2 = d1.substring(d1.indexOf('value="id=')+'value="id='.length, d1.indexOf('">'));
        console.log('d2 = ' + d2);
        nsResp.deploy = { record: d2 };
        
        d1 = apiResult.substring(apiResult.indexOf(sUrl)+sUrl.length+2);
        d2 = d1.substring(0,d1.indexOf('</a>'));
        console.log('d2 = ' + d2);
        nsResp.deploy.url = d2;
        nsResp.deploy.id = d2.substring(d2.indexOf('&deploy=')+'&deploy='.length);

        window.open(d2, "_blank");
        console.log('*** FINISHED AJAX CALLS!!!')
        console.log(nsResp);
    }

    function build(e) {
        e.preventDefault();
        console.log('BUILDING SUITELET...');
        updateSLObj();
        // console.log(objSL);
        
        if (validateForm() == false) {
            return;
        }
        
        // Save Suitelet content into file
        objSL.id = nsResp.id;
        /* var reqData = {
            type: 'save',
            content: JSON.stringify(objSL)
        }; */
        
        var btn = e.target;
        // console.log(btn);
        btn.innerHTML = 'Building Suitelet...';
        toggleBtn(btn, 'nc-btn-def-disabled');

        console.log('backend url = ' + globals.url.backend);
        var payload = {
            type: 'save',
            content: objSL,
            file: (nsResp.file ? nsResp.file.id : '')
        };
        if (nsResp.script) {
            payload.script = nsResp.script.id;
        }
        console.log(JSON.stringify(payload));

        buildScript({ data: payload });
        /* var xhr = new XMLHttpRequest();
        xhr.open("POST", globals.url.backend);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            console.log('xhr status == ' + xhr.status);
            console.log(xhr.responseText);

            var objResp = JSON.parse(xhr.responseText);

            if (xhr.status == 200) {
                rid = objResp.id;
            }
        };
        xhr.send(JSON.stringify(payload)); */

        /* if (btn.classList.contains('nc-btn-build-disabled') == false) {
            btn.classList.remove('nc-btn-build')
            btn.classList.add('nc-btn-build-disabled');
        } */
        /* var $btn = jq('#ui-btn-build');
        $btn.text('Building ...');
        if ($btn.hasClass('ui-btn-def')) {
            $btn.removeClass('ui-btn-def');
            $btn.addClass('ui-btn-disabled');
        }
        // jq('#ui-sl-url').href('').text('... building ...');
        
        jq.ajax({
            url: globals.url.backend,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(reqData)
        })
        .done(function(data) {
            console.log(data);
            objResp = data;
            
            if (data.error) {
                console.log(data.error);
                alert(data.error);
                $btn.text(btnBuildTxt);
                return;
            }
            else {
                rid = objResp.id;
                objSL.id = rid;
                objSL.file = objResp.file;
                console.log(objSL);
            }
            
            var fname = objSL.file.name;
            var sname = '[AUTO] SL' + fname;
            var scrData = {
                'submitter': 'Save and Deploy',
                'scripttype': 'SCRIPTLET',
                'name': sname,
                'scriptid': '_' + fname.toLowerCase(),
                'apiversion': '2.0',
                'description': 'Auto-generated Suitelet on ' + fname,
                '_multibtnstate_': 'EDIT_SCRIPT:submitter:submitdeploy',
                'owner': globals.user,
                'type': 'script',
                'id': objSL.script.id,
                'scriptfile': objSL.file.id
            };
            
            jq.ajax({
                url: globals.url.script,
                type: 'POST',
                data: scrData
            }).
            done(function(sdata, status, sxhr) {
                var s1 = sdata.substring(sdata.indexOf('copytoaccount.nl'));
                var s2 = s1.substring(s1.indexOf('id=') + 3, s1.indexOf('"'));
                console.log('s2 = ' + s2);
                objSL.script.id = s2;
                
                if (sxhr.status != 200) {
                    alert('An error has occurred');
                    $btn.text(btnBuildTxt);
                    return;
                }
                
                if (objSL.deploy.id) {
                    console.log('deployment exists... exiting now');
                    
                    $btn.text(btnBuildTxt);
                    if ($btn.hasClass('ui-btn-disabled')) {
                        $btn.removeClass('ui-btn-disabled');
                        $btn.addClass('ui-btn-def');
                    }
                    
                    return;
                }
                
                $btn.text('Deploying...');
                // If deployment does not exist, build the deployment
                var depData = {
                    'submitter': 'Save',
                    'script': s2,
                    'title': sname,
                    'scriptid': '_' + fname.toLowerCase(),
                    'isdeployed': 'T',
                    'status': 'TESTING',
                    'loglevel': 'DEBUG',
                    'runasrole': 3,
                    'type': 'scriptrecord',
                    'id': (objSL.deploy.record || ''),
                    'deploymentid': (objSL.deploy.id || '')
                };
                
                jq.ajax({
                    url: globals.url.deploy,
                    type: 'POST',
                    data: depData
                }).
                done(function(ddata, status, dxhr) {
                    // console.log(ddata);
                    
                    if (dxhr.status != 200) {
                        alert('An error has occurred');
                        $btn.text(btnBuildTxt);
                        return;
                    }
                    
                    var sUrl = 'fldUrlWindow';
                    var d1, d2;
                    
                    d1 = ddata.substring(ddata.indexOf('id="entryformquerystring"')+'id="entryformquerystring"'.length);
                    d2 = d1.substring(d1.indexOf('value="id=')+'value="id='.length, d1.indexOf('">'));
                    console.log('d2 = ' + d2);
                    objSL.deploy.record = d2;
                    
                    d1 = ddata.substring(ddata.indexOf(sUrl)+sUrl.length+2);
                    d2 = d1.substring(0,d1.indexOf('</a>'));
                    console.log('d2 = ' + d2);
                    objSL.deploy.url = d2;
                    objSL.deploy.id = d2.substring(d2.indexOf('&deploy=')+'&deploy='.length);
                    
                    if (jq('#ui-sl-url').length > 0) {
                        var $linkUrl = jq('#ui-sl-url');
                        $linkUrl.attr('href', d2);
                        $linkUrl.text(d2);
                    }
                    else {
                        var $grpcontent = addGrpContent();
                        // var $grpcontent = jq('<div>', {"class":"ui-fgrp-fcontent"});
                        var $grp = jq('<div>', {"class":"ui-fgrp"});
                        var $row, $fld;
                        
                        $row = addRow();
                        // $row = jq('<div>', {"class":"ui-fgrp-row"});
                        
                        $fldset = addComponent('fldset');
                        // $fldset = jq('<div>', {"class":"ui-fldset"});
                        
                        $fld = jq('<span>');
                        $fld.text('Suitelet URL: ');
                        $fldset.append($fld);
                        
                        $fld = jq('<a>', {"id":"ui-sl-url","href":d2,"target":"_blank"});
                        $fld.text(d2);
                        $fldset.append($fld);
                        
                        $row.append($fldset);
                        
                        $grpcontent.append($row);
                        $grp.append($grpcontent);
                        jq('#ui-url').append($grp);
                    }
                    
                    console.log(objSL);
                    
                    $btn.text(btnBuildTxt);
                    if ($btn.hasClass('ui-btn-disabled')) {
                        $btn.removeClass('ui-btn-disabled');
                        $btn.addClass('ui-btn-def');
                    }
                });
            });
        }); */
    }
    //#endregion

    //#region INIT Functions
    // Build the Components sidebar
    function buildComponents() {
        var par, div, c;

        par = doc.getElementById('ncComponents');
        for (var i=0, n=globals.components.length; i<n; i++) {
            c = globals.components[i];
            div = createNewEl({
                type: globals.elements.DIV,
                attr: {
                    class: 'nc-comp-grp-item nc-comp-draggable nc-flex-row nc-flex-ai-ctr',
                    draggable: 'true',
                    id: 'ncComp' + c.name
                }
            });
            div.appendChild(
                createNewEl({
                    type: globals.elements.DIV,
                    html: '<i class="' + c.icon + '"></i>'
                })
            );
            div.appendChild(
                createNewEl({
                    type: globals.elements.SPAN,
                    html: c.lbl
                })
            );
            par.appendChild(div);
        }
    }

    function buildModal() {
        var fldSrc, rt, str = '';

        for (var i=0, n=globals.recTypes.length; i<n; i++) {
            rt = globals.recTypes[i];
            str += '<option value="' + rt.id + '">' + rt.text + '</option>';
        }

        fldSrc = doc.getElementById('modalFldSrc');
        fldSrc.innerHTML = str;
        fldSrc.addEventListener('change', function (e) {
            console.log('changed fldSrc = ' + this.value);
        });
    }

    function initControls() {
        doc.getElementById('btnBuild').addEventListener('click', function(e) {
            build(e);
        })

        doc.getElementById('btnAddBtn').addEventListener('click', function(e) {
            e.preventDefault();
            // alert('adding button');
            addBtn();
        });

        doc.getElementById('btnAddGrp').addEventListener('click', function(e) {
            e.preventDefault();
            addFldGrp();
        });

        doc.getElementById('ncOkFld').addEventListener('click', function(e) {
            e.preventDefault();
            modalFldBtnClk({ ok: true, modal: 'fld' });
        });

        doc.getElementById('ncCancelFld').addEventListener('click', function(e) {
            e.preventDefault();
            modalFldBtnClk({ cancel: true, modal: 'fld' });
        });

        doc.getElementById('ncOkBtn').addEventListener('click', function(e) {
            e.preventDefault();
            modalFldBtnClk({ ok: true, modal: 'btn' });
        });

        doc.getElementById('ncCancelBtn').addEventListener('click', function(e) {
            e.preventDefault();
            modalFldBtnClk({ cancel: true, modal: 'btn' });
        });
    }

    function initDnD() {
        console.log('initDnD');
        var i, j, n;

        // Init draggable components
        var dragEls = doc.getElementsByClassName('nc-comp-draggable');
        console.log(dragEls.length);
        for (i=0, n=dragEls.length; i<n; i++) {
            dragEls[i].addEventListener('dragstart', function(e) {
                onDragStart(e);
            });
        }
    }
    //#endregion

    //#region ENTRY
    buildComponents();
    buildModal();
    initControls();
    initDnD();
    //#endregion
})();
(function() {
    console.log('hi guys');
    var jq = NS.jQuery || jQuery;
    var globals = {{__globals__}};
    var doc = document || {};
    var rid = '';
    var objResp = {};
    var objSL = {};
        /* form: {},
        list: {},
        script: {},
        deploy: {}
    }; */
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
    function getObjIndex(arr, key, val) {
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
    }

    function resetSLObj() {
        objSL = {
            form: {
                grps: [],
                flds: []
            },
            list: {},
            script: {},
            deploy: {}
        };
    }

    function updateSLObj() {
        var elGrps = doc.getElementById('ncGroups');
        var arrGrps = elGrps.getElementsByClassName('nc-grp');

        resetSLObj();
        for (var i=0, n=arrGrps.length; i<n; i++) {
            var elGrp = arrGrps[i];
            var elGrpHdr = elGrp.getElementsByClassName('hdr')[0].getElementsByTagName('span')[0];
            objSL.form.grps.push({
                id: elGrp.id.substring('ncGrp_'.length),
                lbl: elGrpHdr.innerHTML
            });
        }
    }
    
    // NOT NEEDED
    function buildCompParams(params) {
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
    }
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
            case 'flt': {
                str = parseFloat(num).toString();
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
            case 'pwd': {
                str = '******';
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

    function showEditFld(type, id) {
        console.log('showEditFld = ' + id);

        /* jq('#modFld').modal({
            escapeClose: false,
            clickClose: false,
            showClose: false
        }); */
    }

    function removeEl(params) {
        console.log('removeEl = ' + params.type + '; ' + params.id + '; ' + params.subtype);

        var isOk = (!params.isMove) ?
            confirm('Are you sure you want to delete this ' + params.type + '?') :
            true;
        
        if (isOk) {
            var el, par, idEl;

            switch(params.type) {
                case 'field': {
                    idEl = 'ncEl_' + params.subtype + '_' + params.id;
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

                    // var gid = jq(this).attr('id');
                    // console.log('clicked ' + gid);
                    
                    // if (confirm('This action cannot be undone. Are you sure?') == false) {
                    //     return;
                    // }
                    
                    // idRem = gid.substring(gid.indexOf('_'));
                    var k = getObjIndex(objSL.form.grps, 'id', params.id);
                    // var k = getObjIndex(objSL.form.grps, 'id', idRem);
                    // for (var i=0, n=objSL.form.grps.length; i<n; i++) {
                        // var og = objSL.form.grps[i];
                        // // console.log('i = ' + i + ', og.id = ' + objSL.form.grps[i].id);
                        
                        // if (objSL.form.grps[i].id == idRem) {
                            // k = i;
                            // break;
                        // }
                    // }
                    
                    if (k >= 0) {
                        console.log('removing group');
                        objSL.form.grps.splice(k, 1);
                    }
                    console.log(objSL);
                    
                    // console.log('to remove = #gdiv' + idRem);
                    // jq('#gdiv' + idRem).remove();
                    
                    // Also remove all fields from the Suitelet Object
                    if (objSL.form.flds) {
                        for (i=objSL.form.flds.length - 1; i>=0; i--) {
                            if (objSL.form.flds[i].container == idRem) {
                                objSL.form.flds.splice(i, 1);
                            }
                        }
                    }
                }
                default: {
                    break;
                }
            }
        }
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

    function addFldGrp() {
        var grpName = '';
        var elGrp, elDiv;

        grpName = prompt('Enter the name of the Field Group');
        if (!grpName) {
            return;
        }

        idNew = getTS();
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
                type: globals.elements.SPAN,
                html: grpName
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
        doc.getElementById('ncGroups').appendChild(elGrp);
        //#endregion
        
        //#region Add group to Suitelet Object
        console.log('Adding group ' + idNew + ' to SL object');
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
        
        console.log(objSL);
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
                    id: 'ncEl_' + elType + '_' + idNew
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
                            showEditFld(elType, idNew);
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

            var idArrCol = dropCol.id.split('_');
            //#endregion

            //#region Update Suitelet Object
            updateSLObj();
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
        
            console.log(objSL);
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

    function initControls() {
        var btnAddBtn = doc.getElementById('btnAddBtn');
        btnAddBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('adding button');
        });

        var btnAddGrp = doc.getElementById('btnAddGrp');
        btnAddGrp.addEventListener('click', function(e) {
            addFldGrp();
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
    initControls();
    initDnD();
    //#endregion
})();
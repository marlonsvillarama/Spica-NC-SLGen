(function() {
    console.log('hi guys');
    // var jq = jQuery;
    var doc = document || {};

    var ELEMENTS = {
        BUTTON: 'button',
        DIV: 'div',
        LABEL: 'label',
        SPAN: 'span'
    };

    var COMPONENTS = [
        {
            name: 'CB',
            lbl: 'Checkbox',
            icon: 'fas fa-check'
        },
        {
            name: 'Curr',
            lbl: 'Currency',
            icon: 'fas fa-dollar-sign'
        },
        {
            name: 'Date',
            lbl: 'Date',
            icon: 'fas fa-calendar-alt'
        },
        {
            name: 'DateTime',
            lbl: 'Date/Time',
            icon: 'fas fa-calendar-plus'
        },
        {
            name: 'Flt',
            lbl: 'Float',
            icon: 'fas fa-divide'
        },
        {
            name: 'Img',
            lbl: 'Image',
            icon: 'fas fa-image'
        },
        {
            name: 'Int',
            lbl: 'Integer',
            icon: 'fas fa-info'
        },
        {
            name: 'LongText',
            lbl: 'Long Text',
            icon: 'fas fa-align-left'
        },
        {
            name: 'Multi',
            lbl: 'Multiple Select',
            icon: 'fas fa-stream'
        },
        {
            name: 'Pwd',
            lbl: 'Password',
            icon: 'fas fa-unlock'
        },
        {
            name: 'Pct',
            lbl: 'Percent',
            icon: 'fas fa-percent'
        },
        {
            name: 'Phone',
            lbl: 'Phone Number',
            icon: 'fas fa-phone'
        },
        {
            name: 'List',
            lbl: 'Select',
            icon: 'fas fa-caret-square-down'
        },
        {
            name: 'RichText',
            lbl: 'Rich Text',
            icon: 'fas fa-superscript'
        },
        {
            name: 'Text',
            lbl: 'Text',
            icon: 'fas fa-font'
        },
        {
            name: 'TextArea',
            lbl: 'Text Area',
            icon: 'fas fa-comment-alt'
        },
        {
            name: 'Time',
            lbl: 'Time of Day',
            icon: 'fas fa-clock'
        },
        {
            name: 'Url',
            lbl: 'URL / Website',
            icon: 'fab fa-internet-explorer'
        },
    ];

    // Build the Components sidebar
    function buildComponents() {
        var par, div, c;

        par = doc.getElementById('ncComponents');
        for (var i=0, n=COMPONENTS.length; i<n; i++) {
            c = COMPONENTS[i];
            div = createNewEl({
                type: ELEMENTS.DIV,
                attr: {
                    class: 'nc-comp-grp-item nc-comp-draggable nc-flex-row nc-flex-ai-ctr',
                    draggable: 'true',
                    id: 'ncComp' + c.name
                }
            });
            div.appendChild(
                createNewEl({
                    type: ELEMENTS.DIV,
                    html: '<i class="' + c.icon + '"></i>'
                })
            );
            div.appendChild(
                createNewEl({
                    type: ELEMENTS.SPAN,
                    html: c.lbl
                })
            );
            par.appendChild(div);
        }
    }
    
    function onDragStart(e) {
        console.log('onDragStart id = ' + e.target.id);
        e.dataTransfer.setData('text/html', e.target.id);
        // e.currentTarget.style.backgroundColor = '#FFF9C4';
    }

    function onDragOver(e) {
        console.log('onDragOver');
        console.log(e.target.id + ' = ' + e.target.classList);
        e.preventDefault();

        // var isDropZone = e.target.classList.contains('layout-col');

        // if (isDropZone == false) {
        //     return;
        // }

        // console.log(e.target.id + ' is a drop zone')
        // if (e.target.classList.contains('nc-dropzone-hov') == false) {
        //     e.target.classList.add('nc-dropzone-hov')
        // }
    }

    function getTS() {
        return (new Date()).getTime().toString();
    }

    /* function getCompType(id) {
        var stype = '';
        var sid = id.substring('ncComp'.length);
        switch(sid.toLowerCase()) {
            case 'cb': {
                break;
            }
            default: {
                break;
            }
        }
        return stype;
    } */

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
        var modal = doc.getElementById('modFld');
        var modClose = modal.getElementsByClassName('close')[0];
        modal.style.display = 'block';
        // modClose.removeEventListener('click')
        modClose.addEventListener('click', function(e) {
            modal.style.display = 'none';
        });
    }

    function removeEl(type, id, subtype) {
        console.log('removeEl = ' + type + '; ' + id + '; ' + subtype);

        if (confirm('Are you sure you want to delete this ' + type + '?')) {
            var el, par, idEl;

            switch(type) {
                case 'field': {
                    idEl = 'ncEl_' + subtype + '_' + id;
                    console.log('idEl = ' + idEl);
                    el = document.getElementById(idEl);
                    par = el.closest('.layout-col');
                    par.removeChild(el);
                    break;
                }
                case 'group': {
                    idEl = 'ncGrp_' + id;
                    console.log('idEl = ' + idEl);
                    el = document.getElementById(idEl);
                    par = document.getElementById('ncGroups');
                    par.removeChild(el);
                }
                default: {
                    break;
                }
            }
        }
    }
    
    function onDrop(e) {
        var id = e.dataTransfer.getData('text/html');
        var dragEl = doc.getElementById(id);
        var idEl = dragEl.id;
        var elType = '';
        console.log('onDrop ' + idEl);

        console.log('dropping ' + dragEl.id);
        if (idEl.indexOf('ncComp') >= 0) {
            e.preventDefault();

            dragEl = doc.getElementById(id).cloneNode(true);
            elName = dragEl.getElementsByTagName('span')[0].innerHTML;
            elType = idEl.substring('ncComp'.length).toLowerCase();

            dropEl = e.target.closest('.layout-col');
            
            var idNew = getTS();
            var elFld = createNewEl({
                type: ELEMENTS.DIV,
                attr: {
                    class: 'nc-fld nc-fld-text',
                    draggable: 'true',
                    id: 'ncEl_' + elType + '_' + idNew
                }
            });

            elFld.appendChild(
                createNewEl({
                    type: ELEMENTS.LABEL,
                    html: elName.toUpperCase()
                })
            );
            // var elFldLbl = createNewEl({
            //     type: ELEMENTS.LABEL,
            //     html: elName.toUpperCase()
            // });
            // var elFldLbl = doc.createElement('label');
            // elFldLbl.innerHTML = elName.toUpperCase();
            // elFld.appendChild(elFldLbl);

            var elFldDisp = createNewEl({
                type: ELEMENTS.DIV,
                attr: {
                    class: 'nc-fld-disp nc-flex-row nc-flex-ai-fs'
                }
            });
            // var elFldDisp = doc.createElement('div');
            // elFldDisp.setAttribute('class', 'nc-fld-disp nc-flex-row nc-flex-ai-fs');

            elFldDisp.appendChild(
                createNewEl({
                    type: ELEMENTS.DIV,
                    attr: {
                        class: 'nc-fld-type-' + elType
                    },
                    html: getElContent(elType)
                })
            );
            // var elFldCon = createNewEl({
            //     type: ELEMENTS.DIV,
            //     attr: {
            //         class: 'nc-fld-type-' + elType
            //     },
            //     html: getElContent(elType)
            // });
            // var elFldCon = doc.createElement('div');
            // elFldCon.setAttribute('class', 'nc-fld-type-' + elType);
            // elFldCon.innerHTML = getElContent(elType);

            elFldDisp.appendChild(
                createNewEl({
                    type: ELEMENTS.BUTTON,
                    attr: {
                        type: 'button',
                        class: 'nc-fld-btn-edit',
                        id: 'ncBtn_edit_' + idNew
                    },
                    evs: {
                        click: function(e) {
                            showEditFld(elType, idNew);
                        }
                    },
                    html: 'Edit'
                })
            );
            // var elBtn = createNewEl({
            //     type: ELEMENTS.BUTTON,
            //     attr: {
            //         type: 'button',
            //         class: 'nc-fld-btn-edit',
            //         id: 'ncBtn_edit_' + idNew
            //     },
            //     evs: {
            //         click: function(e) {
            //             showEditFld(elType, idNew);
            //         }
            //     },
            //     html: 'Edit'
            // });
            // var elBtn = doc.createElement('button');
            // elBtn.setAttribute('type', 'button');
            // elBtn.setAttribute('class', 'nc-fld-btn-edit');
            // elBtn.setAttribute('id', 'ncBtn_edit_' + idNew);
            // elBtn.setAttribute('onclick', 'showEditFld(' + idNew + ');');
            // elBtn.addEventListener('click', function(e) {
            //     showEditFld(elType, idNew);
            // });
            // elBtn.innerHTML = 'Edit';
            // elFldDisp.appendChild(elBtn);

            elFldDisp.appendChild(
                createNewEl({
                    type: ELEMENTS.BUTTON,
                    attr: {
                        type: 'button',
                        class: 'nc-fld-btn-rem',
                        id: 'ncBtn_rem_' + idNew
                    },
                    evs: {
                        click: function(e) {
                            removeEl('field', idNew, elType);
                        }
                    },
                    html: 'Remove'
                })
            );
            // elBtn = createNewEl({
            //     type: ELEMENTS.BUTTON,
            //     attr: {
            //         type: 'button',
            //         class: 'nc-fld-btn-rem',
            //         id: 'ncBtn_rem_' + idNew
            //     },
            //     evs: {
            //         click: function(e) {
            //             showRemFld(elType, idNew);
            //         }
            //     },
            //     html: 'Remove'
            // });
            // elBtn = doc.createElement('button');
            // elBtn.setAttribute('type', 'button');
            // elBtn.setAttribute('class', 'nc-fld-btn-rem');
            // elBtn.setAttribute('id', 'ncBtn_rem_' + idNew);
            // // elBtn.setAttribute('onclick', 'showRemFld(' + idNew + ');');
            // elBtn.addEventListener('click', function(e) {
            //     showRemFld('fld', elType, idNew);
            // });
            // elBtn.innerHTML = 'Remove';
            // elFldDisp.appendChild(elBtn);

            elFld.appendChild(elFldDisp);
        }
        else if (idEl.indexOf('ncEl') >= 0) {
            dragEl = doc.getElementById(id);

        }

        // e.target.closest('.layout-col').appendChild(elFld);
        dropEl.appendChild(elFld);
        e.dataTransfer.clearData();
    }

    /* function initDroppable(id) {
        var el = doc.getElementById(id);
        el.addEventListener('dragover', function(e) {
            onDragOver(e);
        });

        dropEls[i].addEventListener('drop', function(e) {
            onDrop(e);
        });

    } */

    function hiliteDrop(e) {
        console.log('hiliteDrop');
        var dropEl = e.target.closest('.layout-col');
        dropEl.classList.add('nc-drop-hilite');
    }

    function lowliteDrop() {
        var droppables = doc.getElementsByClassName('layout-col');
        for (var i=0, n=droppables.length; i<n; i++) {
            droppables[i].classList.remove('nc-drop-hilite');
        }
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

        // Init droppable components
        /* var dropEls = doc.getElementsByClassName('layout-col');
        console.log('droppables = ' + dropEls.length);
        for (i=0, n=dropEls.length; i<n; i++) {
            dropEls[i].addEventListener('dragover', function(e) {
                onDragOver(e);
            });

            dropEls[i].addEventListener('drop', function(e) {
                onDrop(e);
            });
        } */
    }

    function addFldGrp() {
        var grpName = '';
        var elGrp, elDiv, elCol, id;

        grpName = prompt('Enter the name of the Field Group');
        if (!grpName) {
            return;
        }

        idNew = getTS();
        console.log('grpName = ' + grpName + ', idNew = ' + idNew);

        // Creating the group...
        elGrp = createNewEl({
            type: ELEMENTS.DIV,
            attr: {
                class: 'nc-grp',
                id: 'ncGrp_' + idNew
            }
        });

        // Group header
        elDiv = createNewEl({
            type: ELEMENTS.DIV,
            attr: {
                class: 'hdr nc-flex-row nc-flex-jc-sb nc-flex-ai-ctr'
            }
        });
        elDiv.appendChild(
            createNewEl({
                type: ELEMENTS.SPAN,
                html: grpName
            })
        );

        // Group action buttons
        elAct = createNewEl({
            type: ELEMENTS.DIV,
            attr: {
                class: 'hdr-actions nc-flex-row'
            }
        });
        /* elAct.appendChild(
            createNewEl({
                type: ELEMENTS.DIV,
                attr: {
                    class: 'btn-grp-act'
                },
                evs: {
                    click: function(e) {
                        removeEl('group', e.target.id);
                    }
                },
                html: 'Collapse'
            })
        ); */
        elAct.appendChild(
            createNewEl({
                type: ELEMENTS.DIV,
                attr: {
                    class: 'btn-grp-act'
                },
                evs: {
                    click: function(e) {
                        removeEl('group', idNew);
                    }
                },
                html: 'Remove'
            })
        );
        elDiv.appendChild(elAct);
        elGrp.appendChild(elDiv);

        // Creating the group column container...
        elDiv = createNewEl({
            type: ELEMENTS.DIV,
            attr: {
                class: 'con layout-grp'
            }
        });

        // 1st Group Column
        for (var i=1; i<=2; i++) {
            elDiv.appendChild(
                createNewEl({
                    type: ELEMENTS.DIV,
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
                        },
                        drop: function(e) {
                            // lowliteDrop();
                            onDrop(e);
                        }
                    }
                })
            );
        }

        // 2nd Group Column
        // elDiv.appendChild(
        //     createNewEl({
        //         type: ELEMENTS.DIV,
        //         attr: {
        //             class: 'layout-col nc-flex-col',
        //             id: 'ncGrpCol_' + idNew + '2'
        //         }
        //     })
        // );
        elGrp.appendChild(elDiv);

        doc.getElementById('ncGroups').appendChild(elGrp);
    }

    function initControls() {
        // doc.addEventListener('mousemove', onMouseMove);

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

    buildComponents();
    initControls();
    initDnD();
})();
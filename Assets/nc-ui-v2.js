(function() {
    console.log('hi guys');
    var jq = jQuery;
    var doc = document || {};

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

    function getCompType(id) {
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
    
    function onDrop(e) {
        var id = e.dataTransfer.getData('text/html');
        var dragEl = doc.getElementById(id);
        var idEl = dragEl.id;
        var elType = '';
        console.log(idEl);

        console.log('dropping ' + dragEl.id);
        if (idEl.indexOf('ncComp') >= 0) {
            e.preventDefault();

            dragEl = doc.getElementById(id).cloneNode(true);
            elName = dragEl.getElementsByTagName('span')[0].innerHTML;
            elType = idEl.substring('ncComp'.length).toLowerCase();
            /* while(!elName) {
                if (elName == null || elName == undefined) {
                    return;
                }
                else {
                    console.log('doing action...');
                    elName == 'ok';
                    // elName = prompt('Enter the field label', dragEl.getElementsByTagName('span')[0].innerHTML);
                    var modal = doc.getElementById('modFld');
                    var modClose = modal.getElementsByClassName('close')[0];
                    modal.style.display = 'block';
                    // modClose.removeEventListener('click')
                    modClose.addEventListener('click', function(e) {
                        modal.style.display = 'none';
                    });
                }
            } */
    
            var elFld = doc.createElement('div');
            elFld.setAttribute('class', 'nc-fld nc-fld-text');
            elFld.setAttribute('draggable', 'true');
            elFld.setAttribute('id', 'ncEl_' + getTS());
            elFld.innerHTML = '<label>' + elName.toUpperCase() + '</label><div class="nc-fld-type-' + elType + '">' + getElContent(elType) + '</div>';
        }
        else if (idEl.indexOf('ncEl') >= 0) {
            dragEl = doc.getElementById(id);

        }

        e.target.closest('.layout-col').appendChild(elFld);
        e.dataTransfer.clearData();
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
        var dropEls = doc.getElementsByClassName('layout-col');
        console.log('droppables = ' + dropEls.length);
        for (i=0, n=dropEls.length; i<n; i++) {
            dropEls[i].addEventListener('dragover', function(e) {
                onDragOver(e);
            });


            dropEls[i].addEventListener('drop', function(e) {
                onDrop(e);
            });
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
            alert('adding field group');
        });
    }

    initControls();
    initDnD();
})();
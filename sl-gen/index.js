(function() {
    console.log('hi guys');
    var jq = jQuery;

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

    function onDrop(e) {
        var id = e.dataTransfer.getData('text/html');
        var dragEl = document.getElementById(id);
        console.log(dragEl);
        var idEl = dragEl.id;

        console.log('dropping ' + dragEl.id);
        if (idEl.indexOf('ncComp') >= 0) {
            e.preventDefault();
            dragEl = document.getElementById(id).cloneNode(true);

            elName = '';
            while(!elName) {
                if (elName == null || elName == undefined) {
                    return;
                }
                else {
                    elName = prompt('Enter the field label', dragEl.innerHTML);
                }
            }
    
            var elFld = document.createElement('div');
            elFld.setAttribute('class', 'nc-fld nc-fld-text');
            elFld.setAttribute('draggable', 'true');
            elFld.setAttribute('id', 'ncEl_' + getTS());
            elFld.innerHTML = '<label>' + elName + '</label><div>&nbsp;</div>';
        }
        else if (idEl.indexOf('ncEl') >= 0) {
            dragEl = document.getElementById(id);

        }

        e.target.closest('.layout-col').appendChild(elFld);
        e.dataTransfer.clearData();
    }

    function initDnD() {
        console.log('initDnD');
        var i, j, n;

        // Init draggable components
        var dragEls = document.getElementsByClassName('nc-comp-draggable');
        console.log(dragEls.length);
        for (i=0, n=dragEls.length; i<n; i++) {
            dragEls[i].addEventListener('dragstart', function(e) {
                onDragStart(e);
            });
        }

        // Init droppable components
        var dropEls = document.getElementsByClassName('layout-col');
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

    initDnD();
})();
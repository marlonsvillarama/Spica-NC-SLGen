(function () {
    console.log('INIT APP');

    var jq = NS.jQuery;
    var globals = {{__globals__}};
    var rid = '';
    var objResp = {};
    var objSL = {
        form: {},
        list: {},
        script: {},
        deploy: {}
    };
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
    var btnBuildTxt = 'BUILD SUITELET';
    var url = '';
    console.log('backend = ' + globals.url.backend);
    
    function validateForm() {
        console.log('validateForm');
        var ok = true;
        
        var slname = jq('#ui-slname').val();
        console.log('Checking SL name = ' + slname);
        if (!slname) {
            alert('Please provide a name for the Suitelet.');
            jq('#ui-slname').focus();
            return false;
        }
        
        return ok;
    }
    
    function getObjIndex(arr, key, val) {
        console.log('** getObjIndex **');
        var k = -1;
        for (var i=0, n=arr.length; i<n; i++) {
            var obj = arr[i];
            console.log('i = ' + i + ', id = ' + obj.id);
            
            if (key == 'id') {
                if (val.indexOf(obj.id) >= 0) {
                    k =i;
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
    
    function addComponent(type, cls, id, params) {
        console.log('adding component type = ' + type);
        var $obj, objParams = {};
        var arrCls = [];
        var cType = '<div>';
        
        if (cls) {
            arrCls = arrCls.concat(cls);
        }
        
        switch(type) {
            case 'group': {
                objParams = { 'class': arrCls.concat(CLASSES.group).join(' ') };
                if (id) {
                    objParams.id = id;
                }
                break;
            }
            case 'content': {
                objParams = { 'class': arrCls.concat(CLASSES.content).join(' ') };
                break;
            }
            case 'row': {
                objParams = { 'class': arrCls.concat(CLASSES.row).join(' ') };
                if (id) {
                    objParams.id = CLASSES.row + id;
                }
                break;
            }
            case 'fldset': {
                objParams = { 'class' : arrCls.concat(CLASSES.fldset).join(' ') };
                break;
            }
            case 'text': {
                // jq('<input>', { 'type' : 'text', "id":"gname" + gid,"class":"ui-fgrp-name ui-fld-title","placeholder":"Group Name"});
                // objParams = buildCompParams({
                    // 'type': 'text',
                    // 'classes': arrCls,
                    
                // });
                cType = '<input>';
                console.log(arrCls);
                console.log(id);
                console.log(params);
                objParams = buildCompParams({
                    'type': 'text',
                    'id': id,
                    'cls': arrCls,
                    'conf': params.conf
                });
                // if (id) {
                    // objParams.id = id
                // }
                // if (params) {
                    // if (params.ph) {
                        // objParams.placeholder = params.ph;
                    // }
                // }
                break;
            }
            case 'select': {
                break;
            }
            default: {
                // jq('<button>', {"type":"button","id":"ui-btn-addfld" + gid,"class":"ui-btn-def ui-btn-addfld"});
                cType = '<' + type + '>';
                objParams = buildCompParams({
                    'type': 'button',
                    'id': id,
                    'cls': arrCls
                });
                break;
            }
        }
        
        console.log(objParams);
        return jq(cType, objParams);
    }
    
    // Suitelet Name
    jq('#ui-slname').on('blur', function(e) {
        var slname = jq(this).val();
        objSL.name = slname;
        console.log(objSL);
    });
    
    // BUTTON: Add Field Group
    jq('#ui-btn-addgrp').on('click', function (e) {
        e.preventDefault();
        console.log('clicked addgrp');
        
        var dt = (new Date()).getTime().toString();
        var gid = '_' + dt;
        
        if (!objSL.form.grps) {
            objSL.form.grps = [];
        }
        objSL.form.grps.push({
            id: gid,
            lbl: ''
        });
        console.log(objSL);
        
        var $grp = addComponent('group', null, 'gdiv' + gid);
        // var $grp = addGroup(gid);
        // var $grp = jq('<div>', {"class":"ui-fgrp","id":"gdiv" + gid});
        var $grptitle = addComponent('div', [ CLASSES.grptitle ]);
        // var $grptitle = jq('<div>', { 'class' : CLASSES.grptitle });
        
        var $grpname = addComponent('text', ['ui-fgrp-name', 'ui-fld-title'], 'gname' + gid, { placeholder: 'Group Name' });
        // var $grpname = jq('<input>', { 'type' : 'text', "id":"gname" + gid,"class":"ui-fgrp-name ui-fld-title","placeholder":"Group Name"});
        $grptitle.append($grpname);
        
        var $grpaddfld = addComponent('button', [ CLASSES.btndef, 'ui-btn-addfld'], 'ui-btn-addfld' + gid);
        // var $grpaddfld = jq('<button>', {"type":"button","id":"ui-btn-addfld" + gid,"class":"ui-btn-def ui-btn-addfld"});
        $grpaddfld.text('Add Field');
        
        var $grpdel = addComponent('button', [ CLASSES.btn, 'ui-btn-delgrp'], 'ui-btn-delgrp' + gid);
        // var $grpdel = jq('<button>', {"type":"button","id":"ui-btn-delgrp" + gid,"class":"ui-btn ui-btn-delgrp"});
        $grpdel.text('Delete Group');
        
        $grptitle.append($grpaddfld);
        $grptitle.append($grpdel);
        $grp.append($grptitle);
        
        // Field Group Field Row
        // var $grpcontent = jq('<div>', {"class":"ui-fgrp-fcontent"});
        var $grpcontent = addComponent('content');
        // var $grpcontent = addGrpContent();
        var $row, $fldset, $fld;
        
        $row = addComponent('row');
        // $row = addRow();
        // $row = jq('<div>', {"class":"ui-fgrp-row"});
        
        $fldset = addComponent('fldset', ['ui-fld-name']);
        // $fldset = jq('<div>', {"class":"ui-fldset ui-fld-name"});
        
        $fld = jq('<span>');
        $fld.text('Field Name');
        $fldset.append($fld);
        $row.append($fldset);
        
        $fldset = addComponent('fldset', ['ui-fld-type']);
        // $fldset = jq('<div>', {"class":"ui-fldset ui-fld-type"});
        $fld = jq('<span>');
        $fld.text('Type');
        $fldset.append($fld);
        $row.append($fldset);

        $fldset = addComponent('fldset');
        // $fldset = jq('<div>', {"class":"ui-fldset"});
        $fld = jq('<span>');
        $fld.text('List/Record');
        $fldset.append($fld);
        $row.append($fldset);
        
        $grpcontent.append($row);
        $grp.append($grpcontent);
        jq('#ui-groups').append($grp);
        
        console.log(objSL.form.grps.length);
        $grpname.focus();
        console.log(objSL.form.grps.length);
        // $grpaddfld.trigger('click');
    });
    
    // BUTTON: Add Button
    jq('#ui-btn-addbtn').on('click', function (e) {
        e.preventDefault();
        console.log('clicked addgrp');
        
        var dt = (new Date()).getTime().toString();
        var gid = '_' + dt;
        var $grp, $grpcontent, $row, $btnset, $btn;
        
        if (jq('#ui-buttons .ui-bdiv').length > 0) {
            $grp = jq('#ui-buttons .ui-bdiv');
            $grpcontent = $grp.find('.ui-fgrp-fcontent');
        }
        else {
            $grp = addGroup(gid, "ui-bdiv");
            // $grp = jq('<div>', {"class":"ui-fgrp ui-bdiv","id":"gdiv" + gid});
            
            // Button list headers: Generate if it does not yet exist
            $grpcontent = addGrpContent();
            // $grpcontent = jq('<div>', {"class":"ui-fgrp-fcontent"});
            $row = addRow();
            // $row = jq('<div>', {"class":"ui-fgrp-row"});
            
            $btnset = addComponent('fldset', ['ui-fld-name']);
            // $btnset = jq('<div>', {"class":"ui-fldset ui-fld-name"});
            $btn = jq('<span>');
            $btn.text('Button Label');
            $btnset.append($btn);
            $row.append($btnset);
            
            $btnset = addComponent('fldset');
            // $btnset = jq('<div>', {"class":"ui-fldset"});
            $btn = jq('<span>');
            $btn.text('Type');
            $btnset.append($btn);
            $row.append($btnset);
            
            $grpcontent.append($row);
            $grp.append($grpcontent);
            
            jq('#ui-buttons').append($grp);
        }
        
        var bid = '_' + (new Date()).getTime().toString();
        
        // Add the button row
        // if (!objSL.form.btns) {
            // objSL.form.btns = [];
        // }
        
        // objSL.form.btns.push({
            // id: bid,
            // lbl: '',
            // type: ''
        // });
        
        // Button Row
        $row = addRow(bid);
        // $row = jq('<div>', {"class":"ui-fgrp-row","id":"ui-fgrp-row" + bid});
        
        // Button Name
        $btnset = addComponent('fldset', ['ui-fld-name']);
        // $btnset = jq('<div>', {"class":"ui-fldset ui-fld-name"});
        $btn = jq('<input>', {"type":"text","class":"ui-fld-name","id":"btn-name" + bid});
        $btnset.append($btn);
        $row.append($btnset);
        
        // Button ID
        // $btnset = jq('<div>', {"class":"ui-fldset ui-fld-name"});
        // $btn = jq('<input>', {"type":"text","class":"ui-fld-name","id":"btn-id" + bid});
        // // for (i=0, n=globals.fieldTypes.length; i<n; i++) {
            // // $opt = jq('<option>', {"value":globals.fieldTypes[i].id});
            // // $opt.text(globals.fieldTypes[i].label);
            // // $fld.append($opt);
        // // }
        // $btnset.append($btn);
        // $row.append($btnset);
        
        // Button Type
        $btnset = addComponent('fldset');
        // $btnset = jq('<div>', {"class":"ui-fldset"});
        $btn = jq('<select>', {"class":"ui-fld-src","id":"fld-src" + bid});
        
        $opt = jq('<option>', {"value":"submit"});
        $opt.text('Submit (default)');
        $btn.append($opt);
        
        $opt = jq('<option>', {"value":"button"});
        $opt.text('Button');
        $btn.append($opt);
        
        $btnset.append($btn);
        $row.append($btnset);
        $btn.val('button');
        
        $btn = jq('<button>', {"type":"button","class":"ui-btn ui-btn-delbtn","id":"ui-btn-delbtn"+bid});
        $btn.text('Remove');
        $row.append($btn);
        
        $grpcontent.append($row);
        // $grpcontent.append($row);
        // jq('#fld-type' + fid).val('text');
        // jq('#fld-type' + fid).trigger('change');
        // jq('#fld-name' + fid).focus();
        
        if (!objSL.form.btns) {
            objSL.form.btns = [];
        }
        objSL.form.btns.push({
            id: bid,
            lbl: '',
            submit: false
        });
        console.log(objSL);
    });
    
    jq('#ui-groups').on('blur', '.ui-fgrp-name', function() {
        console.log('triggered blur = ui-fgrp-name');
        if (!objSL.form.grps) {
            objSL.form.grps = [];
        }
        
        var gid = jq(this).attr('id');
        console.log('id = ' + gid);
        
        var val = jq(this).val();
        console.log('val = ' + val);
        
        var k = getObjIndex(objSL.form.grps, 'id', jq(this).attr('id'));
        // var k = -1;
        // for (var i=0, n=objSL.form.grps.length; i<n; i++) {
            // var og = objSL.form.grps[i];
            // // console.log('i = ' + i + ', og.id = ' + objSL.form.grps[i].id);
            
            // if (jq(this).attr('id').indexOf(objSL.form.grps[i].id) >= 0) {
                // k = i;
                // break;
            // }
        // }
        
        if (k >= 0) {
            console.log('editing group');
            objSL.form.grps[k].lbl = val;
        }
        else {
            console.log('adding group');
            objSL.form.grps.push({
                id: '_' + gid.substring(gid.indexOf('_') + 1),
                lbl: val
            });
        }
        
        console.log(objSL);
    });
    
    jq('#ui-groups').on('click', '.ui-btn-addfld', function(e) {
        var gid = jq(this).attr('id');
        console.log('clicked ' + gid);
        
        var id = gid.substring(gid.indexOf('_'));
        var fid = '_' + (new Date()).getTime().toString();
        var i, j, n;
        var $opt;
        var arrFldType = [];
        var arrRecType = [];
        
        var $row, $fldset, $fld;
        
        if (!objSL.form.flds) {
            objSL.form.flds = [];
        }
        
        objSL.form.flds.push({
            id: fid,
            lbl: '',
            type: '',
            src: '',
            container: id
        });
        
        // Field Row
        $row = addRow(fid);
        // $row = jq('<div>', {"class":"ui-fgrp-row","id":"ui-fgrp-row" + fid});
        
        // Field Name
        $fldset = addComponent('fldset', ['ui-fld-name']);
        // $fldset = jq('<div>', {"class":"ui-fldset ui-fld-name"});
        $fld = jq('<input>', {"type":"text","class":"ui-fld-name","id":"fld-name" + fid});
        $fldset.append($fld);
        $row.append($fldset);
        
        // Field Type
        $fldset = addComponent('fldset', ['ui-fld-type']);
        // $fldset = jq('<div>', {"class":"ui-fldset ui-fld-type"});
        $fld = jq('<select>', {"class":"ui-fld-type","id":"fld-type" + fid});
        for (i=0, n=globals.fieldTypes.length; i<n; i++) {
            $opt = jq('<option>', {"value":globals.fieldTypes[i].id});
            $opt.text(globals.fieldTypes[i].label);
            $fld.append($opt);
        }
        
        $fldset.append($fld);
        $row.append($fldset);
        
        // Field Source
        $fldset = addComponent('fldset');
        // $fldset = jq('<div>', {"class":"ui-fldset"});
        
        $fld = jq('<select>', {"class":"ui-fld-src","id":"fld-src" + fid});
        for (i=0, n=globals.recTypes.length; i<n; i++) {
            $opt = jq('<option>', {"value":globals.recTypes[i].id});
            $opt.text(globals.recTypes[i].text);
            $fld.append($opt);
        }
        $fld.prop('disabled', true);
        
        $fldset.append($fld);
        $row.append($fldset);
        
        // Buttons
        var $btn;
        
        $btn = jq('<button>', {"type":"button","class":"ui-btn ui-btn-delfld","id":"ui-btn-delfld"+fid});
        $btn.text('Remove');
        $row.append($btn);
        
        // $btn = jq('<button>', {"type":"button","class":"ui-btn ui-btn-ins-above"});
        // $btn.text('Insert Above');
        // $row.append($btn);
        
        // $btn = jq('<button>', {"type":"button","class":"ui-btn ui-btn-ins-below"});
        // $btn.text('Insert Below');
        // $row.append($btn);
        
        jq('#gdiv' + id + ' > .ui-fgrp-fcontent').append($row);
        jq('#fld-type' + fid).val('text');
        jq('#fld-type' + fid).trigger('change');
        jq('#fld-name' + fid).focus();
    });
    
    jq('#ui-groups').on('click', '.ui-btn-delgrp', function(e) {
        var gid = jq(this).attr('id');
        console.log('clicked ' + gid);
        
        if (confirm('This action cannot be undone. Are you sure?') == false) {
            return;
        }
        
        idRem = gid.substring(gid.indexOf('_'));
        var k = getObjIndex(objSL.form.grps, 'id', idRem);
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
        
        console.log('to remove = #gdiv' + idRem);
        jq('#gdiv' + idRem).remove();
        
        if (objSL.form.flds) {
            for (i=objSL.form.flds.length - 1; i>=0; i--) {
                if (objSL.form.flds[i].container == idRem) {
                    objSL.form.flds.splice(i, 1);
                }
            }
        }
    });
    
    jq('#ui-groups').on('blur', '.ui-fld-name', function (e) {
        console.log('field name');
        var fid = jq(this).attr('id');
        console.log('fid = ' + fid);
        
        if (fid) {
            var id = fid.substring(fid.indexOf('_'));
            var val = jq(this).val();
            
            var k = getObjIndex(objSL.form.flds, 'id', jq(this).attr('id'));
            // for (var i=0, n=objSL.form.flds.length; i<n; i++) {
                // var og = objSL.form.flds[i];
                // console.log('i = ' + i + ', og.id = ' + objSL.form.flds[i].id);
                
                // if (jq(this).attr('id').indexOf(objSL.form.flds[i].id) >= 0) {
                    // k = i;
                    // break;
                // }
            // }
            
            if (k >= 0) {
                console.log('editing field');
                objSL.form.flds[k].lbl = val;
            }
            else {
                console.log('adding field');
                objSL.form.flds.push({
                    id: fid.substring(fid.indexOf('_')),
                    lbl: val
                });
            }
        }
        
        console.log(objSL);
    });
    
    jq('#ui-groups').on('change', '.ui-fld-type', function (e) {
        console.log('field type');
        console.log(e);
        var fid = jq(this).attr('id');
        console.log('fid = ' + fid);
        
        if (fid) {
            var id = fid.substring(fid.indexOf('_'));
            var val = jq(this).val();
            
            var k = getObjIndex(objSL.form.flds, 'id', jq(this).attr('id'));
            // for (var i=0, n=objSL.form.flds.length; i<n; i++) {
                // var og = objSL.form.flds[i];
                // console.log('i = ' + i + ', og.id = ' + objSL.form.flds[i].id);
                
                // if (jq(this).attr('id').indexOf(objSL.form.flds[i].id) >= 0) {
                    // k = i;
                    // break;
                // }
            // }
            
            if (k >= 0) {
                console.log('editing field');
                objSL.form.flds[k].type = val;
            }
            else {
                console.log('adding field');
                objSL.form.flds.push({
                    id: fid.substring(fid.indexOf('_')),
                    type: val
                });
            }
            
            console.log('val = ' + val);
            jq('#fld-src' + id).val('');
            jq('#fld-src' + id).prop('disabled', (val != 'list' && val != 'multi'));
        }
        
        console.log(objSL);
    });
    
    jq('#ui-groups').on('change', '.ui-fld-src', function () {
        console.log('field type');
        var fid = jq(this).attr('id');
        console.log('fid = ' + fid);
        
        if (fid) {
            var id = fid.substring(fid.indexOf('_'));
            var val = jq(this).val();
            console.log('val = ' + val);
            
            var k = getObjIndex(objSL.form.flds, 'id', jq(this).attr('id'));
            // for (var i=0, n=objSL.form.flds.length; i<n; i++) {
                // var og = objSL.form.flds[i];
                // console.log('i = ' + i + ', og.id = ' + objSL.form.flds[i].id);
                
                // if (jq(this).attr('id').indexOf(objSL.form.flds[i].id) >= 0) {
                    // k = i;
                    // break;
                // }
            // }
            
            if (k >= 0) {
                console.log('editing field');
                objSL.form.flds[k].src = val;
            }
            else {
                console.log('adding field');
                objSL.form.flds.push({
                    id: fid.substring(fid.indexOf('_')),
                    src: val
                });
            }
        }
        
        console.log(objSL);
    });
    
    jq('#ui-groups').on('click', '.ui-btn-delfld', function (e) {
        console.log('clicked del fld');
        var fid = jq(this).attr('id');
        console.log('fid = ' + fid);
                
        if (fid) {
            var id = fid.substring(fid.indexOf('_'));
            console.log('id = ' + id);
            
            var k = getObjIndex(objSL.form.flds, 'id', jq(this).attr('id'));
            // var k = -1;
            // for (var i=0, n=objSL.form.flds.length; i<n; i++) {
                // var og = objSL.form.flds[i];
                // console.log('i = ' + i + ', og.id = ' + objSL.form.flds[i].id);
                
                // if (jq(this).attr('id').indexOf(objSL.form.flds[i].id) >= 0) {
                    // k = i;
                    // break;
                // }
            // }
            
            if (k >= 0) {
                console.log('removing field');
                objSL.form.flds.splice(k, 1);
            }
            
            var $row = jq(this).closest('.ui-fgrp-row');
            $row.remove();
        }
        
        console.log(objSL);
    });
    
    jq('#ui-buttons').on('blur', '.ui-fld-name', function (e) {
        console.log('button name');
        var fid = jq(this).attr('id');
        console.log('fid = ' + fid);
        
        if (fid) {
            var id = fid.substring(fid.indexOf('_'));
            var val = jq(this).val();
            
            var k = getObjIndex(objSL.form.btns, 'id', jq(this).attr('id'));
            // var k = -1;
            // for (var i=0, n=objSL.form.btns.length; i<n; i++) {
                // var og = objSL.form.btns[i];
                // console.log('i = ' + i + ', og.id = ' + objSL.form.btns[i].id);
                
                // if (jq(this).attr('id').indexOf(objSL.form.btns[i].id) >= 0) {
                    // k = i;
                    // break;
                // }
            // }
            
            if (k >= 0) {
                console.log('editing button');
                objSL.form.btns[k].lbl = val;
            }
            else {
                console.log('adding button');
                objSL.form.btns.push({
                    id: fid.substring(fid.indexOf('_')),
                    lbl: val,
                    submit: ''
                });
            }
        }
        
        console.log(objSL);
    });
    
    jq('#ui-buttons').on('change', '.ui-fld-src', function () {
        console.log('button type');
        var fid = jq(this).attr('id');
        console.log('fid = ' + fid);
        
        if (fid) {
            // var isSubmit = [];
            var isSubmit = jq('#ui-buttons .ui-fld-src').filter(function() {
                return this.value == 'submit';
            });
            console.log(isSubmit);
            
            if (isSubmit.length > 1) {
                alert('WARNING: It is recommended to have only one Submit button on a Suitelet.');
            }
            
            var id = fid.substring(fid.indexOf('_'));
            var val = jq(this).val();
            console.log('val = ' + val);
            
            var k = getObjIndex(objSL.form.btns, 'id', jq(this).attr('id'));
            // var k = -1;
            // for (var i=0, n=objSL.form.btns.length; i<n; i++) {
                // var og = objSL.form.btns[i];
                // console.log('i = ' + i + ', og.id = ' + objSL.form.btns[i].id);
                
                // if (jq(this).attr('id').indexOf(objSL.form.btns[i].id) >= 0) {
                    // k = i;
                    // break;
                // }
            // }
            
            if (k >= 0) {
                console.log('editing button');
                objSL.form.btns[k].submit = (val == 'submit');
            }
            else {
                console.log('adding button');
                objSL.form.btns.push({
                    id: fid.substring(fid.indexOf('_')),
                    lbl: '',
                    submit: (val == 'submit')
                });
            }
        }
        
        console.log(objSL);
    });
    
    // BUTTON: Build Suitelet
    jq('#ui-btn-build').on('click', function (e) {
        e.preventDefault();
        console.log('BUILDING SUITELET...');
        console.log(objSL);
        
        if (validateForm() == false) {
            return;
        }
        
        // Save Suitelet content into file
        objSL.id = rid;
        var reqData = {
            type: 'save',
            content: JSON.stringify(objSL)
        };
        
        var $btn = jq('#ui-btn-build');
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
        });
    });
    
    function initSLGen() {
        jq('#ui-slname').focus();
    }
    
    initSLGen();
    
})();

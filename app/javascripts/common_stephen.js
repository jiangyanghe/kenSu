/**
 * Created by stephen on 15/12/9.
 */
/**
 * Created by stephen on 2015/8/29.
 */
c = {
    lock : { },         // 普通锁
    ajaxlock : { },     // ajax锁
    wfData : null,      // 数据流
    wfIndex : 0,        // 数据流指针
    opacity : .6,       // 网站遮罩层透明度
    showBack : true,    // 显示遮罩背景层
    showLoading : true, // 显示loading示意
    goldenRatio : .382, // 黄金分割比例
    elementResize : { },// 监控改变大小
    artDialog : {       // artDialog弹出框的宽高
        width : '264px',
        height : 'auto'
    },
    zindex : {          // 层级记录
        def : 99
    },
    publicKey : 'C3654003E8660C2C03B8EAA9A7BCEFDD5573B76B0AE22AA8EAEDCDCDC15A74C54A4DC3A5EEFCA5F2913E9CACD6EA94C11F334C4103392710F52C677C227DFCD0E2E90D6099A721BF888F7D17890B84D844249088AB30D0B5D046AF5D13EB767ED96DD273FF23462D39E2AFF21DC41E75F6F8B5A19B576B1229E2F89605ADE8D3'
};

/**
 * 获取当前zindex最大值
 * @return int
 */
$.getMaxZindex = function() {
    var max = 0;
    $.each(c.zindex, function(key, val) {
        if (val > max) {
            max = val;
        }
    });
    if ($('.modal').length) {
        var modalZindex = $('.modal').css('zIndex');
        if (modalZindex > max) {
            max = modalZindex;
        }
    }
    return Number(max) + 1;
};

$.passwordEncrypt = function(password,checkcode){//密码加密
    //console.log(password);
    //console.log(checkcode);
    var key_hash = CryptoJS.MD5(checkcode);
    var key = CryptoJS.enc.Utf8.parse(key_hash);
    var iv  = CryptoJS.enc.Utf8.parse("KELISHI");
    var encrypted = CryptoJS.AES.encrypt(password, key, { iv: iv,mode:CryptoJS.mode.ECB,padding:CryptoJS.pad.ZeroPadding});
    //console.log(encrypted);
    return encrypted;
};



/**
 * 普通对话框
 * 信息弹出提示框 - 基于dialog
 * @param msg 提示内容
 * @return void
 */
$.showAlertNormal = function(title,msg){
    var zindex = $.getMaxZindex();
    c.zindex.showAlertNormal = zindex;
    var d = dialog({
        title: title,
        content: msg
    });
    d.show();
    return d;
};

/**
 * 气泡浮层
 * 信息弹出提示框 - 基于dialog
 * @param id 显示元素的Id
 * @param align 对话框显示的位置:top,right,bottom,left, left bottom
 * @param msg 提示内容
 * @return void
 */
$.showAlertPopup = function(id,align,msg){
    //alert(id);
    var zindex = $.getMaxZindex();
    var follow = document.getElementById(id);
    var d = dialog({
        align: align,
        content: msg,
        width:500,
        height:300,
        quickClose: true// 点击空白处快速关闭
    });
    d.show(follow);
};

/**
 * 确定取消对话框
 * 信息弹出提示框标准版 - 基于dialog
 * @param title 类型 提示
 * @param type 类型 success error warning
 * @param msg 提示信息
 * @param okValue 确定按钮字样
 * @param okfn 提交后的回调函数
 * @param width 弹出框的宽度，默认是300
 * @param heigth 弹出框的高度，默认是50
 * @return void
 */
$.alertConfirm = function(title,content,okfn,param,width,height){
    var zindex = $.getMaxZindex();
    c.zindex.showAlertNormal = zindex;
    var d = dialog({
        title: title,
        content: content,
        okValue: '确定',
        ok: function () {
            var result = true;
            if (okfn) {
                result = okfn(param);
            }
            if (result !== false) {
                delete c.zindex.alertConfirm;
            }
        },
        cancelValue: '取消',
        cancel: function () {
            delete c.zindex.alertConfirm;
        }
    });
    if(!width || !height){
        d.width(300);
        d.height(50);
    }else{
        d.width(width);
        d.height(height);
    }

    d.show();
    return d;
};

/**
 * 信息弹出提示框 - 基于dialog
 * @param msg 提示内容
 * @param showtime 停留时间 默认3秒
 * @return void
 */
$.showAlert = function(msg, showTime) {
    if ( msg.trim() == '') {
        return false;
    }
    var zindex = $.getMaxZindex();
    c.zindex.showAlert = zindex;
    if (!showTime)
        showTime = 3000;
    var d = dialog({
        topPercent : .25,
        fixed : true,
        align : 'bottom',
        content : msg,
        quickClose : false,
        zIndex : zindex
    });
    d.show();
    setTimeout(function() {
        d.close().remove();
        delete c.zindex.showAlert;
    },showTime);
};

/**
 * checkbox全选反选
 * @param switchObj 全选/反向对象
 * @parma obj checkbox对象
 * @param fn 选完后的回调函数
 * @param type true-全选或取消选中 false-反选
 * @return void
 */

$.actionAllCheckbox = function(switchObj, obj, fn, type) {
    if (typeof type == 'undefined') {
        type = true;
    }
    var setChecked = function(_obj, value) {
        _obj.prop('checked', value);
        _obj.attr('checked', value);
        if (fn) {
            fn($);
        }
    };

    if (type) {
        var _type = switchObj.is(':checked');
        if (_type) {
            setChecked(obj, true);
        } else {
            setChecked(obj, false);
        }
    } else {
        $.each(obj, function() {
            var _type = $(this).is(':checked');
            if (_type) {
                setChecked($(this), false);
            } else {
                setChecked($(this), true);
            }
        });
    }
};

/**
 * 获取选中的checkbox的值
 * @param checkbox的name名 如:name='userinfo' 填写userinfo即可
 * @param obj 指定对象下遍历
 * @returns array
 */
$.getCheckboxValues = function(name, obj) {
    var values = [ ];
    var option = 0;
    obj = !obj ? $('input[name="' + name + '"]') : obj
        .find('input[name="' + name + '"]');
    $.each(obj, function() {
        if ($(this).is(':checked')) {
            values.push($(this).val());
        }
    });
    return values.uniquelize();
};

/**
 * 模拟复选框 - 单个操作
 * @param obj checkbox对象
 * @param fn 选完后的回调函数
 * @param type 类型 true-选中 false-取消选中 null-反选
 * @param valueAttrName 该checkbox值放在的attr的name
 * @param valuesName 在c全局变量中存放值的数组名
 * @param checkedClassName 选中的class名
 * @return void
 */
$.actionOneFakeCheckbox = function(obj, fn, type, valueAttrName, valuesName, checkedClassName) {
    valueAttrName = obj.attr(!valueAttrName ? 'id' : valueAttrName);
    if (!valuesName) {
        valuesName = 'checks';
    }
    if (!checkedClassName) {
        checkedClassName = 'diychecked';
    }
    if (type === true) {
        type = false;
    } else if (type === false) {
        type = true;
    } else if (type == null) {
        type = obj.hasClass(checkedClassName);
    }
    if (type) {
        obj.removeClass(checkedClassName);
        if ($.inArray(valueAttrName, c[valuesName]) !== -1)
            c[valuesName] = $.delArray(c[valuesName], valueAttrName);
        if (fn) {
            fn($);
        }
    } else {
        obj.addClass(checkedClassName);
        if ($.inArray(valueAttrName, c[valuesName]) === -1)
            c[valuesName].push(valueAttrName);
        if (fn) {
            fn($);
        }
    }
};

/**
 * 模拟复选框 - 批量操作
 * @param switchObj 全选/反向对象
 * @param obj checkbox对象
 * @param fn 选后的回调函数
 * @param type 类型 true-全选或取消全选 false-反选
 * @param valueAttrName 该checkbox值放在的attr的name
 * @param valuesName 在c全局变量中存放值的数组名
 * @param checkedClassName 选中的class名
 * @return void
 */
$.actionAllFakeCheckbox = function(switchObj, obj, fn, type, valueAttrName, valuesName, checkedClassName) {
    if (typeof type == 'undefined') {
        type = true;
    }
    if (!checkedClassName) {
        checkedClassName = 'diychecked';
    }
    if (type) {
        var _type = switchObj.hasClass(checkedClassName);
        _type ? switchObj.removeClass(checkedClassName) : switchObj
            .addClass(checkedClassName);
        obj.each(function() {
            $.actionOneFakeCheckbox($(this), fn, type ? true : false,
                valueAttrName, valuesName, checkedClassName);
        });
    } else {
        obj.each(function() {
            $.actionOneFakeCheckbox($(this), fn, null, valueAttrName,
                valuesName, checkedClassName);
        });
    }
};
/**
 * 模拟复选框 - 气泡浮沉 ---验证提示
 * @param ids 操作的id
 * @param msg 操作提示
 */
$.artAlert =function(ids,msg){
    var follow = document.getElementById(ids);
    var d = dialog({
        align: 'right',
        content: msg
    });
    d.show(follow);
    setTimeout(function() {
        d.close().remove();
    },2500);
};
/**
 * 回车点击事件
 * @param funs 回车执行的fun()
 */
$.keydown = function(funs){
    document.onkeydown = function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 13) {
            funs();
        }
    };
};

/**
 * 手机信息错误提示框 - 基于dialog
 * @param msg 提示内容
 * @param showtime 停留时间 默认3秒
 * @return void
 */
$.mobileShowAlert = function(msg, showTime) {
    if ( msg.trim() == '') {
        return false;
    }
    var zindex = $.getMaxZindex();
    c.zindex.showAlert = zindex;
    if (!showTime)
        showTime = 3000;
    var d = dialog({
        topPercent : .05,
        fixed : true,
        align : 'bottom',
        content : msg,
        quickClose : false,
        zIndex : zindex,
        skin: 'errorDialog'
    });
    d.show();
    setTimeout(function() {
        d.close().remove();
        delete c.zindex.showAlert;
    },showTime);
};

/**
 * 只有确定的弹出框
 * @param title
 * @param msg
 */
$.ensureDialog = function(title,msg){
    var d = dialog({
        title: title,
        content: msg,
        cancel: false,
        width : '264px',
        height : 'auto',
        ok: function () {}
    });
    d.show();
};

/**
 * 检测input 个textarea 事件的变化
 * @type {{teardown: Function, handler: Function, add: Function, triggerChanged: Function}}
 */
$.event.special.valuechange = {

    teardown: function (namespaces) {
        $(this).unbind('.valuechange');
    },

    handler: function (e) {
        $.event.special.valuechange.triggerChanged($(this));
    },

    add: function (obj) {
        $(this).on('keyup.valuechange cut.valuechange paste.valuechange input.valuechange', obj.selector, $.event.special.valuechange.handler)
    },

    triggerChanged: function (element) {
        var current = element[0].contentEditable === 'true' ? element.html() : element.val()
            , previous = typeof element.data('previous') === 'undefined' ? element[0].defaultValue : element.data('previous')
        if (current !== previous) {
            element.trigger('valuechange', [element.data('previous')]);
            element.data('previous', current);
        }
    }
};


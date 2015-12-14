/**
 * Created by stephen on 15/12/8.
 */
$(function(){
    'use strict';
    $('.parent-menu').click(function(){
        if($(this).next('.sub-menu').hasClass('hide')){
            $(this).next('.sub-menu').removeClass('hide');
            $(this).children('.ionic-right').removeClass('glyphicon-menu-right');
            $(this).children('.ionic-right').addClass('glyphicon-menu-down');
        }else{
            $(this).next('.sub-menu').addClass('hide');
            $(this).children('.ionic-right').addClass('glyphicon-menu-right');
            $(this).children('.ionic-right').removeClass('glyphicon-menu-down');
        }
    });
    //if(currentUrl.indexOf('scan_center') >= 0 ||currentUrl.indexOf('report_center') >= 0){
    //	$('#side_list_1').removeClass('hide');
    //	if(currentUrl.indexOf('web_scan') >= 0 || currentUrl.indexOf('system_scan') >= 0){
    //		$("#side_list_1 li a").eq(0).addClass('statusActive');
    //	}else if(currentUrl.indexOf('web_report') >= 0 || currentUrl.indexOf('system_report') >= 0){
    //		$("#side_list_1 li a").eq(1).addClass('statusActive');
    //	}
    //}else if(currentUrl.indexOf('other_center') >= 0){
    //	$('#side_list_4').removeClass('hide');
    //	if(currentUrl.indexOf('login_log') >= 0){
    //		$("#side_list_4 li a").eq(1).addClass('statusActive');
    //	}else if(currentUrl.indexOf('alert_settings') >= 0){
    //		$("#side_list_4 li a").eq(0).addClass('statusActive');
    //	}
    //}
});
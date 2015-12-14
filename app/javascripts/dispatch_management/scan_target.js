/**
 * Created by stephen on 15/12/10.
 */
$(function(){
    /***
     * 查询网站Url
     */
    $('#webUrl_find').click(function(){
        var webUrl = $('#webUrl').val();
        var val = "[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?";
        var reIpe = new RegExp(val);
        if(reIpe.test(webUrl)){
            $.ajax({
                type:'GET',
                url: '',
                data:{
                    'find_server':$('#serverIP').val()
                },
                dataType: "json",
                success: function(data){
                    if(data.code === 1){
                    }else{
                    }
                }
            });
        }else{
            $('#webUrl').addClass('onError');
            $.artAlert('webUrl_find','url格式有误');
        }
    });
    $('#webUrl').focus(function(){$('#webUrl').removeClass('onError');});

    /**
     * 添加,修改扫描目标
     */
    $('#webUrl_add').click(function(){
        $('.mydialog').show(300);
        $('#pop_header').text('添加扫描目标');
        isShow('1');
    });
    var server_option = function(){
        //alert($('#start_data').val());
        $.ajax({
            type:'POST',
            url: '',
            data:{
                'web_url':$('#web_url').val(),
                'selectCategary':$("#selectCategary  option:selected").text(),
                'start_data':$('#start_data').val(),
                'time':$('#time').val()
            },
            dataType: "json",
            success: function(data){
                if(data.code === 1){
                }else{
                }
            }
        });
    };
    var isShow = function(a){
        if(a == '1'){
            $('.delete').addClass('hidden');
            $('.option').removeClass('hidden');
        }else{
            $('.option').addClass('hidden');
            $('.delete').removeClass('hidden');
        }
    };

    /**
     * 编辑按钮
     */
    $('.glyphicon-edit').click(function(){
        $('.mydialog').show(300);
        $('#pop_header').text('修改服务');
        isShow('1');
        var line = $(this).parent().parent();
        $('#web_url').val(line.find('.webUrl').text());
        //$("#selectCategary  option:selected").text(line.find('.repeatType').text());
        $('#start_data').val(line.find('.startTime').text());
        $('#time').val(line.find('.oclock').text());
    });


    $('.cancle').click(function(){
        //alert($('#cancle').attr('id'));
        $('.mydialog').hide(300);

    });
    /**
     * 确定添加扫描网站
     */
    $('#add_confirm').click(function(){
        server_option();
    });

    /**
     * 删除按钮
     */
    $('.glyphicon-trash').click(function(){
        $('.mydialog').show(300);
        $('#pop_header').text('删除');
        isShow('0');
        var line = $(this).parent().parent();
        $('#url').text(line.find('.webUrl').text());
    });
    /**
     * 确认删除
     */
    $('#delete_url').click(function(){
        alert('删除成功');
    });
});
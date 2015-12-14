/**
 * Created by stephen on 15/12/9.
 */
$(function(){
    /***
     * 查询服务器
     */
    $('#service_find').click(function(){
        var serverIP = $('#serverIP').val();
        var val = /^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/;
        var reIpe = new RegExp(val);
        if(reIpe.test(serverIP)){
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
            $('#serverIP').addClass('onError');
            $.artAlert('service_find','ip格式有误');
        }
    });
    $('#serverIP').focus(function(){$('#serverIP').removeClass('onError');});

    /**
     * 添加服务
     */
    $('#service_add').click(function(){
        $('.mydialog').show(300);
        $('#pop_header').text('添加服务');
        isShow('1');
    });
    var server_option = function(){
        $.ajax({
            type:'POST',
            url: '',
            data:{
                'server_ip':$('#server_ip').val(),
                'server_port':$('#server_port').val(),
                'MaxClients':$('#MaxClients').val(),
                'username':$('#username').val(),
                'password':$('#password').val()
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
        $('#server_ip').val(line.find('.serverIP').text());
        $('#server_port').val(line.find('.serverPort').text());
        $('#MaxClients').val(line.find('.MaxClients').text());
    });


    $('.cancle').click(function(){
        //alert($('#cancle').attr('id'));
        $('.mydialog').hide(300);

    });
    $('#confirm').click(function(){
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
        $('#ip').text(line.find('.serverIP').text());
    });
    /**
     * 确认删除
     */
    $('#delete_serve').click(function(){
        alert('删除成功');
    });

});

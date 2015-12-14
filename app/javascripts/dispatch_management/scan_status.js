/**
 * Created by stephen on 15/12/10.
 */
$(function(){
    /***
     * 查询网站Url
     */
    $('#status_find').click(function(){
        var webUrl = $('#statusUrl').val();
        var val = "[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?";
        var reIpe = new RegExp(val);
        if(reIpe.test(webUrl)){
            $.ajax({
                type:'GET',
                url: '',
                data:{
                    'find_server':webUrl
                },
                dataType: "json",
                success: function(data){
                    if(data.code === 1){
                    }else{
                    }
                }
            });
        }else{
            $('#statusUrl').addClass('onError');
            $.artAlert('status_find','url格式有误');
        }
    });
    $('#statusUrl').focus(function(){$('#webUrl').removeClass('onError');});

    /**
     * 点击眼睛查看详情
     */
    $('.glyphicon-eye-open').click(function(){
        $('.mydialog').show(300);
        var line = $(this).parent().parent();
        $('#status_url').text(line.find('.statusUrl').text());
    });
    $('.cancle').click(function(){
        $('.mydialog').hide(300);

    });


    $('.download_report').click(function(){
            alert('下载报告');
        }
    );
    $('.download_log').click(function(){
            alert('下载日志');
        }
    );
});
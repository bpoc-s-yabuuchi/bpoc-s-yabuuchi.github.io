$(function () {
    /*     $('.jsModalOpen').on('click',function(){
            $('.jsModal').fadeIn();
            return false;
        }); */
        $('.jsModalClose').on('click', function () {
            $('.jsModal').fadeOut();
            setTimeout(function () {
                $('.draggableModal').css({
                    "left": "50%",
                    "top": "50%",
                    "transform": "translate(-50%,-50%)"
                });
            }, 500);
        return false;
    });
});

// 繰り返しカスタムモーダル表示・非表示
$(function () {
    $('.jsModalOpenRepeat').on('click', function () {
        $('.youbiButton').removeClass('youbiButtonActive');
        $('.youbiButton').data('flag', '0');
        $('#modalContentRepeat').css("height", "350px");
        if($('#dayOfWeek').val() == 0){
            $('#buttonSun').addClass('youbiButtonActive');
            $('#buttonSun').data('flag', '1');
        }else if($('#dayOfWeek').val() == 1){
            $('#buttonMon').addClass('youbiButtonActive');
            $('#buttonMon').data('flag', '1');
        }else if($('#dayOfWeek').val() == 2){
            $('#buttonTue').addClass('youbiButtonActive');
            $('#buttonTue').data('flag', '1');
        }else if($('#dayOfWeek').val() == 3){
            $('#buttonWed').addClass('youbiButtonActive');
            $('#buttonWed').data('flag', '1');
        }else if($('#dayOfWeek').val() == 4){
            $('#buttonThu').addClass('youbiButtonActive');
            $('#buttonThu').data('flag', '1');
        }else if($('#dayOfWeek').val() == 5){
            $('#buttonFri').addClass('youbiButtonActive');
            $('#buttonFri').data('flag', '1');
        }else if($('#dayOfWeek').val() == 6){
            $('#buttonSat').addClass('youbiButtonActive');
            $('#buttonSat').data('flag', '1');
        }
        $('.jsModalRepeat').fadeIn();
        $('#per').text("週間ごと");
        $('.switchWeekly').css("display", "block");
        $('.switchMonthly').css("display", "none");
        $('#modal__contentRepeat').css("height", "350px");
        return false;
    });
    $('.jsModalCloseRepeat').on('click', function () {
        $('.jsModalRepeat').fadeOut();
        return false;
    });
});

// カスタム時、曜日選択用関数(日～土)
$(function () {
    $('#buttonSun').on('click',function(){
        var flg = $(this).data('flag');
        if(flg == '0'){
            $(this).addClass('youbiButtonActive');
            $(this).data('flag', '1');
        }else{
            $(this).removeClass('youbiButtonActive');
            $(this).data('flag', '0');
            setyoubi();
        }
    });
});
$(function () {
    $('#buttonMon').on('click',function(){
        var flg = $(this).data('flag');
        if(flg == '0'){
            $(this).addClass('youbiButtonActive');
            $(this).data('flag', '1');
        }else{
            $(this).removeClass('youbiButtonActive');
            $(this).data('flag', '0');
            setyoubi();
        }
    });
});
$(function () {
    $('#buttonTue').on('click',function(){
        var flg = $(this).data('flag');
        if(flg == '0'){
            $(this).addClass('youbiButtonActive');
            $(this).data('flag', '1');
        }else{
            $(this).removeClass('youbiButtonActive');
            $(this).data('flag', '0');
            setyoubi();
        }
    });
});
$(function () {
    $('#buttonWed').on('click',function(){
        var flg = $(this).data('flag');
        if(flg == '0'){
            $(this).addClass('youbiButtonActive');
            $(this).data('flag', '1');
        }else{
            $(this).removeClass('youbiButtonActive');
            $(this).data('flag', '0');
            setyoubi();
        }
    });
});
$(function () {
    $('#buttonThu').on('click',function(){
        var flg = $(this).data('flag');
        if(flg == '0'){
            $(this).addClass('youbiButtonActive');
            $(this).data('flag', '1');
        }else{
            $(this).removeClass('youbiButtonActive');
            $(this).data('flag', '0');
            setyoubi();
        }
    });
});
$(function () {
    $('#buttonFri').on('click',function(){
        var flg = $(this).data('flag');
        if(flg == '0'){
            $(this).addClass('youbiButtonActive');
            $(this).data('flag', '1');
        }else{
            $(this).removeClass('youbiButtonActive');
            $(this).data('flag', '0');
            setyoubi();
        }
    });
});
$(function () {
    $('#buttonSat').on('click',function(){
        var flg = $(this).data('flag');
        if(flg == '0'){
            $(this).addClass('youbiButtonActive');
            $(this).data('flag', '1');
        }else{
            $(this).removeClass('youbiButtonActive');
            $(this).data('flag', '0');
            setyoubi();
        }
    });
});


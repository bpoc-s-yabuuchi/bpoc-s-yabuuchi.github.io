// ----- submenu bar ----- //
function myFunction() {
    let popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}

// ----- popup ----- //
function showBalloon() {
    let wObjballoon = document.getElementById("makeImg");
    if (wObjballoon.className == "balloon1") {
        wObjballoon.className = "balloon";
    } else {
        wObjballoon.className = "balloon1";
    }
}

// ----- datepicker----- //
function sample1() {
    console.log("called init function.");
    let myDataPicker = $('#jsDatePicker').datepicker({
        language: 'jp',
        dateFormat: 'yyyy/mm/dd',
        autoClose: true
    }).data('datepicker');
    myDataPicker.selectDate(new Date());
}

function init() {
    sample1();
}

document.addEventListener("DOMContentLoaded", function () {
    init();
}, false)

// ----- 医師登録画面スキル用モーダルウィンドウ ----- //
function modal_window() {

    // スキルテキストボックス内の要素に応じてチェックを付ける
    $('input:checkbox').prop('checked', false);
    $('li').each(function () {
        let values = $(this).data('value');
        $('#' + values).prop('checked', true);
    });
    // 手技欄
    if ($('input[name="shugi_content"]').prop('checked')) {
        // チェックを付ける
        $('#shugi_all').prop('checked', true);
    }
    // 検査欄
    if ($('input[name="kensa_content"]').prop('checked')) {
        // チェックを付ける
        $('#kensa_all').prop('checked', true);
    }
    // その他欄
    if ($('input[name="sonota_content"]').prop('checked')) {
        // チェックを付ける
        $('#sonota_all').prop('checked', true);
    }
    $("html,body").animate({ scrollTop: $(this).scrollTop() }, "300");

    //body内の最後に<div id="modalBackground"></div>を挿入
    $("body").append('<div id="modalBackground"></div>');

    //画面中央を計算する関数を実行
    outerResize();
    mainResize();

    //モーダルウィンドウを表示
    $("#modalBackground,#modalOuter,#modalMain").fadeIn("slow");

    //後ろの画面か×をクリックしたらモーダルを閉じる
    $("#modalBackground,#modalClose").click(function () {
        $("#modalOuter,#modalBackground,#modalMain").fadeOut("slow", function () {
            //挿入した<div id="modalBackground"></div>を削除
            $('#modalBackground').remove();
        });
    });

    //確定ボタンをクリックしたらモーダルを閉じる
    $("#modalKakutei").click(function () {
        //------- チェックボックスの内容を反映 -------//
        // スキルの初期化
        $('.skillUl').children().remove();
        let values;
        // 手技欄チェック要素
        $('input:checkbox[name="shugi_content"]:checked').each(function () {
            let values = $(this).val();
            let id = $(this).attr('id');
            $('.skillUl').append('<li class="skillTag" data-value="' + id + '">' + values + '<div class="destroy" data-value="' + id + '">×</div></li>');
        });
        // 検査欄チェック要素
        $('input:checkbox[name="kensa_content"]:checked').each(function () {
            values = $(this).val();
            let id = $(this).attr('id');
            $('.skillUl').append('<li class="skillTag" data-value="' + id + '">' + values + '<div class="destroy" data-value="' + id + '">×</div></li>');
        });
        // その他欄チェック要素
        $('input:checkbox[name="sonota_content"]:checked').each(function () {
            values = $(this).val();
            let id = $(this).attr('id');
            $('.skillUl').append('<li class="skillTag" data-value="' + id + '">' + values + '<div class="destroy" data-value="' + id + '">×</div></li>');
        });
        //----------------------------------------//

        // スキルが選択されていない場合はプレースホルダーテキストを入れる
        $('.placeholderText').remove();
        if ($('.skillUl li').length == 0) {
            $('.skillForm').append('<div class="placeholderText">選択してください</div>');
        }

        $("#modalOuter,#modalBackground,#modalMain").fadeOut("slow", function () {
            //挿入した<div id="modalBackground"></div>を削除
            $('#modalBackground').remove();
        });

        // スキルの×ボタンを押すとそのスキルを削除する
        $(".destroy").click(function () {
            $('.skillUl').children('li[data-value=' + $(this).data('value') + ']').remove();
            $('.placeholderText').remove();

            if ($('.skillUl li').length == 0) {
                $('.skillForm').append('<div class="placeholderText">選択してください</div>');
            }
        });

    });

    // モーダルウィンドウの位置計算用関数(外側)
    $(window).resize(outerResize);
    function outerResize() {
        let w = $(window).width();
        let h = $(window).height();
        let cw = $("#modalOuter").outerWidth();
        let ch = $("#modalOuter").outerHeight();
        //取得した値をcssに追加する
        $("#modalOuter").css({
            "left": ((w - cw) / 2) + "px",
            "top": ((h - ch) / 2) + "px"
        });
    }

    // モーダルウィンドウの位置計算用関数(内側)
    $(window).resize(mainResize);
    function mainResize() {
        let w = $(window).width();
        let h = $(window).height();
        let cw = $("#modalMain").outerWidth();
        let ch = $("#modalMain").outerHeight();
        //取得した値をcssに追加する
        $("#modalMain").css({
            "left": ((w - cw) / 2) + "px",
            "top": ((h - ch) / 2 + 30) + "px"
        });
    }
};

// もし「全てにチェック」のチェックが入ったら(手技)
function shugi_allcheck() {
    if ($('#shugi_all').prop('checked')) {
        // チェックを付ける
        $('input[name="shugi_content"]').prop('checked', true);
        // もしチェックが外れたら
    } else {
        // チェックを外す
        $('input[name="shugi_content"]').prop('checked', false);
    }
};
// もし「全てにチェック」のチェックが入ったら(検査)
function kensa_allcheck() {
    if ($('#kensa_all').prop('checked')) {
        // チェックを付ける
        $('input[name="kensa_content"]').prop('checked', true);
        // もしチェックが外れたら
    } else {
        // チェックを外す
        $('input[name="kensa_content"]').prop('checked', false);
    }
};
// もし「全てにチェック」のチェックが入ったら(その他)
function sonota_allcheck() {
    if ($('#sonota_all').prop('checked')) {
        // チェックを付ける
        $('input[name="sonota_content"]').prop('checked', true);
        // もしチェックが外れたら
    } else {
        // チェックを外す
        $('input[name="sonota_content"]').prop('checked', false);
    }
};
// もし「全てにチェック」のチェックが入ったら(すべて)
function ishiAllcheck() {
    if ($('#ishiAll').prop('checked')) {
        // チェックを付ける
        $('input[name="ishi"]').prop('checked', true);
        // もしチェックが外れたら
    } else {
        // チェックを外す
        $('input[name="ishi"]').prop('checked', false);
    }
};

// --------------------------- 入力漏れチェック --------------------------- //
// 性
function input_check_sei() {
    let result = true;
    // エラー用装飾のためのクラスリセット
    $('#your_name_sei').removeClass("inp_error");

    // 入力エラー文をリセット
    $("#name_sei_error").empty();

    // 入力内容セット
    let namesei = $("#your_name_sei").val();

    // 入力内容チェック

    // お名前
    if (namesei == "") {
        $("#name_sei_error").html(" ＊お名前は必須です。");
        $("#your_name_sei").addClass("inp_error");
        result = false;
    }

    return result;
}

// 名
function input_check_mei() {
    let result = true;

    // エラー用装飾のためのクラスリセット
    $('#your_name_mei').removeClass("inp_error");

    // 入力エラー文をリセット
    $("#name_mei_error").empty();

    // 入力内容セット
    let namemei = $("#your_name_mei").val();

    // 入力内容チェック

    // お名前
    if (namemei == "") {
        $("#name_mei_error").html(" ＊お名前は必須です。");
        $("#your_name_mei").addClass("inp_error");
        result = false;
    }
    return result;
}

// フリガナセイ
function input_check_furigana_sei() {
    let result = true;
    // エラー用装飾のためのクラスリセット
    $('#your_name_furigana_sei').removeClass("inp_error");

    // 入力エラー文をリセット
    $("#furigana_sei_error").empty();

    // 入力内容セット
    let furiganasei = $("#your_name_furigana_sei").val();

    // 入力内容チェック

    // フリガナ
    if (furiganasei == "") {
        $("#furigana_sei_error").html(" ＊フリガナは必須です。");
        $("#your_name_furigana_sei").addClass("inp_error");
        result = false;
    } else if (!furiganasei.match(/^[ァ-ロワヲンー 　\r\n\t]*$/)) {
        $("#furigana_sei_error").html(" ＊フリガナは全角カタカナで入力してください。");
        $("#your_name_furigana_sei").addClass("inp_error");
        result = false;
    }
    return result;
}

// フリガナメイ
function input_check_furigana_mei() {
    let result = true;
    // エラー用装飾のためのクラスリセット
    $('#your_name_furigana_mei').removeClass("inp_error");

    // 入力エラー文をリセット
    $("#furigana_mei_error").empty();

    // 入力内容セット
    let furiganasei = $("#your_name_furigana_sei").val();
    let furiganamei = $("#your_name_furigana_mei").val();

    // 入力チェック

    // フリガナ
    if (furiganamei == "") {
        $("#furigana_mei_error").html(" ＊フリガナは必須です。");
        $("#your_name_furigana_mei").addClass("inp_error");
        result = false;
    } else if (!furiganasei.match(/^[ァ-ロワヲンー 　\r\n\t]*$/)) {
        $("#furigana_mei_error").html(" ＊フリガナは全角カタカナで入力してください。");
        $("#your_name_furigana_mei").addClass("inp_error");
        result = false;
    }

    return result;
}

// 電話番号
function input_check_phone() {
    let result = true;
    // エラー用装飾のためのクラスリセット
    $('#phone_no').removeClass("inp_error");

    // 入力エラー文をリセット
    $("#phoneno_error").empty();

    // 入力内容セット
    let phoneno = $("#phone_no").val().replace(/[━.*‐.*―.*－.*\–.*ー.*\-]/gi, '');

    // 入力内容チェック

    // 電話番号
    if (phoneno == "") {
        $("#phoneno_error").html(" ＊電話番号は必須です。");
        $("#phone_no").addClass("inp_error");
        result = false;
    } else if ((!phoneno.match(/^[0-9]+$/)) || (phoneno.length < 10)) {
        $('#phoneno_error').html(" ＊正しい電話番号を入力してください。");
        $("#phone_no").addClass("inp_error");
        result = false;
    }

    return result;
}

// メールアドレス
function input_check_mail() {
    let result = true;
    // エラー用装飾のためのクラスリセット
    $('#mail_address').removeClass("inp_error");

    // 入力エラー文をリセット
    $("#mailaddress_error").empty();

    // 入力内容セット
    let mailaddress = $("#mail_address").val();

    // 入力内容チェック

    // メールアドレス
    if (mailaddress == "") {
        $("#mailaddress_error").html(" ＊メールアドレスは必須です。");
        $("#mail_address").addClass("inp_error");
        result = false;
    } else if (!mailaddress.match(/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/)) {
        $('#mailaddress_error').html(" ＊正しいメールアドレスを入力してください。");
        $("#mail_address").addClass("inp_error");
        result = false;
    } else if (mailaddress.length > 255) {
        $('#mailaddress_error').html(" ＊正しいメールアドレスを入力してください。");
        $("#mail_address").addClass("inp_error");
        result = false;
    }
    return result;
}

// 郵便番号
function input_check_zip() {
    let result = true;
    // エラー用装飾のためのクラスリセット
    $('#zip11').removeClass("inp_error");

    // 入力エラー文をリセット
    $("#zip11_error").empty();

    // 職種が医者の時のみ
    if ($('input[name="job"]').prop("checked") && $('#doctor').prop("checked")) {

        // 入力内容セット
        let zip11 = $("#zip11").val();

        // 入力内容チェック

        // 郵便番号
        if (zip11 == "") {
            $("#zip11_error").html(" ＊郵便番号は必須です。");
            $("#zip11").addClass("inp_error");
            result = false;
        }

    }
    return result;
}

// 住所
function input_check_address() {
    let result = true;
    // エラー用装飾のためのクラスリセット
    $('#addr11').removeClass("inp_error");

    // 入力エラー文をリセット
    $("#addr11_error").empty();

    // 職種が医者の時のみ
    if ($('input[name="job"]').prop("checked") && $('#doctor').prop("checked")) {

        // 入力内容セット
        let addr11 = $("#addr11").val();

        // 入力内容チェック

        // 住所
        if (addr11 == "") {
            $("#addr11_error").html(" ＊住所は必須です。");
            $("#addr11").addClass("inp_error");
            result = false;
        }
    }
    return result;
};

// 職業ラジオボタン
function input_check_job() {
    let result = true;
    // エラー用装飾のためのクラスリセット
    $('input[name="job"]').removeClass("inp_error");

    // 入力エラー文をリセット
    $("#job_error").empty();

    // 入力内容セット
    let job = $("input[name='job']:checked").val();

    // 入力内容チェック

    // 職種
    if (job != "on") {
        $("#job_error").html(" ＊職種は必須です。");
        $('input[name="job"]').addClass("inp_error");
        result = false;
    }
    return result;
};

// 一番上までスクロールする
function pagetop() {
    $("html,body").animate({ scrollTop: 0 }, "300");
};

// 一番最初の入力漏れ項目にフォーカスを当てる
function focus_error() {
    if ($('#name_sei_error').html() != "") {
        document.getElementById('your_name_sei').focus();
    } else if ($('#name_mei_error').html() != "") {
        document.getElementById('your_name_mei').focus();
    } else if ($('#furigana_sei_error').html() != "") {
        document.getElementById('your_name_furigana_sei').focus();
    } else if ($('#furigana_mei_error').html() != "") {
        document.getElementById('your_name_furigana_mei').focus();
    } else if ($('#phoneno_error').html() != "") {
        document.getElementById('phone_no').focus();
    } else if ($('#mailaddress_error').html() != "") {
        document.getElementById('mail_address').focus();
    } else if ($('#zip11_error').html() != "") {
        document.getElementById('zip11').focus();
    } else if ($('#addr11_error').html() != "") {
        document.getElementById('addr11').focus();
    }
};
// --------------------------- 入力漏れチェック ここまで--------------------------- //

// --------------------------- 職業ラジオボタン変更時の挙動 --------------------------- //
// 画面読み込み時何も表示しない
function load_func() {
    $(".doctorData").css({
        "display": "none"
    });
    $(".nurseData").css({
        "display": "none"
    });
};
// 「医師」がチェックされたとき医師用のフォームを表示
function doctor_switch() {
    $(".doctorData").css({
        "display": "block"
    });
    $(".nurseData").css({
        "display": "none"
    });
}
// 「看護師(管理職)」がチェックされたとき医師用、看護師用のフォームを非表示
function none_switch() {
    $(".doctorData").css({
        "display": "none"
    });
    $(".nurseData").css({
        "display": "none"
    });
}
// 「看護師」がチェックされたとき看護師用のフォームを表示
function nurse_switch() {
    $(".doctorData").css({
        "display": "none"
    });
    $(".nurseData").css({
        "display": "block"
    });
}
// --------------------------- 職業ラジオボタン変更時の挙動 ここまで --------------------------- //

// fullcalendarの基本設定
document.addEventListener('DOMContentLoaded', function () {
    // id="calendar"を探してcalendarElに格納
    let calendarEl = document.getElementById('calendar');

    let calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek'
        },
        locale: 'ja', // 日本語対応
        navLinks: true, // can click day/week names to navigate views
        selectable: true, // 日付をドラッグで選択可能にする
        selectMirror: true, // ドラッグ中にイベント用のボックスを描画する
        nowIndicator: true, // 現在時刻を赤色の線で表示する
        editable: true, // 編集可能にする
        dayMaxEvents: true, // allow "more" link when too many events
        allDaySlot: true, // 終日スロットを表示する
        eventTimeFormat: { hour: 'numeric', minute: '2-digit' }, // イベント内の時間を「hh:mm」表示に固定
        contentHeight: 700,
        dayCellContent: function (e) {
            e.dayNumberText = e.dayNumberText.replace('日', ''); // 「１日」「５日」などを「１」「５」表記にする
        },
        // イベントクリック
        eventClick: function (info) {
            // モーダルの初期化
            formatMordal();
            // タイトル
            let title;
            if (info.event.title) {
                title = info.event.title;
            }
            // 名前
            let name;
            if (info.event.extendedProps.name) {
                name = info.event.extendedProps.name;
            }

            // イベント開始の日付と時刻を取得
            let startEventTime = info.event.start;
            let startYear;
            let startMonth;
            let startDay;
            let startDate;
            let startHour;
            let startMinutes;
            let startTime;
            if (startEventTime) {
                // 開始日付
                startYear = startEventTime.getFullYear();
                startMonth = ('00' + parseInt(startEventTime.getMonth() + 1)).slice(-2);
                startDay = ('00' + startEventTime.getDate()).slice(-2);
                startDate = startYear + '/' + startMonth + '/' + startDay;
                // 開始時刻
                startHour = ('00' + startEventTime.getHours()).slice(-2);
                startMinutes = ('00' + startEventTime.getMinutes()).slice(-2);
                startTime = startHour + ':' + startMinutes;
            }

            // イベント終了の日付と時刻を取得
            let endEventTime = info.event.end;
            let endYear;
            let endMonth;
            let endDay;
            let endDate;
            let endHour;
            let endMinutes;
            let endTime;
            if (endEventTime){
                // 終了日付
                endYear = endEventTime.getFullYear();
                endMonth = ('00' + parseInt(endEventTime.getMonth() + 1)).slice(-2);
                endDay = ('00' + endEventTime.getDate()).slice(-2);
                endDate = endYear + '/' + endMonth + '/' + endDay;
                // 終了時刻
                endHour = ('00' + endEventTime.getHours()).slice(-2);
                endMinutes = ('00' + endEventTime.getMinutes()).slice(-2);
                endTime = endHour + ':' + endMinutes;
            }
            // let spendTime;
            // if (info.event.end) {
            //     // 所要時間の計算
            //     endEventTime = info.event.end;
            //     spendTime = calcSpendTime(startEventTime, endEventTime);
            // }

            // タイトルの設定
            $('#titleText').val(title);

            // 名前の設定
            if (typeof name === "undefined") {
                $('#name').text("選択してください");
                $('#name').css({
                    'color': '#bdbaba'
                });
            } else {
                $('#name').text(name);
                $('#name').css({
                    'color': '#000'
                });
            }

            // 開始日付の設定
            if (startDate) {
                $('#jsDatePickerStart').val(startDate);
                $('#jsDatePickerMemoStart').val(startDate);
                $('#year').val(startYear);
                $('#month').val(startMonth);
                $('#day').val(startDay);
            }
            //開始時刻の設定
            if (startTime) {
                $('#startTime').text(startTime);
                $('#startTime').css({
                    'color': '#000'
                });
            }

            // 終了日付の設定
            if (endDate) {
                $('#jsDatePickerEnd').val(endDate);
                $('#jsDatePickerMemoEnd').val(endDate);
                $('#endYear').val(endYear);
                $('#endMonth').val(endMonth);
                $('#endDay').val(endDay);
            }
            // 終了時刻の設定
            if (endTime) {
                $('#endTime').text(endTime);
                $('#endTime').css({
                    'color': '#000'
                });
            }


            // 所要時間の設定
            // if (spendTime) {
            //     $('input[name="spendTime"]').val(spendTime);
            // }

            // 曜日の取得と設定 // 週番号の取得
            youbiSet(info.event);

            // 繰り返しの設定
            // repeatTypeは自分で設定したものなので、googleカレンダーから参照しているイベントについては現状設定できない
            // googleカレンダーの繰り返し設定のidのような要素を見つけないといけない
            let repeat;
            if (info.event.extendedProps.repeatType) {
                repeat = info.event.extendedProps.repeatType;
                if (repeat == "毎週○曜日") {
                    $('#kurikaeshi').text("毎週" + $('#youbi').val() + "曜日");
                } else if (repeat == "毎月第1○曜日") {
                    $('#kurikaeshi').text("毎月第" + $('#weekNo').val() + $('#youbi').val() + "曜日");
                } else if (repeat == "毎月第1第3○曜日") {
                    $('#kurikaeshi').text("毎月第1第3" + $('#youbi').val() + "曜日");
                } else if (repeat == "毎月第2第4○曜日") {
                    $('#kurikaeshi').text("毎月第2第4" + $('#youbi').val() + "曜日");
                } else {
                    $('#kurikaeshi').text(repeat);
                }
                $('input:hidden[name="kurikaeshi"]').val(repeat);
                $('#kurikaeshi').css({
                    'color': '#000'
                });
            }

            // モーダルの表示
            $('.jsModalClose').fadeIn();
            $('.jsModal').fadeIn();

            // カレンダーとイベントの属性を引数としてイベント登録・編集用関数呼び出し
            let eventId = info.event;
            modal_eventEdit(calendar, eventId);
            return false;
        },

        // カレンダー上でドラッグ＆ドロップ(月表示、週表示どちらでもOK)
        select: function (selectionInfo) {
            // ラジオボタン、チェックボックス等の初期化
            formatMordal();
            // 名前の初期化
            $('#name').text("選択してください");
            $('#name').css({
                'color': '#bdbaba'
            });

            // 開始日付の設定
            let startYear = selectionInfo.start.getFullYear();
            let startMonth = ('00' + parseInt(selectionInfo.start.getMonth() + 1)).slice(-2);
            let startDay = ('00' + selectionInfo.start.getDate()).slice(-2);
            let startDate = startYear + '/' + startMonth + '/' + startDay;
            $('#jsDatePickerStart').val(startDate);
            $('#jsDatePickerMemoStart').val(startDate);
            $('#year').val(startYear);
            $('#month').val(startMonth);
            $('#day').val(startDay);

            // 開始時刻の設定
            let startHour = ('00' + selectionInfo.start.getHours()).slice(-2);
            let startMinutes = ('00' + selectionInfo.start.getMinutes()).slice(-2);
            let startTime = startHour + ':' + startMinutes;
            $('#startTime').text(startTime);
            $('#startTime').css({
                'color': '#000'
            });

            // 終了日付の設定
            let endYear = selectionInfo.end.getFullYear();
            let endMonth = ('00' + parseInt(selectionInfo.end.getMonth() + 1)).slice(-2);
            let endDay = ('00' + selectionInfo.end.getDate()).slice(-2);
            let endDate = endYear + '/' + endMonth + '/' + endDay;
            $('#jsDatePickerEnd').val(endDate);
            $('#jsDatePickerMemoEnd').val(endDate);
            $('#endYear').val(endYear);
            $('#endMonth').val(endMonth);
            $('#endDay').val(endDay);

            // 終了時刻の設定
            let endHour = ('00' + selectionInfo.end.getHours()).slice(-2);
            let endMinutes = ('00' + selectionInfo.end.getMinutes()).slice(-2);
            let endTime = endHour + ':' + endMinutes;
            $('#endTime').text(endTime);
            $('#endTime').css({
                'color': '#000'
            });

            // 所要時間の設定
            // let spendTime = calcSpendTime(selectionInfo.start, selectionInfo.end);
            // $('input[name="spendTime"]').val(spendTime);

            // 曜日の取得と設定 // 週番号の取得
            youbiSet(selectionInfo);
            $('input:hidden[name="kurikaeshi"]').val('選択してください');
            $('#kurikaeshi').text('選択してください');
            $('#kurikaeshi').css({
                'color': '#bdbaba'
            });

            // モーダルを表示
            $('.jsModalClose').fadeIn();
            $('.jsModal').fadeIn();
            // 新規イベント詳細関数呼び出し
            modal_eventNew(calendar, selectionInfo);
            return false;
        },

        googleCalendarApiKey: 'AIzaSyDI8dpm3k16HuxbDb5O3rflWyzdT84rG4g', // グーグルカレンダーAPIを取得
        events: 'h3cmm5v4748trjp0bqiv1ah86s@group.calendar.google.com' // グーグルカレンダーから予定を参照

    });
    calendar.updateSize();
    calendar.render();
});

// --------------------------- スケジュール画面イベント詳細モーダルウィンドウ --------------------------- //
// 新規
function modal_eventNew(calendar) {
    //更新ボタンをクリックしたらイベント追加後モーダルを閉じる
    $("#koshinButton").click(function () {
        if ($("#koshinButton").data("active") == "true") {
            // 名前
            let name = "";
            if ($('#name').text() != "選択してください") {
                name = $('#name').text();
            }
            // タイトル
            let title = "";
            if ($('#titleText').val() != "") {
                title = $('#titleText').val();
            }

            // 日付
            let startDate = $('#jsDatePickerStart').val();
            let endDate = $('#jsDatePickerEnd').val();

            // 日付プラス1日を用意（テスト）
            let endDatePlus = endDate;
            endDatePlus.split('-');
            endDate[2] = parseInt(endDatePlus[2], 10);


            // 開始時刻、所要時間、終了時刻
            let startTime = $('#startTime').text();
            let endTime = $('#endTime').text();
            let splitStartTime = startTime.split(':');
            let splitEndTime = endTime.split(':');
            let startTimeM = parseInt(splitStartTime[0], 10) * 60 + parseInt(splitStartTime[1], 10);
            let endTimeM = parseInt(splitEndTime[0], 10) * 60 + parseInt(splitEndTime[1], 10);

            // 比較する日付オブジェクトを２つ定義する
            let day1 = new Date(startDate);
            let day2 = new Date(endDate);
            // 差日を求める（86,400,000ミリ秒＝１日）
            let termDay = (day2 - day1) / 86400000;
            // 所要時間
            let spendTime = termDay * 24 * 60 + (endTimeM - startTimeM);
            
            // 日付テキストボックス内の値をfullcalendar用の日付フォーマットに変換
            startDate = startDate.split('/');
            startDate = startDate.join('-');
            endDate = endDate.split('/');
            endDate = endDate.join('-');

            // if (startTime) {
            //     // 開始時刻を':'で「時間」と「分」に分割
            //     let startTimeWords = startTime.split(':');
            //     let startTimeHour = startTimeWords[0];
            //     let startTimeMinutes = startTimeWords[1];

            //     // 所要時間を「時間」と「分」に再計算
            //     let spendTimeInt = parseInt(spendTime, 10);
            //     let spendTimeHour = parseInt(spendTimeInt / 60);
            //     let spendTimeMinutes = spendTimeInt % 60;

            //     // 開始時刻と所要時間から終了時刻を求める   日をまたぐことを考えるべきか？
            //     let hour = parseInt(startTimeHour) + spendTimeHour;
            //     let twentyfour = hour / 24;
            //     hour = hour - (24 * parseInt(twentyfour));
            //     let minutes = parseInt(startTimeMinutes) + spendTimeMinutes;

            //     // 終了時刻
            //     endTime = ('00' + hour).slice(-2) + ":" + ('00' + minutes).slice(-2);
            // }


            // 繰り返しタイプ
            let repeatType = $('input:hidden[name="kurikaeshi"]').val();

            // 曜日
            let dayOfWeek = $("#dayOfWeek").val();
            let byWeekDay = $("#byWeekDay").val();

            // 往診場所
            let elements = document.getElementsByName("radioplace");
            let a;
            for (i = elements.length; i--;) {
                if (elements[i].checked) {
                    a = elements[i].value;
                    break;
                }
            }
            let placeName;
            let place1 = $('#oushinClinic').text();
            let place2 = $('#oushinHome').text();
            if (a == "select"){
                if (place1 == "選択してください") place1 = "";
                if (place2 == "選択してください") place2 = "";
                placeName = place1 + ',' + place2;

                if (placeName == ",") placeName = "";
            } else if (a == "input"){
                placeName = $('#pac-input').val();
            } else {
                placeName = "";
            }

            // 説明メモ
            let memo = $('#message').val();

            // イベント追加
            if (repeatType == "選択してください") {
                // 設定時間が24時間（1440分）以上の時終日イベントにする
                if (spendTime >= 1440) {
                    if (startTime == "00:00" && endTime == "00:00") { // 開始時間と終了時間が00:00の時は終日として扱う
                        calendar.addEvent({
                            id: title + ' ' + name + ' ' + startDate + ' ' + startTime + ' ' + endDate + ' ' + endTime, // id
                            title: title, // タイトル
                            start: startDate + ' ' + startTime, // 開始日時
                            end: endDate + ' ' + endTime, // 終了日時
                            startTrue: startTime,
                            endTrue: endTime,
                            name: name, // 名前
                            repeatType: "繰り返しなし", // 繰り返しの種類
                            placeName: placeName, // 場所名
                            memo: memo, // メモ内容
                            allDay: true // 終日判定
                        });
                    } else {
                        calendar.addEvent({
                            id: title + ' ' + name + ' ' + startDate + ' ' + startTime + ' ' + endDate + ' ' + endTime, // id
                            title: title, // タイトル
                            start: startDate + ' ' + startTime, // 開始日時
                            end: endDate + ' ' + endTime, // 終了日時
                            name: name, // 名前
                            placeName: placeName, // 場所名
                            memo: memo, // メモ内容
                            repeatType: "繰り返しなし",
                        });
                    }
                } else {
                    calendar.addEvent({
                        id: title + ' ' + name + ' ' + startDate + ' ' + startTime + ' ' + endDate + ' ' + endTime, // id
                        title: title, // タイトル
                        start: startDate + ' ' + startTime, // 開始日時
                        end: endDate + ' ' + endTime, // 終了日時
                        name: name, // 名前
                        placeName: placeName, // 場所名
                        memo: memo, // メモ内容
                        repeatType: "繰り返しなし",
                    });
                }
            } else if (repeatType == "繰り返しなし") {
                // 設定時間が24時間（1440分）以上の時終日イベントにする
                if (spendTime >= 1440) {
                    if (startTime == "00:00" && endTime == "00:00") { // 開始時間と終了時間が00:00の時は終日として扱う
                        calendar.addEvent({
                            id: title + ' ' + name + ' ' + startDate + ' ' + startTime + ' ' + endDate + ' ' + endTime, // id
                            title: title, // タイトル
                            start: startDate + ' ' + startTime, // 開始日時
                            end: endDate + ' ' + endTime, // 終了日時
                            name: name, // 名前
                            repeatType: "繰り返しなし", // 繰り返しの種類
                            placeName: placeName, // 場所名
                            memo: memo, // メモ内容
                            allDay: true // 終日判定
                        });
                    } else {
                        calendar.addEvent({
                            id: title + ' ' + name + ' ' + startDate + ' ' + startTime + ' ' + endDate + ' ' + endTime, // id
                            title: title, // タイトル
                            start: startDate + ' ' + startTime, // 開始日時
                            end: endDate + ' ' + endTime, // 終了日時
                            name: name, // 名前
                            placeName: placeName, // 場所名
                            memo: memo, // メモ内容
                            repeatType: "繰り返しなし",
                        });
                    }
                } else {
                    calendar.addEvent({
                        id: title + ' ' + name + ' ' + startDate + ' ' + startTime + ' ' + endDate + ' ' + endTime, // id
                        title: title, // タイトル
                        start: startDate + ' ' + startTime, // 開始日時
                        end: endDate + ' ' + endTime, // 終了日時
                        name: name, // 名前
                        placeName: placeName, // 場所名
                        memo: memo, // メモ内容
                        repeatType: "繰り返しなし",
                    });
                }
            } else if (repeatType == "毎日") {
                calendar.addEvent({
                    id: name + ' ' + startDate + ' ' + startTime + ' ' + endTime,
                    title: title,
                    startTime: startTime,
                    endTime: endTime,
                    name: name,
                    placeName: placeName, // 場所名
                    memo: memo, // メモ内容
                    daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
                    startRecur: startDate,
                    repeatType: "毎日"
                });
            } else if (repeatType == "毎週○曜日") {
                calendar.addEvent({
                    id: name + ' ' + startDate + ' ' + startTime + ' ' + endTime,
                    title: title,
                    startTime: startTime,
                    endTime: endTime,
                    name: name,
                    placeName: placeName, // 場所名
                    memo: memo, // メモ内容
                    daysOfWeek: [dayOfWeek],
                    startRecur: startDate,
                    repeatType: "毎週○曜日"
                });
            } else if (repeatType == "毎月第1○曜日") {
                let frequency = 'monthly';
                let days = $('#byWeekDay').val();
                let weekNo = $('#weekNo').val();
                calendar.addEvent({
                    id: name + ' ' + startDate + ' ' + startTime + ' ' + endTime,
                    title: title,
                    rrule: {
                        freq: frequency,
                        interval: 1,
                        bysetpos: weekNo, // 月の第何週目かを指定
                        byweekday: days,
                        dtstart: startDate + 'T' + startTime + ':00',
                    },
                    name: name,
                    placeName: placeName, // 場所名
                    memo: memo, // メモ内容
                    repeatType: "毎月第1○曜日"
                });
            } else if (repeatType == "毎月第1第3○曜日") {
                let frequency = 'monthly';
                let days = $('#byWeekDay').val();
                let weekNo = [1, 3];
                calendar.addEvent({
                    id: name + ' ' + startDate + ' ' + startTime + ' ' + endTime,
                    title: title,
                    rrule: {
                        freq: frequency,
                        interval: 1,
                        bysetpos: weekNo, // 月の第何週目かを指定
                        byweekday: days,
                        dtstart: startDate + 'T' + startTime + ':00',
                    },
                    name: name,
                    placeName: placeName, // 場所名
                    memo: memo, // メモ内容
                    repeatType: "毎月第1第3○曜日"
                });
            } else if (repeatType == "毎月第2第4○曜日") {
                let frequency = 'monthly';
                let days = $('#byWeekDay').val();
                let weekNo = [2, 4];
                calendar.addEvent({
                    id: name + ' ' + startDate + ' ' + startTime + ' ' + endTime,
                    title: title,
                    rrule: {
                        freq: frequency,
                        interval: 1,
                        bysetpos: weekNo, // 月の第何週目かを指定
                        byweekday: days,
                        dtstart: startDate + 'T' + startTime + ':00',
                    },
                    name: name,
                    placeName: placeName, // 場所名
                    memo: memo, // メモ内容
                    repeatType: "毎月第2第4○曜日"
                });
            } else if (repeatType == "毎週平日(月～金曜日)") {
                calendar.addEvent({
                    id: name + ' ' + startDate + ' ' + startTime + ' ' + endTime,
                    title: title,
                    startTime: startTime,
                    endTime: endTime,
                    name: name,
                    placeName: placeName, // 場所名
                    memo: memo, // メモ内容
                    daysOfWeek: [1, 2, 3, 4, 5],
                    startRecur: startDate,
                    repeatType: "毎週平日(月～金曜日)"
                });
            } else if (repeatType == "カスタム1") {
                let interval = parseInt($('input[name=repeatSpan]').val(), 10); // 頻度
                let duration = "00:30"; // イベントの所要時間
                let untilDate = ''; // 繰り返しイベントの終了日時
                let count = ''; // 繰り返しイベントの繰り返し回数
                // 繰り返し終了日や繰り返し回数の有無
                let elements = document.getElementsByName("endDate");
                let a = "";
                for (i = elements.length; i--;) {
                    if (elements[i].checked) {
                        a = elements[i].value;
                        break;
                    }
                }
                // 繰り返し終了日
                if (a == "endDay") {
                    untilDatePicker = $('#jsDatePickerRepeat').val();
                    if (untilDatePicker != "") {
                        untilDatePicker = untilDatePicker.split('/');
                        untilDatePicker = untilDatePicker.join('-');
                        untilDate = untilDatePicker;
                    }
                }
                // 繰り返し回数 
                else if (a == "repeat") {
                    count = parseInt($('input[name=repeatCount]').val(), 10);
                }

                if ($('#per').text() == "日ごと") {
                    frequency = 'daily';
                    calendar.addEvent({
                        id: name + ' ' + startDate + ' ' + startTime + ' ' + endTime,
                        title: title,
                        rrule: {
                            freq: frequency,
                            interval: interval,
                            dtstart: startDate + 'T' + startTime + ':00',
                            until: untilDate,
                            count: count
                        },
                        duration: duration,
                        name: name,
                        placeName: placeName, // 場所名
                        memo: memo, // メモ内容
                        repeatType: "カスタム1"
                    });
                } else if ($('#per').text() == "週間ごと") {
                    frequency = 'weekly';
                    youbiflag = $('#youbiflag').val();
                    let day = [];
                    if (youbiflag[0] == "1") {
                        day.push('su');
                    } if (youbiflag[1] == "1") {
                        day.push('mo');
                    } if (youbiflag[2] == "1") {
                        day.push('tu');
                    } if (youbiflag[3] == "1") {
                        day.push('we');
                    } if (youbiflag[4] == "1") {
                        day.push('th');
                    } if (youbiflag[5] == "1") {
                        day.push('fr');
                    } if (youbiflag[6] == "1") {
                        day.push('sa');
                    }
                    calendar.addEvent({
                        id: name + ' ' + startDate + ' ' + startTime + ' ' + endTime,
                        title: title,
                        rrule: {
                            freq: frequency,
                            interval: interval,
                            byweekday: day,
                            dtstart: startDate + 'T' + startTime + ':00',
                            until: untilDate,
                            count: count
                        },
                        duration: duration,
                        name: name,
                        placeName: placeName, // 場所名
                        memo: memo, // メモ内容
                        repeatType: "カスタム1"
                    });
                } else if ($('#per').text() == "か月ごと") {
                    frequency = 'monthly';
                    if ($('input:hidden[name="perMonth"]').val() == "毎月○日") {
                        calendar.addEvent({
                            id: name + ' ' + startDate + ' ' + startTime + ' ' + endTime,
                            title: title,
                            rrule: {
                                freq: frequency,
                                interval: interval,
                                dtstart: startDate + 'T' + startTime + ':00',
                                until: untilDate,
                                count: count
                            },
                            duration: duration,
                            name: name,
                            placeName: placeName, // 場所名
                            memo: memo, // メモ内容
                            repeatType: "カスタム1"
                        });
                    } else {
                        let dayMonth = $('#byWeekDay').val();
                        let weekNoMonth = $('#weekNo').val();
                        calendar.addEvent({
                            id: name + ' ' + startDate + ' ' + startTime + ' ' + endTime,
                            title: title,
                            rrule: {
                                freq: frequency,
                                interval: interval,
                                bysetpos: weekNoMonth, // 月の第何週目かを指定
                                byweekday: dayMonth,
                                dtstart: startDate + 'T' + startTime + ':00',
                                until: untilDate,
                                count: count
                            },
                            duration: duration,
                            name: name,
                            placeName: placeName, // 場所名
                            memo: memo, // メモ内容
                            repeatType: "カスタム1"
                        });
                    }

                } else if ($('#per').text() == "年ごと") {
                    frequency = 'yearly';
                    calendar.addEvent({
                        id: name + ' ' + startDate + ' ' + startTime + ' ' + endTime,
                        title: title,
                        rrule: {
                            freq: frequency,
                            interval: interval,
                            dtstart: startDate + 'T' + startTime + ':00',
                            until: untilDate,
                            count: count
                        },
                        duration: duration,
                        name: name,
                        placeName: placeName, // 場所名
                        memo: memo, // メモ内容
                        repeatType: "カスタム1"
                    });
                }

            }

            // モーダルの非表示
            $('.jsModal').fadeOut();

            calendar.event.remove();
            calendar.render();
            return false;
        }
    });


    // 削除ボタンクリック
    $('#sakujoButton').click(function () {
        $('.jsModal').fadeOut();
        return false;
    });

    return false;
};

// 編集
function modal_eventEdit(calendar, eventId) {

    // 編集はsetOO的な奴で更新する

    //更新ボタンをクリックしたらイベント追加後モーダルを閉じる
    $("#koshinButton").click(function () {
        if ($("#koshinButton").data("active") == "true") {
        // 開始時刻、所要時間、終了時刻
        let startTime = $('#startTime').text();
        // let spendTime = $('input[name="spendTime"]').val();
        let endTime = $('#endTime').text();

        // if (startTime) {
        //     // 開始時刻を':'で「時間」と「分」に分割
        //     let startTimeWords = startTime.split(':');
        //     let startTimeHour = startTimeWords[0];
        //     let startTimeMinutes = startTimeWords[1];

        //     // 所要時間を「時間」と「分」に再計算
        //     let spendTimeInt = parseInt(spendTime, 10);
        //     let spendTimeHour = parseInt(spendTimeInt / 60);
        //     let spendTimeMinutes = spendTimeInt % 60;

        //     // 開始時刻と所要時間から終了時刻を求める   日をまたぐことを考えるべきか？
        //     let hour = parseInt(startTimeHour) + spendTimeHour;
        //     let twentyfour = hour / 24;
        //     hour = hour - (24 * parseInt(twentyfour));
        //     let minutes = parseInt(startTimeMinutes) + spendTimeMinutes;

        //     // 終了時刻
        //     endTime = ('00' + hour).slice(-2) + ":" + ('00' + minutes).slice(-2);
        // }

        // 日付テキストボックス内の値をfullcalendar用の日付フォーマットに変換
        let startDate = $('#jsDatePickerStart').val();
        startDate = startDate.split('/');
        startDate = startDate.join('-');
        let endDate = $('#jsDatePickerStart').val();
        endDate = endDate.split('/');
        endDate = endDate.join('-');

        let name = "";
        // イベント追加
        if ($('#name').text() != "選択してください") {
            name = $('#name').text();
        }
        calendar.addEvent({
            id: name + ' ' + date + ' ' + startTime + ' ' + endTime,
            title: name,
            start: date + ' ' + startTime,
            end: date + ' ' + endTime,
            name: name
        });
        $('.jsModal').fadeOut();

        // $("#calendar").fullcalendar("rerenderEvents"); // 最初のイベントだけ編集される
        calendar.event.remove();
        // calendar.render();
        return false;
    }
    });

    // 削除ボタンクリック // ★
    $('#sakujoButton').click(function () {
        // let eventRemove = calendar.getEventById(evntId.id);
        // eventRemove.remove(); // nullになるのでnull以外を削除
        eventId.remove();
        $('.jsModal').fadeOut();
        // calendar.event.remove(); //これを有効にするとそのページで１番初めにクリックしたイベントの情報だけ残る
        return false;
    });

    return false;
};
// --------------------------- スケジュール画面モーダルウィンドウ ここまで --------------------------- //

// 往診場所ラジオボタン変更時の挙動
function switch_radio() {
    let switchBtnId = $('input[name=radioplace]:checked').val();

    if (switchBtnId == "select") { // 「指定のクリニックから選ぶ」を選択時、ドロップダウンリストを表示
        $(".switchSelect").fadeIn(0);
        $(".switchInput").fadeOut(0);
    } else if (switchBtnId == "input") { // 「直接往診場所名を入力する」を選択時、テキストボックスを表示
        $(".switchInput").css({
            "visibility": "visible",
            "margin-top": "0px",
            "margin-bottom": "0px"
        });
        $(".switchSelect").fadeOut(0);
        $(".switchInput").fadeIn(0);
    } else {
        $(".switchSelect").fadeOut(0);
        $(".switchInput").fadeOut(0);
    }
}

// 所要時間計算用関数
function calcSpendTime(startEventTime, endEventTime) {
    // 開始の日付
    let startYear = startEventTime.getFullYear();
    let startMonth = ('00' + parseInt(startEventTime.getMonth() + 1)).slice(-2);
    let startDay = ('00' + startEventTime.getDate()).slice(-2);
    let startDate = startYear + '/' + startMonth + '/' + startDay;
    // 開始の時刻
    let startHour = parseInt(startEventTime.getHours() * 60);
    let startMinutes = parseInt(startEventTime.getMinutes());
    let startTime = startHour + startMinutes;

    // 終了の日付
    let endYear = endEventTime.getFullYear();
    let endMonth = ('00' + parseInt(endEventTime.getMonth() + 1)).slice(-2);
    let endDay = ('00' + endEventTime.getDate()).slice(-2);
    let endDate = endYear + '/' + endMonth + '/' + endDay;
    // 終了の時刻
    let endHour = parseInt(endEventTime.getHours() * 60);
    let endMinutes = parseInt(endEventTime.getMinutes());
    let endTime = endHour + endMinutes;

    // 比較する日付オブジェクトを２つ定義する
    let day1 = new Date(startDate);
    let day2 = new Date(endDate);

    // 差日を求める（86,400,000ミリ秒＝１日）
    let termDay = (day2 - day1) / 86400000;

    // 所要時間
    let spendTime = termDay * 24 * 60 + (endTime - startTime);
    return spendTime;
}

// 曜日の取得と設定&週番号の計算と設定用関数
function youbiSet(info) {
    let dayOfWeek = info.start.getDay();// (日->0, 月->1, 火->2, 水->3, 木->4, 金->5, 土->6)
    let youbi;
    let byWeekDay;
    if (dayOfWeek == 0) {
        youbi = "日";
        byWeekDay = "su";
    } else if (dayOfWeek == 1) {
        youbi = "月";
        byWeekDay = "mo";
    } else if (dayOfWeek == 2) {
        youbi = "火";
        byWeekDay = "tu";
    } else if (dayOfWeek == 3) {
        youbi = "水";
        byWeekDay = "we";
    } else if (dayOfWeek == 4) {
        youbi = "木";
        byWeekDay = "th";
    } else if (dayOfWeek == 5) {
        youbi = "金";
        byWeekDay = "fr";
    } else if (dayOfWeek == 6) {
        youbi = "土";
        byWeekDay = "sa";
    }

    // 曜日の格納用htmlタグに退避しておく
    $('#dayOfWeek').val(dayOfWeek);
    $('#youbi').val(youbi);
    $('#byWeekDay').val(byWeekDay);
    $('#毎週○曜日').text('毎週' + youbi + '曜日');

    // 週番号の計算
    let date = info.start.getDate();
    let weekNo = 0;
    if (date <= 7) {
        weekNo = 1;
    } else if (date >= 8 && date <= 14) {
        weekNo = 2;
    } else if (date >= 15 && date <= 21) {
        weekNo = 3;
    } else if (date >= 22 && date <= 28) {
        weekNo = 4;
    } else {
        weekNo = 5;
    }
    $('#weekNo').val(weekNo);
    $('#毎月第1○曜日').text('毎月第' + weekNo + youbi + '曜日');
    $('#毎月○日').text('毎月' + date + '日');
    $('#perMonth').text('毎月' + date + '日');

    $('#毎月第1第3○曜日').text('毎月第1第3' + youbi + '曜日');
    $('#毎月第2第4○曜日').text('毎月第2第4' + youbi + '曜日');
}

// 繰り返しカスタムモーダルで完了ボタンクリック時
function custom() {
    let customName;
    let youbiflag = "";
    if ($('#per').text() == "日ごと") {
        customName = $('input[name=repeatSpan]').val() + $('#per').text();
    } else if ($('#per').text() == "週間ごと") {
        customName = $('input[name=repeatSpan]').val() + $('#per').text();
        if ($('#buttonSun').data('flag') == "1" && $('#buttonMon').data('flag') == "1" &&
            $('#buttonTue').data('flag') == "1" && $('#buttonWed').data('flag') == "1" &&
            $('#buttonThu').data('flag') == "1" && $('#buttonFri').data('flag') == "1" &&
            $('#buttonSat').data('flag') == "1") {
            customName += ', 週7日';
            youbiflag = "1111111";
        } else {
            if ($('#buttonSun').data('flag') == '1') {
                customName += ', 日曜日';
                youbiflag += "1";
            } else {
                youbiflag += "0";
            }
            if ($('#buttonMon').data('flag') == '1') {
                customName += ', 月曜日';
                youbiflag += "1";
            } else {
                youbiflag += "0";
            }
            if ($('#buttonTue').data('flag') == '1') {
                customName += ', 火曜日';
                youbiflag += "1";
            } else {
                youbiflag += "0";
            }
            if ($('#buttonWed').data('flag') == '1') {
                customName += ', 水曜日';
                youbiflag += "1";
            } else {
                youbiflag += "0";
            }
            if ($('#buttonThu').data('flag') == '1') {
                customName += ', 木曜日';
                youbiflag += "1";
            } else {
                youbiflag += "0";
            }
            if ($('#buttonFri').data('flag') == '1') {
                customName += ', 金曜日';
                youbiflag += "1";
            } else {
                youbiflag += "0";
            }
            if ($('#buttonSat').data('flag') == '1') {
                customName += ', 土曜日';
                youbiflag += "1";
            } else {
                youbiflag += "0";
            }
        }
        $('#youbiflag').val(youbiflag);
    } else if ($('#per').text() == "か月ごと") {
        if ($('#repeatSpan').val() == 1) {
            customName = $('#perMonth').text();
        } else {
            if ($('input:hidden[name="perMonth"]').val() == "毎月○日") {
                customName = $('input[name=repeatSpan]').val() + $('#per').text() + $('#day').val() + "日";
            } else if ($('input:hidden[name="perMonth"]').val() == "毎月第1○曜日") {
                customName = $('input[name=repeatSpan]').val() + $('#per').text() + " 第" + $('#weekNo').val() + $('#youbi').val() + "曜日";
            }
        }
    } else if ($('#per').text() == "年ごと") {
        customName = $('input[name=repeatSpan]').val() + $('#per').text() + " " + $('#month').val() + "月" + $('#day').val() + "日";
    }
    // 選択状態の値を取得
    let elements = document.getElementsByName("endDate");
    let a = "";
    for (i = elements.length; i--;) {
        if (elements[i].checked) {
            a = elements[i].value;
            break;
        }
    }
    if (a == 'endDay' && $('input[id="jsDatePickerRepeat"]').val() != "") {
        customName += ',' + $('input[id="jsDatePickerRepeat"]').val() + 'まで';
    } else if (a == 'repeat') {
        customName += ',' + $('input[name="repeatCount"]').val() + '回';
    }
    $('#カスタム1').text(customName);
    $('#カスタム1').css({
        "display": "inline-block"
    })
    $('#kurikaeshi').text(customName);
    $('input:hidden[name="kurikaeshi"]').val('カスタム1');
    $('#interval').val($('input[name=repeatSpan]').val());
    $('#perMonthName').val($('input[name=perMonth]').val());
    $('.jsModalRepeat').fadeOut();
}

// すべての曜日ボタンが未選択の時、クリックされた日付の曜日を選択状態にする
function setyoubi() {
    if ($('#buttonSun').data('flag') == "0" && $('#buttonMon').data('flag') == "0" &&
        $('#buttonTue').data('flag') == "0" && $('#buttonWed').data('flag') == "0" &&
        $('#buttonThu').data('flag') == "0" && $('#buttonFri').data('flag') == "0" &&
        $('#buttonSat').data('flag') == "0") {
        if ($('#dayOfWeek').val() == 0) {
            $('#buttonSun').addClass('youbiButtonActive');
            $('#buttonSun').data('flag', '1');
        } else if ($('#dayOfWeek').val() == 1) {
            $('#buttonMon').addClass('youbiButtonActive');
            $('#buttonMon').data('flag', '1');
        } else if ($('#dayOfWeek').val() == 2) {
            $('#buttonTue').addClass('youbiButtonActive');
            $('#buttonTue').data('flag', '1');
        } else if ($('#dayOfWeek').val() == 3) {
            $('#buttonWed').addClass('youbiButtonActive');
            $('#buttonWed').data('flag', '1');
        } else if ($('#dayOfWeek').val() == 4) {
            $('#buttonThu').addClass('youbiButtonActive');
            $('#buttonThu').data('flag', '1');
        } else if ($('#dayOfWeek').val() == 5) {
            $('#buttonFri').addClass('youbiButtonActive');
            $('#buttonFri').data('flag', '1');
        } else if ($('#dayOfWeek').val() == 6) {
            $('#buttonSat').addClass('youbiButtonActive');
            $('#buttonSat').data('flag', '1');
        }
    }
};

// カテゴリーのラジオボタンのチェックが変更されたとき
function checkCategory() {
    let elements = document.getElementsByName("categoryRadio");
    let a;
    for (i = elements.length; i--;) {
        if (elements[i].checked) {
            a = elements[i].value;
            break;
        }
    }
    // 「メモ」が選択されたとき
    if (a == "memo") {
        // 必要な項目のみ表示する
        $(".memo").css("display", "block");
        $(".memoDate").css("display", "block");
        $(".doctor").css("display", "none");
        $(".date").css("display", "none");
        $(".place").css("display", "none");
        $(".repeatSelect").css("display", "none");
        // 更新ボタンを活性化する
        $("#koshinButton").removeClass("confirmButtonUnActive");
        $("#koshinButton").addClass("confirmButton");
        $("#koshinButton").data("active","true");
        // 削除ボタンを表示する
        $("#sakujoButton").css("display", "inline-block");
        // モーダルサイズを適切に変更する
        $(".modalContent").css("height", "480px");

    }
    // 「予定」が選択されたとき
    else if (a == "plan") {
        // 必要な項目のみ表示する
        $(".doctor").css("display", "block");
        $(".date").css("display", "block");
        $(".place").css("display", "block");
        $(".repeatSelect").css("display", "block");
        $(".memoDate").css("display", "none");
        $(".memo").css("display", "block");
        // 更新ボタンを活性化する
        $("#koshinButton").removeClass("confirmButtonUnActive");
        $("#koshinButton").addClass("confirmButton");
        $("#koshinButton").data("active","true");
        // 削除ボタンを表示する
        $("#sakujoButton").css("display", "inline-block");
        // モーダルサイズを適切に変更する
        $(".modalContent").css("height", "630px");
    }
    // 「休暇」が選択されたとき
    else if (a == "vacation") {
        // 必要な項目のみ表示する
        $(".doctor").css("display", "block");
        $(".date").css("display", "block");
        $(".place").css("display", "none");
        $(".repeatSelect").css("display", "block");
        $(".memoDate").css("display", "none");
        $(".memo").css("display", "block");
        // 更新ボタンを活性化する
        $("#koshinButton").removeClass("confirmButtonUnActive");
        $("#koshinButton").addClass("confirmButton");
        $("#koshinButton").data("active","true");
        // 削除ボタンを表示する
        $("#sakujoButton").css("display", "inline-block");
        // モーダルサイズを適切に変更する
        $(".modalContent").css("height", "630px");
    }
    // 何も選択されていないとき
    else{
        // すべての項目を非表示にする
        $(".doctor").css("display", "none");
        $(".date").css("display", "none");
        $(".place").css("display", "none");
        $(".repeatSelect").css("display", "none");
        $(".memoDate").css("display", "none");
        $(".memo").css("display", "none");
        // 更新ボタンを非活性化する
        $("#koshinButton").removeClass("confirmButton");
        $("#koshinButton").addClass("confirmButtonUnActive");
        $("#koshinButton").data("active","false");
        // 削除ボタンを非表示にする
        $("#sakujoButton").css("display", "none");
        // モーダルサイズを適切に変更する
        $(".modalContent").css("height", "240px");

    }
}
// モーダルダイアログの初期化
function formatMordal() {
    // 「カテゴリー」のラジオボタンからチェックを外す
    $('input[name="categoryRadio"]').prop("checked", false);
    checkCategory();
    // 終日チェックボックスからチェックを外す
    $('input[name="allDay"]').prop("checked", false);
    allDayCheck();
    // 往診場所チェックボックスを初期位置に戻す
    $('input[value="select"]').prop("checked", true);
    switch_radio();
    // ドロップダウンリストの初期化
    $('#oushinClinic').text("選択してください");
    $('#oushinClinic').css('color', '#bdbaba');
    $('input:hidden[name="clinic"]').attr('value', '');
    $('#oushinHome').text("選択してください");
    $('#oushinHome').css('color', '#bdbaba');
    $('input:hidden[name="home"]').attr('value', '');
    // テキストボックスの初期化
    $('#titleText').val("");
    $('#pac-input').val("");
    $('#message').val("");
}
// 終日チェックボックスクリック時の処理
function allDayCheck() {
    if ($('#allDay').prop("checked")){
        $('.dropdownSwitchActive').css({
            "background-color": "#b6b6b6"
        })
    }else {
        $('.dropdownSwitchActive').css({
            "background-color": "#FFF"
        })
    }
}

$(loaded);

var count = 0;

function loaded() {
  showText();
  localStorage.clear();
  // ボタンをクリックしたときに実行するイベントを設定する
  $("#Button").click(
    // コールバックとしてメソッドを引数にわたす
    function() {
      saveTextandDate();
      showText();
      showDate();
    });
}

// 入力された内容をローカルストレージに保存する
function saveTextandDate() {
  // 時刻をキーにして入力されたテキストを保存する
  var text = $("#formText");
  var val = text.val();
  // 配列に実行日の要素を格納する
  var year = $("#year");
  var month = $("#month");
  var day = $("#day");
  var array = [year.val(), month.val(),day.val()];

  // 入力チェックをしてからローカルストレージに保存する
  if(checkText(val) === true && checkDate(array) === true) {
    // 内容を保存
    localStorage.setItem(count, val);
    count++;
    // テキストボックスを空にする
    text.val("");

    // 日付を保存
     for(var i = 0; i < array.length; i++) {
    //  var val = array[i].val();
    //  var time = new Date();
      localStorage.setItem(count, array[i]);
      count++;
      if(i === 0) {
        year.val("");
      }
      else if(i === 1) {
        month.val("");
      }
      else {
        day.val("");
      }
    }
  }
}
/*
// 入力された日付のデータをローカルストレージに保存する
function saveDate() {
  // 配列に実行日の要素を格納する
  var year = $("#year");
  var month = $("#month");
  var day = $("#day");
  var array = [year.val(), month.val(),day.val()];

  //実行日が現在より前ではないかを確認してローカルストレージに保存する
  if(checkDate(array)) {
    for(var i = 0; i < array.length; i++) {
    //  var val = array[i].val();
    //  var time = new Date();
      localStorage.setItem(count, array[i]);
      count++;
      if(i === 0) {
        year.val("");
      }
      else if(i === 1) {
        month.val("");
      }
      else {
        day.val("");
      }
    }
  }
}
*/
// ローカルストレージに保存した値を再描画する
function showText() {
  // すでにある要素を削除する
  var list = $(".list_c");
  list.children().remove();
  // ローカルストレージに保存された値すべてを要素に追加する
  var key, value, html = [];
  var len = localStorage.length;
  for(var i=len-1; i>=0; i--) {
    // 内容、年、月、日の順にローカルストレージに入っているので内容のときだけ取ってくる
    if(i%4 === 0) {
      key = localStorage.key(i);
      value = localStorage.getItem(key);
    // 表示する前にエスケープ
      html.push($("<p>").html(value));
    }
  }
  list.append(html);
}
// 文字をエスケープする
function escapeText(text) {
  var TABLE_FOR_ESCAPE_HTML = {
    "&": "&amp;",
    "\"": "&quot;",
    "<": "&lt;",
    ">": "&gt;"
  };
  return text.replace(/[&"<>]/g, function(match) {
    return TABLE_FOR_ESCAPE_HTML[match];
  });
}

function showDate() {
  // 要素の削除
  var list = $(".list_d");
  list.children().remove();
  // ローカルストレージ内に保存された値を要素に追加
  var key, value, html = [];
  var len = localStorage.length;
  for(var i = len-1; i >= 0; i--) {
    if(i%4 !== 0) {
      for(var j = i-2; j <= i; j++) {
        key = localStorage.key(j);
        value = localStorage.getItem(key);
        if(j === i-2) {
          var str = value;
        }
        else {
          str = "" + str + '/' + value;
        }
      }
      html.push($("<p>").html(str));
      i = i - 2;
      str = "";
    }
  }
  list.append(html);
}

// 入力チェックを行う
function checkText(text) {
  // 文字数が0または20以上は不可
  if (0 === text.length || 50 < text.length) {
    alert("文字数は1〜50字にしてください");
    return false;
  }

  // すでに入力された値があれば不可
  var length = localStorage.length;
  for (var i = 0; i < length; i++) {
    var key = localStorage.key(i);
    var value = localStorage.getItem(key);
    // 内容が一致するものがあるか比較
    if (text === value) {
      alert("同じ内容は避けてください");
      return false;
    }
  }

  // すべてのチェックを通過できれば可
  return true;
}

// 日付のチェック
function checkDate(array) {
  // 入力された年月日のデータを１つの数字として表す
  var numberDate = array[0];
  if(array[1] < 10) {
    numberDate = "" + numberDate + 0 + array[1];
  }
  else {
    numberDate = "" + numberDate + array[1];
  }
  if(array[2] < 10) {
    numberDate = "" + numberDate + 0 + array[2];
  }
  else {
    numberDate = "" + numberDate + array[2];
  }

  //console.log(numberDate);

  // 日付を現在と比較
  var time = new Date();
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var day = time.getDate();

  var now = year;
  if(month < 10) {
    now = "" + now + 0 + month;
  }
  else {
    now = "" + now + month;
  }
  if(day < 10) {
    now = "" + now + 0 + day;
  }
  else {
    now = "" + now + day;
  }

  if(numberDate < now) {
    alert("現在以降の日付を入力してください");
    return false;
  }

  return true;
}
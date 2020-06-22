(function() {

  var botui = new BotUI('botui-app');

  fetch("https://bot-sample-api.herokuapp.com/api/v1/posts", {
    method: "GET",
  }).then(response => response.json())
  .then(text => {
    // console.log(text.data);
    test = text.data
    
  });

  //初期メッセージ．
  botui.message.add({
    content: '初めまして、成田崚と申します'
  }).then(showQuestions);


  // 質問の選択肢を提示する関数．
  function showQuestions() {
    botui.message.add({
      delay:1500,
      content: '何について，お話ししましょうか？'
    }).then(function() {

      // ボタンを提示する．
      return botui.action.button({
        autoHide: false,
        delay: 1500,
        action: [
          {icon: 'user-o', text: '職歴', value: 'history'},
          {icon: 'rocket', text: '趣味', value: 'hobby'},
          {icon: 'pencil', text: 'このアプリについて', value: 'app'}]
      });
    }).then(function(res) {
      botui.action.hide();
      switch (res.value) {
        case 'history': showHistory(); break;
        case 'hobby': showHobby(); break;
        case 'app': showApp(); break;
        default: end();
      }
    });
  }

  // 来歴について説明する関数．
  function showHistory() {
    botui.message.add({
      delay: 1500,
      content: test[0].content
    }).then(function() {
      return botui.message.add({
        delay: 2500,
        content: test[1].content
      });
    }).then(function() {
      return botui.message.add({
        delay: 2500,
        content: test[2].content
        
      });
    }).then(function() {
      return botui.message.add({
        delay: 2500,
        content: test[3].content
      });
    }).then(function() {
      return botui.message.add({
        delay: 2500,
        content: test[4].content
      });
    }).then(function() {
      return botui.message.add({
        delay: 2500,
        content: test[5].content
      });
    }).then(askEnd);
  }
  
  // 趣味について説明する関数．
  function showHobby() {
    botui.message.add({
      delay: 1500,
      content: test[6].content
    }).then(function() {
      return botui.message.add({
        delay: 2500,
        content: test[7].content
        
      });
    }).then(askEnd);
  }
  
  // skillについて説明する関数．
  function showApp() {
    botui.message.add({
      delay: 1500,
      content: test[8].content
    }).then(function(){
      
      return botui.message.add({
        delay: 2000,
        content: test[9].content
      });
      
    }).then(function(){
      return botui.message.add({
        delay: 2000,
        content: test[10].content
      });
    }).then(function(){
      return botui.message.add({
        delay: 2000,
        content: test[11].content
      });
    }).then(askEnd);
  }
  // プログラムを終了するか聞く関数．
  function askEnd(){
    botui.message.add({
      delay:2000,
      content: '他に質問がありますか？'
    }).then(function() {

      // ボタンを提示する．
      return botui.action.button({
        delay: 1500,
        action: [
          {icon: 'circle-o', text: 'はい', value: true},
          {icon: 'close', text: 'いいえ', value: false}]
      });
    }).then(function(res) {
      res.value ? showQuestions() : end();
      });
  }

  //プログラムを終了する関数．
  function end() {
    botui.message.add({
      delay: 1500,
      content: 'お時間頂き，ありがとうございました．'
    }).then(function(){
      return botui.message.add({
        delay: 1500,
        content: "[詳細はこちら](https://github.com/ry0559/chat-bot.git)"
      });
    });
  }
})();



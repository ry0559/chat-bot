(function() {

  var botui = new BotUI('botui-app');

  
  fetch("https://bot-sample-api.herokuapp.com", {
    method: "GET",
  }).then(response => response.json())
  .then(text => {
    // console.log(text.data);
    test = text.data
    
  });

  

  //初期メッセージ．
  botui.message.add({
    content: 'こんにちは！！'
  }).then(showQuestions);
  // 質問の選択肢を提示する関数．
  function showQuestions() {
    botui.message.add({
      delay:1500,
      content: 'どのような事でお困りですか？'
    }).then(function() {
      // ボタンを提示する．
      return botui.action.button({
        autoHide: false,
        delay: 1500,
        action: [
          {text: '機能', value: 'ability'},
          {text: '使い方', value: 'treatment'},
          {text: '価格', value: 'price'},
          {text: 'キーワードで検索する', value: 'keyword'}]
      });
    }).then(function(res) {
      botui.action.hide();
      switch (res.value) {
        case 'ability': showAbility(); break;
        case 'treatment': showTreatment(); break;
        case 'price': showPrice(); break;
        case 'keyword': showKeyword(); break;
        default: end();
      }
    });
  }

  function showKeyword () {
    botui.action.text({
      action: {
        placeholder : "キーワード入力", 
        button: {
          icon: 'check',
          label: '送信'
        }
      }
    
    }).then(function(res) {      
      let ability = '機能'
      let treatment = '使い方'
      let price = '価格'
      //入力されたキーワードを取得する
      let key = res.value;
      if(key === price){
        return botui.message.add({
          delay: 1500,
          content: test[6].content 
        }).then(askEnd);
      } else if(key === treatment){  
        return botui.message.add({
          delay: 1500,
          content: '使い方について' 
        }).then(function() {
          // ボタンを提示する．
          return botui.action.button({
            autoHide: false,
            delay: 1500,
            action: [
              {text: 'どうすれば表示される？', value: 'indication'},
              {text: 'フリーワードで検索できる？', value: 'search'},]
            });
        }).then(function(res) {
          botui.action.hide();
          switch (res.value) {
            case 'indication': showIndication(); break;
            case 'search': showSearch(); break;
            default: end();
          }
        });

      } else if(key === ability){  
        return botui.message.add({
          delay: 1500,
          content: '機能' 
        }).then(function() {
          // ボタンを提示する．
          return botui.action.button({
            autoHide: false,
            delay: 1500,
            action: [
              {text: '質問は簡単に登録できる？', value: 'question'},
              {text: '分析はできる？', value: 'analysis'},
              {text: '難しい？', value: 'difficulty'}]
          });
        }).then(function(res) {
          botui.action.hide();
          switch (res.value) {
            case 'question': showQuestion(); break;
            case 'analysis': showAnalysis(); break;
            case 'difficulty': showDifficulty(); break;
            default: end();
          }
        });
      } else {
        return botui.message.add({
          delay: 1500,
          content: '申し訳ございません。現在、回答の準備がありません。'
        }).then(askEnd);
      }
    });
  }

  // 機能について説明する関数．
  function showAbility() {
    botui.message.add({
      delay: 1500,
      content: '機能' 
    }).then(function() {

      // ボタンを提示する．
      return botui.action.button({
        autoHide: false,
        delay: 1500,
        action: [
          {text: '質問は簡単に登録できる？', value: 'question'},
          {text: '分析はできる？', value: 'analysis'},
          {text: '難しい？', value: 'difficulty'}]
      });
    }).then(function(res) {
      botui.action.hide();
      switch (res.value) {
        case 'question': showQuestion(); break;
        case 'analysis': showAnalysis(); break;
        case 'difficulty': showDifficulty(); break;
        default: end();
      }
    });
  }
  // 質問は簡単に登録できる？について説明する関数．
  function showQuestion() {
    botui.message.add({
      delay: 1500,
      content: test[1].content 
    
    }).then(askEnd);
  }
  // 分析は可能？について説明する関数．
  function showAnalysis() {
    botui.message.add({
      delay: 1500,
      content: test[2].content 
    
    }).then(askEnd);
  }
  // 難しい？について説明する関数．
  function showDifficulty() {
    botui.message.add({
      delay: 1500,
      content: test[3].content 
    
    }).then(askEnd);
  }

// 使い方について説明する関数．
  function showTreatment() {
    botui.message.add({
      delay: 1500,
      content: '使い方について' 
    }).then(function() {
      // ボタンを提示する．
      return botui.action.button({
        autoHide: false,
        delay: 1500,
        action: [
          {text: 'どうすれば表示される？', value: 'indication'},
          {text: 'フリーワードで検索できる？', value: 'search'},]
        });
    }).then(function(res) {
      botui.action.hide();
      switch (res.value) {
        case 'indication': showIndication(); break;
        case 'search': showSearch(); break;
        default: end();
      }
    });
  }

  // どうすれば表示される？ついて説明する関数
  function showIndication() {
    botui.message.add({
      delay: 1500,
      content: test[4].content 
  }).then(askEnd);
  }
  // フリーワードで検索できる？ついて説明する関数
  function showSearch() {
    botui.message.add({
      delay: 1500,
      content: test[5].content 
  }).then(askEnd);
  }

  // 価格について説明する関数．
  function showPrice() {
    botui.message.add({
      delay: 1500,
      content: test[0].content 
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
          {text: 'はい', value: true},
          {text: 'いいえ', value: false}]
      });
    }).then(function(res) {
      res.value ? showQuestions() : end();
      });
  }
  //プログラムを終了する関数．
  function end() {
    botui.message.add({
      delay: 1500,
      content: 'ありがとうございました．'
    });
  }
})();



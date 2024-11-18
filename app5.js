const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand; // ユーザーの手
  let win = Number(req.query.win) || 0; // 勝ち数
  let total = Number(req.query.total) || 0; // 総ゲーム数

  console.log({ hand, win, total });

  // CPUの手をランダムに選択
  const num = Math.floor(Math.random() * 3 + 1);
  let cpu = '';
  if (num === 1) cpu = 'グー';
  else if (num === 2) cpu = 'チョキ';
  else cpu = 'パー';

  // 勝敗の判定
  let judgement;
  if (
    (hand === 'グー' && cpu === 'チョキ') ||
    (hand === 'チョキ' && cpu === 'パー') ||
    (hand === 'パー' && cpu === 'グー')
  ) {
    judgement = '勝ち';
    win += 1; 
  } else if (hand === cpu) {
    judgement = '引き分け';
  } else {
    judgement = '負け';
  }

  total += 1; 

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  };

  res.render('janken', display); 
});


app.get("/guess", (req, res) => {
  let userGuess = Number(req.query.number);  // ユーザーの推測
  let win = Number(req.query.win) || 0;      // 勝ち数を取得
  let total = Number(req.query.total) || 0;  // 試合数を取得

  const randomNumber = Math.floor(Math.random() * 10);  // ランダムな数を生成
  let result;

  // 勝敗判定
  if (userGuess === randomNumber) {
    result = "当たり！";
    win += 1; 
  } else {
    result = "外れ！";
  }

  total += 1; 

  const display = {
    userGuess: userGuess,    // ユーザーの入力
    randomNumber: randomNumber,  // ランダムな数
    result: result,          // 判定結果
    win: win,                // 勝ち数
    total: total             // 試合数
  };

  res.render("guess", { ...display, win: win, total: total });
});




app.get("/mbti", (req, res) => {
  res.render("mbti");
});

// ユーザーの入力を受け取り、MBTIタイプを判定
app.get("/submit", (req, res) => {
  // ユーザーの回答を取得
  const q1 = req.query.q1; // E or I
  const q2 = req.query.q2; // S or N
  const q3 = req.query.q3; // T or F
  const q4 = req.query.q4; // J or P

  // 16のMBTIタイプを決定するためのロジック
  const type = q1 + q2 + q3 + q4; 

  let mbtiType = '';

  // タイプに基づいた診断結果を判定
  if (type === "INTJ") {
    mbtiType = "INTJ"; 
  } else if (type === "INTP") {
    mbtiType = "INTP"; 
  } else if (type === "ENTJ") {
    mbtiType = "ENTJ"; 
  } else if (type === "ENTP") {
    mbtiType = "ENTP"; 
  } else if (type === "INFJ") {
    mbtiType = "INFJ"; 
  } else if (type === "INFP") {
    mbtiType = "INFP"; 
  } else if (type === "ENFJ") {
    mbtiType = "ENFJ"; 
  } else if (type === "ENFP") {
    mbtiType = "ENFP"; 
  } else if (type === "ISTJ") {
    mbtiType = "ISTJ"; 
  } else if (type === "ISFJ") {
    mbtiType = "ISFJ"; 
  } else if (type === "ESTJ") {
    mbtiType = "ESTJ"; 
  } else if (type === "ESFJ") {
    mbtiType = "ESFJ"; 
  } else if (type === "ISTP") {
    mbtiType = "ISTP"; 
  } else if (type === "ISFP") {
    mbtiType = "ISFP"; 
  } else if (type === "ESTP") {
    mbtiType = "ESTP"; 
  } else if (type === "ESFP") {
    mbtiType = "ESFP"; 
  }

  // 結果ページにタイプを渡して表示
  res.render("mbti", { type: mbtiType });
});



app.listen(8080, () => console.log("Example app listening on port 8080!"));

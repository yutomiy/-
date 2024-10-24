let easyWords = ["cat", "dog", "sun", "moon"]; // 簡単な単語のリスト
let mediumWords = ["snow", "rain", "star", "cloud"]; // 中程度の単語のリスト
let hardWords = ["elephant", "crocodile", "giraffe", "chameleon"]; // 難しい単語のリスト
let currentWord = ""; // ユーザーが現在タイプしている単語
let fallingWord; // 落下する単語
let correctCount = 0; // 正解した単語の数
let startTime; // ゲームが開始された時刻
let timeLimit = 60; // 制限時間（秒）
let highScore = 0; // ハイスコア
let score = 0; // 現在のスコア

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  textSize(32);
  textAlign(CENTER, CENTER);
  
  // ローカルストレージからハイスコアを取得
  if (localStorage.getItem("highScore")) {
    highScore = int(localStorage.getItem("highScore"));
  }
  
  startTime = millis(); // ゲームが開始された時刻を保存
  // 最初の単語を作る
  fallingWord = spawnWord();
}

function draw() {
  background(220);
  console.log(correctCount);

  // 単語を描画し、新しい位置に移動する
  text(fallingWord.word, fallingWord.x, fallingWord.y);
  fallingWord.y += fallingWord.speed;

  // 単語が画面下部を超えたら新しい単語に置き換える
  if (fallingWord.y > height) {
    fallingWord = spawnWord();
  }

  // ユーザーが現在タイプしている単語を描画する
  text(currentWord, width / 2, height / 2);
  
    // 経過時間（秒）を計算
  let elapsedTime = (millis() - startTime) / 1000;

  // 残り時間（秒）を計算
  let remainingTime = timeLimit - elapsedTime;

  // 残り時間が0以下になったらゲーム終了
  if (remainingTime <= 0) {
    noLoop(); // drawループを停止
    text("ゲーム終了", width / 2, height / 2);
  } else {
    // 残り時間を画面上部に表示
    text("残り時間: " + int(remainingTime), width / 2, 50);
  }
    // スコアがハイスコアを上回ったらハイスコアを更新
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore); // ローカルストレージにハイスコアを保存
  }
    // ハイスコアを画面上部に表示
  text("ハイスコア: " + highScore, width / 2, 20);
  
      // スコアを画面上部に表示
  text("スコア: " + score, 150, 20);
}

function keyTyped() {
  // ユーザーが単語をタイプしている場合、その単語を更新する
  currentWord += key;

  // ユーザーが完全に単語をタイプした場合、新しい単語に置き換える
  if (currentWord === fallingWord.word) {
    fallingWord = spawnWord();
    currentWord = "";
    correctCount++; // 正解した単語の数を増やす
    increaseScore()
  }
}

function keyPressed() {
  // ユーザーがバックスペースを押した場合、最後の文字を削除する
  if (keyCode === BACKSPACE) {
    currentWord = currentWord.substring(0, currentWord.length - 1);
  }
}

function spawnWord() {
  // 新しい単語を作り、その位置と速度を設定する
  let word;
  if (correctCount < 5) {
    word = random(easyWords);
  } else if (correctCount < 10) {
    word = random(mediumWords);
  } else {
    word = random(hardWords);
  }

  return {
    word: word,
    x: random(width),
    y: 0,
    speed: random(2, 5)
  };
}
function increaseScore() {
  // スコアを増やす関数（単語を正しくタイプした時などに呼び出す）
  score++;
}

# webpro_06

## このプログラムについて

## ファイル一覧
ファイル名 | 説明
-|-
app5.js | プログラム本体
public/janken.html | じゃんけんの開始画面
views/janken.ejs | じゃんけんのテンプレートファイル
public/guess.html | 数字当てゲームの開始画面
views/guess.ejs | 数字当てゲームのテンプレートファイル
public/mbti.html | MBTI診断の開始画面
views/mbti.ejs | MBTI診断のテンプレートファイル

## 1.じゃんけん
1. app5.js を起動する
1. Webブラウザでlocalhost:8080/public/janken.htmlにアクセスする
1. 自分の手を入力する
```mermaid
flowchart TD;

start["開始"];
hand["自分の手を入力"]
end1["終了"]
if{"コンピューターの手と同じか"}
win["勝ち"]
lose["負け"]
drow["引き分け"]
han{"コンピューターの手に勝ったか"}



start --> hand
hand --> if
if -->|yes| drow
if -->|no| han
han -->|yes| win
han --> |no| lose
drow --> end1
win --> end1
lose --> end1
```

## 2.数字当てゲーム
1. app5.js を起動する
1. Webブラウザでlocalhost:8080/public/guess.htmlにアクセスする
1. 自分の数を入力する
```mermaid
flowchart TD;

start["開始"];
number["自分の数を入力"]
end1["終了"]
if{"コンピューターの数と同じか"}
win["勝ち"]
lose["負け"]



start --> number
number --> if
if -->|yes| win
if -->|no| lose
win --> end1
lose --> end1
```

## 3.MBTI診断
1. app5.js を起動する
1. Webブラウザでlocalhost:8080/public/mbti.htmlにアクセスする
1. 4つの質問に答える．
```mermaid
flowchart TD;
    A[開始] --> B[ユーザーが質問に回答]
    B --> C{ユーザーの回答を取得}
    C --> D[q1: E or I]
    C --> E[q2: S or N]
    C --> F[q3: T or F]
    C --> G[q4: J or P]
    
    D --> H[タイプを決定]
    E --> H
    F --> H
    G --> H
    
    H --> I{タイプ判定}
    
    I -->|INTJ| J[INTJ]
    I -->|INTP| K[INTP]
    I -->|ENTJ| L[ENTJ]
    I -->|ENTP| M[ENTP]
    I -->|INFJ| N[INFJ]
    I -->|INFP| O[INFP]
    I -->|ENFJ| P[ENFJ]
    I -->|ENFP| Q[ENFP]
    I -->|ISTJ| R[ISTJ]
    I -->|ISFJ| S[ISFJ]
    I -->|ESTJ| T[ESTJ]
    I -->|ESFJ| U[ESFJ]
    I -->|ISTP| V[ISTP]
    I -->|ISFP| W[ISFP]
    I -->|ESTP| X[ESTP]
    I -->|ESFP| Y[ESFP]
    
    J --> Z[結果ページを表示]
    K --> Z
    L --> Z
    M --> Z
    N --> Z
    O --> Z
    P --> Z
    Q --> Z
    R --> Z
    S --> Z
    T --> Z
    U --> Z
    V --> Z
    W --> Z
    X --> Z
    Y --> Z
    
    Z --> AA[終了]


```
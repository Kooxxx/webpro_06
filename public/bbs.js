"use strict";

let number = 0;  
const bbs = document.querySelector('#bbs');
const posts = document.querySelector('#posts');

// 投稿を送信する
document.querySelector('#post').addEventListener('click', () => {
  const name = document.querySelector('#name').value;
  const message = document.querySelector('#message').value;

  const params = {   // URL Encode
    method: "POST",
    body: 'name=' + name + '&message=' + message,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  const url = "/post";
  fetch(url, params)
    .then(response => response.json())
    .then(data => {
      document.querySelector('#message').value = "";  // メッセージ入力欄をリセット
      loadPosts();  // 投稿後に全投稿を再取得
    });
});

document.querySelector('#check').addEventListener('click', () => {
    const params = {  // URL Encode
        method: "POST",
        body:  '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const url = "/check";
    fetch( url, params )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        let value = response.number;
        console.log( value );

        console.log( number );
        if( number != value ) {
            const params = {
                method: "POST",
                body: 'start='+number,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'               
                }
            }
            const url = "/read";
            fetch( url, params )
            .then( (response) => {
                if( !response.ok ) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then( (response) => {
                number += response.messages.length;
                for( let mes of response.messages ) {
                    console.log( mes );  // 表示する投稿
                    let cover = document.createElement('div');
                    cover.className = 'cover';
                    let name_area = document.createElement('span');
                    name_area.className = 'name';
                    name_area.innerText = mes.name;
                    let mes_area = document.createElement('span');
                    mes_area.className = 'mes';
                    mes_area.innerText = mes.message;

              // いいねボタン
              const like_button = document.createElement('button');
              like_button.innerText = "いいね (" + mes.likes + ")";
              like_button.addEventListener('click', () => {
                const params = {
                  method: "POST",
                  body: 'id=' + mes.id,
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                };
                fetch('/like', params)
                  .then(response => response.json())
                  .then(data => {
                    like_button.innerText = "いいね (" + data.likes + ")";
                  });
              });

              // 編集ボタン
              const edit_button = document.createElement('button');
              edit_button.innerText = "編集";
              edit_button.addEventListener('click', () => {
                const newMessage = prompt("新しいメッセージ:", mes.message);
                if (newMessage) {
                  const params = {
                    method: "POST",
                    body: 'id=' + mes.id + '&message=' + newMessage,
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    }
                  };
                  fetch('/edit', params)
                    .then(response => response.json())
                    .then(data => {
                      mes_area.innerText = data.updatedPost.message;
                    });
                }
              });

              // 削除ボタン
              const delete_button = document.createElement('button');
              delete_button.innerText = "削除";
              delete_button.addEventListener('click', () => {
                const params = {
                  method: "POST",
                  body: 'id=' + mes.id,
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                };
                fetch('/delete', params)
                  .then(response => response.json())
                  .then(() => {
                    cover.remove();  // 投稿を削除したら表示から削除
                  });
              });

              cover.appendChild(name_area);
              cover.appendChild(mes_area);
              cover.appendChild(like_button);
              cover.appendChild(edit_button);
              cover.appendChild(delete_button);

              posts.appendChild(cover);
            }
          });
      }
    });
})


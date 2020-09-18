function check() {
  // 表示されている全てのメモを取得している
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) {
    //①イベント発火が起きている要素にdata-load = ”true”はまだ
    // 追加されていない為、if文は読まれず１０行目へ移る
    //③　②の処理でdata-load = ”true”が追加された為
    // post.getAttribute("data-load") != nullの空ではない条件に当てはまり、
    // if文の処理が読み込まれます。結果返り値でreturn null;が返り
    // 処理が止まる
    if (post.getAttribute("data-load") != null){
      return null;
    }
    //②post.setAttribute("data-load", "true");と記述することで、
    // 要素にdata-load = “true”と属性を追加しています。
    post.setAttribute("data-load", "true");
    //メモをクリックした場合に実行する処理を定義している
    post.addEventListener("click", () => {
    //どのメモをクリックしたのか、カスタムデータを利用して取得している
    // getAttributeで属性値を取得できる
      const postId = post.getAttribute("data-id");
　　　//Ajaxに必要なオブジェクトを生成している。
      const XHR = new XMLHttpRequest();
      //openでリクエストを初期化する
      // どの様なリクエストをするのかを指定するメソッドと言う認識でいい
      XHR.open("GET", `/posts/${postId}`, true);
      //レスポンスのタイプを指定する。
      XHR.responseType = "json";
      //sendでリクエストを送信する
      XHR.send();
      //レスポンスを受け取った時の処理を記述する
      XHR.onload = () => {
        if (XHR.status != 200 ) {
          //レスポンスのHTTP ステータスを解析し、該当するエラーメッセージをアラートで表示する様にしている
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          //処理を終了している
          return null;
        }
        //レスポンスされたデータを変数itemに代入している
        // checkedアクションで返却したitemはXHR.response.postで取得できる
        const item = XHR.response.post;
        //既読状態であれば、灰色に変わるcssを適用する為のカスタムデータを追加している
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          //未読状態であれば、カスタムデータを削除している
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
setInterval(check, 1000);
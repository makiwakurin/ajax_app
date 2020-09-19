function memo() {
   // 「投稿する」ボタンの情報を取得する
  const submit = document.getElementById("submit")
  // 投稿するボタンを「click」した場合に実行される関数を定義
  submit.addEventListener("click", (e) => {
    // formDataはフォームに入力された値を取得できるオブジェクトのことです。
    const formData = new FormData(document.getElementById("form"));
    //XMLHttpRequestのオブジェクトを生成
    const XHR = new XMLHttpRequest
    //HTTPメソッドはPOST、パスは/posts、非同期通信はtrue
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json"
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      //itemはレスポンスとして返却されたレコードデータを取得しています。
      const item = XHR.response.post;
      //listはHTMLを描画する場所を指定する「描画する親要素」
      //のlistの要素を取得しています。
      const list = document.getElementById("list");
      //formTextを取得する理由は、メモの入力フォームをリセットするためです。この処理が終了した時に、
      // 入力フォームの文字は入力されたままになってしまうため、
      // リセットする必要があります。ここではリセット対象の要素であるcontentという要素を取得しています。
      const formText = document.getElementById("content");
      //[メモとして描画する部分のHTML]を定義してる。
      //HTMLと言う変数を描画する様な処理を行えば、ここで定義したHTMLが
      // 描画される
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
        //listと言う要素に対して、insertAdjacentHTMLでHTML
        //を追加します。
      list.insertAdjacentHTML("afterend", HTML);
      formText.value = "";
    };
    e.preventDefault();
  });
}
//window（ページ）をload（読み込み）時に実行
window.addEventListener("load", memo)

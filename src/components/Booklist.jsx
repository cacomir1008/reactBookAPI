// ★useState=関数componentが値（今回はAPiから取得したデータ）を保管する機能
// ★useEffect = 関数外の副作用を扱う機能
// React = Component内でデータ更新＝＞再レンダリング＝APIからデータ取得＞無限ループ
// レンダリングを制御、特定の値が更新された時のみ処理を実行させる（今回はpropsが更新）
import React, { useState, useEffect}from 'react';
// css読み込み効かなかった
{/* <link rel="stylesheet" href="./index.css" /> */}

// props 親から子にデータを渡す時に使う。親からのデータは全部propsに自動的に入ってくる。
// データ取り出す：props.名前
// 中にjavascriptを書いて、親から来たデータの処理に使うこともできる
// コンポーネントは2種類（class：stateful/関数：stateless）
// ▼関数コンポーネント（状態を持つことができない）React hooksを使えば可能
// 状態（ステート）を持つと重くなる＝基本は関数コンポーネントを使う
const Booklist = props =>{
  // useState ：書き方　配列に2つ値が入っている状態にする
  // bookData：データ保存用（配列）
  // setBookData = bookDataの値を更新する関数
  // bookDataの初期値設定（null）
    const [bookData, setBookData]= useState(null)
    
    useEffect(() => {
      // ?＝getDataが存在する場合のみ関数を実行できる（エラー防止）
      // ▼一番最初の1回と、propsに変化があった時のみ実行される書き方（無限ループ避け）
        const result = props
        .getData?.(props.language)
        // responseにAPIからのデータが入る→BookData（データ保存）へ入れる
        .then((response) => setBookData(response));
    },[props]);                                                                                             
    return(
        <div>
          <ul style={{'list-style':'square'}}>
          {/* 三項演算子 */}
        {
          bookData === null 
          ? (
            <p>now loading...</p>
          ) : 
          (
            // bookDataにデータが入って来たら下記の処理
            // 繰り返し処理 map関数＝配列内の要素をコールバック処理、配列としてreturn
            console.dir(bookData.data.items),
            bookData.data.items.map((item1,index) => (
              <li key={index}>
                <h2 style={{color:'skyblue'}}>「{item1.volumeInfo.title}」</h2>
                <p><img src ={item1.volumeInfo.imageLinks ? item1.volumeInfo.imageLinks.smallThumbnail:""}></img></p>
                <p className="text">著者：{item1.volumeInfo.authors}</p>
                <p>詳細：{item1.volumeInfo.description}</p>
                <a href ={item1.volumeInfo.canonicalVolumeLink}>{item1.volumeInfo.canonicalVolumeLink}</a>
              </li>
            ))
          )
        }
          </ul>
        </div>
    );
}

// 他のファイルからコンポーネントを呼び出せるように
export default Booklist;
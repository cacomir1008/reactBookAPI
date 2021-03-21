import React from 'react';
// Booklistコンポーネントをimport
import Booklist from './components/Booklist'; //
// ライブラリ追加
import {BrowserRouter, Route, Link}from 'react-router-dom';
// ライブラリ追加(axios)httpリクエストを送る
import axios from 'axios';
// css読み込み効かなかった
{/* <link rel="stylesheet" href="index.css" /> */}

const App = () => {
  const languages = ['React','Vue','Angular','JavaScript','python','css'];
  const getDataFromAPI = async keyword => {
    // volumes ＝検索用のAPIのパス
    const requestUrl = 'https://www.googleapis.com/books/v1/volumes?q=intitle:'
    // axios関数＝自動的にpromiseのobjectを返す。awaitの後に書くと、非同期だが同期的に書ける
    const result = await axios.get(`${requestUrl}${keyword}`);
    return result;
  };
  return(
    // ルーター(componentの切り替えとURLを関連づける)
    <BrowserRouter>
    <div>
      <h1 style={{color:'#66cdaa'}}>Book list for study</h1>
      {/* クリックしたら移動する処理（Link） */}
      <ul style={{display:'flex','list-style':'none'}}>
        <li><Link to='/'>React</Link></li> <hr />
        <li><Link to='/vue'>Vue</Link></li> <hr />
        <li><Link to='/angular'>Angular</Link></li> <hr />
        <li><Link to='/JavaScript'>JavaScript</Link></li> <hr />
        <li><Link to='/python'>python</Link></li> <hr />
        <li><Link to='/css'>CSS</Link></li> <hr />
      </ul>
      
      <hr />
      {/* URLごとに内容を変える exactつけないと、他のも/で反応してしまう */ }
      <Route exact path = '/' 
      render ={
        props =>
        // Booklist component呼び出し <Booklist />
        // componentの中で、propsを通して送りたいデータを指定
        // component={Booklist}→propsを使いたいので、render={props=>〜}の形に変える
         <Booklist
           language ={languages[0]} 
          // keywordを入力すると、getDataFromApi関数を実行する
           getData= {keyword=>getDataFromAPI(keyword)}
           />
          }
       />
      <Route path = '/vue' 
      render ={
        props =>
         <Booklist language ={languages[1]}
         getData ={keyword=>getDataFromAPI(keyword)}
        />
        }
       />
      <Route exact path = '/angular' 
      render ={
        props =>
         <Booklist 
         language ={languages[2]} 
         getData={keyword=>getDataFromAPI(keyword)}
         />
         }
       />
        <Route exact path = '/JavaScript' 
      render ={
        props =>
         <Booklist 
         language ={languages[3]} 
         getData={keyword=>getDataFromAPI(keyword)}
         />
         }
       />
        <Route exact path = '/Python' 
      render ={
        props =>
         <Booklist 
         language ={languages[4]} 
         getData={keyword=>getDataFromAPI(keyword)}
         />
         }
       />
        <Route exact path = '/css' 
      render ={
        props =>
         <Booklist 
         language ={languages[5]} 
         getData={keyword=>getDataFromAPI(keyword)}
         />
         }
       />
    </div>
    </BrowserRouter>
  );
}

export default App;

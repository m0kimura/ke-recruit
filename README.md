A3RT Recruit APIクラス
====

A3RTウェブサービスを簡単に利用するためのクラスです。
A3RTの詳しい内容は[サイト](https://a3rt.recruit-tech.co.jp)をご覧ください。

## 解説
  A3RTサービスのうち、下記のサービスをサポートしています。
  1. 雑談会話サービス
  2. 文書校正サービス
  3. イメージ検索サービス

## 依存関係
  特にありません。

## 使い方
### インストール方法
  npm install ke-recruit

### 機能と解説
|メソッド|解説|
|:-|:-|
|constructor|()オブジェクトを作成|
|proof|(text)校正文書を送ると文書を校正してくれます|
|dialogue|雑談会話、話しかけると受け答えしてくれます。|
|search|(text)テキストを送ると関連する画像を検索してくれます。|

### サンプル
~~~javascript
const keRecruit=require('ke-recruit');
const Ke=new keRecruit();
Ke.dialogue('こんにちわ');
~~~


## Licence

[MIT](https://github.com/tcnksm/tool/blob/master/LICENCE)

## Author

[m0kimura](https://github.com/m0kimura)
[サイト](https://www.kmrweb.net/)

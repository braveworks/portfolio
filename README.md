# サイト構築用のGulpテンプレート
簡単な静的サイト構築用Gulpテンプレートです。
練習・デモ用に。

## できること
- SCSS -> CSS の自動コンパイル（Libsass）
  - AutoPrefixer
  - Media Query をソート
  - CSS圧縮
- EJS -> HTMLにコンパイル
- ブラウザ自動更新（Browser-Sync）

## 初期化
初回に一度、以下のコマンドで必要なモジュールを準備します。
```
npm install
```

## Gulp タスク
CLIで gulpfile.js があるディレクトリに移動しタスクを実行します。

### 作業用タスクの起動
```
gulp
```
これで起動すると、自動的に静的なローカルサーバーが起動しブラウザでプレビューを表示ます。  
この状態でファイルを編集し保存すると自動でブラウザが更新されます。
SCSSやEJSは自動で変換されます。
タスクを終了する場合`Ctr + C`で終了します。

### 公開用にビルド
```
gulp dist
```
ビルドを実行すると`dist`ディレクトリに公開用に変換されたサイトのファイル一式が出力されます。

## ディレクトリ構成
`app`ディレクトリ以下が編集用のファイルになります。

```
app
├── _includes         // ejsのインクルードファイル用ディレクトリ
│   ├── _base.ejs     //HTMLのベース
│   ├── _cover.ejs
│   ├── _footer.ejs   //ヘッダーのコンポーネント
│   └── _header.ejs   //フッターのコンポーネント
├── fonts             //フォント
├── images            //画像
├── index.ejs         //index.html になるejsファイル
├── scripts           // js
│   └── main.js
└── styles            // SCSS
    ├── common
    │   ├── _global.scss
    │   ├── _media-querys.scss
    │   └── _variables.scss
    ├── components
    │   ├── _buttons.scss
    │   ├── _comments.scss
    │   ├── _forms.scss
    │   └── _grid.scss
    ├── layouts
    │   ├── _footer.scss
    │   ├── _header.scss
    │   ├── _pages.scss
    │   └── _sidebar.scss
    └── main.scss       // エントリポイントになるscssファイル。それ以外の_で始まるscssはmain.scssにimportされるpartialファイルです。
```

## 備考
- 頭に`_`がつくファイルやディレクトリはビルド時に出力されません(partial扱い)
- ファイルの追加・削除を行った場合は`gulp`のタスクを再起動してください。
- SCSSとEJSは記述にエラーがあるとコンパイルされません。

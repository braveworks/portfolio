# サイト構築用のGulpテンプレート
簡単な静的サイト構築用Gulpテンプレートです。
練習・デモ用に。

## できること
- SCSS -> CSS の自動コンパイル（Libsass）
  - AutoPrefixer
  - Media Query のソート
  - CSS圧縮
- EJS -> HTMLにコンパイル
- jsの構文エラーチェック(jshint)
- 画像圧縮 (imagemin)
- ブラウザの自動更新（Browser-Sync）

## 初期化
初回に一度、以下のコマンドで必要なモジュールを準備します。

```
npm install
```

## Gulp タスク
CLIで gulpfile.js があるディレクトリに移動しタスクを実行します。

### Gulpタスクの起動

#### Watchタスク
```
gulp
```
編集作業用のタスクです。
- 起動すると、自動的に静的なローカルサーバーが起動しブラウザに`http://localhost:3000/`のURLでプレビューが表示ます。  
- scssやejsファイルを編集、保存すると自動でcssやhtmlに変換されブラウザが自動更新されます。
- jsファイルを編集すると構文チェックとブラウザの更新が行われます。
- タスクは `Ctr + C` で終了します。

#### 公開用ビルド
```
gulp dist
```
ビルドを実行すると`dist`ディレクトリに公開用に変換されたサイトのファイル一式が出力されます。
編集が終わったらこれを実行し、`dist`ディレクトリの中身を公開します。

## ディレクトリ構成
`app`ディレクトリ以下が編集用のファイルになります。

```
.
├── app                               // 編集用ファイルのディレクトリ : この中のファイルを編集します。
│   ├── _includes                     // .ejs インクルードファイル格納ディレクトリ
│   │   ├── _base.ejs                 // HTMLのベーステンプレート
│   │   ├── _components               // .ejs コンポーネント用ディレクトリ
│   │   │   └── _go-top.ejs
│   │   ├── _layout                   // .ejs レイアウトパーツディレクトリ（headerやfooterなどのレイアウト部品）
│   │   │   ├── _cover.ejs
│   │   │   ├── _footer.ejs
│   │   │   └── _header.ejs
│   │   └── _lib                      // .ejs ライブラリディレクトリ (functionファイルなど)
│   │       └── _function.ejs
│   ├── fonts                         // フォントディレクトリ
│   ├── images                        // 画像 : ビルド時には、この中の画像ファイルが自動的に圧縮されて出力されます）
│   ├── index.ejs                     // index : ビルド時にindex.htmlに変換されます。
│   ├── scripts                       // スクリプトディレクトリ : jsファイルを格納します。この中のjsはjshintによる構文チェックが行われます。
│   │   ├── main.js
│   │   └── vendor                    // vendor ディレクトリ : jQueryプラグインなどのベンダーjsを格納します。この中は構文チェックの対象外です。
│   └── styles                        // スタイルディレクトリ : Scss ファイルです。各フォルダにパーシャルファイルが格納されています。
│       ├── common
│       │   ├── _global.scss
│       │   ├── _media-querys.scss
│       │   └── _variables.scss
│       ├── components
│       │   └── _buttons.scss
│       ├── layouts
│       │   ├── _footer.scss
│       │   ├── _header.scss
│       │   ├── _pages.scss
│       │   └── _sidebar.scss
│       └── main.scss                 // main.scss エントリポイントになるscssファイルです。
├── ejs-config.yml                    // ejs 用の設定ファイル。 seoキーワドなどを変数化しておくことができます。
├── gulpfile.js                       // Gulpファイル : Gulpが実行するタスク記述されています。
├── package.json                      // パッケージ管理ファイル： Gulpやサイト構築に必要なパッケージを管理するファイルです。
└── vendor.yml                        // npmでインストールしたjQueryなどのプラグインを管理する設定ファイルです。

```

## 設定ファイルについて
設定ファイルはyaml形式で記述します。

### ejs-config.yml
ejs で使用する変数を定義することができるymlファイルです。
gulp起動時に読み込まれているので、ここに記述した値をejs内の設定やループ処理などに使用できます。

### vendor.yml
npm 経由でインストールしたjQueryプラグインなどのjs,css,フォントを管理するファイルです。

- scripts: jsファイルのパスを配列で指定します。指定したjsファイルはビルド時に`lib.min.js`ファイルに結合され本番のscripts/vendorディレクトリに出力されます。
- styles: cssファイルのパスを配列で指定します。指定されたファイルはビルド時にstyles/vendorディレクトリにコピーされます。
- fonts: fontファイルのパスを配列で指定します。指定されたファイルはビルド時にfontsディレクトリにコピーされます。

## その他
- 頭に`_`がつくejsファイルやディレクトリはビルド時に出力されません(partial扱い)
- SCSSやEJSは構文エラーがあるとコンパイルされません。必ず修正してください。
- ファイルの追加・削除を行った場合はタスクが強制終了することがあります。動作おかしい時などは gulpのタスクを終了させ再起動してください。

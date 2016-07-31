# Portfolio v2

Make a Wish

## 構成

- SCSS
  - PostCSS
    - AutoPrefixer
    - MQPacker
    - cssnano
- EJS
- imagemin
- Browser-Sync

## 初期化
```
npm install
```
#### Watchタスク

```
gulp
```

#### ビルド

```
gulp dist
```

ビルドを実行すると`dist`ディレクトリに公開用に変換されたサイトのファイル一式が出力されます。


## 設定ファイルについて

設定ファイルはyaml形式で記述します。

### ejs-config.yml

ejs で使用する変数を定義することができるymlファイル。 

### vendor.yml

npm 経由でインストールしたjQueryプラグインなどのjs,css,フォントを管理するファイルです。

- scripts: jsファイルのパスを配列で指定します。指定したjsファイルはビルド時に`lib.min.js`ファイルに結合され本番のscripts/vendorディレクトリに出力されます。
- styles: cssファイルのパスを配列で指定します。指定されたファイルはビルド時にstyles/vendorディレクトリにコピーされます。
- fonts: fontファイルのパスを配列で指定します。指定されたファイルはビルド時にfontsディレクトリにコピーされます。

## その他

- 頭に`_`がつくejsファイル・ディレクトリはビルド時に出力されません(partial扱い)

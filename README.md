# Portfolio v2

もうひとがんばり。

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

ejs で使用する値を定義するymlファイル。

### vendor.yml

使用するjQueryプラグインなどのjs,css,フォント類を管理するymlファイル。

## その他

- 頭に`_`がつくejsファイルはビルド時に出力されません(scssのpartial的な扱い)

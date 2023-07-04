<p align="center">
    <img src="https://img.shields.io/badge/Vue-3.3.1-brightgreen.svg"/>
    <img src="https://img.shields.io/badge/Vite-4.3.5-green.svg"/>
    <img src="https://img.shields.io/badge/Element Plus-2.3.6-blue.svg"/>
    <img src="https://img.shields.io/badge/license-MIT-green.svg"/>
</p>

## Vue3 Element Admin Lite
### Credit by [有来开源组织](https://gitee.com/youlaitech/youlai-mall)

## 項目介紹

vue3-element-admin-lite 是基於 [vue3-element-admin](https://gitee.com/youlaiorg/vue3-element-admin) v2.4.0 版本進行簡化，保留原先的動態路由、國際化 i18n、程式碼規範、Git 規範項目。

項目特性：

- 基於 vue-element-admin 2.4.0 版本，搭配 Vue3 + Vite4 + TypeScript5 + Element-Plus + Pinia
- 導入 Jest 單元測試工具、Dayjs

## 環境準備

| 環境                 | 名稱版本                                                     | 備註                                                         |
| -------------------- | :----------------------------------------------------------- | ------------------------------------------------------------ |
| **開發工具**         | VSCode                                                       | [下載地址](https://code.visualstudio.com/Download)           |
| **運行環境**         | Node 16+                                                     | [下載地址](https://nodejs.org/en)                        |
| **VSCode擴充套件(必裝)** | 1. `Vue Language Features (Volar) ` <br/> 2. `TypeScript Vue Plugin (Volar) `  <br/>3. 禁用 Vetur |

## 啟動專案

```bash
# 複製代碼
git clone https://github.com/andy922200/vue3-element-admin-lite.git

# 安裝所有依賴
yarn install

# 在開發環境運行專案
yarn dev
```

## 專案佈署
```bash
# 專案 build
# 參見 package.json 的 run 
yarn build:<env_name>

# 上傳文件
# 將 build 生成在 `dist` 目錄的文件複製到 `/usr/share/nginx/html` 目錄下

# nginx.config 配置
server {
	listen     80;
	server_name  localhost;
	location / {
            root /usr/share/nginx/html;
            index index.html index.htm;
	}
	# 反向代理配置
	location /prod-api/ {
          proxy_pass http://vapi.youlai.tech/; # 路徑和 proxy_pass 換成 api 伺服器網址
	}
}
```

## 注意事項

- **自動導入插件自动生成默認關閉**

  模板項目已經生成了組件類型聲明。如果要添加和使用新的組件，請按照下圖的方法開啟自動生成功能。在自動生成完成後，請記得將其設置為 `false`，以避免重複執行造成衝突。

  ![](https://foruda.gitee.com/images/1687755823137387608/412ea803_716974.png)

## 程式碼提交規範

在 `git commit -m <message>` 的過程中，會自動將 `git add .` 的檔案進行樣式格式化。如果「樣式或是 commit 格式」不符合的話，會跳出錯誤。

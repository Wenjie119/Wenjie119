GeoFWI Paper Advisor — GitHub Pages 部署包
更新：2026-07-06 · config v3.15.1

【必须上传至 GitHub 仓库根目录的文件】
  index.html
  config_data.js
  project_snapshot.js
  .github/workflows/deploy-pages.yml

【本地刷新部署包】
  双击：E:\个人项目\deploy\github-pages\准备GitHubPages部署包.bat

【推送到 GitHub（在 Wenjie119 仓库目录内）】
  git add index.html config_data.js project_snapshot.js .github
  git commit -m "Update advisor site v3.15.1"
  git push origin main

【GitHub 设置】
  Settings → Pages → Source = GitHub Actions
  Actions → Run workflow "Deploy Paper Advisor to Pages"

【线上 AI 审稿】
  GitHub Pages 无本地 15721 代理。
  侧边栏 → API 密钥设置 → 填入 Gemini（免费）或 Anthropic Key → 上传 .tex 审稿。
  未配置 Key 时显示 2026-07-06 内置示例审稿（SAMPLE_REVIEW）。

【验证】
  打开 https://wenjie119.github.io/Wenjie119/
  不应出现黄色「config_data.js 未加载」横幅
  页脚/Deploy 页应显示 config v3.15.1

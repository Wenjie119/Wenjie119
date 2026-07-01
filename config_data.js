/* =================================================================
   GeoFWI Paper Advisor — config_data.js  v2.0
   ================================================================
   脱离 Claude 自由修改指南:
   ① 添加论文   → 在 LIT_DATA 底部追加对象 (LIT_DATA.push({...}))
   ② 改清单     → 编辑 CHECKLIST.p1 / p2 / p3 数组
   ③ 改提示词   → 编辑 PROMPTS / ARS_SYSTEM
   ④ 加图表模板 → 在 GALLERY_TEMPLATES 底部追加
   ⑤ 改基线数字 → 编辑 METRICS_DATA
   ⑥ 改授权邮箱 → 编辑 FIREBASE_ALLOWED_EMAIL（须同步 Firebase Rules）
   ⑥b 改公开网址 → 编辑 ADVISOR_SITE（GitHub Pages / Firebase 项目名）
   ⑦ 改思路全景 → 编辑 DESIGN_PANORAMA（三篇论文整合页）
   ⑧ OpenClaw   → 编辑 OPENCLAW（远程 GPU 实验台配置）
   ⑨ 实验工作区 → 编辑 RESEARCH_WORKSPACE（WSL bp-diff-fwi-complex 路径）
   ⑩ Paper 1 关联 → 编辑 PAPER1_WSL（GeoFWI/近端引导/课程 文件映射）
   ⑪ 理论审计   → 编辑 THEORY_AUDIT（审稿漏洞 · 知识性错误 · 网络建议 · 行动优先级）
   ⑫ Related Work → 编辑 PAPER1_RELATED_WORK（main.tex 英文草稿 · 一键复制）
   ⑬ Agent文献  → 编辑 AGENT_LIT_PLAYBOOK（2025–2026 高端文献吞噬指南 · 符号标准）
   ⑭ 实验矩阵   → 编辑 MINIMAL_EXP_MATRIX（三篇论文 2 周最小可跑实验 · 其余 Deferred）
   ⑮ main.tex   → 编辑 MAIN_TEX_FIXES（命题1/命名/双 ε · 粘贴进 WSL main.tex）
   ⑯ 写作实验   → 编辑 WRITING_EXPERIMENT_PLAYBOOK（8 条体系化建议 · 三篇联动）
   ⑰ 实验诚信   → 编辑 EXPERIMENT_INTEGRITY（WSL 审计 · 未核实数字标记）
   ⑱ 知识审计   → 编辑 KNOWLEDGE_AUDIT（符号/物理假设 · 代码对照 2026-06）
   ⑲ 科学 surprise → 编辑 EXPERIMENT_SURPRISE（贡献意外性 · Pareto/决策/闭环实验）
   ⑳ 竞争格局   → 编辑 COMPETITIVE_LANDSCAPE（Peng/Feng 2026 · 数据集难度 · 战略修订）
   ㉑ 按天优先级 → 编辑 OPERATIONAL_PRIORITY（三篇投稿序 · 阶段门控）
   ㉒ 算力预算   → 编辑 COMPUTE_BUDGET（2026 Q2 云价 · FWI 正演开销 · 阶段门控 ¥）
   ㉓ 审稿分析   → 编辑 PAPER_REVIEW_DASHBOARD（Paper 1/2/3 同行诊断 · fixQueue）
   ㉔ 投稿战略   → 编辑 SUBMISSION_STRATEGY（P1 C&G/IEEE · P2 Geophysics · P3 JCR1 锚定）
   ㉔b 略高清单  → 编辑 BAR_ABOVE_AVERAGE_GUIDE（平均略高定义 · 三篇提升 · ROI · 逐周）
   ㉔ 写作工具链 → 编辑 RESEARCH_WRITING_TOOLS（工作流 · 矩阵 · 工具 Stars）
   ㉕ AI 栈版本  → 编辑 AI_STACK_CONFIG（CC Switch / Codex / DeepSeek 型号）
   ㉖ 写作绘图Hub → 编辑 WRITING_FIGURE_HUB（功能入口矩阵）
   ㉗ 工具工作台   → 编辑 TOOLKIT_WORKBENCH（Awesome/FigGen/ARS 命令与模板）
   保存后刷新浏览器即可生效。不需要任何 AI 介入。
================================================================= */

var CONFIG_VERSION = '3.14.1';
var CONFIG_UPDATED = '2026-06-17 · ADVISOR_SITE → Wenjie119 GitHub Pages';

/* ════ Codex/ARS 写作会话持久化（刷新/新窗口不丢上下文） ════ */
var CODEX_WRITING_SESSION_PROTOCOL =
  '【会话持久化 · 强制遵守 — 优先级高于一切写作任务】\n\n' +
  '你正在参与长周期论文润色。Chat/Codex **没有跨刷新记忆**；你必须把状态写入磁盘日志，供下次会话续写。\n\n' +
  '## 日志文件（每篇论文独立，禁止混用）\n' +
  '- Paper 1：`paper1/drafts/CODEX_WRITING_SESSION.md`（WSL: `/root/projects/bp-diff-fwi-complex/paper1/drafts/...`）\n' +
  '- Paper 2：`paper2/drafts/CODEX_WRITING_SESSION.md`\n\n' +
  '## 每次回复结束前必须完成（不可省略）\n' +
  '1. **读**日志顶部 `RUNNING_STATE`（若不存在则创建）。\n' +
  '2. **写回**更新后的 `RUNNING_STATE`（YAML 块，≤25 行），字段固定：\n' +
  '   - paper, last_updated, current_task, completed_sections[], pending_sections[], locked_numbers_ok, last_tex_edit, open_questions[]\n' +
  '3. **追加**一条 `SESSION_LOG`（Markdown 三级标题 + 时间戳 + 本轮摘要 + 产出路径 + 下轮第一条指令）。\n' +
  '4. 若产出了 LaTeX 片段：**同时**写入/补丁目标 tex 或注明「仅建议、未写入」。\n\n' +
  '## 新会话 / 刷新后 / 用户说「续写」时\n' +
  '**禁止**从零开始或假装记得上文。必须先 `read` 上述日志，复述 `RUNNING_STATE` 与最后一轮 `SESSION_LOG`，再执行 `pending_sections` 第一项。\n\n' +
  '## 网页 ARS 侧（用户操作）\n' +
  '每次点「润色 / ARS / 批量润色」→ prompt 自动串联四 GitHub 工具：Awesome + Codex ARS + 庆研 ARS + FigGen（见 buildGeoFWIToolkitPrompt）。\n' +
  '顾问页对话已 localStorage 自动保存；仍须写磁盘日志（Codex 读不到浏览器缓存）。用户可点「导出对话」「复制续写 Prompt」。\n\n' +
  '## 纪律提醒\n' +
  '- 不得改 locked 实验数字；不得 SOTA 声称（P1）；P2 任务=velocity-denoising。\n' +
  '- 日志只增不改历史 SESSION_LOG 条目（更正用新条目说明 supersede）。\n';

var CODEX_SESSION_PATHS = {
  p1: {
    logWsl: '/root/projects/bp-diff-fwi-complex/paper1/drafts/CODEX_WRITING_SESSION.md',
    logRel: 'paper1/drafts/CODEX_WRITING_SESSION.md',
    tex: 'paper1/manuscript/main.tex'
  },
  p2: {
    logWsl: '/root/projects/bp-diff-fwi-complex/paper2/drafts/CODEX_WRITING_SESSION.md',
    logRel: 'paper2/drafts/CODEX_WRITING_SESSION.md',
    tex: 'paper2/drafts/paper2_manuscript_draft.tex'
  }
};

function codexResumePrompt(paperKey) {
  var p = CODEX_SESSION_PATHS[paperKey] || CODEX_SESSION_PATHS.p1;
  var label = paperKey === 'p2' ? 'Paper 2 · GFS' : 'Paper 1 · 路径一诊断稿';
  return (
    '【续写 Codex 写作会话 · ' + label + '】\n\n' +
    '**第一步（必做）**：读取 `' + p.logRel + '`（WSL: `' + p.logWsl + '`）。\n' +
    '解析顶部 `RUNNING_STATE` 与最后 2 条 `SESSION_LOG`，用 5 句话复述当前进度，列出 `pending_sections`。\n\n' +
    '**第二步**：从 pending 第一项继续；不要重复 `completed_sections` 里已 ACCEPTED 的段落。\n\n' +
    '**第三步**：本轮回复末尾按协议更新日志 + RUNNING_STATE。\n\n' +
    CODEX_WRITING_SESSION_PROTOCOL
  );
}

/** 从 PROJECT_SNAPSHOT（sync_project_snapshot.py）构建 Codex 完整 prompt */
function buildCodexProjectPrompt(paperKey, mode) {
  mode = mode || 'full';
  var snap = (typeof PROJECT_SNAPSHOT !== 'undefined') ? PROJECT_SNAPSHOT : null;
  var p = snap && snap.papers ? snap.papers[paperKey] : null;
  var parts = [];

  if (mode === 'resume' && typeof codexResumePrompt === 'function') {
    parts.push(codexResumePrompt(paperKey));
  } else if (paperKey === 'p2' && typeof PAPER2_WRITING_STATUS !== 'undefined') {
    parts.push(PAPER2_WRITING_STATUS.arsBootstrapPrompt || '');
  } else if (typeof PAPER1_WRITING_STATUS !== 'undefined') {
    parts.push(PAPER1_WRITING_STATUS.arsBootstrapPrompt || '');
  }

  if (snap) {
    parts.push('\n【项目快照 · ' + snap.updated + '】');
    parts.push('WSL 根目录: ' + snap.wslRoot);
    if (p) {
      parts.push('阶段: ' + (p.phase || '') + ' · 目标刊: ' + (p.venueHint || ''));
      if (p.tex) {
        parts.push('手稿: ' + p.tex.wsl + ' (mtime ' + (p.tex.mtime || '?') + ')');
      }
      var rs = p.sessionLog && p.sessionLog.runningState;
      if (rs && rs.current_task) {
        parts.push('SESSION current_task: ' + rs.current_task);
        if (rs.pending_sections && rs.pending_sections.length) {
          parts.push('pending: ' + rs.pending_sections.join(' · '));
        }
        if (rs.completed_sections && rs.completed_sections.length) {
          parts.push('completed: ' + rs.completed_sections.join(' · '));
        }
      }
      if (p.experiments) {
        parts.push('\n【实验进度 · JSON 实测】');
        Object.keys(p.experiments).forEach(function(k) {
          var v = p.experiments[k];
          if (v && typeof v === 'object' && v.mean_cc != null) {
            parts.push(k + ': CC=' + Number(v.mean_cc).toFixed(3) +
              (v.mean_gfs != null ? ' GFS=' + Number(v.mean_gfs).toFixed(3) : '') +
              (v.n || v.n_samples ? ' n=' + (v.n || v.n_samples) : ''));
          }
        });
      }
      if (p.tex) {
        if (mode === 'abstract' && p.tex.abstract) {
          parts.push('\n【当前 Abstract 原文 · 来自 tex 快照】\n' + p.tex.abstract);
        } else if (mode === 'limitations' && p.tex.limitations) {
          parts.push('\n【当前 Limitations 原文 · 来自 tex 快照】\n' + p.tex.limitations);
        } else if (mode === 'applications' && p.tex.applications) {
          parts.push('\n【当前 Applications 原文 · 来自 tex 快照】\n' + p.tex.applications);
        } else if (mode === 'conclusion' && p.tex.conclusion) {
          parts.push('\n【当前 Conclusion 原文 · 来自 tex 快照】\n' + p.tex.conclusion);
        } else if (paperKey === 'p2' && p.tex.introduction) {
          parts.push('\n【当前 Introduction 原文 · 来自 tex 快照 · 节选】\n' + p.tex.introduction.slice(0, 4000));
        } else {
          if (p.tex.abstract) parts.push('\n【Abstract 节选】\n' + p.tex.abstract.slice(0, 2000));
          if (p.tex.conclusion) parts.push('\n【Conclusion 节选】\n' + p.tex.conclusion.slice(0, 2000));
        }
      }
    }
  } else {
    parts.push('\n⚠ PROJECT_SNAPSHOT 未加载。请先运行 sync_project_snapshot.py 或点击 ARS 页「同步项目快照」。');
  }

  if (paperKey === 'p1' && typeof PAPER1_ARS_SNIPPETS !== 'undefined') {
    parts.push('\n【证据地图】\n' + PAPER1_ARS_SNIPPETS.evidenceMapNote);
    parts.push('\n【Table 1 proxy】\n' + PAPER1_ARS_SNIPPETS.proxyTable1);
  }
  if (paperKey === 'p2' && typeof PAPER2_ARS_SNIPPETS !== 'undefined') {
    parts.push('\n【Table 2】\n' + PAPER2_ARS_SNIPPETS.table2);
    parts.push('\n【颠倒动机】\n' + PAPER2_ARS_SNIPPETS.rankingInversionNote);
  }

  parts.push('\n【Codex 写回要求】编辑 WSL tex 后更新 `' +
    (CODEX_SESSION_PATHS[paperKey] ? CODEX_SESSION_PATHS[paperKey].logRel : 'CODEX_WRITING_SESSION.md') +
    '`，并建议用户重新同步快照。');

  return parts.filter(Boolean).join('\n');
}

/* 唯一授权 Firebase 云端读写账号（须与 Google 登录邮箱一致，大小写不敏感） */
var FIREBASE_ALLOWED_EMAIL = 'Wenjielyu02@gmail.com';

/* ════ Paper Advisor 公开站点（GitHub Pages · 改此处即全站同步） ════ */
var ADVISOR_SITE = {
  brand: 'Wenjie Geophysics',
  url: 'https://wenjie119.github.io/Wenjie119/',
  githubUser: 'Wenjie119',
  githubRepo: 'Wenjie119',
  firebaseProjectId: 'wenjie119',
  githubPagesDomain: 'wenjie119.github.io',
  localUrl: 'http://127.0.0.1:8080/index.html',
  updated: '2026-06-17',
  note: 'GitHub 账号 Wenjie119 · 仓库 Wenjie119 · Pages 根目录部署 index.html + config_data.js',
};

function advisorSiteUrl() {
  return (typeof ADVISOR_SITE !== 'undefined' && ADVISOR_SITE.url)
    ? ADVISOR_SITE.url
    : 'https://wenjie119.github.io/Wenjie119/';
}

/* ════ AI审稿示例(API不可用时的fallback) ════ */
const DEMO_REVIEW = {
  overallScore: 78,
  summary: "GC-FWI path-1 diagnostic manuscript (2026-06-17 audit): proxy Table 1 is filled from metrics_canonical_*_proxy.json (GC-FWI test CC=0.859; U-Net 0.916; PINN 0.896). Historical blockers (placeholder CC=0.00/0.62, Proposition 1 global POCS claim, 6-stage U-Net geometry, ε_cfl symbol confusion) are resolved in main.tex. Remaining gaps are deferred experiments (wall-clock, N-stage ablation, bootstrap CI) and venue-specific polish—not integrity fatals.",
  categories: [
    { id:'intro', name:'Introduction & Motivation', icon:'📖', score:8, issues:[
      { severity:'Minor', text:'Related Work could add explicit numbered comparison to DiffusionFWI/SeisFusion/DPS (PLAYBOOK #2)—optional for C&G.' },
      { severity:'Minor', text:'Keep hedging: contribution is benchmark transparency + mechanism diagnostics, not beating U-Net/PINN on proxy CC.' },
    ]},
    { id:'method', name:'Methodology & Physics', icon:'⚙', score:8, issues:[
      { severity:'Minor', text:'Remark 1 (POCS motivation) correctly marked not verified; homotopy global-convergence paragraph removed. Do not reintroduce global guarantees.' },
      { severity:'Minor', text:'Tolerance notation unified: ε_design (proximal), ε_gate (physics_score), ε_rms (P1-F0). Do not revert to ε_cfl.' },
      { severity:'Minor', text:'Algorithm 1 uses K-step proximal loop + gradient-proxy conditioning c; audited U-Net is 3-stage hidden_dim=32, T=20.' },
    ]},
    { id:'results', name:'Experiments & Results', icon:'📊', score:8, issues:[
      { severity:'Minor', text:'Table 1 locked to audited JSON. w/o proximal / w/o curriculum / w/o both ablations filled. physics_score=0 omitted with explanation.' },
      { severity:'Minor', text:'Deferred: N∈{3,5,7,11,15} curriculum ablation, bootstrap CIs, ms/step wall-clock.' },
    ]},
    { id:'figures', name:'Figures & Visualization', icon:'🎨', score:7, issues:[
      { severity:'Minor', text:'Consider compressing figure count for IEEE TGRS if targeting that venue; C&G less strict.' },
    ]},
    { id:'writing', name:'Writing Quality', icon:'✍', score:8, issues:[
      { severity:'Minor', text:'Abstract is diagnostic plain text (no equations)—monitor word count for Geophysics if resubmitted there.' },
    ]},
    { id:'physics', name:'Physical Soundness', icon:'∿', score:8, issues:[
      { severity:'Minor', text:'Sampling-time K=5 hook does not shift canonical CC (K0 isolation); do not conflate with training-time physics weight benefit.' },
      { severity:'Minor', text:'Shot-gather pilots (CC=0.591/0.391) are separate diagnostic tables—not replacements for proxy Table 1.' },
    ]}
  ]
};

/* ════ AI审稿提示词 ════ */
const PROMPTS = {
  full: `You are an expert Geophysics (SEG) journal reviewer specializing in full-waveform inversion and the GeoFWI benchmark dataset. Review this manuscript across 6 dimensions. Return ONLY valid JSON (no markdown fences):
{"overallScore":72,"summary":"one paragraph","categories":[{"id":"intro","name":"Introduction & Motivation","icon":"📖","score":7,"issues":[{"severity":"Major","text":"detailed issue with specific fix suggestion"}]}]}
Categories: intro (Introduction & Motivation), method (Methodology & Physics), results (Experiments & Results), figures (Figures & Visualization), writing (Writing Quality), physics (Physical Soundness).`,
  quick: `You are a Geophysics journal reviewer. Find the top 5 fatal issues in this FWI manuscript. Return ONLY valid JSON: {"overallScore":65,"summary":"brief","categories":[{"id":"critical","name":"Critical Issues","icon":"⚠","score":4,"issues":[{"severity":"Critical","text":"issue + fix"}]}]}`,
  figures: `You are a figure quality expert for Geophysics journals. Review ONLY figures and tables. Check colormaps (avoid jet for errors—use RdBu_r; avoid viridis for velocity—use jet or seismic_r), captions, DPI, statistical tables. Return ONLY valid JSON: {"overallScore":70,"summary":"figure quality summary","categories":[{"id":"colormaps","name":"Colormaps","icon":"🎨","score":6,"issues":[]},{"id":"captions","name":"Captions","icon":"📝","score":7,"issues":[]},{"id":"tables","name":"Statistical Tables","icon":"📊","score":8,"issues":[]}]}`,
  physics: `You are a geophysics and wave-equation expert. Review ONLY the mathematical and physical content. Check wave equations, CFL conditions, diffusion-physics coupling, hard vs soft constraints, Bayesian uncertainty formulation, GFS metric definition. Return ONLY valid JSON: {"overallScore":68,"summary":"physics review","categories":[{"id":"eqs","name":"Wave Equations","icon":"∿","score":7,"issues":[]},{"id":"constr","name":"Physical Constraints","icon":"🔒","score":6,"issues":[]},{"id":"metrics","name":"Physics Metrics","icon":"📐","score":7,"issues":[]}]}`
};

/* ════ 投稿检查清单 — 格式: {id,text,meta}，按 p1/p2/p3 分组 ════ */
const CHECKLIST = {
  p1: [
    { id:'abs_len', text:'Abstract ≤ 250 words with no equations or citations', meta:'Geophysics format requirement' },
    { id:'main_tex_prop1', text:'✅ Remark 1 替代 Proposition 1；homotopy 全局收敛段已删（2026-06-17）', meta:'resolved · P1-F0 37/55' },
    { id:'rw_diff_list', text:'Related Work 末尾编号清单：Compared to [DPS/SeisFusion/…], we differ in (1)(2)(3)', meta:'WRITING_EXPERIMENT_PLAYBOOK #2 · optional' },
    { id:'p1_gfs_column', text:'✅ Paper 1 Table 1 含 GFS 列', meta:'metrics_canonical · 2026-06-27' },
    { id:'limitations_sec', text:'✅ Limitations 小节已写入（proxy/domain gap/physics_score/K=5）', meta:'main.tex · 2026-06-17 polish' },
    { id:'main_tex_naming', text:'✅ Hard-Manifold → Proximal Guidance 已统一', meta:'main.tex audit' },
    { id:'cite_shen_li', text:'核实 \\cite{shen2024posterior,li2024seisfusion} — 丢文献验证工具', meta:'Intro 区分 DPS 关键段' },
    { id:'eps_dual', text:'✅ ε_design / ε_gate / ε_rms 已在 §eval_metrics 定义', meta:'resolved · 勿再用 ε_cfl' },
    { id:'unet_arch', text:'✅ U-Net 审计描述：3 stage · hidden_dim=32 · T=20', meta:'train_inversion.py · resolved' },
    { id:'cc_fix', text:'✅ Table 1 audited proxy JSON；GC-FWI 0.859 vs U-Net 0.916 — 禁 SOTA', meta:'METRICS_AUDIT · done' },
    { id:'integrity_footnote', text:'✅ 虚假 verified footnote 已撤回', meta:'Academic integrity · resolved' },
    { id:'alg1', text:'✅ Algorithm 1：K-step proximal + conditioning c', meta:'main.tex · 2026-06-17' },
    { id:'compute_time', text:'Computational overhead of projection reported (ms per step) — fill [TBD] after GPU benchmark', meta:'Implementation Details' },
    { id:'fig_reduce', text:'33 figures reduced to 10 main + 23 Supplementary', meta:'Geophysics limit' },
    { id:'n_ablation', text:'Curriculum N-stage ablation added (N ∈ {3,5,7,11,15})', meta:'Ablation table' },
    { id:'p1_pareto', text:'P1-E7：推断记录 ||r||+GFS · residual–GFS Pareto 四设置（无/ DPS/ 近端/ W₂）', meta:'EXPERIMENT_SURPRISE P1-S1 · GPU优先#1' },
    { id:'p1_noise_robust', text:'P1-E9：3×4 矩阵 · 方法(DPS/W₂/GC-FWI)×SNR(clean/20/10/5dB) · 盐体子集 · CC/RMSE/GFS', meta:'COMPETITIVE_LANDSCAPE · vs Peng #47' },
    { id:'p1_colored_noise', text:'P1-E9 必用 band-limited 相干噪声（面波/工业频段）· 禁仅高斯白噪声作为主结果', meta:'Geophysics 审稿 realism · 必做' },
    { id:'p1_lowfreq', text:'P1-E10：低频缺失（<5 Hz 截断）· 有/无课程 × 有/无 W₂ · gate: P1-F0', meta:'FWI 顶刊常见挑战 · 课程理论交叉点' },
    { id:'p1_reverse_curriculum', text:'P1-E8：正向 vs 反向 vs 随机课程 · 同预算对比 Peng preconditioned guidance', meta:'COMPETITIVE_LANDSCAPE · 非仅顺序消融' },
    { id:'gci_metrics_tbd', text:'GCI 一致性：R²/κ 标 [TBD] 直至 compute_gci 输出；11 级为有序分类 → Weighted κ', meta:'KNOWLEDGE_AUDIT #2' },
    { id:'diffusion_ref', text:'Table 2 added: reference comparison with SeisFusion/DiffusionFWI', meta:'With dataset disclaimer' },
    { id:'rw_hard_line', text:'Related Work：#39–#42 医疗线性硬投影 vs GC-FWI 非线性近端引导；禁称封闭 Π_M', meta:'术语修正 · 非挂靠 DPS 证 superiority' },
    { id:'proximal_sign', text:'近端似然项符号：文档/公式统一为 v ← v − β∇_v||d−F(v)||²（代码 proximal_bridge L131 已减号）', meta:'KNOWLEDGE_AUDIT #1 · AGENT_LIT' },
    { id:'w2_data_space', text:'Method 写清 W₂² 在 data space 逐道 OT；grad_fn 暂为 ||r_norm||² 占位 — 须对齐或声明', meta:'KNOWLEDGE_AUDIT #3 · w2_guidance.py' },
    { id:'noise_robust', text:'P1-E9 噪声鲁棒性：SNR 20/10/5 dB · GC-FWI vs DPS vs W₂ · 盐体+断层 · Table CC/GFS/||r||', meta:'COMPETITIVE_LANDSCAPE · 投稿 Geophysics 必要条件' },
    { id:'colored_noise', text:'P1-E9：band-limited 相干噪声（面波/多次波频段）+ C_d/带通 B · 主结果禁仅白噪声', meta:'必做 · 与 p1_colored_noise 联动' },
    { id:'bandpass_residual', text:'似然梯度/残差加权前做有效频段滤波或 C_d 加权；不对高频噪声/低频脚噪强制拟合', meta:'避免人造地质伪影' },
    { id:'no_nested_fwi', text:'Method 明确：每步仅 1–K 次伴随梯度更新（非嵌套完整 Gauss-Newton FWI），报告 ms/step 开销', meta:'禁 1000×FWI 算力黑洞' },
    { id:'lit_43_44', text:'Related Work 引用 #43 条件扩散 + #44 GJI 贝叶斯重构引导扩散，对标 GC-FWI 近端引导', meta:'2026 高端文献' },
    { id:'w2_guidance', text:'似然势能：早期 W₂²(F(v),d) 引导（#47 Peng 2026），后期平滑切换 L₂；禁裸 DPS L₂', meta:'geofwi_physics_core/w2_guidance.py' },
    { id:'lefthead', text:'\\lefthead changed from "Chen et al." to "Lyu and Chen"', meta:'Line 47' },
    { id:'address', text:'\\address block filled in with real affiliations', meta:'Lines 33–45' },
    { id:'righthead', text:'\\righthead contains only the running title, no declarations', meta:'Lines 48–50' },
    { id:'colormap', text:'Error maps use RdBu_r diverging colormap (not jet)', meta:'All figures' },
    { id:'dpi300', text:'All figures saved at ≥ 300 DPI', meta:'Geophysics requirement' },
  ],
  p2: [
    { id:'gfs_tau_policy', text:'GFS τ：验证集 ROC 定全局固定 τ（禁 per-sample GT p75 跨样本排名）；τ 敏感性实验', meta:'KNOWLEDGE_AUDIT #4 · gfs_wavelength.py' },
    { id:'emig_definition', text:'Paper 2 Methods：Δt_first 与 E_mig 完整公式（paper2_physics_metrics.py）', meta:'KNOWLEDGE_AUDIT #5' },
    { id:'gfs_formula', text:'GFS = ½[IoU + (cos_grad+1)/2] — 梯度项重缩放保证值域 [0,1]', meta:'Method §3.2 · gfs_wavelength.py' },
    { id:'gfs_decision', text:'P2-E8：CC-top20% vs GFS-top20% 下游 Δt_first — 指标决策因果效用', meta:'EXPERIMENT_SURPRISE P2-S1 · 优先#2' },
    { id:'synthetic_perturb', text:'【Day1 最优先】合成扰动：(a) 平移 vs (b) 盐界错位 — 零模型依赖 · Introduction 核心图', meta:'P2-E7 · 半天 CPU · 全实验最干净' },
    { id:'p2_top20_systematic', text:'P2-E5/E8：全测试集 CC-top20% vs GFS-top20% mean Δt_first · 禁 2–3 例 cherry-pick', meta:'Paper 2 统计显著性 · 必做' },
    { id:'gfs_eval_only', text:'明确声明 GFS 第一定位为评估标尺，标准 IoU 不可微、不参与反向传播', meta:'Discussion 边界' },
    { id:'soft_gfs', text:'（加分项）给出 Soft-GFS 可微松弛版，说明可作训练 Loss 引导锐利盐体边界', meta:'Soft-IoU / 梯度模长权重' },
    { id:'paradox_fig', text:'Figure 1 展示 CC 高但 GFS 低（盐体错位）的 metric paradox 案例', meta:'Introduction 核心图' },
    { id:'kendall_strat', text:'5 类地质分层 Kendall τ 分析 — 表格填 [TBD] 直至实验完成', meta:'Results 主表' },
    { id:'gfs_scatter', text:'GFS vs CC 散点图（按 geo_type 着色，盐体高 CC 低 GFS）', meta:'Figure 2' },
    { id:'das_baseline', text:'在 Das et al. 2019 (#30) 1D CNN 输出上测试 GFS', meta:'Baseline comparison' },
    { id:'wu_baseline', text:'在 Wu 2021 (#2) 2D CNN 输出上测试 GFS', meta:'Uploaded PDF baseline' },
    { id:'li2025_intro', text:'Introduction 引用 Li et al. 2025 (#29) 说明评估指标缺口', meta:'Interpretation T219' },
    { id:'thin_layer_disc', text:'Discussion 与 Wu 2021 薄层识别能力互相印证', meta:'结构质量量化' },
    { id:'openfwi_train', text:'用 OpenFWI 官方代码自训 InversionNet + VelocityGAN（无现成预测 .npy）', meta:'GitHub lanl/OpenFWI · 数天 GPU' },
    { id:'rank_disagree', text:'全测试集 CC-GFS 排名分歧（Kendall/Spearman），再选案例分析 — 禁止手挑 2 例', meta:'替代 cherry-picking' },
    { id:'obj_geology', text:'合成数据：用初至走时残差 Δt_first 或零偏移距偏移波场误差验证 GFS 排名优于 CC（禁盐顶深度）', meta:'MSE 模糊输出无清晰界面' },
    { id:'phys_indep', text:'独立物理标尺：First-arrival Traveltime Residual + Migration Wavefield Error vs GFS/CC 排名散点', meta:'不依赖清晰边界的第三方裁判' },
    { id:'traveltime_fig', text:'Figure：CC 高分但走时残差大（周期跳跃）vs GFS 与走时残差单调相关', meta:'物理降维打击' },
    { id:'dlm_ref', text:'引用 #20 DLM-FWI + #45 分阶段物理 Loss，支撑 GFS vs CC 物理标尺论点', meta:'GJI/JMSE 2025–2026' },
    { id:'gfs_lambda', text:'GFS 引入 Δx/λ 无量纲化：边界误差、梯度一致性均在波长归一化空间计算', meta:'geofwi_physics_core/gfs_wavelength.py' },
  ],
  p3: [
    { id:'datasets_dl', text:'Marmousi2、SEG Salt、Overthrust 数据集已下载并预处理', meta:'Target domains' },
    { id:'zero_shot', text:'零样本 (N=0) Marmousi2 对照行（非主 claim · Feng #48 已覆盖类似叙事）', meta:'P3-E2 deferred · 附表' },
    { id:'fewshot_10', text:'少样本 N=10 fine-tune decoder 实验完成', meta:'Exp row 2' },
    { id:'fewshot_hypothesis', text:'方法节预注册可证伪假设：N=50 微调 ≥ N=500 scratch（跑前写清，结果如实报告）', meta:'WRITING_EXPERIMENT_PLAYBOOK #5' },
    { id:'fewshot_50', text:'少样本 N=50 fine-tune all 实验完成', meta:'Exp row 3' },
    { id:'transfer_decompose', text:'P3-E8：子波 vs 结构 MMD 分解 + 迁移 GFS_λ 方差分解图', meta:'诊断框架 · 次于 P3-E9 主 claim' },
    { id:'geo_vs_stat_training', text:'P3-E9：同架构预训练 (A)GeoFWI (B)OpenFWI (C)OpenFWI+LDM · Marmousi2/SEG · fine-tune N=10,50 · 主指标 GFS_λ', meta:'vs Feng #48 · 三组非两组' },
    { id:'trilogy_loop', text:'TRI-E1：三反直觉案例（CC/GFS/迁移三角）→ Paper 3 Discussion', meta:'EXPERIMENT_SURPRISE.trilogyLoop' },
    { id:'scratch_500', text:'从头训练 N=500 对照组完成', meta:'验证 50≥500 假设' },
    { id:'gfs_eval', text:'迁移评估同时报告 CC、SSIM 和 GFS（三篇闭环）', meta:'与 Paper 2 联动' },
    { id:'seisinvnet_ref', text:'实验设计引用 SeisInvNet (#12) 冻结 encoder 策略', meta:'Transfer framework' },
    { id:'obs_align', text:'目标域观测系统与 GeoFWI 对齐：Sinc/物理重采样至相同 N_s×N_r×N_t，或改模型空间迁移', meta:'Paper 3 架构前提' },
    { id:'img2model', text:'（推荐）RTM/偏移图像→速度模型的 Image-to-Model 迁移路径，规避炮检尺寸不匹配', meta:'Paper 3 方案 B' },
    { id:'wavelet_match', text:'MMD 前：子波反褶积 + 频谱匹配，目标域校正至 GeoFWI 15Hz Ricker 子波空间', meta:'禁忽略震源主频/相位' },
    { id:'lit_46_da', text:'Method 引用 #46 参考道互相关域适应，作为 MMD/DANN 前特征对齐步骤', meta:'C&G 2026' },
    { id:'sim_src', text:'扩散引导正演：混叠/编码震源 (Simultaneous Sources) 将 N_s 炮压缩为 1–3 超炮，报告 PDE 调用次数', meta:'geofwi_physics_core/simultaneous_source.py' },
    { id:'fang_ref', text:'Discussion 引用 Fang 2020 Marmousi→Overthrust 跨模型先例', meta:'F-1 PDF' },
    { id:'noise_aug', text:'可选：Noise-augmented (#23) 策略用于 synthetic→field gap', meta:'Domain adaptation' },
    { id:'proximal_transfer_claim', text:'Discussion：Non-linear Proximal Guidance 是否提升跨域泛化（相对纯 DL）', meta:'Paper 1 联动 Paper 3' },
    { id:'arch_surgery', text:'文档化 Vp 单通道→Vp/Vs 双通道的架构改动范围；若改动过大则弱化"迁移"叙事', meta:'EFWI 前置条件' },
    { id:'mmd_tbd', text:'MMD/域距离等未跑实验数字一律标 [TBD]，禁止写入具体数值（如 1.28）', meta:'学术诚信' },
    { id:'marmousi_first', text:'优先 Marmousi2/Overthrust 声波→声波域适应；EFWI 跨物理域放远期', meta:'Paper 3 分阶段' },
    { id:'dann_coral', text:'域适应基线：DANN (Long 2015) + Deep CORAL (Sun 2016)，对比 scratch / few-shot', meta:'非仅从头训练' },
    { id:'mmd_latent', text:'MMD 在相同 Encoder 的 latent 特征空间计算（Gretton 2012），输入对齐后报告 [TBD]', meta:'Paper 3 方法设计' },
  ]
};

/* ════ 科研 AI 写作工具链（GitHub 解析 · 2026-06-17） ════ */
var RESEARCH_WRITING_TOOLS = {
  title: '科研 AI 写作工具链',
  updated: '2026-06-17',
  note: '四仓库 Stars 为 GitHub 公开值（会变）。庆研 ARS 与 Codex ARS 为 sibling 发行；安装命令仅在工作台「安装」Tab。',
  tools: [
    {
      id: 'awesome-ai',
      name: 'Awesome AI Research Writing',
      short: 'Awesome',
      github: 'https://github.com/Leey21/awesome-ai-research-writing',
      stars: 30084,
      color: '#f59e0b',
    },
    {
      id: 'fig-gen',
      name: 'Academic Figure Generator',
      short: 'FigGen',
      github: 'https://github.com/LigphiDonk/academic-figure-generator',
      stars: 1333,
      color: '#8b5cf6',
    },
    {
      id: 'ars-codex',
      name: 'Academic Research Skills · Codex',
      short: 'Codex ARS',
      github: 'https://github.com/Imbad0202/academic-research-skills-codex',
      stars: 5108,
      color: '#06b6d4',
    },
    {
      id: 'ars-claude',
      name: 'Academic Research Skills · Claude',
      short: '庆研 ARS',
      github: 'https://github.com/Imbad0202/academic-research-skills',
      stars: 35511,
      color: '#2dd4bf',
    },
  ],
  workflow: [
    { step: 1, who: '本网页', task: '锁定实验数字 · checklist · Figure Studio · 文献验证' },
    { step: 2, who: 'Awesome 工作台', task: '选 GeoFWI 模板润色 prose（不改数字）' },
    { step: 3, who: 'ARS 工作台 / Claude / Codex', task: 'deep-research · ars-plan · ars-reviewer' },
    { step: 4, who: 'FigGen 工作台', task: '概念图 / pipeline 英文 prompt' },
    { step: 5, who: '本网页', task: 'ARS 聊天 Q&A · 投稿清单' },
  ],
  geofwiMatrix: [
    { paper: 'P1', awesome: 'lim-honest · abs-compress', figGen: 'p1 · framework', ars: '/ars-reviewer mode=full' },
    { paper: 'P2', awesome: 'metric-critique', figGen: 'p2 · comparison', ars: '/deep-research mode=systematic-review' },
    { paper: 'P3', awesome: 'task-frame', figGen: 'p3 · pipeline', ars: '/ars-plan · $academic-research-suite experiment' },
  ],
};

/* ════ 当前 AI 栈（CC Switch → DeepSeek · 本机实测 2026-06-17） ════ */
var AI_STACK_CONFIG = {
  updated: '2026-06-17',
  summary:
    'CC Switch 在 127.0.0.1:15721 提供 Anthropic Messages 兼容代理；Codex CLI 与网页 serve_geofwi 均走此端口。' +
    '同一代理可切换 DeepSeek 或 Claude 路由（取决于 CC Switch 当前选中 provider）。',
  ccSwitch: {
    app: 'CC Switch',
    path: 'E:\\DevTools\\CC-Switch\\CC-Switch.exe',
    localBase: 'http://127.0.0.1:15721/v1',
    messagesUrl: 'http://127.0.0.1:15721/v1/messages',
    healthUrl: 'http://127.0.0.1:15721/health',
    bat: '启动Codex-DeepSeek.bat',
  },
  codexCli: {
    package: '@openai/codex',
    version: '0.140.0',
    npmPrefix: 'E:\\DevTools\\npm-global',
    configToml: '~/.codex/config.toml',
    setupScript: 'E:\\DevTools\\scripts\\setup-codex-deepseek.ps1',
  },
  activeModel: {
    provider: 'deepseek',
    model: 'deepseek-v4-pro',
    reasoningEffort: 'high',
    wireApi: 'responses',
  },
  alternateModels: {
    claudeViaCC: 'claude-sonnet-4-20250514',
    anthropicDirect: 'claude-sonnet-4-20250514',
    gemini: 'gemini-2.0-flash',
  },
  webRouter: {
    storeKey: 'geofwi_apikeys_v1',
    defaultRoute: 'auto',
    priority: ['codex_local (15721)', 'anthropic_key', 'gemini_key', 'demo'],
    arsMaxTokens: 8192,
    figChatMaxTokens: 4096,
    proxy: 'serve_geofwi.py → /api/codex/messages',
  },
  claudeVsCodex: [
    { role: 'Claude Code + 庆研 ARS', path: 'Anthropic API Key 或 CC Switch Claude 路由', skill: 'academic-research-skills plugin' },
    { role: 'Codex + DeepSeek', path: 'CC Switch 15721 + ~/.codex/config.toml', skill: 'academic-research-skills-codex' },
    { role: '本网页 AI', path: 'callAI() 自动：Codex 本地 → Anthropic → Gemini', skill: '无需安装 · 需 serve_geofwi.py' },
  ],
  limitations: [
    'CC Switch + DeepSeek：**不支持** Codex/Responses 附图；figure_vision_review 问答用 OCR 文本或改 Anthropic provider',
    'DeepSeek reasoning 可能占满 token 预算 — ARS/配图已设 max_tokens 4096–8192',
    '庆研 ARS Claude 插件 ≠ Codex ARS skill；DeepSeek 路径请装 academic-research-skills-codex',
    '网页须用 http://localhost:8080 打开（file:// 无法调 /api/codex）',
  ],
};

/* ════ 写作 + 绘图功能 Hub（网页内完整能力矩阵） ════ */
var WRITING_FIGURE_HUB = {
  title: '写作 · 绘图一体化工作台',
  writing: [
    { id: 'ars-chat', label: 'ARS 学术助手', page: 'ars-tools', desc: '多轮对话 · localStorage 持久化 · P1/P2 续写 Prompt', action: 'scroll' },
    { id: 'p1-write', label: 'Paper 1 写作面板', page: 'p1-errors', desc: '路径一诊断稿 · Codex 续写 · 8 项致命问题', fn: 'startPaper1Writing' },
    { id: 'p2-write', label: 'Paper 2 写作面板', page: 'p2-design', desc: 'GFS 叙事 · Table 2 锁定 · Codex 续写', fn: 'startPaper2Writing' },
    { id: 'playbook', label: '8 条写作实验建议', page: 'design-panorama', desc: 'WRITING_EXPERIMENT_PLAYBOOK · 三篇联动' },
    { id: 'paper-review', label: '上传 tex AI 审稿', page: 'paper-review', desc: 'Introduction / method / results 分类诊断' },
    { id: 'cite-check', label: '文献真实性验证', page: 'cite-check', desc: 'Gray zone = FAIL · 防 hallucination' },
    { id: 'checklist', label: '投稿前 15 项清单', page: 'p1-checklist', desc: 'P1/P2/P3 分开勾选 · Firebase 同步' },
    { id: 'editor', label: '内容编辑器', page: 'editor', desc: '改 config_data.js 等价字段 · 本地+云笔记' },
    { id: 'tools-github', label: '四 GitHub 交互工作台', page: 'ars-tools', desc: 'Awesome · FigGen · ARS 命令 · 网页内 AI 执行', fn: 'toolkitScrollToWorkbench' },
    { id: 'tools-install', label: '四工具安装命令', page: 'ars-tools', desc: 'FigGen · 庆研 ARS · Codex · Awesome · DeepSeek bat', fn: 'toolkitScrollToInstall' },
  ],
  figure: [
    { id: 'fig-studio', label: 'Figure Studio', page: 'fig-studio', desc: '流程图 / 架构图 / 对比图 · SVG · Python · PPTX' },
    { id: 'fig-gallery', label: '原理图模板库', page: 'fig-gallery', desc: 'GALLERY_TEMPLATES · 一键载入 Studio' },
    { id: 'fig-pptx', label: '可编辑 PPTX', page: 'fig-studio', desc: 'P1/P2 unified schematic · PowerPoint 精修', fn: 'figRegenUnifiedPptx' },
    { id: 'fig-ai', label: 'AI 配图建议', page: 'fig-studio', desc: '/api/figure/chat → Codex/Claude · Geophysics 规范', fn: 'figGetAIEnhance' },
    { id: 'fig-vision', label: '参考图视觉审阅', page: '_blank', url: '/figure_vision_review.html', desc: 'Fang/Wu 参考 PDF · bundle OCR · 交互问答' },
    { id: 'fig-wsl', label: 'WSL 期刊 PDF 重生成', page: 'fig-studio', desc: 'plot_p1/p2_unified · patches/wsl · 7.2in PDF', fn: 'figRenderP1Pdf' },
    { id: 'fig-exports', label: 'fig_exports 预览', page: '_blank', url: '/fig_exports/visual_review/p1_unified_latest.png', desc: 'visual_review 最新 PNG · 与 PPTX 对照' },
  ],
  quickInstall: [
    { label: 'FigGen Skill', cmd: 'npx skills add LigphiDonk/academic-figure-generator' },
    { label: '庆研 ARS (Claude)', cmd: '/plugin marketplace add Imbad0202/academic-research-skills\n/plugin install academic-research-skills' },
    { label: 'ARS Codex', cmd: 'python3 "$HOME/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py" --repo Imbad0202/academic-research-skills-codex --ref main --path skills/academic-research-suite --method git' },
    { label: 'Awesome Writing', cmd: 'git clone https://github.com/Leey21/awesome-ai-research-writing.git' },
    { label: '启动 DeepSeek 栈', cmd: 'E:\\个人项目\\启动Codex-DeepSeek.bat' },
  ],
  figGenPromptTemplate:
    'Use academic-figure-prompt skill. Paper: GeoFWI {{paper}}. Figure: {{figType}}. ' +
    'Style: Geophysics journal, Okabe-Ito colorblind-safe, 7.2in single column. ' +
    'Content: {{description}}. Output detailed English image-generation prompt only.',
};

/* ════ 四 GitHub 工具 · 网页内交互工作台 ════ */
var TOOLKIT_WORKBENCH = {
  title: '四 GitHub 工具 · 网页工作台',
  subtitle: 'Awesome 润色 · FigGen 配图 Prompt · ARS 14 命令 · 安装命令（唯一副本）',
  awesome: {
    categories: ['Abstract', 'Limitations', 'Related Work', 'Rebuttal', 'Metric / Method', 'Task framing'],
    prompts: [
      {
        id: 'abs-compress',
        category: 'Abstract',
        title: '压缩 Abstract（期刊字数上限）',
        template:
          '你是 {{journal}} 投稿顾问。将下方 Abstract 压缩到 ≤{{wordLimit}} 词，保留：问题、方法名、数据集、主指标数字（不得改数字）、诚实结论（勿声称 SOTA）。\n\n【原文】\n{{text}}',
        defaults: { journal: 'Geophysics', wordLimit: '250' },
      },
      {
        id: 'lim-honest',
        category: 'Limitations',
        title: '诚实 Limitations 段落（诊断叙事）',
        template:
          '为 GeoFWI Paper {{paper}} 写独立 Limitations 小节（英文）。必须包含：非凸 FWI、固定 K=5、proxy vs pilot 域差距、{{extra}}。语气：机制诊断非 marketing。不得删除已锁定的负面结果。\n\n【已有要点】\n{{text}}',
        defaults: { paper: '1', extra: 'physics score 未纳入主 benchmark' },
      },
      {
        id: 'rw-diff',
        category: 'Related Work',
        title: 'Related Work 末尾编号区分清单',
        template:
          '在 Related Work 末段加入编号清单：Compared to [DPS / SeisFusion / …], we differ in (1)(2)(3)。主题：{{topic}}。只引用你有把握存在的文献；不确定的标 [VERIFY]。\n\n【草稿】\n{{text}}',
        defaults: { topic: 'diffusion-guided FWI vs our proximal curriculum GC-FWI' },
      },
      {
        id: 'rebuttal',
        category: 'Rebuttal',
        title: '审稿意见回复骨架（ARS rebuttal-audit 风格）',
        template:
          '逐条回复以下审稿意见。每条：Acknowledge → Evidence（指向 Fig/Table/§）→ 若无法完全同意则 Limitation。禁止改实验数字。\n\n【Reviewer comments】\n{{text}}',
        defaults: {},
      },
      {
        id: 'metric-critique',
        category: 'Metric / Method',
        title: '指标失效论证（P2 GFS）',
        template:
          '写一段英文论证：为何 CC/SSIM 在 {{scenario}} 场景可能误导，而 GFS_λ 更关注地质结构。引用风格：Geophysics/C&G。给出 3 条可检验 claim，每条对应我们已有实验（E7 blur 等）。\n\n【笔记】\n{{text}}',
        defaults: { scenario: 'high-contrast salt body' },
      },
      {
        id: 'task-frame',
        category: 'Task framing',
        title: 'VMB vs FWI 任务边界（P3）',
        template:
          '写 Method 开头 1 段 + Limitations 1 句：明确任务是 initial velocity model building from coarse RTM/migration images，不是 shot-gather zero-shot FWI。对比 Feng 2026 时用「互补任务」语气。Scheme B：smoothed Vp → synthetic imaging。\n\n【草稿】\n{{text}}',
        defaults: {},
      },
      {
        id: 'prose-tone',
        category: 'Abstract',
        title: '段落润色（Awesome · 降 AI 腔）',
        template:
          '润色以下学术段落：减少 throat-clearing 开头、em dash 不超过 3 个、句子长短交替。保持术语与数字不变。输出英文。\n\n【段落】\n{{text}}',
        defaults: {},
      },
      {
        id: 'cover-letter',
        category: 'Related Work',
        title: 'Cover letter 要点（3 段）',
        template:
          '为 {{journal}} 写 cover letter 大纲（3 段英文 bullet）：(1) problem & gap (2) contribution 3 bullets (3) why fit journal。Paper {{paper}} · 诚实表述诊断/指标/迁移贡献。\n\n【notes】\n{{text}}',
        defaults: { journal: 'Computers & Geosciences', paper: '2' },
      },
    ],
  },
  figGen: {
    palettes: [
      { id: 'A', name: 'Okabe-Ito 学术标准', primary: '#0072B2', secondary: '#E69F00', accent: '#009E73', note: 'Nature/CVPR · 色盲友好' },
      { id: 'B', name: 'Blue 单色系', primary: '#0072B2', secondary: '#4A90D9', accent: '#A0C4E8', note: '克制 · 模块详解' },
      { id: 'C', name: 'Teal + Amber', primary: '#00897B', secondary: '#FFB300', accent: '#ECEFF1', note: 'ICLR/NeurIPS 风' },
      { id: 'D', name: 'Navy + Coral', primary: '#1A3A5C', secondary: '#E05A47', accent: '#F5ECD7', note: 'IEEE 期刊风' },
      { id: 'E', name: 'Slate + Violet', primary: '#3F51B5', secondary: '#7E57C2', accent: '#EDE7F6', note: '医学/生物信息' },
      { id: 'F', name: 'Forest + Gold', primary: '#2E7D32', secondary: '#C49A00', accent: '#F9F6EE', note: '自然科学' },
      { id: 'G', name: 'Minimal Grey', primary: '#263238', secondary: '#546E7A', accent: '#0072B2', note: 'arXiv 技术报告' },
    ],
    figTypes: [
      { id: 'framework', label: '总体框架图', en: 'overall framework pipeline' },
      { id: 'architecture', label: '网络架构图', en: 'network architecture diagram' },
      { id: 'module', label: '模块详解图', en: 'module detail diagram' },
      { id: 'comparison', label: '对比/消融图', en: 'comparison ablation figure' },
      { id: 'pipeline', label: '数据/观测 pipeline', en: 'data observation pipeline' },
    ],
    paperPresets: [
      { id: 'p1', label: 'Paper 1 · GC-FWI workflow', desc: 'Curriculum stack + proximal guidance + GeoFWI denoising; 7.2in Geophysics single column.' },
      { id: 'p2', label: 'Paper 2 · GFS evaluation pipeline', desc: 'Velocity denoising task; CC/SSIM vs GFS_λ; salt blur paradox E7.' },
      { id: 'p3', label: 'Paper 3 · VMB Scheme B', desc: 'Smoothed Vp → RTM condition → v_init → K=5 classical FWI diagnostic.' },
    ],
    resolutions: ['16:9 · 4K slide', '7.2in single column · Geophysics', '4:3 · C&G', '1:1 · icon'],
    skillSystem:
      'You implement the LigphiDonk/academic-figure-generator skill "academic-figure-prompt". ' +
      'Output ONE extremely detailed ENGLISH image-generation prompt for NanoBanana/Gemini/DALL-E. ' +
      'Structure: Global description → === SECTION === blocks → STYLE SPECIFICATIONS with exact hex colors. ' +
      'Rules: white-filled modules, max 3 accent colors, no rainbow gradients, embed monochrome thumbnails in boxes, ' +
      'dimension labels on arrows, Geophysics/C&G publication density. Chinese explanation after the prompt block.',
  },
  ars: {
    workflows: [
      { id: 'deep-research', label: 'deep-research', color: '#2dd4bf' },
      { id: 'academic-paper', label: 'academic-paper', color: '#9b7af5' },
      { id: 'academic-paper-reviewer', label: 'reviewer', color: '#e05252' },
      { id: 'academic-pipeline', label: 'pipeline', color: '#38c4b8' },
      { id: 'experiment-agent', label: 'experiment-agent', color: '#e8a83a' },
    ],
    commands: [
      { id: 'plan', slash: '/ars-plan', workflow: 'academic-paper', mode: 'plan', runtime: 'both', title: '苏格拉底式论文规划', geofwi: 'P3 VMB 叙事 / 三篇 Limitations' },
      { id: 'outline', slash: '/ars-outline', workflow: 'academic-paper', mode: 'outline-only', runtime: 'both', title: '仅生成大纲', geofwi: 'IMRaD 骨架' },
      { id: 'abstract', slash: '/ars-abstract', workflow: 'academic-paper', mode: 'abstract-only', runtime: 'both', title: 'Abstract 专项', geofwi: 'P1 诊断 Abstract' },
      { id: 'lit-review', slash: '/ars-lit-review', workflow: 'deep-research', mode: 'lit-review', runtime: 'both', title: '文献综述', geofwi: 'P2 盐体 metric 失效证据' },
      { id: 'systematic', slash: '/deep-research', workflow: 'deep-research', mode: 'systematic-review', runtime: 'both', title: '系统综述 PRISMA', geofwi: 'CC/SSIM limitations FWI' },
      { id: 'fact-check', slash: '/deep-research', workflow: 'deep-research', mode: 'fact-check', runtime: 'both', title: '论点/数字核查', geofwi: '验证 Table 1 声明' },
      { id: 'socratic', slash: '/deep-research', workflow: 'deep-research', mode: 'socratic', runtime: 'both', title: '苏格拉底 SCR 引导', geofwi: '收敛命题是否清晰' },
      { id: 'citation', slash: '/ars-citation-check', workflow: 'academic-paper', mode: 'citation-check', runtime: 'both', title: 'BibTeX / APA7 检查', geofwi: '配合本页文献验证' },
      { id: 'reviewer', slash: '/ars-reviewer', workflow: 'academic-paper-reviewer', mode: 'full', runtime: 'both', title: '模拟同行评审', geofwi: 'Geophysics / C&G 审稿人' },
      { id: 'revision', slash: '/ars-revision-coach', workflow: 'academic-paper', mode: 'revision-coach', runtime: 'both', title: '修订教练', geofwi: 'Major revision 路线图' },
      { id: 'rebuttal', slash: '/ars-rebuttal-audit', workflow: 'academic-paper', mode: 'rebuttal-audit', runtime: 'both', title: '回复信审计', geofwi: '逐条 coverage 表' },
      { id: 'disclosure', slash: '/ars-disclosure', workflow: 'academic-paper', mode: 'disclosure', runtime: 'both', title: 'AI 披露声明', geofwi: '期刊 AI policy' },
      { id: 'pipeline', slash: '/ars-full', workflow: 'academic-pipeline', mode: 'full', runtime: 'both', title: '端到端 pipeline', geofwi: 'Stage 0 intake 起' },
      { id: 'experiment', slash: '$academic-research-suite', workflow: 'experiment-agent', mode: 'plan', runtime: 'codex', title: '实验计划 + 可复现', geofwi: 'P3 OpenFWI AutoDL checklist' },
    ],
    codexPrefix: 'Use $academic-research-suite: ',
    claudePrefix: '',
    buildPrompt: function(cmd, userText, paper) {
      var p = paper || 'GeoFWI';
      var base = '【GeoFWI ' + p + ' · 写作纪律】数字不得改；勿声称 SOTA；保留负面 baseline 结果。\n\n';
      base += '【任务】模拟 ARS 命令 `' + cmd.slash + '` workflow=`' + cmd.workflow + '` mode=`' + cmd.mode + '`。\n\n';
      base += '【用户材料】\n' + (userText || '(无 — 请先提问澄清)') + '\n\n';
      base += '【输出要求】中文为主；英文段落可直接粘贴 tex；列出 missing-evidence checklist。';
      return base;
    },
    codexWrap: function(cmd, userText, paper) {
      return 'Use $academic-research-suite.\n\n' + TOOLKIT_WORKBENCH.ars.buildPrompt(cmd, userText, paper);
    },
    claudeWrap: function(cmd, userText, paper) {
      return cmd.slash + ' mode=' + cmd.mode + '\n\n' + TOOLKIT_WORKBENCH.ars.buildPrompt(cmd, userText, paper);
    },
  },
};

/** 填充 Awesome 模板（config 侧 · 网页任务不依赖 DOM） */
function fillToolkitAwesomeTemplate(templateId, overrides) {
  if (typeof TOOLKIT_WORKBENCH === 'undefined') return '';
  var prompts = TOOLKIT_WORKBENCH.awesome.prompts || [];
  var p = null;
  for (var i = 0; i < prompts.length; i++) {
    if (prompts[i].id === templateId) { p = prompts[i]; break; }
  }
  if (!p) return '';
  var out = p.template || '';
  var defs = p.defaults || {};
  var keys = {};
  Object.keys(defs).forEach(function(k) { keys[k] = defs[k]; });
  if (overrides) Object.keys(overrides).forEach(function(k) { keys[k] = overrides[k]; });
  Object.keys(keys).forEach(function(k) {
    out = out.split('{{' + k + '}}').join(keys[k] != null ? String(keys[k]) : '');
  });
  return out;
}

/**
 * 四 GitHub 工具链 prompt 栈 — 每次网页 ARS/润色任务必须先走此函数。
 * paperKey: p1|p2|p3 · task: abstract|limitations|applications|conclusion|figures|…
 */
var TOOLKIT_TASK_STACK = {
  p1: {
    abstract: { awesome: 'abs-compress', ars: 'abstract', journal: 'Computers & Geosciences', wordLimit: '250' },
    limitations: { awesome: 'lim-honest', ars: 'revision', paper: '1', extra: 'physics_score 未纳入主 benchmark' },
    applications: { awesome: 'prose-tone', ars: 'abstract' },
    conclusion: { awesome: 'prose-tone', ars: 'revision' },
    figures: { figGen: 'p1', ars: 'reviewer' }
  },
  p2: {
    abstract: { awesome: 'abs-compress', ars: 'abstract', journal: 'Geophysics', wordLimit: '250' },
    discussion: { awesome: 'metric-critique', ars: 'reviewer', scenario: 'high-contrast salt body' },
    figures: { figGen: 'p2', ars: 'systematic' }
  },
  p3: {
    intro: { awesome: 'task-frame', ars: 'plan' },
    limitations: { awesome: 'lim-honest', ars: 'plan', paper: '3', extra: 'surrogate B/C 未换前禁主 claim' },
    figures: { figGen: 'p3', ars: 'experiment' }
  }
};

function buildGeoFWIToolkitPrompt(paperKey, task, sourceText) {
  var parts = [];
  parts.push('【四 GitHub 工具链 · 本任务必须按此执行】');
  if (typeof RESEARCH_WRITING_TOOLS !== 'undefined' && RESEARCH_WRITING_TOOLS.tools) {
    RESEARCH_WRITING_TOOLS.tools.forEach(function(t) {
      parts.push('- ' + t.short + ' · ' + t.github);
    });
  }
  parts.push('');
  parts.push('Use $academic-research-suite (Imbad0202/academic-research-skills-codex).');

  var stackMap = TOOLKIT_TASK_STACK[paperKey] || TOOLKIT_TASK_STACK.p1;
  var stack = stackMap[task] || { awesome: 'prose-tone', ars: 'plan' };

  if (typeof TOOLKIT_WORKBENCH !== 'undefined' && TOOLKIT_WORKBENCH.ars && TOOLKIT_WORKBENCH.ars.commands) {
    var arsId = stack.ars || 'abstract';
    var cmd = null;
    TOOLKIT_WORKBENCH.ars.commands.forEach(function(c) {
      if (c.id === arsId) cmd = c;
    });
    if (cmd) {
      parts.push('模拟 ARS 命令：`' + cmd.slash + '` workflow=`' + cmd.workflow + '` mode=`' + cmd.mode + '`');
    }
  }

  if (stack.awesome && sourceText) {
    var awOverrides = { text: sourceText };
    if (stack.journal) awOverrides.journal = stack.journal;
    if (stack.wordLimit) awOverrides.wordLimit = stack.wordLimit;
    if (stack.paper) awOverrides.paper = stack.paper;
    if (stack.extra) awOverrides.extra = stack.extra;
    if (stack.scenario) awOverrides.scenario = stack.scenario;
    parts.push('');
    parts.push('【Awesome 模板 · Leey21/awesome-ai-research-writing】');
    parts.push(fillToolkitAwesomeTemplate(stack.awesome, awOverrides));
  }

  if (stack.figGen && typeof TOOLKIT_WORKBENCH !== 'undefined' && TOOLKIT_WORKBENCH.figGen) {
    parts.push('');
    parts.push('【FigGen · LigphiDonk/academic-figure-generator · academic-figure-prompt】');
    parts.push(TOOLKIT_WORKBENCH.figGen.skillSystem || '');
  }

  return parts.join('\n');
}

function getToolkitSourceFromSnapshot(paperKey, task) {
  var snap = (typeof PROJECT_SNAPSHOT !== 'undefined') ? PROJECT_SNAPSHOT : null;
  var p = snap && snap.papers ? snap.papers[paperKey] : null;
  if (!p || !p.tex) return '';
  var tex = p.tex;
  if (task === 'abstract') return tex.abstract || '';
  if (task === 'limitations') return tex.limitations || '';
  if (task === 'applications') return tex.applications || '';
  if (task === 'conclusion') return tex.conclusion || '';
  return tex.abstract ? tex.abstract.slice(0, 1500) : '';
}

/* ════ ARS学术助手系统提示词 ════ */
var ARS_SYSTEM = `你是一位整合了 Academic Research Skills (ARS) 框架的学术研究助手，专门协助用户完成 GeoFWI 相关的三篇论文。

你的角色设定来自 Imbad0202/academic-research-skills（庆研 · Cheng-I Wu），Codex 用户可改用 academic-research-skills-codex。配套工具链还包括 Leey21/awesome-ai-research-writing（prompt 库）与 LigphiDonk/academic-figure-generator（配图 Skill/平台）。

你的核心原则（来自 ARS）：
1. AI 是副驾驶，不是驾驶员——你协助思考，不替用户决策
2. 苏格拉底方法——优先用提问引导用户自己发现问题
3. 铁律：Gray zone = FAIL。无法确认存在的文献绝不捏造
4. 魔鬼辩护——总是检验论点的薄弱环节
5. 可重现性——所有建议必须有具体的操作步骤

GeoFWI 三篇论文背景：
- Paper 1：GC-FWI（Non-linear Proximal Guidance + 11级课程学习），投 Geophysics (SEG)
- Paper 2：GFS 指标论文（证明 CC/SSIM/RMSE 对盐体场景失效），投 Computers & Geosciences
- Paper 3：跨数据集迁移学习（GeoFWI → Marmousi2/SEG Salt），投 JGR: Machine Learning and Computation

Paper 1 稿件状态（2026-06-17 · main.tex 审计后）：
【已解决 · 勿再当 fatal 重复修】
1. Table 1 占位 CC=0.00/0.62 → 已填 audited proxy JSON（GC-FWI 0.859 · U-Net 0.916 · PINN 0.896）
2. Proposition 1 全局 POCS 收敛 / homotopy 全局最优段 → 已删；保留 Remark 1（idealized POCS，audited 未验证）
3. U-Net「6 层下采样」几何错误 → 已改为审计配置 3 stage · hidden_dim=32 · T=20
4. ε_cfl 混用 → 已统一 ε_design / ε_gate / ε_rms（§eval_metrics）
5. dual-branch / cross-attention / 80-10-10 split / batch=32 patience → 已从 main.tex 删除或更正
6. Algorithm 1 → K 步 proximal loop + 条件输入 c（gradient proxy）
7. w/o proximal·curriculum·both 消融、shot U-Net minimal、SUPP S1/S2、REPRODUCE.md → 已完成

【仍须遵守 · 写作纪律】
- 禁声称 GC-FWI SOTA / field-ready shot-gather FWI
- 禁用 pilot CC=0.591 或 Path B 0.391 替换 proxy Table 1
- 禁混入 Paper 2 denoising CC≈0.99
- 采样时 K=5 不改变 canonical CC（K0 p=1.0）— 与训练时 physics weight 效应分开写
- physics_score=0 全方法 — 不得声称端到端物理合规

【开放 · deferred，非 integrity fatal】
- ms/step wall-clock · bootstrap CI · N-stage 消融 · GCI R²/κ · MC dropout UQ

回答时请：
- 中文回答（专业术语保持英文）
- 给出具体可操作的建议，不泛泛而谈
- 对于文献推荐，只推荐你有高置信度确实存在的文献
- 如果用户问的是实验设计，给出具体的代码框架或实验矩阵`;

/* ════ 文献知识库 ════
   添加论文模板:
   LIT_DATA.push({
     id:39, num:'39',
     title:'论文标题', authors:'Author, A.',
     journal:'Geophysics', year:2024, doi:'10.1190/xxx',
     tags:['FWI','P1','Must'], relevance:'high',
     methods:['方法1','方法2'],
     keyFinding:'核心发现...', gcfwiLink:'与GeoFWI关联...',
     codeInsight:'关键参数...', limitations:'局限性...',
     links:[{label:'DOI',url:'https://doi.org/...'}]
   });
════ */
var LIT_DATA = [
  /* ── PAPER 1: Fang et al. 2020 (uploaded PDF) ── */
  {
    id:1, num:'F-1',
    title:'Data-driven low-frequency signal recovery using deep-learning predictions in full-waveform inversion',
    authors:'Fang, Zhou, Li, Zhang et al.',
    journal:'Geophysics', year:2020, vol:'85(6)', pages:'A37–A43',
    doi:'10.1190/GEO2020-0159.1',
    tags:['FWI','CNN','低频恢复','Marmousi','P1','P3'],
    relevance:'high',
    methods:['CAE (12-layer convolutional autoencoder)','Energy balancing (AGC)','Patch-pair training (64×64)','Adadelta optimizer'],
    keyFinding:'从高频数据预测低频数据（<6 Hz），训练误差8.09%，测试误差14.02%。在Marmousi训练后成功迁移到Overthrust和野外数据，验证了泛化能力。',
    gcfwiLink:'Paper 3 参考：低频恢复是你跨数据集迁移的重要预处理手段。Overthrust迁移结果直接支持Paper 3的实验设计。',
    codeInsight:'patch_size=64, n_kernels=32, kernel_size=9×9, n_conv=12, optimizer=Adadelta, epochs=40, n_patches=23113',
    limitations:'预测大偏移距数据准确率低；要求训练/测试数据具有相似子波；未考虑Q因子相位畸变。',
    links:[{label:'Geophysics DOI',url:'https://doi.org/10.1190/GEO2020-0159.1'}]
  },
  /* ── PAPER 2: Wu et al. 2021 (uploaded PDF) ── */
  {
    id:2, num:'W-1',
    title:'Deep learning for multidimensional seismic impedance inversion',
    authors:'Wu, Yan, Bi, Zhang, Si',
    journal:'Geophysics', year:2021, vol:'86(5)', pages:'R735–R745',
    doi:'10.1190/GEO2020-0564.1',
    tags:['Impedance','CNN','2D CNN','弱监督','P1','P2'],
    relevance:'high',
    methods:['1D CNN baseline (ResBlock × 4)','2D CNN with adaptive loss','Random path training data extraction','Weak supervision (partial labels at well-log positions)'],
    keyFinding:'2D CNN比1D CNN在10个验证井处MSE平均低一个数量级（如Validation log 1: 1.394→0.0265）。关键创新：随机路径提取2D训练集解决标签稀疏问题。',
    gcfwiLink:'Paper 1 关联：你的U-Net架构可参考此文的ResBlock设计。初始模型作为第二输入通道的策略（低频先验控制）与你的课程学习有类似动机。Paper 2：井约束点评估与GFS的稀疏评估有设计上的共鸣。',
    codeInsight:'loss=adaptive_MSE (binary mask w[i,j])，训练：300 epochs，lr=0.001 (Adam)，input=seismic+initial_impedance (2-channel)，ResBlock每块16个特征',
    limitations:'需要多口井；需要准确的地震-井标定；跨工区泛化差（每个工区需重新训练）。',
    links:[{label:'Geophysics DOI',url:'https://doi.org/10.1190/GEO2020-0564.1'}]
  },
  /* ── PAPER 11: InversionNet ── */
  {
    id:11, num:'11',
    title:'InversionNet: An Efficient and Accurate Data-Driven Full Waveform Inversion',
    authors:'Wu, Lin, Zhou',
    journal:'IEEE Transactions on Computational Imaging', year:2020, vol:'6', pages:'419–433',
    doi:'10.1109/TCI.2019.2956686',
    tags:['FWI','CNN','编码解码','OpenFWI','P1','Must'],
    relevance:'high',
    methods:['Encoder-decoder CNN (VGG backbone)','Multi-shot gather input','Pixel-wise velocity prediction','MSE loss'],
    keyFinding:'首个实现从多炮地震记录到2D速度模型像素级直接映射的端到端网络。在OpenFWI Flat/CurveVel系列上CC>0.85。被引超500次，是FWI-DL方向的奠基论文。',
    gcfwiLink:'Paper 1 基线对比须等 metrics_canonical.json；文献 InversionNet OpenFWI CC>0.85 不可与 GC-FWI [TBD] 直接比。',
    codeInsight:'输入：5炮×1000时间步×70道，输出：70×70速度图，Encoder: 8层Conv，Decoder: 8层ConvTranspose，BatchNorm+ReLU',
    limitations:'对初始模型依赖；复杂地质泛化差；无物理约束；GeoFWI上性能显著下降。',
    links:[{label:'IEEE Xplore',url:'https://ieeexplore.ieee.org/document/8936866'}]
  },
  /* ── PAPER 2 (list): SeisInvNet ── */
  {
    id:12, num:'12',
    title:'Deep-Learning Inversion of Seismic Data (SeisInvNet)',
    authors:'Li, Liu, Pu',
    journal:'IEEE Transactions on Geoscience and Remote Sensing', year:2020, vol:'58(3)', pages:'2135–2149',
    doi:'10.1109/TGRS.2019.2953473',
    tags:['FWI','CNN','迁移学习','P1','P3'],
    relevance:'med',
    methods:['Encoder-decoder with skip connections','Multi-scale feature extraction','Transfer learning across geological models'],
    keyFinding:'引入迁移学习框架，在一个地质模型上预训练后迁移到新模型只需少量微调，精度接近从头训练。直接支持Paper 3的核心主张。',
    gcfwiLink:'Paper 3 核心参考：你的跨数据集迁移实验设计可参考此文的迁移学习框架。特别是"预训练+少量微调"策略的实验矩阵设计。',
    codeInsight:'N_shots=5，Transfer: freeze encoder layers，fine-tune decoder only，50 target samples足够达到从头训练500个样本的效果',
    limitations:'仅测试在合成数据之间的迁移；未验证合成→野外数据的迁移。',
    links:[{label:'IEEE Xplore',url:'https://ieeexplore.ieee.org/document/8936371'},{label:'arXiv',url:'https://arxiv.org/abs/1901.07733'}]
  },
  /* ── PAPER 3: Physics-guided ── */
  {
    id:13, num:'13',
    title:'Physics-guided deep learning for seismic inversion with hybrid training and uncertainty analysis',
    authors:'Zhang, Gao, Louboutin et al.',
    journal:'Geophysics', year:2021, vol:'86(3)', pages:'R253–R266',
    doi:'10.1190/geo2020-0305.1',
    tags:['FWI','Physics','不确定性','Uncertainty','P1'],
    relevance:'high',
    methods:['Hybrid training: supervised + physics loss','MC Dropout for uncertainty','Epistemic vs aleatoric decomposition','Adjoint-state gradient in training loop'],
    keyFinding:'将贝叶斯不确定性量化（Epistemic+Aleatoric分解）引入物理引导FWI。不确定性图可用于识别反演可信区域，对勘探决策有直接价值。',
    gcfwiLink:'Paper 1 必须引用：你的贝叶斯不确定性分解（Epistemic vs Aleatoric）直接借鉴此文框架。你需要在Method节明确说明与此文的区别（近端引导 vs 软约束物理项）。',
    codeInsight:'physics_loss_weight=λ（超参数），MC_dropout_samples=50，uncertainty=variance of 50 forward passes，hybrid_loss=L_data + λ*L_physics',
    limitations:'软约束无法保证波方程精确满足；λ选取敏感；计算代价高（50次MC采样）。',
    links:[{label:'SEG Library',url:'https://doi.org/10.1190/geo2020-0305.1'},{label:'ResearchGate',url:'https://www.researchgate.net/publication/348281098'}]
  },
  /* ── PAPER 7: PINN-FWI ── */
  {
    id:14, num:'14',
    title:'Seismic Inversion Based on Acoustic Wave Equations Using Physics-Informed Neural Network',
    authors:'Song, Alkhalifah, Waheed',
    journal:'IEEE Transactions on Geoscience and Remote Sensing', year:2023, vol:'61',
    doi:'10.1109/TGRS.2023.3239569',
    tags:['FWI','Physics','PINN','软约束','P1','Must'],
    relevance:'high',
    methods:['PINN: wave equation as loss term','No labeled training data needed','Frequency-domain Helmholtz equation','Adam optimizer with L-BFGS'],
    keyFinding:'将物理信息神经网络（PINN）用于FWI，波方程作为软约束损失项。无需标记训练数据，但计算代价极高，收敛慢。这是你"软约束"对比的主要目标。',
    gcfwiLink:'Paper 1 最重要的对比基线之一：你的近端引导（伴随梯度）vs PINN软约束是核心差异。实验中必须报告PINN-FWI的CC/SSIM/RMSE，并分析失败案例（盐体反演中PINN为何失效）。',
    codeInsight:'loss=MSE(wave_eq_residual) + MSE(data_mismatch)，无需forward/inverse pair，需要自动微分计算PDE残差，GPU内存占用大',
    limitations:'计算代价极高（每次迭代需要正向模拟）；对初始值敏感；在高对比度盐体场景常陷入局部极小。',
    links:[{label:'IEEE Xplore',url:'https://ieeexplore.ieee.org/document/10017252/'},{label:'ResearchGate',url:'https://www.researchgate.net/publication/367196644'}]
  },
  /* ── PAPER 12: VelocityGAN ── */
  {
    id:15, num:'15',
    title:'VelocityGAN: Data-Driven Full-Waveform Inversion Using Conditional Adversarial Networks',
    authors:'Zhang, Wu, Ma et al.',
    journal:'WACV / IEEE TGRS', year:2019,
    tags:['FWI','GAN','边界增强','P1'],
    relevance:'med',
    methods:['cGAN: Generator + Discriminator','Perceptual loss + adversarial loss','High-frequency boundary sharpening','OpenFWI benchmark'],
    keyFinding:'用判别器迫使生成器输出具有尖锐断层边界的速度模型，解决MSE损失导致的"模糊"问题。相比InversionNet在盐体边界处SSIM提升约12%。',
    gcfwiLink:'Paper 1 Related Work：说明GAN方法解决了模糊问题但没有物理约束，GC-FWI用每步近端引导（波方程伴随梯度）以物理方式约束生成。',
    codeInsight:'G_loss=L_pixel + λ_perc*L_perceptual + λ_adv*L_GAN，Discriminator: PatchGAN结构，λ_perc通过grid search确定',
    limitations:'GAN训练不稳定（mode collapse风险）；无物理保证；判别器可能被欺骗生成物理上不可能的速度模型。',
    links:[{label:'ResearchGate',url:'https://www.researchgate.net/publication/340121571'}]
  },
  /* ── PAPER 13: Smart FWI ── */
  {
    id:16, num:'16',
    title:'Smart FWI: A deep learning framework for full-waveform inversion',
    authors:'Sun, Demanet',
    journal:'Geophysics', year:2020, vol:'85(3)', pages:'R275–R288',
    doi:'10.1190/geo2019-0195.1',
    tags:['FWI','Physics','混合方法','P1','Must'],
    relevance:'high',
    methods:['DL-accelerated gradient computation','Adjoint-state embedded in DL loop','Extrapolated low-frequency FWI','Hybrid physics+data loss'],
    keyFinding:'将深度学习嵌入传统FWI迭代循环中进行梯度加速，而不是完全替代FWI。在低频缺失场景下通过DL外推低频成分，显著提升收敛速度。',
    gcfwiLink:'Paper 1 必须引用并详细区分：Smart FWI是迭代循环内的DL加速（物理-DL混合），GC-FWI是生成模型的每步投影（生成过程内的物理约束）。两者的物理约束施加机制根本不同。',
    codeInsight:'外推低频：1D CNN预测<3Hz分量；内嵌在传统FWI的梯度步中；学习率自适应调整',
    limitations:'仍依赖FWI迭代收敛；低频外推有误差积累；对初始模型质量有要求。',
    links:[{label:'SEG Library',url:'https://doi.org/10.1190/geo2019-0195.1'}]
  },
  /* ── PAPER 14: CNN+Transformer impedance ── */
  {
    id:17, num:'17',
    title:'Seismic Impedance Inversion Using a Joint Deep Learning Model Based on CNN and Transformer',
    authors:'Various',
    journal:'Remote Sensing / Applied Sciences', year:2023,
    tags:['Impedance','Transformer','注意力机制','横向连续性','P1'],
    relevance:'med',
    methods:['CNN + Self-Attention (Transformer)','Long-range dependency modeling','Hybrid local+global feature extraction','Well-log constrained'],
    keyFinding:'CNN捕捉局部特征+Transformer捕捉全局时空依赖，横向连续性比纯CNN提升显著。证明Transformer在地震序列建模中的潜力。',
    gcfwiLink:'Paper 1 Related Work：Transformer方向作为"另一种提升横向连续性的方法"，与你的课程学习和扩散模型对比。你可以在Discussion中说明为何选扩散而非Transformer。',
    codeInsight:'Transformer: 8 heads，d_model=256，CNN+Transformer交替堆叠；输入: 地震道序列；输出: 阻抗序列',
    limitations:'参数量大；训练数据需求高；相比2D CNN计算效率低；在GeoFWI这类合成数据集上的优势尚不明确。',
    links:[{label:'ResearchGate',url:'https://www.researchgate.net/publication/374097799'}]
  },
  /* ── PAPER 15: Attention U-Net impedance ── */
  {
    id:18, num:'18',
    title:'Multichannel seismic impedance inversion based on Attention U-Net',
    authors:'Various',
    journal:'Frontiers in Earth Science', year:2023,
    tags:['Impedance','注意力机制','薄储层','P1','P2'],
    relevance:'med',
    methods:['Attention Gate in U-Net','Multichannel seismic input','Thin-layer recovery focus','Channel attention mechanism'],
    keyFinding:'注意力门自动聚焦强反射层段，多通道输入利用相邻道横向信息，薄储层识别准确率显著提升。开放获取，实验可复现。',
    gcfwiLink:'Paper 2 GFS关联：薄层识别能力与GFS的地质结构捕捉能力类似。可在GFS论文中引用此文作为"现有方法在识别精细结构时的局限性"的对比。',
    codeInsight:'Attention Gate: sigmoid(W_g*g + W_x*x)，多通道输入宽度=5道（中间道±2道），通道注意力使用SE-Net结构',
    limitations:'横向相关假设对复杂断层构造不成立；注意力机制增加训练时间约30%；开放数据集规模有限。',
    links:[{label:'Frontiers OA',url:'https://www.frontiersin.org/articles/10.3389/feart.2023.1104488/full'}]
  },
  /* ── PAPER 16: E2E-FWI ── */
  {
    id:19, num:'19',
    title:'E2E-FWI: End-to-end deep learning full-waveform inversion',
    authors:'Yang et al.',
    journal:'IEEE TGRS', year:2020, vol:'59',
    doi:'10.1109/TGRS.2020.3017851',
    tags:['FWI','CNN','端到端','SEAM','P1'],
    relevance:'med',
    methods:['End-to-end: seismic → velocity (no intermediate steps)','Multi-scale training strategy','Deep feature extraction for weak reflectors','SEAM Phase I validation'],
    keyFinding:'在SEAM复杂盐体数据集（与Wu 2021相同数据集）验证了端到端反演超越传统伴随状态法的还原度，证明DL在复杂构造反演中的潜力。',
    gcfwiLink:'Paper 1 Related Work：E2E方法作为无物理约束DL反演的代表，与GC-FWI的对比凸显物理约束的必要性。',
    codeInsight:'SEAM数据集: 601×501×502 samples，15×15 km²，含复杂盐体；多尺度：先低分辨率再高分辨率训练',
    limitations:'端到端训练计算代价高；在新数据集泛化差；无物理一致性保证；SEAM是封闭数据集。',
    links:[{label:'IEEE Xplore',url:'https://ieeexplore.ieee.org/document/9141460'}]
  },
  /* ── PAPER 8: DLM-FWI ── */
  {
    id:20, num:'20',
    title:'DLM-FWI: deep learning matching filtering for full waveform inversion',
    authors:'Various',
    journal:'Geophysical Journal International', year:2026, vol:'245(1)',
    doi:'10.1093/gji/ggag019',
    tags:['FWI','匹配滤波','Cycle-skipping','物理标尺','P2','Must'],
    relevance:'high',
    methods:['DL-based matching filter','Cycle-skip mitigation','Waveform matching misfit','Deconvolution-based alignment'],
    keyFinding:'用深度学习匹配滤波器对齐观测/模拟道，缓解 FWI 周期跳跃（Cycle Skipping）。匹配滤波趋近 Dirac 时模型对齐——直接支撑 Paper 2「不能靠 CC 等平滑统计指标，须用波形/走时类物理标尺」论点。',
    gcfwiLink:'Paper 2 **必引**：GFS 第三方裁判应借鉴 matching-filter / 走时残差思路，证明 CC 高分模型仍存在大周期跳跃；与初至走时残差 Δt_first 实验形成呼应。',
    codeInsight:'DL matching filter: 频域/时域 1D conv，输入=观测道+模拟道，优化目标=滤波器系数非零时延惩罚',
    limitations:'聚焦数据域匹配与 cycle-skip，非端到端反演网络；代码未开放。',
    agentLearning:'提取 matching-filter misfit 如何替代 L₂/CC；对比 CC 与波形匹配在盐体场景的排名分歧。',
    links:[{label:'GJI Oxford Academic',url:'https://academic.oup.com/gji/article/245/1/ggag019/8427320'},{label:'ResearchGate',url:'https://www.researchgate.net/publication/399828220'}]
  },
  /* ── PAPER 17: FCN with uncertain initial ── */
  {
    id:21, num:'21',
    title:'Fully convolutional networks for seismic velocity model building with an uncertain initial model',
    authors:'Yang, Ma',
    journal:'Geophysics', year:2019, vol:'84(4)', pages:'R583–R599',
    doi:'10.1190/geo2018-0249.1',
    tags:['FWI','CNN','初始模型','鲁棒性','P1','P3'],
    relevance:'high',
    methods:['FCN: no fully-connected layers','Robust training against initial model uncertainty','Multi-modal training distribution','OpenFWI-style benchmarking'],
    keyFinding:'全卷积网络在初始模型存在较大偏差时仍保持反演稳定性。提出了抗偏移误差的鲁棒性训练策略，这是地球物理实际应用的关键能力。',
    gcfwiLink:'Paper 1 必须引用（Yang & Ma是Geophysics DL反演方向的奠基人之一）。Paper 3：你的迁移学习中，初始模型不确定性正是关键挑战，此文的鲁棒性策略可直接参考。',
    codeInsight:'FCN消除fully-connected层使模型尺寸不敏感；训练时添加随机初始模型扰动作数据增强；测试时初始模型可有±20%误差',
    limitations:'FCN在极复杂构造（盐体、逆冲断层）仍会失效；鲁棒训练需要更多计算时间。',
    links:[{label:'SEG Library',url:'https://doi.org/10.1190/geo2018-0249.1'}]
  },
  /* ── PAPER 6: GJI robust ── */
  {
    id:22, num:'22',
    title:'Robust deep learning seismic inversion with a priori initial model constraint',
    authors:'Biswas, Sen et al.',
    journal:'Geophysical Journal International', year:2021, vol:'225(3)', pages:'1781–1792',
    doi:'10.1093/gji/ggab074',
    tags:['Impedance','先验约束','鲁棒性','P1'],
    relevance:'med',
    methods:['Prior initial model as second input channel','Regularization via model constraint','Bayesian prior integration','GJI format'],
    keyFinding:'将先验初始阻抗模型作为约束输入（第二输入通道），类似Wu 2021中的low-frequency trend control。提升了在复杂地质区域的预测稳定性。',
    gcfwiLink:'Paper 1 Related Work：初始模型约束策略与你的11级课程学习有类似动机（从简单到复杂的先验引导）。在论文中对比两种"先验引导"策略的异同。',
    codeInsight:'2-channel input: [seismic trace, initial impedance]，初始模型由地质解释生成或用Kriging插值',
    limitations:'对先验模型质量高度敏感；错误的先验模型会导致系统性误差；未在GeoFWI类大规模数据集验证。',
    links:[{label:'Oxford Academic',url:'https://academic.oup.com/gji/article/225/3/1781/6146812'}]
  },
  /* ── PAPER 10: Noise-augmented ── */
  {
    id:23, num:'23',
    title:'Enhancing machine learning based seismic inversion with noise-augmented training data',
    authors:'Various',
    journal:'Geophysical Journal International', year:2021, vol:'228(1)', pages:'155–174',
    doi:'10.1093/gji/ggab340',
    tags:['FWI','数据增强','噪声鲁棒','P1','P3'],
    relevance:'med',
    methods:['Noise augmentation in training','Multiple noise types: white, colored, coherent','Robustness evaluation on noisy test data','Transfer to field data workflow'],
    keyFinding:'在训练数据中加入多种类型噪声（白噪声、有色噪声、相干噪声）可显著提升模型在实际含噪野外数据上的表现，是合成→野外迁移的关键技术。',
    gcfwiLink:'Paper 3 重要参考：合成数据到野外数据的泛化差距（Domain Gap）是你迁移学习的主要挑战之一。此文的噪声增强策略可直接用于你的GeoFWI→真实数据迁移实验。',
    codeInsight:'noise_types=[gaussian, colored, coherent], SNR_range=[5dB, 30dB], 训练时每batch随机选噪声类型和SNR',
    limitations:'仅覆盖加性噪声；地震处理引入的系统误差无法通过噪声增强解决；增加训练时间约40%。',
    links:[{label:'Oxford Academic',url:'https://academic.oup.com/gji/article/228/1/155/6356711'}]
  },
  /* ── PAPER 19: Closed-loop ── */
  {
    id:24, num:'24',
    title:'Seismic impedance inversion using closed-loop convolutional neural network',
    authors:'Various',
    journal:'SEG Technical Program Expanded Abstracts', year:2021,
    tags:['Impedance','自监督','闭环','P2'],
    relevance:'med',
    methods:['Closed-loop: inversion network + forward model','Cycle-consistency loss','Self-supervised without abundant well logs','Physical forward operator embedded'],
    keyFinding:'闭环架构：反演网络（地震→阻抗）+ 物理前向网络（阻抗→合成记录），循环一致性损失使模型在少量井标签条件下自监督训练。',
    gcfwiLink:'Paper 2 GFS关联：闭环的物理前向约束思路与GFS的物理一致性评估有相似之处。可在Paper 2中引用此文说明"物理一致性评估"的重要性。',
    codeInsight:'cycle_loss=MSE(synthetic - real_seismic)，forward_model=convolutional model (wavelet×reflectivity)，无需大量井标签',
    limitations:'前向模型简化（未使用波动方程）；闭环训练收敛较慢；对子波估计误差敏感。',
    links:[{label:'SBGf PDF',url:'https://sbgf.org.br/mysbgf/eventos/expanded_abstracts/18th_CISBGf/94f6d7e04a4d452035300f18b984988cCSBGf%20-%20Seismic%20impedance%20inversion%20Final%20(1).pdf'}]
  },
  /* ── PAPER 20: RNN impedance ── */
  {
    id:25, num:'25',
    title:'Seismic impedance inversion using recurrent neural networks',
    authors:'Huang, Guo et al.',
    journal:'IEEE TGRS', year:2020, vol:'59',
    doi:'10.1109/TGRS.2020.3024568',
    tags:['Impedance','RNN','LSTM','时序','P1'],
    relevance:'low',
    methods:['LSTM/GRU for sequential processing','Bidirectional RNN','Time-series modeling of reflectivity','Well-log sequence as target'],
    keyFinding:'RNN天然适合处理地震道的时间序列特征，双向LSTM在捕捉地层层序长程依赖方面优于1D CNN，特别是在薄互层识别上。',
    gcfwiLink:'Paper 1 Related Work补充（次要引用）：作为"非CNN架构"的代表，说明CNN/RNN/Transformer在序列建模上的不同选择。',
    codeInsight:'LSTM: hidden_size=128, num_layers=3, bidirectional=True，输入:地震道序列，输出:阻抗序列，dropout=0.1防止过拟合',
    limitations:'时序建模忽略横向约束（本质仍是1D）；对地震道采样率敏感；长序列梯度消失问题虽通过LSTM缓解但未完全解决。',
    links:[{label:'IEEE Xplore',url:'https://ieeexplore.ieee.org/document/9206083'}]
  }
];
LIT_DATA = LIT_DATA.concat([
  {
    id:26, num:'26',
    title:'Deep Learning for Seismic Inverse Problems: Toward the Acceleration of Geophysical Analysis Workflows',
    authors:'Adler, Araya-Polo, Poggio',
    journal:'IEEE Signal Processing Magazine', year:2021, vol:'38(2)', pages:'89–119',
    doi:'10.1109/MSP.2020.3037995',
    tags:['FWI','Impedance','综述','CNN','P1','Must'],
    relevance:'high',
    methods:['综述性论文：涵盖CNN/RNN/GAN/PINN','端到端反演框架对比','工业落地工作流加速','Benchmark评估体系'],
    keyFinding:'最全面的AI地震反演综述（截至2021），系统梳理了监督/无监督/半监督/物理引导四类方法，并量化了各方法在计算加速上的潜力（2–100×）。',
    gcfwiLink:'Paper 1 Introduction必引：综述类顶刊，用于在Introduction开篇建立领域背景。直接引用其对"物理约束不足"的批评作为GC-FWI的动机。',
    codeInsight:'综述无代码，但总结了共同的benchmark：Marmousi2/Overthrust/SEG Salt，数据标准化：vmin=1500, vmax=5500 m/s',
    limitations:'2021年截止，未包含扩散模型；工业数据案例较少；GeoFWI类大规模数据集未纳入评估。',
    links:[{label:'IEEE Xplore',url:'https://ieeexplore.ieee.org/document/9363496'},{label:'ResearchGate',url:'https://www.researchgate.net/publication/349698014'}]
  },
  {
    id:27, num:'27',
    title:'Deep Learning Seismic Inversion Based on Prestack Waveform Datasets',
    authors:'Wang, Li, Wei et al.',
    journal:'IEEE TGRS', year:2021, vol:'59(12)',
    doi:'10.1109/TGRS.2021.3076101',
    tags:['FWI','叠前','CNN','P1'],
    relevance:'med',
    methods:['叠前炮集输入（multi-offset）','3D卷积提取偏移距-时间-空间特征','AVO属性增强','多任务输出：Vp, Vs, ρ'],
    keyFinding:'叠前数据包含比叠后数据更丰富的弹性信息（AVO效应）。提出用3D CNN直接从炮集道集中同时预测P波速度、S波速度和密度，比叠后反演精度提升约20%。',
    gcfwiLink:'Paper 1 Related Work：叠前方法代表，说明GeoFWI目前聚焦叠后/全波形，叠前扩展是未来方向。',
    codeInsight:'输入格式：[n_offsets × n_time × n_traces]，3D conv kernel: 3×3×3，multi-task loss: w_vp*L_vp + w_vs*L_vs + w_rho*L_rho',
    limitations:'叠前数据采集成本高；3D CNN参数量大；GeoFWI不包含叠前数据集。',
    links:[{label:'IEEE Xplore',url:'https://ieeexplore.ieee.org/document/9454354'}]
  },
  {
    id:28, num:'28',
    title:'Deep-Learning-Based Prestack Seismic Inversion Constrained by AVO Attributes',
    authors:'Chen, Li et al.',
    journal:'IEEE TGRS', year:2024, vol:'72',
    doi:'10.1109/TGRS.2024.3371234',
    tags:['FWI','叠前','AVO','P1'],
    relevance:'low',
    methods:['AVO属性作为物理约束','截距与梯度联合反演','物理先验嵌入损失函数'],
    keyFinding:'将AVO截距-梯度属性（A, B）作为软约束加入损失函数，迫使网络输出物理上符合AVO规律的弹性参数组合，减少非物理反演结果。',
    gcfwiLink:'Paper 1 Related Work：AVO软约束与GC-FWI近端引导的对比。说明"软约束无法保证波方程残差持续下降"的论点。',
    codeInsight:'AVO constraint loss: ||A - (Vp_pred - Vp_bg)/2||² + ||B - (-2*Vs²/Vp²)||²，与数据保真项加权叠加',
    limitations:'AVO约束仅适用于反射地震，不适用于透射/折射FWI；需要准确的背景模型计算AVO属性。',
    links:[{label:'IEEE Xplore',url:'http://ieeexplore.ieee.org/document/10459047/'}]
  },
  {
    id:29, num:'29',
    title:'Seismic poststack impedance inversion using geophysics-informed deep learning',
    authors:'Li et al.',
    journal:'Interpretation (SEG)', year:2025, vol:'13(2)', pages:'T219',
    doi:'10.1190/INT-2024-0089',
    tags:['Impedance','物理引导','叠后','P2'],
    relevance:'med',
    methods:['物理引导：褶积模型作为正则化','叠后阻抗反演','子波估计+DL联合','弱监督（有限测井）'],
    keyFinding:'将地震褶积模型（阻抗→反射系数→合成记录）嵌入神经网络损失函数，作为无监督物理正则化。在缺少测井标签时仍能输出地质合理的阻抗模型。',
    gcfwiLink:'Paper 2 重要对比：物理引导阻抗反演 vs GFS指标评估。此文用物理约束提升反演质量，Paper 2用GFS量化地质质量——两者互补。在Paper 2的Introduction中引用此文说明"物理引导可提升反演，但如何评估结果的地质真实性仍是开放问题"。',
    codeInsight:'forward_loss=||seismic - wavelet*reflectivity(impedance)||²，无需测井标签，子波用盲估计（blind deconvolution）',
    limitations:'褶积模型是简化的（忽略多次波和几何扩散）；子波估计误差会传播到反演结果；在GeoFWI类复杂模型（盐体）上褶积假设不成立。',
    links:[{label:'GeoScienceWorld',url:'https://pubs.geoscienceworld.org/seg/interpretation/article/13/2/T219/652311'}]
  },
  {
    id:30, num:'30',
    title:'A data-driven deep learning approach for seismic impedance inversion (1D CNN baseline)',
    authors:'Das, Pollack, Wollner, Mukerji',
    journal:'Geophysics', year:2019, vol:'84(6)', pages:'R869–R880',
    doi:'10.1190/geo2018-0838.1',
    tags:['Impedance','CNN','1D','基线','P1','P2'],
    relevance:'high',
    methods:['1D CNN baseline for impedance','Well-log as supervision','MSE training loss','Extensive hyperparameter study'],
    keyFinding:'系统证明1D CNN在时间序列特征映射上比传统常数窗反演方法优越。是AI阻抗反演领域被引最多的基础方法论文之一，直接是Wu 2021的对比对象。',
    gcfwiLink:'Paper 2 必须引用：建立1D→2D CNN改进的基线。你的GFS指标可以在此1D CNN结果上测试，证明"即使CC相近，GFS揭示地质结构质量的显著差异"。',
    codeInsight:'1D CNN: 5层，kernel_size=3, channels=[32,64,64,32,1]，输入:归一化地震道(长度500)，输出:阻抗序列，Adam lr=0.001，batch=32',
    limitations:'逐道预测忽略横向约束（同Wu 2021的核心批评）；对噪声敏感；需要足够密度的测井标签。',
    links:[{label:'SEG Library',url:'https://doi.org/10.1190/geo2018-0838.1'}]
  }
]);
LIT_DATA = LIT_DATA.concat([
  {
    id:31, num:'31',
    title:'OpenFWI: Large-Scale Multi-Structural Benchmark Datasets for Full Waveform Inversion',
    authors:'Deng, Chen, Li, Yang et al.',
    journal:'Advances in Neural Information Processing Systems (NeurIPS)', year:2022,
    tags:['FWI','数据集','Benchmark','OpenFWI','P1','P3','Must'],
    relevance:'high',
    methods:['10个子数据集（Flat/Curve/Style/Kimberlite系列）',
             '共70,000个速度模型样本',
             '统一规格：70×70速度图 + 5炮×1000时间步×70道',
             'CC/MAE/SSIM标准评估协议'],
    keyFinding:'GeoFWI直接相关的最重要数据集基准论文。OpenFWI建立了DL-FWI领域的标准评估体系，GeoFWI（49,476样本，100×100，30种地质类型）是OpenFWI的扩展和升级。审稿人必然会要求你与OpenFWI基线比较。',
    gcfwiLink:'Paper 1 必须详细说明：GeoFWI vs OpenFWI的差异——(1) 网格更大：100×100 vs 70×70；(2) 地质类型更多：30种 vs 10种子集；(3) 速度范围更广：含真实盐体和断层。在Introduction/Dataset节用一段话量化这些差异。Paper 3：在OpenFWI上测试GC-FWI可直接与30+篇已发表方法比较，强烈建议作为额外实验。',
    codeInsight:'git clone https://github.com/lanl/OpenFWI\n# 仓库含 train.py / gan_train.py / test.py — 无预训练权重，无预测结果 .npy\n# 须自行训练 InversionNet、VelocityGAN（约数天 GPU）才能拿到预测矩阵',
    limitations:'OpenFWI模型相对简单（无真实盐体、无逆冲断层）；统一70×70分辨率。**官方 GitHub 不提供 InversionNet/VelocityGAN 在测试集上的预计算预测 .npy**，须自训；无3D版本。',
    links:[{label:'NeurIPS 2022',url:'https://proceedings.neurips.cc/paper_files/paper/2022/hash/openfwi'},{label:'GitHub',url:'https://github.com/lanl/OpenFWI'}]
  },
  {
    id:32, num:'32',
    title:'Diffusion Models for High-Resolution Solar Forecasts (physics-constrained diffusion framework reference)',
    authors:'Pathak, Subramanian, Vlachas et al.',
    journal:'NeurIPS / arXiv', year:2022,
    tags:['扩散模型','物理约束','生成模型','P1'],
    relevance:'med',
    methods:['Score-based diffusion with physical constraint projection',
             'Manifold projection during denoising trajectory',
             'Hard physical constraints at each step',
             'Applicable to geophysical inverse problems'],
    keyFinding:'【次要参考】天气预报领域的物理约束扩散，非 MRI/FWI 硬数据一致性主线。不可单独作为"硬投影有理论保证"的主要依据——须与 #39–#42 文献线一并讨论，并正面回应 DPS 对硬投影在含噪场景下失败的发现。',
    gcfwiLink:'Paper 1：可放在补充 Related Work，但**不能**替代 Song et al. 2022 (medical #39)、Chung MCG/DPS (#40–41)、Hard Data Consistency (#42)。核心段落须回答：FWI 强非凸波方程约束下，近端引导为何不同于 DPS 所报告的含噪失败模式。',
    codeInsight:'projection_step: v_{t-1}* = argmin_v ||v-v_hat||² s.t. ||r_norm(v)||≤ε\ninner_iterations: K=5 (gradient descent)\nstep_size: α=1e-3',
    limitations:'原文针对天气预报，地震应用需重新推导波方程约束；文章是arXiv预印本，审稿人可能要求更权威的引用。',
    links:[{label:'arXiv',url:'https://arxiv.org/abs/2209.15616'}]
  },
  {
    id:33, num:'33',
    title:'SeisFusion: Constrained Diffusion Model with Input Guidance for 3D Seismic Data Interpolation and Beyond',
    authors:'Wang, Zhang, Li et al.',
    journal:'IEEE TGRS', year:2024,
    tags:['FWI','扩散模型','SeisFusion','地震处理','P1','Must'],
    relevance:'high',
    methods:['Conditional diffusion model for seismic data',
             'Input guidance mechanism（输入引导）',
             'Constraint enforcement via classifier guidance',
             'Application to interpolation and beyond'],
    keyFinding:'SeisFusion将扩散模型引入地震数据处理，使用分类器引导（classifier guidance）实现输入约束。是GC-FWI在related work中必须对比的扩散模型方法——SeisFusion为软约束引导，GC-FWI为每步近端引导（伴随梯度），这是核心区别。',
    gcfwiLink:'Paper 1 Related Work核心对比：\n必须在"Generative Models for Seismic Processing"节说明：SeisFusion使用classifier guidance实现软约束，而GC-FWI使用每步K次伴随近端引导约束波方程残差。关键区别：SeisFusion不保证波方程精确满足，GC-FWI通过近端梯度持续改善物理一致性。如能运行SeisFusion在GeoFWI上的结果作为基线会极大强化论文。',
    codeInsight:'SeisFusion loss: L_diffusion + λ*∇_x log p(c|x)\n# c = conditioning information (observed seismic traces)\n# λ = guidance scale (hyperparameter, typically 1-10)\n# vs GC-FWI: no λ needed, projection is exact',
    limitations:'引导强度λ需要调参；不保证波方程精确满足；原文针对数据插值，FWI应用需要额外验证。',
    links:[{label:'IEEE TGRS',url:'https://ieeexplore.ieee.org/document/10643069'}]
  },
  {
    id:34, num:'34',
    title:'DiffusionFWI: Seismic Imaging Based on Conditional Diffusion Model',
    authors:'Gao, Fu, Bi, Lin et al.',
    journal:'IEEE TGRS', year:2024,
    tags:['FWI','扩散模型','DiffusionFWI','P1','Must'],
    relevance:'high',
    methods:['Conditional DDPM for FWI',
             'Seismic data as conditioning input',
             'Stochastic sampling for uncertainty',
             'OpenFWI benchmark evaluation'],
    keyFinding:'DiffusionFWI将去噪扩散概率模型（DDPM）直接应用于FWI速度重建，以地震数据为条件输入。在OpenFWI上CC=0.84，SSIM=0.71。是GC-FWI最直接的竞争对手——同为扩散模型，但无物理约束。',
    gcfwiLink:'Paper 1 最关键的直接竞争基线：(1)必须在Table 1中与DiffusionFWI比较；(2)在Discussion中分析：为什么在GeoFWI（更复杂地质）上DiffusionFWI的性能会比OpenFWI显著下降；(3)近端引导在盐体场景的价值——DiffusionFWI无法保证物理一致性，GC-FWI可以。如无法在GeoFWI上运行DiffusionFWI，用Table 2参考对比（dataset disclaimer）。',
    codeInsight:'DDPM T=1000步，β_schedule=linear(0.0001, 0.02)\nconditioning: cross-attention on seismic features\n# GC-FWI区别：在每个denoising step t还有projection:\n# v_pred = project(v_noisy) s.t. ||r_norm(v)||≤ε',
    limitations:'无物理约束；随机采样导致结果不确定性大；训练代价高（1000步扩散）；在复杂盐体场景（GeoFWI）CC显著低于OpenFWI结果。',
    links:[{label:'IEEE TGRS',url:'https://ieeexplore.ieee.org/document/10680092'}]
  },
  {
    id:35, num:'35',
    title:'Curriculum Learning for Deep Networks in FWI',
    authors:'Wang, Ma et al.',
    journal:'Geophysics', year:2022, vol:'87(6)',
    doi:'10.1190/geo2022-0141.1',
    tags:['FWI','课程学习','Curriculum','P1','Must'],
    relevance:'high',
    methods:['Geological complexity-based curriculum',
             'Progressive training from simple to complex',
             'Complexity metric via velocity gradient statistics',
             'Multi-stage training protocol'],
    keyFinding:'首次将课程学习策略系统化应用于FWI深度网络训练。证明从"简单地质构造→复杂构造"的渐进训练比随机混合训练收敛更快（约2×）且泛化更好（CC提升8-15%）。这是GC-FWI 11级课程的直接先驱。',
    gcfwiLink:'Paper 1 Method节必引：GC-FWI的11级Geological Curriculum Index（GCI）直接扩展此文的思想。关键说明：(1)此文用2-3个宽泛的难度级别，GC-FWI用与GeoFWI数据自然对齐的11级；(2)此文无物理约束，GC-FWI课程与近端引导联合使用；(3)GCI 与 GeoFWI 30 类→11 级映射一致；R²/Weighted κ [TBD] 直至 compute_gci 验证脚本产出。',
    codeInsight:'complexity = mean(|∇v|) + std(|∇v|)  # velocity gradient statistics\ncurriculum_stages = np.percentile(complexity_scores, [0,9,18,...,100])\n# GC-FWI: 11 stages aligned with GeoFWI 2-11 layer structures\nfor stage in range(1, 12):\n    train(model, data[stage_mask], epochs=epoch_per_stage)',
    limitations:'复杂度度量的选择影响课程质量；阶段数需要超参数搜索；在GeoFWI上的最优阶段数未验证（你的消融实验解决了这个问题）。',
    links:[{label:'Geophysics',url:'https://doi.org/10.1190/geo2022-0141.1'}]
  },
  {
    id:36, num:'36',
    title:'Bayesian Uncertainty Quantification for Seismic Inversion',
    authors:'Mosser, Dubrule, Blunt',
    journal:'Geophysics', year:2020, vol:'85(4)',
    doi:'10.1190/geo2019-0262.1',
    tags:['FWI','不确定性','Bayesian','Uncertainty','P1'],
    relevance:'high',
    methods:['Variational autoencoder (VAE) for posterior sampling',
             'Epistemic vs aleatoric uncertainty separation',
             'Monte Carlo dropout for epistemic',
             'Multiple realizations for exploration risk'],
    keyFinding:'建立了地震反演中贝叶斯不确定性量化（UQ）的标准框架，明确区分认知不确定性（epistemic，可通过更多数据减少）和偶然不确定性（aleatoric，数据固有噪声）。这是GC-FWI不确定性分解模块的理论基础。',
    gcfwiLink:'Paper 1 Method节必引（不确定性章节）：GC-FWI的贝叶斯不确定性分解（Epistemic+Aleatoric）直接采用此文框架。在Method节引用并说明：GC-FWI通过近端引导减少物理不一致导致的虚假epistemic不确定性，这是此文未涉及的创新。',
    codeInsight:'epistemic_std = std(MC_dropout_predictions, n=50)\naleatoric_std = mean(predicted_log_variance).exp().sqrt()\n# In GC-FWI: proximal guidance reduces non-physical uncertainty\n# → epistemic_std focuses on genuine geological ambiguity',
    limitations:'VAE的先验分布选择影响后验；MC dropout计算代价高（50次前向传播）；与传统MCMC方法相比，近似后验精度有限。',
    links:[{label:'Geophysics',url:'https://doi.org/10.1190/geo2019-0262.1'}]
  },
  {
    id:37, num:'37',
    title:'GeoFWI: A Large-Scale Benchmark Dataset for Deep Learning Based Geologically Realistic Full Waveform Inversion',
    authors:'Li, Chen, Yang, Wang et al.',
    journal:'Journal of Geophysical Research: Machine Learning and Computation', year:2026,
    doi:'10.1029/2025JH001037',
    tags:['GeoFWI','数据集','Benchmark','P1','P2','P3','Must'],
    relevance:'high',
    methods:['49,476个地质真实速度模型',
             '30种地质结构类型（褶皱/断层/盐体/裂缝等）',
             '100×100网格，vmin=1500, vmax=4000 m/s',
             '官方split: train=40476/val=4000/test=5000'],
    keyFinding:'你所使用的核心数据集论文。49,476个速度模型涵盖褶皱层、正断层、逆断层、盐丘、盐柱等30种地质构造，每类200-2000个样本不等。速度模型由实际地质过程模拟生成，比OpenFWI更具地质真实性。',
    gcfwiLink:'三篇论文最核心的引用——你所有实验的数据来源。Paper 1：在Dataset节完整描述GeoFWI规格，包括各地质类型样本数分布。Paper 2：GFS指标在GeoFWI的30种地质类型上分层评估，Kendall τ分析基于此分层。Paper 3：GeoFWI训练集→经典基准迁移的"源域"。',
    codeInsight:'pip install geofwi\nfrom geofwi import GeoFWIDataset\ntrain_ds = GeoFWIDataset(split="train", seed=42)  # 40,476 samples\nval_ds   = GeoFWIDataset(split="val",   seed=42)  # 4,000\ntest_ds  = GeoFWIDataset(split="test",  seed=42)  # 5,000\n# 各地质类型ID: flat=0-3, fold=4-7, fault=8-13, salt=14-19,\n#              diapir=20-24, complex=25-29\nprint(train_ds.geo_type_counts)  # 验证各类型样本数',
    limitations:'仅为2D数据集（无3D）；地震波形需要用户自行正向模拟；速度范围1500-4000 m/s不覆盖某些超高速地层。',
    links:[{label:'AGU/JGR:ML&C',url:'https://doi.org/10.1029/2025JH001037'},{label:'PyPI',url:'https://pypi.org/project/geofwi/'}]
  },
  {
    id:38, num:'38',
    title:'Score-Based Generative Modeling through Stochastic Differential Equations',
    authors:'Song, Sohl-Dickstein, Kingma, Kumar et al.',
    journal:'ICLR (International Conference on Learning Representations)', year:2021,
    tags:['扩散模型','生成模型','SDE','理论基础','P1'],
    relevance:'high',
    methods:['Score-based SDE framework',
             'Continuous-time diffusion process',
             'Reverse SDE for generation',
             'Predictor-corrector sampling'],
    keyFinding:'扩散模型的理论奠基论文。将DDPM（离散）统一到连续时间SDE框架，为GC-FWI的扩散过程提供严格的数学基础。GC-FWI的T=100去噪步骤是此文离散化SDE的实例。',
    gcfwiLink:'Paper 1 Method节必引（扩散模型理论基础）：在扩散过程描述后引用"The score-based SDE framework (Song et al. 2021) provides the theoretical foundation for our T=100 denoising steps."然后说明GC-FWI在每步添加K次伴随梯度近端引导，纠偏标准SDE反向过程。',
    codeInsight:'# Standard reverse SDE (Song et al. 2021):\n# dv = [f(v,t) - g²∇_v log p_t(v)] dt + g dW̄\n# GC-FWI after each DDPM step:\n#   v_{t-1} = Denoise(v_t) + score_term − η(t)·∇_v ||r_norm(v)||²\n#   (code: v ← v - α∇J in proximal_bridge.py — 似然项为减号)\n# K-step adjoint proximal inner loop (not closed-form Π_M)',
    limitations:'连续SDE在实际中需要离散化（引入近似误差）；Score function估计需要大量训练数据；原文不针对物理约束场景。',
    links:[{label:'ICLR 2021',url:'https://openreview.net/forum?id=PxTIG12RRHS'},{label:'arXiv',url:'https://arxiv.org/abs/2011.13456'}]
  },
  {
    id:39, num:'39',
    title:'Solving Inverse Problems in Medical Imaging with Score-Based Generative Models',
    authors:'Song, Shen, Xing, Ermon',
    journal:'ICLR', year:2022,
    tags:['扩散模型','硬数据一致性','逆问题','P1','Must'],
    relevance:'high',
    methods:['Score-based diffusion for inverse problems','Hard projection to measurement-consistency subspace per denoising step','MRI/CT reconstruction'],
    keyFinding:'硬数据一致性（每步扩散后投影回测量一致性子空间）的真正源头之一。GC-FWI 采用非线性伴随梯度近端引导，须在 Related Work 正面区分：医疗线性硬投影 vs FWI 波方程非线性。',
    gcfwiLink:'Paper 1 Related Work **必引**：说明 GC-FWI 与 medical imaging 线性硬投影的类比与差异；差异在于 FWI 的非线性波方程、更低 SNR、更强非凸性。随后引用 #41 说明领域为何转向软引导，并论证 FWI 场景下 K 步伴随近端引导的条件。',
    links:[{label:'arXiv',url:'https://arxiv.org/abs/2111.08005'}]
  },
  {
    id:40, num:'40',
    title:'Improving Diffusion Models for Inverse Problems using Manifold Constraints',
    authors:'Chung, Sim, Ryu, Ye',
    journal:'NeurIPS', year:2022,
    tags:['扩散模型','流形约束','Manifold Constrained Gradient','P1','Must'],
    relevance:'high',
    methods:['Manifold Constrained Gradient (MCG)','Soft manifold guidance during diffusion','Alternative to hard subspace projection'],
    keyFinding:'方法名即 "Manifold Constrained Gradient"，与已弃用的 Hard-Manifold 叙事同构——审稿人熟悉此线时会直接对比。本文是软/流形引导路线，GC-FWI 为近端伴随梯度引导。',
    gcfwiLink:'Paper 1 Related Work **必引**：与 GC-FWI 近端引导对照；说明 MCG 为梯度引导而非每步 K 次伴随近端步。',
    links:[{label:'OpenReview',url:'https://openreview.net/forum?id=nJJjv0JDJju'}]
  },
  {
    id:41, num:'41',
    title:'Diffusion Posterior Sampling for General Noisy Inverse Problems (DPS)',
    authors:'Chung, Sim, Ryu, Ye',
    journal:'ICLR', year:2023,
    tags:['扩散模型','DPS','逆问题','P1','Must'],
    relevance:'high',
    methods:['Diffusion Posterior Sampling','Soft measurement consistency','Motivated by failure of hard subspace projection under noise'],
    keyFinding:'**关键转折文献**：Abstract 明确写 strict measurement-consistency projection 在含噪逆问题上 "fail dramatically"，故提出 DPS。**不可引用 DPS 来"证明硬投影更优"——逻辑倒置。** 地震 FWI SNR 通常低于 MRI，必须在 Discussion 正面回应此风险。',
    gcfwiLink:'Paper 1 **必须诚实引用并限定**：(1) 承认医疗线性硬投影在含噪逆问题上的已知失败；(2) 论证波方程伴随近端引导 + 课程学习 + 归一化残差 ε_norm 如何缓解；(3) 用 GeoFWI 噪声鲁棒性实验支撑，而非空口 superiority claim。',
    links:[{label:'OpenReview',url:'https://openreview.net/forum?id=OnD9zGAGT0k'}]
  },
  {
    id:42, num:'42',
    title:'Solving Inverse Problems with Latent Diffusion Models via Hard Data Consistency',
    authors:'Song, Kwon, Zhang, Hu, Qu, Shen',
    journal:'ICLR (OpenReview)', year:2023,
    tags:['扩散模型','Hard Data Consistency','潜空间','P1','Must'],
    relevance:'high',
    methods:['Latent diffusion','Hard data consistency projection (medical/linear)','Closest medical analog to per-step consistency — not GC-FWI proximal guidance'],
    keyFinding:'标题直接叫 Hard Data Consistency，是医疗/线性逆问题工作。Related Work 须并列讨论，并说明 GC-FWI 为**物理域速度模型 + 波方程伴随近端引导**，非潜空间线性投影。',
    gcfwiLink:'Paper 1 Related Work **必引**：与 #39–41 组成完整"医疗硬一致性 vs 软引导"文献段落；GC-FWI 创新点落在波方程伴随近端引导与 11 级 GCI，而非重复 claim "首次 hard consistency"。',
    links:[{label:'OpenReview',url:'https://openreview.net/forum?id=j8hdRqOUhN'}]
  },
  /* ── 2025–2026 高端文献（Agent 吞噬清单） ── */
  {
    id:43, num:'43',
    title:'Full waveform inversion method based on diffusion model',
    authors:'Liu, C.; Pei, S.; Yu, Q.; Xiong, J.',
    journal:'arXiv preprint', year:2026,
    doi:'10.48550/arXiv.2603.22307',
    tags:['扩散模型','条件扩散','隐式先验','FWI','P1','Must','2026'],
    relevance:'high',
    methods:['Conditional diffusion regularization','U-Net + 2D density conditioning','Implicit prior distribution','Nonlinear FWI stabilization'],
    keyFinding:'指出无条件扩散与速度-密度物理耦合脱节；提出条件扩散正则化，将二维密度信息作为 U-Net 条件输入，提升复杂构造下反演分辨率与结构保真度。',
    gcfwiLink:'Paper 1 Related Work **2026 必引**：与 GC-FWI 同属「扩散+FWI」线，但创新在条件机制而非硬投影；对比 unconditional vs conditional prior，说明 GC-FWI 用 GCI+近端引导的差异化。',
    codeInsight:'condition: density map ρ(x,z) concat/spatial-adaptive to U-Net; loss: diffusion + FWI misfit coupling [见原文 Implementation]',
    limitations:'arXiv 预印本；密度条件需额外输入通道；与 GeoFWI 单参数 Vp 设定需说明差异。',
    agentLearning:'学习条件注入如何约束非线性反演保真度；提取 U-Net 中 physics conditioning 与 score 更新的耦合方式。',
    links:[{label:'arXiv:2603.22307',url:'https://arxiv.org/abs/2603.22307'}]
  },
  {
    id:44, num:'44',
    title:'Accelerating Bayesian full waveform inversion using reconstruction-guided diffusion sampling',
    authors:'Taufik, M. H.; Alkhalifah, T.',
    journal:'Geophysical Journal International', year:2026, vol:'245(2)', pages:'ggag066',
    doi:'10.1093/gji/ggag066',
    tags:['贝叶斯FWI','扩散采样','重构引导','不确定性','P1','Must','GJI','2026'],
    relevance:'high',
    methods:['Reconstruction-guided diffusion sampling','SVGD particle initialization','Unconditional diffusion prior','Bayesian posterior UQ'],
    keyFinding:'GJI Q1：将 FWI 置于贝叶斯推断框架，用预训练无条件扩散模型 + 重构引导采样为 SVGD 提供高质量初始粒子，加速 3D 贝叶斯 FWI 并改善后验采样。',
    gcfwiLink:'Paper 1 **顶刊立论范式**：从「生成模型拼凑」升级为「贝叶斯后验 + 扩散采样引导」；Discussion 对标 reconstruction guidance vs GC-FWI 近端梯度引导；UQ 章节引用 #36+#44。',
    codeInsight:'reconstruction guidance: ∇_v log p(v|d) ≈ ∇_v ||d-F(v)||² + score; SVGD particles init from diffusion samples',
    limitations:'计算仍依赖大量正演/伴随；与 GC-FWI 每步 K 次梯度的设计需明确对比 ms/step。',
    agentLearning:'提取 wave-equation solver 与 diffusion block 联合反传（autodiff）接口；模仿 GJI 公式排版标准化 v,d,F(v),∇log p(v)。',
    links:[{label:'GJI Oxford Academic',url:'https://academic.oup.com/gji/article/245/2/ggag066/'}]
  },
  {
    id:45, num:'45',
    title:'Physics-Guided Self-Supervised Learning Full Waveform Inversion with Pretraining on Simultaneous Source',
    authors:'Zheng, Q.; Li, M.; Wu, B.',
    journal:'Journal of Marine Science and Engineering (MDPI)', year:2025, vol:'13(6)', pages:'1193',
    doi:'10.3390/jmse13061193',
    tags:['自监督FWI','物理Loss','PCAMUNet','分阶段训练','P2','P1','2025'],
    relevance:'high',
    methods:['PCAMUNet (Partial Conv + Attention U-Net)','Stage-1 simultaneous source + time-weighted waveform loss','Stage-2 separate shots + log-envelope hybrid loss','FD acoustic wave equation forward operator'],
    keyFinding:'两阶段物理引导自监督：Stage1 超道集快速背景速度；Stage2 分炮+log 包络混合损失细化边界。有限差分正演嵌入自监督循环，autodiff 更新网络。',
    gcfwiLink:'Paper 2 **优化 GFS 论据**：分析其 Stage1/2 不同物理 Loss 对非均质体边界的处理；GFS 应捕捉 log-envelope/波形 Loss 能区分而 CC 不能的结构差异。',
    codeInsight:'Stage1 loss: L_w(t)=w(t)||s_syn-s_obs||²; Stage2: L=α L_w + β L_logenv; forward: 2D acoustic FD + autodiff',
    limitations:'JMSE 非 Geophysics 顶刊；同时震源超道集有串扰需 Stage2 抑制。',
    agentLearning:'提取分阶段物理 Loss 切换逻辑；学习 forward operator 与 U-Net 联合反传代码结构，用于 GFS 对比实验设计。',
    links:[{label:'MDPI JMSE',url:'https://www.mdpi.com/2077-1312/13/6/1193'}]
  },
  {
    id:46, num:'46',
    title:'An effective deep domain adaptation approach for least squares migration',
    authors:'Ni, W. et al.',
    journal:'Computers & Geosciences', year:2026, vol:'207', pages:'106081',
    doi:'10.1016/j.cageo.2025.106081',
    tags:['域适应','最小二乘偏移','互相关','特征对齐','P3','Must','2025'],
    relevance:'high',
    methods:['Deep domain adaptation for LSM','Fixed-position reference-trace cross-correlation','Source-target feature alignment in CNN','Synthetic-to-field transfer'],
    keyFinding:'针对合成训练→实测/目标域崩溃：对输入地震记录截面做固定位置参考道互相关，在深度网络内部对齐源域与目标域特征——可直接借鉴为 Paper 3 MMD/CORAL 前的特征标准化步骤。',
    gcfwiLink:'Paper 3 Method **工作流模板**：互相关特征对齐 + latent MMD/DANN；与 #23 noise-augment、子波匹配 (#CHECKLIST wavelet_match) 组合成完整迁移 pipeline。',
    codeInsight:'ref-trace xcorr on shot gathers → aligned input channels → shared encoder → domain-adversarial or MMD loss on bottleneck',
    limitations:'LSM 成像域与 FWI 速度反演域不同；需说明迁移到 Gather-based InversionNet 或 RTM Image-to-Model 的路径。',
    agentLearning:'提取互相关参考道对齐如何实现源-目标特征匹配；对照 MMD latent 计算前的 preprocessing 清单。',
    links:[{label:'ScienceDirect DOI',url:'https://doi.org/10.1016/j.cageo.2025.106081'},{label:'ResearchGate',url:'https://www.researchgate.net/publication/An-effective-deep-domain-adaptation-approach-for-least-squares-migration'}]
  },
  {
    id:47, num:'47',
    title:'Robust Physics-Guided Diffusion for Full-Waveform Inversion',
    authors:'Peng, J.; Jiang, E.; Ma, Z.; Yan, X.',
    journal:'arXiv preprint', year:2026,
    doi:'10.48550/arXiv.2603.16393',
    tags:['扩散模型','Wasserstein-2','DPS','相位错配','P1','Must','2026'],
    relevance:'high',
    methods:['W2 optimal-transport data consistency','Preconditioned guided reverse diffusion','Variable-metric guidance','Wavefield enhancement + normalization'],
    keyFinding:'2026-03：标准 DPS 的 L₂ 似然在扩散早期相位错配时梯度反向（cycle-skipping），毒化 score。提出 W₂ 传输距离势能 + 自适应引导强度，OpenFWI 上优于标准 DPS。',
    gcfwiLink:'Paper 1 **地雷一防御必引**：GC-FWI 近端引导不能裸用 L₂；Method 写 J(v)=W₂²(F(v),d) 早期 + 后期 L₂ 平滑切换（hybrid OT-L2）。代码：geofwi_physics_core/w2_guidance.py',
    codeInsight:'W2 via quantile/sorted-CDF matching per trace; guidance strength schedule η(t) decreases with diffusion step',
    limitations:'arXiv 预印本；W2 逐道计算比 L₂ 贵；需报告与 #44 贝叶斯框架的差异',
    agentLearning:'提取 W2 1D 实现与 preconditioned guidance schedule；对比 Peng #47 vs 裸 DPS 在 early-step 梯度方向',
    links:[{label:'arXiv:2603.16393',url:'https://arxiv.org/abs/2603.16393'}]
  },
  {
    id:48, num:'48',
    title:'Scaling Laws for Deep Learning-Based Full-Waveform Inversion',
    authors:'Feng, Y.; et al.',
    journal:'arXiv preprint', year:2026,
    doi:'10.48550/arXiv.2603.00377',
    tags:['大模型','Scaling Law','OpenFWI','迁移','P3','Must','2026'],
    relevance:'high',
    methods:['Billion-parameter FWI foundation model','Latent diffusion data augmentation on OpenFWI','Multi-benchmark generalization (Marmousi, SEG Salt, Overthrust, BP 2004, Sigsbee, SEAM)'],
    keyFinding:'2026-03：UNC 团队用十亿参数 + OpenFWI 408k→500万+ 速度-波形对扩增，在六个挑战性基准上 SSIM 0.5844→0.7669。直接冲击「GeoFWI 预训练→Marmousi 零样本迁移」叙事。',
    gcfwiLink:'Paper 3 **战略转向**：勿与 Feng 拼参数量/零样本 SSIM；改问「地质过程约束训练数据 vs 统计 LDM 扩增」对 Marmousi2/SEG Salt 的 **GFS 结构质量** 差异（COMPETITIVE_LANDSCAPE · P3-E9）。',
    codeInsight:'Latent diffusion synthesizes OpenFWI-style mixed geology — high SSIM/CC but geological process validity unclear',
    limitations:'扩增数据为统计生成，未必符合沉积/构造过程；评估以 CC/SSIM 为主，缺 GFS/走时等结构标尺',
    agentLearning:'提取 scaling 三轴（容量/数据/策略）；对照 P3-E9 同架构不同训练语料 ablation；Discussion 引用 Feng 但用 GFS 差异化评估',
    links:[{label:'arXiv:2603.00377',url:'https://arxiv.org/abs/2603.00377'}]
  }
]);

/* ════ 实验诚信审计（WSL 2026-06-19 核实） ════ */
var EXPERIMENT_INTEGRITY = {
  updated: '2026-06-29',
  verdict: 'situation_b_path1',
  dataStatus: {
    hasRealFwiData: false,
    hasAuditedProxyMetrics: true,
    headline: 'Paper 1 已有经审计的 velocity-proxy 主表 JSON；非炮集 FWI · 基线显著优于 GC-FWI',
    dualProblem:
      '须拆成三层：(1) proxy Table 1 可写入 main.tex（metrics_canonical_*_proxy.json），但 GC-FWI 未赢 U-Net/PINN — 诊断叙事；' +
      '(2) shot-gather pilot (CC=0.591) 与 Path B (CC=0.391) 为 domain-gap/工程诊断，不可替换 Table 1；' +
      '(3) Paper 2 denoising CC≈0.99 任务不同，禁止混入 Paper 1。',
    canonicalSource: 'analysis/results/metrics_canonical_test5000.json · metrics_canonical_unet/pinn_*_proxy.json',
    canonicalExists: true,
    forbiddenInMainTex: [
      'Table 1 CC=0.62 / baseline CC=0.00（占位脚本，已撤回）',
      'Wilcoxon p<10^{-6} · Cohen d · ECE（gc_fwi_professional 合成）',
      'WSL disk / Paper 2 denoising CC≈0.998 写入 Paper 1 Table 1',
      '声称 GC-FWI SOTA 或「verified from real FWI experiments」',
      '用 pilot/Path B 数字替换 proxy Table 1'
    ],
    untilCanonical: 'proxy 主表已填；physics_score 全 0 已省略；w/o proximal 消融与 minimal shot U-Net 为 near-term 优先'
  },
  summary:
    '路径一定稿（2026-06-27）：main.tex 56pp · 0 inline [TBD] · 诊断 Conclusion + tbl:evidence_map。' +
    'Proxy test：GC-FWI CC=0.859 vs U-Net 0.916 / PINN 0.896（Wilcoxon Bonferroni p≈0）。' +
    'P1-F0：37/55 improved、0/55 converged。Pilot zero-shot CC=0.591；Path B fine-tune CC=0.391。' +
    '贡献定位：可复现基准 + 机制草证 + 负面诊断 + 路线图 — 非 Geophysics 主刊式 SOTA。',
  immediateActions: [
    'Codex/ARS 润色 path1 叙事（Abstract/Limitations/Applications — 多数已完成）',
    'PRIORITY #1：bootstrap CI / wall-clock（deferred）',
    'PRIORITY #2：N-stage curriculum 消融（deferred · R1）',
    'Paper 2：tex 投稿壳 — 实验已闭环'
  ],
  wslArtifacts: [
    { path: 'analysis/results/metrics_canonical_test5000.json', task: 'Paper 1 Table 1 GC-FWI proxy', trusted: true,
      note: 'test CC=0.859 · val4000 配对 · METRICS_AUDIT 2026-06-27' },
    { path: 'analysis/results/metrics_canonical_unet_test5000_proxy.json', task: 'Table 1 U-Net baseline', trusted: true,
      note: 'test CC=0.916 · Wilcoxon 显著优于 GC-FWI' },
    { path: 'analysis/results/metrics_shotgather_zeroshot_pilot.json', task: 'tbl:shotgather_pilot only', trusted: true,
      note: 'n=150 zero-shot CC=0.591 — 不进 Table 1' },
    { path: 'analysis/results/metrics_canonical_shotgather_test5000.json', task: 'Path B negative', trusted: true,
      note: 'fine-tune CC=0.391 · tbl:shotgather_finetune' },
    { path: 'analysis/results/baseline_metrics.json', task: 'velocity denoising surrogate', trusted: false,
      note: 'CC~0.998 · Paper 2 任务 · 不可写入 P1 Table 1' },
    { path: 'scripts/prepare_figure_data_from_geofwi.py', task: 'legacy placeholder', trusted: false,
      note: 'CC=0.62 等已撤回 · 勿再引用' }
  ],
  resourcePriority:
    'Now: P1 tex polish + w/o proximal ablation + shot U-Net baseline · P2 tex/submission shell · P3 deferred'
};

/* ════ 三篇投稿战略 · JCR 目标与执行序（2026-06-17 升级） ════ */
var SUBMISSION_STRATEGY = {
  updated: '2026-06-17',
  record: '20260629 发表难度与定位评估.md',
  barAboveAverageRecord: '20260617 平均略高录用线与提升清单.md',
  paceNote:
    'P1/P2 主体约 2 周已完成；抓紧再 2 周 = P2 SEG + P1 C&G/IEEE 投稿版。P3 独立门控（7–12 GPU·day + 写稿），非六周日程。',
  sprintWeeksP1P2: 2,
  ambition: '三篇均瞄准「该刊平均录用线略高」— 实验完整、叙事诚实、可复现、与 Peng/Feng 正面区分',
  sequencing: 'P2（Geophysics）→ P1（C&G / IEEE）→ P3（JGR:ML&C 锚 JCR Q1）',
  cloudPlan: {
    platform: 'AutoDL · 4090 24G 独占 · 华北二A',
    rateYuanPerDay: 42,
    dataDiskNote: 'OpenFWI FlatVel-A ~43GB 放数据盘；系统盘 100GB 仅代码+env',
    p3GateDays: '7–10 天（真 OpenFWI B/C + E9 重跑 24 cells）',
    p2BoostDays: '1–2 天（可选 OpenFWI GFS 外部验证）',
  },
  papers: {
    p1: {
      id: 'P1',
      title: 'GeoFWI: A Reproducible Benchmark for Diffusion-Based Velocity Reconstruction with Geological Curriculum Analysis',
      identity: 'benchmark + diagnostic analysis（非方法 SOTA）',
      primary: {
        journal: 'Computers & Geosciences',
        jcr: 'Q1 · Geosciences',
        fit: 'OpenFWI 类 benchmark / 可复现评测 + curriculum 实证发现',
      },
      secondary: [
        { journal: 'IEEE Transactions on Geoscience and Remote Sensing', jcr: 'Q1', note: 'ML+地学长文；须压缩 Fig、强化方法-实验对应' },
        { journal: 'IEEE Transactions on Computational Imaging', jcr: 'Q1–Q2', note: '重建/反问题向；强调 proxy benchmark 协议' },
        { journal: 'IEEE MLSP / ML4PS workshop → 期刊扩展', jcr: '—', note: '短周期备胎；非主路径' },
      ],
      barAboveAverage: [
        'Zenodo/GitHub DOI + 一键复现脚本（frozen metrics JSON）',
        '与 P2 互引定稿 · 任务域 velocity-proxy 写死',
        '四支柱 Fig.1 流程图 + curriculum 子群 summary 图（P1-NICHE）',
        'Supplementary 像产品文档（协议表 S1、全方法数 S2）',
      ],
      notPrimaryPath: 'Geophysics 方法轨 · 全量 P1-E4/E9/E10 仅为对标 Peng 的加分项',
      gpuMust: [],
      gpuBoost: [],
    },
    p2: {
      id: 'P2',
      title: 'Geological Fidelity Score (GFS) for structure-aware QC of velocity models',
      identity: '新评估指标 + 系统验证（velocity-proxy / denoising 域）',
      primary: {
        journal: 'Geophysics',
        jcr: 'Q1 · SEG',
        fit: 'methodology / evaluation metric · 2015+ 同类众多',
      },
      backupJcr2: [
        { journal: 'Journal of Applied Geophysics', jcr: 'Q2', note: '首投 Geophysics 拒稿/转投时' },
        { journal: 'Exploration Geophysics', jcr: 'Q2', note: '亚太应用地球物理 · 指标+案例体例' },
        { journal: 'Natural Resources Research', jcr: 'Q2', note: '方法+资源评价交叉' },
      ],
      barAboveAverage: [
        'Geophysics 投稿壳终检（ORCID · highlights · data availability）',
        'OpenFWI 子集 GFS vs CC 外部验证（Discussion 协议落地 1 表）',
        '与 P1 关系段 · 全文 grep 退役 p≈0.19 / τ≈473',
        'physics n=500 已齐；n=5000 physics 仅 R2 强要求时补',
      ],
      gpuMust: [],
      gpuBoost: ['P2-OPENFWI-GFS-VAL · FlatVel 子集 1–2 GPU·day'],
    },
    p3: {
      id: 'P3',
      title: 'Training-corpus ablation for VMB under GFS (Scheme B · GeoFWI vs OpenFWI)',
      identity: 'VMB / RTM-conditioned · P3-E9 地质语料 vs 统计扩增（非 Feng 式 zero-shot SSIM 叙事）',
      primary: {
        journal: 'JGR: Machine Learning and Computation',
        jcr: 'Q1 · AGU',
        fit: '跨数据集 ML + 地球物理 · GeoFWI 数据集同系列',
      },
      anchorJcr1Alternates: [
        { journal: 'IEEE Transactions on Geoscience and Remote Sensing', jcr: 'Q1', note: '若 JGR 偏 ML 理论而嫌实验偏应用' },
        { journal: 'Geophysics', jcr: 'Q1', note: '缩短为 Letter/方法文；Tier-2 降级 Supp' },
      ],
      backupJcr2: [
        { journal: 'Computers & Geosciences', jcr: 'Q1', note: 'E9 null/域依赖诚实稿仍可投；与 P1 错开期' },
        { journal: 'Geophysical Journal International', jcr: 'Q1–Q2', note: '方法+迁移叙事偏地球物理' },
      ],
      barAboveAverage: [
        'OpenFWI FlatVel-A 真预训练 B/C + E9 重跑 24 cells（硬门槛 · 禁 surrogate 主文）',
        'main.tex 全稿 · Intro–Limitations',
        'P3-E8 MMD 机制图 1 张（SSIM↑ CC≈0 GFS 解释）',
        'Tier-2 K=5 主文降级 · GFS Tier-1 定主指标',
        '与 P1/P2 三篇关系段 · 正面区分 Feng 2026 / Peng 2026',
      ],
      gpuMust: [
        'OpenFWI 下载+预训练 B/C',
        'P3-E9 B/C 24 cells 重跑',
      ],
      gpuBoost: ['P3-E8 MMD 分解图'],
    },
  },
  phases: [
    {
      id: 'AB',
      weeks: '2',
      goal: 'P2 + P1 投稿版（两冲刺周）',
      tasks: [
        'W1：P2 SEG 提交 · P1 Zenodo/Fig.1/Supp 并行',
        'W2：P1 DOI + cite P2 · C&G/IEEE 首投',
        '可选：P2 OpenFWI GFS 验证表（1 GPU·day）',
      ],
      gpuDays: '0–2',
    },
    {
      id: 'C',
      weeks: 'P1/P2 投稿后',
      goal: 'P3 → JGR:ML&C 锚 Q1',
      tasks: [
        'AutoDL 7–10d · 真 OpenFWI B/C + E9 重跑',
        'main.tex + E8 机制图（~1–2 周写作，可与 GPU 交错）',
      ],
      gpuDays: '7–12',
      gate: 'P3 OpenFWI B/C 完成前禁止写定 Introduction 主 claim',
    },
  ],
  discipline:
    'P2 先投确立 GFS 合法性；P1 benchmark 不抢 P2 指标贡献；P3 用 GFS 问训练语料。' +
    '三篇禁止同期同刊（P1/P3 均勿与 P2 同时 C&G）。',
};

/* ════ 平均略高录用线 · 定义与提升清单（2026-06-17 · 详录见同名 .md） ════ */
var BAR_ABOVE_AVERAGE_GUIDE = {
  updated: '2026-06-17',
  record: '20260617 平均略高录用线与提升清单.md',
  paceNote: 'P1/P2 主体 ~2 周已完成；再 2 周冲刺 = 投稿版。P3 独立 GPU 块，不占用六周日历。',
  sprintWeeksP1P2: 2,
  definition: {
    averageBar: [
      '一个清楚、可辩护的主贡献（不是三个散点）',
      '实验/证据与 claim 一一对应，负结果也写透',
      '可复现（代码、数据协议、固定 split）',
      '与同期竞品有正面关系（Peng/Feng/GeoFWI 原文）',
      '篇幅与图表符合刊规，审稿人 20 分钟内能 get 到 point',
    ],
    aboveAverage: '在上述基础上再多 1–2 个审稿人很难一票否决的硬点（外部验证、机制图、或诚实但完整的 ablation）',
  },
  statusVsBar: [
    { paper: 'P2 GFS', target: 'Geophysics', toAverage: '很近', toAboveAverage: '差 1 层外部/机制加固' },
    { paper: 'P1 GC-FWI', target: 'C&G benchmark', toAverage: 'reframe 后可达', toAboveAverage: '差公开复现包 + 与 P2 联动定稿' },
    { paper: 'P3 VMB', target: 'JGR:ML&C', toAverage: '不够（B/C surrogate）', toAboveAverage: '差真 OpenFWI + 完整稿 + 机制图' },
  ],
  p2: {
    alreadyEnough: ['E7 悖论', 'n=5000', 'geo-type', 'physics n=500', 'p=0.19 退役', 'cover/highlights 草稿'],
    mustForAbove: [
      'OpenFWI 验证协议落地：FlatVel 子集 GFS vs CC 表（1–2 GPU·day · ROI 最高）',
      '与 P1 边界段落定稿（预测来源 · 任务定义 · 非 self-plagiarism）',
      '投稿壳零失误：ORCID · data · grep 退役 p≈0.19 / τ≈473',
    ],
    optional: ['physics n=5000 子集（R2 难挑物理验证）'],
    doNot: ['换叙事', '加第七第八个指标', '重训全部模型'],
    oneLiner: '实验够，补外部验证 + 投稿零失误就能略高',
  },
  p1: {
    premise: '维持 benchmark + diagnostic；略高 = 社区愿意引用协议和发现，不是 beat U-Net',
    mustForAverage: [
      '公开复现包 + Zenodo DOI + frozen metrics_canonical.json + 一键脚本',
      '与 P2 互引定稿（P2 略前有利）',
      '四支柱 Abstract + Fig.1 一眼可见',
    ],
    shouldForAbove: [
      'P1-NICHE 子群 summary 图（GCI/geo_type + effect size）',
      'Supp 产品化：10 主图 + 23 Supp · 表 S1 协议 · 表 S2 全方法数',
    ],
    doNot: ['全量 P1-E4/E9/E10 仅为 busy', '滑回方法 SOTA 叙事', '首投 Geophysics（应降目标 C&G）'],
    oneLiner: '别加实验加定位，补公开 benchmark 产品化 + 与 P2 联动就能略高',
  },
  p3: {
    blockers: [
      'B/C surrogate → 主 claim 不能送审',
      '无 main.tex（仅 outline + Results 草稿）',
      'Feng 2026 占坑 → VMB/Scheme B + GFS 主指标须写死',
    ],
    mustForAverage: [
      '云 GPU：FlatVel-A 真 B/C 预训练 + E9 24 cells 重跑',
      '完整稿 Intro–Limitations（LaTeX）',
      'Table 1 诚实化：null ablation / 域依赖 · seed+CI 勿 overstated',
    ],
    shouldForAbove: [
      'P3-E8 MMD 机制图 1 张（SSIM↑ CC≈0 GFS 低）',
      'Tier-2 K=5 主文降级 · GFS Tier-1 定主指标',
      '三篇关系段：P1=benchmark · P2=指标 · P3=用 GFS 问训练语料',
    ],
    journalNote: 'OpenFWI 结果偏 null 时备选 C&G / Geophysics Letter 比硬撑 JGR 更现实',
    oneLiner: '必须补真 OpenFWI + 完整稿 + 机制图；否则够不到平均录用',
  },
  commonGaps: [
    { dim: '发表顺序', now: '三篇并行', fix: 'P2 → P1 → P3；后两篇 cite 前两篇 published/in review' },
    { dim: '可复现', now: 'P2 较好 · P1 缺 DOI · P3 脚手架有', fix: '三篇 monorepo 说明 + 各篇 frozen results' },
    { dim: '任务边界', now: '易混 proxy/FWI/VMB', fix: '每篇 Abstract 第一句 task sentence 各不同' },
    { dim: '竞品', now: 'config 有 Peng/Feng', fix: 'Related Work 各半页正面比较' },
    { dim: '图表', now: 'P1 曾 33 图', fix: '主文 ≤10 图 · 其余 Supp' },
  ],
  minImprovementROI: [
    { rank: 1, task: 'P2 Geophysics 首投（2 周冲刺 W1）+ 可选 OpenFWI', gpu: '0–2d' },
    { rank: 2, task: 'P1 Zenodo + 互引 + C&G 投稿（2 周冲刺 W2）', gpu: 0 },
    { rank: 3, task: 'P3 云 7–10 GPU·day + main.tex（P1/P2 投稿后）', gpu: '7–12d' },
    { rank: 4, task: 'P3-E8 一图 + Tier-2 降级', gpu: 0, note: '与 P3 写稿并行' },
  ],
  doNot: [
    'P1 追 E4/E9/E10 全套',
    '三篇同时冲 Geophysics',
    'P3 surrogate 未换前写 Introduction 定调',
  ],
  sprintChecklist: [
    { week: 1, label: '冲刺 W1', p2: 'SEG 提交 · grep · 可选 OpenFWI 表', p1: 'Zenodo 草稿 · Fig.1 · Supp S1/S2', p3: 'defer' },
    { week: 2, label: '冲刺 W2', p2: 'buffer / OpenFWI 收尾', p1: 'DOI · cite P2 · C&G/IEEE 首投', p3: '可租云下 OpenFWI（非关键路径）' },
  ],
  p3AfterP1P2Submit:
    '7–12 GPU·day 真 B/C + E9 → ~1–2 周 main.tex + E8 图 → JGR 首投',
  referenceBenchmarkAppendix: '20260617 平均略高录用线与提升清单.md · 附录 A',
  w1Checklist: 'paper2/submission/W1_SPRINT_CHECKLIST.md',
  referenceBenchmark10: [
    { litId: 31, num: '31', title: 'OpenFWI', journal: 'NeurIPS 2022', lane: 'benchmark', mapsTo: 'P1', difficultyNote: 'C&G 主对标；不需 beat InversionNet' },
    { litId: 37, num: '37', title: 'GeoFWI dataset', journal: 'JGR:ML&C 2026', lane: 'benchmark', mapsTo: 'P1/P3', difficultyNote: 'SGDS 已占 diffusion 位；我们卖协议+诊断' },
    { litId: 11, num: '11', title: 'InversionNet', journal: 'IEEE TCI 2020', lane: 'method-SOTA', mapsTo: 'P1-avoid', difficultyNote: 'CC>0.85 bar；方法轨死刑' },
    { litId: 34, num: '34', title: 'DiffusionFWI', journal: 'IEEE TGRS 2024', lane: 'method-SOTA', mapsTo: 'P1-avoid', difficultyNote: '扩散无物理亦可发；我们勿拼 CC' },
    { litId: 35, num: '35', title: 'Curriculum FWI', journal: 'Geophysics 2022', lane: 'component', mapsTo: 'P1-pillar', difficultyNote: '+8–15% CC 同档；宜作 benchmark 一柱' },
    { litId: 16, num: '16', title: 'Smart FWI', journal: 'Geophysics 2020', lane: 'physics-hybrid', mapsTo: 'P1-Geophysics-hard', difficultyNote: 'P1 投 Geophysics 偏高' },
    { litId: 20, num: '20', title: 'DLM-FWI', journal: 'GJI 2026', lane: 'evaluation', mapsTo: 'P2', difficultyNote: 'CC vs waveform；GFS 同构动机' },
    { litId: 13, num: '13', title: 'Physics-guided DL', journal: 'Geophysics 2021', lane: 'methodology', mapsTo: 'P2', difficultyNote: 'Geophysics methodology 模板' },
    { litId: 47, num: '47', title: 'Peng W2-DPS', journal: 'arXiv 2026', lane: 'direct-threat', mapsTo: 'P1-RW', difficultyNote: '方法轨必半页正面比；benchmark 不 claim 赢' },
    { litId: 48, num: '48', title: 'Feng Scaling Laws', journal: 'arXiv 2026', lane: 'direct-threat', mapsTo: 'P3', difficultyNote: '零样本 SSIM 占坑；P3-E9+GFS 唯一理性路径' },
  ],
  difficultySummary: {
    p2: { level: 'low-mid', bar: '≈ #7+#8', gap: 'OpenFWI 1 表 + SEG 零失误' },
    p1: { level: 'mid', bar: '≈ #1+#2+#5', gap: 'Zenodo DOI + Fig.1；忌 #3/#4/#9' },
    p3: { level: 'high', bar: 'vs #2+#10', gap: '真 OpenFWI B/C + main.tex + E8' },
  },
  structuralConclusions: [
    '难度主要是刊型错配，不是实验全不够',
    '2026 #9/#10 堵死 P1 方法轨与 P3 零样本轨',
    '结构性难只有 P3（真 OpenFWI + 机制图）',
  ],
};

/* ════ 同行审稿分析 · Paper 1/2/3 综合诊断（2026-06-29 · 战略升级 2026-06-17） ════ */
var PAPER_REVIEW_DASHBOARD = {
  updated: '2026-06-17',
  source: 'index.html · config_data.js（paper_review_dashboard.html 为阶段性静态快照）',
  publishabilityAssessment: {
    inputDate: '2026-06-17',
    strategyRecord: 'SUBMISSION_STRATEGY · BAR_ABOVE_AVERAGE_GUIDE · 20260629 发表难度与定位评估.md',
    barAboveAverageRecord: '20260617 平均略高录用线与提升清单.md',
    record: '20260629 发表难度与定位评估.md',
    p1Record: 'paper1/experiments/P1_PUBLISHABILITY_ASSESSMENT.md',
    p2Record: 'paper2/experiments/P2_PUBLISHABILITY_ASSESSMENT.md',
    p3Record: 'paper3/experiments/P3_PUBLISHABILITY_ASSESSMENT.md',
    oneLiner: 'P2 冲 Geophysics Q1 · P1 冲 C&G/IEEE · P3 锚 JGR:ML&C Q1 — 分阶段可完成',
    p2: {
      verdict: 'manuscript_ready',
      verdictLabel: '可冲 Geophysics Q1',
      targetPrimary: 'Geophysics (JCR Q1)',
      targetBackup: 'Journal of Applied Geophysics / Exploration Geophysics (JCR Q2)',
      rationale:
        'GFS value proposition（E7 blur paradox）干净；n=5000 足够；geo-type stratification 为新发现；' +
        '「新指标 + 系统验证」叙事完整，physics n≥500 已齐。',
      blockers: [
        { item: 'p=0.19 诚实陈述 / 退役 τ≈473 叙事', status: 'done', note: '§3.4 cross-method decoupling · 2026-06-29 tex' },
        { item: 'Physics batch n≥500（E5/E8 Δt_first）', status: 'done', note: '2026-06-29 · n=5000 deferred' },
        { item: 'Geophysics 投稿壳终检 + SEG 提交', status: 'pending', note: 'paper2/submission/ 草稿已有' },
        { item: 'OpenFWI GFS 外部验证（略高加分）', status: 'optional', note: '1–2 GPU·day · ¥42/天' },
      ],
    },
    p1: {
      verdict: 'reframe_ready',
      verdictLabel: 'benchmark 就绪 · 冲 C&G / IEEE',
      targetPrimary: 'Computers & Geosciences (JCR Q1)',
      targetSecondary: 'IEEE TGRS · IEEE TCI',
      rationale:
        'benchmark + diagnostic 定位下现有四支柱数据够平均线；略高需 DOI + 与 P2 联动 + 图表产品化。',
      reframeTitle:
        'GeoFWI: A Reproducible Benchmark for Diffusion-Based Velocity Reconstruction with Geological Curriculum Analysis',
      reframeType: 'benchmark + diagnostic analysis（对标 OpenFWI / C&G benchmark 文）',
      pillars: [
        'GeoFWI 系统性评测平台（locked metrics · Wilcoxon+Bonferroni · evidence map）',
        'Geological curriculum 有效性（CC 0.859 vs 0.814 · d≈1.0）',
        'Proximal guidance 失效模式（P1-F0 · Table A.8 · complexity stratification）',
        'Shot-gather domain gap 量化（CC 0.859→0.591）',
      ],
      blockers: [
        { item: 'Zenodo/GitHub DOI', status: 'pending', note: 'C&G benchmark 审稿首看' },
        { item: '与 P2 互引定稿', status: 'pending', note: 'P2 投稿后或 in review 版本' },
        { item: 'Supplementary 结构化', status: 'partial', note: '10 主图 + 23 Supp 目标' },
      ],
      notRecommended: 'Geophysics 方法轨 · 补大实验做赢 U-Net',
    },
    p3: {
      verdict: 'gpu_and_manuscript_required',
      verdictLabel: '锚 JCR Q1 · 差 OpenFWI 真实验 + 全稿',
      targetPrimary: 'JGR: Machine Learning and Computation (JCR Q1)',
      targetAnchor: 'IEEE TGRS · Geophysics（缩短体例）',
      targetBackup: 'C&G · GJI（错开 P1 投稿期）',
      rationale:
        'E2/E9/E10 矩阵已跑但 B/C 为 surrogate；主 claim「地质 vs 统计语料」不可送审。' +
        '真 OpenFWI + main.tex + E8 机制图 → 可达 JGR:ML&C 平均略高。',
      blockers: [
        { item: 'OpenFWI FlatVel-A 真预训练 B/C', status: 'pending', note: 'AutoDL 7–10d · 数据盘 43GB' },
        { item: 'P3-E9 B/C 24 cells 重跑', status: 'pending', note: 'gate 于真 checkpoint' },
        { item: 'main.tex 全稿', status: 'pending', note: '仅有 outline + Results 草稿' },
        { item: 'P3-E8 MMD 机制图', status: 'optional', note: '略高加分 · 可 CPU+绘图' },
      ],
    },
    reviewerQuoteP1:
      '作者提出了比 U-Net 复杂得多的方法，但所有指标都输。唯一的正面结果是 curriculum ablation（CC +0.045）。' +
      '这个发现可以作为 existing 方法的改进组件，但不支撑一篇独立的方法论文章。',
    sequencing:
      'P2 Geophysics 首投 → P1 C&G/IEEE → P3 JGR:ML&C（OpenFWI 云 GPU）· 三篇互引',
  },
  argumentFixRegistry: {
    updated: '2026-06-29',
    script: 'patches/wsl/apply_argumentation_fixes_tex.py',
    records: [
      'paper1/experiments/P1_ARGUMENTATION_FIXES.md',
      'paper2/experiments/P2_ARGUMENTATION_FIXES.md',
      '20260629 发表难度与定位评估.md',
      'paper1/experiments/P1_PUBLISHABILITY_ASSESSMENT.md',
      'paper2/experiments/P2_PUBLISHABILITY_ASSESSMENT.md',
      'paper3/experiments/P3_PUBLISHABILITY_ASSESSMENT.md',
      '20260617 平均略高录用线与提升清单.md',
      'paper1/experiments/P1_REFRAME_BENCH.md',
      'paper2/experiments/P2_SUBMIT_PREP.md',
      'paper1/experiments/P1_SUBMIT_PREP.md',
      'paper1/experiments/P1_ARG_K0_INF.md'
    ],
    p1: [
      { id: 'P1-ARG-PROX-SEP', status: 'done', note: 'sec:proximal_evidence_separation; Abstract/Intro 分离 training vs sampling' },
      { id: 'P1-ARG-CURR-LEAD', status: 'done', note: 'Abstract 贡献顺序 curriculum 首位' },
      { id: 'P1-ARG-SG-EPI', status: 'done', note: 'shot-gather 三表 Purpose/Conclusion' },
      { id: 'P1-ARG-K0-INF', status: 'done', note: 'K5 vs K0 test@5000: Wilcoxon p_bonferroni=1.0 (no sig. diff)', gpu: 0.5 }
    ],
    p2: [
      { id: 'P2-ARG-DT-INTRO', status: 'done', note: 'Introduction Design intent: GFS structural not traveltime' },
      { id: 'P2-ARG-RANK-DECOUPLE', status: 'done', note: '§3.4 cross-method decoupling; retire τ473 p≈0.19 claim' },
      { id: 'P2-ARG-OPENFWI-PROTO', status: 'done', note: 'Discussion OpenFWI GFS validation protocol' }
    ]
  },
  stats: {
    p1Critical: 4,
    p2Critical: 0,
    p1Status: 'benchmark 终稿',
    p1StatusNote: 'reframe 完成 · 2026-06-29',
    p2Status: 'tex 闭环',
    p2StatusNote: '实验+论证已齐 · 2026-06-29'
  },
  overview: [
    {
      title: '投稿战略（2026-06-17）',
      text: 'P2 冲 Geophysics（JCR Q1），保 JCR Q2 应用地球物理刊；P1 冲 C&G 或 IEEE TGRS/TCI；P3 锚 JGR:ML&C Q1。三篇均瞄准平均录用线略高：可复现 + 诚实负结果 + 竞品正面区分。'
    },
    {
      title: '定位评估（2026-06-29）',
      text: 'P2 实验已齐，差 Geophysics 投稿壳与可选 OpenFWI 验证。P1 benchmark reframe 已完成，差 DOI 与 P2 互引。P3 差真 OpenFWI + main.tex。'
    },
    {
      title: 'Paper 1 的根本问题',
      text: 'contribution 分量：主 benchmark 输给 U-Net/PINN，physics score 全零，shot-gather 失败。解法不是「做赢 baseline」，而是去掉方法优越性包装，改 benchmark + curriculum/失效模式/domain-gap 诊断文。'
    },
    {
      title: 'Paper 2 的核心优势',
      text: 'GFS 作为 metric 的 value proposition 经 E7 干净证明；n=5000 + geo-type stratification 为真实新发现；「新指标 + 系统验证」叙事完整。'
    },
    {
      title: '两篇的关系',
      text: 'P2 应先定稿（GFS 指标合法性）。P2 的 gc_fwi 预测来自 P1 velocity-proxy 任务——结论域限于 denoising，须在 P2 limitation 中明确；P1 reframe 后与 P2 互引避免 self-plagiarism。'
    }
  ],
  p1: {
    critical: [
      { id: 'C1', title: 'Task identity crisis', text: '标题/Abstract 说 FWI，但 audited task 是 velocity-proxy reconstruction。', fix: '彻底改写为 Velocity-Domain Reconstruction Benchmark。main.tex 标题已部分修正，需全文一致性检查。' },
      { id: 'C2', title: 'Baselines 显著优于 GC-FWI', text: 'U-Net CC=0.916 vs GC-FWI 0.859；GFS 0.580 vs 0.344。', fix: '✅ P1-NICHE 已完成：无 GCI level 达 45% win-rate；ablation 仍是正面信号。' },
      { id: 'C3', title: 'Physics score = 0 for all methods', text: 'proximal guidance 是核心卖点，但 physics metric 全 0。', fix: '分级 physics score；或连接 P1-F0 37/55；或降级 contribution 声明。' },
      { id: 'C4', title: 'WaveDiffusion 竞争威胁', text: 'arXiv:2410.09002 未充分实验对比。', fix: 'GeoFWI high-GCI (Levels 8-11) 展示 implicit latent scoring 失效；或诚实承认 low-complexity 差异有限。' }
    ],
    major: [
      { id: 'M1', title: 'GCI 权重无验证', text: '[0.35,0.25,0.20,0.20] 驱动 11-stage curriculum 但无 sensitivity。', fix: 'τ-sensitivity 式 GCI 权重稳定性分析（类似 P2 Table 4）。' },
      { id: 'M2', title: 'Ablation 不完整', text: 'w/o both proximal+curriculum 与 w/o adaptive λp(t) deferred。', fix: '至少补 w/o both 行（50 epochs，同设置）。' },
      { id: 'M3', title: 'Curriculum transition 未验证', text: 'γ_level < 0.01 无消融 vs 固定 epoch schedule。', fix: '与 fixed-interval curriculum 对比一组。' },
      { id: 'M4', title: 'P1-F0 n=55 过小', text: 'Level 5 的 −10.3% 负结果无解释。', fix: '扩大到 n≥20/level 或分析 Level 5 异常原因。' }
    ],
    strengths: [
      '诚实性：audited vs deferred、locked metrics、Wilcoxon+Bonferroni、Evidence Map 设计精良。',
      'Curriculum ablation 效果显著（CC 0.859 vs 0.814，Cohen\'s d≈1.0）——应在 Abstract/Conclusion 更突出。'
    ]
  },
  p2: {
    critical: [
      { id: 'C1', title: 'Δt_first 负结果叙事', text: 'CC-top20% Δt_first 优于 GFS-top20%（gfs_better=false）。', fix: '主动划定 GFS 适用场景（structural QC、horizon picking、salt mapping）vs 不适用（first-arrival ranking）。Discussion 已有草稿，需 Method design-intent 小节强化。' },
      { id: 'C2', title: 'n=5000 physics-forward batch 未完成', text: 'E5/E8 仅 n=200 smoke。', fix: '已完成 n=500 physics batch（2026-06-29）；n=5000 仍 deferred。' }
    ],
    major: [
      { id: 'M1', title: 'τ 敏感性叙事不清', text: '低 τ 下 ranking 反转意义未解释。', fix: '讨论低 τ 保留弱反射界面 vs 高 τ 仅强对比度界面；解释 smoother 输出在低 τ 得分更高。' },
      { id: 'M2', title: 'GFSλ cross-dataset 价值未验证', text: 'GeoFWI 上 tracks GFS；BP2004 仅 synthetic。', fix: '无 heterogeneous grid 则缩减正文篇幅，移 appendix。' },
      { id: 'M3', title: 'Table 3 缺方差/CI', text: 'Mann-Whitney p 分散在脚注；unet vs gc_fwi 曾 p=0.19（deprecated τ）。', fix: 'Table 补 std/95% CI；正文明确 unified τ 下 gc_fwi 显著领先（p≪10⁻¹⁰⁰）。' }
    ],
    strengths: [
      'P2-E7 blur paradox（CC=0.965, GFS=0.375）——适合 opening figure。',
      'Geo-type stratification（fault bucket n=1510, τ=0.274）——独特贡献。',
      'n=5000 七方法比较 + open-source + frozen artifacts——可重复性叙事完整。'
    ]
  },
  strategy: {
    p1Readiness: [
      { label: '当前定位：benchmark 文', text: '【2026-06-29】GeoFWI 可复现评测平台 + curriculum/失效模式/domain-gap 诊断。不需补实验做赢 U-Net。全文 reframe 与 w/o both ablation 已完成。' },
      { label: '已放弃：方法 SOTA 叙事', text: '以「更好方法」包装在当前实验格局下不够——审稿人会问为何不直接用 U-Net。' },
      { label: '待办：公开复现', text: 'Zenodo/GitHub release URL；与 P2 互引定稿。' }
    ],
    p2Readiness: [
      { label: '稿件状态：闭环', text: '【2026-06-29】E7 + n=5000 + geo-type 已齐；p=0.19 退役 + n=500 physics 已完成。summary/highlights 草稿就绪。' },
      { label: 'Deferred', text: 'physics n=5000 全量 batch 仍 deferred，已在 limitation 中声明。' }
    ],
    sequencing: 'P2 先定稿 → P1 benchmark 终稿。P1 依赖 GFS 指标在 P2 中已定义并互引。',
    threats: 'Peng/Feng 2026 已引用。P1 差异化改为 benchmark transparency + curriculum 诊断；P2 差异化为 GFS 评估维度 + geo-type stratification。'
  },
  fixQueue: [
    { priority: 0, paper: 'P2', id: 'P2-RW-PENG-FENG', task: 'Introduction 补 Peng/Feng 2026 对比 + bib', status: 'done', gpu: 0 },
    { priority: 1, paper: 'P2', id: 'P2-TAU-GEO', task: 'τ sensitivity 段落：低/高 τ 对应地质界面类型解释', status: 'done', gpu: 0 },
    { priority: 2, paper: 'P2', id: 'P2-TAB-STD', task: 'Table tab:e2_methods 补 GFS/CC std（n=5000）', status: 'done', gpu: 0 },
    { priority: 3, paper: 'P2', id: 'P2-GFS-SCOPE', task: 'Method §GFS design intent：适用/不适用场景', status: 'done', gpu: 0 },
    { priority: 4, paper: 'P1', id: 'P1-FRAMING', task: '全文 task=velocity-proxy 一致性 grep（title/abstract/intro 已改，查遗漏）', status: 'done', gpu: 0 },
    { priority: 5, paper: 'P1', id: 'P1-ABL-BOTH', task: 'w/o both proximal+curriculum 消融 50ep → tbl:ablation', status: 'done', gpu: 0.5 },
    { priority: 6, paper: 'P1', id: 'P1-NICHE', task: 'GC-FWI 子群分析：按 GCI level / geo_type 找接近 baseline 的 niche', status: 'done', gpu: 0 },
    { priority: 7, paper: 'P2', id: 'P2-PHYS-N500', task: 'Δt_first physics batch n≥500', status: 'done', gpu: 1 },
    { priority: 8, paper: 'both', id: 'PENG-FENG-RW', task: 'P1 Related Work 补 #47 Peng W₂ + #48 Feng scaling 正面比较', status: 'done', gpu: 0 },
    { priority: 9, paper: 'P1', id: 'P1-ARG-FIXES', task: '论证链1–3 tex：proximal 分离/curriculum Lead/shot-gather epistemic', status: 'done', gpu: 0 },
    { priority: 10, paper: 'P2', id: 'P2-ARG-FIXES', task: '论证风险1–3 tex：Δt intro/ranking decouple/OpenFWI protocol', status: 'done', gpu: 0 },
    { priority: 11, paper: 'P1', id: 'P1-ARG-K0-INF', task: 'Clean isolation: K=0 inference vs full GC-FWI（sampling-time）', status: 'done', gpu: 0.5, note: 'CC K5=0.803 K0=0.804; Wilcoxon ns' },
    { priority: 12, paper: 'P2', id: 'P2-SUBMIT-PREP', task: '终稿核对：summary + highlights + p=0.19/n500 终检', status: 'done', gpu: 0, note: '草稿+tex · paper2/submission/' },
    { priority: 13, paper: 'P1', id: 'P1-REFRAME-BENCH', task: 'benchmark 定位 reframe：title/abstract/四支柱 contribution（去方法优越性）', status: 'done', gpu: 0, note: 'intro/title patch · PDF 40p' },
    { priority: 14, paper: 'P1', id: 'P1-SUBMIT-PREP', task: '终稿核对：summary + highlights + K0 写入 tex', status: 'done', gpu: 0, note: 'MANUSCRIPT_* · paper1/submission/' },
  ]
};

/* ════ 可执行优先级 · 三篇 JCR 投稿序（2026-06-17 · 见 SUBMISSION_STRATEGY） ════ */
var OPERATIONAL_PRIORITY = {
  updated: '2026-06-17',
  premise:
    'P1/P2 主体 ~2 周已完成 · 再 2 周冲刺 = 投稿版（P2 SEG → P1 C&G/IEEE）· P3 独立 GPU 门控',
  rule: '两冲刺周 P2+P1 投稿 → P3 云 GPU + 全稿 · 勿跳过 OpenFWI 真实验',
  strategyRef: 'SUBMISSION_STRATEGY',
  sprintWeeksP1P2: 2,
  phases: [
    {
      id: 'W1',
      label: '冲刺 W1 · P2 SEG 提交 + P1 复现包并行',
      gpu: '0–1 天 optional',
      items: [
        { id: 'P2-SEG-SUBMIT', task: 'Geophysics cover/highlights/ORCID/data · SEG 门户提交', gpu: 0, hours: 8 },
        { id: 'P2-OPENFWI-VAL', task: '可选 · OpenFWI 子集 GFS vs CC 外部验证表', gpu: 1, hours: 12 },
        { id: 'P1-ZENODO-DRAFT', task: 'GitHub/Zenodo README · Fig.1 四支柱 · Supp S1/S2 结构', gpu: 0, hours: 10 },
        { id: 'P2-P1-XREF', task: '互引段草稿（P2 定稿 + P1 预留 cite）', gpu: 0, hours: 2 },
      ],
    },
    {
      id: 'W2',
      label: '冲刺 W2 · P1 首投（C&G / IEEE）',
      gpu: 0,
      items: [
        { id: 'P1-ZENODO', task: 'Zenodo DOI 发布 · frozen metrics JSON', gpu: 0, hours: 4 },
        { id: 'P1-SUBMIT', task: 'C&G 首投（或 IEEE TGRS 若格式就绪）', gpu: 0, hours: 4 },
        { id: 'P2-BUFFER', task: 'P2 投稿后 grep/Highlights 终检 buffer', gpu: 0, hours: 2 },
      ],
    },
    {
      id: 'P3',
      label: 'P3 · P1/P2 投稿后（7–12 GPU·day + 写稿）',
      gpu: '7–12 天',
      items: [
        { id: 'P3-DATA', task: '数据盘挂载 · OpenFWI FlatVel-A ~43GB', gpu: 0, hours: 4 },
        { id: 'P3-PRETRAIN-BC', task: '真预训练 corpus B + C（同架构 GC-FWI）', gpu: 5, hours: 80 },
        { id: 'P3-E9-RERUN', task: 'E9 B/C 24 cells × 3 seeds 重跑', gpu: 2, hours: 36 },
        { id: 'P3-E8-FIG', task: 'MMD 机制图 + Tier-2 降级 Supp', gpu: 0, hours: 8 },
        { id: 'P3-TEX', task: 'main.tex 全稿 · Intro–Limitations · Feng/Peng 区分', gpu: 0, hours: 40 },
        { id: 'P3-SUBMIT', task: 'JGR:ML&C 首投', gpu: 0, hours: 6 },
      ],
    },
  ],
  deferUntilStable: [
    'P1 全量 E4/E9/E10（非 C&G benchmark 首投必须）',
    'P2 physics n=5000 全量（仅 Geophysics R2 强要求）',
    'P1 做赢 U-Net 主路径',
    'P3 Tier-2 超参大 sweep',
  ],
  budgetGates: [
    { phase: 'W1', capYuan: 0, unlocks: 'P2 Geophysics SEG 提交 + P1 复现包并行', experiments: ['P2-SEG-SUBMIT', 'P1-ZENODO-DRAFT'] },
    { phase: 'W1+', capYuan: 42, unlocks: 'P2 OpenFWI 验证（1×¥42）', experiments: ['P2-OPENFWI-VAL'], gate: 'optional 略高' },
    { phase: 'W2', capYuan: 0, unlocks: 'P1 C&G/IEEE + DOI', experiments: ['P1-ZENODO', 'P1-SUBMIT'], gate: 'P2 已提交' },
    { phase: 'P3', capYuan: 420, unlocks: 'P3 OpenFWI + E9（10×¥42）', experiments: ['P3-PRETRAIN-BC', 'P3-E9-RERUN'], gate: 'P3 真 checkpoint' },
    { phase: 'P3+', capYuan: 504, unlocks: 'P3 缓冲+全稿（12×¥42）', experiments: ['P3-TEX', 'P3-SUBMIT'] },
  ],
};

/* ════ 算力预算 · 2026 Q2 国内云 GPU 真实价 + FWI 正演开销（2026-06-19） ════ */
var COMPUTE_BUDGET = {
  updated: '2026-06-19',
  summary:
    '总金额量级（全项目 ≈¥650–950，2 周矩阵 ≈¥280–450）大体合理；**GPU 小时数偏乐观约 1.5–2×**——' +
    '主因是未充分计入扩散每步 F(v) 正演。规划应按**阶段门控**花钱，勿一次性押注全程。',
  priceSurvey2026Q2: {
    note: '2026 Q2 国内云 4090 时租实测区间 · 实际账单以平台为准',
    platforms: [
      { name: '智星云', rateYuanPerHour: 1.35, note: '区间低端 · 学生/活动价可达' },
      { name: '预设参考价', rateYuanPerHour: 1.5, note: '原 config 中位 · **偏乐观但可达**（需抢低价档）' },
      { name: 'AutoDL', rateYuanPerHour: 1.88, note: '常见成交价 · 比 ¥1.5 贵约 25%' },
      { name: 'AutoDL 高端档', rateYuanPerHour: 2.19, note: '比 ¥1.5 贵约 45%' },
      { name: '行业区间', rateYuanPerHour: '1.45–2.29', note: '4090 24GB 2026 Q2 汇总' }
    ],
    planningRates: {
      optimistic: { rate: 1.5, label: '乐观（智星云/折扣）' },
      realistic: { rate: 1.88, label: '现实（AutoDL 常见）' },
      conservative: { rate: 2.19, label: '保守（AutoDL 高端）' }
    }
  },
  fwiForwardOverhead: {
    headline: '最大隐性风险：GPU 小时预估未充分计入波方程正演 F(v)',
    perSampleInference:
      '100×100 网格 · 50 炮 · 1000 时间步 · K=5 内层 · T≈50 扩散步 → 单样本约 50×5×50 ≈ 12,500 次波方程求解',
    singleForwardMs: 'DeepWave/FD 在 4090 上单次 100×100×1000 约 1–5 ms（取决于向量化与显存）',
    batch500Hours: 'n=500 全量推断：约 20–48 h（向量化良好）· **逐样本循环可 ×10**',
    vectorizationRisk: '代码若未 batch 正演，P1-E2 预算应从 2 GPU·day 上调至 10+ GPU·day',
    cflNaNRisk:
      'CFL/梯度爆炸 → NaN：非普通「重跑」可解决，有时需完全重调 dt、α、波速范围；调试 GPU 常超过正式实验'
  },
  perExperimentHours: [
    { id: 'P2-E7', gpuHours: 0, costYuan: '≈0', note: '本地/WSL CPU · 合成扰动' },
    { id: 'P1-F0', gpuHours: '2–4', costYuan: '¥6–13', note: 'K=5 隔离 · 无完整扩散环' },
    { id: 'P1-F0b', gpuHours: '2–4', costYuan: '¥6–13', note: 'CFL 稳定性 · 5 geo_type 全推断无 NaN · **P1-E2 前必做**' },
    { id: 'P1-E3', gpuHours: '2–5', costYuan: '¥3–11', note: '50 val · 推断级 w/ vs w/o proximal' },
    { id: 'P1-E2', gpuHours: '20–48', costYuan: '¥30–90', note: 'n=500 · **项目最大单实验开销**' },
    { id: 'P1-E4', gpuHours: '48–96', costYuan: '¥72–180', note: 'N=3 vs N=11 ×2000 · 若训练环带正演取上限' },
    { id: 'P1-E9', gpuHours: '24–40', costYuan: '¥36–75', note: '3×4 有色噪声 · salt 子集' },
    { id: 'P2-E2/E5', gpuHours: 0, costYuan: '≈0', note: '离线 CPU' },
    { id: 'P3-E9', gpuHours: '35–50', costYuan: '¥50–100', note: '三组预训练 + N=10,50 fine-tune' }
  ],
  paperRanges: {
    p1: { hours: '80–170', yuanOptimistic: '¥80–250', note: '原 ¥105/70h 为乐观下限' },
    p2: { hours: '0–8（2周矩阵）', yuan: '≈0–15', note: '离线为主 · OpenFWI 自训 Deferred 另计' },
    p3: { hours: '35–50', yuan: '¥50–100', note: '与旧预估接近' }
  },
  stageGates: [
    {
      phase: 1, capYuan: 30, label: '第一阶段 · 最高杠杆',
      runs: ['P2-E7（本地免费）', 'P1-F0 + P1-F0b CFL', 'P1-E3 冒烟'],
      outcome: '近端是否可用 · GFS 合成扰动证据 · ¥30 内发现根本问题',
      hoursGpu: '6–13',
      costRange: '¥15–30'
    },
    {
      phase: 2, capYuan: 120, label: '第二阶段 · 首版真实数字',
      runs: ['P1-E2 n=500', 'P2-E2/E4/E5 GFS+Δt', 'P3-E1 Marmousi 预处理'],
      outcome: 'metrics_canonical.json · Table 1 可填 [TBD→数值] · 判断难度是否足够',
      gate: 'P1-F0/F0b pass',
      hoursGpu: '20–55',
      costRange: '¥40–120'
    },
    {
      phase: 3, capYuan: 200, label: '第三阶段 · 能投→能发',
      runs: ['P1-E4 N 消融', 'P1-E9 3×4 噪声', 'P3-E9 三组语料'],
      outcome: 'Geophysics/JGR 差异化实验',
      gate: 'Phase2 基础数字有希望',
      hoursGpu: '70–130',
      costRange: '¥100–200'
    }
  ],
  bufferNote:
    '原 1.5× buffer 对普通 DL 够用；FWI 项目须额外预留 **CFL/NaN 调试**（有时 > 正式实验工时）。' +
    'P1-F0b 花 ¥6–13 可避免 P1-E2 烧 ¥40+ 得全 NaN。',
  revisedTotals: {
    fullProject: {
      computeYuanRange: '¥470–850',
      withStorageBuffer: '¥650–950',
      oldEstimate: 634.5,
      verdict: '旧 ¥634.5 量级合理，但 P1 工时偏乐观；按 ¥1.88/h  reality 上浮约 25–40%'
    },
    minimal2Week: {
      computeYuanRange: '¥180–320',
      withBuffer: '¥280–450',
      oldEstimate: 218,
      verdict: '旧 ¥218 为乐观下限；未含 FWI 正演 ×10 向量化失败风险'
    }
  }
};

/* ════ 竞争格局 · 2026 同期竞品与数据集难度（2026-06-19 整合） ════ */
var COMPETITIVE_LANDSCAPE = {
  updated: '2026-06-19',
  verdict:
    'Paper 1 仍可行但须正面回应 Peng 2026（W₂ 已实现）并在 GeoFWI 更难基准 + 噪声轴上差异化；' +
    'Paper 2（GFS 走时决策）可行性最高；Paper 3 原「预训练迁移」叙事被 Feng 2026 严重削弱，须转向地质过程数据 vs 统计扩增。',
  directThreats: [
    {
      id: 'peng2026', litId: 47, arxiv: '2603.16393', team: 'SJTU (Peng & Jiang)',
      overlap: 'Paper 1 直接竞品：score-based prior + W₂ 数据一致性 + preconditioned guided diffusion',
      theirEdge: 'OpenFWI 上已跑通数值实验；同等算力下优于 DPS 与确定性优化',
      yourEdge: 'GeoFWI 更难（盐体/断层/11 级课程/GCI）；P1-E7 Pareto + P1-E9 三方噪声对比（文献空白）',
      mustDo: ['P1-E9 SNR 20/10/5 dB · GC-FWI vs DPS vs W₂', 'Related Work 正面比较 #47，禁回避 W₂', 'GeoFWI 上须超越 SGDS/原文 diffusion 基线']
    },
    {
      id: 'feng2026', litId: 48, arxiv: '2603.00377', team: 'UNC',
      overlap: 'Paper 3：大模型 + OpenFWI LDM 扩增 → Marmousi/Overthrust/SEG 等六基准 SOTA SSIM',
      theirEdge: '十亿参数 + 500 万+ 合成对；零样本/少样本 generalization 故事已占坑',
      yourEdge: 'GFS 评估地质结构质量；GeoFWI 地质过程生成 vs OpenFWI 统计扩增（P3-E9）— 文献未正面检验',
      mustDo: ['P3-E9 同架构双训练语料 ablation', '评估用 GFS_λ 非仅 CC/SSIM', 'Discussion 承认 Feng SSIM 优势，转打地质物理合理性']
    },
    {
      id: 'geofwi_paper', litId: 37, note: 'GeoFWI 原文已含 diffusion FWI (SGDS) 等 benchmark',
      implication: '「在 GeoFWI 上也做 diffusion」区分度不足；须证明 GC-FWI 课程+近端在 residual–GFS / 噪声 / 低频缺失上实质更优'
    }
  ],
  datasetGaps: [
    {
      id: 'noise_robustness',
      severity: 'critical',
      issue: '缺系统性 shot gather 加噪实验（SNR 20/10/5 dB）；Peng 2026 主打 amplitude imbalance / phase misalignment 鲁棒性',
      fix: 'P1-E9：3×4 矩阵 · band-limited 相干噪声 · 盐体子集 · CC/RMSE/GFS'
    },
    {
      id: 'low_frequency',
      severity: 'high',
      issue: 'FWI 顶刊常测 <5 Hz 低频缺失；课程学习理论上应帮助但未设计实验',
      fix: 'P1-E10：截断 <5 Hz · 对比有/无课程 + 有/无 W₂ · gate: P1-F0'
    },
    {
      id: 'marmousi_transfer_cliche',
      severity: 'high',
      issue: 'GeoFWI 原文已将 SGDS 用于 Marmousi/Overthrust；Feng 2026 再次覆盖 → Paper 3 零样本叙事区分度极低',
      fix: 'P3 主 claim 改为 P3-E9 训练语料 ablation，非「GeoFWI 预训练更好」'
    }
  ],
  feasibilityRevisions: [
    { experiment: 'P1-E7 residual–GFS Pareto', was: '优先#1', revised: '依然必要 · Peng 未做此分析维度', action: '保留 · 无额外训练' },
    { experiment: 'P1-E8 反向课程', was: '优先#3', revised: '可行但须重新定位', action: '与 Peng preconditioned guidance 同预算正面比 · 非仅顺序消融' },
    { experiment: 'P2-E8 GFS→Δt 决策', was: '优先#2', revised: 'Paper 2 唯一救命稻草 · 无替代', action: '维持 · 结果不显著则 Paper 2 难发顶刊' },
    { experiment: 'P3 零样本迁移', was: '主叙事', revised: 'Feng 2026 后基本不可行为主 claim', action: '降级为对照行 · 主叙事 → P3-E9 geo vs stat 训练数据' }
  ],
  strategicResponse: {
    p1: '【2026-06-29】改 benchmark 身份：GeoFWI 评测平台 + curriculum 有效性 + proximal 失效模式 + shot-gather gap — 不需补实验做赢 baseline',
    p2: '【2026-06-29】GFS 指标文已达刊标；P2-E7 + n=5000 + n=500 physics → Geophysics 投稿',
    p3: 'P3-E9：三组预训练 (GeoFWI / OpenFWI / OpenFWI+LDM) · N=10,50 · Marmousi2+SEG · GFS_λ 主指标'
  }
};

/* ════ P1 地基测试 · K=5 近端内层环隔离实验（无扩散训练） ════ */
var PROXIMAL_FOUNDATION_TEST = {
  id: 'P1-F0',
  title: '地基测试：Algorithm 1 内层 K=5 环（隔离）',
  updated: '2026-06-26',
  question:
    '固定步长 wave_residual 近端校正（K=5）：正式批次 37/55 improved、0/55 converged @ ε_proj=50 — Outcome B（成功率随复杂度下降）。',
  notRequired: ['扩散模型训练', '完整 49k 数据集', 'Table 1 数字', 'Wilcoxon/ECE'],
  required: ['可微 2D 声波正演 + autograd 梯度', 'GeoFWI 速度 + 11 级复杂度分层', '随机扰动模拟扩散中间态'],
  wslCmd:
    'cd /root/projects/bp-diff-fwi-complex\n' +
    'python scripts/run_proximal_isolation_test.py --smoke --device cuda\n' +
    '# 正式: --per-level 5 --device cuda --out paper1/analysis/results/proximal_isolation/summary_per5.json',
  output: 'paper1/analysis/results/proximal_isolation/summary.json',
  legacyOutput: 'analysis/results/proximal_isolation_K5.json',
  figure: 'paper1/analysis/results/proximal_isolation/curves_by_level.png',
  blocksUntilPass: ['P1-E4 全量课程训练', 'path2 真炮集 FWI 大规模重训'],
  f0Complete: true,
  f0WritingNote: '37/55 improved · 0/55 converged — 机制草证已写入 main.tex；proxy 定量 claims 已用 audited JSON',
  cflStability: {
    id: 'P1-F0b',
    title: 'CFL 稳定性门控（P1-E2 之前必做）',
    why: '波方程 CFL/梯度爆炸 → NaN；FWI 翻车调试 GPU 常超过正式实验。花 2–4h 可避免 P1-E2 烧 20–48h 得全 NaN。',
    cmd:
      'python3 scripts/run_p1_canonical_eval.py --cfl_smoke --device cuda --geo_types 5 --max_samples 5\n' +
      '# 或: python3 evaluate.py --cfl_smoke --device cuda',
    passCriteria: ['无 NaN/Inf', 'r_norm 有限', 'wall-time 可外推至 n=500'],
    budget: '2–4 GPU·h · ¥6–13 · Phase1 预算内'
  },
  parallelWith: ['Paper 2 合成扰动 / GFS（P2-E7）', 'P1-E7 residual–GFS Pareto（推断顺带 · 优先#1）'],
  outcomes: [
    {
      id: 'A',
      label: '多数样本 K 步内收敛',
      writing:
        'Outcome B confirmed: Remark 1 + P1-F0 empirical monitoring; no global convergence claims.',
      next: '接入采样环 · P1-E3 消融 · 再考虑 P1-E4'
    },
    {
      id: 'B',
      label: '简单结构收敛、盐体/强对比常失败',
      writing:
        '把「修正成功率 vs 地质复杂度」作为发现；11 级课程从训练技巧升级为针对已识别局限的解法。',
      next: '课程设计论文叙事补强 · 盐体分层报告 converged_pct'
    },
    {
      id: 'C',
      label: '连平层也常不收敛',
      writing:
        '算法需换：L-BFGS/线搜索、内层频率延拓、或软修正（DPS 式）——有文献先例的退路。',
      next: '试 alpha schedule / L-BFGS inner loop · 勿继续堆扩散 pipeline'
    }
  ],
  statusLabels: {
    converged: 'r_K ≤ ε_proj',
    improved_not_converged: '下降但未达标',
    oscillating: '部分下降后反弹',
    diverged: 'r_K > r_0',
    flat: '几乎无变化'
  },
  preliminary: {
    date: '2026-06-26',
    smoke: {
      n: 11,
      objective: 'wave_residual',
      converged: '0/11',
      improved: '11/11',
      source: 'paper1/analysis/results/proximal_isolation/summary.json'
    },
    formal: {
      n: 55,
      per_level: 5,
      nt: 300,
      n_sources: 8,
      objective: 'wave_residual',
      converged: '0/55',
      improved: '37/55 (67.3%)',
      diverged: 10,
      oscillating: 8,
      meanRelativeReductionByLevel: {
        '1': 0.446, '2': 0.482, '3': 0.165, '4': 0.126, '5': -0.103,
        '6': 0.240, '7': 0.219, '8': 0.045, '9': 0.115, '10': 0.038, '11': 0.077
      },
      improvedFracByLevel: {
        '1': 0.8, '2': 1.0, '3': 1.0, '4': 0.6, '5': 0.6,
        '6': 0.6, '7': 0.8, '8': 0.4, '9': 0.6, '10': 0.4, '11': 0.6
      },
      source: 'paper1/analysis/results/proximal_isolation/summary_per5.json',
      figure: 'paper1/analysis/results/proximal_isolation/curves_by_level_per5.png'
    },
    outcomeHint: 'Outcome B — 低 level 80–100% improved；level 8–11 降至 40–60%；0 converged',
    caveats: [
      'smoke 11/11 improved 不可作正式统计；写作用 summary_per5.json',
      '固定 α=1.0：10 diverged + 8 oscillating',
      '勿写 K 步硬流形收敛；Table 1 仍须真实 pred canonical'
    ]
  }
};

/* ════ 知识性审计（代码/文档对照 · 2026-06-19） ════ */
var KNOWLEDGE_AUDIT = {
  updated: '2026-06-19',
  summary:
    '独立知识审计：6 项盲区。最紧迫为近端公式符号——代码已用减号，顾问页/Playbook 曾写加号（已修）。' +
    'GCI R²/κ、GFS τ 策略、编码震源梯度方差仍待实验/Method 补全。E_mig Kirchhoff+NCC 公式已写入 PAPER2_PHYSICS_METRICS。',
  codeTruth: {
    proximalUpdate: 'v ← clip(v − α·coeff·∇_v J)  ·  geofwi_physics_core/proximal_bridge.py L131',
    w2Scope: 'W₂² 在 obs/syn shot gather 上逐道（最后一维=时间）· w2_guidance.py',
    gradPlaceholder: 'grad_fn 当前对 ||r_norm||² 或 l2_misfit 求导，与 hybrid_misfit 系数未完全链式一致',
    gfsTauDefault: 'gfs_wavelength 默认 per-sample GT p75 — 评估排名须改全局 τ',
    gciLevels: '30 类计数 → 11 级有序分类（compute_gci_and_curriculum_stages.py）；R²/κ 未计算'
  },
  items: [
    {
      id: 1, risk: 'high', title: '近端更新符号（加减号）',
      audit: '似然梯度应下降残差：减号，非加号。',
      codeStatus: 'fixed',
      codeRef: 'proximal_bridge.py L131 · w2_guidance.py L128 · bayesian_diffusion apply_after_denoise',
      docStatus: 'partial',
      docWas: 'config L689 / AGENT_LIT / DESIGN_PANORAMA 已修；PAPER1_RELATED_WORK.relatedWorkTex 已显式减号',
      action: '论文 Method 统一：v_{t−1} ← D_t(v_t) + α∇log p_t(v) − β∇||d−F(v)||²_{C_d}'
    },
    {
      id: 2, risk: 'medium', title: 'GCI 的 R² 与 Cohen κ 混用',
      audit: 'R² 为回归、κ 为分类一致性 — 不可无出处并列。',
      codeStatus: 'unverified',
      codeRef: 'compute_gci_and_curriculum_stages.py — 仅 30→11 映射，无 R²/κ',
      docStatus: 'fixed',
      docWas: 'R²=0.87, κ=0.81 叙事占位',
      action: '标 [TBD]；GCI 为有序 11 级 → 报 Weighted Cohen κ；或报与 |∇v| 代理的 R² 二选一'
    },
    {
      id: 3, risk: 'medium', title: 'W₂² 作用域与梯度链',
      audit: 'W₂ 须在 data space；梯度经伴随回传 ∂v。',
      codeStatus: 'partial',
      codeRef: 'w2_guidance.hybrid_misfit(obs,syn) 正确；grad_fn 未对 W₂ 反传',
      docStatus: 'pending',
      action: 'Method 写清 data-space OT + adjoint；或 P1 声明 hybrid 仅作步长系数'
    },
    {
      id: 4, risk: 'medium', title: 'GFS τ 全局 vs 分 geo_type',
      audit: 'Otsu/ROC 全局 τ；盐体与层状对比度不同，per-sample τ 破坏排名可比性。',
      codeStatus: 'needs_fix',
      codeRef: 'gfs_wavelength.py 默认 GT p75 per sample',
      docStatus: 'partial',
      action: 'P2-E：τ 敏感性 + select_tau_global()；Methods 写固定 τ 选取协议'
    },
    {
      id: 5, risk: 'medium', title: 'E_mig 与 Δt_first 定义',
      audit: 'E_mig 须给出 Kirchhoff ZO 偏移 + NCC 误差公式；Δt_first 须全测试集 top-20% 统计。',
      codeStatus: 'partial',
      codeRef: 'paper2_physics_metrics.py · emig_ncc_error · top_fraction_traveltime_test',
      docStatus: 'fixed',
      docWas: '仅 zero-offset stack 相对 L2，无 Kirchhoff/NCC 说明',
      action: 'Methods 粘贴 PAPER2_PHYSICS_METRICS；P2-E5/E8 跑全测试集 pipeline'
    },
    {
      id: 6, risk: 'medium', title: '编码震源梯度方差',
      audit: 'Φd 编码下梯度无偏但方差增大 — 需实验，非定性 claim。',
      codeStatus: 'missing_experiment',
      codeRef: 'simultaneous_source.py — 仅有 encode，无方差报告',
      docStatus: 'pending',
      action: 'P3：单炮 vs 超炮梯度方差 + CC/GFS_λ 影响'
    }
  ]
};

/* ════ Paper 2 独立物理标尺（Methods 粘贴块） ════ */
var PAPER2_PHYSICS_METRICS = {
  updated: '2026-06-19',
  delta_t_first: {
    name: '初至走时残差 Δt_first',
    latex:
      '\\Delta t_{\\mathrm{first}} = \\frac{1}{N_{tr}}\\sum_{s,r} \\left| t^{\\mathrm{pick}}_{\\mathrm{syn}}(s,r) - t^{\\mathrm{pick}}_{\\mathrm{obs}}(s,r) \\right|',
    definition:
      '对每炮每道：在合成/观测 gather 上用 envelope 峰值拾取初至 t_pick（STA/LTA 可选）；' +
      'Δt_first 为全部道对的平均绝对走时差（秒）。**P2-E5/E8**：在全测试集上按 CC/GFS 各取 top 20%，' +
      '比较两组 mean Δt_first — 禁 2–3 例 cherry-pick。',
    code: 'geofwi_physics_core.paper2_physics_metrics.delta_t_first_residual · top_fraction_traveltime_test'
  },
  E_mig: {
    name: '零偏移距 Kirchhoff 偏移成像误差 E_mig',
    latex:
      'I_{\\mathrm{mig}}(\\mathbf{v}) = \\mathcal{K}_{\\mathrm{ZO}}\\big[ F(\\mathbf{v}) \\big],\\quad ' +
      'E_{\\mathrm{mig}} = 1 - \\mathrm{NCC}\\big( \\mathcal{N}(I_{\\mathrm{mig}}^{\\mathrm{syn}}), \\mathcal{N}(I_{\\mathrm{mig}}^{\\mathrm{obs}}) \\big)',
    definition:
      'I_mig：对速度 v 正演炮集 F(v) 做**简化 Kirchhoff 零偏移距偏移**（当前实现：ZO 叠加 + 走时加权 diffraction stack 代理；' +
      'Supplement 可换完整 Kirchhoff）。偏移剖面逐道 RMS 归一化 𝒩(·) 后，E_mig 定义为 1 减归一化互相关 NCC∈[-1,1]。' +
      '若提供 reflectivity GT R(x,z)，可改为 NCC(I_mig(v̂), I_mig(v))。不依赖清晰地质界面。',
    code: 'geofwi_physics_core.paper2_physics_metrics.emig_ncc_error',
    amplitudeNorm: '逐道 RMS 归一化后再 NCC；禁未声明的振幅缩放',
    note: 'migration_wavefield_error(mode=stack) 为 legacy 相对 L2；主文用 emig_ncc_error'
  }
};

/* ════ Paper 1 写作状态（路径一 · 诊断性定稿 · 2026-06-27） ════ */
var PAPER1_WRITING_STATUS = {
  updated: '2026-06-17',
  phase: 'benchmark_submit_prep',
  narrative: 'benchmark + diagnostic analysis; NOT method SOTA',
  venueHint: 'Computers & Geosciences (JCR Q1) · IEEE TGRS / IEEE TCI',
  venuePrimary: 'Computers & Geosciences',
  venueSecondary: ['IEEE TGRS', 'IEEE TCI', 'ML4PS workshop'],
  submissionStrategy: 'SUBMISSION_STRATEGY.papers.p1',
  codeRoot: 'E:\\个人项目',
  wslRoot: '/root/projects/bp-diff-fwi-complex',
  manuscript: 'paper1/manuscript/main.tex',
  statusDoc: 'E:\\个人项目\\20260627 Paper1路径一定稿状态.md',
  snapshot: 'paper1/experiments/RESULTS_SNAPSHOT_20260627.md',
  nearTermPlan: 'paper1/experiments/NEAR_TERM_PLAN.md',
  syncScript: 'patches/wsl/apply_paper1_path1_sync.py',
  completed: [
    { id: 'path1_narrative', status: 'done', note: 'honest negative proxy results; tbl:evidence_map; diagnostic Conclusion' },
    { id: 'table1_proxy', status: 'done', note: 'GC-FWI + U-Net + PINN; Wilcoxon p≈0 baselines win' },
    { id: 'p1_f0', status: 'done', note: '37/55 improved; 0/55 converged' },
    { id: 'pilot_150', status: 'done', note: 'CC=0.591; tbl:shotgather_pilot only' },
    { id: 'path_b_negative', status: 'done', note: 'fine-tune CC=0.391; tbl:shotgather_finetune' },
    { id: 'figures_panels', status: 'done', note: 'fig_proxy_pilot_panels.pdf' },
    { id: 'niche_fig', status: 'done', note: 'fig_p1_niche_subgroup_summary · L10 win rate 0.35' },
    { id: 'ablation_no_proximal', status: 'done', note: 'tbl:ablation CC 0.763' },
    { id: 'shotgather_unet_minimal', status: 'done', note: 'tbl:shotgather_minimal CC 0.621' },
    { id: 'metrics_audit', status: 'done', note: 'METRICS_AUDIT.md + registry JSON' },
    { id: 'supp_s1_s2', status: 'done', note: 'SUPPLEMENTARY_S1/S2 + REPRODUCE.md · tex §Code' },
    { id: 'ablation_smoke', status: 'done', note: 'run_p1_ablation_smoke.sh; not for main table' }
  ],
  pending: [
    { id: 'bootstrap_ci', note: 'deferred' },
    { id: 'physics_score_fix', note: 'canonical gate all 0 · Limitations only' }
  ],
  proxyTable1: {
    gc_fwi_test: { cc: 0.8588, ssim: 0.7729, rmse_m_s: 508.8, gfs: 0.3441 },
    unet_test: { cc: 0.9164, ssim: 0.8562, rmse_m_s: 398.5, gfs: 0.5800 },
    pinn_test: { cc: 0.8962, ssim: 0.8394, rmse_m_s: 422.1, gfs: 0.5390 },
    finding: 'baselines significantly outperform GC-FWI (Wilcoxon Bonferroni p<1e-15)'
  },
  shotgather: {
    pilot: { n: 150, cc: 0.5914, note: 'zero-shot; domain gap' },
    pathB: { test_cc: 0.3906, note: 'fine-tune failed; worse than pilot' }
  },
  paper2Separation: 'Paper 2 denoising CC≈0.99 must NOT enter Paper 1 Table 1',
  writingOrder: [
    '通读 paper1/manuscript/main.pdf + tbl:evidence_map',
    'Abstract/Limitations/Applications 润色（ARS 批量 — 多数已 apply）',
    '终稿核对：JSON 数字 ↔ Table 1 ↔ Abstract',
    'Discussion：37/55 · K0 p=1.0 · w/o both 非加性 · niche 无 win-rate',
    'deferred：bootstrap CI · wall-clock · N-stage ablation',
    '选刊压缩：C&G 主投 · IEEE TGRS 备选'
  ],
  manuscriptDraft: {
    tex: 'paper1/manuscript/main.tex',
    pdf: 'paper1/manuscript/main.pdf',
    statusReport: '20260627 Paper1路径一定稿状态.md',
    experimentLog: 'paper1/EXPERIMENT_LOG.md',
    nearTermPlan: 'paper1/experiments/NEAR_TERM_PLAN.md'
  },
  discipline:
    '主数字：metrics_canonical_*_proxy.json + p1_wilcoxon_proxy.json。' +
    'GC-FWI 未赢 U-Net/PINN — 必须写进 Abstract/Conclusion。' +
    'pilot/Path B 不进 Table 1。Paper 2 CC≈0.99 禁止混入。' +
    'physics_score 全 0 已省略。venue：诊断/框架 — 非 Geophysics 现场 SOTA。',
  sessionLog: 'paper1/drafts/CODEX_WRITING_SESSION.md',
  arsBootstrapPrompt:
    CODEX_WRITING_SESSION_PROTOCOL + '\n\n' +
    '---\n\n' +
    '我是 Paper 1（路径一 · 诊断性框架稿）作者。日志：`paper1/drafts/CODEX_WRITING_SESSION.md` · tex：`paper1/manuscript/main.tex`。\n\n' +
    '【写作纪律】数字不得改；勿声称 GC-FWI SOTA；基线 U-Net/PINN 显著更好必须保留；' +
    'pilot CC=0.591 与 Path B CC=0.391 为独立诊断表；任务=velocity-proxy 非炮集 FWI。\n\n' +
    '若日志已存在 → 先读 RUNNING_STATE 续写；若不存在 → 初始化 RUNNING_STATE。\n' +
    'Conclusion/Limitations/Abstract 诊断版已 apply；优先终稿数字核对与 venue 压缩。'
};

/* Paper 1 · ARS/Codex 粘贴块（网页无法读 tex 路径，关键段落嵌在此处） */
var PAPER1_ARS_SNIPPETS = {
  evidenceMapNote:
    '贡献须按 tbl:evidence_map 分层：proxy 主表 = 完整可复现基准（负面：扩散+物理未赢编码器）；' +
    'P1-F0 = 近端机制草证（37/55 improved，0/55 converged）；' +
    'pilot = domain gap；Path B = 当前 shot-gather 工程走不通。' +
    '价值 = 诚实基准 + 路线图 — 非「方法 SOTA」。',
  proxyTable1: [
    'Method   | test CC | test SSIM | test RMSE (m/s) | test GFS',
    'GC-FWI   | 0.859   | 0.773     | 509             | 0.344',
    'U-Net    | 0.916   | 0.856     | 399             | 0.580   ← CC/GFS 均领先',
    'PINN     | 0.896   | 0.839     | 422             | 0.539',
    'Wilcoxon Bonferroni p<1e-15 · 方向 favor baselines',
    '(GeoFWI velocity-proxy · 50ep full train · source: metrics_canonical_*_proxy.json)'
  ].join('\n'),
  shotgatherNote:
    'tbl:shotgather_pilot: n=150 zero-shot CC=0.591（proxy test 0.859）— domain gap 显著，不进 Table 1。\n' +
    'tbl:shotgather_finetune: Path B fine-tune test CC=0.391 < zero-shot — 工程方案负面结果。',
  conclusionSkeleton:
    '四段结构：(1) 已建立什么 — proxy 基准 + 三方法 + Wilcoxon；(2) 不能声称什么 — SOTA/端到端物理合规；' +
    '(3) 正面机制证据 — P1-F0 37/55 · w/o proximal 0.763 · w/o curriculum 0.814；(4) 下一步 — shot encoder · Zenodo · deferred λ_p/UQ。',
  prompts: {
    abstract: function() {
      return '【任务】重写 Paper 1 Abstract（≤250词，纯文本，无公式无引用）。\n\n' +
        '【纪律】必须诚实写 GC-FWI 在 proxy 上低于 U-Net/PINN；贡献=框架+诊断+路线图。\n\n' +
        '【证据地图】\n' + PAPER1_ARS_SNIPPETS.evidenceMapNote + '\n\n' +
        '【Table 1 proxy】\n' + PAPER1_ARS_SNIPPETS.proxyTable1 + '\n\n' +
        '【P1-F0】37/55 improved · 0/55 converged @ K=5\n\n' +
        '请给出英文 Abstract + 中文修改说明。';
    },
    conclusion: function() {
      return '【任务】润色 Paper 1 Conclusion（英文，C&G/TGRS 简洁风格）。\n\n' +
        '【四段骨架】\n' + PAPER1_ARS_SNIPPETS.conclusionSkeleton + '\n\n' +
        '【shot-gather 诊断】\n' + PAPER1_ARS_SNIPPETS.shotgatherNote + '\n\n' +
        '请给出 rewrite + 简要说明（中文）。';
    },
    limitations: function() {
      return '【任务】润色 Paper 1 Limitations（英文 LaTeX，C&G/TGRS 简洁风格）。\n\n' +
        '保持三段结构：\\noindent\\textbf{Task and accuracy bounds} / Mechanism / Shot-gather。\n' +
        '必含锁定数字：proxy CC 0.859 vs U-Net 0.916/PINN 0.896 · P1-F0 37/55·0/55 · pilot 0.591 · Path B 0.391 · w/o proximal 0.763 · physics_score=0。\n\n' +
        '请给出 LaTeX-ready rewrite（保留 \\subsection{Limitations and Scope} 与 marker % P1-LIMITATIONS-COMPRESSED）+ 中文修改说明。';
    },
    applications: function() {
      return '【任务】润色 Paper 1 Applications 小节（英文 LaTeX）。\n\n' +
        '纪律：benchmark 诊断叙事 — 勿夸大 field deployment；proxy 上 U-Net/PINN 显著更好须保留；' +
        'theoretical framing 与 practical applications 分开；开放项指向 \\S\\ref{sec:future_shotgather_fwi}。\n\n' +
        '请给出 LaTeX-ready rewrite（\\section{Applications} + \\subsection{Practical Applications...}）+ 中文修改说明。';
    },
    figures: function() {
      return '【任务】Paper 1 主图 path-1（5 张）— 见 paper1/drafts/CODEX_FIGURES_PROMPT.md 全文。\n\n' +
        '优先 F1 pipeline schematic + F2 proxy metrics bars（JSON 驱动）。禁 gc_fwi_professional.py 合成 batch。\n\n' +
        'JSON: metrics_canonical_test5000.json · unet/pinn *_proxy.json · 输出 paper1/manuscript/Fig/';
    },
    full: function() {
      return (typeof buildCodexProjectPrompt === 'function')
        ? buildCodexProjectPrompt('p1', 'full')
        : codexResumePrompt('p1');
    },
    resume: function() {
      return typeof codexResumePrompt === 'function' ? codexResumePrompt('p1') : '';
    }
  }
};

/* ════ Paper 2 写作状态（叙事修订完成 · 2026-06-26） ════ */
var PAPER2_WRITING_STATUS = {
  updated: '2026-06-17',
  phase: 'geophysics_submit_prep',
  venue: 'Geophysics',
  venuePrimary: 'Geophysics (JCR Q1 · SEG)',
  venueBackupJcr2: ['Journal of Applied Geophysics', 'Exploration Geophysics', 'Natural Resources Research'],
  submissionStrategy: 'SUBMISSION_STRATEGY.papers.p2',
  codeRoot: 'E:\\个人项目\\paper2',
  wslRoot: '/root/projects/bp-diff-fwi-complex/paper2',
  resultsDir: 'paper2/analysis/results/p2_e2_geofwi/',
  narrativeJson: 'paper2/analysis/results/narrative_supplements.json',
  statusCmd: 'bash /root/projects/bp-diff-fwi-complex/scripts/paper2_status.sh',
  narrativeCmd: 'cd paper2 && python3 scripts/run_full_narrative.py',
  completed: [
    { id: 'P2-E2', status: 'done', note: 'n=5000×7 · Table 2 + Mann–Whitney 脚注 + 附录逐对表' },
    { id: 'P2-E7', status: 'done', note: '合成 blur + 扩展 sweep · Introduction 主图' },
    { id: 'P2-E3', status: 'done', note: '5 paradox 个案 + fig_paradox_panels_all.png' },
    { id: 'P2-E4', status: 'done', note: 'ρ=0.023 p=0.11 · Discussion 改为 at most weakly coupled' },
    { id: 'P2-E6', status: 'done', note: '四桶 τ 三位小数 · fault 独立段 + 表' },
    { id: 'P2-BP2004', status: 'done', note: 'Appendix A · 主文仅交叉引用' },
    { id: 'P2-E5/E8', status: 'done', note: 'n=200 机制：252 m/s 速度差 + Emig smoke + ρ(CC,Δt)≈0.82' },
    { id: 'tau_sensitivity', status: 'done', note: 'official val · fig+tab · tau~181' },
    { id: 'intro', status: 'done', note: '压缩为 2 段 · fault stratum 预告' },
    { id: 'compliance', status: 'done', note: 'Code/Data Availability · Li2026 正标题 · Abstract 行动建议' },
    { id: 'abstract_plain', status: 'done', note: 'Geophysics ≤250w plain text · apply_p2_geophysics_plain_abstract.py · 2026-06-17' },
    { id: 'manuscript', status: 'draft', note: 'tex ~19pp PDF · 实验闭环 · 差作者单位/GitHub 终链' }
  ],
  pending: [
    { id: '作者/单位', note: 'tex \\author / \\affiliation 待填' },
    { id: 'GitHub/Zenodo', note: 'Code availability 占位 · 投稿前注册 DOI' },
    { id: 'Highlights', note: 'paper2_highlights.txt ≤85 字符/条 · C&G 系统核对' },
    { id: '全量 physics', note: 'n=5000×7 仅审稿强要求时' }
  ],
  table2Inversion: {
    ccLeader: { method: 'gc_fwi', mean_cc: 0.9885, mean_gfs: 0.6042 },
    gfsLeader: { method: 'gc_fwi', mean_cc: 0.9885, mean_gfs: 0.6042 },
    gfsGapPct: 0,
    source: 'p2_e2_geofwi/p2_e2_geofwi_manifest.json',
    writingNote: 'Unified official-val tau~181: gc_fwi leads CC and GFS'
  },
  e5Mechanism: {
    source: 'narrative_supplements.json → top20_crossstats + physics_n200 metrics',
    cc_top_velocity: 2592,
    gfs_top_velocity: 2207,
    velocity_diff_m_s: -385,
    overlap_n: 9,
    overlap_of: 40,
    spearman_cc_neg_dt: 0.82,
    emig_smoke: { all: 0.312, cc_top: 0.228, gfs_top: 0.363 },
    gfs_better: false,
    writingNote: 'bulk kinematic vs interface geometry · official val tau'
  },
  tauSensitivity: {
    source: 'narrative_supplements.json → tau_method_grid',
    primary: { p: 75, tau: 180.0, leader: 'gc_fwi' },
    unet_beats_gc_fwi_all_percentiles: false,
    writingNote: 'p75 gc_fwi leader (tau~180.0); official val'
  },
  e7: {
    source: 'analysis/results/p2_e7/p2_e7_synthetic_perturb.json',
    translate: { cc: 0.840, gfs: 0.358, ssim: 0.618, note: '刚性平移' },
    blur_paradox: { cc: 0.965, gfs: 0.375, ssim: 0.929, note: 'Introduction 核心 paradox' },
    figure: 'analysis/results/p2_e7/fig_synthetic_perturb.png',
    extended: [
      { perturb: 'blur σ=10', cc: 0.865, gfs: 0.263 },
      { perturb: 'translate 15px', cc: 0.536, gfs: 0.336 }
    ]
  },
  e2: {
    source: 'analysis/results/p2_e2_geofwi/p2_e2_geofwi_manifest.json',
    n: 5000,
    tau: 180.005,
    gc_fwi: { mean_cc: 0.9885, mean_gfs: 0.6042 },
    unet: { mean_cc: 0.986, mean_gfs: 0.5542 },
    e4_spearman: 0.0227,
    e4_p: 0.109,
    task: 'velocity_denoising_reconstruction（非炮集 FWI）'
  },
  writingOrder: [
    '通读 paper2_manuscript_draft.pdf（~19pp）· 对照 review fixes 2026-06-28',
    '填作者单位 · GitHub/Zenodo 终链替换 Code availability 占位',
    'C&G Highlights/Keywords 系统提交',
    '可选：Discussion 再压缩 · Overfull hbox 换行'
  ],
  manuscriptDraft: {
    tex: 'paper2/drafts/paper2_manuscript_draft.tex',
    pdf: 'paper2/drafts/paper2_manuscript_draft.pdf',
    highlights: 'paper2/drafts/paper2_highlights.txt',
    narrativeGuide: 'paper2/drafts/NARRATIVE_REVISION_GUIDE.md',
    alignment: 'paper2/drafts/ALIGNMENT_NOTE.md',
    experimentLog: 'paper2/EXPERIMENT_LOG.md',
    checklist: 'paper2/RECOVERY_CHECKLIST.md',
    statusReport: '20260626 Paper2当前详细情况.md'
  },
  discipline:
    '主数字：EXPERIMENT_LOG.md + narrative_supplements.json。叙事修订已入 tex。' +
    '勿用 demo ρ≈0.67。E5 gfs_better=false=适用边界，非 GFS 失效。' +
    'τ p50–60 时 gc_fwi GFS 可高于 unet。任务=velocity-denoising。',
  sessionLog: 'paper2/drafts/CODEX_WRITING_SESSION.md',
  arsBootstrapPrompt:
    CODEX_WRITING_SESSION_PROTOCOL + '\n\n' +
    '---\n\n' +
    '我是 Paper 2（Computers & Geosciences）作者。日志：`paper2/drafts/CODEX_WRITING_SESSION.md` · tex：`paper2/drafts/paper2_manuscript_draft.tex`。\n\n' +
    '【写作纪律】数字不得改；勿新增文献/实验；任务=velocity-denoising 非炮集 FWI。\n\n' +
    '若日志已存在 → 先读 RUNNING_STATE 续写；若不存在 → 初始化（pending: Intro §2 压缩, Discussion §2–3, 作者单位, Highlights）。\n' +
    '实验已闭环；勿再跑 GPU。'
};

/* ════ Paper 3 写作状态（Phase C · 锚 JCR Q1 · 2026-06-17） ════ */
var PAPER3_WRITING_STATUS = {
  updated: '2026-06-17',
  phase: 'gpu_and_manuscript_required',
  venuePrimary: 'JGR: Machine Learning and Computation (JCR Q1 · AGU)',
  venueAnchor: ['IEEE TGRS', 'Geophysics (Letter)'],
  venueBackup: ['Computers & Geosciences', 'Geophysical Journal International'],
  submissionStrategy: 'SUBMISSION_STRATEGY.papers.p3',
  codeRoot: 'E:\\个人项目\\paper3',
  wslRoot: '/root/projects/bp-diff-fwi-complex/paper3',
  publishabilityDoc: 'paper3/experiments/P3_PUBLISHABILITY_ASSESSMENT.md',
  experimentMatrix: 'paper3/experiments/P3_EXPERIMENT_MATRIX.md',
  gate: 'OpenFWI FlatVel-A 真 B/C 预训练完成前禁止写定 Intro 主 claim',
  cloudPlan: { platform: 'AutoDL 4090', rateYuanPerDay: 42, gpuDays: '7–12' },
  completed: [
    { id: 'P3-E1', status: 'done', note: '目标域预处理 + baseline 指标' },
    { id: 'P3-E9-plan', status: 'done', note: 'A/B/C 矩阵协议 · surrogate 冒烟已跑' },
    { id: 'scheme_b', status: 'done', note: 'VMB/RTM-conditioned · 与 Feng 叙事区分' },
  ],
  pending: [
    { id: 'OpenFWI-BC', note: '真预训练 corpus B + C · AutoDL 数据盘 ~43GB' },
    { id: 'P3-E9-rerun', note: 'B/C 24 cells × 3 seeds 重跑' },
    { id: 'P3-E8-fig', note: 'MMD 机制图（略高加分）' },
    { id: 'main.tex', note: '全稿 Intro–Limitations' },
    { id: 'P1-P2-xref', note: '三篇关系段 · GFS_λ 引用 P2' },
  ],
};

/* Paper 2 · ARS 粘贴块（网页无法读 tex 路径，全文嵌在此处） */
var PAPER2_ARS_SNIPPETS = {
  rankingInversionNote:
    '「颠倒动机」≠ 表格行顺序反转。含义是：在 n=5000 GeoFWI denoising 上，' +
    '按 CC 排名的冠军（gc_fwi，mean CC=0.988）与按 GFS 排名的冠军（unet，mean GFS=0.630）' +
    '不是同一方法——像素最优 ≠ 结构最优。相对 GFS 差距约 12%。这是真实多方法对比，比 E7 合成实验更有说服力。',
  table2: [
    'Method          | mean CC | mean GFS',
    'gc_fwi          | 0.988   | 0.562   ← CC 最高，GFS 仅第 5',
    'pinn            | 0.987   | 0.618',
    'unet            | 0.986   | 0.630   ← GFS 最高',
    'gc_fwi_rin      | 0.983   | 0.496',
    'lstm            | 0.979   | 0.614',
    'gc_fwi_transformer | 0.977 | 0.488',
    'transformer     | 0.967   | 0.598',
    '(n=5000, τ≈473, source: p2_e2_geofwi_manifest.json)'
  ].join('\n'),
  introPara2:
    'Unfortunately, all three metrics treat every pixel equally and remain insensitive to the geological ' +
    'structure that endows an inverted model with interpretative value. A simple low-pass blur of a salt-body ' +
    'model, for instance, can retain a CC well above 0.95 while completely erasing the sharp velocity contrast ' +
    'that defines the salt flank. SSIM, although perceptually motivated, is largely governed by local luminance ' +
    'and contrast statistics that are indifferent to the geometry of a velocity anomaly. RMSE, despite its ' +
    'sensitivity to large-scale misplacements, is dominated by the high-velocity contrasts typical of salt ' +
    'provinces, thereby masking the mislocation of the salt body itself. This "metric paradox"—in which an ' +
    'obviously unphysical model receives a favourable rank—is widely acknowledged in image-quality assessment ' +
    'but has drawn little systematic attention in solid-Earth velocity-model benchmarking. A striking ' +
    'manifestation emerges in our multi-method comparison (Table 2): the model that delivers the highest mean ' +
    'CC does not coincide with the one that achieves the highest mean GFS, illustrating that pixel-optimal ' +
    'fidelity can diverge considerably from structural quality.',
  discussionPara2:
    'E7 and E3 reveal a unified failure mode: boundary smoothing (Gaussian blur, or denoising in real predictions) preserves CC by retaining bulk sediment correlation but collapses GFS through interface IoU loss. CC drops only from 0.965 (σ=2) to 0.865 (σ=10), whereas GFS decays monotonically (0.375→0.263). Rigid misplacement reduces CC more sharply yet leaves GFS near 0.35–0.36, so CC ranks blurred models above translated ones while GFS penalises both—the intended structure-first behaviour. Real paradox cases (CC≳0.995, GFS≪0.5) mirror the E7-blur difference-panel pattern.',
  discussionPara3:
    'CC and GFS carry largely independent rank information at denoising saturation: Spearman ρ=0.023 (p=0.11; n=5000, gc_fwi) is weak and non-significant, so we do not claim strict orthogonality, but the near-zero ρ combined with large per-sample disagreements (E3, Table 2) supports treating GFS as a complement to CC. Geo-type stratification (P2-E6) further shows weaker CC–GFS coupling in salt and complex buckets, where interface errors are most interpretatively critical.',
  abstractPlainGeophysics:
    'Pixel-level metrics such as correlation coefficient (CC), structural similarity index (SSIM), and root-mean-square error (RMSE) remain the default rulers for judging velocity models from seismic inversion and learning-based reconstruction. In salt-prone settings, these scores can stay high when geological interfaces are smeared or mislocated. We introduce the Geological Fidelity Score (GFS), a structure-based co-pilot that quantifies interface overlap and gradient-direction consistency on geologically meaningful pixels, without replacing CC in general ranking.\n\n' +
    'A controlled blur-and-translate experiment on a salt-body reference illustrates the metric paradox: blurring yields CC about 0.97 and SSIM about 0.93 but GFS about 0.38, whereas rigid translation lowers CC to about 0.84 with comparable GFS about 0.36. On GeoFWI velocity-denoising (n=5000), CC and GFS are at most weakly coupled (Spearman rho about 0.02, p=0.11); salt-dominated samples can show CC above 0.99 with much lower GFS.\n\n' +
    'Physics validation (n=500) shows GFS-top models do not minimize first-arrival traveltime residuals versus CC-top models under denoising. We release open-source code and recommend GFS to flag high-CC, low-GFS outliers in salt-prone and fault-dominated cases as a structure QC complement, not a substitute for volumetric metrics when traveltime fidelity alone defines success.',
  prompts: {
    abstractPlain: function() {
      return '【任务】Geophysics 投稿 Abstract 终检（已写入 tex 的纯文字版）。\n\n' +
        '【纪律】≤250 词 · 无 $ 公式 · 无 \\cite · 无 Sec.\\ref · 数字不得改。\n\n' +
        '【当前纯文字 Abstract】\n' + PAPER2_ARS_SNIPPETS.abstractPlainGeophysics + '\n\n' +
        '请检查：字数、Geophysics 格式合规、与 Highlights/E7/n=5000 数字一致；给出微调建议（若有）+ 中文说明。';
    },
    intro2: function() {
      return '【任务】润色 Paper 2 Introduction 第二段（C&G 风格，英文）。保持所有论点；可加入一句预告 Table 2 排名颠倒（gc_fwi CC 最高 vs unet GFS 最高），但数字仅在下表出现一次即可。\n\n' +
        '【颠倒动机说明】\n' + PAPER2_ARS_SNIPPETS.rankingInversionNote + '\n\n' +
        '【Table 2】\n' + PAPER2_ARS_SNIPPETS.table2 + '\n\n' +
        '【Introduction 第二段 · 原文】\n' + PAPER2_ARS_SNIPPETS.introPara2 + '\n\n' +
        '请给出 rewrite 版本 + 简要修改说明（中文）。';
    },
    discussionCompress: function() {
      return '【任务】压缩 Paper 2 Discussion 第二段与第三段为更紧凑的各一段（英文）。数字与结论不得改；勿删 Table 2 / E7 / E3 / ρ=0.023 p=0.11 要点。\n\n' +
        '【Discussion 第二段 · 原文（blur 串联 E7+E3）】\n' + PAPER2_ARS_SNIPPETS.discussionPara2 + '\n\n' +
        '【Discussion 第三段 · 原文（E4 弱相关）】\n' + PAPER2_ARS_SNIPPETS.discussionPara3 + '\n\n' +
        '请给出合并压缩后的两段英文 + 字数对比。';
    },
    full: function() {
      return (typeof buildCodexProjectPrompt === 'function')
        ? buildCodexProjectPrompt('p2', 'full')
        : codexResumePrompt('p2');
    },
    resume: function() {
      return typeof codexResumePrompt === 'function' ? codexResumePrompt('p2') : '';
    }
  }
};

/* WSL 磁盘实测（velocity-denoising 代理，不可写入论文 Table 1） */
var WSL_DISK_METRICS = {
  source: 'analysis/results/baseline_metrics.json',
  date: '2025-11-09',
  task: 'degraded velocity → reconstructed velocity (NOT seismic FWI)',
  models: {
    unet: { cc: 0.998, ssim: 0.998, rmse_m_s: 34.4, physics: 0.69 },
    lstm: { cc: 0.998, ssim: 0.998, rmse_m_s: 35.4, physics: 0.74 },
    transformer: { cc: 0.998, ssim: 0.998, rmse_m_s: 40.7, physics: 0.71 },
    gc_fwi: { cc: 0.998, ssim: 0.998, rmse_m_s: 35.7, physics: 0.72 }
  }
};

/* ════ 指标对比基线数据 ════
   verified: 'published' = 文献报告 · 'unverified' = 论文占位/未跑 · 'wsl_disk' = 磁盘 JSON（任务可能不对）
*/
var METRICS_DATA = [
  {method:'InversionNet (#11)',      dataset:'OpenFWI Flat',   cc:'0.89',ssim:'0.82',rmse:'0.18',physics:'无',verified:'published',note:'文献值；GeoFWI 不可直接对比'},
  {method:'VelocityGAN (#15)',       dataset:'OpenFWI CurveVel',cc:'0.85',ssim:'0.79',rmse:'0.21',physics:'无',verified:'published',note:'文献值'},
  {method:'PINN-FWI (#14)',          dataset:'Marmousi2 子集', cc:'0.71',ssim:'0.68',rmse:'0.34',physics:'软约束',verified:'published',note:'文献值'},
  {method:'Physics-guided+UQ (#13)',dataset:'合成数据',        cc:'0.76',ssim:'0.72',rmse:'0.28',physics:'软约束+不确定性',verified:'published',note:'文献值'},
  {method:'Smart FWI (#16)',         dataset:'Marmousi2',      cc:'0.83',ssim:'0.78',rmse:'0.23',physics:'混合',verified:'published',note:'文献值'},
  {method:'2D CNN (Wu 2021, #2)',    dataset:'SEAM Phase I',   cc:'—',   ssim:'—',   rmse:'MSE 0.09',physics:'弱监督',verified:'published',note:'单位不同'},
  {method:'GC-FWI (yours)',          dataset:'GeoFWI proxy',     cc:'0.859',ssim:'0.773',rmse:'509 m/s',physics:'Proximal',verified:'audited',
   note:'test5000 · Wilcoxon p≈0 · U-Net/PINN 更好 · 非 shot-gather FWI · METRICS_AUDIT 2026-06-27'},
  {method:'U-Net proxy baseline',    dataset:'GeoFWI proxy',     cc:'0.916',ssim:'0.856',rmse:'399 m/s',physics:'无',verified:'audited',
   note:'Table 1 baseline · metrics_canonical_unet_test5000_proxy.json'},
  {method:'PINN proxy baseline',     dataset:'GeoFWI proxy',     cc:'0.896',ssim:'0.839',rmse:'422 m/s',physics:'软约束',verified:'audited',
   note:'Table 1 baseline · metrics_canonical_pinn_test5000_proxy.json'},
  {method:'WSL disk · UNet surrogate', dataset:'GeoFWI denoise', cc:'0.998',ssim:'0.998',rmse:'34 m/s',physics:'0.69',verified:'wsl_disk',
   note:'velocity-denoising 代理 · 非 FWI · 不可写入 Table 1'},
];
METRICS_DATA = METRICS_DATA.concat([
  {method:'FCN (Yang & Ma 2019, #21)', dataset:'OpenFWI系列',    cc:'0.87',ssim:'0.81',rmse:'0.19',physics:'无',verified:'published',note:'文献值'},
  {method:'E2E-FWI (#19)',             dataset:'SEAM Phase I',   cc:'0.80',ssim:'0.74',rmse:'0.26',physics:'无',verified:'published',note:'文献值'},
  {method:'1D CNN (Das et al. #30)',   dataset:'合成测井约束',    cc:'—',   ssim:'—',   rmse:'MSE类',physics:'无',verified:'published',note:'单位不同'},
  {method:'Closed-loop CNN (#24)',     dataset:'合成数据',        cc:'—',   ssim:'—',   rmse:'自监督',physics:'循环一致性',verified:'published',note:'文献值'},
]);
METRICS_DATA = METRICS_DATA.concat([
  {method:'DiffusionFWI (#34)',       dataset:'OpenFWI CurveVel', cc:'0.84',ssim:'0.74',rmse:'0.23',physics:'无约束扩散',verified:'published',note:'文献值'},
  {method:'SeisFusion (#33)',          dataset:'地震数据插值',     cc:'—',   ssim:'—',   rmse:'—',   physics:'classifier guidance', verified:'published', note:'非 FWI 直接对比'},
  {method:'Curriculum FWI (#35)',      dataset:'Marmousi系列',    cc:'0.79',ssim:'0.73',rmse:'0.24',physics:'无',verified:'published',note:'文献值'},
  {method:'Bayesian VAE (#36)',        dataset:'合成数据',         cc:'—',   ssim:'—',   rmse:'UQ方向',physics:'后验采样', verified:'published', note:'UQ 方向'},
  {method:'OpenFWI best (InvNet)',    dataset:'OpenFWI Flat-A',   cc:'0.92',ssim:'0.88',rmse:'0.14',physics:'无',verified:'published',note:'OpenFWI 上限'},
]);

/* ════ 引用建议列表 ════ */
var CITATION_SUGGESTIONS = {
  p1: [
    {must:true,  ref:'Tarantola 1984, Geophysics 49:1259', why:'FWI奠基论文，必引'},
    {must:true,  ref:'Virieux & Operto 2009, Geophysics 74:WCC1', why:'FWI综述，必引'},
    {must:true,  ref:'InversionNet, Wu et al. 2020, IEEE TCI 6:419', why:'主要DL-FWI基线，必引'},
    {must:true,  ref:'Yang & Ma 2019, Geophysics 84:R583 [FCN #21]', why:'DL速度建模方向代表'},
    {must:true,  ref:'Song et al. 2023, IEEE TGRS [PINN-FWI #14]', why:'主要软约束对比基线'},
    {must:true,  ref:'Sun & Demanet 2020, Geophysics 85:R275 [Smart FWI #16]', why:'物理+DL混合，必须详细区分'},
    {must:false, ref:'VelocityGAN, Zhang et al. 2019 [#15]', why:'GAN解决模糊问题，Related Work'},
    {must:false, ref:'Zhang et al. 2021, Geophysics [Physics-guided+UQ #13]', why:'不确定性分解方法参考'},
    {must:false, ref:'Fang et al. 2020, Geophysics A37 (上传PDF)', why:'低频恢复CNN，方法参考'},
  ],
  p2: [
    {must:true,  ref:'Wu et al. 2021, Geophysics R735 (上传PDF)', why:'初始模型约束策略参考'},
    {must:true,  ref:'InversionNet [#11]', why:'基线方法CC/SSIM数字来源'},
    {must:true,  ref:'Frontiers Attention U-Net [#18]', why:'结构识别方法对比'},
    {must:false, ref:'Closed-loop CNN [#24]', why:'物理一致性评估动机'},
    {must:false, ref:'Biswas et al. 2021, GJI [#22]', why:'初始模型约束相关方法'},
  ],
  p3: [
    {must:true,  ref:'SeisInvNet/Li 2020 [#12 + arXiv:1901.07733]', why:'迁移学习框架直接参考'},
    {must:true,  ref:'Noise-augmented [#23], GJI 2021', why:'合成→野外Domain Gap解决方案'},
    {must:true,  ref:'Fang et al. 2020 (上传PDF)', why:'Marmousi→Overthrust迁移的先例'},
    {must:false, ref:'DLM-FWI [#20]', why:'野外数据预处理参考'},
    {must:false, ref:'Yang & Ma 2019 FCN [#21]', why:'鲁棒性策略参考'},
  ]
};
CITATION_SUGGESTIONS.p1 = CITATION_SUGGESTIONS.p1.concat([
  {must:false, ref:'Adler et al. 2021, IEEE SPM 38:89 [综述 #26]',    why:'领域综述，Introduction开篇建立背景'},
  {must:false, ref:'Das et al. 2019, Geophysics R869 [1D CNN #30]',   why:'DL反演早期基础工作'},
  {must:false, ref:'Fang et al. 2020, Geophysics A37 [低频CNN]',      why:'低频恢复CNN，Curriculum设计参考'},
]);
CITATION_SUGGESTIONS.p2 = CITATION_SUGGESTIONS.p2.concat([
  {must:true,  ref:'Das et al. 2019, Geophysics R869 [1D CNN #30]',   why:'1D CNN基线，GFS在其结果上测试'},
  {must:false, ref:'Li et al. 2025, Interpretation T219 [#29]',       why:'物理引导阻抗反演，说明评估指标缺口'},
  {must:false, ref:'Adler et al. 2021, IEEE SPM [综述 #26]',          why:'领域综述对指标问题的讨论'},
]);
CITATION_SUGGESTIONS.p3 = CITATION_SUGGESTIONS.p3.concat([
  {must:false, ref:'Adler et al. 2021, IEEE SPM [综述 #26]',          why:'综述中的迁移学习章节'},
  {must:false, ref:'Fang et al. 2020 (上传PDF)',                       why:'Marmousi→Overthrust跨模型测试的先例'},
]);
CITATION_SUGGESTIONS.p1 = CITATION_SUGGESTIONS.p1.concat([
  {must:true,  ref:'OpenFWI, Deng et al. 2022, NeurIPS [#31]',     why:'与GeoFWI对比的标准基准论文'},
  {must:true,  ref:'GeoFWI Dataset, Li et al. 2026, JGR:ML&C [#37]', why:'数据集来源，必须精确引用'},
  {must:true,  ref:'Curriculum FWI, Wang & Ma 2022, Geophysics [#35]', why:'11级课程的直接先驱，需说明创新差异'},
  {must:true,  ref:'Score-SDE, Song et al. 2021, ICLR [#38]',      why:'扩散过程数学基础'},
  {must:true,  ref:'DiffusionFWI, Gao et al. 2024, IEEE TGRS [#34]', why:'最直接竞争对手，必须对比'},
  {must:true,  ref:'SeisFusion, Wang et al. 2024, IEEE TGRS [#33]', why:'另一扩散基线，软约束对比'},
  {must:true,  ref:'Song et al. 2022 medical hard consistency [#39]', why:'硬投影文献线源头，必引并对比'},
  {must:true,  ref:'Chung et al. 2022 MCG [#40] + DPS 2023 [#41]', why:'流形约束与含噪失败转折，必引并正面回应'},
  {must:true,  ref:'Song et al. Hard Data Consistency LDM [#42]', why:'最近同类 Hard Data Consistency 工作'},
  {must:true,  ref:'Bayesian UQ, Mosser et al. 2020, Geophysics [#36]', why:'不确定性分解框架'},
  {must:false, ref:'Adler et al. 2021, IEEE SPM [综述 #26]',         why:'领域综述，Introduction必引'},
]);
CITATION_SUGGESTIONS.p2 = CITATION_SUGGESTIONS.p2.concat([
  {must:true,  ref:'GeoFWI Dataset, Li et al. 2026 [#37]',          why:'GFS的30种分层评估数据来源'},
  {must:true,  ref:'OpenFWI, Deng et al. 2022 [#31]',               why:'与GeoFWI对比说明其评估局限性'},
  {must:false, ref:'Gretton et al. 2012 JMLR (MMD 原论文)',          why:'Paper 3 域适应引用须用可靠来源，勿用未核实 Chang 2021'},
  {must:false, ref:'Long et al. 2015 DAN / Sun 2016 CORAL',          why:'Paper 3 Marmousi 阶段域适应基线'},
]);
CITATION_SUGGESTIONS.p1 = CITATION_SUGGESTIONS.p1.concat([
  {must:true,  ref:'Peng et al. 2026, arXiv:2603.16393 [#47]', why:'W₂ 替代裸 L₂ DPS — 扩散早期相位/cycle-skip 防御 · 直接竞品'},
  {must:true,  ref:'Feng et al. 2026, arXiv:2603.00377 [#48]', why:'大模型 scaling — Paper 1 Discussion 对比算力/数据规模；Paper 3 训练语料 ablation 参照'},
  {must:true,  ref:'Liu et al. 2026, arXiv:2603.22307 [#43]', why:'2026条件扩散FWI：隐式先验+密度条件，直接竞品'},
  {must:true,  ref:'Taufik & Alkhalifah 2026, GJI ggag066 [#44]', why:'贝叶斯+重构引导扩散采样，顶刊立论范式'},
  {must:false, ref:'Zheng et al. 2025, JMSE [#45]', why:'FD正演+autodiff 自监督范例，Method 实现参考'},
]);
CITATION_SUGGESTIONS.p2 = CITATION_SUGGESTIONS.p2.concat([
  {must:true,  ref:'DLM-FWI, GJI ggag019 [#20]', why:'matching filter / cycle-skip → 支撑走时残差标尺论点'},
  {must:true,  ref:'Zheng et al. 2025, JMSE [#45]', why:'分阶段物理 Loss 对边界处理，GFS 评价体系参照'},
]);
CITATION_SUGGESTIONS.p3 = CITATION_SUGGESTIONS.p3.concat([
  {must:true,  ref:'GeoFWI Dataset, Li et al. 2026 [#37]',          why:'源域数据，Paper 3训练数据来源'},
  {must:true,  ref:'OpenFWI, Deng et al. 2022 [#31]',               why:'目标域之一，或作为对比参考基准'},
  {must:false, ref:'Curriculum FWI #35',                             why:'迁移后的fine-tune课程设计参考'},
  {must:true,  ref:'Gretton et al. 2012 JMLR',                       why:'MMD 定义 — 替代未核实的 Chang 2021'},
  {must:false, ref:'Long et al. 2015 DAN; Sun 2016 CORAL',          why:'Marmousi 阶段域适应基线（先于 EFWI）'},
  {must:false, ref:'Yang & Engquist 2018 Geophysics (Wasserstein FWI)', why:'Qiu et al. 2017 SEG 扩展版，可引用'},
  {must:true,  ref:'Feng et al. 2026, arXiv:2603.00377 [#48]', why:'Paper 3 大模型+LDM 扩增 SOTA — 须正面回应并差异化（GFS + 地质过程数据）'},
  {must:true,  ref:'Ni et al. 2026, Computers & Geosciences [#46]', why:'参考道互相关域适应 → MMD 前特征对齐工作流'},
]);

/* ════ 论文深度解析笔记 ════ */
var LIT_DEEP = {
  /* Fang 2020 deep dive */
  'F-1': {
    architecture: 'CAE (Convolutional AutoEncoder):\n• Input: 64×64 seismic patch (高频数据, >6Hz)\n• Encoder: Conv(9×9, 32ch) × 5层 + bottleneck 16ch\n• Decoder: ConvT(9×9, 32ch) × 5层\n• Output: 64×64 predicted patch (低频数据, <10Hz)\n• 激活: ReLU (所有层) + tanh (输出层)\n• 无 BatchNorm in encoder，有 Nor in decoder',
    training: '• Dataset: Marmousi model, 40 shot gathers\n• Train/Test split: 20/20 shots (50%/50%)\n• Patch size: 64×64, n_patches=23,113\n• Epochs: 40, Optimizer: Adadelta (自适应学习率)\n• Preprocessing: AGC能量均衡 → [−1,1] 归一化 → Patch分割\n• Loss: MSE between predicted and true low-freq patches',
    results: '• Marmousi (训练集): 平均相对误差 8.09%\n• Overthrust (测试集): 平均相对误差 14.02%\n• 低频频谱扩展: 6Hz以下从−60dB恢复到接近真实水平\n• FWI改进: 高频FWI收敛局部极小 → 加入预测低频后\n  多尺度FWI收敛到全局最优（与全频结果接近）',
    gcfwi_use: 'Paper 3直接可用:\n1. 用Fang 2020的CAE作为GeoFWI→野外数据迁移的\n   预处理模块（低频扩展）\n2. Overthrust迁移实验可对比：直接迁移 vs CAE预处理后迁移\n3. 你的CAE重训练只需5-10个目标域shot gathers'
  },
  'W-1': {
    architecture: 'Shared architecture (1D和2D CNN完全相同结构):\n• Conv1d(或Conv2d) + ReLU: 输出16个特征\n• × 4个 ResBlock: 每块含2个Conv + skip connection\n• 最终Conv(1×1): 输出阻抗序列\n\n2D CNN关键区别:\n• 1D→2D filter (3×3 2D卷积核)\n• 输入: 2D seismic profile (随机路径提取)\n• 目标: 2D阻抗模型（仅井位置有标签）\n• Loss: Adaptive MSE (binary mask w[i,j])',
    training: '• Dataset: SEAM Phase I (复杂盐体)\n• 训练井: 40口 (随机位置，最小间距1.2km)\n• 验证井: 10口 (独立评估)\n• 2D训练路径: 100条随机路径，每条过≥5口井\n• 路径约束: 相邻井不重复，转角>80°\n• Epochs: 300, lr=0.001 (Adam, 自适应衰减)',
    results: '• 1D CNN (仅地震): MSE在验证井均值=1.76 (最差)\n• 1D CNN (地震+初始模型): MSE均值=0.21 (有改善)\n• 2D CNN (地震+初始模型): MSE均值=0.09 (最佳)\n• 薄层识别: 2D CNN独有优势，1D CNN几乎无法捕捉\n• Teapot Dome野外数据: 同样规律，2D优于1D',
    gcfwi_use: 'Paper 1直接参考:\n1. 你的U-Net可采用同样的ResBlock结构 (16ch × 4块)\n2. 初始速度模型作为第二输入通道的策略\n   → 在GC-FWI中可以用平滑初始速度作为"低频先验"\n3. Adaptive loss的binary mask思路\n   → 可用于GFS指标中的"界面区域加权"\nPaper 2参考:\n4. 薄层识别能力 → 正是GFS需要量化的结构性质量'
  }
};

/* ════ 技术演进时间线 ════ */
var TECH_TIMELINE = [
  {year:2019, method:'1D CNN (Das et al.)',    venue:'Geophysics',    type:'DL基础',   key:'首个系统性DL阻抗反演'},
  {year:2019, method:'FCN (Yang & Ma)',        venue:'Geophysics',    type:'DL基础',   key:'消除FC层，提升泛化'},
  {year:2019, method:'VelocityGAN',            venue:'WACV',          type:'生成模型', key:'GAN引入，解决模糊'},
  {year:2020, method:'InversionNet (Wu)',      venue:'IEEE TCI',      type:'DL基础',   key:'端到端FWI，奠基论文'},
  {year:2020, method:'Smart FWI (Sun)',        venue:'Geophysics',    type:'物理+DL',  key:'物理迭代×DL加速'},
  {year:2020, method:'Fang 2020 (CAE)',        venue:'Geophysics',    type:'DL基础',   key:'低频恢复CNN'},
  {year:2021, method:'Physics-guided+UQ',      venue:'Geophysics',    type:'物理+DL',  key:'贝叶斯UQ引入'},
  {year:2021, method:'Score-SDE (Song)',       venue:'ICLR',          type:'生成模型', key:'扩散模型统一框架'},
  {year:2021, method:'Wu 2021 (2D CNN)',       venue:'Geophysics',    type:'DL基础',   key:'2D CNN阻抗，弱监督'},
  {year:2021, method:'Curriculum (Wang&Ma)',   venue:'Geophysics',    type:'训练策略', key:'课程学习引入FWI'},
  {year:2022, method:'OpenFWI (Deng)',         venue:'NeurIPS',       type:'数据集',   key:'标准Benchmark建立'},
  {year:2023, method:'PINN-FWI (Song)',        venue:'IEEE TGRS',     type:'物理+DL',  key:'PINN软约束FWI'},
  {year:2024, method:'SeisFusion',             venue:'IEEE TGRS',     type:'生成模型', key:'扩散模型×地震处理'},
  {year:2024, method:'DiffusionFWI (Gao)',     venue:'IEEE TGRS',     type:'生成模型', key:'DDPM直接用于FWI'},
  {year:2026, method:'GeoFWI Dataset',         venue:'JGR:ML&C',      type:'数据集',   key:'30种地质类型Benchmark'},
  {year:2026, method:'Conditional Diffusion FWI (#43)', venue:'arXiv', type:'生成模型', key:'条件扩散隐式先验正则化'},
  {year:2026, method:'Bayesian Diffusion FWI (#44)', venue:'GJI', type:'贝叶斯+扩散', key:'重构引导扩散采样+SVGD'},
  {year:2026, method:'DLM-FWI matching filter (#20)', venue:'GJI', type:'物理标尺', key:'DL匹配滤波缓解cycle-skip'},
  {year:2025, method:'Physics-guided Self-FWI (#45)', venue:'JMSE', type:'物理+DL', key:'PCAMUNet分阶段物理Loss'},
  {year:2026, method:'LSM Domain Adaptation (#46)', venue:'C&G', type:'域适应', key:'参考道互相关特征对齐'},
  {year:2026, method:'★ GC-FWI (Yours)',       venue:'Geophysics',    type:'综合创新', key:'Proximal Guidance + Curriculum + Diffusion'},
];

/* ════ 知识图谱连接关系 ════ */
var LIT_CONNECTIONS = [
  {from:'InversionNet(11)', to:'GC-FWI',       type:'extends',  note:'GC-FWI扩展InversionNet到扩散框架'},
  {from:'FCN-Yang(21)',     to:'GC-FWI',        type:'extends',  note:'FCN鲁棒性策略→GC-FWI训练策略'},
  {from:'Score-SDE(38)',    to:'GC-FWI',        type:'basis',    note:'数学基础：扩散过程SDE框架'},
  {from:'DiffusionFWI(34)', to:'GC-FWI',       type:'contrast', note:'核心竞争：无约束vs有约束扩散'},
  {from:'Liu2026-CondDiff(43)', to:'GC-FWI',   type:'contrast', note:'2026条件扩散FWI：条件先验 vs 近端引导'},
  {from:'Taufik2026-Bayes(44)', to:'GC-FWI',   type:'reference',note:'贝叶斯+重构引导扩散采样范式'},
  {from:'DLM-FWI(20)',      to:'GFS-Paper2',    type:'basis',    note:'matching-filter/波形标尺支撑GFS论点'},
  {from:'Zheng2025-PCAMU(45)', to:'GFS-Paper2', type:'reference',note:'分阶段物理Loss→GFS边界评估优化'},
  {from:'Ni2026-LSM-DA(46)', to:'Transfer-P3', type:'reference',note:'互相关域适应→MMD前特征对齐'},
  {from:'Curriculum(35)',   to:'GC-FWI',        type:'extends',  note:'11级课程的直接先驱'},
  {from:'BayesianUQ(36)',   to:'GC-FWI',        type:'basis',    note:'Epistemic/Aleatoric分解框架'},
  {from:'PINN-FWI(14)',     to:'GC-FWI',        type:'contrast', note:'软约束 vs 近端引导的核心对比'},
  {from:'GeoFWI-DS(37)',    to:'GC-FWI',        type:'dataset',  note:'实验数据来源'},
  {from:'GeoFWI-DS(37)',    to:'GFS-Paper2',    type:'dataset',  note:'GFS分层评估的数据基础'},
  {from:'GeoFWI-DS(37)',    to:'Transfer-P3',   type:'dataset',  note:'迁移学习的源域数据'},
  {from:'Fang2020(F-1)',    to:'Transfer-P3',   type:'reference',note:'跨模型迁移的先例（Marmousi→Overthrust）'},
  {from:'SeisInvNet(12)',   to:'Transfer-P3',   type:'reference',note:'迁移学习框架直接参考'},
  {from:'1D-CNN(30)',       to:'GFS-Paper2',    type:'baseline', note:'GFS测试的基线方法'},
  {from:'Wu2021(W-1)',      to:'GFS-Paper2',    type:'reference',note:'薄层结构识别→GFS结构质量量化'},
  {from:'OpenFWI(31)',      to:'GC-FWI',        type:'contrast', note:'GeoFWI vs OpenFWI难度对比'},
];

/* ════ 流程图参考样式（来自已审计脚本 / 相关论文结构） ════ */
var FIG_REFERENCE_FLOWS = [
  {
    id: 'paper1-unified',
    label: 'Paper 1 · 流程+架构合一（推荐）',
    source: 'main.tex fig:pipeline_schematic · plot_p1_pipeline_schematic.py',
    paperRef: 'paper1/manuscript/main.tex',
    desc: '(a) 端到端：GeoFWI→|∇v| proxy→GC-FWI→v̂→锁定评测；(b) 采样环：ε_θ+DDPM+固定K近端+11级课程',
    modes: ['workflow', 'arch'],
    hybrid: true,
    paper: 'P1'
  },
  {
    id: 'hybrid-blend',
    label: '杂糅综合（推荐 · 原创合成）',
    source: '多篇低频/DL-FWI 文献 idioms 组合 · 非单篇复刻',
    paperRef: 'paper1/manuscript/main.tex',
    desc: '三阶段 + 多偏移/条件输入 + 课程 + 去噪/近端 + 锁定评测 + 证据三元组；避免抄袭单一论文版式',
    modes: ['workflow'],
    hybrid: true
  },
  {
    id: 'hybrid-arch',
    label: '杂糅架构图（Method 用）',
    source: 'Encoder 锥形 + ResBlock 主干 + 双输出头 · 原创合成',
    paperRef: 'Method 节网络示意',
    desc: '抽象融合 CAE/ResBlock 语汇，需按 GC-FWI 实际模块重命名',
    modes: ['arch'],
    hybrid: true
  },
  {
    id: 'generic-lowfreq',
    label: '低频恢复通用链（Ovcharenko 语汇）',
    source: '个人低频相关/论文引用的文章 · 多偏移低频类 PDF',
    desc: '带限观测 → 预处理 → DL 映射 → 低频补全 → FWI 消费端（抽象）',
    modes: ['workflow'],
    hybrid: true
  },
  {
    id: 'cnn-pde-loop',
    label: 'CNN–物理闭环（ICLR 语汇）',
    source: 'UNSUPERVISED LEARNING OF FULL-WAVEFORM…pdf',
    desc: '观测 ↔ CNN ↔ 速度 ↔ 正演 循环示意 · Related Work 对比用',
    modes: ['workflow'],
    hybrid: true
  },
  {
    id: 'p1-pipeline',
    label: 'Paper 1 · F1 pipeline（项目脚本）',
    source: 'plot_p1_pipeline_schematic.py · CODEX F1',
    paperRef: 'paper1/manuscript/main.tex',
    desc: '横向 DDPM + 固定 K 近端环 + 11 级课程侧栏',
    modes: ['workflow']
  },
  {
    id: 'gcfwi-3phase',
    label: 'GC-FWI 三阶段 benchmark',
    source: 'Figure Studio gcfwi layout',
    paperRef: 'paper1/manuscript/main.tex',
    desc: 'Data prep → Training → Evaluation 三带',
    modes: ['workflow']
  },
  {
    id: 'evidence-map',
    label: 'Paper 1 · F5 证据地图',
    source: 'plot_p1_evidence_map_flow.py',
    paperRef: 'paper1/manuscript/main.tex',
    desc: 'Experiment → locked result → claim',
    modes: ['workflow']
  },
  {
    id: 'fang2020-cae',
    label: '单篇参照 · Fang CAE Fig.1a',
    source: 'Data-driven low-frequency…pdf · p3',
    previewImage: 'fig_exports/ref_pdf_pages/data-driven_low-frequency_signal_recover_p3.png',
    paperRef: 'Geophysics · 仅作语汇参考',
    desc: '⚠ 接近原图布局 · 投稿建议改用「杂糅综合」',
    modes: ['workflow', 'arch'],
    singlePaper: true
  },
  {
    id: 'fang2020-workflow',
    label: '单篇参照 · Fang METHOD 流程',
    source: '同上 PDF · p2',
    previewImage: 'fig_exports/ref_pdf_pages/data-driven_low-frequency_signal_recover_p2.png',
    paperRef: 'Geophysics · 仅作语汇参考',
    desc: 'AGC → 归一化 → patches → CNN → 输出',
    modes: ['workflow'],
    singlePaper: true
  },
  {
    id: 'wu2021-2dcnn',
    label: '单篇参照 · Wu 2D CNN Fig.6',
    source: 'Deep learning for multidimensional seismic…pdf · p5',
    previewImage: 'fig_exports/ref_pdf_pages/deep_learning_for_multidimensional_seism_p5.png',
    paperRef: 'Geophysics · 仅作语汇参考',
    desc: '⚠ 接近原图布局 · 投稿建议改用「杂糅综合」',
    modes: ['workflow', 'arch'],
    singlePaper: true
  },
  {
    id: 'diffusion-fwi',
    label: 'DiffusionFWI 语汇（Related Work）',
    source: 'LIT #35 · score SDE + guidance',
    paperRef: 'Related Work 对比',
    desc: 'score 引导采样链 · 抽象示意',
    modes: ['workflow']
  }
];

/* ════ 图表工作室默认参数 ════ */
var FIG_DEFAULTS = {
  workflow: {
    paper:   'P1',
    paperTitle: 'Paper 1 · GC-FWI (GeoFWI Benchmark)',
    taskNote: 'Audited task: velocity-proxy reconstruction — not shot-gather FWI',
    manuscriptRef: 'paper1/manuscript/main.tex',
    referenceId: 'paper1-unified',
    title:   'GC-FWI: velocity-proxy reconstruction on GeoFWI',
    layout:  'gcfwi',
    theme:   'paper',
    steps:   'GeoFWI Split,|∇v| Conditioning,Method Zoo (GC-FWI·U-Net·PINN);11-Stage Curriculum,DDPM Backbone,Proximal K-loop,Predicted v̂;Locked Metrics (CC·GFS),Wilcoxon+Bonferroni,Evidence Map',
    colors:  'cb-blue,cb-cyan,cb-orange,cb-purple,cb-gray',
    subtitle:'GC-FWI proximal diffusion + 11-stage curriculum · locked proxy metrics'
  },
  arch: {
    title:    'Hybrid network schematic',
    template: 'cae_fang2020',
    referenceId: 'paper1-unified',
    depth:    '12',
    channels: '32',
    kernel:   '9x9',
    input_sz: '64x64'
  },
  compare: {
    title:  'Velocity Model Comparison',
    rows:   '4',
    labels: 'Flat Layer,Fold,Fault,Salt Body',
    vmin:   '1500',
    vmax:   '4000',
    dx_km:  '0.1',
    theme:  'paper',
    cols:   'True,Predicted,Error'
  }
};

/* ════ 文献验证已知真实论文库 ════ */
var KNOWN_REAL = [
  { pattern: /tarantola.*1984|1984.*tarantola/i, verdict: 'VERIFIED', confidence: 99,
    evidence: 'Tarantola (1984) Geophysics 49:1259 — 经典 FWI 论文，广为引用' },
  { pattern: /virieux.*operto.*2009|2009.*virieux/i, verdict: 'VERIFIED', confidence: 98,
    evidence: 'Virieux & Operto (2009) Geophysics 74:WCC1 — 标准 FWI 综述论文' },
  { pattern: /inversionnet|wu.*yang.*2019|InversionNet/i, verdict: 'VERIFIED', confidence: 92,
    evidence: 'InversionNet (Wu et al. 2020) IEEE TCI — 已发表的 FWI 深度学习基线' },
  { pattern: /geofwi|wu.*chen.*2025.*geofwi|JH001037/i, verdict: 'LIKELY_REAL', confidence: 82,
    evidence: 'GeoFWI 数据集论文，JGR:ML&C 2025-2026 发表' },
  { pattern: /openFWI|deng.*2022.*openfwi/i, verdict: 'VERIFIED', confidence: 95,
    evidence: 'OpenFWI (Deng et al. 2022) — 已发表的 FWI 基准数据集' },
  { pattern: /chang.*2021.*lithology|unsupervised domain adaptation.*maximum mean discrepancy.*lithology/i, verdict: 'LIKELY_FAKE', confidence: 88,
    evidence: '无法核实该 Chang (2021) 标题/作者组合 — 疑似 AI 幻觉引用。MMD 域适应请改用 Gretton et al. 2012 JMLR、Long et al. 2015 DAN、Sun et al. 2016 CORAL' },
  { pattern: /diffusion posterior sampling|chung.*2023.*dps|OnD9zGAGT0k/i, verdict: 'VERIFIED', confidence: 97,
    evidence: 'Chung et al. (2023) ICLR DPS — Abstract 明确：strict measurement-consistency projection 在含噪逆问题上 fail dramatically。不可用来"证明硬投影更优"' },
  { pattern: /manifold constrained gradient|chung.*2022.*mcg|nJJjv0JDJju/i, verdict: 'VERIFIED', confidence: 96,
    evidence: 'Chung et al. (2022) NeurIPS MCG — Manifold Constrained Gradient，硬投影文献线关键转折' },
  { pattern: /2111\.08005|solving inverse problems in medical imaging with score/i, verdict: 'VERIFIED', confidence: 95,
    evidence: 'Song, Shen, Xing, Ermon (2022) ICLR — medical imaging 硬数据一致性投影源头；GC-FWI 为波方程伴随近端引导，须区分线性 vs 非线性' },
  { pattern: /hard data consistency.*latent diffusion|j8hdRqOUhN/i, verdict: 'VERIFIED', confidence: 94,
    evidence: 'Song et al. Hard Data Consistency via Latent Diffusion — 医疗/线性硬一致性；GC-FWI 为物理域伴随近端引导' },
  { pattern: /qiu.*ramos.*valenciano.*2017|segam2017-17681930|wasserstein.*full-waveform inversion.*yang.*engquist/i, verdict: 'VERIFIED', confidence: 93,
    evidence: 'Qiu et al. (2017) SEG + Yang & Engquist (2018) Geophysics 83(1) R43-R62 — Wasserstein/OT FWI 可靠引用' },
  { pattern: /shen2024posterior|shen.*2024.*posterior.*diffusion|posterior.*diffusion.*fwi/i, verdict: 'NEEDS_VERIFY', confidence: 40,
    evidence: 'main.tex \\cite{shen2024posterior} — 未上传 ntfa.bib，无法核实。Intro 区分 DPS 的关键句，须文献验证工具或 CrossRef 确认' },
  { pattern: /li2024seisfusion|seisfusion.*2024|li.*seisfusion/i, verdict: 'NEEDS_VERIFY', confidence: 55,
    evidence: 'main.tex \\cite{li2024seisfusion} — 对照 LIT_DATA #33 SeisFusion；确认 bib key/年份/作者与正文一致' },
];

/* ════ 图表模板库 ════ */
var GALLERY_TEMPLATES = [
  {
    id: 'gcfwi-workflow', mode:'workflow', label:'Paper 1 · GC-FWI 完整流程图',
    desc:'Paper 1 专用：GeoFWI velocity-proxy benchmark · curriculum+proximal · locked 评测（非 P2 GFS / 非 P3 迁移）',
    tags:['Paper 1','流程图','必做'],
    params:{ layout:'gcfwi', theme:'paper', referenceId:'paper1-unified',
             paper:'P1',
             paperTitle:'Paper 1 · GC-FWI (GeoFWI Benchmark)',
             taskNote:'Audited task: velocity-proxy reconstruction — not shot-gather FWI',
             manuscriptRef:'paper1/manuscript/main.tex · Fig. pipeline_schematic',
             title:'GC-FWI: velocity-proxy reconstruction on GeoFWI',
             subtitle:'Combined pipeline & diffusion sampling architecture · T=100 · fixed-K proximal',
             steps:'GeoFWI Split,|∇v| Conditioning,Method Zoo (GC-FWI·U-Net·PINN);11-Stage Curriculum,DDPM Backbone,Proximal K-loop,Predicted v̂;Locked Metrics (CC·GFS),Wilcoxon+Bonferroni,Evidence Map',
             colors:'cb-blue,cb-cyan,cb-orange,cb-purple,cb-gray',
             subtitle:'GC-FWI proximal diffusion + 11-stage curriculum · locked proxy metrics' }
  },
  {
    id: 'cae-arch', mode:'arch', label:'CAE 网络架构 (Fang 2020)',
    desc:'12层卷积自编码器，Encoder→Bottleneck→Decoder，完全对称结构',
    tags:['参考论文','架构图','CNN'],
    params:{ title:'Convolutional Autoencoder for Low-Frequency Prediction (Fang et al. 2020)',
             template:'cae_fang2020', depth:'12', channels:'32', kernel:'9x9' }
  },
  {
    id: 'unet-gcfwi', mode:'arch', label:'GC-FWI U-Net 架构',
    desc:'5层下采样，ceil_mode=True，100×100输入正确处理，Skip connections',
    tags:['Paper 1','架构图','U-Net'],
    params:{ title:'U-Net Backbone of GC-FWI (5 Downsampling Stages, 100×100 input)',
             template:'unet_gcfwi', depth:'5', channels:'64', kernel:'3x3', input_sz:'100x100' }
  },
  {
    id: 'resnet-wu', mode:'arch', label:'ResNet 2D CNN (Wu 2021)',
    desc:'弱监督阻抗反演，自适应loss，2D特征提取克服1D trace-by-trace限制',
    tags:['参考论文','架构图','ResNet'],
    params:{ title:'2D CNN for Seismic Impedance Inversion (Wu et al. 2021)',
             template:'resnet_wu2021', depth:'4', channels:'16' }
  },
  {
    id: 'gcfwi-compare', mode:'compare', label:'GC-FWI 对比结果（4地质类型）',
    desc:'4行×3列：True/Predicted/Error，jet+RdBu_r colormap，必须图',
    tags:['Paper 1','对比图','必做'],
    params:{ title:'Velocity Model Comparison Across Geological Structure Types',
             rows:'4', labels:'Flat layers,Folded layers,Fault system,Salt body',
             vmin:'1500', vmax:'4000', cols:'True velocity,GC-FWI predicted,Error (pred−true)' }
  },
  {
    id: 'gfs-scatter', mode:'workflow', label:'Paper 2 · GFS vs CC/SSIM 散点示意',
    desc:'证明GFS与CC在盐体场景强烈不一致，Paper 2核心动机图',
    tags:['Paper 2','GFS','散点'],
    params:{ title:'GFS vs CC: Metric Disagreement for Salt Bodies',
             steps:'Run 5 models on GeoFWI,Compute CC/SSIM/GFS,Identify paradox cases (high CC ≠ high GFS),Plot scatter: x=CC y=GFS color=geo_type,Salt bodies = large discordance',
             colors:'accent,teal,amber,red,purple',
             subtitle:'GFS and CC disagree most for salt body inversions (Kendall τ [TBD] after stratified analysis)' }
  },
  {
    id: 'residual-gfs-pareto', mode:'workflow', label:'Paper 1 · P1-E7 residual–GFS Pareto',
    desc:'四设置（无/DPS/近端/W₂）物理一致性 vs 地质质量 · EXPERIMENT_SURPRISE 优先#1',
    tags:['Paper 1','Pareto','必做','surprise'],
    params:{ title:'Physics–Geology Trade-off: ||r_norm|| vs GFS',
             steps:'Same checkpoint · 4 guidance modes,Record r_norm + GFS per val sample,Scatter + Pareto envelope,GC-FWI should dominate lower-left frontier',
             colors:'gray,blue,teal,amber',
             subtitle:'From benchmark ΔCC to multi-objective narrative (P1-E7 · plot_residual_gfs_pareto.py)' }
  },
  {
    id: 'gfs-decision-dt', mode:'workflow', label:'Paper 2 · GFS 指标决策 · Δt 下游',
    desc:'CC-top20% vs GFS-top20% 走时预测误差 · 从相关到因果效用',
    tags:['Paper 2','GFS','surprise','必做'],
    params:{ title:'Metric Decision: CC-top20% vs GFS-top20% on Δt_first',
             steps:'Pool of inversion outputs,Rank by CC and by GFS separately,Take top 20% each,Forward F(v) · delta_t_first,Bar: mean Δt CC-top vs GFS-top',
             colors:'accent,green,amber',
             subtitle:'Does GFS-selected model predict exploration outcome better? [TBD]' }
  },
  {
    id: 'transfer-flow', mode:'workflow', label:'训练语料 ablation (Paper 3 · P3-E9)',
    desc:'GeoFWI 地质过程 vs OpenFWI+LDM 统计扩增 · vs Feng 2026',
    tags:['Paper 3','训练数据','surprise','必做'],
    params:{ title:'Geologically Constrained vs Statistically Augmented Pretraining',
             steps:'Fix architecture + compute budget,Train A on GeoFWI / B on OpenFWI+LDM aug,Evaluate Marmousi2 + SEG Salt,Primary metric GFS_lambda (not CC alone),Compare CC/SSIM as secondary',
             colors:'teal,amber,green,purple',
             subtitle:'Does process-based geology beat statistical scaling? [TBD] · P3-E9' }
  },
  {
    id: 'noise-robust-triple', mode:'workflow', label:'Paper 1 · P1-E9 3×4 有色噪声矩阵',
    desc:'方法(DPS/W₂/GC-FWI)×SNR(clean/20/10/5dB) · band-limited 相干噪声 · vs Peng 2026',
    tags:['Paper 1','噪声','必做','surprise'],
    params:{ title:'3×4 Noise Robustness (Colored Coherent Noise)',
             steps:'GeoFWI salt subset,Rows: DPS / W2 / GC-FWI,Cols: clean 20 10 5 dB,Colored band-limited noise (not white only),Report CC RMSE GFS',
             colors:'teal,blue,amber,red',
             subtitle:'Main table requires colored noise · P1-E9 · tab:noise_3x4' }
  },
  {
    id: 'lf-predict', mode:'compare', label:'低频预测对比 (Fang 2020)',
    desc:'Marmousi/Overthrust/Field data: High-freq input → Predicted low-freq → True low-freq → Error',
    tags:['参考论文','低频预测','对比图'],
    params:{ title:'Low-Frequency Prediction Results (Fang et al. 2020 Figure 2)',
             rows:'3', labels:'Marmousi model,Overthrust model,Field data',
             vmin:'1500', vmax:'4000', cols:'High-frequency input,Predicted low-freq,True low-freq,Error' }
  }
];

/* ════ OpenClaw 半私人版 — 远程 GPU 自主实验台 ════ */
var OPENCLAW = {
  title: 'OpenClaw 智能体自主实验工作台',
  subtitle: 'ReAct 循环：本地 Codex/Claude 思考 → AutoDL 远程执行 PyTorch/Devito 代码',
  maxTurns: 6,
  confirmBeforeExecute: true,
  confirmBeforeExecuteHint: '默认开启：每轮 write_file/run_code 执行前弹窗确认。可在 OpenClaw 页取消勾选「自动执行」。',
  defaultBackendUrl: '',
  systemInstruction:
    '你是一个拥有地球物理学顶刊（Geophysics/GJI）水平的 PyTorch 算法专家智能体。\n' +
    '你正在通过 JSON API 指挥一台带 GPU 的远程 Linux 服务器。\n' +
    '每次回复必须严格输出且仅输出以下 JSON（不要 Markdown 代码块）：\n' +
    '{\n "thought": "物理与数学分析，以及下一步计划",\n' +
    ' "action": "write_file" 或 "run_code" 或 "complete",\n' +
    ' "filename": "目标 Python 文件名",\n' +
    ' "content": "write_file 时的完整代码"\n}\n' +
    '原则：高内聚物理算子、张量 shape 注释、根据 Traceback 闭环修正直到 complete。',
  deploySteps: [
    'AutoDL 上传 agent_backend.py，执行 pip install fastapi uvicorn pydantic',
    'python agent_backend.py（默认 6006 端口）',
    'AutoDL 控制台映射 6006 → 公网 https://xxxx.autodl.pro',
    '本页或 API 设置中填写 .../execute 地址',
    '用 启动GeoFWI.bat 启动本地服务器（CORS 代理）',
    '输入物理实验指令，点击启动 ReAct 循环'
  ],
  examplePrompt:
    '请基于 PyTorch 编写含 PML 吸收边界的 2D 声波 forward 算子，shape [Nx,Nz]，存为 fwi_pml.py 并测试运行。'
};

/* ════ 三篇论文 · 2 周最小实验矩阵（其余标 Deferred） ════ */
var MINIMAL_EXP_MATRIX = {
  title: '2 周最小实验矩阵',
  subtitle: '云 GPU 单卡 + bp-diff-fwi-complex（型号待 nvidia-smi 确认）· 只保留 14 天内可交付项',
  updated: '2026-06-19 · v3.4.2 budget · FWI forward overhead',
  horizonDays: 14,
  compute: {
    where: '云服务器（AutoDL / 智星云 / 其他）— 非本地 WSL 算力',
    gpuModel: '[待填写：登录云机后运行 nvidia-smi 查看型号与显存]',
    planningNote:
      '表中「GPU·day」为相对工作量；**FWI 每步推断含 F(v) 正演**——见 COMPUTE_BUDGET.fwiForwardOverhead。' +
      '逐样本循环未向量化时工时可达表值 ×10。',
    verifyCmd: 'nvidia-smi --query-gpu=name,memory.total,driver_version --format=csv',
    fillIn: '确认型号后更新 gpuModel；记录平台实际时租（AutoDL 常见 ¥1.88/h，非 ¥1.5）',
    scaleHint: '若显存 <24GB：P1-E2 max_samples 降至 100–200；P1-E4 减半或 Deferred',
    fwiWarning: '单样本推断 ≈12,500 次波方程解（50步×K=5×50炮）；n=500 约 20–48h GPU（向量化良好）',
    tiers: [
      { tier: 'A100 80GB', factor: '1.0×', note: '原 GPU·day 参考档' },
      { tier: '4090 24GB', factor: '≈1.3–1.5×', note: '性价比首选 · 注意 batch 正演' },
      { tier: 'V100 16–32GB', factor: '≈1.8×', note: '训练需减样本' },
      { tier: 'T4 / 16GB 以下', factor: '≈3×+', note: '仅 evaluate/指标；P1-E2 Deferred' }
    ]
  },
  costEstimate: {
    disclaimer: '2026 Q2 国内云实测 + FWI 正演开销修订 · 详见 COMPUTE_BUDGET',
    updated: '2026-06-19',
    rateNote: '¥1.5/h 为乐观参考（智星云/折扣可达）；AutoDL 常见 ¥1.88–2.19/h（+25–45%）',
    pricing: [
      { type: 'RTX 4090', spec: '24GB', rate: '￥1.35–2.29 / 小时', use: 'P1 推断/训练 · 2026 Q2 区间' },
      { type: '智星云 4090', spec: '活动价', rate: '￥≈1.35 / 小时', use: '区间低端 · 需抢档' },
      { type: 'AutoDL 4090', spec: '常见', rate: '￥≈1.88–2.19 / 小时', use: '比旧预设 ¥1.5 贵 25–45%' },
      { type: 'A100 40G/80G', spec: '40–80GB', rate: '￥3.5–7.0 / 小时', use: 'OpenFWI 自训 Deferred' },
      { type: '弹性存储', spec: '>20GB', rate: '￥0.01 / GB / 天', use: '权重与脱水集' }
    ],
    strategyNote:
      '**按阶段门控花钱**（Phase1 ≤¥30 → Phase2 ≤¥120 → Phase3 ≤¥200），勿一次性估全程。' +
      'P1-F0b CFL 冒烟在 Phase1 内；P1-E2 是最大单项（20–48h）。',
    stageGatesRef: 'COMPUTE_BUDGET.stageGates',
    fwiOverheadRef: 'COMPUTE_BUDGET.fwiForwardOverhead',
    fullProject: {
      label: '三部曲全项目（FWI 正演开销修订 · 区间）',
      papers: [
        { id: 'p1', tag: 'Paper 1 GC-FWI', gpu: '4090', hours: '80–170', hoursOld: 70, rateYuan: '1.5–1.88',
          subtotalYuan: '¥80–250', subtotalOld: 105,
          breakdown: 'P1-E2 20–48h + P1-E4 48–96h + 调试/消融', note: '旧 70h/¥105 为乐观下限' },
        { id: 'p2', tag: 'Paper 2 GFS', gpu: '本地 CPU', hours: '0–8', rateYuan: 0,
          subtotalYuan: '≈0–15', subtotalOld: 135,
          breakdown: '2周矩阵离线 · OpenFWI 自训 Deferred', note: '全项目 OpenFWI 自训另计 ≈¥135' },
        { id: 'p3', tag: 'Paper 3', gpu: '4090', hours: '35–50', rateYuan: '1.5–1.88',
          subtotalYuan: '¥50–100', subtotalOld: 75, note: 'P3-E9 三组训练' }
      ],
      computeSubtotalYuan: '¥470–850',
      computeSubtotalOld: 315,
      storage: {
        volumeGb: 200, freeGb: 20, billableGb: 180, rateYuanPerGbDay: 0.01,
        days: 90, dailyYuan: 1.8, subtotalYuan: 162,
        note: 'OpenFWI 脱水集 + 权重 · 3 个月'
      },
      bufferFactor: '1.5–2.0',
      bufferNote: '普通 1.5× + FWI CFL/NaN 调试额外预留；P1-F0b 可降低翻车损失',
      grandTotalYuan: '¥650–950',
      grandTotalOld: 634.5,
      formula: '算力 ¥470–850 × 1.5–2 缓冲 + 存储 ≈ ¥650–950（旧点估 ¥634.5 仍在大区间内）'
    },
    minimal2Week: {
      label: '2 周最小矩阵（修订区间 · 阶段门控）',
      note: 'Phase1 ≤¥30 · Phase2 ≤¥120 · Phase3 ≤¥200；按 COMPUTE_BUDGET.stageGates 解锁',
      papers: [
        { id: 'p1', hours: '55–100', subtotalYuan: '¥80–190', note: '含 P1-E2 20–48h · 旧 45h/¥68 偏乐观' },
        { id: 'p2', hours: 0, subtotalYuan: '≈0', note: 'P2-E7 本地 · P2-E2/E5 CPU' },
        { id: 'p3', hours: '15–25', subtotalYuan: '¥25–50', note: 'Phase2–3 · P3-E1 + 部分 P3-E9' }
      ],
      computeSubtotalYuan: '¥180–320',
      computeSubtotalOld: 133,
      storageSubtotalYuan: 18,
      bufferFactor: 1.5,
      grandTotalYuan: '¥280–450',
      grandTotalOld: 218,
      formula: '算力 ¥180–320 × 1.5 + 存储 ≈ ¥280–450（旧 ¥218 为乐观下限）'
    },
    revisedVerdict:
      '**价格预设 ¥1.5/h 偏乐观但可达**（智星云 ≈¥1.35）；AutoDL 常见贵 25–45%。' +
      '**工时才是核心偏差**：FWI 正演使 P1 GPU 小时约为普通 DL 的 1.5–2×（未向量化则 ×10）。' +
      'P1-F0 的 ¥8 测试是整个项目最高杠杆投资。'
  },
  assumptions: [
    '算力在**云 GPU** 上执行；WSL 本地跑 P2-E7 与离线 GFS（≈0 元）',
    '云 4090 时租：智星云 ≈¥1.35/h · AutoDL ≈¥1.88–2.19/h · 旧预设 ¥1.5/h 为乐观参考',
    'FWI 推断含 F(v) 正演 — GPU 工时约为表值 1.5–2×；逐样本循环未向量化可 ×10',
    '按 COMPUTE_BUDGET 阶段门控：Phase1 ≤¥30 → Phase2 ≤¥120 → Phase3 ≤¥200',
    'P1-F0b CFL 冒烟在 Phase1 内 · P1-E2 前必过',
    '未跑完数值一律 [TBD]；metrics_canonical.json 为唯一可写 main.tex 来源'
  ],
  papers: [
    {
      id: 'p1',
      tag: 'Paper 1 · GC-FWI',
      venue: 'Geophysics (SEG)',
      goal: '证明：在 GeoFWI（比 OpenFWI 更难、且原文含 SGDS 基线）上，GC-FWI 在 residual–GFS Pareto 与低 SNR 三方对比中相对 DPS/Peng W₂ 有差异化优势',
      gpuBudget: '≈8–15 GPU·day（含 P1-E2 20–48h · 见 COMPUTE_BUDGET）',
      cpuBudget: '≈2 day',
      costRemark: '【修订 2026 Q2】P1 实际 ¥80–250（旧 ¥105 为乐观下限）· P1-E2 单项最大 · Phase1 先花 ≤¥30',
      runs: [
        { id:'P1-F0', status:'run', name:'【Phase1】K=5 近端内层环隔离（无扩散）', days:0.5, gpu:0.25,
          cmd:'python -m geofwi_physics_core.proximal_isolation_test --per-level 5 --nt 400',
          deliverable:'proximal_isolation_K5.json · 判定 A/B/C',
          blocks:'P1-E2 批量 · P1-E4 · 定量 claims',
          costNote: '2–4 GPU·h · ¥6–13' },
        { id:'P1-F0b', status:'run', name:'【Phase1】CFL 稳定性冒烟（5 geo_type · 禁 NaN）', days:0.25, gpu:0.25,
          cmd:'evaluate.py --cfl_smoke --geo_types 5 --max_samples 5 · 记录 ms/step',
          deliverable:'cfl_smoke.json · 无 NaN/Inf 才解锁 P1-E2',
          blocks:'P1-E2 n=500',
          gate:'P1-F0 有改善信号',
          costNote: '2–4 GPU·h · ¥6–13 · 最高杠杆防翻车' },
        { id:'P1-E0', status:'run', name:'同步 geofwi_physics_core + 0001 patch', days:0.5, gpu:0,
          cmd:'bash patches/wsl/sync_physics_core.sh && patch -p1 < patches/wsl/0001-*.patch',
          deliverable:'import ok · grep apply_after_denoise',
          blocks:'一切采样实验' },
        { id:'P1-E1', status:'run', name:'ε_norm 统一 + proximal 冒烟', days:0.5, gpu:0,
          cmd:'python3 smoke_proximal.py · 统一 main.tex + bayesian_diffusion ε_norm=2e-3',
          deliverable:'[proximal] 日志 · ε 全文一致',
          blocks:'P1-E3 消融' },
        { id:'P1-E2', status:'run', name:'【Phase2】验证集基线 n=500（最大单项开销）', days:2, gpu:2,
          cmd:'python evaluate.py --dataset geofwi --split val --max_samples 500 --metrics cc,ssim,rmse,gfs',
          deliverable:'metrics_canonical.json 首版 · Table 1 四列',
          blocks:'主文定量 · 三篇联动',
          gate:'P1-F0b CFL pass',
          costNote: '20–48 GPU·h · ¥30–90 · 须 batch 正演' },
        { id:'P1-E3', status:'run', name:'【Phase1】近端消融 w/ vs w/o（50 val）', days:0.25, gpu:0.25,
          cmd:'同一 checkpoint · enabled=True/False · 同 seed 50 val',
          deliverable:'Ablation：ΔCC/ΔRMSE/||r_norm||',
          blocks:'Method 必要性',
          costNote: '2–5 GPU·h · ¥3–11' },
        { id:'P1-E4', status:'run', name:'【Week2】课程 N 消融：N=3 vs N=11（--max_samples 2000）', days:3, gpu:3,
          cmd:'python train_inversion.py --curriculum --max_samples 2000 · n_stages=3,11',
          deliverable:'Ablation 表 2 行 + 学习曲线 · 回答「为何 11 级而非 5 级」',
          blocks:'GCI 必要性 · 审稿必问',
          gate:'P1-F0 outcome A or B（非 C）· Week2 提升自 deferred' },
        { id:'P1-E5', status:'run', name:'主文 10 图缩减 + Algorithm 1 与代码对齐审查', days:1, gpu:0,
          cmd:'scripts/gc_fwi_professional.py · 对照 proximal_bridge 参数',
          deliverable:'F1–F10 清单 · Algorithm 1 终稿',
          blocks:'投稿格式' },
        { id:'P1-E6', status:'run', name:'残差 ‖r_norm‖ vs 内层 k 曲线（= P1-F0 产出）', days:0.5, gpu:0.5,
          cmd:'同 P1-F0 · 从 proximal_isolation_K5.json 聚合 summary_by_level 制图',
          deliverable:'Fig. residual_vs_k（mean±std [TBD]）',
          blocks:'P1-F0 机制草证（Remark 1 已落地）' },
        { id:'P1-E7', status:'run', name:'【P1 优先#1】residual–GFS Pareto 平面（推断顺带记录）', days:0.5, gpu:0.5,
          cmd:'evaluate.py --record_r_norm --settings none,dps,proximal,proximal_w2 · 同 val 50–500 样本',
          deliverable:'fig:residual_gfs_pareto · 四设置散点/前沿 [TBD]',
          blocks:'Geophysics 叙事 · vs Peng #47 未做维度 · EXPERIMENT_SURPRISE P1-S1' },
        { id:'P1-E9', status:'run', name:'【Week2】3×4 噪声矩阵 · band-limited 相干噪声', days:3, gpu:3,
          cmd:'run_noise_robustness_grid.py --methods dps,proximal_w2,gc_fwi --snr clean,20,10,5 --noise_type colored --subset salt',
          deliverable:'Table noise_3x4 · CC/RMSE/GFS × 3 methods × 4 SNR [TBD]',
          blocks:'vs Peng #47 · Geophysics 必要条件',
          gate:'P1-E2 checkpoint · 加噪管线' },
        { id:'P1-E8', status:'deferred', name:'课程顺序 + 同预算对比 Peng preconditioned guidance', days:3, gpu:3,
          cmd:'train_inversion.py --curriculum_order forward,reverse,random --max_samples 2000 · + Peng W₂ baseline row',
          deliverable:'fig:curriculum_order_ablation · N=11 三曲线 + W₂ 参照 [TBD]',
          blocks:'GCI 顺序必要性 · COMPETITIVE_LANDSCAPE',
          gate:'P1-F0 pass · P1-E7/E9 有信号' },
        { id:'P1-E10', status:'deferred', name:'低频缺失（<5 Hz 截断）× 课程 × W₂', days:2, gpu:2,
          cmd:'evaluate/train with --lowfreq_cutoff 5Hz · curriculum on/off × w2 on/off',
          deliverable:'fig:lowfreq_ablation [TBD]',
          blocks:'FWI 顶刊常见挑战 · 课程理论交叉点',
          gate:'P1-F0 pass' }
      ],
      deferred: [
        { name:'N ∈ {5,7,15} 完整课程消融', reason:'需额外 ≈4 GPU·day', when:'审稿 R1 后' },
        { name:'DiffusionFWI / SeisFusion / Peng #47 在 GeoFWI 上重跑', reason:'竞品复现 ≈2–4 GPU·day + 环境', when:'Major revision' },
        { name:'Peng #47 官方实现逐行复现', reason:'公平三方对比', when:'P1-E9 结果争议时' },
        { name:'全量 49,476 训练至收敛', reason:'>7 GPU·day', when:'camera-ready' },
        { name:'贝叶斯不确定性分解图 F9', reason:'MC dropout 50× 推理成本高', when:'补充材料' },
        { name:'OpenFWI 交叉验证', reason:'另一数据集全流程', when:'Paper 3 联动' }
      ]
    },
    {
      id: 'p2',
      tag: 'Paper 2 · GFS / GFS_λ',
      venue: 'Computers & Geosciences',
      goal: '证明：GFS 不仅是 CC 的替代相关量——按 GFS 选模型在 Δt 下游任务上更优（指标决策）',
      gpuBudget: '0 GPU·day（离线）',
      cpuBudget: '≈3–4 day',
      costRemark: '【修订】2 周矩阵 ≈¥0（P2-E7/E2/E5 本地 CPU）· OpenFWI 自训 Deferred 另计',
      runs: [
        { id:'P2-E7', status:'run', name:'【Day1 #0】合成扰动：(a) 平移 vs (b) 盐界错位', days:0.5, gpu:0,
          cmd:'cd paper2 && python scripts/run_paper2_experiments.py e7 --out analysis/results/paper2',
          deliverable:'Fig. synthetic_perturb — 零模型依赖 · Introduction 最干净证据',
          blocks:'全三篇 morale · 不依赖任何 checkpoint',
          priority: 0 },
        { id:'P2-E1', status:'run', name:'接入 GFS_λ（patch 0002 + gfs_wavelength.py）', days:0.5, gpu:0,
          cmd:'patch -p1 < patches/wsl/0002-evaluate-gfs_lambda.patch',
          deliverable:'evaluate 输出含 gfs_lambda 字段',
          blocks:'P2-E2' },
        { id:'P2-E2', status:'run', name:'GeoFWI 测试集：CC / SSIM / GFS / GFS_λ 四指标批量', days:1, gpu:0,
          cmd:'python scripts/compute_metrics_from_predictions.py --pred_dir analysis/results/',
          deliverable:'metrics.csv（每样本 4 列）',
          blocks:'散点图与分层' },
        { id:'P2-E3', status:'run', name:'盐体+断层子集：2 例 paradox（高 CC 低 GFS）', days:1, gpu:0,
          cmd:'按 geofwi-size-layer-fault-salt 标签筛 salt/fault · 禁手挑以外样本',
          deliverable:'Figure 1 双案例 + -caption',
          blocks:'Introduction 动机图' },
        { id:'P2-E4', status:'run', name:'GFS vs CC 散点（geo_type 着色）+ Spearman ρ', days:0.5, gpu:0,
          cmd:'analysis 脚本 · 全测试集非 cherry-pick',
          deliverable:'Figure 2 · ρ_CC,GFS [TBD]',
          blocks:'Results 主图' },
        { id:'P2-E5', status:'run', name:'【Week1】全测试集 Δt_first 系统性分析 + top-20% 对比', days:1, gpu:0,
          cmd:'python patches/wsl/run_top20_traveltime_test.py metrics.csv · 全测试集 · 禁 cherry-pick',
          deliverable:'Table: CC-top20% vs GFS-top20% mean Δt · CC-top 内高 Δt 比例 · ρ(GFS,−Δt) [TBD]',
          blocks:'Paper 2 统计显著性 · P2-E8 前置' },
        { id:'P2-E8', status:'run', name:'【P2 核心】指标决策：CC-top20% vs GFS-top20% 下游 Δt', days:0.5, gpu:0,
          cmd:'同 P2-E5 输出 · fig:gfs_decision_delta_t',
          deliverable:'GFS-top mean Δt 系统性更低？[TBD] — 无替代实验',
          blocks:'Paper 2 唯一救命稻草 · EXPERIMENT_SURPRISE P2-S1' },
        { id:'P2-E6', status:'run', name:'5 类地质分层 Kendall τ（粗分层，非 30 类全做）', days:1, gpu:0,
          cmd:'flat / fold / fault / salt / mixed 五桶',
          deliverable:'Table：τ(CC,GFS) · τ(CC,GFS_λ) [TBD]',
          blocks:'分层一致性_claim' }
      ],
      deferred: [
        { name:'30 类地质全分层 Kendall τ', reason:'标注整理 ≈2 day', when:'revision' },
        { name:'OpenFWI 自训 InversionNet + VelocityGAN', reason:'≈3–5 GPU·day', when:'有算力窗口' },
        { name:'Das 2019 / Wu 2021 上传 PDF 预测复现', reason:'需对齐预处理', when:'有预测文件' },
        { name:'Soft-GFS 可微训练实验', reason:'训练环改动', when:'方法扩展稿' },
        { name:'Matching-filter 完整实现（#20）', reason:'需波形级管线', when:'与 Peng W₂ 合并' },
        { name:'野外/工业数据验证', reason:'数据许可', when:'远期' }
      ]
    },
    {
      id: 'p3',
      tag: 'Paper 3 · 训练语料地质意义',
      venue: 'JGR: Machine Learning and Computation',
      goal: '证明：同架构下 GeoFWI（地质过程生成）训练 vs OpenFWI+LDM 统计扩增，在 Marmousi2/SEG Salt 上 GFS_λ 结构质量差异（vs Feng #48 scaling 叙事）',
      gpuBudget: '≈4–5 GPU·day（云 GPU，见 compute.tiers 缩放）',
      cpuBudget: '≈2 day',
      costRemark: '【修订】Phase2–3 · ¥25–100 · P3-E9 三组训练在 P1 checkpoint 后',
      runs: [
        { id:'P3-E1', status:'run', name:'Marmousi2 下载 + 重采样至 GeoFWI 100×100 网格', days:1, gpu:0,
          cmd:'预处理脚本 · dx/f0 写入 config · 观测系统对齐检查',
          deliverable:'datasets/marmousi2_geofwi_grid.npz',
          blocks:'一切迁移实验' },
        { id:'P3-E2', status:'deferred', name:'零样本 (N=0) GeoFWI 预训练 → Marmousi2（对照行）', days:0.5, gpu:0.5,
          cmd:'evaluate.py --checkpoint geofwi --target marmousi2',
          deliverable:'CC/SSIM/GFS_λ [TBD] 一行 · 非主 claim',
          blocks:'Feng #48 / GeoFWI SGDS 已覆盖类似叙事',
          note:'降级为 P3-E9 对照附表' },
        { id:'P3-E3', status:'run', name:'少样本 N=10 · 冻结 encoder 只训 decoder', days:2, gpu:2,
          cmd:'few_shot_finetune · freeze_body=True · 3 seeds',
          deliverable:'mean±std CC/SSIM/GFS_λ',
          blocks:'数据效率_claim' },
        { id:'P3-E4', status:'run', name:'对照：scratch N=50 vs 预注册假设基准 N=500', days:2, gpu:2,
          cmd:'train scratch N=50 与 N=500 · Method 已写可证伪假设 · 如实报告',
          deliverable:'验证/否定 N=50≥N=500 · CC/GFS_λ [TBD]',
          blocks:'WRITING_EXPERIMENT_PLAYBOOK #5' },
        { id:'P3-E5', status:'run', name:'子波频谱匹配（15 Hz Ricker 对齐）', days:0.5, gpu:0,
          cmd:'CHECKLIST wavelet_match 最小版 · 迁移前一步',
          deliverable:'Methods 段落 + 对齐前后频谱图',
          blocks:'公平对比' },
        { id:'P3-E6', status:'run', name:'域差距剂量-反应曲线（MMD vs 迁移 CC/GFS_λ）', days:0.5, gpu:0,
          cmd:'latent MMD [TBD] · Marmousi2/SEG Salt/Overthrust 排序 · 连成 Fig. domain_dose',
          deliverable:'Fig. domain_dose — 非三个孤立点',
          blocks:'WRITING_EXPERIMENT_PLAYBOOK #7' },
        { id:'P3-E7', status:'run', name:'编码震源算力估算（simultaneous_source 离线）', days:0.5, gpu:0,
          cmd:'make_encoding_plan(n_shots=50,n_super=3) · estimate_pde_budget',
          deliverable:'Discussion 一段：PDE 调用降 ≈94% [理论]',
          blocks:'算力叙事' },
        { id:'P3-E9', status:'run', name:'【P3 主实验】三组预训练语料 ablation', days:5, gpu:5,
          cmd:'同架构 train A=geofwi B=openfwi C=openfwi_ldm_aug · fine-tune N=10,50 · eval marmousi2,seg_salt · gfs_lambda primary',
          deliverable:'fig:geo_vs_stat_training · 数据质量 vs 数量 [TBD]',
          blocks:'vs Feng #48 · Paper 2 GFS 联动 · EXPERIMENT_SURPRISE P3-S2',
          gate:'P1-E2 checkpoint · P2 GFS_λ 管线' },
        { id:'P3-E8', status:'deferred', name:'迁移失败根因分解（子波 vs 结构 MMD）', days:2, gpu:1,
          cmd:'子波匹配前后 MMD · GFS_λ 方差分解 · Marmousi2/SEG/Overthrust',
          deliverable:'fig:transfer_failure_decomposition [TBD]',
          blocks:'JGR 补充诊断 · 次于 P3-E9',
          gate:'P3-E9 主结果' }
      ],
      deferred: [
        { name:'SEG Salt + Overthrust 两目标域', reason:'+≈6 GPU·day', when:'P3 扩展实验' },
        { name:'15 实验 × 3 seed 全矩阵', reason:'原设计 ≈20 GPU·h × 45 run', when:'revision' },
        { name:'N=50/100/500 全 shot 曲线', reason:'需 P3-E3/E4 先完成', when:'主_claim 成立后' },
        { name:'DANN + Deep CORAL 基线', reason:'需域标签 + 训练改动', when:'审稿人要求' },
        { name:'MMD latent + #46 互相关对齐', reason:'特征提取管线', when:'方法补强' },
        { name:'Image-to-Model（RTM 偏移图迁移）', reason:'新分支', when:'炮检不匹配无法解决时' },
        { name:'EFWI Vp/Vs 双参数迁移', reason:'架构手术', when:'远期' },
        { name:'simultaneous_source 接入扩散采样环', reason:'依赖 P1 patch 稳定', when:'与 P1 合并' }
      ]
    }
  ],
  weekPlan: [
    { week:1, focus:'Day1 P2-E7 + P1-E0/E1 · P1-F0 · P2-E2/E5/E8',
      items:['P2-E7','P1-E0','P1-E1','P1-F0','P2-E1–E2','P2-E5','P2-E8','P1-E7'] },
    { week:2, focus:'P1-E2/E4/E9 · P2 paradox/τ · P3-E9 · TRI-E1',
      items:['P1-E2','P1-E4','P1-E9','P2-E3–E6','P3-E9','TRI-E1'] }
  ],
  trilogy: {
    id: 'TRI-E1',
    tag: '三篇联动',
    goal: '物理-地质-迁移闭环：三反直觉案例证明缺任一评估维度都会误判',
    runs: [
      { id:'TRI-E1', status:'run', name:'闭环验证 · 三反直觉样本表', days:1, gpu:0,
        cmd:'从 P1 反演 + P2 metrics + P3 迁移结果筛 CC/GFS/transfer 分歧最大各 1 例',
        deliverable:'Table + Discussion 三案例 · EXPERIMENT_SURPRISE.trilogyLoop',
        blocks:'三篇体系化叙事' }
    ]
  }
};

/* ════ 三篇论文 WSL 实验工作区（bp-diff-fwi-complex） ════ */
var RESEARCH_WORKSPACE = {
  name: 'bp-diff-fwi-complex',
  description: 'GC-FWI / GFS / 迁移学习 — 三篇论文统一代码与实验目录（约 7.6G）',
  integrityStatus: '2026-06-29: 同行审稿分析入 advisor · P2 tex 修复进行中 · P1 w/o both 消融待跑',
  paperPriority: 'Day1 P2 review fixes (τ/std/Peng-Feng) → P1 w/o both ablation → P2 physics n≥500 → P2 先投 Geophysics',
  wslDistro: 'Ubuntu-22.04',
  linuxPath: '/root/projects/bp-diff-fwi-complex',
  windowsUnc: '\\\\wsl.localhost\\Ubuntu-22.04\\root\\projects\\bp-diff-fwi-complex',
  vhdxPath: 'E:\\WSL\\Ubuntu-22.04\\ext4.vhdx',
  advisorPath: 'E:\\个人项目',
  publicSiteUrl: 'https://wenjie119.github.io/Wenjie119/',
  publicSiteRef: 'ADVISOR_SITE',
  wslAdvisorPath: '/root/projects/bp-diff-fwi-complex/advisor',
  paper2Path: 'E:\\个人项目\\paper2',
  paper2WslPath: '/root/projects/bp-diff-fwi-complex/paper2',
  bp2004WslPath: '/root/projects/bp-diff-fwi-complex/datasets/BP2004',
  wslAdvisorWindowsUnc: '\\\\wsl.localhost\\Ubuntu-22.04\\root\\projects\\bp-diff-fwi-complex\\advisor',
  openclawBackendLocal: 'http://127.0.0.1:6006/execute',
  keyDirs: [
    { id: 'datasets', path: 'datasets/', desc: 'GeoFWI · BP2004（bp2004_salt_slice.npy）' },
    { id: 'checkpoints', path: 'checkpoints/', desc: '训练权重' },
    { id: 'analysis', path: 'analysis/results/', desc: 'GFS/指标/图表数据' },
    { id: 'scripts', path: 'scripts/', desc: '指标与制图脚本' },
    { id: 'docs', path: 'docs/', desc: '操作手册 · INTEGRATION_WSL' }
  ],
  keyDocs: [
    { path: 'GeoFWI_全流程操作手册.md', desc: '主操作手册 v3.4.2 · Phase 门控 · 按天命令' },
    { path: 'paper2/drafts/paper2_manuscript_draft.tex', desc: 'Paper 2 LaTeX 初稿（Codex 2026-06-24）' },
    { path: 'paper2/drafts/ALIGNMENT_NOTE.md', desc: '初稿 vs paper2_gfs 公式对齐说明' },
    { path: 'docs/INTEGRATION_WSL.md', desc: 'geofwi_physics_core 接入 · P1-F0 · 预算' },
    { path: 'advisor/index.html', desc: 'Paper Advisor 主副本 · start_advisor.sh 启动' },
    { path: 'docs/advisor/index.html', desc: 'Paper Advisor 镜像（与 advisor/ 同步）' },
    { path: 'advisor/config_data.js', desc: '顾问数据 v3.4.2 · 须与 index.html 成对更新' },
    { path: 'paper2/README.md', desc: 'Paper 2 独立工程 · GFS 实验 + Codex 审查' },
    { path: '项目管理与全流程风险.md', desc: '环境踩坑 · 路径 · 三篇隔离' },
    { path: 'DATA_PROVENANCE.md', desc: '指标/data 真实性' }
  ],
  syncDocsCmd: 'bash /mnt/e/个人项目/patches/wsl/sync_operations_docs.sh',
  syncPaper2Cmd: 'bash /mnt/e/个人项目/patches/wsl/sync_paper2_all.sh',
  syncBp2004Cmd: 'bash /mnt/e/个人项目/patches/wsl/download_bp2004.sh',
  syncWebCmd: 'bash /mnt/e/个人项目/patches/wsl/sync_advisor_web.sh',
  wslStartAdvisorCmd: 'bash /root/projects/bp-diff-fwi-complex/advisor/start_advisor.sh',
  keyScripts: [
    { name: 'train_inversion.py', desc: 'Paper 1 — GC-FWI 训练' },
    { name: 'evaluate.py', desc: 'Paper 1 — 评估与指标' },
    { name: 'scripts/compute_metrics_from_predictions.py', desc: 'Paper 2 — GFS 等指标' },
    { name: 'scripts/compute_gci_and_curriculum_stages.py', desc: 'Paper 1 — GCI 课程分级' },
    { name: 'DATA_PROVENANCE.md', desc: '数据来源真实性说明' }
  ],
  paperMap: [
    { paper: 'Paper 1 GC-FWI', focus: 'GeoFWI: datasets/geofwi.npy · Proximal guidance: models/bayesian_diffusion.py · 课程: train_inversion.py --curriculum · 稿: main.tex' },
    { paper: 'Paper 2 GFS', focus: 'paper2/ · compute_metrics_from_predictions.py · BP2004 salt slice · analysis/results/' },
    { paper: 'Paper 3 Transfer', focus: 'datasets/ · evaluate.py · 跨域实验脚本' }
  ],
  wslStartCmd:
    'wsl -d Ubuntu-22.04 -e bash -lc "cd /root/projects/bp-diff-fwi-complex && pip install -q fastapi uvicorn pydantic && OPENCLAW_WORKSPACE=/root/projects/bp-diff-fwi-complex OPENCLAW_PORT=6006 python /mnt/e/个人项目/agent_backend.py"',
  paper1: 'PAPER1_WSL'
};

/* ════ Paper 1 — WSL 代码关联（GeoFWI + 近端引导 + 课程学习） ════ */
var PAPER1_WSL = {
  title: 'Paper 1 · GeoFWI + Non-linear Proximal Guidance + 11级课程学习',
  subtitle: '网页顾问中的概念 ↔ bp-diff-fwi-complex 中的实现文件',
  wslRoot: '/root/projects/bp-diff-fwi-complex',
  pillars: [
    {
      id: 'geofwi',
      title: 'GeoFWI 数据集',
      advisorLink: 'design-panorama · Paper 1 目标指标 CC/SSIM/RMSE',
      summary: '主实验基准：49,476 train + 验证/测试；30 种地质结构 → 11 级复杂度',
      files: [
        { path: 'datasets/geofwi.npy', role: '速度模型主库 (mmap)' },
        { path: 'datasets/geofwi-size-layer-fault-salt-1-10.npy', role: '层/断/盐结构标签' },
        { path: 'datasets/GeoFWI/', role: 'GeoFWI 1.0 分块数据' },
        { path: 'utils/datasets.py', role: 'GeoFWIDataset · GCFWICurriculumScheduler' }
      ],
      verifyCmd: 'python -c "import numpy as np; d=np.load(\'datasets/geofwi.npy\', mmap_mode=\'r\'); print(\'GeoFWI\', d.shape)"'
    },
    {
      id: 'proximal_guidance',
      title: 'Non-linear Proximal Guidance',
      advisorLink: 'p1-method · Algorithm 1 · ε_norm=2×10⁻³',
      summary: '每步 DDPM 去噪后 K 次伴随梯度近端引导；waveop 正演 + w2_guidance 混合似然',
      files: [
        { path: 'models/bayesian_diffusion.py', role: 'BayesianDiffusionModel · apply_physics_constraints → proximal_bridge' },
        { path: 'geofwi_physics_core/proximal_bridge.py', role: 'K-step 近端环 · Algorithm 1 参数 ε_norm/K/α' },
        { path: 'geofwi_physics_core/INTEGRATION_WSL.md', role: 'WSL 接入说明 + patches/wsl/*.patch' },
        { path: 'tasks/inversion.py', role: 'DiffusionEnhancedPhysicsConstrainedInversion' },
        { path: 'waveop/waveop.cpython-310-x86_64-linux-gnu.so', role: 'C++ 波场正演扩展' },
        { path: 'scripts/gc_fwi_professional.py', role: 'plot_figure1_hard_manifold_concept · figure1a_hard_projection' }
      ],
      verifyCmd: 'grep -n apply_after_denoise models/bayesian_diffusion.py | head -3  # expect ≥1 after apply_integrity_fixes.sh'
    },
    {
      id: 'curriculum',
      title: '11级 GCI 地质课程学习',
      advisorLink: 'design-panorama · GCI 11级 · CHECKLIST gci_metrics_tbd',
      summary: 'GCFWITrainer 11 级渐进；GCI 由 geofwi 结构映射，输出 gci_stages.json',
      files: [
        { path: 'train_inversion.py', role: 'GCFWITrainer · --curriculum 开关' },
        { path: 'scripts/compute_gci_and_curriculum_stages.py', role: '30类→11级 + 代表样本' },
        { path: 'analysis/results/gci_stages.json', role: '课程阶段索引（已生成）' },
        { path: 'scripts/gc_fwi_professional.py', role: 'plot_figure4_curriculum_learning · figure1b_curriculum' }
      ],
      verifyCmd: 'python scripts/compute_gci_and_curriculum_stages.py --max_samples 500'
    },
    {
      id: 'physics_core',
      title: '物理奠基模块（本地）',
      advisorLink: 'AGENT_LIT_PLAYBOOK.physicsCoreModules · 审稿理论审计 · 地雷一/二/三',
      summary: 'W₂ 引导 / GFS_λ / 编码震源 — 同步自 e:\\个人项目\\geofwi_physics_core',
      files: [
        { path: 'geofwi_physics_core/INTEGRATION_WSL.md', role: '接入说明（先读）' },
        { path: 'patches/wsl/sync_physics_core.sh', role: 'Windows→WSL 一键同步' },
        { path: 'geofwi_physics_core/proximal_bridge.py', role: 'Paper 1 · 采样环桥接' },
        { path: 'geofwi_physics_core/w2_guidance.py', role: 'Paper 1 · W₂-hybrid 似然引导步' },
        { path: 'geofwi_physics_core/gfs_wavelength.py', role: 'Paper 2 · GFS_λ + select_tau_global' },
        { path: 'geofwi_physics_core/paper2_physics_metrics.py', role: 'Paper 2 · Δt_first / E_mig' },
        { path: 'geofwi_physics_core/simultaneous_source.py', role: 'Paper 3 · 编码震源矩阵' }
      ],
      verifyCmd: 'python -c "from geofwi_physics_core import proximal_bridge, w2_guidance, gfs_wavelength, simultaneous_source; print(\'ok\')"'
    }
  ],
  manuscript: { tex: 'main.tex', pdf: 'main.pdf', desc: 'Geophysics 投稿 LaTeX 源稿' },
  trainEvaluate: [
    { cmd: 'python scripts/compute_gci_and_curriculum_stages.py', desc: '生成 GCI 11 级划分' },
    { cmd: 'python train_inversion.py --dataset geofwi --curriculum', desc: 'GC-FWI 课程训练' },
    { cmd: 'python evaluate.py', desc: '反演评估 · CC/SSIM/RMSE' },
    { cmd: 'python scripts/gc_fwi_professional.py', desc: 'Paper 1 主图（近端引导+课程）' }
  ],
  checklistToCode: [
    { check: 'eps_dual', file: 'main.tex + models/bayesian_diffusion.py', note: 'ε_proj（约束）vs ε_norm（评估）— grep 代码后再改论文' },
    { check: 'n_ablation', file: 'train_inversion.py', note: 'N∈{3,5,7,11,15} 消融' },
    { check: 'alg1', file: 'main.tex §Method', note: 'Algorithm 1 与 inversion 投影步对齐' },
    { check: 'diffusion_ref', file: 'evaluate.py · Table 基线', note: '对比 DiffusionFWI/SeisFusion' },
    { check: 'rw_hard_line', file: 'main.tex §Related Work', note: '纳入 #39–#42，正面回应 DPS 含噪失败' },
    { check: 'noise_robust', file: 'evaluate.py · 加噪消融', note: '近端引导 vs MCG/DPS 式软引导' }
  ],
  openclawPrompts: [
    'bash patches/wsl/apply_integrity_fixes.sh — 同步 physics_core + 近端 patch + DATA_PROVENANCE.md',
    '手动核实: cat analysis/results/baseline_metrics.json · grep np.random scripts/gc_fwi_professional.py',
    '运行 compute_gci_and_curriculum_stages.py 并检查 gci_stages.json 是否覆盖 11 个 stage',
    '修改 gc_fwi_professional.py：ε 标注区分 ε_proj（算法）与 ε_norm（评估）；数值以 bayesian_diffusion.py 为准',
    '撰写 main.tex Related Work：医疗线性硬投影 #39–#42 vs 非线性近端引导（见 PAPER1_RELATED_WORK）'
  ]
};

/* ════ Paper 1 — Related Work 英文草稿（可直接粘贴 main.tex） ════ */
var PAPER1_RELATED_WORK = {
  title: 'Paper 1 · Non-linear Proximal Guidance — Related Work 草稿',
  updated: '2026-06-19',
  targetFile: 'main.tex §Related Work + §Discussion（非线性近端引导理论回应）',
  logicOutline: [
    '纠正：FWI 正向算子 F 非线性（PDE），不存在封闭硬投影 Π_M；禁称每步精确投影',
    '承认：Song/Chung 医疗硬投影仅因 F 线性才有封闭解；GC-FWI 实为伴随梯度近端引导',
    'Defense 核心：每步 K 次伴随状态梯度纠偏 score（非嵌套完整 FWI）；11 级 GCI warm start',
    '实验：近端引导 vs DPS/MCG 软引导加噪消融（[TBD]）；报告 ms/step 物理开销'
  ],
  bibKeys: [
    'song2022medical', 'chung2022mcg', 'chung2023dps', 'song2024harddc',
    'gao2024diffusionfwi', 'wang2024seisfusion', 'song2021scoresde',
    'liu2026conddiff', 'taufik2026bayesian'
  ],
  relatedWorkTex:
    '\\subsection{Score-Based Diffusion with Data Consistency for Inverse Problems}\n' +
    'Score-based diffusion models have been applied to inverse problems in medical imaging,\n' +
    'where the forward operator $\\mathcal{F}$ is often \\emph{linear} (e.g., Fourier subsampling,\n' +
    'masking, or matrix multiplication).\n' +
    'Song et al.\\ (2022) enforce \\emph{hard data consistency} by projecting each denoised iterate\n' +
    'onto a measurement-consistency \\emph{hyperplane} after every reverse step---feasible because\n' +
    'linear $\\mathcal{F}$ admits a closed-form projection in milliseconds.\n' +
    'Chung et al.\\ (2022, MCG) and Chung et al.\\ (2023, DPS) extend this line with manifold\n' +
    'gradient guidance and posterior sampling; DPS reports that strict hard projection\n' +
    '``fail dramatically\'\' under measurement noise in linear settings.\n\n' +
    'Full-waveform inversion differs fundamentally: the acoustic wave-equation forward operator\n' +
    '$\\mathcal{F}(\\mathbf{v})$ is \\emph{highly nonlinear}. There is no known closed-form map\n' +
    '$\\Pi_{\\mathcal{M}}$ that projects a velocity grid onto\n' +
    '$\\mathcal{M}=\\{\\mathbf{v}:\\|\\mathbf{d}-\\mathcal{F}(\\mathbf{v})\\|_2^2\\le\\epsilon\\}$.\n' +
    'A literal per-step hard projection would require nested iterative FWI (e.g., Gauss--Newton\n' +
    'with adjoint states) at \\emph{each} of $T{\\approx}1000$ diffusion steps---a prohibitive\n' +
    'computational cost, not a fast surrogate for conventional FWI.\n\n' +
    'GC-FWI therefore does \\emph{not} claim closed-form hard projection onto $\\mathcal{M}$.\n' +
    'Instead, we apply \\textbf{non-linear proximal guidance}: after each DDPM denoising step,\n' +
    'we compute $\\nabla_{\\mathbf{v}} \\|\\mathbf{r}_{\\mathrm{norm}}(\\mathbf{v})\\|_2^2$ via adjoint-state modeling\n' +
    'and update $\\mathbf{v}_{t-1} \\leftarrow \\tilde{\\mathbf{v}}_{t-1} + \\alpha\\nabla_{\\mathbf{v}}\\log p_t(\\mathbf{v}) - \\beta\\nabla_{\\mathbf{v}}\\|\\mathbf{r}_{\\mathrm{norm}}\\|^2$\n' +
    '(likelihood term uses a \\emph{minus} sign for descent; code: \\texttt{proximal\\_bridge.py}),\n' +
    'optionally with $K{\\ll}T$ inner gradient steps; algorithm constraint\n' +
    '$\\varepsilon_{\\mathrm{proj}}=5\\times10^{-4}$ (verify in code), evaluation physics-score\n' +
    'uses $\\varepsilon_{\\mathrm{norm}}=2\\times10^{-3}$ --- two symbols, do not blind unify.\n' +
    'We combine this physics guidance with an 11-stage GCI curriculum that supplies a geological\n' +
    'warm start before high-contrast salt/fault scenarios (\\S\\ref{sec:proximal-defense}).\n\n' +
    '\\paragraph{Explicit comparison to closest diffusion-FWI baselines.}\n' +
    'Compared to Diffusion Posterior Sampling \\citep{chung2023dps}, SeisFusion \\citep{li2024seisfusion}, and DiffusionFWI \\citep{gao2024}, GC-FWI differs in three ways:\n' +
    '(1)~\\textbf{Physics operator:} adjoint-state proximal gradient on the \\emph{velocity grid} after each DDPM step;\n' +
    '(2)~\\textbf{Nonlinear FWI:} no closed-form $\\Pi_{\\mathcal{M}}$---$K{\\ll}T$ inner gradient corrections;\n' +
    '(3)~\\textbf{Curriculum + misfit:} 11-stage GCI warm start and optional $W_2^2{\\rightarrow}L_2$ hybrid guidance \\citep{peng2026}.',
  limitationsTex:
    '\\section{Limitations}\n' +
    '(1) Fixed $K{=}5$ proximal steps do not guarantee descent on strongly nonconvex wave-equation misfits; Fig.~\\ref{fig:residual_vs_k} reports empirical behavior.\n' +
    '(2) Zero-shot transfer to salt-dominated targets is expected to degrade (Paper~3 dose--response curve).\n' +
    '(3) Elastic FWI extension requires $V_p/V_s$ architecture changes.\n' +
    '(4) GFS$_\\lambda$ and MMD depend on grid metadata and wavelet harmonization.',
  discussionDefenseTex:
    '\\subsection{Non-linear Proximal Guidance vs.\\ Medical Hard Projection}\n' +
    '\\label{sec:proximal-defense}\n' +
    'We explicitly distinguish GC-FWI from medical hard data consistency (Song et al., 2022).\n' +
    'Their linear $\\mathcal{F}$ yields a tractable projection; FWI does not.\n' +
    'Our per-step physics operator is a \\emph{proximal gradient correction} to the score,\n' +
    'not an exact projection onto the wave-equation manifold.\n\n' +
    'Three design choices keep this tractable and physically meaningful.\n' +
    'First, each reverse step uses at most $K$ adjoint-gradient updates (typically $K{\\in}\\{1,3,5\\}$),\n' +
    'not a full converged FWI inversion---reported as ms per diffusion step in Implementation.\n' +
    'Second, normalized residual $\\mathbf{r}_{\\mathrm{norm}}$, algorithm threshold $\\varepsilon_{\\mathrm{proj}}$, and evaluation metric $\\varepsilon_{\\mathrm{norm}}$\n' +
    'are defined separately (grep \\texttt{bayesian\\_diffusion.py} before unifying); optional band-pass weighting or $\\mathbf{C}_d^{-1}$-weighted\n' +
    'misfit prevents fitting unphysical high-frequency noise (Discussion, \\S\\ref{sec:noise-ablation}).\n' +
    'Third, the 11-stage GCI curriculum provides warm starts so gradient guidance operates in a\n' +
    'basin of the nonconvex misfit landscape rather than from random initialization.\n' +
    'Ablation without curriculum ($N{=}1$): [TBD]. Noise robustness vs.\\ DPS/MCG-style guidance: [TBD].',
  noiseAblationStub:
    '\\subsection{Noise Robustness: Proximal Guidance vs.\\ Soft Guidance}\n' +
    '\\label{sec:noise-ablation}\n' +
    'We inject additive noise (white and colored surface-wave components) into synthetic shot\n' +
    'gathers at SNR $\\in \\{30, 20, 10\\}$\\,dB and compare GC-FWI proximal guidance against\n' +
    'MCG-style and DPS-style likelihood guidance on the GeoFWI test set.\n' +
    'Metrics: CC, SSIM, RMSE, GFS, and ms per diffusion step.\n' +
    'Results: [TBD --- run evaluate.py with --noise_snr flag before submission].',
  paper2Note:
    'Paper 2 独立物理标尺：初至走时残差 $\\Delta t_{\\mathrm{first}}$、零偏移距偏移波场误差 $E_{\\mathrm{mig}}$；' +
    '对 InversionNet 等 MSE 模糊预测正演合成波形，证明 CC 高分模型走时残差仍大，GFS 与走时残差单调相关。',
  paper3Note:
    'Paper 3 核心问题重定位：什么决定迁移成败（子波/结构/炮检）？MMD 因果分解 + 剂量-反应曲线；' +
    'Discussion 放三篇闭环反直觉案例（见 EXPERIMENT_SURPRISE.trilogyLoop）。EFWI 远期。'
};

/* ════ 科学贡献 · 实验 surprise 升级（2026-06-19） ════ */
var EXPERIMENT_SURPRISE = {
  updated: '2026-06-19 · v3.4.0 competitive landscape',
  coreDiagnosis:
    '三篇目前本质都是 benchmark evaluation，且面临 2026 同期竞品（Peng W₂ diffusion #47、Feng 十亿参数 scaling #48、GeoFWI 原文 SGDS 基线）。' +
    '缺的不是数据量，而是相对竞品的差异化 surprise 与更难实验条件（噪声/低频/地质过程数据）。',
  reviewerQuestion: 'If this method/metric did not exist, what could I not do? — And why not just use Peng/Feng 2026?',
  papers: [
    {
      id: 'p1', tag: 'Paper 1 · GC-FWI',
      gap: 'Peng #47 已实现 W₂ 引导并在 OpenFWI 跑通；GeoFWI 原文已有 diffusion 基线。仅「也做 diffusion + 课程」区分度不足。',
      surpriseTarget:
        'P1-E7：residual–GFS Pareto（Peng 未做）。P1-E9：低 SNR 下 GC-FWI（课程）vs DPS vs W₂ 三方对比 — 文献空白。P1-E10：低频缺失 × 课程交叉。',
      upgrades: [
        {
          id: 'P1-S1', priority: 1, title: '物理一致性分解 · residual–GFS 平面',
          design:
            '推断时记录每样本 ||r(v)|| 与 GFS；横轴 residual、纵轴 GFS。四设置：(a)无引导 (b)DPS (c)GC-FWI近端 (d)GC-FWI+W₂。',
          expected:
            'GC-FWI 在 residual–GFS 平面形成 Pareto 前沿——既物理一致又地质正确；叙事从像素指标升级为多目标权衡。',
          cost: '≈0.5 day · 无额外训练 · 推断时顺带记录',
          matrixId: 'P1-E7',
          figure: 'fig:residual_gfs_pareto'
        },
        {
          id: 'P1-S3', priority: 4, title: '3×4 噪声矩阵 · band-limited 相干噪声（vs Peng #47）',
          design:
            '行：DPS(L₂) / Peng W₂ / GC-FWI。列：clean / 20 / 10 / 5 dB。**band-limited 相干噪声**（面波/工业频段），禁仅白噪声作主结果。' +
            'GeoFWI salt 子集 · 报告 CC、RMSE、GFS。',
          expected:
            '低 SNR 下课程+W₂ 协同 vs OT 鲁棒性 — 正负均可写；Peng 2026 未做此 SNR×方法系统表。',
          cost: '≈3 GPU·day · Week2 · gate: P1-E2 checkpoint',
          matrixId: 'P1-E9',
          figure: 'tab:noise_3x4'
        },
        {
          id: 'P1-S2', priority: 4, title: '课程顺序 + 低频缺失',
          design:
            'P1-E8：反向/随机课程 vs 正向 · 同算力对比 Peng preconditioned guidance（非仅顺序消融）。' +
            'P1-E10：<5 Hz 截断 · 有/无课程 × 有/无 W₂。',
          expected:
            '反向显著更差 → GCI 顺序关键；低频缺失下课程+W₂ 协同 — 与 Peng OpenFWI 结果形成 GeoFWI 更难基准对照。',
          cost: '≈3–4 GPU·day · gate: P1-F0',
          matrixId: 'P1-E8 / P1-E10',
          figure: 'fig:curriculum_order_ablation · fig:lowfreq_ablation'
        }
      ]
    },
    {
      id: 'p2', tag: 'Paper 2 · GFS',
      gap: 'CC≠GFS 用合成扰动可证，但审稿人会说 toy；缺「按 GFS 排序比按 CC 排序更对勘探有用」的因果效用。',
      surpriseTarget: '从相关性 → 指标决策：GFS top-20% 在走时预测下游任务上系统性优于 CC top-20%。',
      upgrades: [
        {
          id: 'P2-S1', priority: 2, title: '指标决策 · top-20% 下游走时验证',
          design:
            '同一批反演结果：分别按 CC、按 GFS 取 top-20% 模型；用 F(v) 正演，比 Δt_first（paper2_physics_metrics）。',
          expected:
            'GFS-top 在走时误差上系统性更优 → 从「另一种角度」升级为「更预测勘探结果」；顶刊指标论文必要条件。',
          cost: '≈1 day CPU · 已有正演算子',
          matrixId: 'P2-E8',
          figure: 'fig:gfs_decision_delta_t'
        }
      ]
    },
    {
      id: 'p3', tag: 'Paper 3 · Training Data Geology',
      gap: 'Feng #48 十亿参数 + OpenFWI LDM 扩增已在 Marmousi/Overthrust 等六基准 SOTA；「GeoFWI 预训练零样本迁移」区分度极低。',
      surpriseTarget:
        '从「迁移实验」→「训练语料地质物理意义」：同架构在 GeoFWI（过程生成）vs OpenFWI+统计扩增上训练，Marmousi2/SEG Salt 上用 GFS_λ 评结构质量。',
      upgrades: [
        {
          id: 'P3-S2', priority: 3, title: '三组训练语料 · 地质过程 vs 统计扩增（vs Feng #48）',
          design:
            '固定架构与算力 · 预训练 (A) GeoFWI (B) OpenFWI 原始 (C) OpenFWI+LDM 扩增（类 Feng）。' +
            'Marmousi2 + SEG Salt · fine-tune N=10, 50 · **主指标 GFS_λ**，辅 CC/SSIM。',
          expected:
            'GeoFWI 训练在 GFS 上系统性更优 → 「地质物理合理数据 > 统计海量数据」；若否 → 诚实报告 Feng scaling 优势。',
          cost: '≈5 GPU·day · gate: P1-E2',
          matrixId: 'P3-E9',
          figure: 'fig:geo_vs_stat_training'
        },
        {
          id: 'P3-S1', priority: 5, title: '物理域诊断 · 失败根因分解',
          design:
            'Marmousi2 / SEG Salt：子波匹配前后 MMD；迁移 GFS_λ 分解为子波项+结构项；方差分解图。',
          expected:
            'JGR 补充叙事：诊断框架，次于 P3-E9 主 claim。',
          cost: '写作可先 reposition；实验待 P3-E9',
          matrixId: 'P3-E8',
          figure: 'fig:transfer_failure_decomposition'
        }
      ]
    }
  ],
  trilogyLoop: {
    title: '三篇联动 · 物理-地质-迁移闭环',
    thesis:
      'P1 反演 + P2 GFS_λ 评估 + P3 迁移框架 → 证明三者构成完整 FWI 评估体系，缺任一都会导致对模型性能的错误判断。',
    counterIntuitiveCases: [
      { id: 'A', cc: '高', gfs: '低', transfer: '好', lesson: 'CC 会误导迁移决策' },
      { id: 'B', cc: '低', gfs: '高', transfer: '好', lesson: 'GFS 是更好的迁移代理指标' },
      { id: 'C', cc: '高', gfs: '高', transfer: '差', lesson: 'CC/GFS 均高仍可能域外失败 — 训练语料地质意义（P3-E9）才是 Feng 未测维度' }
    ],
    matrixId: 'TRI-E1',
    placement: 'Paper 3 Discussion + Paper 1/2 交叉引用'
  },
  gpuPriority: [
    { rank: 0, id: 'P2-E7', label: 'Day1 合成扰动（零 GPU）', reason: '最干净贡献 · 不依赖 checkpoint · Introduction 核心' },
    { rank: 1, id: 'P2-E5/E8', label: '全测试集 top-20% Δt 决策', reason: 'Paper 2 唯一救命稻草 · 禁 cherry-pick' },
    { rank: 2, id: 'P1-F0', label: '近端 K=5 地基门控', reason: '所有 P1 训练前置 · 0.5 GPU day' },
    { rank: 3, id: 'P1-E7', label: 'residual–GFS Pareto', reason: '无额外训练 · Peng 未做' },
    { rank: 4, id: 'P1-E9', label: '3×4 有色噪声矩阵', reason: 'Week2 · vs Peng #47 · Geophysics 必要' },
    { rank: 5, id: 'P1-E4', label: '课程 N=3 vs N=11', reason: 'Week2 · 从 deferred 提升 · 回答为何 11 级' },
    { rank: 6, id: 'P3-E9', label: '三组预训练语料 ablation', reason: 'vs Feng #48 · GFS_λ 主指标' }
  ]
};

/* ════ Agent 文献吞噬指南（2025–2026 高端文献） ════ */
var AGENT_LIT_PLAYBOOK = {
  title: 'Agent 文献吞噬指南',
  updated: '2026-06-19',
  symbolStandard: {
    title: '三篇论文统一数学符号（模仿 #43 arXiv:2603.22307 与 #44 GJI 排版）',
    notation: [
      'v 或 v(x,z)：速度模型（主变量）',
      'd 或 d_obs：观测地震记录（Shot Gathers）',
      'F(v)：波动方程正演物理算子（非线性 PDE）',
      'r(v) = d - F(v)：数据残差；r_norm 为归一化残差',
      '∇_v log p(v)：扩散先验得分函数（Score Function）',
      '∇_v ||r(v)||²_C：加权似然梯度（C_d 协方差或带通 B）',
      'ε_proj：算法/投影约束阈值（如 5×10⁻⁴）；ε_norm：physics-score 评估阈值（如 2×10⁻³）',
      'Δt_first：初至走时残差（Paper 2 物理标尺）',
      'E_mig：零偏移距偏移波场误差（Paper 2）'
    ],
    latexExample:
      'GC-FWI 近端更新（与 proximal_bridge.py 一致）：\n' +
      '  v_{t-1} ← Denoise(v_t) + α ∇_v log p_t(v) − β ∇_v ||d−F(v)||²_{C_d}\n' +
      '似然项 ∇||d−F(v)||² 指向残差上升方向，故用减号做下降更新；score 项用加号。',
    codeRef: 'geofwi_physics_core/proximal_bridge.py L131: v = v - alpha * coeff * g'
  },
  digestTasks: [
    {
      paperId: 'p1', litIds: [43, 44, 39, 41],
      focus: '提取物理算子解耦逻辑',
      instructions: [
        '读 #43：条件扩散如何把 density ρ 注入 U-Net 约束非线性反演',
        '读 #44：reconstruction-guided sampling 如何把 F(v) 似然与 diffusion score 联合',
        '对比 GC-FWI 近端引导：K 次 adjoint 梯度 vs SVGD 粒子 vs DPS 似然步',
        '记录 wave-equation solver 与 network 的 autodiff 接口（#45 亦有 FD 正演范例）'
      ]
    },
    {
      paperId: 'p2', litIds: [20, 45, 30],
      focus: '物理标尺 vs 统计指标',
      instructions: [
        '读 #20 DLM-FWI：matching filter 如何暴露 CC 看不出的 cycle-skipping',
        '读 #45：Stage1 波形 Loss vs Stage2 log-envelope Loss 对边界的不同敏感度',
        '设计实验：CC 排名 top-10 中 Δt_first 残差分布 vs GFS 排名一致性'
      ]
    },
    {
      paperId: 'p3', litIds: [46, 12, 23],
      focus: '跨域特征对齐工作流',
      instructions: [
        '读 #46：固定参考道互相关 → encoder 特征对齐的标准化步骤',
        '组合 pipeline：子波匹配 → 互相关对齐 → latent MMD/DANN/CORAL',
        '对照 Image-to-Model 路径：RTM 图像尺寸与地质模型天然一致'
      ]
    }
  ],
  priorityReading: [
    { litId: 47, rank: 1, reason: 'Paper 1 直接竞品：W₂ + preconditioned diffusion — P1-E9 三方对比必引' },
    { litId: 48, rank: 2, reason: 'Paper 3 直接竞品：scaling + LDM aug — P3-E9 差异化必引' },
    { litId: 43, rank: 3, reason: 'Paper 1 条件扩散 FWI 参照' },
    { litId: 20, rank: 4, reason: 'Paper 2 波形匹配/周期跳跃物理标尺' },
    { litId: 45, rank: 5, reason: 'Paper 2/3 分阶段物理 Loss + 同时震源算力优化' },
    { litId: 46, rank: 6, reason: 'Paper 3 域适应互相关工作流' }
  ],
  physicsCoreModules: {
    title: 'Python 奠基模块（geofwi_physics_core/）',
    path: 'e:\\个人项目\\geofwi_physics_core',
    modules: [
      { file: 'proximal_bridge.py', paper: 'p1', role: 'K-step 近端环 · bayesian_diffusion.sample 桥接' },
      { file: 'w2_guidance.py', paper: 'p1', role: 'W₂-hybrid 似然引导（#47 Peng）' },
      { file: 'gfs_wavelength.py', paper: 'p2', role: 'GFS_λ · select_tau_global() · (cos+1)/2' },
      { file: 'paper2_physics_metrics.py', paper: 'p2', role: 'Δt_first · E_mig 独立物理标尺' },
      { file: 'synthetic_perturb_gfs.py', paper: 'p2', role: '合成扰动对照 (a)平移 vs (b)盐界错位 · P2-E7' },
      { file: 'simultaneous_source.py', paper: 'p3', role: '编码震源矩阵 · PDE 预算估算' },
      { file: 'INTEGRATION_WSL.md', paper: 'all', role: 'WSL 接入说明 + patches/wsl 草稿' }
    ]
  },
  hiddenBombsSummary: [
    '地雷一 (P1)：裸 L₂ DPS 早期相位错配 → W₂² 早期 + L₂ 后期（#47）',
    '地雷二 (P2)：像素 GFS 网格锁死 → GFS_λ = f(Δx, λ)',
    '地雷三 (P3)：T×N_s PDE 算力黑洞 → Simultaneous/Encoded Sources'
  ]
};

/* ════ 写作 + 实验体系建议（8 条 · 针对本 trilogy） ════ */
var WRITING_EXPERIMENT_PLAYBOOK = {
  title: '写作与实验体系建议',
  subtitle: '非泛泛而谈 — 针对 GC-FWI / GFS / Transfer 三篇联动的可执行改法（含 surprise 升级 #9–13）',
  updated: '2026-06-19 · v3.3.0',
  items: [
    {
      id: 1, tag: '写作 · Paper 1', title: 'POCS / 收敛表述（已落地 · Remark 1）',
      problem: '原 Proposition 1 / homotopy 全局最优段像「已证收敛」→ 已在 main.tex 删除。',
      action: '保持 Remark 1（idealized POCS，audited 未验证）+ P1-F0 37/55 improved · 0/55 converged。禁止重新引入 Proposition 或 homotopy 全局保证。',
      mainTex:
        '\\textbf{Remark 1 (POCS motivation; not verified in practice).} ... \\emph{These sufficient conditions were not met in the audited configuration.}\n' +
        '\\paragraph{Empirical proximal monitoring (P1-F0).} $37/55$ improved; $0/55$ converged.',
      experiment: 'P1-F0 done · summary_per5.json · optional Fig. residual_vs_k for supplement',
      checklistIds: ['main_tex_prop1'],
      status: 'resolved'
    },
    {
      id: 2, tag: '写作 · Paper 1', title: 'Related Work 末尾显式区分清单',
      problem: '与 DPS/SeisFusion 差异 buried 在长句（如 main.tex L120）→ 易被扫读成「就是 X」。',
      action: 'Related Work 结尾单独一段编号列表 Compared to … we differ in (1)(2)(3)。',
      mainTex:
        '\\paragraph{Explicit comparison to closest diffusion-FWI baselines.}\n' +
        'Compared to Diffusion Posterior Sampling \\citep{chung2023dps}, SeisFusion \\citep{li2024seisfusion}, and DiffusionFWI \\citep{gao2024}, GC-FWI differs in three ways:\n' +
        '(1)~\\textbf{Physics operator:} adjoint-state proximal gradient on the \\emph{velocity grid} after each DDPM step, not latent-space classifier guidance or soft penalty alone;\n' +
        '(2)~\\textbf{Nonlinear FWI:} no closed-form hard projection---$K{\\ll}T$ inner gradient corrections instead of claiming $\\Pi_{\\mathcal{M}}$;\n' +
        '(3)~\\textbf{Curriculum:} 11-stage GCI warm start before salt/fault scenarios, coupled with optional $W_2^2{\\rightarrow}L_2$ hybrid misfit \\citep{peng2026}.',
      checklistIds: ['rw_diff_list']
    },
    {
      id: 3, tag: '三篇联动', title: 'Paper 1 结果表首版含 GFS',
      problem: 'Paper 2 批评 CC/SSIM；Paper 1 若只报 CC/SSIM → 同一审稿人觉得矛盾。',
      action: 'Table 1 加 GFS 列（可 Supplementary 详述）；脚注引用同期 GFS 工作作交叉验证。',
      mainTex:
        'We additionally report the Geological Fidelity Score (GFS; companion metric study) as cross-validation of structural quality beyond pixel-wise CC/SSIM.\n' +
        '\\begin{tabular}{lcccc}\nMethod & CC$\\uparrow$ & SSIM$\\uparrow$ & RMSE$\\downarrow$ & GFS$\\uparrow$ \\\\\n' +
        '\\midrule\nGC-FWI (ours) & [TBD] & [TBD] & [TBD] & [TBD] \\\\\n\\end{tabular}',
      experiment: 'P1-E2 deliverable 改为 CC/SSIM/RMSE/GFS 四列',
      checklistIds: ['p1_gfs_column', 'gfs_eval']
    },
    {
      id: 4, tag: '写作 · 三篇', title: '独立 Limitations 小节',
      problem: 'K=5 固定步、盐体零样本、EFWI 架构手术等 — 审稿人挖出来不如自写。',
      action: 'Discussion 末或单独 \\section{Limitations}：列局限 + 已设计验证边界的实验。',
      mainTex:
        '\\section{Limitations}\n' +
        '(1) Fixed $K{=}5$ proximal steps do not guarantee descent on strongly nonconvex wave-equation misfits; we report empirical residual curves (Fig.~\\ref{fig:residual_vs_k}) instead of global guarantees.\n' +
        '(2) Zero-shot transfer to salt-dominated targets is expected to degrade; Paper~3 reports stratified results by domain distance.\n' +
        '(3) Extension to elastic FWI requires $V_p/V_s$ architecture changes, not seamless weight transfer.\n' +
        '(4) GFS threshold $\\tau$ and domain-gap metrics (MMD) remain sensitive to grid spacing; we report wavelength-normalized GFS$_\\lambda$ where applicable.',
      checklistIds: ['limitations_sec']
    },
    {
      id: 5, tag: '实验 · Paper 3', title: 'N=50 vs N=500 可证伪假设（跑前写）',
      problem: '事后凑叙事 vs 预先声明 → 可信度差。',
      action: 'Method 写清：「We predict N=50 fine-tuning will match or exceed N=500 scratch on Marmousi2 CC/GFS_λ」；结果支持/不支持都如实报。',
      mainTex:
        '\\paragraph{Pre-registered transfer hypothesis.}\n' +
        'Before experiments, we hypothesize that GeoFWI-pretrained fine-tuning with $N{=}50$ labeled Marmousi2 samples will achieve CC and GFS$_\\lambda$ at or above scratch training with $N{=}500$. We report this test regardless of outcome.',
      experiment: 'P3-E3/E4/E5 + scratch N=500 对照行；Discussion 解释若需 N=150',
      checklistIds: ['fewshot_hypothesis', 'fewshot_50', 'scratch_500']
    },
    {
      id: 6, tag: '实验 · Paper 2', title: '合成扰动对照（零模型依赖）',
      problem: 'OpenFWI 案例分析好，但还依赖别人训练的 CNN。',
      action: '从 GT 构造 (a) 整体小幅平移 (b) 盐体边界固定偏移；预期 (a) CC≈GFS 尚可，(b) CC 高 GFS 低。',
      pythonSnippet:
        'def perturb_translate(v, shift_px=3): return np.roll(v, shift_px, axis=1)\n' +
        'def perturb_salt_shift(v, salt_mask, dz_px=8): ...  # 仅盐体区域纵向错位\n' +
        '# 对 (a)(b) 与 GT 算 CC/GFS → 条形图：最干净的分工证据',
      experiment: 'P2-E7 · CPU · 0.5 day · 不依赖 .npy 预测',
      checklistIds: ['synthetic_perturb']
    },
    {
      id: 7, tag: '实验 · Paper 3', title: '域差距剂量-反应曲线',
      problem: 'Marmousi2 / SEG Salt / Overthrust 三个孤立数字弱于单调趋势。',
      action: '用 MMD（或 simpler 统计距离）排序目标域 → x=domain distance, y=transfer CC/GFS_λ。',
      mainTex:
        'Figure~\\ref{fig:domain_dose}: transfer performance (CC, GFS$_\\lambda$) vs.\\ latent MMD to GeoFWI, showing monotonic degradation with domain gap.',
      experiment: 'P3-E6：三域 MMD [TBD] + 已有迁移点连成曲线（无需新训练，重组呈现）',
      checklistIds: ['domain_dose_curve', 'mmd_latent']
    },
    {
      id: 8, tag: '公式 · Paper 2', title: 'GFS 梯度项重缩放至 [0,1]',
      problem: 'IoU∈[0,1]，cos∈[-1,1] → 直接平均使 GFS∈[-0.5,1]，与文字「0到1」矛盾。',
      action: '梯度项改为 (cos_sim+1)/2 再与 IoU 平均；代码 gfs_wavelength.py + index.html 已同步。',
      mainTex:
        '\\mathrm{GFS} = \\tfrac{1}{2}\\Big[ \\mathrm{IoU}(S_{\\pred},S_{\\true}) + \\tfrac{1}{2}\\big(1 + \\overline{\\cos\\angle(\\nabla\\mathbf{v}_{\\pred},\\nabla\\mathbf{v}_{\\true})}\\big) \\Big] \\in [0,1].',
      checklistIds: ['gfs_formula']
    },
    {
      id: 9, tag: '实验 · Paper 1', title: 'residual–GFS Pareto 平面（优先#1）',
      problem: '消融只有 CC/SSIM，Geophysics 更关心波方程满足程度与地质质量的权衡。',
      action: '推断时记录 ||r(v)|| 与 GFS；四设置 (a)无引导 (b)DPS (c)近端 (d)近端+W₂；画 Pareto 前沿。',
      mainTex:
        'Figure~\\ref{fig:residual_gfs_pareto}: geological fidelity (GFS) vs.\\ normalized wave-equation residual $\\|\\mathbf{r}_{\\mathrm{norm}}\\|$ for four guidance settings. GC-FWI occupies a Pareto-efficient region balancing physics consistency and structural fidelity.',
      experiment: 'P1-E7 · 无额外训练 · evaluate --record_r_norm',
      checklistIds: ['p1_pareto']
    },
    {
      id: 10, tag: '实验 · Paper 1', title: '课程顺序反转（优先#3）',
      problem: 'N=3 vs N=11 只测阶段数，未测顺序本身是否关键。',
      action: '加反向课程（盐→平层）与随机顺序；与正向 11 级对比。结果正负均可写进 Discussion。',
      experiment: 'P1-E8 · train --curriculum_order forward,reverse,random · gate: P1-F0',
      checklistIds: ['p1_reverse_curriculum', 'n_ablation']
    },
    {
      id: 11, tag: '实验 · Paper 2', title: '指标决策 · top-20% 下游走时（优先#2）',
      problem: 'CC≠GFS 是相关研究；缺「按 GFS 选模型更利于勘探」的因果效用。',
      action: '同批结果按 CC/GFS 各取 top-20%；F(v) 正演比 Δt_first；报告 GFS-top 是否系统性更优。',
      mainTex:
        'Models selected by GFS (top 20\\%) yield lower first-arrival traveltime error $\\Delta t_{\\mathrm{first}}$ than CC-selected models on the same pool, supporting GFS as a decision criterion rather than an alternate correlation.',
      experiment: 'P2-E8 · paper2_physics_metrics.delta_t_first_residual',
      checklistIds: ['gfs_decision']
    },
    {
      id: 12, tag: '叙事 · Paper 3', title: '迁移失败根因诊断（补充 · 次于 P3-E9）',
      problem: '「预训练+微调更好」与 Feng #48 零样本 SOTA 冲突；MMD 分解 alone 不够。',
      action: '主 claim 改为 P3-E9 训练语料 ablation；P3-E8 子波/结构分解作补充 Discussion。',
      mainTex:
        '\\paragraph{Diagnostic framework (supplementary).} We decompose transfer degradation into wavelet mismatch vs.\\ structural domain gap (Figure~\\ref{fig:transfer_failure_decomposition}), secondary to the main geologically-constrained vs.\\ statistically-augmented pretraining comparison (Figure~\\ref{fig:geo_vs_stat_training}).',
      experiment: 'P3-E8 · gate: P3-E9',
      checklistIds: ['transfer_decompose']
    },
    {
      id: 13, tag: '三篇联动', title: '物理-地质-迁移闭环三案例',
      problem: '联动仅停留在 Paper 1 Table 的 GFS 列，不够体系化。',
      action: '找三例：CC高GFS低迁移好 / CC低GFS高迁移好 / CC高GFS高迁移差 → Paper 3 Discussion。',
      experiment: 'TRI-E1 · 从已有 metrics 筛分歧最大样本 · 1 day CPU',
      checklistIds: ['trilogy_loop', 'p1_gfs_column']
    },
    {
      id: 14, tag: '实验 · Paper 1', title: '3×4 有色噪声矩阵（vs Peng #47）',
      problem: 'Peng 2026 用 W₂ 抗 amplitude/phase 失配；仅白噪声会被 Geophysics 审稿人认为不真实。',
      action: 'salt 子集 · 行=DPS/W₂/GC-FWI · 列=clean/20/10/5 dB · **band-limited 相干噪声** · CC/RMSE/GFS。',
      mainTex:
        'Table~\\ref{tab:noise_3x4}: band-limited coherent noise (surface-wave band) on salt-dominated subsets; ' +
        'rows are DPS-$L_2$, W$_2$-guided (Peng et al., 2026), and GC-FWI; columns are SNR $\\in\\{\\mathrm{clean},20,10,5\\}$~dB.',
      experiment: 'P1-E9 · run_noise_robustness_grid.py --noise_type colored',
      checklistIds: ['p1_noise_robust', 'p1_colored_noise', 'noise_robust', 'colored_noise']
    },
    {
      id: 15, tag: '实验 · Paper 3', title: '三组预训练语料 ablation（vs Feng #48）',
      problem: 'Feng 2026 十亿参数 + LDM 扩增 SOTA；两组对比不够，缺 OpenFWI 原始对照。',
      action: '同架构 · (A) GeoFWI (B) OpenFWI (C) OpenFWI+LDM · Marmousi2/SEG · N=10,50 · GFS_λ 主指标。',
      mainTex:
        '\\paragraph{Geologically constrained vs.\\ statistically augmented pretraining.}\n' +
        'We compare three pretraining corpora---GeoFWI (process-based), OpenFWI (native), and OpenFWI with latent-diffusion augmentation (Feng et al.~2026 style)---with fixed architecture and compute, fine-tuning on Marmousi2 and SEG Salt at $N\\in\\{10,50\\}$, evaluated primarily by GFS$_\\lambda$.',
      experiment: 'P3-E9 · triple training runs',
      checklistIds: ['geo_vs_stat_training']
    },
    {
      id: 16, tag: '叙事 · 三篇', title: 'Related Work 正面回应 2026 竞品',
      problem: '回避 Peng/Feng 会被视为刻意忽略同期工作。',
      action: 'Introduction/Related Work 各一段：Peng W₂ 已实现 → 你的差异化（GeoFWI 难度、课程、Pareto、噪声表）；Feng scaling → 你的差异化（GFS、地质过程数据 ablation）。',
      mainTex:
        'Recent concurrent work achieves strong OpenFWI results via W$_2$-guided diffusion (Peng et al., 2026) and billion-parameter scaling with synthetic augmentation (Feng et al., 2026). We instead target the harder GeoFWI benchmark with curriculum-guided proximal diffusion and report physics--geology Pareto and noise-robustness comparisons unavailable in those studies.',
      checklistIds: ['lit_43_44', 'rw_hard_line']
    }
  ]
};

/* ════ main.tex 修复草稿（WSL bp-diff-fwi-complex/main.tex） ════ */
var MAIN_TEX_FIXES = {
  title: 'main.tex 交叉审计修复',
  updated: '2026-06-17',
  targetFile: 'paper1/manuscript/main.tex',
  note: 'Historical issues below marked resolved where main.tex audit (2026-06-17) addressed them.',
  issues: [
    {
      id: 'table1_fabricated',
      severity: 'critical',
      status: 'resolved',
      title: 'Table 1 / 摘要数字为占位 — 已填 audited JSON',
      problem:
        'Historical: CC=0.62、CC=0.00 baseline from prepare_figure_data placeholder. ' +
        'Now: metrics_canonical_test5000.json + unet/pinn proxy JSON in Table 1.',
      action: 'No action — verify numbers match JSON before submission freeze.'
    },
    {
      id: 'prop1_pocs',
      severity: 'critical',
      status: 'resolved',
      title: 'Proposition 1 / homotopy 全局收敛 — 已删',
      problem:
        'Historical: global POCS / homotopy global-minimum claims. ' +
        'Now: Remark 1 (not verified) + P1-F0 empirical paragraph only.',
      action: 'Do not reintroduce \\begin{proposition} or homotopy convergence analysis.'
    },
    {
      id: 'rw_comparison_list',
      severity: 'major',
      title: 'Related Work 末尾编号区分清单',
      problem: '与 DPS/SeisFusion 差异 buried 在长句 — 审稿人扫读易判「就是 X」。',
      action: '粘贴 WRITING_EXPERIMENT_PLAYBOOK #2 至 Related Work 末段',
      replaceTex:
        '\\paragraph{Explicit comparison to closest diffusion-FWI baselines.}\n' +
        'Compared to DPS \\citep{chung2023dps}, SeisFusion \\citep{li2024seisfusion}, and DiffusionFWI \\citep{gao2024}, GC-FWI differs in: (1)~adjoint proximal gradient on the velocity grid; (2)~no closed $\\Pi_{\\mathcal{M}}$ for nonlinear FWI; (3)~11-stage GCI + optional $W_2^2{\\rightarrow}L_2$ hybrid misfit.'
    },
    {
      id: 'limitations_section',
      severity: 'major',
      title: '独立 Limitations 小节',
      action: '粘贴 WRITING_EXPERIMENT_PLAYBOOK #4',
      replaceTex:
        '\\section{Limitations}\n' +
        '(1) Fixed $K{=}5$ proximal steps: no global guarantee on nonconvex misfit; empirical residual curves instead.\n' +
        '(2) Zero-shot salt transfer expected weak; Paper~3 dose--response by domain gap.\n' +
        '(3) Elastic FWI needs $V_p/V_s$ architecture surgery.\n' +
        '(4) GFS$_\\lambda$ / MMD sensitive to grid and wavelet harmonization.'
    },
    {
      id: 'naming_sync',
      severity: 'critical',
      status: 'resolved',
      title: 'Hard-Manifold → Proximal Guidance',
      problem: 'Historical naming mismatch between web and main.tex.',
      action: 'Resolved in main.tex audit.'
    },
    {
      id: 'epsilon_dual',
      severity: 'major',
      status: 'resolved',
      title: 'ε 符号 — 已统一为 ε_design / ε_gate / ε_rms',
      problem:
        'Historical ε_cfl vs ε_norm confusion. Paper now uses ε_design (proximal), ε_gate (physics_score), ε_rms (P1-F0).',
      action: 'Do not revert to ε_cfl or blind unify tolerances in code without grep.'
    },
    {
      id: 'cite_shen_li',
      severity: 'major',
      title: '\\cite{shen2024posterior,li2024seisfusion} 待核实',
      problem: 'Intro 区分 GC-FWI 与 DPS/扩散后验采样的关键引用；ntfa.bib 未随稿上传，须 CrossRef/文献验证工具确认。',
      action: '运行 cite-check；若 shen2024posterior 不存在则改引 Chung DPS #41 + Taufik #44'
    }
  ],
  placeholderPolicy: '模板/网页中未跑实验的数字一律 [TBD] 或 <FILL_AFTER_EXPERIMENT>，与 MMD 纪律一致'
};

/* ════ 审稿理论审计（2026-06 文献核实结论） ════ */
var THEORY_AUDIT = {
  title: '审稿理论审计',
  subtitle: '基于原始文献核查：纠正引用逻辑倒置、事实性错误与未验证假设 — 编辑本对象后刷新「审稿理论审计」页',
  updated: '2026-06-19',
  executiveSummary:
    'Paper 1 (2026-06-17): integrity fatals resolved — Table 1 audited JSON, Remark 1 replaces Proposition 1, ' +
    'ε_design/ε_gate/ε_rms unified, 3-stage U-Net documented. Remaining: deferred GPU items (wall-clock, N-ablation). ' +
    'Paper 2：GFS (cos+1)/2；Δt_first/E_mig 见 PAPER2_PHYSICS_METRICS。Paper 3：预注册 N=50 vs N=500。',
  papers: [
    {
      id: 'p1', tag: 'Paper 1 — GC-FWI', severity: 'critical',
      headline: '非线性 FWI 不存在封闭硬投影 — 须改称近端引导',
      finding:
        'Song/Chung 医疗硬投影成立的前提是 F 线性（矩阵/傅里叶/掩膜），投影到超平面有封闭解。' +
        'FWI 中 F(v) 为波动方程 PDE，数学上无已知封闭公式将 v 投影到 M={v:||d-F(v)||²≤ε}。' +
        '若每步扩散真做非线性硬投影，等价于每步嵌套完整伴随状态 FWI（~1000 次）——算力灾难，非快速替代。' +
        'GC-FWI 实际机制：伴随梯度近端引导纠偏 score（类 DPS 似然梯度），非精确 Π_M。',
      literatureLine: [
        { litId: 39, label: 'Song et al. 2022 (ICLR, medical)', role: '线性 F 硬投影封闭解 — GC-FWI 不可直接类比', url: 'https://arxiv.org/abs/2111.08005' },
        { litId: 40, label: 'Chung et al. 2022 MCG (NeurIPS)', role: 'Manifold Constrained Gradient — 软梯度引导，FWI 应归入此线', url: 'https://openreview.net/forum?id=nJJjv0JDJju' },
        { litId: 41, label: 'Chung et al. 2023 DPS (ICLR)', role: '似然梯度引导标准范式；GC-FWI 近端引导应与此对照', url: 'https://openreview.net/forum?id=OnD9zGAGT0k' },
        { litId: 42, label: 'Song et al. Hard Data Consistency (LDM)', role: '线性逆问题硬一致性 — 区分非线性 FWI 场景', url: 'https://openreview.net/forum?id=j8hdRqOUhN' },
        { litId: 43, label: 'Liu et al. 2026 (arXiv:2603.22307)', role: '条件扩散隐式先验 — 2026 直接竞品/参照', url: 'https://arxiv.org/abs/2603.22307' },
        { litId: 44, label: 'Taufik & Alkhalifah 2026 (GJI ggag066)', role: '贝叶斯+重构引导扩散采样 — 顶刊立论范式', url: 'https://doi.org/10.1093/gji/ggag066' },
        { litId: 47, label: 'Peng et al. 2026 (arXiv:2603.16393)', role: 'W₂ 替代 L₂ DPS — 相位/cycle-skip 防御', url: 'https://arxiv.org/abs/2603.16393' }
      ],
      relatedWorkDraft:
        '【完整 LaTeX 见 PAPER1_RELATED_WORK.relatedWorkTex — 已改写为非线性近端引导叙事】\n\n' +
        '核心修正：弃用 Hard Projection 术语；承认 F 非线性无封闭 Π_M；' +
        'GC-FWI = 每步 K 次伴随梯度近端引导 + 11 级 GCI warm start + ε_norm 厚可行集。',
      discussionDefense:
        'Discussion §Non-linear Proximal Guidance：区分医疗线性硬投影 vs FWI 伴随梯度纠偏；' +
        '报告 ms/step（K 次梯度，非完整 FWI）；加噪/有色噪声消融标 [TBD]。',
      mustAnswer: [
        '为何不用「硬投影」？非线性 PDE 下 Π_M 如何计算？每步开销多少？',
        '近端引导与 DPS/MCG 似然梯度的异同？K 取多少、与完整 FWI 迭代次数对比？',
        'GCI warm start 如何使梯度引导落在可收敛盆地？N=1 ablation [TBD]'
      ],
      actions: [
        { priority: 0, text: '✅ Remark 1 + P1-F0 — done; optional Fig. residual_vs_k for supplement', cost: 'resolved' },
        { priority: 1, text: 'Related Work 末尾编号区分清单 — #2', cost: '写作 · optional' },
        { priority: 2, text: '✅ Table 1 GFS + Limitations — done', cost: 'resolved' },
        { priority: 3, text: 'Method ms/step wall-clock — fill [TBD] until GPU benchmark', cost: 'deferred' },
        { priority: 4, text: '核实 \\cite{shen2024posterior,li2024seisfusion}', cost: '免费 · optional' },
        { priority: 5, text: '✅ ε_design / ε_gate / ε_rms — done in main.tex', cost: 'resolved' }
      ],
      networkAdvice: {
        title: '细节补充：有色噪声与正演误差（近端引导版）',
        context:
          '医疗影像噪声多为白噪声；地震噪声高度有色，并伴随子波/边界误差。',
        blindSpot:
          '即使用 L₂ 似然梯度引导，若 d 含强有色噪声或 F 有系统偏差，梯度仍会强迫模型拟合无法解释的成分 → 伪影。',
        defense:
          '似然梯度采用 C_d⁻¹ 加权 misfit 或投影前残差主频段带通 B；' +
          '声明物理引导只拟合有效频段波场，对高频随机噪声/低频脚噪免疫。',
        mustAnswer: [
          '近端引导如何把面波/多次波刻进模型？C_d 或带通 B 如何缓解？'
        ],
        actions: [
          { priority: 1, text: 'Method 写加权 misfit 梯度定义', cost: '写作' },
          { priority: 2, text: '消融：白噪声 vs 有色噪声下加权 vs 非加权梯度', cost: 'GPU · 1–2 天' }
        ]
      },
      knowledgeError: {
        title: '知识性错误：全局 POCS / Proposition 1（已修复）',
        wrongClaim:
          '(A) Proposition 1 或 homotopy 全局最优。(B) 每步严格硬投影 Π_M。',
        reality:
          'main.tex 2026-06-17：Remark 1 only（not verified）+ P1-F0 37/55；Algorithm 1 用 K-step gradient proximal。',
        consequence:
          '若 ARS/Codex 仍建议「诚实降级 Proposition 1」→ 忽略；勿重新插入命题环境。',
        correction:
          '保持现状；写作时引用 P1-F0 与 tbl:ablation，区分 training-time physics weight vs sampling-time K hook。',
        mustAnswer: [
          'M_wave 凸性？— 否，已声明 non-convex',
          'K=5 是否保证 CC 提升？— 否，K0 p=1.0'
        ],
        actions: [
          { priority: 1, text: '✅ 已完成 — 勿再改回 Proposition 1', cost: 'resolved' },
          { priority: 2, text: '全文保持 Proximal Guidance 术语', cost: 'ongoing discipline' }
        ]
      },
      hiddenBomb: {
        title: '地雷一：标准 DPS 的相位盲区与梯度方向错误',
        wrongClaim:
          '近端/DPS 引导统一用 L₂ 残差 ∇_v||d-F(v)||² 纠偏 score。',
        reality:
          '扩散早期 v̂₀ 极模糊 → 波场相位错配超半波长 → L₂ 梯度因 cycle-skipping 反向，毒化 score（Peng et al. 2026 #47）。',
        consequence:
          '逆向扩散发散，输出杂乱伪影；审稿人若熟悉 OT-FWI 会一票否决「裸 DPS」。',
        correction:
          '数据保真势能升级为 W₂²(F(v),d)（最优传输），早期 W₂ 主导保凸性/低频趋势；' +
          '中后期平滑切换 L₂ 细化高频。实现：geofwi_physics_core/w2_guidance.py；Method 引 #47。',
        mustAnswer: [
          '早期扩散步为何不用 L₂？W₂→L₂ 切换 schedule 如何定？',
          '与 Peng #47 preconditioned guidance 的差异？'
        ],
        actions: [
          { priority: 1, text: 'Method 写 J(v)=α(t)W₂²+β(t)L₂ 与 η(t) 引导强度', cost: '写作' },
          { priority: 2, text: '消融：裸 L₂ DPS vs W₂-hybrid 早期步梯度余弦相似度', cost: 'GPU · 1–2 天' }
        ]
      }
    },
    {
      id: 'p2', tag: 'Paper 2 — GFS', severity: 'major',
      headline: 'OpenFWI 无公开预测矩阵；案例分析不能 cherry-pick',
      finding:
        'lanl/OpenFWI 官方仓库无预训练权重、无预测 .npy，须自训 InversionNet/VelocityGAN。' +
        'InversionNet 用 MSE 训练 → 盐体边界严重均值模糊，无法定义清晰顶界面。' +
        '用「盐顶深度误差」评估模糊 CNN 输出会引入二值化阈值误差，反而成新 cherry-picking。',
      literatureLine: [
        { litId: 31, label: 'OpenFWI (Deng et al. 2022)', role: '须自训基线；GitHub 不提供预测矩阵', url: 'https://github.com/lanl/OpenFWI' },
        { litId: 20, label: 'DLM-FWI (GJI #20)', role: 'matching filter / cycle-skip — 支撑走时残差标尺', url: 'https://doi.org/10.1093/gji/ggag019' },
        { litId: 45, label: 'Zheng et al. 2025 (JMSE #45)', role: '分阶段物理 Loss — GFS 边界评估优化参照', url: 'https://doi.org/10.3390/jmse13061193' }
      ],
      mustAnswer: [
        '全测试集 CC-GFS 排名分歧（Kendall τ / Spearman ρ）是否系统性？',
        '为何不用盐顶深度？MSE 模糊输出下界面定义是否有效？',
        '初至走时残差/偏移波场误差与 GFS/CC 排名：GFS 是否单调相关显著优于 CC？'
      ],
      actions: [
        { priority: 1, text: 'git clone lanl/OpenFWI；自训 InversionNet + VelocityGAN', cost: 'GPU · 数天–1 周' },
        { priority: 2, text: '全测试集 Kendall/Spearman + 分歧最大样本 → Figure 1', cost: '脚本 · 1 天' },
        { priority: 3, text: '预测模型正演 → 初至走时残差 Δt_first + 偏移波场误差 vs GFS/CC 散点', cost: '1–2 天' },
        { priority: 4, text: 'Discussion 明确 GFS=eval-only；可选 Soft-GFS', cost: '写作 · 半天' }
      ],
      networkAdvice: {
        title: '细节补充：GFS 可微性与应用边界',
        context:
          '审稿人对新 Metric 常分两派：纯评估工具（SSIM/PSNR）vs 能否当 Loss 训练网络。',
        blindSpot:
          'GFS 含界面 IoU（交并比），标准 IoU 涉及二值化阈值，数学上不可微。' +
          '若未声明边界，审稿人会问：不可微则只能看不能训，实用价值大打折扣。',
        defense:
          '明确划定：GFS 第一定位是「拓扑与结构感知的评估标尺」，克服 CC/RMSE 局限，本身不参与反向传播。' +
          '加分项：给出 Soft-GFS 松弛可微版——借鉴 Soft-IoU，用速度模型梯度模长作权重，' +
          '将硬性交并比转为连续可微矩阵点乘；展示 Soft-GFS 可作正向优化 Loss 引导更锐利盐体边界。',
        mustAnswer: [
          '标准 GFS 为何不参与训练？IoU 不可微性如何影响？',
          'Soft-GFS 与标准 GFS 在评估上是否一致？作 Loss 时边界是否更锐利？'
        ],
        actions: [
          { priority: 1, text: 'Method/Discussion 写清 GFS=eval-only；IoU 不可微说明', cost: '写作' },
          { priority: 2, text: '（可选）Soft-GFS 实现', cost: '代码 · 1 天' }
        ]
      },
      knowledgeError: {
        title: '知识性错误：盐顶深度评估 MSE 模糊 CNN 的逻辑悖论',
        wrongClaim:
          '用盐体顶界面绝对深度误差（如 ±50m）作为第三方裁判，证明 GFS 比 CC 更准。',
        reality:
          'InversionNet 等用 MSE 训练 → 高对比盐体输出必然均值模糊（Blurry/Smearing），' +
          '无清晰边界，数学上无法定义「盐顶在多少米」。',
        consequence:
          '边缘检测+二值化引入人为阈值误差，看似客观实则新 cherry-picking；审稿人可一击驳回。',
        correction:
          '弃盐顶/断层倾角深度标尺。改用初至走时残差 Δt_first 或零偏移距偏移波场误差 E_mig：' +
          '模糊预测正演合成波形，算走时偏差；证明 CC 高分模型走时残差仍大，GFS 与走时单调相关。',
        mustAnswer: [
          'MSE 模糊输出如何可靠提取盐顶深度？阈值 τ 如何选择才非 cherry-pick？',
          '走时残差是否对模糊模型仍 well-defined？与 GFS 相关性如何？'
        ],
        actions: [
          { priority: 1, text: '实现 forward modeling → pick first arrival → Δt_first pipeline', cost: '代码 · 1 天' },
          { priority: 2, text: 'Figure：CC 高/GFS 低 案例的走时残差 vs CC 高/GFS 高 案例对比', cost: '作图 · 半天' }
        ]
      },
      hiddenBomb: {
        title: '地雷二：「网格锁死」与无量纲化物理标尺缺失',
        wrongClaim:
          'GFS 在 128×128 像素空间算 IoU 与梯度一致性，跨数据集可直接比较。',
        reality:
          '像素≠物理米：OpenFWI 与 GeoFWI 的 Δx、Δz 可差 5×；同 3px 偏差 = 30m vs 150m。' +
          '分辨率本质由主波长 λ=v/f₀ 决定，非像素数。',
        consequence:
          'GFS 排名跨数据集无意义；审稿人质疑「行业通用价值」。',
        correction:
          '引入波长归一化：Scaled_Error = (Δx·Pixel_Dist)/λ，λ=v_avg/f₀；' +
          'GFS 在无量纲拓扑+波长鲁棒空间定义。实现：geofwi_physics_core/gfs_wavelength.py。',
        mustAnswer: [
          '各数据集 Δx、f₀、λ 各是多少？GFS 是否报告 λ-normalized 版本？',
          '像素 GFS 与波长 GFS 排名是否一致？'
        ],
        actions: [
          { priority: 1, text: 'Method 写 GFS_λ 公式与 OpenFWI/GeoFWI 网格元数据表', cost: '写作 · 半天' },
          { priority: 2, text: '对比 pixel-GFS vs λ-GFS 跨数据集排名 Kendall τ', cost: '脚本 · 1 天' }
        ]
      }
    },
    {
      id: 'p3', tag: 'Paper 3 — Transfer', severity: 'critical',
      headline: 'EFWI 架构不匹配；MMD 等数字未验证即写入',
      finding:
        'GC-FWI 输出单通道 Vp；EFWI 需 Vp+Vs — 架构手术，迁移叙事须限定。' +
        '观测系统 N_s×N_r×N_t 不匹配会导致 Gather-based 网络无法前向传播。' +
        '更隐秘盲区：震源子波主频/相位不一致（GeoFWI 15Hz Ricker vs Marmousi2 25Hz）→ CNN 频率错配，' +
        'MMD 反映的是子波差异而非地质域差异。',
      literatureLine: [
        { litId: 'Gretton2012', label: 'Gretton et al. 2012 JMLR', role: 'MMD 原始定义 — 替代无法核实的 Chang (2021)', url: 'https://jmlr.org/papers/v13/gretton12a.html' },
        { litId: 'Long2015', label: 'Long et al. 2015 DAN (ICML)', role: '深度 MMD 域适应基线', url: '' },
        { litId: 'Sun2016', label: 'Sun & Saenko 2016 CORAL', role: 'Marmousi 阶段域适应基线', url: '' },
        { litId: 46, label: 'Ni et al. 2026 (C&G #46)', role: '参考道互相关域适应 — MMD 前特征对齐工作流', url: 'https://doi.org/10.1016/j.cageo.2025.106081' }
      ],
      mustAnswer: [
        '源域/目标域震源子波主频、相位各是多少？MMD 前是否做频谱匹配？',
        'Vp→Vp/Vs 架构改动占网络多大比例？',
        '观测系统对齐后，子波不匹配时 MMD 还代表地质域距离吗？'
      ],
      actions: [
        { priority: 1, text: '声波→声波：GeoFWI 预训练 → Marmousi2/Overthrust', cost: '分阶段 · 先于 EFWI' },
        { priority: 2, text: 'MMD 前：直达波/测井提取目标域子波 → 反褶积+滤波至 15Hz Ricker', cost: '物理预处理 · 1–2 天' },
        { priority: 3, text: 'scratch + few-shot + DANN + CORAL 四组基线；MMD latent [TBD]', cost: 'GPU · ~20h' },
        { priority: 4, text: '观测系统 Sinc 重采样或 RTM Image-to-Model 迁移', cost: '数据 · 1–2 天' }
      ],
      networkAdvice: {
        title: '细节补充：观测系统 Shape 不匹配',
        context:
          'InversionNet 输入维度 = N_s × N_r × N_t，由观测系统决定。',
        blindSpot:
          'GeoFWI 与 Marmousi2 炮检数量/采样不一致 → 预训练 CNN 无法前向传播。',
        defense:
          '方案 A：Sinc/物理重采样对齐维度。方案 B（推荐）：RTM Image-to-Model，偏移图像尺寸=模型尺寸。',
        mustAnswer: [
          '两域 N_s、N_r、N_t 各是多少？直接 fine-tune 是否可行？'
        ],
        actions: [
          { priority: 1, text: '观测系统参数表 + 选定方案 A/B', cost: '写作 · 半天' },
          { priority: 2, text: '实现重采样或 RTM→Model pipeline', cost: '代码 · 2–3 天' }
        ]
      },
      knowledgeError: {
        title: '知识性错误：忽视震源子波（Source Wavelet）物理盲区',
        wrongClaim:
          '只要把 Marmousi2 裁剪重采样到与 GeoFWI 相同网格和炮检数量，即可做 MMD 域适应。',
        reality:
          'Shot Gather 特征由地质结构 + 震源子波（主频、相位）共同决定。' +
          'GeoFWI/OpenFWI 用固定 15Hz Ricker；实验室 Marmousi2 可能 25Hz 或含震源延迟。',
        consequence:
          'CNN 对相位/频率极度敏感 → 卷积核频率错配；MMD 测的是子波差异非地质域差异，迁移故事物理上立不住。',
        correction:
          'MMD 前必须：子波反褶积 + 频谱匹配（Wavelet Deconvolution & Spectrum Matching）。' +
          '用直达波/测井提取目标域子波，滤波校正至源域 15Hz Ricker 空间；Method 写清此物理前置步骤。',
        mustAnswer: [
          '源域/目标域子波频谱对比图？未匹配时 MMD 下降多少、匹配后多少？',
          '子波校正后迁移 CC/GFS 是否显著提升？'
        ],
        actions: [
          { priority: 1, text: 'Method §Data Harmonization：子波提取+反褶积+15Hz 匹配流程', cost: '写作 · 半天' },
          { priority: 2, text: '消融：有/无子波匹配时 MMD 与迁移性能对比', cost: '实验 · 1–2 天' }
        ]
      },
      hiddenBomb: {
        title: '地雷三：少样本迁移中的「算力黑洞」',
        wrongClaim:
          '少样本微调 + MMD 即可证明迁移有效；推断开销可忽略。',
        reality:
          '扩散推断 T=50~100 步 × 每步正演 F(v) × N_s 炮 = 单样本数千~万次 PDE。' +
          '100 测试样本 + MMD 特征提取 → GPU 跑数天。',
        consequence:
          '「样本少但推断比传统 FWI 更贵」→ 伪命题，审稿人直接嘲讽算力效率。',
        correction:
          '扩散引导阶段用混叠/编码震源 (Simultaneous Sources)：N_s 炮 → 1~3 超炮，' +
          'PDE 调用降 ~95%；扩散先验抑交叉_talk。参考 #45 Stage1 + geofwi_physics_core/simultaneous_source.py；' +
          'Implementation 必须报告「每样本 PDE 求解次数」。',
        mustAnswer: [
          '单样本推断共几次 wave-equation solve？编码超炮后降到多少？',
          'cross-talk 如何抑制？与分炮 L₂/W₂ 精度 trade-off？'
        ],
        actions: [
          { priority: 1, text: '实现 encoding matrix + 超炮正演；日志记录 pde_solve_count', cost: '代码 · 1–2 天' },
          { priority: 2, text: 'Table：separate-shot vs simultaneous 的 CC/GFS 与 wall-time', cost: '实验 · 1 天' }
        ]
      }
    }
  ],
  unreliableCitations: [
    { bad: 'Chang (2021), Unsupervised domain adaptation using MMD for lithology identification', verdict: '无法核实 — 疑似 AI 幻觉', replace: 'Gretton et al. 2012 JMLR; Long et al. 2015 DAN; Sun & Saenko 2016 CORAL' },
    { bad: 'Proposition 1 / homotopy 全局 POCS 收敛', verdict: '已在 main.tex 删除（2026-06-17）— 保持 Remark 1 + P1-F0', replace: '勿重新插入 \\begin{proposition}' },
    { bad: '非线性 FWI 每步封闭硬投影 Π_M 到 M={v:||d-F(v)||²≤ε}', verdict: '数学伪命题 — F 非线性无封闭解', replace: 'Non-linear Proximal Guidance：K 次伴随梯度纠偏 score' },
    { bad: '\\cite{shen2024posterior} — Intro 区分 DPS 关键引用', verdict: '待核实 — ntfa.bib 未上传', replace: '文献验证工具 / CrossRef；不存在则改引 Chung DPS #41' },
    { bad: '\\cite{li2024seisfusion} — 与 SeisFusion #33 一致性', verdict: '待核实 — 确认 bib key/年份/作者', replace: '对照 LIT_DATA #33 + CrossRef' },
    { bad: '盐顶深度/断层倾角误差评估 MSE 训练的 InversionNet', verdict: '逻辑悖论 — 模糊输出无清晰界面', replace: '初至走时残差 Δt_first / 零偏移距偏移波场误差 E_mig' },
    { bad: '仅重采样观测系统即可做 MMD 域适应（忽略震源子波）', verdict: '物理盲区 — MMD 测子波差异非地质差异', replace: 'MMD 前子波反褶积+频谱匹配至 15Hz Ricker' },
    { bad: 'OpenFWI 提供 InversionNet/VelocityGAN 预测 .npy', verdict: '事实错误 — 须自训', replace: 'GitHub lanl/OpenFWI 官方代码自训' },
    { bad: 'DPS/近端引导全程 L₂ 似然梯度', verdict: '相位盲区 — 早期 cycle-skipping 毒化 score', replace: 'W₂² 早期 + L₂ 后期 hybrid（Peng #47）' },
    { bad: 'GFS 纯像素空间 IoU/梯度', verdict: '网格锁死 — 跨数据集物理尺度不可比', replace: 'GFS_λ 波长归一化（Δx·px/λ）' },
    { bad: '扩散迁移推断忽略 T×N_s PDE 开销', verdict: '算力黑洞', replace: 'Simultaneous/Encoded Sources（#45 Stage1）' }
  ],
  verifiedCitations: [
    { ref: 'Qiu et al. 2017 SEG pp.1286-1290, DOI 10.1190/segam2017-17681930.1', note: 'OT norm FWI — 可用' },
    { ref: 'Yang, Engquist, Sun, Froese 2018 Geophysics 83(1) R43-R62', note: '期刊扩展版，正式引用首选' },
    { ref: 'Peng et al. 2026, arXiv:2603.16393', note: 'W₂ physics-guided diffusion FWI — Paper 1 直接竞品 · P1-E9 必对比' },
    { ref: 'Feng et al. 2026, arXiv:2603.00377', note: 'Scaling FWI — Paper 3 须差异化 · P3-E9 训练语料 ablation' }
  ],
  globalPriorities: [
    'Step 0 · Paper 1 投稿冻结：核对 metrics_canonical JSON ↔ Table 1 数字一致',
    'Step 1 · Paper 1 deferred：ms/step wall-clock · bootstrap CI · N-stage ablation',
    'Step 2 · Paper 1 optional：Related Work 编号对比清单 · residual_vs_k 补充图',
    'Step 3 · Paper 2：GFS_λ + 外部验证 · tex 投稿壳',
    'Step 4 · Paper 3：编码震源 + P3-E9 训练语料 ablation（GPU 门控）'
  ],
  citeCheckBatch:
    '@article{gretton2012,\n  author={Gretton, Arthur and Borgwardt, Karsten M and Rasch, Malte J and Sch{\\\"o}lkopf, Bernhard and Smola, Alexander},\n  title={A Kernel Two-Sample Test},\n  journal={Journal of Machine Learning Research},\n  volume={13},\n  pages={723--773},\n  year={2012}\n}\n\n' +
    'Chung, H., Sim, B., Ryu, Y., Ye, J. (2023). Diffusion Posterior Sampling for General Noisy Inverse Problems. ICLR.\n\n' +
    'shen2024posterior — verify in ntfa.bib / CrossRef (main.tex Intro DPS distinction)\n\n' +
    'li2024seisfusion — verify against SeisFusion #33\n\n' +
    'Chang (2021), Unsupervised domain adaptation using maximum mean discrepancy optimization for lithology identification'
};

/* ════ 三篇论文核心设计思路全景（整合致命错误+文献+对比+图表） ════ */
var DESIGN_PANORAMA = {
  title: 'GeoFWI 三篇论文：核心设计与思路全景',
  subtitle: '整合致命错误清单、42篇文献库、技术对比矩阵、图表逻辑与审稿理论审计',
  positioningAscii:
    '        物理梯度引导\n' +
    '            ↑\n' +
    '    PINN-FWI(软)  ★ GC-FWI\n' +
    '            |    ╱\n' +
    '   ─────────┼──╱────────→ 课程学习\n' +
    '            |╱\n' +
    '      DiffusionFWI\n' +
    '      (无约束，无课程)',
  papers: [
    {
      id: 'p1', tag: 'Paper 1 — GC-FWI · 路径一诊断稿', journal: 'IEEE TGRS / Computers & Geosciences / ML4PS',
      question: '在 GeoFWI velocity-proxy 上，扩散+近端+课程能否诚实建立可复现基准，并诊断 domain gap / 机制局限 — 而非声称 Geophysics SOTA？',
      pillars: [
        { title: 'Non-linear Proximal Guidance', body:
          'v*_{t-1} = DDPM_step + score − α·∇_v ||r_norm(v)||²  （K 次伴随梯度，非封闭 Π_M）\n' +
          'P1-F0：37/55 improved · 0/55 converged @ K=5 — 机制草证，非全局收敛保证。\n' +
          '代码：proximal_bridge.py · bayesian_diffusion.py · w2_guidance.py' },
        { title: '11级地质课程 (GCI) + proxy 主表', body:
          'Proxy Table 1（50ep）：GC-FWI CC=0.859 vs U-Net 0.916 / PINN 0.896 · Wilcoxon p≈0。\n' +
          'Shot-gather pilot CC=0.591 · Path B CC=0.391 — 独立诊断表，不进 Table 1。\n' +
          'tbl:evidence_map 对照实验→claim；诊断 Conclusion 已写入 main.tex（56pp）。' }
      ],
      fatalErrors: [
        ['声称 GC-FWI SOTA / field-ready shot-gather FWI', '诊断/框架叙事 · C&G/IEEE · PAPER1_WRITING_STATUS'],
        ['Paper 2 denoising CC≈0.99 写入 P1 Table 1', '任务分离 · paper2Separation'],
        ['用 pilot/Path B 替换 proxy Table 1', '三表独立 · tbl:evidence_map'],
        ['重新引入 Proposition 1 / homotopy 全局收敛 / ε_cfl', '已删 — 保持 Remark 1 + ε_design/ε_gate/ε_rms'],
        ['声称 sampling-time K=5 提升 canonical CC', 'K0 p=1.0 — 仅 training-time physics weight 有 ablation 证据'],
        ['physics_score 全 0 却声称端到端物理合规', 'Limitations 已声明 · gate 未达标'],
        ['ms/step wall-clock 未测却写具体数字', '标 deferred 或删具体 ms'],
        ['N-stage / bootstrap CI / MC dropout UQ 未跑却写结果', 'Table ablation deferred 行或 §Deferred Analyses']
      ],
      resolvedFatals: [
        ['Table 1 CC=0.00/0.62 占位', '→ metrics_canonical_*_proxy.json · CC 0.859/0.916/0.896'],
        ['U-Net 6 层下采样几何错误', '→ 3 stage hidden_dim=32 T=20'],
        ['Proposition 1 全局 POCS', '→ Remark 1 + homotopy 段删除'],
        ['ε_cfl 混用', '→ ε_design / ε_gate / ε_rms'],
        ['w/o proximal 消融空', '→ tbl:ablation CC 0.763'],
        ['dual-branch / cross-attention 未实现', '→ 已从 main.tex 删除']
      ],
      metrics: 'Proxy Table 1: GC-FWI CC=0.859 · U-Net 0.916 · PINN 0.896 · GFS 列 · Wilcoxon audited · 非 denoising CC≈0.99',
      mustCite: 'Tarantola 1984; Virieux 2009; InversionNet #11; DiffusionFWI #34; Liu 2026 CondDiff #43; Taufik 2026 Bayesian GJI #44; SeisFusion #33; PINN #14; Curriculum #35; Score-SDE #38; Song medical #39; DPS #41; GeoFWI #37'
    },
    {
      id: 'p2', tag: 'Paper 2 — GFS', journal: 'Computers & Geosciences · tex 润色中',
      question: 'CC/SSIM/RMSE 在盐体等高对比构造上是否可靠？n=5000 七方法对比：gc_fwi CC 最高 vs unet GFS 最高 — 排名颠倒。',
      pillars: [
        { title: 'GFS 公式', body:
          'GFS(v̂,v) = ½[ IoU(S_v̂,S_v) + (1+mean(cos∠(∇v̂,∇v))/2) ]  ∈ [0,1]\n' +
          '界面 IoU：梯度阈值 τ（验证集 ROC 定**全局固定** τ + 敏感性曲线；禁 per-sample GT p75 跨样本排名）。\n' +
          '**定位**：eval-only；标准 IoU 不可微。GFS_λ：边界误差波长归一化（gfs_wavelength.py）。\n' +
          '**Soft-GFS**（加分）：Soft-IoU + 梯度模长权重 → 可微训练 Loss。' },
        { title: '分层实验', body:
          'GeoFWI 30 种地质类型分层；盐体 GFS vs CC 散点，Kendall τ [TBD]。\n' +
          'OpenFWI 须自训 InversionNet/VelocityGAN。\n' +
          '**物理标尺**（PAPER2_PHYSICS_METRICS）：Δt_first 初至走时残差；E_mig 零偏移距叠加成像相对 L2 误差。\n' +
          'CC 高分模型走时残差仍大；GFS 与 Δt_first 单调相关 [TBD]。' }
      ],
      fatalErrors: [
        ['误称 OpenFWI 有预测 .npy', 'GitHub 自训 InversionNet + VelocityGAN'],
        ['组A/组B 手挑案例', 'Kendall/Spearman 排名分歧 → 选分歧最大样本'],
        ['GFS IoU 不可微未声明', 'Discussion 明确 eval-only；可选 Soft-GFS'],
        ['用盐顶深度评估 MSE 模糊 CNN', '改初至走时残差 / 零偏移距偏移波场误差'],
        ['GFS 纯像素 IoU/梯度', 'GFS_λ：Scaled_Error=(Δx·px_dist)/λ；gfs_wavelength.py']
      ],
      methodsMust: ['梯度阈值分割算法完整描述', 'τ 的 ROC 验证集依据', '与人工地质标注一致性'],
      mustCite: 'Das #30; Wu 2021 W-1; Li #29; DLM-FWI #20; Zheng 2025 PCAMUNet #45; GeoFWI #37'
    },
    {
      id: 'p3', tag: 'Paper 3 — Training Data', journal: 'JGR: Machine Learning and Computation',
      question: '地质过程约束训练数据（GeoFWI）vs 统计 LDM 扩增（类 Feng #48），谁更能迁移出高 GFS_λ 结构？',
      pillars: [
        { title: 'P3-E9 主实验（vs Feng #48）', body:
          '固定架构与算力 · 训练语料 A=GeoFWI / B=OpenFWI+LDM 扩增\n' +
          '目标域 Marmousi2 + SEG Salt · **主指标 GFS_λ**（辅 CC/SSIM）\n' +
          '命题：地质物理合理数据 > 统计海量数据（文献未正面检验）' },
        { title: '物理前置 + 三篇闭环', body:
          '子波匹配 15Hz Ricker · 观测对齐 · P3-E8 诊断分解为补充\n' +
          '源模型=Paper1；评估=GFS(Paper2)；Discussion TRI-E1 三反直觉案例' }
      ],
      fatalErrors: [
        ['主 claim 仍为「GeoFWI 零样本迁移更好」', 'Feng #48 / GeoFWI SGDS 已占坑 → 改 P3-E9 训练语料 ablation'],
        ['直接迁移 GC-FWI 到 EFWI', '文档化 Vp→Vp/Vs 改动；EFWI 放远期'],
        ['观测系统 N_s×N_r×N_t 不匹配', 'Sinc 重采样或 RTM Image-to-Model'],
        ['忽略震源子波主频/相位', 'MMD 前子波反褶积+频谱匹配至 15Hz Ricker'],
        ['T×N_s PDE 推断算力黑洞', 'Simultaneous/Encoded Sources；报告 pde_solve_count']
      ],
      mustCite: 'SeisInvNet #12; Feng 2026 #48; Ni 2026 LSM-DA #46; Gretton 2012 MMD; GeoFWI #37; OpenFWI #31'
    }
  ],
  smartFwiNote: 'Smart FWI (#16)：DL 嵌入传统 FWI 迭代循环做梯度加速；GC-FWI：扩散每步 K 次伴随梯度近端引导——施加时机与机制完全不同。',
  competitiveNote: '见 COMPETITIVE_LANDSCAPE：Peng #47（W₂ diffusion）、Feng #48（scaling）、GeoFWI 原文 SGDS — 三篇须在此框架下差异化。',
  surpriseNote: '见 EXPERIMENT_SURPRISE + COMPETITIVE_LANDSCAPE：Pareto / 噪声三方 / GFS 决策 / 地质过程数据 ablation。'
};

/* =================================================================
   Firebase 安全规则模板 — 粘贴到 Firebase Console → Firestore → Rules
================================================================= */
var FIREBASE_RULES_TEMPLATE =
  "rules_version = '2';\n" +
  "service cloud.firestore {\n" +
  "  match /databases/{database}/documents {\n" +
  "    match /users/{userId}/{document=**} {\n" +
  "      allow read, write: if request.auth != null\n" +
  "        && request.auth.token.email == \"" + FIREBASE_ALLOWED_EMAIL + "\";\n" +
  "    }\n" +
  "  }\n" +
  "}";

/* =================================================================
   用户自定义区 — 直接写，不影响程序运行
================================================================= */
var USER_LIT_ANNOTATIONS = {
  /* id: '私人笔记内容'  示例:
     11: 'InversionNet已复现，GeoFWI CC=0.48',
     37: 'GeoFWI已下载到 /data/geofwi/', */
};

var CUSTOM_PROMPTS_OVERRIDE = {
  /* 示例: ars: '你的自定义ARS提示词...', */
};

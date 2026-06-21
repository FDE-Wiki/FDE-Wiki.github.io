import DefaultTheme from 'vitepress/theme';
import { useData } from 'vitepress';
import { h, ref, onMounted, onBeforeUnmount } from 'vue';
import './custom.css';
import { readOrder, pageMeta } from '../generated.mjs';

// 标签 → 类别映射（与受控词表一致）。未命中的归 other。
const TAG_CAT = {
  // 行业
  '金融': 'industry', '医疗': 'industry', '制造': 'industry', '政务': 'industry',
  '零售电商': 'industry', '物流供应链': 'industry', '能源': 'industry', '电信媒体': 'industry',
  '法律': 'industry', '教育': 'industry', '农业': 'industry',
  // 技术
  'RAG': 'tech', 'Agent': 'tech', 'LLM选型': 'tech', '模型微调': 'tech', '推理优化': 'tech',
  '数据工程': 'tech', 'MLOps': 'tech', '安全合规': 'tech', '可观测性': 'tech', '边缘AI': 'tech',
  '知识图谱': 'tech', '多模态': 'tech', '成本容量': 'tech', '应用架构': 'tech', '性能调优': 'tech',
  '系统测试': 'tech', '可解释性': 'tech', '隐私计算': 'tech', '云原生': 'tech', '评估测试': 'tech',
  // 方法
  '项目交付': 'method', '需求工程': 'method', 'ROI': 'method', '合规伦理': 'method',
  '售前招投标': 'method', '客户成功': 'method', '组织变革': 'method', '产品化': 'method',
  '国际化': 'method', '知识管理': 'method', 'Prompt工程': 'method', '沙盘培养': 'method',
  // 能力
  '团队': 'skill', '职业发展': 'skill', '沟通': 'skill', '写作': 'skill', '演示汇报': 'skill',
  '财务素养': 'skill', '持续学习': 'skill', '思维模型': 'skill', '跨职能': 'skill',
  '可持续健康': 'skill', '失败复盘': 'skill', '案例研究': 'skill',
  // 视角
  '中国市场': 'angle', '海外模式': 'angle', '行业大模型': 'angle', '工具箱': 'angle'
};
const catOf = (t) => TAG_CAT[t] || 'other';
// 标签 slug(与 scripts/split.mjs 的 slugifyTag 一致,确保页顶徽章跳转到 /tags 的标题锚点)
const slugifyTag = (s) => s.toLowerCase().replace(/ +/g, '-').replace(/[^a-z0-9一-鿿-]/g, '');

// 当前页 slug(从 page.relativePath 推导,如 'ch01.md' → 'ch01','index.md' → '')
const curSlug = (page) => (page.value.relativePath || '').replace(/\.md$/, '').replace(/\/index$/, '');

// 读取 frontmatter.tags,在正文上方渲染 #标签 徽章(按类别配色),点击跳 /tags。
const TagBadges = {
  setup() {
    const { frontmatter } = useData();
    return () => {
      const tags = frontmatter.value.tags;
      if (!tags || !tags.length) return null;
      return h(
        'div',
        { class: 'tag-badges' },
        tags.map((t) =>
          h('a', { class: 'tag-badge tag-' + catOf(t), href: '/tags#' + slugifyTag(t) }, '#' + t)
        )
      );
    };
  }
};

// ---------- 面包屑:篇 › 当前页 ----------
const Breadcrumb = {
  setup() {
    const { page } = useData();
    return () => {
      const meta = pageMeta[curSlug(page)];
      if (!meta || !meta.part || meta.kind === 'part' || meta.kind === 'home') return null;
      return h('nav', { class: 'breadcrumb', 'aria-label': '位置' }, [
        h('span', { class: 'crumb-part' }, meta.part),
        h('span', { class: 'crumb-sep' }, '›'),
        h('span', { class: 'crumb-cur' }, meta.title)
      ]);
    };
  }
};

// ---------- 阅读时间:前端按字数估算 ----------
const ReadingTime = {
  setup() {
    const { page } = useData();
    const mins = ref(0);
    const calc = () => {
      const doc = document.querySelector('.vp-doc');
      if (!doc) return;
      const text = doc.textContent || '';
      const cjk = (text.match(/[一-鿿]/g) || []).length;
      const words = (text.match(/[a-zA-Z]+/g) || []).length;
      mins.value = Math.max(1, Math.round(cjk / 400 + words / 200));
    };
    onMounted(() => { setTimeout(calc, 400); });
    return () => mins.value ? h('span', { class: 'reading-time', key: page.value.path }, '📖 约 ' + mins.value + ' 分钟') : null;
  }
};

// ---------- 上一篇 / 下一篇 ----------
const PrevNext = {
  setup() {
    const { page } = useData();
    const link = (s) => (s === '' ? '/' : '/' + s);
    const title = (s) => ((pageMeta[s] && pageMeta[s].title) || s);
    return () => {
      const idx = readOrder.indexOf(curSlug(page));
      if (idx < 0) return null;
      const prev = idx > 0 ? readOrder[idx - 1] : null;
      const next = idx < readOrder.length - 1 ? readOrder[idx + 1] : null;
      return h('nav', { class: 'prev-next' }, [
        prev ? h('a', { class: 'pn-link pn-prev', href: link(prev) }, [h('span', { class: 'pn-label' }, '← 上一篇'), h('span', { class: 'pn-title' }, title(prev))]) : h('span', { class: 'pn-placeholder' }),
        next ? h('a', { class: 'pn-link pn-next', href: link(next) }, [h('span', { class: 'pn-label' }, '下一篇 →'), h('span', { class: 'pn-title' }, title(next))]) : h('span', { class: 'pn-placeholder' })
      ]);
    };
  }
};

// ---------- 阅读进度条(顶部)----------
const ReadingProgress = {
  setup() {
    const pct = ref(0);
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      pct.value = total > 0 ? Math.min(100, (el.scrollTop / total) * 100) : 0;
    };
    onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); });
    onBeforeUnmount(() => window.removeEventListener('scroll', onScroll));
    return () => h('div', { class: 'reading-progress' }, [h('div', { class: 'reading-progress-bar', style: { width: pct.value + '%' } })]);
  }
};

// ---------- 返回顶部 ----------
const BackToTop = {
  setup() {
    const show = ref(false);
    const onScroll = () => { show.value = window.scrollY > 500; };
    onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); });
    onBeforeUnmount(() => window.removeEventListener('scroll', onScroll));
    return () => h('button', {
      class: 'back-to-top' + (show.value ? ' is-visible' : ''),
      onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
      'aria-label': '返回顶部'
    }, '↑');
  }
};

// ---------- 字号记忆(localStorage)----------
const FontSize = {
  setup() {
    const size = ref(16);
    const apply = (n) => { document.documentElement.style.setProperty('--vp-doc-font-size', n + 'px'); };
    onMounted(() => {
      const saved = parseInt(localStorage.getItem('vp-font-size') || '16', 10);
      size.value = isNaN(saved) ? 16 : saved;
      apply(size.value);
    });
    const adjust = (d) => {
      size.value = Math.max(13, Math.min(22, size.value + d));
      localStorage.setItem('vp-font-size', String(size.value));
      apply(size.value);
    };
    return () => h('div', { class: 'font-size-ctrl' }, [
      h('button', { class: 'fs-btn', onClick: () => adjust(-1), title: '缩小字号', 'aria-label': '缩小字号' }, 'A−'),
      h('button', { class: 'fs-btn', onClick: () => adjust(1), title: '放大字号', 'aria-label': '放大字号' }, 'A+')
    ]);
  }
};

export default {
  extends: DefaultTheme,
  Layout: () =>
    h('div', { class: 'layout-wrapper' }, [
      h(ReadingProgress),
      h(DefaultTheme.Layout, null, {
        'doc-before': () => h('div', { class: 'doc-prelude' }, [h(Breadcrumb), h(ReadingTime), h(TagBadges)]),
        'doc-after': () => h(PrevNext),
        'nav-bar-content-before': () => h(FontSize)
      }),
      h(BackToTop)
    ])
};

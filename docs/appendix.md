---
title: "附录"
---

## 附录 A 术语表

| 术语 | 全称/含义 | 说明 |
|---|---|---|
| **FDE** | Forward Deployed Engineer | 前沿部署工程师;把 AI/数据系统部署到客户真实环境并对业务结果负责 |
| **FDSE** | Forward Deployed Software Engineer | 前沿部署软件工程师;Palantir 体系里的 Delta,写生产代码 |
| **Echo** | Deployment Strategist | 部署策略师;Palantir 三角编队里挖问题、定义价值的角色 |
| **Delta** | FDSE | 前沿部署软件工程师;搭系统的主力 |
| **Dev** | Core Software Engineer | 核心平台工程师;造 Foundry/Gotham/AIP 底座 |
| **Forward Deployed** | 前沿部署 | 借自军事术语,指把能力推到离问题最近的地方 |
| **CDEF** | Context-Design-Engineer-Feedback | FDE 四阶段方法论 |
| **MVD** | Minimum Viable Delivery | 最小可行交付;先跑通最小系统 |
| **FDCE** | Forward-Deployed Context Engineering | 前沿部署上下文工程;2026 新提法 |
| **Discovery-first** | 发现优先 | 先发现真问题再动手 |
| **Working Backwards** | 倒推 | 从客户结果倒推系统 |
| **capability atrophy** | 能力衰退 | 系统上线后价值逐渐衰退 |
| **MCP** | Model Context Protocol | Anthropic 提出的 Agent 工具接口标准 |
| **HITL** | Human-in-the-Loop | 人在回路;关键节点人介入 |
| **RAG** | Retrieval-Augmented Generation | 检索增强生成 |
| **Agent** | AI Agent | 能自主多步调用工具完成任务的 AI |
| **Guardrails** | 护栏 | 输入/输出/工具的安全过滤 |
| **DeployCo** | OpenAI Deployment Company | OpenAI 的交付公司 |
| **FDU** | Forward Deployed Units | IBM 的前沿部署单元;方法论产品化 |
| **Applied AI Engineer** | — | Anthropic 的 FDE 叫法 |
| **Agentforce** | — | Salesforce 的 AI Agent 平台 |
| **Foundry/Gotham/AIP** | — | Palantir 三大平台 |
| **Echo-Delta pairing** | — | Echo 和 Delta 在现场紧密配对 |
| **OWASP MCP Top 10** | — | Agent 工具调用安全清单 |
| **等保 2.0** | 网络安全等级保护 | 中国网络安全合规框架 |
| **PIPL/DSL** | 个保法/数安法 | 中国个人信息保护法/数据安全法 |
| **信创** | 信息技术应用创新 | 中国国产化替代 |
| **DRG** | Diagnosis Related Groups | 疾病诊断相关分组(医保支付) |
| **ICD-10/ICD-9-CM-3** | — | 国际疾病/手术分类编码 |
| **PSI/KS/SHAP** | — | 模型稳定性/区分度/可解释性指标 |

## 附录 B 工具与框架清单(2026 生产级)

**模型层**
- 闭源:GPT 系列、Claude 系列、Gemini;
- 开源:Llama、Qwen、DeepSeek、Mistral、GLM;
- 国产:通义、文心、豆包、智谱、Kimi、盘古;
- 量化:AWQ、GPTQ、bitsandbytes。

**推理服务**
- vLLM(事实标准)、TGI、TensorRT-LLM、SGLang。

**RAG 与检索**
- 向量库:Milvus/Zilliz、Qdrant、Weaviate、pgvector、ES/OpenSearch;
- 嵌入:bge、OpenAI/Cohere embed、通义/智谱 embed;
- 重排:bge-reranker、Cohere rerank;
- 知识图谱:Neo4j、Graph<abbr class="term" title="检索增强生成">RAG</abbr>。

**Agent 编排**
- LangGraph(生产标准)、CrewAI、OpenAI <abbr class="term" title="能自主多步调用工具完成任务的 AI">Agent</abbr>s SDK、Google ADK、Microsoft <abbr class="term" title="能自主多步调用工具完成任务的 AI">Agent</abbr> Framework、LlamaIndex Workflows、Mastra;
- MCP(工具接口);
- 护栏:<abbr class="term" title="输入/输出/工具的安全过滤">Guardrails</abbr> AI、NeMo <abbr class="term" title="输入/输出/工具的安全过滤">Guardrails</abbr>。

**数据管道**
- 批:Spark、Dask、Pandas;
- 流:Flink、Kafka;
- 编排:Temporal、Prefect、Airflow;
- 转换:dbt;
- 质量:Great Expectations、Soda。

**可观测与评估**
- LLM 可观测:LangSmith、Langfuse、Phoenix(Arize);
- 通用:OpenTelemetry;
- 评估:自建 eval 集、LLM-as-judge。

**部署**
- 容器:Docker、K8s;
- 边缘:NVIDIA Jetson、国产边缘盒(昇腾 Atlas、瑞芯微);
- <abbr class="term" title="中国国产化替代">信创</abbr>:鲲鹏/飞腾/昇腾 + 麒麟/统信 + 达梦/OceanBase。

**行业专用**
- 金融:LightGBM/XGBoost、评分卡、SHAP;
- 医疗:NER、HL7/FHIR、ICD 编码;
- 制造:YOLOv8/RT-DETR、TensorRT、snap7/opcua;
- 物流:OR-Tools、Gurobi、强化学习。

## 附录 C 参考资料来源(分类)

> 本报告数据与论断来自以下公开来源(2025—2026),按类别整理。部分来源为招聘平台 JD、公司官方、行业报告、媒体报道。

**市场与薪酬数据**
- Christian & Timbers(Indeed <abbr class="term" title="前沿部署工程师;把 AI/数据系统部署到客户真实环境并对业务结果负责">FDE</abbr> 岗位 729% 增长);
- Paraform(FDE 1165% YoY、OpenAI FDE $350K—$550K);
- Salesforce News(FDE 800% spike);
- Levels.fyi / Glassdoor / ZipRecruiter / Hashnode / Recruiting from Scratch / KORE1 / Perspective.ai(薪酬);
- JobsByCulture(224 实时岗位);
- 财联社 / 中新经纬(中国 <abbr class="term" title="前沿部署工程师;把 AI/数据系统部署到客户真实环境并对业务结果负责">FDE</abbr> 42 倍);
- Sundeep Teki(95% 失败率、$135K—$600K)。

**头部公司 FDE 模式**
- Palantir 官方博客(Dev vs <abbr class="term" title="前沿部署软件工程师;搭系统的主力">Delta</abbr>、Who Wants to be a Delta)、Palantir Careers;
- OpenAI(Launches the Deployment Company)、OpenAI Careers(FDE Gov);
- Anthropic(Applied AI)、CIO.com(FIS-Anthropic)、FIS 投资者新闻;
- IBM Newsroom(Forward Deployed Units, 2026-05-14);
- Databricks / Snowflake / Salesforce Careers;
- Medium《A Comprehensive Analysis of Palantir's <abbr class="term" title="前沿部署工程师;把 AI/数据系统部署到客户真实环境并对业务结果负责">FDE</abbr> Model》、ForwardDeployedEngineer.site、MindStudio(640% returns)。

**方法论与工作方式**
- Resolve.ai《Why Enterprise AI Needs <abbr class="term" title="前沿部署工程师;把 AI/数据系统部署到客户真实环境并对业务结果负责">FDE</abbr>s》;
- PostHog《WTF is a <abbr class="term" title="借自军事术语,指把能力推到离问题最近的地方">Forward Deployed</abbr> Engineer?》;
- Grid Dynamics / TSIA / Stermedia / Rackspace(FDE 定义);
- LinkedIn(Natarajan, discovery-first)、SVPG、LinkedIn Learning;
- Healthcare IT Today(FDCE, 2026.04);
- Amazon <abbr class="term" title="从客户结果倒推系统">Working Backwards</abbr>。

**Agent 与技术栈**
- O'Reilly《The AI <abbr class="term" title="能自主多步调用工具完成任务的 AI">Agent</abbr>s Stack 2026 Edition》;
- LangChain《Best AI <abbr class="term" title="能自主多步调用工具完成任务的 AI">Agent</abbr> Frameworks 2026》;
- Alice Labs(18+ 生产部署)、StackOne(120+ 工具)、Uvik(LangGraph vs CrewAI);
- OWASP <abbr class="term" title="Anthropic 提出的 Agent 工具接口标准">MCP</abbr> Top 10(beta)、Anthropic <abbr class="term" title="Anthropic 提出的 Agent 工具接口标准">MCP</abbr> 文档;
- vLLM / Milvus / LangGraph 官方文档。

**行业落地**
- Cambridge Judge《2026 Global AI in Financial Services Report》、Cyberhaven(17x gap);
- IBM FDU(医疗)、Teamvoy(医疗 AI)、Keragon(医疗 Agent)、Commure(50% 驻场);
- Snowflake/Lockheed Martin/H2O.ai/Stord(制造/国防 <abbr class="term" title="前沿部署工程师;把 AI/数据系统部署到客户真实环境并对业务结果负责">FDE</abbr> JD);
- SB Energy(MCP)、Adzuna(公用事业 $135-200K)、Kinaxis/Brillio(供应链);
- EY/Deloitte(金融/咨询 <abbr class="term" title="前沿部署工程师;把 AI/数据系统部署到客户真实环境并对业务结果负责">FDE</abbr> JD)。

**合规与安全**
- 《个人信息保护法》《数据安全法》《网络安全等级保护基本要求》(等保 2.0);
- JR/T 0171、<abbr class="term" title="Agent 工具调用安全清单">OWASP MCP Top 10</abbr>、GDPR、HIPAA。

**用户自有语料库(本书行业落地部分的真实可复刻素材来源)**
- 《<abbr class="term" title="FDE 四阶段方法论">CDEF</abbr>方法论》《<abbr class="term" title="前沿部署工程师;把 AI/数据系统部署到客户真实环境并对业务结果负责">FDE</abbr>工程师完全指南》《<abbr class="term" title="前沿部署工程师;把 AI/数据系统部署到客户真实环境并对业务结果负责">FDE</abbr>工程化工具链》《<abbr class="term" title="前沿部署工程师;把 AI/数据系统部署到客户真实环境并对业务结果负责">FDE</abbr>工具链评测》;
- 《<abbr class="term" title="前沿部署工程师;把 AI/数据系统部署到客户真实环境并对业务结果负责">FDE</abbr>落地方案》四份(制造业 AI 视觉质检 / 医院病历质控与 <abbr class="term" title="疾病诊断相关分组(医保支付)">DRG</abbr> / 政务 12345 / 金融智能风控与尽调);
- 《<abbr class="term" title="前沿部署工程师;把 AI/数据系统部署到客户真实环境并对业务结果负责">FDE</abbr>实战案例集》《<abbr class="term" title="前沿部署工程师;把 AI/数据系统部署到客户真实环境并对业务结果负责">FDE</abbr>行业垂直场景》《<abbr class="term" title="前沿部署工程师;把 AI/数据系统部署到客户真实环境并对业务结果负责">FDE</abbr>渗透传统行业》《<abbr class="term" title="前沿部署工程师;把 AI/数据系统部署到客户真实环境并对业务结果负责">FDE</abbr>商业变现》;
- 《<abbr class="term" title="前沿部署工程师;把 AI/数据系统部署到客户真实环境并对业务结果负责">FDE</abbr>_<abbr class="term" title="能自主多步调用工具完成任务的 AI">Agent</abbr>》《<abbr class="term" title="前沿部署工程师;把 AI/数据系统部署到客户真实环境并对业务结果负责">FDE</abbr>_<abbr class="term" title="能自主多步调用工具完成任务的 AI">Agent</abbr>混合作战单元》《<abbr class="term" title="前沿部署工程师;把 AI/数据系统部署到客户真实环境并对业务结果负责">FDE</abbr> Prompt工程模板库》;
- fde-delivery 技能包(SKILL + references 10—120 + templates);
- 《<abbr class="term" title="前沿部署工程师;把 AI/数据系统部署到客户真实环境并对业务结果负责">FDE</abbr>培养方案》《<abbr class="term" title="前沿部署工程师;把 AI/数据系统部署到客户真实环境并对业务结果负责">FDE</abbr>技能词条大全》《<abbr class="term" title="前沿部署工程师;把 AI/数据系统部署到客户真实环境并对业务结果负责">FDE</abbr>教案》《<abbr class="term" title="前沿部署工程师;把 AI/数据系统部署到客户真实环境并对业务结果负责">FDE</abbr>项目文档追溯模板》。

<abbr class="term" title="---">---</abbr>

> **报告全文完。** 本报告共 **四篇 23 章正文 + 62 个深度专题 + 附录**(约 35 万中文字),系统覆盖 2026 年 FDE 的市场全景、工作方法论、全行业落地、能力商业与未来,外加 RAG/Agent/推理/数据/安全/架构等技术纵深与项目管理/团队/职业/沟通等能力纵深专题。关键论断均带数据来源,落地部分带可执行命令与代码,力求"真实可复刻、不注水"。

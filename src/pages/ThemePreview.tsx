import { Link } from 'react-router-dom';
import { Activity, AlertTriangle, Compass, Crosshair, Flag, Radio, Shield, Target, Users, Waves } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';

function PreviewShell({
  id,
  kicker,
  title,
  description,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mb-14 sm:mb-20">
      <div className="mb-5 sm:mb-6">
        <p className="section-label mb-2">{kicker}</p>
        <h2 className="page-title text-2xl sm:text-3xl md:text-4xl mb-2">{title}</h2>
        <p className="text-fy-steel/75 text-sm max-w-2xl">{description}</p>
      </div>
      {children}
    </section>
  );
}

function MainMenuPreview() {
  const menuItems = ['开始部署', '服务器浏览', '战队招募', '战术百科'];

  return (
    <div className="hud-frame theme-grid rounded-sm overflow-hidden">
      <div className="grid lg:grid-cols-[1.15fr_0.85fr] min-h-[540px]">
        <div className="relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/hero.jpg')" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(15,19,23,0.92)_10%,rgba(15,19,23,0.66)_48%,rgba(15,19,23,0.84)_100%)]" />
          <div className="relative z-10 p-6 sm:p-10 md:p-12 flex h-full flex-col justify-between">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="section-label mb-2">战术主菜单</p>
                <h3 className="font-hud text-fy-silver text-3xl sm:text-4xl tracking-[0.18em]">肥鸭战队</h3>
                <p className="font-mono text-fy-steel/70 text-[11px] tracking-[0.28em] mt-2">战场就绪界面</p>
              </div>
              <span className="status-chip border-fy-amber/40 text-fy-amber bg-fy-amber/10">当前版本</span>
            </div>

            <div className="max-w-xl">
              <p className="font-hud text-fy-amber text-sm tracking-[0.45em] mb-4">沙浪行动</p>
              <h4 className="font-hud text-fy-silver text-4xl sm:text-5xl md:text-6xl tracking-[0.08em] leading-none mb-5">
                战术黄重构后的
                <br />
                主菜单界面
              </h4>
              <p className="text-fy-steel/80 max-w-lg leading-relaxed mb-7">
                以战地琥珀黄作为唯一主色，叠加炭黑基底和金属灰信息层，强化军事 UI 的识别度、沉浸感与长时间观看舒适度。
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="btn-amber text-sm">进入战斗</button>
                <button className="btn-outline text-sm">查看战术手册</button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {menuItems.map((item, index) => (
                <div key={item} className="border border-fy-edge/45 bg-fy-dark/56 px-4 py-3">
                  <p className="font-mono text-fy-steel/40 text-[10px] tracking-[0.25em] mb-2">0{index + 1}</p>
                  <p className="font-hud text-fy-silver text-sm tracking-[0.12em]">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-l border-fy-edge/45 bg-fy-panel/96 p-5 sm:p-7 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="section-label">部署面板</span>
            <span className="font-mono text-fy-info text-[10px] tracking-[0.2em]">小队已连接</span>
          </div>
          <div className="border border-fy-edge/40 bg-fy-dark/72 p-4">
            <p className="data-label mb-2">任务简报</p>
            <p className="font-hud text-fy-silver text-lg tracking-[0.1em] mb-2">城市巷战夜间部署</p>
            <p className="text-fy-steel/75 text-sm leading-relaxed">
              低照度场景下保留高可读性文本与状态标记，避免传统亮黄造成眩光。
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-fy-edge/40 bg-fy-dark/58 p-4">
              <p className="data-label mb-2">就绪单位</p>
              <p className="font-hud text-fy-amber text-3xl tracking-[0.12em]">04</p>
            </div>
            <div className="border border-fy-edge/40 bg-fy-dark/58 p-4">
              <p className="data-label mb-2">信号状态</p>
              <p className="font-hud text-fy-info text-3xl tracking-[0.12em]">OK</p>
            </div>
          </div>
          <div className="border border-fy-edge/40 bg-fy-dark/58 p-4 flex-1">
            <p className="data-label mb-3">Menu Hierarchy</p>
            <div className="space-y-2">
              {['战斗入口高亮', '功能分层压暗', '信息焦点锁定', '角标与边框统一'].map((item) => (
                <div key={item} className="flex items-center gap-3 border-b border-fy-edge/20 pb-2 last:border-b-0">
                  <span className="w-1.5 h-1.5 bg-fy-amber" />
                  <span className="text-fy-steel/78 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HudPreview() {
  const squadMembers = [
    { name: 'SL FY_Commander', state: '指挥链路', color: 'text-fy-amber' },
    { name: 'MED FY_Medic', state: '队友标识', color: 'text-fy-info' },
    { name: 'LAT FY_AT', state: '交战告警', color: 'text-fy-orange-hc' },
    { name: 'RFL FY_Rifleman', state: '生命稳定', color: 'text-fy-silver' },
  ];

  return (
    <div className="hud-frame theme-grid rounded-sm overflow-hidden">
      <div className="relative min-h-[520px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/tactics.jpg')" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,19,23,0.78)_0%,rgba(15,19,23,0.46)_35%,rgba(15,19,23,0.82)_100%)]" />

        <div className="relative z-10 p-4 sm:p-6 md:p-8 min-h-[520px] flex flex-col justify-between">
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-3">
              {[
                { label: 'US', value: '312', tone: 'text-fy-info' },
                { label: 'INS', value: '287', tone: 'text-fy-red-hc' },
              ].map((ticket) => (
                <div key={ticket.label} className="border border-fy-edge/45 bg-fy-dark/72 px-4 py-3 min-w-[112px]">
                  <p className="data-label mb-1">{ticket.label} 兵力值</p>
                  <p className={`font-hud text-3xl tracking-[0.12em] ${ticket.tone}`}>{ticket.value}</p>
                </div>
              ))}
            </div>

            <div className="border border-fy-edge/45 bg-fy-dark/72 px-4 py-3 text-right">
              <p className="section-label mb-1">HUD 预览</p>
              <p className="font-mono text-fy-steel/70 text-[11px] tracking-[0.25em]">沙漠可视性测试</p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="border border-fy-amber/35 bg-fy-dark/58 px-6 py-4 text-center min-w-[240px]">
              <p className="font-mono text-fy-steel/60 text-[10px] tracking-[0.35em] mb-2">控制点</p>
              <p className="font-hud text-fy-amber text-4xl tracking-[0.16em]">纳尔瓦东部</p>
              <div className="mt-4 h-2 bg-fy-edge/30">
                <div className="h-full w-[62%] bg-fy-amber" />
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[300px_1fr_320px] items-end">
            <div className="border border-fy-edge/45 bg-fy-dark/76 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-fy-info" />
                <span className="section-label">小队动态</span>
              </div>
              <div className="space-y-2.5">
                {squadMembers.map((member) => (
                  <div key={member.name} className="flex items-center justify-between text-sm">
                    <span className="text-fy-silver">{member.name}</span>
                    <span className={`font-mono text-[10px] tracking-[0.16em] ${member.color}`}>{member.state}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-fy-edge/45 bg-fy-dark/70 px-4 py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Compass className="w-4 h-4 text-fy-amber" />
                <span className="font-hud text-fy-silver tracking-[0.18em]">罗盘 268°</span>
              </div>
              <div className="flex items-center gap-4 text-[11px] font-mono tracking-[0.2em]">
                <span className="text-fy-steel/70">坐标 D6</span>
                <span className="text-fy-orange-hc">接敌</span>
                <span className="text-fy-info">通讯正常</span>
              </div>
            </div>

            <div className="border border-fy-edge/45 bg-fy-dark/76 p-4">
              <div className="flex items-center gap-2 mb-3">
                <Crosshair className="w-4 h-4 text-fy-red-hc" />
                <span className="section-label">威胁态势</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-fy-steel/78">敌方火力压制</span>
                  <span className="font-mono text-fy-red-hc text-[10px] tracking-[0.15em]">高</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-fy-steel/78">烟幕覆盖状态</span>
                  <span className="font-mono text-fy-amber text-[10px] tracking-[0.15em]">活跃</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-fy-steel/78">队内复活点</span>
                  <span className="font-mono text-fy-info text-[10px] tracking-[0.15em]">安全</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommandPreview() {
  const cards = [
    { icon: Radio, label: '指挥频段', value: '稳定连接', tone: 'text-fy-info' },
    { icon: Shield, label: '后方据点', value: '02 已锁定', tone: 'text-fy-amber' },
    { icon: AlertTriangle, label: '前线告警', value: '1 处交火', tone: 'text-fy-red-hc' },
    { icon: Waves, label: '补给余量', value: '78%', tone: 'text-fy-orange-hc' },
  ];

  return (
    <div className="hud-frame theme-grid rounded-sm overflow-hidden">
      <div className="grid lg:grid-cols-[0.95fr_1.05fr] min-h-[560px]">
        <div className="border-r border-fy-edge/45 bg-fy-dark/78 p-5 sm:p-7">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="section-label mb-2">指挥部</p>
              <h3 className="font-hud text-fy-silver text-3xl tracking-[0.14em]">队内指挥部面板</h3>
            </div>
            <span className="status-chip border-fy-info/35 text-fy-info bg-fy-info/10">语音网络</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            {cards.map((card) => (
              <div key={card.label} className="border border-fy-edge/40 bg-fy-panel/90 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <card.icon className={`w-4 h-4 ${card.tone}`} />
                  <span className="data-label">{card.label}</span>
                </div>
                <p className={`font-hud text-lg tracking-[0.08em] ${card.tone}`}>{card.value}</p>
              </div>
            ))}
          </div>

          <div className="border border-fy-edge/40 bg-fy-panel/90 p-4">
            <p className="data-label mb-3">作战记录</p>
            <div className="space-y-3 text-sm">
              {[
                '主色仅用于关键确认、火力焦点与主按钮。',
                '蓝色限定为队友通信、稳定链路与协同信息。',
                '红色仅承担威胁、损失、敌情等高优先级告警。',
                '橙色承担中立与负载压力，避免与主色冲突。',
              ].map((line) => (
                <div key={line} className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-fy-amber mt-2 shrink-0" />
                  <span className="text-fy-steel/78 leading-relaxed">{line}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/server.jpg')" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,19,23,0.8)_0%,rgba(15,19,23,0.52)_44%,rgba(15,19,23,0.88)_100%)]" />
          <div className="relative z-10 p-5 sm:p-7 flex h-full flex-col">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-fy-amber" />
                <span className="section-label">战术地图</span>
              </div>
              <span className="font-mono text-fy-steel/70 text-[10px] tracking-[0.22em]">阿尔巴斯拉 坐标 A3-F7</span>
            </div>

            <div className="flex-1 border border-fy-edge/45 bg-fy-dark/56 relative overflow-hidden">
              <div className="absolute inset-0 theme-grid opacity-70" />
              <div className="absolute left-[18%] top-[24%] w-6 h-6 border-2 border-fy-amber rotate-45" />
              <div className="absolute left-[44%] top-[36%] w-4 h-4 rounded-full bg-fy-info shadow-[0_0_18px_rgba(106,136,166,0.45)]" />
              <div className="absolute left-[64%] top-[48%] w-5 h-5 rounded-full bg-fy-red shadow-[0_0_18px_rgba(180,73,58,0.45)]" />
              <div className="absolute right-[14%] bottom-[18%] w-20 h-20 border border-fy-orange/70" />
              <div className="absolute left-[12%] bottom-[14%] w-[56%] border-t border-dashed border-fy-amber/60" />
              <div className="absolute left-[38%] top-[60%] w-[28%] border-t border-dashed border-fy-info/60 rotate-[14deg]" />
            </div>

            <div className="grid grid-cols-3 gap-3 mt-5">
              <div className="border border-fy-edge/40 bg-fy-dark/64 p-3">
                <p className="data-label mb-1">友军</p>
                <p className="font-hud text-fy-info text-xl tracking-[0.1em]">07</p>
              </div>
              <div className="border border-fy-edge/40 bg-fy-dark/64 p-3">
                <p className="data-label mb-1">接敌</p>
                <p className="font-hud text-fy-red-hc text-xl tracking-[0.1em]">03</p>
              </div>
              <div className="border border-fy-edge/40 bg-fy-dark/64 p-3">
                <p className="data-label mb-1">中立</p>
                <p className="font-hud text-fy-orange-hc text-xl tracking-[0.1em]">02</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-5 text-[11px] font-mono tracking-[0.18em]">
              <span className="inline-flex items-center gap-2 text-fy-amber"><Flag className="w-3 h-3" />主目标</span>
              <span className="inline-flex items-center gap-2 text-fy-info"><Activity className="w-3 h-3" />友军态势</span>
              <span className="inline-flex items-center gap-2 text-fy-red-hc"><Crosshair className="w-3 h-3" />敌情热点</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ThemePreview() {
  return (
    <div className="bg-fy-dark min-h-screen">
      <SEO
        title="战术黄主题预览"
        description="FY 战术黄主题的主菜单、对战 HUD 与队内指挥部面板预览。"
        keywords="FY主题预览,战术黄,Squad UI,Hud 设计"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <PageHeader className="mb-8 sm:mb-10" />
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <p className="section-label mb-3">战术黄配色系统</p>
            <h1 className="page-title text-3xl sm:text-4xl md:text-5xl mb-3">战术黄主题落地预览</h1>
            <p className="text-fy-steel/78 max-w-3xl text-sm sm:text-base">
              用于验证主菜单、对战 HUD、队内指挥部三类核心界面的新配色融合度，确保战术黄成为唯一主色，暗色基底与功能色承担层级与状态区分。
            </p>
          </div>
          <Link to="/" className="btn-outline text-sm w-fit">返回首页</Link>
        </div>

        <PreviewShell
          id="main-menu-preview"
          kicker="预览一"
          title="主菜单配色预览"
          description="强调入口优先级与标题焦点，主色黄用于关键 CTA、标题强化与重要状态提示。"
        >
          <MainMenuPreview />
        </PreviewShell>

        <PreviewShell
          id="hud-preview"
          kicker="预览二"
          title="对战 HUD 配色预览"
          description="验证室外强光与复杂战场背景下的色彩分层，确保主色、队友色、敌情色和中立色互不混淆。"
        >
          <HudPreview />
        </PreviewShell>

        <PreviewShell
          id="command-preview"
          kicker="预览三"
          title="队内指挥部面板预览"
          description="验证地图、通信、战术决策与警报模块的层级关系，保持军事题材的克制与硬核感。"
        >
          <CommandPreview />
        </PreviewShell>
      </div>
    </div>
  );
}

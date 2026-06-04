import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// ─── 代码分割：所有页面按需加载 ───
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Forum = lazy(() => import('./pages/Forum'));
const Join = lazy(() => import('./pages/Join'));
const ServerPage = lazy(() => import('./pages/Server'));
const Sponsor = lazy(() => import('./pages/Sponsor'));
const Guide = lazy(() => import('./pages/Guide'));
const Tactics = lazy(() => import('./pages/Tactics'));
const Events = lazy(() => import('./pages/Events'));
const Contact = lazy(() => import('./pages/Contact'));
const Links = lazy(() => import('./pages/Links'));
const Profile = lazy(() => import('./pages/Profile'));
const Messages = lazy(() => import('./pages/Messages'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Wiki = lazy(() => import('./pages/Wiki'));
const ThemePreview = lazy(() => import('./pages/ThemePreview'));
const WikiWeapons = lazy(() => import('./pages/wiki/Weapons'));
const WikiClasses = lazy(() => import('./pages/wiki/Classes'));
const WikiVehicles = lazy(() => import('./pages/wiki/Vehicles'));
const WikiMaps = lazy(() => import('./pages/wiki/Maps'));
const WikiFactions = lazy(() => import('./pages/wiki/Factions'));
const WikiModes = lazy(() => import('./pages/wiki/Modes'));

// 后台路由（named export → default 包装）
const AdminLayoutLazy = lazy(() => import('./pages/admin/AdminLayout').then(m => ({ default: m.AdminLayout })));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const AdminWikiPg = lazy(() => import('./pages/admin/AdminWiki').then(m => ({ default: m.AdminWiki })));
const AdminForumPg = lazy(() => import('./pages/admin/AdminForum').then(m => ({ default: m.AdminForum })));
const AdminSponsorPg = lazy(() => import('./pages/admin/AdminSponsor').then(m => ({ default: m.AdminSponsor })));
const AdminRecruitmentPg = lazy(() => import('./pages/admin/AdminRecruitment').then(m => ({ default: m.AdminRecruitment })));
const AdminServersPg = lazy(() => import('./pages/admin/AdminServers').then(m => ({ default: m.AdminServers })));
const AdminSettingsPg = lazy(() => import('./pages/admin/AdminSettings').then(m => ({ default: m.AdminSettings })));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin').then(m => ({ default: m.AdminLogin })));

// 小/共享组件保持静态导入
import { SiteFooter } from './components/SiteFooter';

/** 加载过渡 */
function PageFallback() {
  return (
    <div className="min-h-screen bg-fy-dark flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-fy-amber/30 border-t-fy-amber rounded-full animate-spin" />
    </div>
  );
}

/** 前台页面通用布局：内容 + 页脚 */
function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SiteFooter />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          {/* 前台路由（带通用布局） */}
          <Route path="/" element={<PageLayout><Home /></PageLayout>} />
          <Route path="/about" element={<PageLayout><About /></PageLayout>} />
          <Route path="/forum" element={<PageLayout><Forum /></PageLayout>} />
          <Route path="/join" element={<PageLayout><Join /></PageLayout>} />
          <Route path="/server" element={<PageLayout><ServerPage /></PageLayout>} />
          <Route path="/sponsor" element={<PageLayout><Sponsor /></PageLayout>} />
          <Route path="/guide" element={<PageLayout><Guide /></PageLayout>} />
          <Route path="/tactics" element={<PageLayout><Tactics /></PageLayout>} />
          <Route path="/events" element={<PageLayout><Events /></PageLayout>} />
          <Route path="/contact" element={<PageLayout><Contact /></PageLayout>} />
          <Route path="/links" element={<PageLayout><Links /></PageLayout>} />
          <Route path="/profile" element={<PageLayout><Profile /></PageLayout>} />
          <Route path="/messages" element={<PageLayout><Messages /></PageLayout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/theme-preview" element={<PageLayout><ThemePreview /></PageLayout>} />
          <Route path="/wiki" element={<PageLayout><Wiki /></PageLayout>} />
          <Route path="/wiki/weapons" element={<PageLayout><WikiWeapons /></PageLayout>} />
          <Route path="/wiki/classes" element={<PageLayout><WikiClasses /></PageLayout>} />
          <Route path="/wiki/vehicles" element={<PageLayout><WikiVehicles /></PageLayout>} />
          <Route path="/wiki/maps" element={<PageLayout><WikiMaps /></PageLayout>} />
          <Route path="/wiki/factions" element={<PageLayout><WikiFactions /></PageLayout>} />
          <Route path="/wiki/modes" element={<PageLayout><WikiModes /></PageLayout>} />

          {/* 后台路由体系（独占布局，不含通用横幅和页脚） */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayoutLazy />}>
            <Route index element={<AdminDashboard />} />
            <Route path="wiki" element={<AdminWikiPg />} />
            <Route path="forum" element={<AdminForumPg />} />
            <Route path="sponsors" element={<AdminSponsorPg />} />
            <Route path="recruitment" element={<AdminRecruitmentPg />} />
            <Route path="servers" element={<AdminServersPg />} />
            <Route path="settings" element={<AdminSettingsPg />} />
          </Route>

          {/* 404（带通用布局） */}
          <Route path="*" element={<PageLayout><NotFound /></PageLayout>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

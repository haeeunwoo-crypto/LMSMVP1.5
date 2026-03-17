import React, { useState } from 'react';
import { 
  LayoutDashboard, MonitorPlay, Award, Target, HeadphonesIcon, 
  ChevronLeft, ChevronRight, CheckCircle, Video, Users, 
  FileText, PlayCircle, Search, Bell, Settings, X, Flame, 
  Calendar as CalendarIcon, PieChart, BookOpen, ArrowRight, MoreHorizontal,
  Clock, CheckSquare, List, Grid, Star, AlertCircle, MessageSquare, Megaphone, 
  HelpCircle, FileQuestion, ChevronDown, Volume2, FileBarChart, ExternalLink,
  UploadCloud, FileCheck, Folder, TrendingUp, Activity, MapPin, 
  CalendarCheck, Calculator, AlertTriangle, Info, CalendarDays
} from 'lucide-react';

// --- [Mock Data] 주간 학습 시간표 데이터 ---
const timeBlocks = [
  { id: 'morning', time: '09:00 - 12:00', label: '오전' },
  { id: 'lunch', time: '12:00 - 13:00', label: '점심', isBreak: true },
  { id: 'afternoon', time: '13:00 - 18:00', label: '오후' },
  { id: 'dinner', time: '18:00 - 19:00', label: '저녁', isBreak: true },
  { id: 'night', time: '19:00 - 21:00', label: '야간' },
  { id: 'task', time: '과제', label: '과제', isTask: true }
];

const days = ['월', '화', '수', '목', '금'];
const dates = ['12.1', '12.2', '12.3', '12.4', '12.5'];

const scheduleData = {
  '월': {
    morning: { id: 'm1', title: 'SQL 실무 적용 실습', type: 'vod', status: 'completed', learningGoal: '실제 비즈니스 데이터셋을 활용하여 복잡한 SQL 쿼리(JOIN, Subquery, Window Function)를 작성하고 데이터를 추출하는 실무 능력을 기릅니다.' },
    afternoon: { id: 'a1', title: 'SQL 실무 적용 실습', type: 'vod', status: 'completed', learningGoal: '오전에 배운 내용을 바탕으로 심화 쿼리를 작성하며, 쿼리 최적화(Optimization) 기법을 실습합니다.' },
    night: { id: 'n1', title: 'SQL 실무 적용 실습', type: 'vod', status: 'completed', learningGoal: '다양한 예제 테이블을 조인하여 원하는 형태의 데이터 마트를 구축하는 연습을 합니다.' },
    task: { id: 't1', title: '3-4. SQL Quiz 4', type: 'submit', status: 'completed', taskGoal: '오늘 실습한 주요 SQL 구문을 활용하여 5개의 퀴즈를 해결하고 코드를 제출합니다.' }
  },
  '화': {
    morning: { id: 'm2', title: 'SQL 실무 적용 실습', type: 'vod', status: 'completed', learningGoal: '데이터베이스 정규화 개념을 이해하고, 구조화된 데이터를 조회하는 고급 기법을 학습합니다.' },
    afternoon: { id: 'a2', title: 'SQL 실무 적용 실습', type: 'vod', status: 'live', learningGoal: '집계 함수와 그룹화(GROUP BY)를 활용하여 비즈니스 요약 통계 지표를 뽑아내는 실습을 진행합니다.' },
    night: { id: 'n2', title: 'SQL 실무 적용 실습', type: 'vod', status: 'pending', learningGoal: '실전 데이터 분석에서 자주 마주치는 결측치 및 이상치를 SQL로 전처리하는 방법을 배웁니다.' },
    task: { id: 't2', title: '3-5. SQL Quiz 5', type: 'submit', status: 'pending', taskGoal: '집계 및 전처리 관련 SQL 퀴즈를 풀어 제출하고, 오답 노트를 작성합니다.' }
  },
  '수': {
    morning: { id: 'm3', title: '데이터 분석가가 되기 위한 준비 SQL 코딩테스트\n\n프로젝트 OT\n(이지훈 강사님)', type: 'live', status: 'pending', learningGoal: '팀 프로젝트의 목표와 방향성을 설정하고, 분석 주제를 선정하기 위한 강사 오리엔테이션에 참여합니다.' },
    afternoon: { id: 'a3', title: '데이터 분석가가 되기 위한 준비 SQL 코딩테스트', type: 'live', status: 'pending', learningGoal: '현업 데이터 분석가 채용 과정에서 자주 출제되는 고난도 SQL 코딩테스트 문제를 제한 시간 내에 풀어봅니다.' },
    night: { id: 'n3', title: 'SQL 실무 적용 실습', type: 'vod', status: 'pending', learningGoal: '코딩테스트에서 부족했던 개념을 복습하고 추가 예제를 풉니다.' },
    task: { id: 't3', title: '3-6. SQL Quiz 6', type: 'submit', status: 'pending', taskGoal: '오늘 진행한 코딩테스트 문제 중 틀린 문제를 다시 풀고 리뷰를 제출합니다.' }
  },
  '목': {
    morning: { 
      id: 'm4', 
      title: '데이터 분석가가 되기 위한 준비 SQL 코딩테스트', 
      type: 'offline',
      status: 'pending', 
      learningGoal: '프로그래머스와 해커랭크 스타일의 실전 SQL 문제를 풀이하며 실전 감각을 극대화합니다.',
      location: '강남 캠퍼스 11층 302호'
    },
    afternoon: { id: 'a4', title: '데이터 분석가가 되기 위한 준비 SQL 코딩테스트', type: 'live', status: 'pending', learningGoal: '오전 코딩테스트 결과를 바탕으로 강사님의 해설 강의를 듣고 최적화된 쿼리 작성법을 배웁니다.' },
    night: { id: 'n4', title: 'SQL 실무 적용 실습', type: 'vod', status: 'pending', learningGoal: '해설 강의 내용을 복습하며 본인만의 SQL 코드 스니펫을 정리합니다.' },
    task: { id: 't4', title: '3-7. SQL Quiz 7', type: 'submit', status: 'pending', taskGoal: '주간 학습 내용을 총정리하는 종합 SQL 퀴즈를 제출합니다.' }
  },
  '금': {
    morning: { id: 'm5', title: '프로젝트를 통한 SQL 실력 완성하기', type: 'peer', status: 'pending', learningGoal: '팀원들과 협력하여 선정된 주제의 데이터를 직접 추출하고 분석을 시작합니다.' },
    afternoon: { id: 'a5', title: '프로젝트를 통한 SQL 실력 완성하기\n\n프로젝트 멘토링\n(이지훈 강사님)', type: 'peer', status: 'pending', learningGoal: '팀 프로젝트 진행 상황을 강사님께 공유하고, 쿼리 개선점 및 분석 로직에 대한 피드백을 받습니다.' },
    night: { id: 'n5', title: '프로젝트를 통한 SQL 실력 완성하기', type: 'peer', status: 'pending', learningGoal: '피드백을 바탕으로 쿼리를 수정하고, 주말 동안 진행할 분석 역할을 분담합니다.' },
    task: null
  }
};

const curriculumRoadmap = [
  { id: 1, title: 'Onboarding & Tools', desc: 'ChatGPT 활용 및 블로그 수익화', status: 'completed' },
  { id: 2, title: 'Data Literacy', desc: '엑셀 데이터 분석 기초', status: 'completed' },
  { id: 3, title: 'Statistics & Math', desc: '비전공자를 위한 기초 통계', status: 'completed' },
  { id: 4, title: 'Python Programming', desc: '파이썬 기초 및 데이터 전처리/시각화', status: 'current' },
  { id: 5, title: 'Database & SQL', desc: 'SQLD 자격증 대비 및 DB 구축', status: 'locked' },
  { id: 6, title: 'Visualization', desc: 'Tableau 시각화 및 대시보드', status: 'locked' },
  { id: 7, title: 'Machine Learning', desc: '머신러닝 알고리즘 및 딥러닝', status: 'locked' },
  { id: 8, title: 'Final Project', desc: '실전 기업 연계 프로젝트', status: 'locked' }
];

const weeklyLectures = [
  { id: 1, type: 'vod', title: '데이터 분석 Master Class', sub: 'Ch 3. 데이터 시각화와 탐색적 스킬', progress: 45, tag: '필수' },
  { id: 2, type: 'live', title: '[실시간] 현업 분석가와의 멘토링 세션', sub: '주제: 주니어 데이터 분석가의 포트폴리오 전략', date: '12.04 (목) 14:00', tag: '특강' },
  { id: 3, type: 'vod', title: '문서의 신이 알려주는 보고서의 법칙', sub: 'Ch 1. 비즈니스 글쓰기의 모든 것', progress: 0, tag: '교양' },
  { id: 4, type: 'vod', title: '일잘러 필수 스킬 모음.zip', sub: '부록. 업무서식 및 디자인 소스 제공', progress: 10, tag: '자료' }
];

const pendingTasks = [
  { id: 1, type: 'quiz', title: '3-5. SQL Quiz 5', deadline: '오늘 23:59까지', status: 'urgent' },
  { id: 2, type: 'assignment', title: 'Python 데이터 전처리 과제', deadline: '내일 18:00까지', status: 'normal' },
  { id: 3, type: 'project', title: '팀 프로젝트 중간 발표 자료', deadline: '2025.12.10', status: 'normal' },
];

const submittedHistory = [
  { id: 101, type: 'quiz', title: '3-4. SQL Quiz 4', submitDate: '2025.12.01', score: '10/10 (Pass)', status: 'graded' },
  { id: 102, type: 'assignment', title: 'Python 기초 코딩 테스트', submitDate: '2025.11.28', score: '85/100', status: 'graded' },
  { id: 103, type: 'project', title: '데이터 분석 기초 프로젝트', submitDate: '2025.11.20', score: '평가 중', status: 'pending' },
];

const allLecturesByMonth = [
  { month: '2025년 10월', lectures: [
      { id: '1-1', title: 'Ch01-01. 강의 소개와 목적 설명', type: 'vod', time: '0:02:59', status: 'completed' },
      { id: '1-4', title: '[실시간] 과정 OT 및 온보딩', type: 'live', time: '2시간', status: 'completed' },
  ]},
  { month: '2025년 11월', lectures: [
      { id: '2-1', title: 'Ch01_01. 우리가 엑셀을 배워야 하는 이유', type: 'vod', time: '0:16:42', status: 'completed' },
      { id: '2-4', title: '[실시간] 엑셀 데이터 분석 실습 멘토링', type: 'live', time: '3시간', status: 'completed' },
  ]},
  { month: '2025년 12월 (현재)', lectures: [
      { id: '3-1', title: 'Ch01-01. 파이썬 과정 소개', type: 'vod', time: '0:04:43', status: 'completed' },
      { id: '3-3', title: 'Ch02-06. 자료형 리스트', type: 'vod', time: '0:36:19', status: 'scheduled', date: '12.03' },
      { id: '3-4', title: '[실시간] 파이썬 기초 코딩 테스트', type: 'live', time: '2시간', status: 'scheduled', date: '12.05' },
  ]}
];

const portfolioData = {
  courseName: '[KDT] 데이터 사이언스 부트캠프 24기_심화',
  totalScore: 67,
  passScore: 70,
  items: [
    { name: '온라인 강의 (수강률)', myScore: 100, maxScore: 100, weight: 10, converted: 10, pass: true },
    { name: '퀴즈 (평균 점수)', myScore: 85, maxScore: 100, weight: 10, converted: 8.5, pass: true },
    { name: '과제 (제출/평가)', myScore: 90, maxScore: 100, weight: 20, converted: 18, pass: true },
    { name: '출석률 (80% 이상)', myScore: 82, maxScore: 100, weight: 20, converted: 16.4, pass: true },
    { name: '프로젝트 (3회 평균)', myScore: 70, maxScore: 100, weight: 30, converted: 21, pass: true },
    { name: '피어리뷰 (동료 평가)', myScore: 0, maxScore: 100, weight: 10, converted: 0, pass: false }
  ]
};

const notices = [
  { id: 1, type: 'important', title: '[필독] 12월 1주차 훈련장려금 지급 안내', date: '2025.12.01', author: '운영매니저' },
  { id: 2, type: 'normal', title: '파이썬 기초 프로젝트 팀 편성 결과 안내', date: '2025.11.28', author: '김패캠' },
];

const inquiries = [
  { id: 1, title: '출석 인정 관련 문의드립니다.', status: 'answered', date: '2025.11.30' },
  { id: 2, title: '과제 제출 파일 형식이 잘못되었습니다.', status: 'pending', date: '2025.12.02' },
];

const attendanceCorrectionHistory = [
  { id: 1, date: '2025.11.15', type: '지각 → 출석', reason: '지하철 지연으로 인한 5분 지각 (증빙: 교통정보 캡처)', status: 'approved', submitDate: '2025.11.16' },
  { id: 3, date: '2025.12.02', type: '결석 → 출석', reason: '온라인 시스템 오류로 인한 접속 실패 기록 오류', status: 'pending', submitDate: '2025.12.03' },
];

// --- [Mock Data] 출결 관리 데이터 ---
const attendanceStats = {
  unit: { // 단위기간 (한달 등 장려금 기준)
    period: '2025.11.20 ~ 2025.12.19',
    totalDays: 22,
    present: 19,
    absent: 1,
    late: 2, // 지각/조퇴/외출
    officialAbsent: 0,
    get convertedAbsent() { return this.absent + Math.floor(this.late / 3); },
    get attendanceRate() { return (((this.totalDays - this.convertedAbsent) / this.totalDays) * 100).toFixed(1); },
  },
  total: { // 총 훈련기간 (수료 기준)
    totalDays: 120,
    passedDays: 25,
    convertedAbsent: 1,
    get attendanceRate() { return (((this.passedDays - this.convertedAbsent) / this.passedDays) * 100).toFixed(1); },
  }
};


export default function App() {
  const [activeTab, setActiveTab] = useState('home'); 
  const [classroomSubTab, setClassroomSubTab] = useState('in_progress'); 
  const [attendanceSubTab, setAttendanceSubTab] = useState('status'); // 'status' | 'correction'
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAttendanceDetail, setShowAttendanceDetail] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  // 출결 정정 신청 폼 상태
  const [correctionForm, setCorrectionForm] = useState({
    date: '', currentStatus: '', requestedStatus: '', category: '', reason: '', file: null,
  });
  const [correctionSubmitted, setCorrectionSubmitted] = useState(false);

  // 이벤트 블록 스타일링
  const getEventStyle = (event, isTask) => {
    if (!event) return 'bg-transparent border-transparent';
    if (event.status === 'completed') return 'bg-slate-100 border-slate-200 text-slate-400 opacity-60 cursor-pointer hover:-translate-y-0.5 transition-transform duration-200';
    let baseStyle = 'border cursor-pointer hover:-translate-y-0.5 transition-all duration-200 h-full flex flex-col relative overflow-hidden p-2 ';
    if (isTask) {
      baseStyle += 'bg-rose-50 border-rose-200 text-rose-800 hover:bg-rose-100 font-medium justify-center';
      return baseStyle;
    }
    switch(event.type) {
      case 'vod': baseStyle += 'bg-blue-50/80 border-blue-200 text-blue-900 hover:bg-blue-100/80'; break;
      case 'live': baseStyle += 'bg-emerald-50/80 border-emerald-200 text-emerald-900 hover:bg-emerald-100/80'; break;
      case 'peer': baseStyle += 'bg-purple-50/80 border-purple-200 text-purple-900 hover:bg-purple-100/80'; break;
      case 'submit': baseStyle += 'bg-orange-50/80 border-orange-200 text-orange-900 hover:bg-orange-100/80'; break;
      case 'offline': baseStyle += 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'; break;
      default: baseStyle += 'bg-white border-gray-200 text-gray-700 hover:bg-slate-50';
    }
    if (event.status === 'live') baseStyle += ' ring-2 ring-emerald-400 shadow-md';
    else baseStyle += ' shadow-sm';
    return baseStyle;
  };

  const EventBadge = ({ type, status }) => {
    if (status === 'completed') return null;
    let style = 'text-[9px] font-extrabold px-1.5 py-0.5 rounded flex items-center gap-1 w-fit mb-1.5 shadow-sm border ';
    let text = '';
    switch(type) {
      case 'vod': style += 'bg-blue-100 text-blue-700 border-blue-200'; text = '💻 VOD'; break;
      case 'live': style += 'bg-emerald-100 text-emerald-700 border-emerald-200'; text = '🔴 LIVE'; break;
      case 'peer': style += 'bg-purple-100 text-purple-700 border-purple-200'; text = '💬 PEER'; break;
      case 'submit': style += 'bg-rose-100 text-rose-700 border-rose-200'; text = '📝 과제'; break;
      case 'offline': style += 'bg-slate-200 text-slate-700 border-slate-300'; text = '🏢 오프라인'; break;
      default: style += 'bg-gray-100 text-gray-600 border-gray-200'; text = '기타';
    }
    return <div className={style}>{text}</div>;
  };

  const RadarChart = () => {
    const size = 240;
    const center = size / 2;
    const radius = 80;
    const features = [{ label: '통계·수학', value: 85 }, { label: '머신러닝 모델링', value: 60 }, { label: '코딩·엔지니어링', value: 95 }, { label: '비즈니스 문제정의', value: 70 }, { label: '커뮤니케이션', value: 80 }, { label: '태도·성장역량', value: 90 }];
    const getPoint = (value, angle) => {
      const r = (value / 100) * radius;
      const radian = (angle - 90) * (Math.PI / 180);
      return { x: center + r * Math.cos(radian), y: center + r * Math.sin(radian) };
    };
    const angles = [0, 60, 120, 180, 240, 300];
    const dataPoints = features.map((f, i) => getPoint(f.value, angles[i]));
    const polygonPoints = dataPoints.map(p => `${p.x},${p.y}`).join(' ');
    const gridLevels = [20, 40, 60, 80, 100];
    return (
      <div className="relative flex justify-center items-center w-full h-[280px]">
        <svg width={size + 100} height={size + 60} className="overflow-visible font-sans">
          {gridLevels.map((level, idx) => {
            const pts = angles.map(angle => `${getPoint(level, angle).x},${getPoint(level, angle).y}`).join(' ');
            return <polygon key={idx} points={pts} fill="none" stroke="#e2e8f0" strokeWidth="1" />;
          })}
          {angles.map((angle, idx) => {
            const p = getPoint(100, angle);
            return <line key={idx} x1={center} y1={center} x2={p.x} y2={p.y} stroke="#e2e8f0" strokeWidth="1" />;
          })}
          <polygon points={polygonPoints} fill="rgba(244, 63, 94, 0.4)" stroke="#f43f5e" strokeWidth="2" strokeLinejoin="round" />
          {features.map((f, idx) => {
            const p = getPoint(125, angles[idx]); 
            return <text key={idx} x={p.x} y={p.y} fontSize="12" fill="#475569" fontWeight="600" textAnchor="middle" alignmentBaseline="middle">{f.label}</text>;
          })}
        </svg>
      </div>
    );
  };

  const getHeaderTitle = () => {
    switch(activeTab) {
      case 'home': return '홈 (대시보드)';
      case 'classroom': return '나의 강의실';
      case 'attendance': return '출결 관리';
      case 'portfolio': return '포트폴리오';
      case 'notice': return '공지사항';
      case 'support': return '지원 센터';
      default: return '홈';
    }
  };

  // Helper for attendance
  const remainingAbsencesForSubsidy = Math.floor(attendanceStats.unit.totalDays * 0.2) - attendanceStats.unit.convertedAbsent;
  const remainingAbsencesForDrop = Math.floor(attendanceStats.total.totalDays * 0.5) - attendanceStats.total.convertedAbsent;

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans text-gray-800 selection:bg-rose-200">
      
      {/* 1. Left Sidebar (GNB) */}
      <aside className="w-[260px] bg-white border-r border-gray-200 flex flex-col hidden md:flex shrink-0">
        <div className="p-6 flex items-center gap-2">
          <span className="text-rose-500 font-bold text-2xl tracking-tighter">Kernel</span>
          <span className="text-gray-800 font-bold text-xl tracking-tight">Academy</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1.5 mt-2">
          <button 
            onClick={() => setActiveTab('home')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'home' ? 'bg-rose-50/80 text-rose-600 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <LayoutDashboard size={20} /> 홈 (대시보드)
            {activeTab === 'home' && <ChevronRight size={16} className="ml-auto opacity-50" />}
          </button>
          <button 
            onClick={() => setActiveTab('classroom')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'classroom' ? 'bg-rose-50/80 text-rose-600 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <MonitorPlay size={20} /> 나의 강의실
            {activeTab === 'classroom' && <ChevronRight size={16} className="ml-auto opacity-50" />}
          </button>
          
          {/* NEW: 출결 관리 */}
          <button 
            onClick={() => setActiveTab('attendance')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'attendance' ? 'bg-rose-50/80 text-rose-600 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <CalendarCheck size={20} /> 출결 관리
            {activeTab === 'attendance' && <ChevronRight size={16} className="ml-auto opacity-50" />}
          </button>

          <button 
            onClick={() => setActiveTab('portfolio')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'portfolio' ? 'bg-rose-50/80 text-rose-600 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Award size={20} /> 포트폴리오
            {activeTab === 'portfolio' && <ChevronRight size={16} className="ml-auto opacity-50" />}
          </button>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors">
            <Target size={20} /> 취업 매칭 & 로드맵
          </a>
          <button 
            onClick={() => setActiveTab('notice')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'notice' ? 'bg-rose-50/80 text-rose-600 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Megaphone size={20} /> 공지사항
            {activeTab === 'notice' && <ChevronRight size={16} className="ml-auto opacity-50" />}
          </button>
          <button 
            onClick={() => setActiveTab('support')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'support' ? 'bg-rose-50/80 text-rose-600 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <HeadphonesIcon size={20} /> 지원 센터
            {activeTab === 'support' && <ChevronRight size={16} className="ml-auto opacity-50" />}
          </button>
        </nav>

        {/* PRO UPGRADE Box */}
        <div className="p-5 m-5 bg-slate-900 rounded-2xl text-white shadow-xl relative overflow-hidden group cursor-pointer">
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-rose-500 rounded-full opacity-20 blur-2xl group-hover:bg-rose-400 transition-all duration-500"></div>
          <p className="text-[10px] font-bold text-rose-400 mb-1.5 tracking-widest">PRO UPGRADE</p>
          <h4 className="font-bold leading-snug mb-3">1:1 커리어 멘토링<br/>지금 시작하세요</h4>
          <button className="bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold py-2.5 px-4 rounded-xl w-full transition-colors shadow-md shadow-rose-500/30">
            자세히 보기
          </button>
        </div>
      </aside>

      {/* 2. Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* Top Header */}
        <header className="bg-white px-8 py-4 flex justify-between items-center z-10 border-b border-gray-200">
          <div className="flex items-end gap-4">
            <h1 className="text-xl font-bold text-gray-800 tracking-tight">
              {getHeaderTitle()}
            </h1>
            {/* Sub Tabs for Classroom */}
            {activeTab === 'classroom' && (
              <div className="flex gap-1 ml-4 bg-slate-100 p-1 rounded-lg">
                <button 
                  onClick={() => setClassroomSubTab('in_progress')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${classroomSubTab === 'in_progress' ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  수강 중인 강의
                </button>
                <button 
                  onClick={() => setClassroomSubTab('all')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${classroomSubTab === 'all' ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  전체 강의
                </button>
              </div>
            )}
            {/* Sub Tabs for Attendance */}
            {activeTab === 'attendance' && (
              <div className="flex gap-1 ml-4 bg-slate-100 p-1 rounded-lg">
                <button 
                  onClick={() => setAttendanceSubTab('status')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${attendanceSubTab === 'status' ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  출결 현황
                </button>
                <button 
                  onClick={() => setAttendanceSubTab('correction')}
                  className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${attendanceSubTab === 'correction' ? 'bg-white text-rose-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  출결 정정 신청
                </button>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-5">
            <div className="relative hidden lg:block">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="강의, 공지, 문의 검색..." className="bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 text-sm w-64 focus:ring-2 focus:ring-rose-500 outline-none transition-all placeholder:text-gray-400" />
            </div>
            <button className="text-gray-400 hover:text-gray-700 relative transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
            </button>
            <button className="text-gray-400 hover:text-gray-700 transition-colors"><Settings size={20} /></button>
            <div className="flex items-center gap-3 border-l border-gray-200 pl-5">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-800">이배포</p>
                <p className="text-xs text-rose-500 font-bold">Lv.3 Hatching</p>
              </div>
              <div className="w-10 h-10 bg-rose-50 rounded-full flex items-center justify-center text-xl shadow-inner border border-rose-100">
                🥚
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-6 lg:p-8">
          <div className="max-w-[1400px] mx-auto space-y-6">
            
            {activeTab === 'home' && (
              // ================= DASHBOARD VIEW =================
              <>
               {/* 1. Top Row */}
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                 {/* Character Widget */}
                 <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="inline-block bg-rose-50 text-rose-600 text-xs font-bold px-2 py-1 rounded mb-2">Lv.3</span>
                        <h3 className="text-lg font-bold text-gray-800 leading-tight">커널 도전자 이배포</h3>
                        <p className="text-xs text-gray-500 mt-1">데이터 사이언티스트 지망생</p>
                      </div>
                      <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-2xl shadow-inner border border-rose-100">🥚</div>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-[11px] mb-1 text-gray-500 font-bold">
                        <span>다음 레벨까지 250 XP</span>
                        <span className="text-gray-700">75%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-rose-500 h-full w-[75%] rounded-full"></div>
                      </div>
                    </div>
                 </div>

                 {/* Success Vision */}
                 <div className="lg:col-span-2 bg-slate-900 rounded-3xl p-8 shadow-lg relative overflow-hidden flex flex-col justify-center">
                     <div className="absolute right-0 top-0 w-64 h-64 bg-rose-500 rounded-full opacity-10 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                     <div className="relative z-10">
                       <span className="text-[10px] font-bold text-rose-400 border border-rose-500/30 bg-rose-500/10 px-2 py-1 rounded mb-3 inline-block">SUCCESS VISION</span>
                       <h2 className="text-xl font-bold text-white leading-snug mb-6">"데이터에 숨겨진 패턴을 발견하고 비즈니스 성장을<br/>이끄는 핵심 <span className="text-rose-400">데이터 사이언티스트</span>가 되겠다"</h2>
                       <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-400 font-medium">목표 달성 D-Day</span>
                          <span className="text-xs font-bold text-slate-900 bg-white px-2 py-0.5 rounded">D-42</span>
                       </div>
                     </div>
                 </div>
               </div>

               {/* 2. Middle Row */}
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                   <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 flex flex-col justify-center">
                       <div className="flex justify-between items-end mb-3">
                          <h4 className="font-bold text-gray-700 flex items-center gap-2"><Activity size={20} className="text-emerald-500"/> 주간 학습 완료율</h4>
                          <span className="text-3xl font-extrabold text-emerald-500">85%</span>
                       </div>
                       <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-2">
                          <div className="bg-emerald-500 h-full rounded-full" style={{width: '85%'}}></div>
                       </div>
                       <p className="text-xs text-gray-400">이번 주 목표 달성까지 3개 남았습니다.</p>
                   </div>

                   <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200 flex flex-col justify-center">
                       <div className="flex justify-between items-end mb-3">
                          <h4 className="font-bold text-gray-700 flex items-center gap-2"><TrendingUp size={20} className="text-blue-500"/> 전체 학습 진도율</h4>
                          <span className="text-3xl font-extrabold text-blue-500">42%</span>
                       </div>
                       <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mb-2">
                          <div className="bg-blue-500 h-full rounded-full" style={{width: '42%'}}></div>
                       </div>
                       <p className="text-xs text-gray-400">수료 기준(80%)까지 화이팅하세요!</p>
                   </div>
               </div>

                {/* Attendance Mini Widget */}
                <section className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1 flex flex-col items-center justify-center border-r md:border-r-gray-100 md:pr-8 w-full">
                      <div className="flex items-center gap-2 mb-4 w-full justify-between">
                        <h3 className="text-lg font-bold text-gray-900">이번 달 출석률</h3>
                        <button 
                          onClick={() => {setActiveTab('attendance'); setAttendanceSubTab('status');}}
                          className="text-xs text-rose-500 font-bold hover:underline"
                        >
                          상세 관리 가기 &rarr;
                        </button>
                      </div>
                      
                      <div className="relative w-40 h-40">
                        <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                          <path className="text-gray-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.8" />
                          <path className="text-emerald-500 drop-shadow-md" strokeDasharray={`${attendanceStats.unit.attendanceRate}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.8" strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-extrabold text-gray-800">{attendanceStats.unit.attendanceRate}<span className="text-lg text-gray-400">%</span></span>
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded mt-1">장려금 안전</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-[2] w-full">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-bold text-gray-700">최근 출결 현황</h4>
                        <div className="flex gap-3 text-[10px] font-bold text-gray-500">
                          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-400"></div>출석</span>
                          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-rose-400"></div>결석</span>
                          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-400"></div>지각/조퇴</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-7 gap-2 text-center">
                        {['일','월','화','수','목','금','토'].map(d => <div key={d} className="text-xs text-gray-400 font-bold py-2">{d}</div>)}
                        {/* Mock Calendar Grid Mini */}
                        {Array.from({length: 14}).map((_, i) => {
                          const day = i + 15;
                          let status = 'none';
                          if ([17, 24].includes(day)) status = 'absent'; // Sunday mock
                          else if (day === 18) status = 'absent';
                          else if (day === 22 || day === 25) status = 'late';
                          else if (day < 28) status = 'present';
                          
                          return (
                            <div key={i} className="flex flex-col items-center justify-center p-2 rounded-lg bg-slate-50 border border-transparent">
                              <span className={`text-xs font-medium mb-1 text-gray-600`}>{day}</span>
                              {status === 'present' && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>}
                              {status === 'late' && <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>}
                              {status === 'absent' && <div className="w-1.5 h-1.5 rounded-full bg-rose-400"></div>}
                              {status === 'none' && <div className="w-1.5 h-1.5 rounded-full bg-transparent"></div>}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Weekly Action Calendar */}
                <section className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                  {/* ... same calendar ... */}
                  <div className="px-6 py-4 flex flex-col md:flex-row md:justify-between items-start md:items-center border-b border-gray-200 bg-white gap-3">
                    <div><h2 className="text-lg font-bold text-gray-900">주간 학습 시간표</h2></div>
                    <div className="flex items-center gap-4">
                      <div className="flex gap-3 text-[11px] font-bold text-gray-500 hidden xl:flex">
                        <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded bg-blue-100 border border-blue-300"></div>온라인(VOD)</span>
                        <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded bg-emerald-100 border border-emerald-300"></div>실시간(Live)</span>
                        <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded bg-slate-400 border border-slate-500"></div>오프라인</span>
                        <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded bg-purple-100 border border-purple-300"></div>피어세션</span>
                        <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded bg-rose-100 border border-rose-300"></div>과제/제출</span>
                      </div>
                      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
                        <button className="p-1 text-gray-500 hover:text-gray-900 hover:bg-white rounded-md transition-all"><ChevronLeft size={16} /></button>
                        <span className="text-[13px] font-bold px-3 text-gray-700">Week 6 (12.1 ~ 12.5)</span>
                        <button className="p-1 text-gray-500 hover:text-gray-900 hover:bg-white rounded-md transition-all"><ChevronRight size={16} /></button>
                      </div>
                    </div>
                  </div>
                  <div className="w-full p-4 md:p-6 pt-2 bg-[#fdfdfd]">
                    <div className="min-w-[800px] w-full border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                      <div className="grid grid-cols-[80px_repeat(5,_minmax(0,1fr))] border-b border-gray-200 bg-slate-50">
                        <div className="p-2 flex flex-col justify-center items-center border-r border-gray-200 text-[10px] font-bold text-gray-400 uppercase"><span>Week 6</span></div>
                        {days.map((day, idx) => (
                          <div key={day} className={`p-2.5 text-center border-r border-gray-200 last:border-r-0 font-bold text-[13px] ${idx === 1 ? 'bg-rose-50/80 text-rose-700' : 'text-gray-700'}`}>
                            {day} <span className="text-[11px] font-medium text-gray-400 ml-1">{dates[idx]}</span>
                            {idx === 1 && <span className="inline-block w-1.5 h-1.5 bg-rose-500 rounded-full ml-1.5 align-middle mb-[1px] animate-pulse"></span>}
                          </div>
                        ))}
                      </div>
                      {timeBlocks.map((block, rowIdx) => (
                        <div key={block.id} className="grid grid-cols-[80px_repeat(5,_minmax(0,1fr))] border-b border-gray-200 last:border-b-0">
                          <div className={`p-2 flex items-center justify-center text-[10px] font-bold border-r border-gray-200 text-center flex-col ${block.isTask ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-gray-500'}`}>
                            {block.time.split(' - ').map((t, i) => <span key={i}>{t}</span>)}
                          </div>
                          {days.map((day, colIdx) => {
                            if (block.isBreak) return <div key={colIdx} className="p-2 bg-slate-50/60 border-r border-gray-200 last:border-r-0 flex items-center justify-center"><span className="text-[11px] font-bold text-gray-300 tracking-widest">{block.label}</span></div>;
                            const event = scheduleData[day][block.id];
                            return (
                              <div key={colIdx} className={`p-1.5 border-r border-gray-200 last:border-r-0 ${colIdx === 1 ? 'bg-rose-50/10' : 'bg-white'}`}>
                                {event ? (
                                  <div onClick={() => setSelectedEvent({ ...event, day, time: block.time })} className={`rounded-lg text-[12px] leading-snug ${getEventStyle(event, block.isTask)}`}>
                                    {!block.isTask && <EventBadge type={event.type} status={event.status} />}
                                    {event.status === 'completed' && block.isTask && <div className="flex justify-center mb-1"><CheckCircle size={14} className="text-gray-400" /></div>}
                                    {event.status === 'live' && <span className="absolute top-1.5 right-1.5 flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>}
                                    <span className="whitespace-pre-wrap break-keep block">{event.title}</span>
                                  </div>
                                ) : <div className="w-full h-full bg-transparent rounded-lg"></div>}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Bottom Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12 items-stretch">
                  <section className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 flex flex-col h-full">
                    <div className="mb-2">
                      <h3 className="text-lg font-bold text-gray-900">나의 역량 데이터 (Career Genome)</h3>
                      <p className="text-[13px] text-gray-500 mt-1 font-medium">프로젝트와 피드백을 통해 축적된 실무 역량입니다.</p>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <RadarChart />
                    </div>
                  </section>

                  <section className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold text-gray-900">오늘의 퀘스트</h3>
                      <span className="text-[11px] font-bold text-rose-500 bg-rose-50 px-2.5 py-1 rounded-md">D-14 to Level Up</span>
                    </div>
                    <div className="space-y-3.5 flex-1 flex flex-col justify-center">
                      <div className="border border-gray-100 bg-slate-50 p-4 rounded-xl flex items-start gap-3.5">
                        <CheckCircle size={20} className="text-gray-300 mt-0.5 shrink-0" />
                        <div><h4 className="font-bold text-[15px] text-gray-600 line-through decoration-gray-400">데이터베이스 정규화 완강</h4><p className="text-xs font-bold text-gray-400 mt-1">+50 XP 획득 완료</p></div>
                      </div>
                      <div className="border-2 border-emerald-200 bg-emerald-50/30 p-4 rounded-xl flex items-start gap-3.5 shadow-sm relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-400"></div>
                        <div><h4 className="font-bold text-[15px] text-emerald-900">SQL 실무 적용 실습 (실시간)</h4><p className="text-xs font-bold text-emerald-600 mt-1">+100 XP (진행 중)</p></div>
                      </div>
                      <div className="border border-gray-200 bg-white p-4 rounded-xl flex items-start gap-3.5">
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0 mt-0.5"></div>
                        <div><h4 className="font-bold text-[15px] text-gray-800">3-5. SQL Quiz 5 작성 및 제출</h4><p className="text-xs font-bold text-gray-500 mt-1">+150 XP</p></div>
                      </div>
                    </div>
                    <button className="w-full py-3 mt-4 text-[13px] font-bold text-gray-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">모든 퀘스트 보기</button>
                  </section>
                </div>
              </>
            )}

            {/* ================= MY CLASSROOM VIEW ================= */}
            {activeTab === 'classroom' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                
                {/* 1. Continue Learning Banner */}
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-8 text-white shadow-xl flex items-center justify-between relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-rose-500 rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                  <div className="relative z-10 max-w-2xl">
                    <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded mb-3 inline-block">현재 수강 중</span>
                    <h2 className="text-2xl font-bold mb-2">프론트엔드 초격차 패키지 Online</h2>
                    <p className="text-slate-300 text-sm mb-6">Ch 4. React Context & State - State 관리에 대한 심화 이해</p>
                    <div className="flex items-center gap-4">
                      <button className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-rose-500/30 flex items-center gap-2">
                        <PlayCircle size={20} /> 바로 학습 이어가기
                      </button>
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <div className="w-32 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div className="w-[74%] h-full bg-rose-500 rounded-full"></div>
                        </div>
                        <span>74% 완료</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Full Curriculum Roadmap */}
                <section className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
                  <div className="mb-8"><h3 className="text-xl font-bold text-gray-900">전체 교육 과정 로드맵</h3><p className="text-sm text-gray-500 mt-1">현재 <span className="text-rose-500 font-bold">Step 4. Python Programming</span> 단계를 진행 중입니다.</p></div>
                  <div className="relative">
                    <div className="absolute top-[22px] left-0 w-full h-1 bg-slate-100 rounded-full -z-10"></div><div className="absolute top-[22px] left-0 w-[45%] h-1 bg-rose-500/20 rounded-full -z-10"></div>
                    <div className="flex justify-between w-full overflow-x-auto pb-4 gap-4">
                      {curriculumRoadmap.map((step, index) => {
                        let statusColor = step.status === 'completed' ? 'bg-rose-100 text-rose-600 border-rose-200' : step.status === 'current' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 scale-110' : 'bg-white text-gray-300 border-gray-200';
                        return (<div key={step.id} className="flex flex-col items-center min-w-[120px] group cursor-default"><div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 mb-4 z-10 ${statusColor}`}>{step.status === 'completed' ? <CheckCircle size={20} /> : step.status === 'current' ? <Flame size={20} className="animate-pulse" /> : <span className="font-bold text-sm">{index + 1}</span>}</div><div className="text-center"><p className={`text-xs font-bold mb-1 ${step.status === 'current' ? 'text-rose-500' : step.status === 'completed' ? 'text-gray-800' : 'text-gray-400'}`}>Step {index + 1}</p><h4 className={`text-sm font-bold leading-tight mb-1 ${step.status === 'locked' ? 'text-gray-400' : 'text-gray-800'}`}>{step.title}</h4><p className="text-[10px] text-gray-400 leading-snug hidden md:block max-w-[120px]">{step.desc}</p></div></div>)
                      })}
                    </div>
                  </div>
                </section>

                {/* Sub Tab Content */}
                {classroomSubTab === 'in_progress' ? (
                  <>
                    {/* 3. Recommended Lecture & Weekly Lectures List */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><BookOpen size={20} className="text-rose-500" /> 이번 주 강의</h3>
                      <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5 mb-4 flex items-center gap-5 relative overflow-hidden group hover:border-rose-200 transition-colors cursor-pointer"><div className="absolute right-0 top-0 w-32 h-32 bg-white rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div><div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-rose-500 shadow-sm z-10 shrink-0"><Star size={24} fill="currentColor" /></div><div className="flex-1 z-10"><span className="text-[10px] font-bold text-white bg-rose-500 px-2 py-0.5 rounded mb-1 inline-block">강력 추천</span><h4 className="font-bold text-gray-800 text-lg">실무에서 바로 쓰는 데이터 분석 SQL 패턴 10가지</h4><p className="text-sm text-gray-500">현업 분석가가 매일 쓰는 쿼리만 모았습니다.</p></div><ChevronRight size={20} className="text-rose-300 group-hover:text-rose-500 transition-colors z-10" /></div>
                      <div className="space-y-3">
                        {weeklyLectures.map(lecture => (
                          <div key={lecture.id} className="bg-white p-4 rounded-2xl border border-gray-200 hover:border-rose-200 hover:shadow-md transition-all flex flex-col md:flex-row items-center gap-5 group cursor-pointer">
                            <div className="relative w-full md:w-48 h-28 bg-slate-100 rounded-xl overflow-hidden shrink-0"><div className="absolute inset-0 flex items-center justify-center bg-slate-200">{lecture.type === 'live' ? <Video size={24} className="text-emerald-500" /> : <PlayCircle size={24} className="text-slate-400" />}</div><span className={`absolute top-2 left-2 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-md ${lecture.type === 'live' ? 'bg-emerald-500/80' : 'bg-black/60'}`}>{lecture.tag}</span></div>
                            <div className="flex-1 w-full"><div className="flex justify-between items-start mb-1"><h4 className="font-bold text-gray-800 text-lg leading-snug group-hover:text-rose-600 transition-colors">{lecture.title}</h4>{lecture.type === 'vod' && <span className="text-xs font-bold text-slate-400">{lecture.progress}%</span>}</div><p className="text-sm text-gray-500 mb-3">{lecture.sub}</p><div className="flex items-center gap-4 text-xs font-medium text-gray-400">{lecture.type === 'live' ? <span className="flex items-center gap-1.5 text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded"><Clock size={14} /> {lecture.date}</span> : <div className="w-full max-w-[200px] h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className="bg-rose-500 h-full rounded-full" style={{ width: `${lecture.progress}%` }}></div></div>}</div></div>
                            <div className="hidden md:flex shrink-0"><button className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${lecture.type === 'live' ? 'bg-emerald-50 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-rose-500 group-hover:text-white'}`}>{lecture.type === 'live' ? <Video size={18} /> : <PlayCircle size={20} />}</button></div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 4. Pending Tasks List */}
                    <div className="mt-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <FileText size={20} className="text-rose-500" /> 제출이 필요한 항목
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {pendingTasks.map(task => (
                          <div key={task.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full group">
                            <div>
                              <div className="flex justify-between items-start mb-2">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${task.type === 'quiz' ? 'bg-indigo-50 text-indigo-600' : task.type === 'assignment' ? 'bg-orange-50 text-orange-600' : 'bg-purple-50 text-purple-600'}`}>
                                  {task.type === 'quiz' ? '퀴즈' : task.type === 'assignment' ? '과제' : '프로젝트'}
                                </span>
                                {task.status === 'urgent' && <span className="text-[10px] font-bold text-rose-500 flex items-center gap-1 animate-pulse"><AlertCircle size={10} /> 마감 임박</span>}
                              </div>
                              <h4 className="font-bold text-gray-800 text-lg leading-tight mb-1 group-hover:text-rose-600 transition-colors">{task.title}</h4>
                              <p className="text-xs text-gray-500 font-medium mb-4">마감: {task.deadline}</p>
                            </div>
                            <button className="w-full bg-gray-50 hover:bg-rose-500 hover:text-white text-gray-600 text-sm font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2">
                              <UploadCloud size={16} /> 제출하기
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: All Lectures List */}
                    <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden h-fit">
                      <div className="p-6 border-b border-gray-100 bg-gray-50/50"><h3 className="font-bold text-gray-800 text-lg flex items-center gap-2"><List size={20} className="text-gray-500" /> 전체 강의 리스트</h3></div>
                      <div className="divide-y divide-gray-100">
                        {allLecturesByMonth.map((group, gIdx) => (
                          <div key={gIdx} className="p-6"><h4 className="text-sm font-extrabold text-rose-500 mb-4 bg-rose-50 w-fit px-3 py-1 rounded-full border border-rose-100">{group.month}</h4>
                            <div className="space-y-1">
                              {group.lectures.map((lec, lIdx) => (
                                <div key={lIdx} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-colors group"><div className="shrink-0 w-6 flex justify-center">{lec.status === 'completed' ? <CheckCircle size={20} className="text-emerald-500" /> : lec.status === 'locked' ? <div className="w-2 h-2 bg-gray-300 rounded-full"></div> : <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>}</div><div className="flex-1"><div className="flex items-center gap-2 mb-0.5"><span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${lec.type === 'live' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>{lec.type === 'live' ? 'LIVE' : 'VOD'}</span><span className={`text-sm font-medium ${lec.status === 'completed' ? 'text-gray-400 line-through decoration-gray-300' : 'text-gray-700'}`}>{lec.title}</span></div></div></div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Submission History */}
                    <div className="lg:col-span-1 space-y-6">
                      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden sticky top-6">
                        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                          <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                            <Folder size={20} className="text-gray-500" /> 나의 제출 내역
                          </h3>
                        </div>
                        <div className="p-4 space-y-3">
                          {submittedHistory.map(item => (
                            <div key={item.id} className="p-4 rounded-xl border border-gray-100 hover:border-rose-100 hover:bg-rose-50/30 transition-all group">
                              <div className="flex justify-between items-start mb-2">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${item.type === 'quiz' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : item.type === 'assignment' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-purple-50 text-purple-600 border-purple-100'}`}>
                                  {item.type === 'quiz' ? '퀴즈' : item.type === 'assignment' ? '과제' : '프로젝트'}
                                </span>
                                <span className={`text-xs font-bold ${item.status === 'graded' ? 'text-gray-900' : 'text-gray-400'}`}>
                                  {item.score}
                                </span>
                              </div>
                              <h4 className="text-sm font-bold text-gray-800 mb-1 group-hover:text-rose-600 transition-colors">{item.title}</h4>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ================= ATTENDANCE MANAGEMENT VIEW (NEW) ================= */}
            {activeTab === 'attendance' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                
                {attendanceSubTab === 'status' && (
                  <>
                    {/* 1. Header & Quick Status */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      
                      {/* Left: Unit Attendance Rate & Subsidy Info */}
                      <div className="lg:col-span-2 bg-white rounded-3xl p-8 border border-gray-200 shadow-sm flex flex-col justify-center">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                              이번 단위기간 출석률 <Info size={16} className="text-gray-400 cursor-help" />
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">{attendanceStats.unit.period}</p>
                          </div>
                          {parseFloat(attendanceStats.unit.attendanceRate) >= 80 ? (
                            <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1.5">
                              <CheckCircle size={16} /> 훈련장려금 수급 가능
                            </div>
                          ) : (
                            <div className="bg-rose-50 border border-rose-200 text-rose-700 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-1.5">
                              <AlertTriangle size={16} /> 훈련장려금 수급 불가
                            </div>
                          )}
                        </div>

                        {/* Progress Bar for Unit */}
                        <div className="mb-4 relative">
                          <div className="flex justify-between text-xs font-bold text-gray-400 mb-2">
                            <span>0%</span>
                            <span className="absolute left-[80%] -translate-x-1/2 text-rose-500">80% (수료/장려금 기준)</span>
                            <span>100%</span>
                          </div>
                          <div className="w-full bg-slate-100 h-6 rounded-full overflow-hidden relative border border-gray-200">
                            {/* 80% Marker */}
                            <div className="absolute left-[80%] top-0 bottom-0 w-0.5 bg-rose-500 z-10"></div>
                            
                            {/* Actual Progress */}
                            <div 
                              className={`h-full flex items-center justify-end pr-2 text-xs font-bold text-white transition-all duration-1000 ${parseFloat(attendanceStats.unit.attendanceRate) >= 80 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                              style={{ width: `${attendanceStats.unit.attendanceRate}%` }}
                            >
                              {attendanceStats.unit.attendanceRate}%
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4 mt-6">
                          <div className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
                            <p className="text-xs text-gray-500 font-bold mb-1">진행 일수</p>
                            <p className="text-xl font-extrabold text-gray-800">{attendanceStats.unit.totalDays}일</p>
                          </div>
                          <div className="bg-emerald-50/50 rounded-xl p-4 text-center border border-emerald-100">
                            <p className="text-xs text-emerald-600 font-bold mb-1">출석</p>
                            <p className="text-xl font-extrabold text-emerald-700">{attendanceStats.unit.present}일</p>
                          </div>
                          <div className="bg-rose-50/50 rounded-xl p-4 text-center border border-rose-100">
                            <p className="text-xs text-rose-600 font-bold mb-1">결석</p>
                            <p className="text-xl font-extrabold text-rose-700">{attendanceStats.unit.absent}일</p>
                          </div>
                          <div className="bg-amber-50/50 rounded-xl p-4 text-center border border-amber-100 relative group">
                            <p className="text-xs text-amber-600 font-bold mb-1">지각/조퇴/외출</p>
                            <p className="text-xl font-extrabold text-amber-700">{attendanceStats.unit.late}회</p>
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                              3회 누적 시 결석 1회로 산정됩니다.
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Total Course & Drop warning */}
                      <div className="bg-slate-900 rounded-3xl p-8 shadow-lg text-white flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-rose-500 rounded-full opacity-20 blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                        
                        <div>
                          <span className="text-[10px] font-bold text-slate-300 bg-slate-800 px-2 py-1 rounded mb-3 inline-block border border-slate-700">전체 과정 현황</span>
                          <h3 className="text-lg font-bold mb-1">전체 출석률 <span className="text-rose-400">{attendanceStats.total.attendanceRate}%</span></h3>
                          <p className="text-xs text-slate-400">총 120일 중 {attendanceStats.total.passedDays}일 진행</p>
                        </div>

                        <div className="space-y-4 mt-6 z-10">
                          <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 backdrop-blur-sm">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5"><Calculator size={14}/> 장려금 (80%) 커트라인</span>
                            </div>
                            <p className="text-sm text-slate-100 mt-2">이번 달 <span className="font-extrabold text-emerald-400">{remainingAbsencesForSubsidy}번</span> 더 결석해도 장려금을 받을 수 있습니다.</p>
                          </div>
                          
                          <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700 backdrop-blur-sm">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5"><AlertCircle size={14}/> 제적 (50%) 커트라인</span>
                            </div>
                            <p className="text-sm text-slate-100 mt-2">제적 기준까지 <span className="font-extrabold text-rose-400">{remainingAbsencesForDrop}번</span>의 결석 허용 횟수가 남았습니다.</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 2. Calculation Info Box */}
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex items-start gap-4">
                      <div className="bg-blue-100 p-2 rounded-full shrink-0">
                        <Calculator size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-900 mb-1">출석 계산기 결과 요약</h4>
                        <p className="text-sm text-blue-800 mb-2">
                          수강생님의 현재 <strong>결석 1일</strong>과 <strong>지각/조퇴 2회</strong>를 합산하여, 규정에 따라 <strong>환산 결석 1일</strong>로 처리되고 있습니다.
                          <br/>(지각/조퇴/외출은 3회 발생 시 결석 1일로 산정됩니다.)
                        </p>
                        <button 
                          onClick={() => setAttendanceSubTab('correction')}
                          className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-blue-100 flex items-center gap-1 mt-2 transition-colors"
                        >
                          출결에 오류가 있나요? 정정 신청하기 <ArrowRight size={12}/>
                        </button>
                      </div>
                    </div>

                    {/* 3. Detailed Calendar View (Expanded) */}
                    <section className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
                      <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                        <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                          <CalendarDays size={20} className="text-gray-500" /> 출석부 캘린더
                        </h3>
                        <div className="flex gap-4 text-xs font-bold text-gray-500">
                          <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-emerald-100 border border-emerald-300"></div>출석</span>
                          <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-rose-100 border border-rose-300"></div>결석</span>
                          <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-amber-100 border border-amber-300"></div>지각/조퇴</span>
                          <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-blue-100 border border-blue-300"></div>공결</span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="grid grid-cols-7 gap-4">
                          {/* Weekdays */}
                          {['일', '월', '화', '수', '목', '금', '토'].map(d => (
                            <div key={d} className="text-center font-bold text-gray-400 text-sm pb-2 border-b border-gray-100">{d}</div>
                          ))}
                          
                          {/* Empty days for offset (Nov 1 started on Saturday) */}
                          {Array.from({length: 6}).map((_, i) => <div key={`empty-${i}`} className="p-4"></div>)}

                          {/* Days of Month (Mocking Nov) */}
                          {Array.from({length: 30}).map((_, i) => {
                            const day = i + 1;
                            let status = 'present';
                            let reason = '';
                            
                            // Mocking the specific data for "이배포"
                            if ([2, 9, 16, 23, 30].includes(day)) status = 'weekend'; // Sun
                            else if ([1, 8, 15, 22, 29].includes(day)) status = 'weekend'; // Sat
                            else if (day === 28) { status = 'late'; reason = '교통 지연 (5분 지각)'; }
                            else if (day === 20) { status = 'late'; reason = '병원 방문 (조퇴)'; }
                            else if (day === 12) { status = 'absent'; reason = '개인 사정'; }
                            else if (day > 29) { status = 'none'; } // future

                            let bgClass = 'bg-slate-50 border-gray-100 hover:bg-slate-100';
                            let icon = null;
                            if (status === 'present') { bgClass = 'bg-emerald-50/50 border-emerald-100 hover:bg-emerald-50 text-emerald-700'; }
                            else if (status === 'absent') { bgClass = 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100'; icon = <X size={14}/>; }
                            else if (status === 'late') { bgClass = 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100'; icon = <AlertTriangle size={14}/>; }
                            else if (status === 'weekend') { bgClass = 'bg-transparent border-transparent text-gray-300'; }

                            return (
                              <div key={day} className={`min-h-[80px] p-2 rounded-xl border transition-colors flex flex-col justify-between ${bgClass}`}>
                                <div className="flex justify-between items-start">
                                  <span className="text-sm font-bold">{day}</span>
                                  {icon}
                                </div>
                                {reason && <div className="text-[10px] font-medium mt-1 leading-tight opacity-80 break-keep">{reason}</div>}
                                {status === 'present' && <div className="text-[10px] font-bold mt-auto pt-1 opacity-50">출석</div>}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </section>
                  </>
                )}

                {attendanceSubTab === 'correction' && (
                  <>
                    {/* 안내 배너 */}
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex items-start gap-4">
                      <AlertCircle size={22} className="text-blue-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-blue-900 mb-1">출결 정정 신청 안내</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• 정정 신청은 해당 수업일로부터 <span className="font-bold">7일 이내</span>에만 가능합니다.</li>
                          <li>• 사유에 맞는 증빙 서류(진단서, 교통 정보 캡처 등)를 함께 첨부해 주세요.</li>
                          <li>• 운영팀 검토 후 <span className="font-bold">3~5 영업일 내</span>에 결과를 안내 드립니다.</li>
                        </ul>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                      {/* Left: 신청 양식 */}
                      <div className="lg:col-span-3">
                        <section className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8">
                          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <FileText size={20} className="text-rose-500"/> 정정 신청 양식
                          </h3>

                          {correctionSubmitted ? (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle size={40} className="text-emerald-500" />
                              </div>
                              <h4 className="text-xl font-bold text-gray-900 mb-2">정정 신청이 완료되었습니다!</h4>
                              <p className="text-gray-500 text-sm mb-8">운영팀 검토 후 3~5 영업일 내에 결과를 안내드립니다.</p>
                              <button 
                                onClick={() => { setCorrectionSubmitted(false); setCorrectionForm({ date: '', currentStatus: '', requestedStatus: '', category: '', reason: '', file: null }); }}
                                className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-700 transition-colors"
                              >
                                새 신청서 작성하기
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-6">
                              <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">정정 요청 날짜 <span className="text-rose-500">*</span></label>
                                <input type="date" value={correctionForm.date} onChange={e => setCorrectionForm(prev => ({ ...prev, date: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:ring-2 focus:ring-rose-400 outline-none" />
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-bold text-gray-700 mb-2">현재 기록된 상태 <span className="text-rose-500">*</span></label>
                                  <select value={correctionForm.currentStatus} onChange={e => setCorrectionForm(prev => ({ ...prev, currentStatus: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white outline-none">
                                    <option value="">선택하세요</option><option value="결석">결석</option><option value="지각">지각</option><option value="조퇴">조퇴</option>
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-sm font-bold text-gray-700 mb-2">정정 요청 상태 <span className="text-rose-500">*</span></label>
                                  <select value={correctionForm.requestedStatus} onChange={e => setCorrectionForm(prev => ({ ...prev, requestedStatus: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white outline-none focus:ring-2 focus:ring-rose-400">
                                    <option value="">선택하세요</option><option value="출석">출석</option><option value="공결">공결 (공식 인정 결석)</option>
                                  </select>
                                </div>
                              </div>

                              {/* NEW: 사유 카테고리 드롭다운 */}
                              <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">사유 카테고리 <span className="text-rose-500">*</span></label>
                                <select value={correctionForm.category} onChange={e => setCorrectionForm(prev => ({ ...prev, category: e.target.value }))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white outline-none focus:ring-2 focus:ring-rose-400">
                                  <option value="">출석 인정 사유를 선택하세요</option>
                                  <optgroup label="[HRD 기준] 공결(출석인정) 사유 - 증빙 필수">
                                    <option value="예비군/민방위">예비군, 민방위 훈련, 징병검사</option>
                                    <option value="시험/면접">자격시험 응시, 채용 면접 등</option>
                                    <option value="경조사(결혼/사망/출산)">경조사 (결혼, 사망, 출산)</option>
                                    <option value="질병/입원">질병·입원</option>
                                    <option value="휴가">휴가</option>
                                    <option value="기기/시스템문제">단말기 고장, 정전, 출결카드 분실·훼손</option>
                                    <option value="대회/실습">해커톤·경진대회 참여, 현장실습</option>
                                  </optgroup>
                                  <optgroup label="일반 정정 사유">
                                    <option value="대중교통지연">대중교통 지연</option>
                                    <option value="온라인접속오류">온라인 시스템/기술 접속 오류</option>
                                    <option value="기타">기타 (하단 상세 사유에 직접 작성)</option>
                                  </optgroup>
                                </select>
                              </div>

                              <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">상세 정정 사유 <span className="text-rose-500">*</span></label>
                                <textarea value={correctionForm.reason} onChange={e => setCorrectionForm(prev => ({ ...prev, reason: e.target.value }))} placeholder="출결 정정을 요청하는 구체적인 사유를 작성해 주세요." rows={5} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none resize-none focus:ring-2 focus:ring-rose-400" />
                              </div>

                              <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">정정 사유 <span className="text-rose-500">*</span></label>
                                <textarea value={correctionForm.reason} onChange={e => setCorrectionForm(prev => ({ ...prev, reason: e.target.value }))} placeholder="출결 정정을 요청하는 구체적인 사유를 작성해 주세요." rows={5} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none resize-none" />
                              </div>

                              <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">증빙 자료 첨부 <span className="text-gray-400 font-normal">(선택)</span></label>
                                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:bg-rose-50/30">
                                  <input type="file" id="correction-file" className="hidden" onChange={e => setCorrectionForm(prev => ({ ...prev, file: e.target.files[0] }))} />
                                  <label htmlFor="correction-file" className="cursor-pointer">
                                    {correctionForm.file ? (
                                      <div className="flex justify-center gap-2 text-emerald-600"><FileCheck size={24} /><span className="text-sm font-bold">{correctionForm.file.name}</span></div>
                                    ) : (
                                      <><UploadCloud size={28} className="text-gray-300 mx-auto mb-2" /><p className="text-sm font-bold text-gray-500">클릭하여 파일 첨부</p></>
                                    )}
                                  </label>
                                </div>
                              </div>

                              <button
                                onClick={() => {
                                  if (!correctionForm.date || !correctionForm.currentStatus || !correctionForm.requestedStatus || !correctionForm.category || !correctionForm.reason) return alert('필수 항목을 모두 입력해주세요.');
                                  setCorrectionSubmitted(true);
                                }}
                                className="w-full bg-rose-500 hover:bg-rose-600 text-white py-4 rounded-2xl font-bold text-[15px] transition-all shadow-lg flex justify-center items-center gap-2"
                              >
                                <CheckSquare size={20} /> 정정 신청서 제출하기
                              </button>
                            </div>
                          )}
                        </section>
                      </div>

                      {/* Right: 신청 내역 */}
                      <div className="lg:col-span-2">
                        <section className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden sticky top-6">
                          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                            <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2"><List size={20} className="text-gray-500"/> 나의 신청 내역</h3>
                          </div>
                          <div className="p-4 space-y-3">
                            {attendanceCorrectionHistory.map(item => (
                              <div key={item.id} className="p-4 rounded-xl border border-gray-100 bg-white">
                                <div className="flex justify-between items-start mb-2">
                                  <span className="text-sm font-bold text-gray-800">{item.date}</span>
                                  {item.status === 'approved' && <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center gap-1"><CheckCircle size={10}/> 승인</span>}
                                  {item.status === 'pending' && <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-600 border border-amber-100 flex items-center gap-1"><Clock size={10}/> 검토 중</span>}
                                </div>
                                <p className="text-xs font-bold text-rose-500 mb-1">{item.type}</p>
                                <p className="text-xs text-gray-500 leading-relaxed">{item.reason}</p>
                              </div>
                            ))}
                          </div>
                        </section>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === 'portfolio' && (
              // ================= PORTFOLIO VIEW =================
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                
                {/* 1. Completion Criteria Alert Banner */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between shadow-sm cursor-pointer hover:bg-amber-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="text-amber-500" size={24} />
                    <div>
                      <h4 className="font-bold text-amber-900 text-sm">수료 기준 확인</h4>
                      <p className="text-xs text-amber-700 mt-0.5">각 항목별 수료 기준을 상세히 확인하려면 여기를 클릭하세요.</p>
                    </div>
                  </div>
                  <ChevronRight className="text-amber-400" size={20} />
                </div>

                {/* 2. Portfolio Summary Card */}
                <div 
                  className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all cursor-pointer group flex flex-col items-center justify-center min-h-[300px] text-center"
                  onClick={() => setShowReportModal(true)}
                >
                  <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <FileBarChart size={48} className="text-rose-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">나의 전체 포트폴리오 보고서</h3>
                  <p className="text-gray-500 max-w-sm mx-auto mb-8">
                    수강생님의 학습 활동, 프로젝트 성과, 출석률 등을 종합적으로 분석한 역량 보고서입니다. 상세 내용을 확인하시려면 클릭하세요.
                  </p>
                  <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center gap-2">
                    보고서 상세보기 <ExternalLink size={18} />
                  </button>
                </div>

                {/* 3. Detailed Status & Charts (Restored from previous version) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Overall Pass Status (Donut) */}
                  <section className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm flex flex-col items-center justify-center text-center">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">평가 통과 현황</h3>
                    <div className="relative w-48 h-48 mb-6">
                      <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                        <path className="text-gray-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.8" />
                        <path className="text-rose-500 drop-shadow-lg transition-all duration-1000 ease-out" strokeDasharray={`${portfolioData.totalScore}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.8" strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-extrabold text-gray-900">{portfolioData.totalScore}<span className="text-lg text-gray-400 font-medium">%</span></span>
                        <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded mt-1">진행 중</span>
                      </div>
                    </div>
                    <div className="flex gap-4 text-xs font-bold">
                      <span className="text-emerald-600">통과 4개</span>
                      <span className="text-rose-500">미달 2개</span>
                    </div>
                  </section>

                  {/* Detailed Score Table */}
                  <section className="lg:col-span-2 bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                      <h3 className="font-bold text-gray-800">평가 항목별 상세 점수</h3>
                    </div>
                    <div className="flex-1 overflow-x-auto">
                      <table className="w-full text-sm text-left h-full">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100">
                          <tr>
                            <th className="px-6 py-4 font-bold">평가 항목</th>
                            <th className="px-6 py-4 font-bold">나의 점수 / 만점</th>
                            <th className="px-6 py-4 font-bold">반영 비율 (%)</th>
                            <th className="px-6 py-4 font-bold text-rose-600">환산 점수</th>
                            <th className="px-6 py-4 font-bold text-center">상태</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {portfolioData.items.map((item, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                              <td className="px-6 py-4 text-gray-600">{item.myScore} / {item.maxScore}</td>
                              <td className="px-6 py-4 text-gray-600">{item.weight}%</td>
                              <td className="px-6 py-4 font-bold text-rose-600">{item.converted}점</td>
                              <td className="px-6 py-4 text-center">
                                {item.pass ? (
                                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                                    <CheckCircle size={12}/> 통과
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded">
                                    <AlertCircle size={12}/> 미달
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                </div>

                {/* 4. Completion Forecast & Career Genome */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
                   {/* Completion Forecast */}
                   <section className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">과정 수료 예측</h3>
                        <p className="text-sm text-gray-500 mt-1">{portfolioData.courseName}</p>
                      </div>
                      {portfolioData.totalScore >= portfolioData.passScore ? (
                        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg font-bold text-sm">수료 가능 🎉</span>
                      ) : (
                        <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-lg font-bold text-sm">수료 불가 🚨</span>
                      )}
                    </div>

                    <div className="flex items-end gap-12 h-40 mt-4 px-8 border-b border-gray-100 pb-8">
                      <div className="flex flex-col items-center gap-2 w-24">
                        <span className="text-sm font-bold text-gray-400">70점</span>
                        <div className="w-16 bg-gray-200 rounded-t-lg h-32 relative group">
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">수료 기준점</div>
                        </div>
                        <span className="text-sm font-bold text-gray-600">수료 기준</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 w-24">
                        <span className="text-sm font-bold text-rose-500">{portfolioData.totalScore}점</span>
                        <div className="w-16 bg-rose-500 rounded-t-lg relative group" style={{ height: `${(portfolioData.totalScore/100)*100}%` }}>
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-rose-600 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">현재 내 점수</div>
                        </div>
                        <span className="text-sm font-bold text-rose-600">내 점수</span>
                      </div>
                    </div>
                  </section>

                  {/* Career Genome */}
                  <section className="bg-white rounded-3xl shadow-sm border border-gray-200 p-8 flex flex-col justify-center">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900">나의 역량 데이터 (Career Genome)</h3>
                      <p className="text-sm text-gray-500 mt-1">학습 활동과 평가를 통해 축적된 정성적 역량 지표입니다.</p>
                    </div>
                    <div className="flex justify-center py-2">
                      <RadarChart />
                    </div>
                  </section>
                </div>

              </div>
            )}

            {activeTab === 'notice' && (
              // ================= NOTICE VIEW =================
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div><h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2"><Megaphone size={24} className="text-rose-500"/> 공지사항</h2><p className="text-gray-500">주요 일정 및 학습 관련 안내사항을 확인하세요.</p></div>
                <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden"><div className="divide-y divide-gray-100">{notices.map(notice => (<div key={notice.id} className="p-6 hover:bg-slate-50 transition-colors cursor-pointer group flex flex-col md:flex-row md:items-center justify-between gap-4"><div className="flex-1"><div className="flex items-center gap-2 mb-2">{notice.type === 'important' ? <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">중요</span> : <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">일반</span>}<span className="text-xs text-gray-400 font-medium">{notice.date}</span></div><h4 className="text-lg font-bold text-gray-800 group-hover:text-rose-600 transition-colors">{notice.title}</h4></div><div className="text-sm text-gray-500 font-medium flex items-center gap-2"><span className="bg-slate-100 px-2 py-1 rounded text-xs">{notice.author}</span><ChevronRight size={18} className="text-gray-300" /></div></div>))}</div></div>
              </div>
            )}

            {activeTab === 'support' && (
              // ================= SUPPORT CENTER VIEW =================
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div><h2 className="text-2xl font-bold text-gray-900 mb-2">지원 센터</h2><p className="text-gray-500">학습 중 궁금한 점을 문의하거나 가이드를 확인하세요.</p></div><div className="grid grid-cols-1 lg:grid-cols-2 gap-8"><section className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 h-full"><div className="flex justify-between items-center mb-6"><h3 className="text-lg font-bold text-gray-900 flex items-center gap-2"><MessageSquare size={20} className="text-blue-500"/> 1:1 문의</h3><button className="bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-slate-700 transition-colors">+ 새 문의 작성</button></div><div className="space-y-3">{inquiries.map(inquiry => (<div key={inquiry.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:bg-slate-50 cursor-pointer"><div><h4 className="text-sm font-medium text-gray-800 mb-1">{inquiry.title}</h4><p className="text-xs text-gray-400">{inquiry.date}</p></div><span className={`text-[10px] font-bold px-2 py-1 rounded ${inquiry.status === 'answered' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>{inquiry.status === 'answered' ? '답변 완료' : '답변 대기'}</span></div>))}<div className="p-8 text-center border border-dashed border-gray-200 rounded-xl bg-slate-50/50"><p className="text-xs text-gray-400">최근 3개월 간의 문의 내역이 표시됩니다.</p></div></div></section><section className="bg-slate-50 rounded-3xl border border-slate-200 p-6 h-full"><h3 className="text-sm font-bold text-gray-500 mb-4 flex items-center gap-2"><HelpCircle size={16}/> 자주 묻는 질문 / 가이드</h3><div className="grid grid-cols-1 gap-3"><button className="bg-white p-4 rounded-xl text-left text-sm font-bold text-gray-700 shadow-sm hover:shadow-md transition-all border border-gray-100 flex items-center justify-between group"><span className="flex items-center gap-3"><FileQuestion size={18} className="text-slate-400"/> 출결 기준 및 인정 사유 안내</span><ChevronRight size={16} className="text-gray-300 group-hover:text-slate-500"/></button><button className="bg-white p-4 rounded-xl text-left text-sm font-bold text-gray-700 shadow-sm hover:shadow-md transition-all border border-gray-100 flex items-center justify-between group"><span className="flex items-center gap-3"><MonitorPlay size={18} className="text-slate-400"/> 동영상 강의 재생 오류 해결법</span><ChevronRight size={16} className="text-gray-300 group-hover:text-slate-500"/></button><button className="bg-white p-4 rounded-xl text-left text-sm font-bold text-gray-700 shadow-sm hover:shadow-md transition-all border border-gray-100 flex items-center justify-between group"><span className="flex items-center gap-3"><CheckSquare size={18} className="text-slate-400"/> 과제 제출 방법 및 수정 가이드</span><ChevronRight size={16} className="text-gray-300 group-hover:text-slate-500"/></button><button className="bg-white p-4 rounded-xl text-left text-sm font-bold text-gray-700 shadow-sm hover:shadow-md transition-all border border-gray-100 flex items-center justify-between group"><span className="flex items-center gap-3"><Award size={18} className="text-slate-400"/> 수료증 발급 및 성적표 확인</span><ChevronRight size={16} className="text-gray-300 group-hover:text-slate-500"/></button></div></section></div>
              </div>
            )}

          </div>
        </div>
      </main>

      {/* Action Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedEvent(null)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100 transform transition-all" onClick={e => e.stopPropagation()}>
            <div className={`h-3 w-full ${selectedEvent.type === 'live' ? 'bg-emerald-500' : selectedEvent.type === 'submit' ? 'bg-rose-500' : selectedEvent.type === 'peer' ? 'bg-purple-500' : selectedEvent.type === 'offline' ? 'bg-slate-500' : 'bg-blue-500'}`}></div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="pr-4">
                  <span className="text-[13px] font-bold text-gray-400 mb-2 block">{selectedEvent.day}요일 · {selectedEvent.time}</span>
                  <div className="flex items-center gap-2 mb-3">
                    {selectedEvent.status !== 'completed' && <EventBadge type={selectedEvent.type} status={selectedEvent.status} />}
                  </div>
                  <h3 className="text-[20px] font-bold text-gray-900 leading-tight whitespace-pre-wrap">{selectedEvent.title}</h3>
                </div>
                <button onClick={() => setSelectedEvent(null)} className="text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-200 rounded-full p-2.5 transition-colors shrink-0">
                  <X size={20} />
                </button>
              </div>

              <div className="py-2 space-y-6">
                <div className="bg-[#f8fafc] p-6 rounded-2xl border border-gray-200 shadow-sm">
                  {selectedEvent.learningGoal && (
                    <div className={selectedEvent.taskGoal ? "mb-5" : ""}>
                      <p className="text-[13px] font-extrabold text-blue-600 mb-2 flex items-center gap-1.5"><Target size={15}/> 학습 목표</p>
                      <p className="text-[14px] text-gray-700 leading-relaxed font-medium break-keep">{selectedEvent.learningGoal}</p>
                    </div>
                  )}
                  {selectedEvent.taskGoal && (
                    <div className="pt-5 border-t border-gray-200">
                      <p className="text-[13px] font-extrabold text-rose-500 mb-2 flex items-center gap-1.5"><FileText size={15}/> 과제 목표</p>
                      <p className="text-[14px] text-gray-700 leading-relaxed font-medium break-keep">{selectedEvent.taskGoal}</p>
                    </div>
                  )}
                  {selectedEvent.location && (
                    <div className="mb-4 p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
                        <div className="p-2 bg-white rounded-full border border-gray-100 shadow-sm text-slate-500"><MapPin size={20} /></div>
                        <div><p className="text-xs font-bold text-gray-500">강의장 정보</p><p className="text-sm font-bold text-gray-800">{selectedEvent.location}</p></div>
                    </div>
                  )}
                </div>

                {selectedEvent.status === 'completed' ? (
                   <button className="w-full bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-colors text-[15px]">복습하기</button>
                ) : (
                  <>
                    {selectedEvent.type === 'live' && <button className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-bold text-[15px] hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-200 flex justify-center items-center gap-2 transform hover:-translate-y-0.5"><Video size={20} /> 실시간(Zoom) 입장하기</button>}
                    {selectedEvent.type === 'vod' && <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-[15px] hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 flex justify-center items-center gap-2 transform hover:-translate-y-0.5"><PlayCircle size={20} /> 강의 수강하기</button>}
                    {selectedEvent.type === 'submit' && <button className="w-full bg-rose-500 text-white py-4 rounded-2xl font-bold text-[15px] hover:bg-rose-600 transition-all shadow-lg shadow-rose-200 flex justify-center items-center gap-2 transform hover:-translate-y-0.5"><FileText size={20} /> 과제 작성 및 제출</button>}
                    {selectedEvent.type === 'peer' && <button className="w-full bg-purple-600 text-white py-4 rounded-2xl font-bold text-[15px] hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 flex justify-center items-center gap-2 transform hover:-translate-y-0.5"><Users size={20} /> 멘토링/실습 입장</button>}
                    {selectedEvent.type === 'offline' && <button className="w-full bg-slate-700 text-white py-4 rounded-2xl font-bold text-[15px] hover:bg-slate-600 transition-all shadow-lg shadow-slate-300 flex justify-center items-center gap-2 transform hover:-translate-y-0.5"><MapPin size={22} /> 강의장 약도 보기</button>}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Portfolio Detail Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8" onClick={() => setShowReportModal(false)}>
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-white sticky top-0 z-10">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2"><FileBarChart size={20} className="text-rose-500" /> 패스트캠퍼스 부트캠프 인재추천서</h2>
              <button onClick={() => setShowReportModal(false)} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"><X size={20} className="text-gray-600" /></button>
            </div>
            <div className="flex-1 overflow-y-auto bg-gray-100 flex justify-center p-4">
              <div className="bg-white shadow-lg w-full max-w-3xl">
                <img src="https://file.notion.so/f/f/e770305f-d227-463d-802f-22a36b328738/2df72fa0-949e-4c3d-b4ef-232145c2f826/%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%8C%E1%85%A2%E1%84%8E%E1%85%AE%E1%84%8E%E1%85%A1%E1%86%AB%E1%84%89%E1%85%A5_%E1%84%8B%E1%85%A8%E1%84%89%E1%85%B5.webp?id=288a7c29-37e4-42b7-b08e-8a0224b7428f&table=block&spaceId=e770305f-d227-463d-802f-22a36b328738&expirationTimestamp=1739599200000&signature=Y-17K_P9-Z-15_18-A-13-11-2025-13-13&downloadName=%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%8C%E1%85%A2%E1%84%8E%E1%85%AE%E1%84%8E%E1%85%A1%E1%86%AB%E1%84%89%E1%85%A5_%E1%84%8B%E1%85%A8%E1%84%89%E1%85%B5.webp" alt="인재추천서 예시" className="w-full h-auto" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x1200/e2e8f0/64748b?text=추천서+이미지"; e.target.alt = "이미지를 불러올 수 없습니다."; }}/>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 bg-white flex justify-end gap-2">
                <button className="px-4 py-2 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">이미지 저장</button>
                <button className="px-4 py-2 text-sm font-bold text-white bg-rose-500 hover:bg-rose-600 rounded-lg transition-colors">PDF 다운로드</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

/**
 * OH PRINT ME - Group Order Flow Prototype
 * * [주요 기능]
 * 1. 모임장 모드: 장바구니 내 프로젝트 공유 링크 생성, 공유 중지 시뮬레이션 (로딩 포함)
 * 2. 참여자 모드: 공유 링크 진입 시 디자인 미리보기 및 장바구니 복사/편집 플로우
 * 3. 기기 전환: PC/Mobile 반응형 레이아웃 시뮬레이션
 */

import React, { useState } from 'react';
import { 
  Share2, 
  ShoppingCart, 
  ChevronRight, 
  Smartphone, 
  Monitor, 
  CheckCircle, 
  Clock, 
  Edit3, 
  ExternalLink,
  Menu,
  X,
  Plus,
  RefreshCw,
  Minus,
  ChevronDown,
  Loader2
} from 'lucide-react';

const App = () => {
  // --- States ---
  const [device, setDevice] = useState('pc'); // 'pc' | 'mobile'
  const [role, setRole] = useState('leader'); // 'leader' | 'member'
  const [step, setStep] = useState('cart'); // leader: 'cart' | member: 'landing'
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [previewSide, setPreviewSide] = useState('front');
  const [loading, setLoading] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState(null);

  // --- Mock Data (Cart Projects) ---
  const [projects, setProjects] = useState([
    { 
      id: 1, 
      title: "2026 러닝크루 공식 티셔츠", 
      price: 24500, 
      color: "화이트", 
      size: "XL", 
      date: "2026.03.30", 
      isSharing: true,
      category: "글리머 드라이 폴로셔츠"
    },
    { 
      id: 2, 
      title: "팀블링 30수 티셔츠", 
      price: 6750, 
      color: "네이비", 
      size: "XL", 
      date: "2026.03.26", 
      isSharing: false,
      category: "어패럴 베이직"
    },
    { 
      id: 3, 
      title: "비캔버스 오버핏 쭈리 맨투맨", 
      price: 28500, 
      color: "멜란지", 
      size: "L", 
      date: "2026.03.30", 
      isSharing: false,
      category: "어패럴 오버핏"
    }
  ]);

  // --- Business Logic ---
  const toggleShare = (id, status) => {
    setLoading(true);
    setActiveProjectId(id);
    
    // Simulate API Call
    setTimeout(() => {
      setProjects(prev => prev.map(p => 
        p.id === id ? { ...p, isSharing: status } : p
      ));
      setLoading(false);
      setShowShareModal(false);
    }, 1200);
  };

  const handleLoginAction = (nextStep) => {
    if (!isLoggedIn) {
      if (confirm('로그인이 필요한 서비스입니다.\n로그인 페이지로 이동하시겠습니까?')) {
        setIsLoggedIn(true);
        setStep(nextStep);
      }
    } else {
      setStep(nextStep);
    }
  };

  // --- Sub-Components ---
  const Badge = ({ children, color }) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 border-blue-100',
      green: 'bg-green-50 text-green-600 border-green-100',
      red: 'bg-red-50 text-red-600 border-red-100',
      gray: 'bg-gray-50 text-gray-500 border-gray-100',
    };
    return (
      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${colors[color] || colors.gray}`}>
        {children}
      </span>
    );
  };

  const PlaceholderSquare = ({ text, className = "" }) => (
    <div className={`bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 font-bold text-[10px] rounded ${className}`}>
      {text || "[IMG]"}
    </div>
  );

  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-white/60 backdrop-blur-[2px] z-[200] flex flex-col items-center justify-center animate-in fade-in duration-200">
      <Loader2 className="text-blue-600 animate-spin mb-2" size={40} />
      <p className="text-sm font-bold text-gray-800">요청을 처리 중입니다...</p>
    </div>
  );

  const Nav = () => (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-black text-xl tracking-tighter text-black cursor-pointer" onClick={() => {setRole('leader'); setStep('cart');}}>OH PRINT. ME</span>
          <div className="hidden md:flex gap-4 text-sm font-bold ml-4">
            <span className="text-blue-600 border-b-2 border-blue-600 pb-1">어패럴</span>
            <span className="text-gray-400 hover:text-black cursor-pointer">명함</span>
            <span className="text-gray-400 hover:text-black cursor-pointer">스티커</span>
            <span className="text-gray-400 hover:text-black cursor-pointer">홍보물</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button onClick={() => setDevice('pc')} className={`p-1.5 rounded transition-all ${device === 'pc' ? 'bg-white shadow-sm' : 'text-gray-400'}`}><Monitor size={16} /></button>
            <button onClick={() => setDevice('mobile')} className={`p-1.5 rounded transition-all ${device === 'mobile' ? 'bg-white shadow-sm' : 'text-gray-400'}`}><Smartphone size={16} /></button>
          </div>
          <div className="h-6 w-px bg-gray-200" />
          <div className="flex gap-2">
            <button onClick={() => { setRole('leader'); setStep('cart'); }} className={`text-xs px-3 py-1.5 rounded-full font-bold transition-all ${role === 'leader' ? 'bg-black text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>모임장</button>
            <button onClick={() => { setRole('member'); setStep('landing'); setIsLoggedIn(false); }} className={`text-xs px-3 py-1.5 rounded-full font-bold transition-all ${role === 'member' ? 'bg-black text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>참여자</button>
          </div>
        </div>
      </div>
    </div>
  );

  const CartItemRow = ({ item }) => (
    <div className={`flex border-b border-gray-100 py-6 items-start gap-4 transition-colors ${item.isSharing ? 'bg-blue-50/20' : ''}`}>
      <div className="pt-1">
        <div className="w-5 h-5 border rounded flex items-center justify-center bg-white">
          <div className="w-2 h-2 bg-gray-200 rounded-sm"></div>
        </div>
      </div>
      
      <PlaceholderSquare text="상품 이미지" className="w-32 h-32 flex-shrink-0" />
      
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-gray-400 text-xs tracking-tight">{item.category}</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <h4 className="font-bold text-base">{item.title}</h4>
          <Edit3 size={14} className="text-gray-400 cursor-pointer hover:text-black" />
          {item.isSharing && <Badge color="blue">공유 중</Badge>}
        </div>
        <div className="text-[11px] text-gray-500 space-y-1 mb-4">
          <p>인쇄 위치 : 앞면(가슴), 뒷면(등판)</p>
          <p>색상 : {item.color}</p>
        </div>
        <div className="flex gap-2 text-[11px] text-blue-600 font-bold underline">
          <button className="hover:text-blue-800">옵션 변경</button>
          <button className="hover:text-blue-800">색상 추가</button>
        </div>
      </div>

      <div className="w-48 px-4 border-l border-r border-gray-100 h-32 flex flex-col justify-center">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] text-gray-400">사이즈</span>
          <div className="flex items-center gap-1 border px-2 py-1 rounded bg-white text-[11px] cursor-pointer hover:bg-gray-50">
            {item.size} <ChevronDown size={12} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex border rounded overflow-hidden bg-white">
            <button className="px-2 py-1 border-r hover:bg-gray-50"><Minus size={12}/></button>
            <div className="px-3 py-1 text-[11px] font-bold">1</div>
            <button className="px-2 py-1 border-l hover:bg-gray-50"><Plus size={12}/></button>
          </div>
          <div className="text-right">
             <span className="text-sm font-bold text-gray-800">{item.price.toLocaleString()}원</span>
             <p className="text-[10px] text-gray-400 mt-0.5">(총 수량: 1)</p>
          </div>
        </div>
      </div>

      <div className="w-28 flex flex-col items-center justify-center h-32">
        <span className="text-lg font-bold text-red-500">{item.price.toLocaleString()}원</span>
      </div>

      <div className="w-24 text-center text-[11px] text-gray-400 h-32 flex items-center justify-center">
        {item.date}
      </div>

      <div className="w-28 space-y-1.5 flex flex-col justify-center h-32 px-2">
        <button className="w-full py-1.5 bg-blue-600 text-white rounded text-[11px] font-bold shadow-sm hover:bg-blue-700">주문하기</button>
        <button className="w-full py-1.5 border text-gray-600 rounded text-[11px] font-bold bg-white hover:bg-gray-50">편집하기</button>
        <button className="w-full py-1.5 border text-gray-600 rounded text-[11px] font-bold bg-white hover:bg-gray-50">복사하기</button>
        <button 
          onClick={() => {
            setActiveProjectId(item.id);
            setShowShareModal(true);
          }}
          className={`w-full py-1.5 border rounded text-[11px] font-bold flex items-center justify-center gap-1 transition-all ${item.isSharing ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'}`}
        >
          <Share2 size={10} /> {item.isSharing ? '공유 관리' : '공유하기'}
        </button>
      </div>
    </div>
  );

  // --- Main Views ---
  const LeaderCart = () => {
    const sharingProjects = projects.filter(p => p.isSharing);
    const regularProjects = projects.filter(p => !p.isSharing);

    return (
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">장바구니</h1>
          <p className="text-gray-400 text-sm">내가 저장한 상품을 관리하고 주문할 수 있어요.</p>
        </div>

        <p className="text-xs font-bold mb-4">담은 상품 {projects.length}개</p>

        <div className="bg-[#000F31] p-4 text-white text-center rounded mb-4 flex items-center justify-center gap-3 shadow-md border-b-4 border-blue-500">
          <span className="bg-blue-500 px-2 py-0.5 rounded text-[10px] font-bold">업.계.최.초</span>
          <span className="text-sm font-bold italic tracking-tight">오프린트미에선 <span className="text-blue-400 font-black">오늘 주문하면, 내일 바로 출고!</span></span>
        </div>

        <div className="flex justify-between items-center border-t border-b py-3 mb-6 bg-white sticky top-14 z-40 shadow-sm px-2">
          <div className="flex gap-2">
            <button className="px-3 py-1.5 border rounded text-[11px] font-bold text-gray-600 bg-gray-50 hover:bg-gray-100">전체 선택</button>
            <button className="px-3 py-1.5 border rounded text-[11px] font-bold text-gray-600 hover:bg-gray-50">선택 삭제</button>
            <button className="px-3 py-1.5 border rounded text-[11px] font-bold text-gray-600 hover:bg-gray-50">선택 견적서 발급</button>
          </div>
          <button className="px-6 py-2 bg-gray-100 text-gray-400 rounded text-xs font-bold cursor-not-allowed">선택 주문하기</button>
        </div>

        <div className="flex text-[11px] font-bold text-gray-400 py-2 border-b uppercase text-center bg-gray-50/50">
          <div className="w-9 px-2"></div>
          <div className="flex-1 text-left px-4">상품 정보</div>
          <div className="w-48">수량</div>
          <div className="w-28">가격</div>
          <div className="w-24">최종 편집일</div>
          <div className="w-28">비고</div>
        </div>

        {/* Group Order List */}
        {sharingProjects.length > 0 && (
          <div className="mb-10">
            <div className="bg-blue-600 text-white px-4 py-2 text-xs font-black italic flex items-center gap-2 rounded-t-lg shadow-sm">
              <Share2 size={14} /> ACTIVE GROUP ORDER PROJECTS
            </div>
            {sharingProjects.map(item => (
              <CartItemRow key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* Regular Project List */}
        <div className="mb-20">
          <div className="bg-gray-100 text-gray-500 px-4 py-2 text-xs font-bold rounded-t-lg">
            MY PROJECTS
          </div>
          {regularProjects.length > 0 ? (
            regularProjects.map(item => (
              <CartItemRow key={item.id} item={item} />
            ))
          ) : (
            <div className="py-10 text-center text-gray-400 text-xs border-b">장바구니에 일반 상품이 없습니다.</div>
          )}
        </div>
      </div>
    );
  };

  const MemberLanding = () => (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="text-center mb-12">
        <Badge color="blue">GROUP ORDER INVITED</Badge>
        <h1 className="text-3xl font-black mt-4 mb-2 tracking-tighter">함께 주문하는 즐거움!</h1>
        <p className="text-gray-500 text-sm">모임장이 완성한 디자인을 확인하고 개별 주문을 시작하세요.</p>
      </div>

      <div className="bg-white border rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        <div className="flex-1 bg-gray-50 p-10 flex flex-col items-center justify-center relative">
          <PlaceholderSquare text={previewSide === 'front' ? "앞면 디자인" : "뒷면 디자인"} className="w-full aspect-square text-xl shadow-inner border-4 border-white" />
          <div className="mt-4 flex gap-2">
            <button onClick={() => setPreviewSide('front')} className={`px-4 py-1.5 rounded-full text-[10px] font-bold shadow-sm transition-all ${previewSide === 'front' ? 'bg-black text-white' : 'bg-white border text-gray-400'}`}>앞면</button>
            <button onClick={() => setPreviewSide('back')} className={`px-4 py-1.5 rounded-full text-[10px] font-bold shadow-sm transition-all ${previewSide === 'back' ? 'bg-black text-white' : 'bg-white border text-gray-400'}`}>뒷면</button>
          </div>
        </div>
        <div className="flex-1 p-10 flex flex-col justify-center border-l border-gray-100">
          <h2 className="text-2xl font-bold mb-2">글리머 드라이 폴로셔츠</h2>
          <p className="text-gray-500 text-xs mb-8 leading-relaxed">
            땀 흡수와 건조가 빠른 기능성 소재로 제작되었습니다.<br/>
            모임장이 만든 '2026 러닝크루' 공식 굿즈 디자인입니다.<br/>
            각자 사이즈를 골라 결제하면 개별 배송됩니다.
          </p>
          <div className="space-y-3">
             <button onClick={() => handleLoginAction('cart')} className="w-full py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg active:scale-95">디자인 그대로 담기</button>
             <button onClick={() => handleLoginAction('editor')} className="w-full py-4 border-2 border-black text-black rounded-xl font-bold hover:bg-gray-100 transition-all active:scale-95">디자인 수정하기</button>
          </div>
          <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-3">
            <Clock className="text-blue-600" size={18} />
            <div className="text-xs text-blue-900 font-bold">2026.04.27 주문 마감 (28일 남음)</div>
          </div>
        </div>
      </div>
    </div>
  );

  const ShareModal = () => {
    const activeProject = projects.find(p => p.id === activeProjectId);
    if (!activeProject) return null;

    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
        <div className="bg-white w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
          <div className="p-10 text-center">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-black tracking-tighter italic uppercase text-left leading-tight">
                {activeProject.isSharing ? 'Manage Sharing' : 'Start Sharing'}
              </h3>
              <button onClick={() => setShowShareModal(false)} className="hover:rotate-90 transition-transform"><X size={24}/></button>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-200 mb-8 transition-all hover:border-blue-200">
              {activeProject.isSharing ? (
                <>
                  <p className="text-[10px] text-blue-500 font-black mb-2 uppercase tracking-widest underline decoration-2 decoration-blue-200">ohprint.me/g/RUN_CREW_2026</p>
                  <div className="flex gap-2 justify-center mt-4">
                    <button 
                      onClick={() => { alert('링크가 복사되었습니다.'); }}
                      className="px-6 py-2 bg-blue-600 text-white rounded-full text-xs font-black shadow-md active:scale-95 transition-all"
                    >
                      링크 주소 복사
                    </button>
                    <button 
                      onClick={() => toggleShare(activeProjectId, false)}
                      className="px-6 py-2 bg-red-50 text-red-600 border border-red-200 rounded-full text-xs font-black shadow-sm active:scale-95 transition-all hover:bg-red-100"
                    >
                      공유 중지
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-xs text-gray-400 mb-4 font-medium leading-relaxed">그룹 주문 링크를 생성하여<br/>참여자들에게 공유하세요.</p>
                  <button 
                    onClick={() => toggleShare(activeProjectId, true)}
                    className="px-10 py-3 bg-black text-white rounded-full text-xs font-black shadow-xl active:scale-95 transition-all"
                  >
                    공유 링크 생성하기
                  </button>
                </>
              )}
            </div>

            <div className={`grid grid-cols-2 gap-4 transition-all ${!activeProject.isSharing ? 'opacity-30 pointer-events-none grayscale' : ''}`}>
              <button className="flex flex-col items-center gap-2 p-4 border rounded-2xl hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 bg-[#FEE500] rounded-xl flex items-center justify-center font-bold text-sm shadow-sm">Talk</div>
                <span className="text-[10px] font-bold">카톡 공유</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 border rounded-2xl hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center shadow-sm"><ExternalLink size={20}/></div>
                <span className="text-[10px] font-bold">URL 복사</span>
              </button>
            </div>

            {activeProject.isSharing && (
              <p className="mt-6 text-[10px] text-gray-400">
                * 링크 만료일: 2026.04.27 (30일간 유효)
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen bg-[#FDFDFD] font-sans text-black antialiased ${device === 'mobile' ? 'flex items-center justify-center py-10' : ''}`}>
      <div className={`${device === 'mobile' ? 'w-[375px] h-[780px] border-[14px] border-[#1A1A1A] rounded-[60px] overflow-hidden shadow-2xl relative bg-white' : 'w-full min-h-screen'}`}>
        {device === 'mobile' && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-8 bg-[#1A1A1A] rounded-b-3xl z-[60] flex items-center justify-center"><div className="w-10 h-1 bg-[#2D2D2D] rounded-full" /></div>}
        <Nav />
        <div className={`${device === 'mobile' ? 'h-[calc(100%-56px)] overflow-y-auto scroll-smooth' : ''}`}>
          {role === 'leader' ? <LeaderCart /> : step === 'landing' ? <MemberLanding /> : <div className="p-10 text-center"><h2 className="text-xl font-bold">페이지 준비 중입니다.</h2><button onClick={() => setStep('landing')} className="mt-4 text-blue-600 underline">돌아가기</button></div>}
        </div>
      </div>
      {showShareModal && <ShareModal />}
      {loading && <LoadingOverlay />}
    </div>
  );
};

export default App;

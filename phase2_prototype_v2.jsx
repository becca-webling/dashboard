import { useState, useEffect } from "react";

const C = {
  bg: "#f5f4f2", white: "#ffffff", text: "#1a1a1a", sub: "#888888", border: "#e8e8e8",
  orange: "#ff5c35", orangeLight: "#fff5f2",
  purple: "#5b4fcf", purpleLight: "#f3f0ff",
  green: "#27ae60", greenLight: "#eafaf1",
  blue: "#2980b9", blueLight: "#e8f4fd",
  amber: "#d68910", amberLight: "#fffbf0",
  red: "#e74c3c", redLight: "#fef5f5",
};

/* ── Shared Components ── */
const Phone = ({ children }) => (
  <div style={{ width: 390, height: 844, background: C.white, borderRadius: 44, boxShadow: "0 20px 60px rgba(0,0,0,0.13), 0 0 0 1px rgba(0,0,0,0.05)", overflow: "hidden", position: "relative", flexShrink: 0 }}>
    <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 126, height: 34, background: "#000", borderRadius: "0 0 20px 20px", zIndex: 100 }} />
    <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", width: 134, height: 5, background: "#1a1a1a", borderRadius: 3, zIndex: 100 }} />
    <div style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative", display: "flex", flexDirection: "column" }}>{children}</div>
  </div>
);

const StatusBar = () => (
  <div style={{ height: 54, flexShrink: 0, background: C.white, display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 28px 8px" }}>
    <span style={{ fontSize: 15, fontWeight: 700 }}>9:41</span>
    <span style={{ fontSize: 11 }}>📶 📡 🔋</span>
  </div>
);

const NavHeader = ({ title, onBack, right }) => (
  <div style={{ height: 48, background: C.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: C.text, borderBottom: "1px solid " + C.border, position: "relative", flexShrink: 0 }}>
    {onBack && <span onClick={onBack} style={{ position: "absolute", left: 16, fontSize: 22, cursor: "pointer", color: C.text }}>‹</span>}
    {title}
    {right && <span style={{ position: "absolute", right: 16, fontSize: 12, color: C.sub }}>{right}</span>}
  </div>
);

const BtnFull = ({ label, onClick, variant = "primary", style: sx, disabled }) => {
  const s = { primary: { background: disabled ? "#ddd" : C.orange, color: disabled ? "#999" : "#fff" }, ghost: { background: "transparent", color: C.red, fontSize: 13 }, secondary: { background: C.bg, color: C.text, border: "1px solid " + C.border } };
  return <button onClick={disabled ? undefined : onClick} style={{ width: "100%", padding: 14, borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: disabled ? "default" : "pointer", fontFamily: "inherit", textAlign: "center", border: "none", ...s[variant], ...sx }}>{label}</button>;
};

const Toast = ({ message, show }) => (
  <div style={{ position: "absolute", bottom: 100, left: "50%", transform: "translateX(-50%)", background: "#333", color: "#fff", padding: "10px 20px", borderRadius: 10, fontSize: 13, fontWeight: 500, zIndex: 9999, opacity: show ? 1 : 0, transition: "opacity 0.3s", pointerEvents: "none", whiteSpace: "nowrap" }}>{message}</div>
);

const Badge = ({ children, color = C.orange }) => (
  <span style={{ display: "inline-block", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: color, color: "#fff" }}>{children}</span>
);

/* ═══════════════════════════════════════════════ */
/* A. 해지 플로우 — 기능1 할인오퍼 + 기능3 알림톡   */
/* ═══════════════════════════════════════════════ */
function DemoCancelFlow({ toast }) {
  const [step, setStep] = useState(0);
  const [reason, setReason] = useState(null);
  const reasons = ["사용 빈도가 낮아요", "가격이 부담돼요", "포토북 퀄리티가 아쉬워요", "다른 서비스를 이용하려고요", "일시적으로 쉬고 싶어요", "기타"];

  if (step === 0) return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <StatusBar />
      <NavHeader title="구독 해지" />
      <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
        <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>해지 사유를 알려주세요</div>
        <div style={{ fontSize: 13, color: C.sub, marginBottom: 20 }}>더 나은 서비스를 위해 의견을 참고할게요.</div>
        {reasons.map((r, i) => (
          <div key={i} onClick={() => setReason(i)} style={{ background: reason === i ? C.orangeLight : C.white, border: "1.5px solid " + (reason === i ? C.orange : C.border), borderRadius: 10, padding: "12px 14px", fontSize: 13, cursor: "pointer", marginBottom: 8 }}>
            {reason === i && <span style={{ color: C.orange, fontWeight: 700 }}>✓ </span>}{r}
          </div>
        ))}
      </div>
      <div style={{ padding: "12px 20px 30px" }}>
        <BtnFull label="다음" onClick={() => setStep(1)} disabled={reason === null} />
      </div>
    </div>
  );

  if (step === 1) return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <StatusBar />
      <NavHeader title="구독 해지" onBack={() => setStep(0)} />
      <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📖</div>
          <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>벌써 이만큼 쌓였어요</div>
          <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.6 }}>지금까지의 소중한 기록들이에요</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
          {[{ n: "3권", l: "포토북" }, { n: "90장", l: "사진" }, { n: "5회", l: "공유" }].map((s, i) => (
            <div key={i} style={{ background: C.purpleLight, borderRadius: 12, padding: 16, textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: C.purple }}>{s.n}</div>
              <div style={{ fontSize: 11, color: C.sub, marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ background: C.amberLight, borderRadius: 10, padding: 14, fontSize: 12, color: "#8a6d20", lineHeight: 1.6 }}>
          해지 시 월 자동 생성이 중단되고, 실물 배송·공유 발송이 멈춰요. 기존 포토북은 계속 열람할 수 있어요.
        </div>
      </div>
      <div style={{ padding: "12px 20px 30px" }}>
        <BtnFull label="계속 구독하기" onClick={() => { toast("구독을 계속합니다!"); setStep(0); setReason(null); }} style={{ marginBottom: 8 }} />
        <BtnFull label="그래도 해지할게요" variant="ghost" onClick={() => setStep(2)} />
      </div>
    </div>
  );

  // Step 2: 할인 오퍼 (NEW - 기능 1)
  if (step === 2) return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <StatusBar />
      <NavHeader title="구독 해지" onBack={() => setStep(1)} />
      <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎁</div>
          <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>특별 할인을 준비했어요</div>
          <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.6 }}>다음 1회 결제에만 적용되는<br />특별 할인이에요</div>
        </div>
        <div style={{ background: "linear-gradient(135deg, #ff5c35 0%, #ff8c6b 100%)", borderRadius: 16, padding: 24, color: "#fff", marginBottom: 16 }}>
          <div style={{ fontSize: 11, opacity: 0.8, marginBottom: 8 }}>베이직 플랜 · 다음 1회 한정</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 14, textDecoration: "line-through", opacity: 0.6 }}>5,900원</span>
            <span style={{ fontSize: 32, fontWeight: 800 }}>3,900원</span>
          </div>
          <div style={{ fontSize: 12, opacity: 0.85, marginTop: 8 }}>2,000원 할인 · 다음 결제일에 적용</div>
          <div style={{ height: 1, background: "rgba(255,255,255,0.2)", margin: "16px 0" }} />
          <div style={{ fontSize: 11, opacity: 0.7, lineHeight: 1.6 }}>
            · 다음 1회 결제에만 적용됩니다<br />
            · 이후 정상가(5,900원)로 복귀합니다<br />
            · 계정당 1회만 제공됩니다
          </div>
        </div>
      </div>
      <div style={{ padding: "12px 20px 30px" }}>
        <BtnFull label="할인 받고 계속 구독하기" onClick={() => { toast("할인이 적용되었습니다! 🎉"); setStep(0); setReason(null); }} style={{ marginBottom: 8 }} />
        <BtnFull label="괜찮아요, 다음에요" variant="ghost" onClick={() => setStep(3)} />
      </div>
    </div>
  );

  // Step 3: 일시정지 제안
  if (step === 3) return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <StatusBar />
      <NavHeader title="구독 해지" onBack={() => setStep(2)} />
      <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>⏸️</div>
          <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>잠깐, 일시정지는 어떠세요?</div>
          <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.6 }}>해지 대신 잠시 쉬어가세요.<br />기간이 끝나면 자동으로 다시 시작돼요.</div>
        </div>
        {["1개월", "2개월", "3개월 (최대)"].map((p, i) => (
          <div key={i} style={{ background: C.white, border: "1.5px solid " + C.border, borderRadius: 10, padding: "12px 14px", fontSize: 13, cursor: "pointer", marginBottom: 8 }}>{p}</div>
        ))}
        <div style={{ background: C.blueLight, borderRadius: 10, padding: 14, marginTop: 8, fontSize: 11, color: "#555", lineHeight: 1.6 }}>
          · 기간 중 결제 없음 · 디지털 포토북은 계속 생성<br />· 수동 즉시 재개 가능 · 최대 3개월, 연 2회
        </div>
      </div>
      <div style={{ padding: "12px 20px 30px" }}>
        <BtnFull label="일시정지하기" onClick={() => { toast("구독이 일시정지되었습니다"); setStep(0); setReason(null); }} style={{ marginBottom: 8 }} />
        <BtnFull label="그래도 해지할게요" variant="ghost" onClick={() => setStep(4)} />
      </div>
    </div>
  );

  // Step 4: 최종 해지 + 알림톡 안내 (기능 3)
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <StatusBar />
      <NavHeader title="구독 해지" onBack={() => setStep(3)} />
      <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
        <div style={{ textAlign: "center", padding: "20px 0 24px" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>👋</div>
          <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>정말 해지하시겠어요?</div>
        </div>
        <div style={{ background: C.redLight, borderRadius: 12, padding: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.red, marginBottom: 8 }}>해지 시 변경사항</div>
          <div style={{ fontSize: 12, color: "#555", lineHeight: 1.8 }}>
            · 월 자동 포토북 생성 중단<br />
            · 실물 배송 중단<br />
            · 공유 자동 발송 중단<br />
            · 기존 포토북 열람은 유지
          </div>
        </div>
        <div style={{ background: C.bg, borderRadius: 12, padding: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>해지 적용 안내</div>
          <div style={{ fontSize: 12, color: C.sub, lineHeight: 1.8 }}>
            현 결제 주기가 끝나는 <strong style={{ color: C.text }}>2026년 7월 1일</strong>까지 이용 가능해요.
          </div>
        </div>
        <div style={{ background: C.blueLight, borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.blue, marginBottom: 6 }}>📩 알림톡 안내</div>
          <div style={{ fontSize: 11, color: "#555", lineHeight: 1.6 }}>해지 신청 완료 시 카카오 알림톡으로 안내를 보내드려요.</div>
        </div>
      </div>
      <div style={{ padding: "12px 20px 30px" }}>
        <BtnFull label="해지 신청하기" onClick={() => { toast("해지 신청이 완료되었습니다. 알림톡을 확인해주세요."); setStep(0); setReason(null); }} style={{ background: C.red }} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════ */
/* B. 구독관리 히어로 슬라이드 — 기능2              */
/* ═══════════════════════════════════════════════ */
function DemoHeroSlide({ toast }) {
  const [card, setCard] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <StatusBar />
      <NavHeader title="구독관리" />
      <div style={{ flex: 1, overflowY: "auto", background: C.bg }}>
        {/* Hero Slide */}
        <div style={{ padding: "16px 20px 0", position: "relative" }}>
          <div style={{ overflow: "hidden", borderRadius: 16 }}>
            <div style={{ display: "flex", transition: "transform 0.3s", transform: `translateX(-${card * 100}%)` }}>
              {/* Card 1: Current Plan */}
              <div style={{ minWidth: "100%", background: C.white, borderRadius: 16, border: "1px solid " + C.border, padding: 20 }}>
                <Badge color={C.green}>현재 구독</Badge>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 12 }}>
                  <div style={{ fontSize: 22, fontWeight: 800 }}>베이직</div>
                  <div><span style={{ fontSize: 20, fontWeight: 800, color: C.orange }}>5,900원</span><span style={{ fontSize: 13, color: C.sub }}> / 월</span></div>
                </div>
                <div style={{ fontSize: 13, color: C.sub, marginTop: 6 }}>매월 디지털+미니 포토북 1권 자동 배송</div>
                <div style={{ height: 1, background: C.border, margin: "14px 0" }} />
                <div style={{ fontSize: 12, color: C.sub }}>다음 결제일: 2026.07.01</div>
                <div style={{ fontSize: 12, color: C.sub, marginTop: 4 }}>신한카드 ****1234</div>
              </div>
              {/* Card 2: Pending Change */}
              {!cancelled && (
                <div style={{ minWidth: "100%", background: C.white, borderRadius: 16, border: "1px solid " + C.amber, padding: 20 }}>
                  <Badge color={C.amber}>변경 예정</Badge>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 12 }}>
                    <div style={{ fontSize: 22, fontWeight: 800 }}>시즌</div>
                    <div><span style={{ fontSize: 20, fontWeight: 800, color: C.orange }}>7,900원</span><span style={{ fontSize: 13, color: C.sub }}> / 3개월</span></div>
                  </div>
                  <div style={{ fontSize: 13, color: C.sub, marginTop: 6 }}>매월 디지털 + 결제월마다 실물 1권</div>
                  <div style={{ height: 1, background: C.border, margin: "14px 0" }} />
                  <div style={{ fontSize: 12, color: C.sub }}>적용일: 2026.07.01부터</div>
                  <div style={{ fontSize: 12, color: C.sub, marginTop: 4 }}>다음 결제일: 2026.07.01</div>
                  <button onClick={() => setShowModal(true)} style={{ width: "100%", marginTop: 14, padding: 12, borderRadius: 10, border: "1.5px solid " + C.amber, background: C.amberLight, color: C.amber, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>변경 취소</button>
                </div>
              )}
            </div>
          </div>
          {/* Indicator */}
          {!cancelled && (
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 12 }}>
              {[0, 1].map(i => (
                <div key={i} onClick={() => setCard(i)} style={{ width: i === card ? 16 : 6, height: 6, borderRadius: 3, background: i === card ? C.orange : "#ccc", cursor: "pointer", transition: "all 0.3s" }} />
              ))}
            </div>
          )}
        </div>
        {/* Settings */}
        <div style={{ padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>포토북 설정</div>
          {[{ icon: "🎨", t: "테마 선택", s: "아기" }, { icon: "👨‍👩‍👧", t: "공유 대상 관리", s: "2명 등록" }, { icon: "📅", t: "포토북 시작일자", s: "매월 1일" }, { icon: "📕", t: "포토북 커버 디자인", s: "디자인 변경" }, { icon: "🔔", t: "알림 설정", s: "포토북 생성 · 리마인더" }].map((m, i) => (
            <div key={i} style={{ background: C.white, borderRadius: 12, border: "1px solid " + C.border, padding: "14px 16px", marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 20 }}>{m.icon}</span>
                <div><div style={{ fontSize: 14, fontWeight: 600 }}>{m.t}</div><div style={{ fontSize: 11, color: C.sub, marginTop: 2 }}>{m.s}</div></div>
              </div>
              <span style={{ color: "#ccc" }}>›</span>
            </div>
          ))}
        </div>
      </div>
      {/* Cancel Modal */}
      {showModal && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 30 }}>
          <div style={{ background: C.white, borderRadius: 20, padding: 24, width: "100%" }}>
            <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 8, textAlign: "center" }}>요금제 변경을 취소할까요?</div>
            <div style={{ fontSize: 13, color: C.sub, textAlign: "center", marginBottom: 20, lineHeight: 1.6 }}>현재 요금제(베이직)가 유지됩니다.</div>
            <BtnFull label="변경 취소" onClick={() => { setShowModal(false); setCancelled(true); setCard(0); toast("요금제 변경이 취소되었습니다"); }} style={{ marginBottom: 8 }} />
            <BtnFull label="닫기" variant="ghost" onClick={() => setShowModal(false)} style={{ color: C.sub }} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════ */
/* C. 구독 홈 — 기능4 비결제월 배너 + 기능5 설문    */
/* ═══════════════════════════════════════════════ */
function DemoSubHome({ toast }) {
  const [bannerVisible, setBannerVisible] = useState(true);
  const [surveyVisible, setSurveyVisible] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <StatusBar />
      <NavHeader title="구독 홈" />
      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* 기능4: 비결제월 배너 */}
        {bannerVisible && (
          <div style={{ margin: "12px 20px 0", background: "#f0f0ee", borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 16 }}>ℹ️</span>
              <div style={{ fontSize: 12, color: "#555", lineHeight: 1.5 }}>이번 달은 결제되지 않으며,<br />실물 포토북이 제작되지 않습니다.</div>
            </div>
            <span onClick={() => { setBannerVisible(false); setTimeout(() => setSurveyVisible(true), 500); }} style={{ fontSize: 16, color: C.sub, cursor: "pointer", padding: 4 }}>✕</span>
          </div>
        )}
        {/* Hero */}
        <div style={{ background: "linear-gradient(135deg, #5b4fcf 0%, #7b68ae 100%)", margin: "12px 20px 0", borderRadius: 16, padding: "24px 20px", color: "#fff" }}>
          <div style={{ display: "inline-block", background: "rgba(255,255,255,0.2)", borderRadius: 20, padding: "3px 12px", fontSize: 10, fontWeight: 700, marginBottom: 10 }}>시즌 플랜 구독 중</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div style={{ fontSize: 22, fontWeight: 800 }}>스냅스 구독</div>
            <div style={{ fontSize: 14, opacity: 0.8 }}>7,900원 / 3개월</div>
          </div>
          <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>이번 달은 디지털만 이용 가능</div>
          <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: "14px 16px", marginTop: 14, display: "flex", justifyContent: "space-between" }}>
            <div><div style={{ fontSize: 12, opacity: 0.85 }}>다음 포토북 생성일</div><div style={{ fontSize: 11, opacity: 0.7, marginTop: 2 }}>2026년 7월 1일</div></div>
            <div style={{ textAlign: "right" }}><div style={{ fontSize: 18, fontWeight: 800 }}>D-9</div><div style={{ fontSize: 11, opacity: 0.7 }}>자동 생성</div></div>
          </div>
        </div>
        {/* Quick Menu */}
        <div style={{ padding: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>빠른 메뉴</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[{ icon: "📚", l: "포토북 보기", s: "3권 발행" }, { icon: "💎", l: "요금제 변경", s: "시즌" }, { icon: "👨‍👩‍👧", l: "공유 대상자", s: "2명" }, { icon: "📦", l: "배송 현황", s: "완료 1건" }].map((q, i) => (
              <div key={i} style={{ background: C.white, borderRadius: 12, padding: 14, border: "1px solid " + C.border, textAlign: "center" }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{q.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{q.l}</div>
                <div style={{ fontSize: 10, color: C.sub, marginTop: 2 }}>{q.s}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Recent Book */}
        <div style={{ padding: "0 20px 20px" }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>최근 포토북</div>
          <div style={{ background: C.white, borderRadius: 12, border: "1px solid " + C.border, overflow: "hidden" }}>
            <div style={{ height: 120, background: "linear-gradient(135deg, #2c3e50, #4a6741)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontSize: 40 }}>📖</div>
            </div>
            <div style={{ padding: "12px 14px" }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>봄이 오는 날</div>
              <div style={{ fontSize: 11, color: C.sub, marginTop: 3 }}>30페이지 · 6월 1일 발행</div>
            </div>
          </div>
        </div>
      </div>
      {/* 기능5: 설문 팝업 */}
      {surveyVisible && (
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "flex-end" }}>
          <div style={{ background: C.white, borderRadius: "20px 20px 0 0", width: "100%", padding: 24 }}>
            <div style={{ width: 40, height: 4, background: "#ddd", borderRadius: 2, margin: "0 auto 20px" }} />
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
              <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>AI 사진 분석,<br />어떠셨나요?</div>
              <div style={{ fontSize: 13, color: C.sub, lineHeight: 1.6 }}>1분 설문에 참여하시면<br />실물 포토북 할인쿠폰을 드려요!</div>
            </div>
            <div style={{ background: C.orangeLight, borderRadius: 10, padding: 14, marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 20 }}>🎁</span>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.orange }}>참여 완료 시 실물 구매 할인쿠폰 증정</div>
            </div>
            <BtnFull label="설문 참여하기" onClick={() => { setSurveyVisible(false); toast("구글 폼으로 이동합니다"); }} style={{ marginBottom: 8 }} />
            <BtnFull label="다음에 할게요" variant="ghost" onClick={() => setSurveyVisible(false)} style={{ color: C.sub }} />
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════ */
/* D. 포토북 생성 — 기능6 코치마크 + 기능7 직접선택  */
/* ═══════════════════════════════════════════════ */
function DemoPhotoCreate({ toast }) {
  const [screen, setScreen] = useState("mode"); // mode | gallery | preview
  const [selected, setSelected] = useState([]);
  const [coachmark, setCoachmark] = useState(true);

  // 모드 선택 (기능 7)
  if (screen === "mode") return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <StatusBar />
      <NavHeader title="포토북 생성" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📸</div>
        <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>사진을 어떻게 고를까요?</div>
        <div style={{ fontSize: 13, color: C.sub, marginBottom: 28, textAlign: "center", lineHeight: 1.6 }}>AI 추천 또는 직접 선택 중<br />원하는 방식을 골라주세요</div>
        <div style={{ display: "flex", gap: 12, width: "100%" }}>
          <div onClick={() => toast("AI 자동 탐색을 시작합니다")} style={{ flex: 1, background: C.purpleLight, border: "2px solid " + C.purple, borderRadius: 16, padding: 20, textAlign: "center", cursor: "pointer" }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>🤖</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.purple }}>AI가 골라줄게요</div>
            <div style={{ fontSize: 11, color: C.sub, marginTop: 6, lineHeight: 1.5 }}>갤러리에서 베스트 31장을<br />자동으로 골라드려요</div>
          </div>
          <div onClick={() => setScreen("gallery")} style={{ flex: 1, background: C.orangeLight, border: "2px solid " + C.orange, borderRadius: 16, padding: 20, textAlign: "center", cursor: "pointer" }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>✋</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.orange }}>내가 직접 고를게요</div>
            <div style={{ fontSize: 11, color: C.sub, marginTop: 6, lineHeight: 1.5 }}>원하는 사진 31장을<br />직접 선택해요</div>
          </div>
        </div>
      </div>
    </div>
  );

  // 갤러리 멀티셀렉트 (기능 7)
  if (screen === "gallery") {
    const photos = Array.from({ length: 48 }, (_, i) => i);
    const colors = ["#e8d5b7","#b5c9a8","#a8b5c9","#c9a8b5","#d4c5a0","#a0c5d4","#c5a0d4","#d4a0a0","#a0d4c0","#c0a0d4","#d4d0a0","#a0a8d4"];
    const count = selected.length;
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <StatusBar />
        <NavHeader title="사진 선택" onBack={() => { setScreen("mode"); setSelected([]); }} />
        <div style={{ padding: "10px 20px", background: C.white, borderBottom: "1px solid " + C.border, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}><span style={{ color: count === 31 ? C.green : C.orange }}>{count}</span> / 31장</div>
          {count === 31 && <Badge color={C.green}>선택 완료!</Badge>}
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 4 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 2 }}>
            {photos.map(i => {
              const sel = selected.includes(i);
              const locked = count >= 31 && !sel;
              return (
                <div key={i} onClick={() => {
                  if (sel) setSelected(selected.filter(s => s !== i));
                  else if (count < 31) setSelected([...selected, i]);
                  else toast("31장까지만 선택할 수 있어요");
                }} style={{ aspectRatio: "1/1", background: colors[i % colors.length], position: "relative", cursor: locked ? "default" : "pointer", opacity: locked ? 0.4 : 1 }}>
                  {sel && (
                    <div style={{ position: "absolute", top: 4, right: 4, width: 22, height: 22, borderRadius: "50%", background: C.orange, color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {selected.indexOf(i) + 1}
                    </div>
                  )}
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, opacity: 0.3 }}>🖼️</div>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ padding: "12px 20px 30px", borderTop: "1px solid " + C.border, background: C.white }}>
          <BtnFull label={count === 31 ? "다음" : `31장을 모두 선택해 주세요 (${31 - count}장 남음)`} onClick={() => { if (count === 31) setScreen("preview"); }} disabled={count !== 31} />
        </div>
      </div>
    );
  }

  // 미리보기 + 코치마크 (기능 6)
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative" }}>
      <StatusBar />
      <NavHeader title="포토북 미리보기" onBack={() => setScreen("gallery")} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 20, background: C.bg }}>
        <div style={{ width: 200, height: 280, background: "linear-gradient(135deg, #2c3e50, #4a6741)", borderRadius: 10, boxShadow: "0 8px 30px rgba(0,0,0,0.15)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff" }}>
          <div style={{ fontSize: 10, opacity: 0.5 }}>2026</div>
          <div style={{ fontSize: 16, fontWeight: 800, marginTop: 4 }}>여름의 시작</div>
          <div style={{ fontSize: 10, opacity: 0.5, marginTop: 4 }}>6월</div>
        </div>
        <div style={{ marginTop: 16, fontSize: 12, color: C.sub }}>31장 · AI 순서 배치 완료</div>
      </div>
      <div style={{ padding: "0 20px 30px", display: "flex", gap: 10, flexShrink: 0 }}>
        <button id="btn-edit" style={{ flex: 1, padding: 14, borderRadius: 12, border: "1.5px solid " + C.border, background: C.white, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>✏️ 편집하기</button>
        <button id="btn-fullscreen" style={{ flex: 1, padding: 14, borderRadius: 12, border: "1.5px solid " + C.border, background: C.white, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>📖 전체화면</button>
        <button id="btn-complete" onClick={() => toast("원본 업로드를 시작합니다")} style={{ flex: 1, padding: 14, borderRadius: 12, border: "none", background: C.orange, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>✅ 완성하기</button>
      </div>

      {/* 기능 6: 코치마크 */}
      {coachmark && (
        <div onClick={() => setCoachmark(false)} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 300, display: "flex", flexDirection: "column", justifyContent: "flex-end", cursor: "pointer" }}>
          <div style={{ padding: "0 20px 100px" }}>
            <div style={{ background: C.white, borderRadius: 16, padding: 20, marginBottom: 12 }}>
              <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 14, color: C.text }}>포토북을 완성해볼까요?</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>✏️</span>
                  <div><div style={{ fontSize: 13, fontWeight: 700 }}>편집하기</div><div style={{ fontSize: 12, color: C.sub, marginTop: 2 }}>베스트컷을 변경할 수 있어요.</div></div>
                </div>
                <div style={{ height: 1, background: C.border }} />
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>📖</span>
                  <div><div style={{ fontSize: 13, fontWeight: 700 }}>전체화면 보기</div><div style={{ fontSize: 12, color: C.sub, marginTop: 2 }}>가로로 포토북을 넘겨볼 수 있어요.</div></div>
                </div>
                <div style={{ height: 1, background: C.border }} />
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>✅</span>
                  <div><div style={{ fontSize: 13, fontWeight: 700 }}>완성하기</div><div style={{ fontSize: 12, color: C.sub, marginTop: 2 }}>원본 사진을 업로드해요. 완성 시, 더 이상 포토북을 편집할 수 없어요.</div></div>
                </div>
              </div>
            </div>
            <div style={{ textAlign: "center", color: "rgba(255,255,255,0.7)", fontSize: 12 }}>화면을 탭하면 닫힙니다</div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════ */
/* E. 포토북 뷰어 — 기능8 화살표 상시 노출          */
/* ═══════════════════════════════════════════════ */
function DemoViewer({ toast }) {
  const [pg, setPg] = useState(0);
  const colors = ["#2c3e50", "#5bb8a9", "#7a9bb5", "#3d5a80", "#6b7fb5", "#7b68ae", "#9b72b0", "#c08dbd", "#b87fa8", "#a85a7a", "#d4737a", "#c95858", "#d4a853", "#a8a04a", "#8fa04a", "#4aab62", "#55b87a", "#4ac9a0", "#5bb8a9", "#7a9bb5", "#3d5a80", "#6b7fb5", "#7b68ae", "#9b72b0", "#c08dbd", "#b87fa8", "#a85a7a", "#d4737a", "#c95858", "#d4a853", "#a8a04a"];
  const total = 31;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#1a1a1a" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", flexShrink: 0 }}>
        <span style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>← 닫기</span>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>6월 포토북</div>
        <div style={{ fontSize: 13, color: "#aaa" }}>{pg === 0 ? "표지" : pg + "/" + (total - 1) + "p"}</div>
      </div>

      {/* Book Area + Always-visible Arrows (기능 8) */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        {/* Left Arrow — 상시 노출 */}
        {pg > 0 && (
          <button onClick={() => setPg(Math.max(0, pg - 1))} style={{ position: "absolute", left: 12, width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>‹</button>
        )}
        {/* Book */}
        <div style={{ width: 220, height: 310, borderRadius: 10, background: colors[pg], boxShadow: "0 8px 40px rgba(0,0,0,0.5)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transition: "background 0.3s" }}>
          {pg === 0 ? (
            <>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>2026</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginTop: 4 }}>여름의 시작</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>6월</div>
              <div style={{ width: 40, height: 1, background: "rgba(255,255,255,0.2)", margin: "12px 0" }} />
              <div style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", letterSpacing: 2 }}>SNAPS PHOTOBOOK</div>
            </>
          ) : (
            <div style={{ width: "80%", height: "80%", background: "rgba(255,255,255,0.12)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 32, opacity: 0.3 }}>🖼️</span>
            </div>
          )}
        </div>
        {/* Right Arrow — 상시 노출 */}
        {pg < total - 1 && (
          <button onClick={() => setPg(Math.min(total - 1, pg + 1))} style={{ position: "absolute", right: 12, width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", fontSize: 20, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>›</button>
        )}
      </div>

      {/* Progress */}
      <div style={{ padding: "0 16px 8px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ flex: 1, height: 3, background: "#333", borderRadius: 2, position: "relative" }}>
          <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: ((pg + 1) / total * 100) + "%", background: C.orange, borderRadius: 2, transition: "width 0.3s" }} />
        </div>
        <div style={{ fontSize: 11, color: "#888", whiteSpace: "nowrap" }}>{pg + 1} / {total}</div>
      </div>

      {/* Thumbnails */}
      <div style={{ padding: "8px 12px 12px", overflowX: "auto", display: "flex", gap: 4, flexShrink: 0 }}>
        {colors.map((c, i) => (
          <div key={i} onClick={() => setPg(i)} style={{ width: 28, height: 28, borderRadius: 4, flexShrink: 0, cursor: "pointer", background: c, border: pg === i ? "2px solid " + C.orange : "2px solid transparent" }} />
        ))}
      </div>

      {/* Bottom */}
      <div style={{ padding: "12px 16px 30px", display: "flex", gap: 10, flexShrink: 0 }}>
        <button style={{ flex: 1, padding: 14, background: "#FEE500", color: "#191919", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>💬 공유하기</button>
        <button style={{ flex: 1, padding: 14, background: C.orange, color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>📦 실물 주문</button>
      </div>

      {/* Annotation */}
      <div style={{ position: "absolute", top: 70, right: 16, background: C.green, color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>
        ✅ 화살표 상시 노출
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════ */
/* Main App                                       */
/* ═══════════════════════════════════════════════ */
export default function App() {
  const [demo, setDemo] = useState("home");
  const [toastMsg, setToastMsg] = useState("");
  const [toastShow, setToastShow] = useState(false);
  const toast = (m) => { setToastMsg(m); setToastShow(true); setTimeout(() => setToastShow(false), 2000); };

  const demos = [
    { id: "cancel", label: "A. 해지 플로우", sub: "기능1 할인오퍼 + 기능3 알림톡", icon: "🛡️" },
    { id: "hero", label: "B. 구독관리 히어로", sub: "기능2 변경예정 카드", icon: "📋" },
    { id: "home", label: "C. 구독 홈", sub: "기능4 비결제월 + 기능5 설문", icon: "🏠" },
    { id: "create", label: "D. 포토북 생성", sub: "기능6 코치마크 + 기능7 직접선택", icon: "📸" },
    { id: "viewer", label: "E. 포토북 뷰어", sub: "기능8 화살표 상시노출", icon: "📖" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f8f8f6", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      {/* Top Nav */}
      <div style={{ padding: "20px 20px 0", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 6, fontSize: 12, color: C.sub, fontWeight: 600, letterSpacing: 1 }}>SNAPS SUBSCRIPTION</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: C.text, marginBottom: 20 }}>포스트런치 개선 v1 — 프로토타입</div>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 16 }}>
          {demos.map(d => (
            <button key={d.id} onClick={() => setDemo(d.id)} style={{
              padding: "10px 16px", borderRadius: 12, border: demo === d.id ? "2px solid " + C.orange : "1.5px solid " + C.border,
              background: demo === d.id ? C.orangeLight : C.white, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap",
              display: "flex", alignItems: "center", gap: 8, flexShrink: 0
            }}>
              <span style={{ fontSize: 18 }}>{d.icon}</span>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: demo === d.id ? C.orange : C.text }}>{d.label}</div>
                <div style={{ fontSize: 10, color: C.sub, marginTop: 1 }}>{d.sub}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Phone */}
      <div style={{ display: "flex", justifyContent: "center", padding: "10px 20px 40px" }}>
        <Phone>
          {demo === "cancel" && <DemoCancelFlow toast={toast} />}
          {demo === "hero" && <DemoHeroSlide toast={toast} />}
          {demo === "home" && <DemoSubHome toast={toast} />}
          {demo === "create" && <DemoPhotoCreate toast={toast} />}
          {demo === "viewer" && <DemoViewer toast={toast} />}
          <Toast message={toastMsg} show={toastShow} />
        </Phone>
      </div>
    </div>
  );
}

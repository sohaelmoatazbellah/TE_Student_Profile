import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { 
  Bell, 
  User, 
  BookOpen, 
  Clock, 
  Lock, 
  X, 
  EyeOff, 
  Eye, 
  ChevronRight, 
  MessageSquare, 
  Calendar, 
  AlertTriangle,
  Mail,
  FileText,
  Hourglass,
  LucideCamera,
  CheckCircle2,
  MessageCircle,
  Send,
  Check
} from 'lucide-react';

const NavItem = ({ icon, label, active = false, onClick }) => (
  <div className={active ? "nav-item-active" : "nav-item"} onClick={onClick} style={{ cursor: 'pointer' }}>
    <div className="nav-item-content">
      <span className={active ? "nav-icon-active" : "nav-icon"}>{icon}</span>
      <span className="nav-text">{label}</span>
    </div>
    <ChevronRight size={18} className={active ? "nav-arrow-active" : "nav-arrow"} />
  </div>
);

const PasswordInput = ({ placeholder, name, value, onChange, showPassword, togglePasswordVisibility }) => (
  <div className="password-input-wrapper">
    <div className="password-input-container">
      <input type={showPassword ? 'text' : 'password'} placeholder={placeholder} name={name} value={value} onChange={onChange} className="password-input" />
      <button type="button" onClick={togglePasswordVisibility} className="password-toggle-btn">
        {showPassword ? <Eye size={20} className="eye-icon-gray" /> : <EyeOff size={20} className="eye-icon-gray" />}
      </button>
    </div>
  </div>
);

const InputField = ({ label, value, isDate = false }) => (
  <div className="input-field-container">
    <label className="input-label">{label}</label>
    <div className="input-wrapper" style={{ position: 'relative' }}>
      <input type="text" defaultValue={value} readOnly className="input-base input-readonly" />
      {isDate && <Calendar className="date-icon" />}
    </div>
  </div>
);

const ChangePasswordModal = ({ onClose }) => {
  const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });
  const [visibility, setVisibility] = useState({ old: false, new: false, confirm: false });
  const [statusMessage, setStatusMessage] = useState(null);
  const [suggestedInfo, setSuggestedInfo] = useState(false);

  const handleUpdate = useCallback(() => {
    if (!passwords.old || !passwords.new || !passwords.confirm) { setStatusMessage({ type: 'error', text: 'Please fill in all fields.' }); setSuggestedInfo(false); return; }
    if (passwords.new !== passwords.confirm) { setStatusMessage({ type: 'error', text: 'New passwords do not match.' }); setSuggestedInfo(false); return; }
    setStatusMessage({ type: 'success', text: 'Password updated successfully!' }); setSuggestedInfo(false);
  }, [passwords]);

  const handleSuggest = () => { const strongPass = 'P@ssw0rd2026!'; setPasswords({ ...passwords, new: strongPass, confirm: strongPass }); setSuggestedInfo(true); setStatusMessage(null); };
  const toggleVisibility = (field) => setVisibility(prev => ({ ...prev, [field]: !prev[field] }));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Change Password</h2>
          {statusMessage?.type !== 'success' && (<button onClick={onClose} className="modal-close-btn"><X className="close-icon" size={24} /></button>)}
        </div>
        {statusMessage?.type === 'success' ? (
          <div className="success-ui-container">
            <p className="success-ui-text">{statusMessage.text}</p>
            <div className="success-ui-actions"><button onClick={onClose} className="btn-ok-success">OK</button></div>
          </div>
        ) : (
          <div className="modal-body">
            {suggestedInfo && <p className="suggested-info-text">A strong password was suggested and filled in.</p>}
            {statusMessage?.type === 'error' && <p className="error-message-text">{statusMessage.text}</p>}
            <div className="password-fields">
              <PasswordInput placeholder="Old Password" value={passwords.old} onChange={(e)=>setPasswords({...passwords, old: e.target.value})} showPassword={visibility.old} togglePasswordVisibility={()=>toggleVisibility('old')} />
              <PasswordInput placeholder="New Password" value={passwords.new} onChange={(e)=>setPasswords({...passwords, new: e.target.value})} showPassword={visibility.new} togglePasswordVisibility={()=>toggleVisibility('new')} />
              <PasswordInput placeholder="Confirm Password" value={passwords.confirm} onChange={(e)=>setPasswords({...passwords, confirm: e.target.value})} showPassword={visibility.confirm} togglePasswordVisibility={()=>toggleVisibility('confirm')} />
            </div>
            <div className="modal-footer-actions">
              <button className="btn-suggest-outlined" onClick={handleSuggest}>Suggest Strong Password</button>
              <button className="btn-update-solid" onClick={handleUpdate}>Update Password</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const studentData = { name: 'Mohamed Ahmed Ali', id: '2024-12345', img: '/src/assets/profile.png' };
  return (
    <main className="main-content">
      <div className="profile-container">
        <div className="profile-title-row">
          <h1 className="profile-title">My Profile</h1>
          <button className="btn-logout">Log Out</button>
        </div>
        <div className="profile-header">
          <img src={studentData.img} alt="Profile" className="profile-img" />
          <div className="profile-info">
            <h2 className="profile-name">{studentData.name}</h2>
            <p className="profile-id">Student ID: {studentData.id}</p>
            <div className="identity-status-container">
              <AlertTriangle className="identity-status-icon" size={18} />
              <span className="identity-status-text">Identity Status: Verified</span>
            </div>
          </div>
        </div>
        <section className="form-section">
          <div className="section-title-line"><div className="section-header"><User size={24} /> Personal Info</div></div>
          <div className="form-grid-3">
            <InputField label="First Name" value="Mohamed" />
            <InputField label="Last Name" value="Ahmed Ali" />
            <InputField label="Date of Birth" value="12/01/2002" isDate />
          </div>
        </section>
        <section className="form-section">
          <div className="section-title-line"><div className="section-header"><BookOpen size={24} /> Academic Details</div></div>
          <div className="form-grid-2">
            <InputField label="University" value="Beni Suef University" />
            <InputField label="Matriculation Date" value="01/09/2020" isDate />
            <InputField label="Major/Program" value="Computer Science" />
            <InputField label="Academic Year" value="4th Year" />
          </div>
        </section>
        <section className="form-section">
          <div className="section-title-line"><div className="section-header"><Mail size={24} /> Contact Info</div></div>
          <div className="form-grid-2">
            <InputField label="Primary Email" value="mohamed.student@university.edu" />
            <InputField label="Secondary Email" value="mohamed.personal@gmail.com" />
            <InputField label="Phone Number" value="+20 123 456 7890" />
            <InputField label="City/Region" value="Beni Suef, Egypt" />
          </div>
        </section>
        <section className="form-section">
          <div className="section-title-line"><div className="section-header"><Lock size={24} /> Security Settings</div></div>
          <div className="security-container">
            <label className="input-label">Change Password</label>
            <button className="btn-change-password" onClick={() => setIsModalOpen(true)}>Update Password</button>
          </div>
        </section>
      </div>
      {isModalOpen && <ChangePasswordModal onClose={() => setIsModalOpen(false)} />}
    </main>
  );
};

// ===================== //
// EXAM INTERFACE
// ===================== //

const ExamInterface = ({ onExamComplete }) => {
  const [verificationStep, setVerificationStep] = useState('initial');
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(4358);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [isSavingChat, setIsSavingChat] = useState(false);
  const [messages, setMessages] = useState([{ id: 1, text: "Doctor is online. Contact them if you need assistance.", sender: 'system' }]);
  const scrollRef = useRef(null);

  const startMedia = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } }, audio: { echoCancellation: true, noiseSuppression: true } });
      setStream(mediaStream); setVerificationStep('camera_active');
    } catch (err) { setError("تعذر الوصول إلى الكاميرا أو الميكروفون. يرجى التأكد من منح الأذونات اللازمة."); }
  };

  useEffect(() => { if (verificationStep === 'camera_active' && stream && videoRef.current) videoRef.current.srcObject = stream; }, [stream, verificationStep]);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, isChatOpen]);
  useEffect(() => {
    if (isSubmitted || verificationStep !== 'exam_started') return;
    const timer = setInterval(() => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, [isSubmitted, verificationStep]);

  const totalQuestions = 30;
  const questionsData = Array.from({ length: totalQuestions }, (_, i) => ({
    id: i + 1,
    text: i === 0 ? "Which of the following is a programming language?" : i === 1 ? "What does CPU stand for?" : `This is the content for question number ${i + 1}. Please select the most appropriate answer from the options below.`,
    options: i === 0 ? ['HTML', 'Python', 'CSS', 'JSON'] : ['Option A', 'Option B', 'Option C', 'Option D'],
    points: 5
  }));

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600); const mins = Math.floor((seconds % 3600) / 60); const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = (e) => {
    e.preventDefault(); if (!chatMessage.trim()) return;
    setIsSavingChat(true);
    setMessages(prev => [...prev, { id: Date.now(), text: chatMessage, sender: 'user' }]);
    setChatMessage(""); setTimeout(() => setIsSavingChat(false), 1200);
    setTimeout(() => setMessages(prev => [...prev, { id: Date.now() + 1, text: "I have received your message. Please focus on your exam and I will assist you shortly.", sender: 'doctor' }]), 2000);
  };

  const finalizeSubmission = () => { setIsSubmitModalOpen(false); setIsSubmitted(true); if (stream) stream.getTracks().forEach(track => track.stop()); };

  const checklistItems = [
    { text: "Ensure good lighting", status: "success" }, { text: "Remove hats", status: "error" },
    { text: "Look directly at the camera", status: "success" }, { text: "Minimize background noise/movement", status: "success" },
  ];

  if (isSubmitted) {
    return (
      <div style={{ height: '100vh', width: '100%', background: '#E7F7EF', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', boxSizing: 'border-box' }}>
        <div style={{ background: '#E7F7EF', border: '2px solid #4ADE80', borderRadius: '40px', width: '100%', maxWidth: '1000px', height: '700px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '48px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ width: '96px', height: '96px', background: '#00BB5C', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px', boxShadow: '0 10px 25px rgba(0,187,92,0.3)' }}>
            <Check color="white" size={56} strokeWidth={4} />
          </div>
          <h1 style={{ color: '#00BB5C', fontSize: '2rem', fontWeight: 'bold', marginBottom: '16px' }}>The exam was successfully submitted.</h1>
          <p style={{ color: '#4A4A4A', fontSize: '1.25rem', fontWeight: '500', marginBottom: '40px' }}>Thank you. Your answers were successfully submitted.</p>
          <button onClick={onExamComplete} style={{ background: '#00BB5C', color: 'white', fontWeight: 'bold', padding: '16px 40px', borderRadius: '12px', fontSize: '1.125rem', border: 'none', cursor: 'pointer' }}>Go to profile</button>
        </div>
      </div>
    );
  }

  if (verificationStep !== 'exam_started') {
    return (
      <div style={{ minHeight: '100vh', background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px', fontFamily: 'sans-serif', color: '#1a1a1a' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px', textAlign: 'center' }}>
          <div style={{ color: '#ff5c5c', marginBottom: '16px' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" /><circle cx="12" cy="13" r="3" />
            </svg>
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '8px' }}>Identity Verification Required</h1>
          <p style={{ color: '#9CA3AF', fontSize: '0.875rem' }}>One-time check before starting: <span style={{ textDecoration: 'underline' }}>Computer Science Final</span></p>
        </div>
        <div style={{ width: '100%', maxWidth: '896px', background: '#f4f7f9', borderRadius: '12px', padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', maxWidth: '500px', border: '2px dashed #1d4d32', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#d1d7dc', overflow: 'hidden' }}>
            {!stream ? <LucideCamera size={80} color="#6b7280" /> : <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
          </div>
          <p style={{ marginTop: '24px', color: '#6B7280', fontSize: '0.875rem' }}>Position your face within the dashed frame</p>
        </div>
        <div style={{ marginTop: '32px', width: '100%', maxWidth: '512px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {verificationStep === 'initial' ? (
            <><h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '16px' }}>Use Camera & Audio</h2>
            <button onClick={startMedia} style={{ width: '100%', maxWidth: '320px', background: '#1d4d32', color: 'white', fontWeight: 'bold', padding: '12px 32px', borderRadius: '9999px', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>Allow</button></>
          ) : (
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', padding: '0 16px' }}>
                {checklistItems.map((item, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <CheckCircle2 size={20} color={item.status === "success" ? "#10b981" : "#ef4444"} />
                    <span style={{ color: '#374151', fontWeight: '500' }}>{item.text}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => setVerificationStep('exam_started')} style={{ width: '100%', background: '#1d4d32', color: 'white', fontWeight: 'bold', padding: '12px 32px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>Verify identity & Start Exam</button>
            </div>
          )}
          {error && <div style={{ marginTop: '16px', padding: '12px', background: '#FEF2F2', color: '#DC2626', fontSize: '0.75rem', borderRadius: '8px', textAlign: 'center' }}>{error}</div>}
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100vh', width: '100%', background: '#EEF2F5', fontFamily: 'sans-serif', color: '#1F2937', padding: '24px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', boxSizing: 'border-box' }}>
      <style>{`.exam-custom-scroll::-webkit-scrollbar{width:4px}.exam-custom-scroll::-webkit-scrollbar-track{background:#E0E0E0}.exam-custom-scroll::-webkit-scrollbar-thumb{background:#1EDA53;border-radius:10px}.exam-mirror{transform:scaleX(-1)}@keyframes exam-chat-pop{from{transform:translateY(15px);opacity:0}to{transform:translateY(0);opacity:1}}@keyframes exam-modal-pop{from{transform:scale(0.9) translateY(20px);opacity:0}to{transform:scale(1) translateY(0);opacity:1}}@keyframes exam-fade-in{from{opacity:0}to{opacity:1}}.exam-animate-chat{animation:exam-chat-pop 0.2s ease-out forwards}.exam-animate-modal-pop{animation:exam-modal-pop 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards}.exam-animate-fade-in{animation:exam-fade-in 0.2s ease-out forwards}`}</style>
      <header style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', background: '#FCFCFC', padding: '20px', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #F3F4F6', flexShrink: 0, boxSizing: 'border-box' }}>
        <div style={{ background: '#383838', borderRadius: '12px', padding: '16px', width: '260px', height: '155px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', borderBottom: '4px solid rgba(0,0,0,0.2)', flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <h2 style={{ color: 'white', fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '4px', textAlign: 'center' }}>Time Remaining:</h2>
          <div style={{ color: '#FF383C', fontSize: '3rem', fontFamily: 'monospace', letterSpacing: '-0.05em', textAlign: 'center', lineHeight: 1 }}>{formatTime(timeLeft)}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, marginLeft: '16px' }}>
          <div style={{ position: 'relative', width: '112px', height: '112px', borderRadius: '12px', border: '4px solid #4ADE80', overflow: 'hidden', background: '#E5E7EB', marginBottom: '4px' }}>
            <video ref={(el) => { if (el && stream) el.srcObject = stream; }} autoPlay playsInline muted className="exam-mirror" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <span style={{ color: '#616161', fontWeight: 'bold', fontSize: '1rem' }}>Monitoring...</span>
        </div>
        <div style={{ flex: 1, textAlign: 'center', padding: '0 16px' }}>
          <p style={{ fontSize: '1.5rem', fontWeight: '900', color: '#1F2937', lineHeight: 1.2, margin: '0 0 4px 0' }}>Subject: Computer Science</p>
          <p style={{ fontSize: '1.25rem', color: '#9CA3AF', fontWeight: '500', margin: 0 }}>Midterm Examination</p>
        </div>
        <div style={{ width: '128px', height: '128px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
          <img src="/src/assets/Logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
        </div>
      </header>
      <main style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', display: 'flex', gap: '24px', flex: 1, overflow: 'hidden', minHeight: 0 }}>
        <aside style={{ width: '256px', flexShrink: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <h3 style={{ fontWeight: '900', fontSize: '1.875rem', color: 'black', margin: '0 0 12px 0' }}>Questions (1-30)</h3>
          <div style={{ background: '#FCFCFC', borderRadius: '16px', padding: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #F3F4F6', flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div className="exam-custom-scroll" style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingRight: '4px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '4px 0' }}>
                {questionsData.map((q, index) => {
                  const isAnswered = answers[index] !== undefined; const isActive = currentQuestionIdx === index;
                  return (
                    <div key={q.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 8px 8px 12px', borderRadius: '12px', cursor: 'pointer', position: 'relative', background: isActive ? 'white' : 'transparent', boxShadow: isActive ? '0 4px 15px rgba(0,0,0,0.08)' : 'none', border: isActive ? '1px solid #F3F4F6' : '1px solid transparent' }} onClick={() => setCurrentQuestionIdx(index)}>
                      <span style={{ fontWeight: '900', fontSize: '1.125rem', color: isActive ? 'black' : '#D1D5DB', flexShrink: 0 }}>Q{q.id}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                        <div style={{ width: '40px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1rem', color: 'white', background: isAnswered ? '#00BB5C' : '#CBCBCB' }}>{q.id}</div>
                        {isActive && <div style={{ width: '8px', height: '24px', background: 'black', borderRadius: '9999px', position: 'absolute', right: '-8px' }} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '12px', background: 'white', padding: '12px', borderRadius: '16px', border: '1px solid #F3F4F6', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', flexShrink: 0 }}>
            <CheckCircle2 size={24} color="#3CCF91" strokeWidth={3} style={{ flexShrink: 0 }} />
            <span style={{ color: '#9CA3AF', fontWeight: 'bold', fontSize: '1.125rem' }}>Auto-Saving...</span>
          </div>
        </aside>
        <section style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ background: '#FCFCFC', borderRadius: '24px', padding: '40px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #F3F4F6', flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid #F9FAFB', paddingBottom: '16px', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#8A8A8A', margin: 0 }}>Question {questionsData[currentQuestionIdx].id}</h2>
                <span style={{ background: 'white', padding: '4px 12px', fontWeight: '900', color: 'black', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '0.9375rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>Multiple Choice</span>
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#6E6E6E' }}>{questionsData[currentQuestionIdx].points} Points</span>
            </div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '40px', color: 'black', lineHeight: 1.3 }}>{questionsData[currentQuestionIdx].text}</h1>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                {questionsData[currentQuestionIdx].options.map((option) => (
                  <label key={option} style={{ display: 'flex', alignItems: 'center', padding: '16px', borderRadius: '16px', border: `2px solid ${answers[currentQuestionIdx] === option ? 'black' : '#F9FAFB'}`, background: answers[currentQuestionIdx] === option ? '#F9FAFB' : 'white', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', transition: 'all 0.15s' }} onClick={() => setAnswers({...answers, [currentQuestionIdx]: option})}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: `2px solid ${answers[currentQuestionIdx] === option ? 'black' : '#D1D5DB'}`, marginRight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {answers[currentQuestionIdx] === option && <div style={{ width: '12px', height: '12px', background: 'black', borderRadius: '50%' }} />}
                    </div>
                    <span style={{ fontSize: '1.125rem', fontWeight: 'bold', color: 'black' }}>{option}</span>
                  </label>
                ))}
              </div>
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', paddingTop: '24px', borderTop: '1px solid #F9FAFB', flexShrink: 0 }}>
              <button onClick={() => setCurrentQuestionIdx(prev => Math.max(0, prev - 1))} disabled={currentQuestionIdx === 0} style={{ padding: '12px 40px', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.125rem', border: 'none', cursor: currentQuestionIdx === 0 ? 'not-allowed' : 'pointer', background: currentQuestionIdx === 0 ? '#C5D3CD' : '#1C5332', color: 'white' }}>Back</button>
              <button onClick={() => currentQuestionIdx === totalQuestions - 1 ? setIsSubmitModalOpen(true) : setCurrentQuestionIdx(prev => Math.min(totalQuestions - 1, prev + 1))} style={{ background: '#1C5332', fontWeight: 'bold', color: 'white', padding: '12px 40px', borderRadius: '12px', fontSize: '1.125rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: 'none', cursor: 'pointer' }}>
                {currentQuestionIdx === totalQuestions - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        </section>
      </main>
      <footer style={{ maxWidth: '1400px', margin: '24px auto 0', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', position: 'relative', flexShrink: 0 }}>
        <div style={{ position: 'relative' }}>
          {isChatOpen && (
            <div className="exam-animate-chat" style={{ position: 'absolute', bottom: 'calc(100% + 24px)', left: 0, width: '350px', background: '#FFFAFA', border: '1px solid #D1D5DB', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', borderRadius: '16px', display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '650px', zIndex: 100 }}>
              <div style={{ background: '#383838', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MessageCircle size={20} color="#00BB5C" fill="#00BB5C" /><span style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>Chat with Doctor</span></div>
                <button onClick={() => setIsChatOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', borderRadius: '8px', color: 'white' }}><X size={24} /></button>
              </div>
              <div ref={scrollRef} className="exam-custom-scroll" style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', background: '#FFFAFA' }}>
                {messages.map((msg) => (
                  <div key={msg.id} style={{ maxWidth: '85%', padding: '12px 12px 16px', borderRadius: '16px', fontSize: '0.875rem', fontWeight: '500', display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: msg.sender === 'user' ? 'flex-end' : msg.sender === 'system' ? 'center' : 'flex-start', background: msg.sender === 'user' ? '#1C5332' : msg.sender === 'system' ? 'transparent' : 'white', color: msg.sender === 'user' ? 'white' : msg.sender === 'system' ? '#909090' : '#1F2937', textAlign: msg.sender === 'system' ? 'center' : 'left', border: msg.sender === 'doctor' ? '1px solid #E5E7EB' : 'none', borderTopRightRadius: msg.sender === 'user' ? 0 : undefined, borderTopLeftRadius: msg.sender === 'doctor' ? 0 : undefined }}>{msg.text}</div>
                ))}
              </div>
              <div style={{ padding: '12px', background: '#DEDEDE', borderTop: '1px solid #E5E7EB', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0 8px', marginBottom: '8px', opacity: isSavingChat ? 1 : 0, transition: 'opacity 0.2s' }}>
                  <div style={{ width: '8px', height: '8px', background: '#00BB5C', borderRadius: '50%' }} />
                  <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#6B7280', textTransform: 'uppercase' }}>Auto-Saving Chat...</span>
                </div>
                <form onSubmit={handleSendMessage} style={{ position: 'relative', display: 'flex', alignItems: 'center', background: 'white', border: '1px solid #D1D5DB', borderRadius: '9999px', padding: '6px 6px 6px 20px' }}>
                  <input type="text" placeholder="Type message..." style={{ flex: 1, fontSize: '0.875rem', outline: 'none', background: 'transparent', border: 'none' }} value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} />
                  <button type="submit" style={{ background: '#1C5332', padding: '8px', borderRadius: '50%', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Send size={20} /></button>
                </form>
              </div>
            </div>
          )}
          <button onClick={() => setIsChatOpen(!isChatOpen)} style={{ background: '#383838', color: 'white', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 24px', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.125rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: 'none', cursor: 'pointer' }}>
            <MessageCircle size={24} color="#00BB5C" fill="#00BB5C" /> Chat with Doctor
          </button>
        </div>
        <button onClick={() => setIsSubmitModalOpen(true)} style={{ background: '#00BB5C', fontWeight: 'bold', color: 'white', padding: '16px 48px', borderRadius: '12px', fontSize: '1.25rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: 'none', cursor: 'pointer' }}>Submit Exam</button>
      </footer>
      {isSubmitModalOpen && (
        <div className="exam-animate-fade-in" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div className="exam-animate-modal-pop" style={{ background: 'white', borderRadius: '32px', width: '100%', maxWidth: '550px', padding: '48px', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <h2 style={{ color: '#1C5332', fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '24px' }}>Confirm Exam Completion</h2>
            <p style={{ color: '#4A4A4A', fontSize: '1.25rem', fontWeight: '500', marginBottom: '40px', lineHeight: 1.6, maxWidth: '400px' }}>Are you sure you want to finish the exam and submit your answers?</p>
            <div style={{ display: 'flex', gap: '16px', width: '100%' }}>
              <button onClick={finalizeSubmission} style={{ flex: 1, background: '#1C5332', color: 'white', fontWeight: 'bold', padding: '16px', borderRadius: '12px', fontSize: '1.125rem', border: 'none', cursor: 'pointer' }}>Confirm Submission</button>
              <button onClick={() => setIsSubmitModalOpen(false)} style={{ flex: 1, background: '#235035', color: 'white', fontWeight: 'bold', padding: '16px', borderRadius: '12px', fontSize: '1.125rem', border: 'none', cursor: 'pointer' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ===================== //
// NOTIFICATIONS PAGE
// ===================== //

const notifications = [
  { id: 1, title: 'Exam Answers published: Data Structures Final', time: '30 min ago' },
  { id: 2, title: 'Exam Answers published: Operating Systems Quiz', time: '2 hours ago' },
];

const NotificationsPage = () => (
  <main className="main-content">
    <div className="exams-container">
      <h1 className="page-title">Notifications ({notifications.length})</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {notifications.map((n) => (
          <div key={n.id} style={{ background: 'white', border: '1px solid #E5E7EB', borderLeft: '4px solid #22C55E', borderRadius: '12px', padding: '22px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div>
              <p style={{ fontWeight: '700', fontSize: '16px', color: '#111827', margin: '0 0 6px' }}>{n.title}</p>
              <p style={{ fontSize: '14px', color: '#9CA3AF', margin: 0 }}>{n.time}</p>
            </div>
            <Bell size={28} color="#22C55E" strokeWidth={1.5} style={{ flexShrink: 0, marginLeft: '24px' }} />
          </div>
        ))}
      </div>
    </div>
  </main>
);

// ===================== //
// HISTORY PAGE
// ===================== //

const historyExams = [
  { title: 'Data Structures Final', date: '10/24/2025', score: '45/50', startTime: '1:33 PM', submitTime: '3:00 PM', timeTaken: 'An hour and half out of two hours', percentage: '90%', totalQuestions: 50,
    answers: [
      { q: 'What is the time complexity of Binary Search?', your: 'O(n)', correct: 'O(log n)', isCorrect: false },
      { q: 'Which data structure uses LIFO principle?', your: 'Stack', correct: null, isCorrect: true },
      { q: 'What does RAM stand for?', your: 'Random Access Memory', correct: null, isCorrect: true },
      { q: 'Which sorting algorithm has O(n log n) best case?', your: 'Bubble Sort', correct: 'Merge Sort', isCorrect: false },
      { q: 'What is a linked list?', your: 'A linear data structure', correct: null, isCorrect: true },
    ]
  },
  { title: 'Operating Systems Quiz', date: '10/24/2025', score: '45/50', startTime: '10:00 AM', submitTime: '11:00 AM', timeTaken: 'One hour out of one hour', percentage: '90%', totalQuestions: 50,
    answers: [
      { q: 'What is a process?', your: 'A program in execution', correct: null, isCorrect: true },
      { q: 'What is deadlock?', your: 'A livelock situation', correct: 'A state where processes wait forever', isCorrect: false },
    ]
  },
  { title: 'Computer Networks Test', date: '10/24/2025', score: '45/50', startTime: '2:00 PM', submitTime: '3:30 PM', timeTaken: 'An hour and a half out of two hours', percentage: '90%', totalQuestions: 50,
    answers: [
      { q: 'What does HTTP stand for?', your: 'HyperText Transfer Protocol', correct: null, isCorrect: true },
      { q: 'Which layer handles routing?', your: 'Data Link Layer', correct: 'Network Layer', isCorrect: false },
    ]
  },
];

const ExamResultPage = ({ exam, onBack }) => (
  <main className="main-content">
    <div className="exams-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#111827', margin: 0 }}>Result: {exam.title}</h1>
        <button onClick={onBack} style={{ background: '#1C5332', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 22px', fontWeight: '700', fontSize: '15px', cursor: 'pointer' }}>Back to history</button>
      </div>
      <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '24px', marginBottom: '28px', borderTop: '4px solid #1C5332' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <div style={{ background: '#F3F4F6', borderRadius: '12px', padding: '20px' }}>
            <p style={{ fontWeight: '700', color: '#374151', fontSize: '15px', margin: '0 0 10px' }}>Time Taken Exam</p>
            <p style={{ color: '#6B7280', fontSize: '14px', margin: '4px 0' }}>Start At {exam.startTime}</p>
            <p style={{ color: '#6B7280', fontSize: '14px', margin: '4px 0' }}>Submit At {exam.submitTime}</p>
            <p style={{ color: '#6B7280', fontSize: '13px', margin: '8px 0 0' }}>{exam.timeTaken}</p>
          </div>
          <div style={{ background: '#F0FDF4', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: '#16A34A', fontWeight: '700', fontSize: '15px', margin: '0 0 8px' }}>Score</p>
            <p style={{ color: '#16A34A', fontWeight: '900', fontSize: '2.5rem', margin: 0, lineHeight: 1 }}>{exam.percentage}</p>
          </div>
          <div style={{ background: '#FFFBEB', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: '#D97706', fontWeight: '700', fontSize: '15px', margin: '0 0 8px' }}>Questions</p>
            <p style={{ color: '#D97706', fontWeight: '900', fontSize: '2.5rem', margin: 0, lineHeight: 1 }}>{exam.totalQuestions}</p>
          </div>
        </div>
      </div>
      <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '24px', borderTop: '4px solid #1C5332' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <FileText size={18} color="#374151" />
          <span style={{ fontWeight: '700', fontSize: '16px', color: '#111827' }}>Exam Answers</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {exam.answers.map((a, i) => (
            <div key={i} style={{ borderRadius: '12px', padding: '18px 20px', background: a.isCorrect ? '#F0FDF4' : '#FFF1F2', borderLeft: `4px solid ${a.isCorrect ? '#22C55E' : '#EF4444'}`, position: 'relative' }}>
              <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
                {a.isCorrect ? <CheckCircle2 size={22} color="#22C55E" /> : <X size={22} color="#EF4444" />}
              </div>
              <p style={{ fontWeight: '700', fontSize: '15px', color: '#111827', margin: '0 0 10px', paddingRight: '32px' }}>{i + 1}. {a.q}</p>
              <p style={{ margin: '0 0 6px', fontSize: '14px', color: '#374151' }}>
                Your Answer: <span style={{ background: a.isCorrect ? '#22C55E' : '#F97316', color: 'white', borderRadius: '20px', padding: '2px 12px', fontSize: '13px', fontWeight: '600' }}>{a.your}</span>
              </p>
              {!a.isCorrect && <p style={{ margin: 0, fontSize: '14px', color: '#374151' }}>Correct Answer: <span style={{ color: '#16A34A', fontWeight: '600', fontSize: '13px' }}>{a.correct}</span></p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  </main>
);

const HistoryPage = () => {
  const [selectedExam, setSelectedExam] = useState(null);
  if (selectedExam !== null) return <ExamResultPage exam={historyExams[selectedExam]} onBack={() => setSelectedExam(null)} />;
  return (
    <main className="main-content">
      <div className="exams-container">
        <h1 className="page-title">Exam History</h1>
        <div style={{ background: '#FFFAFA', border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }}>
                {['Exam Title', 'Date', 'Score', 'Actions'].map((col) => (
                  <th key={col} style={{ padding: '16px 24px', fontWeight: '700', color: '#111827', textAlign: 'center', background: '#FFFAFA' }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {historyExams.map((row, i) => (
                <tr key={i} style={{ borderBottom: i < historyExams.length - 1 ? '1px solid #E5E7EB' : 'none' }}>
                  <td style={{ padding: '16px 24px', color: '#374151', textAlign: 'center' }}>{row.title}</td>
                  <td style={{ padding: '16px 24px', color: '#374151', textAlign: 'center' }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><Calendar size={15} color="#6B7280" />{row.date}</span></td>
                  <td style={{ padding: '16px 24px', color: '#374151', textAlign: 'center' }}>{row.score}</td>
                  <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                    <button onClick={() => setSelectedExam(i)} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#374151', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
                      <Eye size={15} color="#6B7280" />View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

// ===================== //
// MESSAGES PAGE - UPDATED
// ===================== //

const EMOJI_LIST = ['😀','😂','😍','🥰','😎','😭','😅','🤔','👍','👏','❤️','🔥','💯','🎉','😊','🙏','💪','✅','⭐','🚀','😢','😡','🤣','😴','🤗','💬','📚','✏️','📝','🎓'];

// Name pool for generated contacts
const DOCTOR_NAMES = ['Dr. Ahmed Hassan', 'Dr. Layla Mostafa', 'Dr. Omar Khalil', 'Dr. Nadia Farouk', 'Dr. Tarek Samir'];
const PROCTOR_NAMES = ['Proctor Walid Nasser', 'Proctor Hana Sherif', 'Proctor Youssef Ali', 'Proctor Dina Mahmoud', 'Proctor Kareem Saad'];
const DOCTOR_AVATARS = [60, 61, 62, 63, 64];
const PROCTOR_AVATARS = [50, 51, 52, 53, 54];

const initialDoctorContacts = [
  { id: 1, name: 'Sara Ahmed Ali', lastMsg: "I didn't understand question 5. Could you explain the q...", time: '13:00', unread: 1, avatar: 'https://i.pravatar.cc/150?img=47', online: true, course: 'Data Structures', type: 'doctor',
    messages: [
      { id: 1, text: "I didn't understand question 5. Could you explain the question again?", time: '13:00', fromMe: false },
      { id: 2, text: "Sure! Question 5 is asking about the time complexity of a binary search algorithm.", time: '13:02', fromMe: true },
      { id: 3, text: "Oh I see, so it's O(log n) right?", time: '13:04', fromMe: false },
      { id: 4, text: "Exactly! You got it.", time: '13:05', fromMe: true },
    ]
  },
  { id: 2, name: 'Alaa Ali Sami', lastMsg: "I didn't understand question 5. Could you explain the q...", time: '13:30', unread: 1, avatar: 'https://i.pravatar.cc/150?img=12', online: true, course: 'Operating Systems', type: 'doctor',
    messages: [{ id: 1, text: "I didn't understand question 5. Could you explain the question again?", time: '13:30', fromMe: false }]
  },
  { id: 3, name: 'Mai Ahmed Ali', lastMsg: "I didn't understand question 5. Could you explain the q...", time: '1 days ago', unread: 0, avatar: 'https://i.pravatar.cc/150?img=32', online: false, course: 'Computer Networks', type: 'doctor',
    messages: [{ id: 1, text: "I didn't understand question 5. Could you explain the question again?", time: 'Yesterday', fromMe: false }]
  },
  { id: 4, name: 'Ahmed Mohammad Ali', lastMsg: 'I understand now, thank you!', time: '2 days ago', unread: 0, avatar: 'https://i.pravatar.cc/150?img=15', online: false, course: 'Web Development', type: 'doctor',
    messages: [
      { id: 1, text: "Can you help me with the last question?", time: '2 days ago', fromMe: false },
      { id: 2, text: "Of course! Which part is confusing you?", time: '2 days ago', fromMe: true },
      { id: 3, text: "I understand now, thank you!", time: '2 days ago', fromMe: false },
    ]
  },
];

const initialProctorContacts = [
  { id: 5, name: 'Dr. Khalid Hassan', lastMsg: 'Please check your camera settings before the exam.', time: '10:00', unread: 2, avatar: 'https://i.pravatar.cc/150?img=53', online: true, course: 'Data Structures', type: 'proctor',
    messages: [
      { id: 1, text: "Please check your camera settings before the exam.", time: '10:00', fromMe: false },
      { id: 2, text: "Sure, I'll check them right now.", time: '10:01', fromMe: true },
    ]
  },
  { id: 6, name: 'Dr. Nour Ibrahim', lastMsg: 'Your exam has been scheduled for tomorrow.', time: '1 days ago', unread: 0, avatar: 'https://i.pravatar.cc/150?img=45', online: false, course: 'Operating Systems', type: 'proctor',
    messages: [{ id: 1, text: "Your exam has been scheduled for tomorrow.", time: 'Yesterday', fromMe: false }]
  },
];

const ChatWindow = ({ contact, onUpdateLastMsg }) => {
  const [newMsg, setNewMsg] = useState('');
  const [messages, setMessages] = useState(contact.messages.map(m => ({ ...m, type: m.type || 'text' })));
  const [showEmojis, setShowEmojis] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
  useEffect(() => {
    setMessages(contact.messages.map(m => ({ ...m, type: m.type || 'text' })));
    setNewMsg(''); setShowEmojis(false);
  }, [contact.id]);

  const getTime = () => { const now = new Date(); return `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`; };

  const autoReply = () => {
    const replies = ["Got it, thanks for letting me know!", "Sure, I'll look into that.", "Understood! I'll get back to you shortly.", "Thank you for the message.", "I see, let me check on that for you.", "Noted! I'll follow up soon."];
    setTimeout(() => {
      const replyText = replies[Math.floor(Math.random() * replies.length)];
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'text', text: replyText, time: getTime(), fromMe: false }]);
      if (onUpdateLastMsg) onUpdateLastMsg(contact.id, replyText);
    }, 1200);
  };

  const handleSend = () => {
    if (!newMsg.trim()) return;
    const txt = newMsg;
    const msg = { id: Date.now(), type: 'text', text: txt, time: getTime(), fromMe: true };
    setMessages(prev => [...prev, msg]);
    if (onUpdateLastMsg) onUpdateLastMsg(contact.id, txt);
    setNewMsg(''); setShowEmojis(false);
    autoReply();
  };

  const handleFile = (e, type) => {
    const file = e.target.files[0]; if (!file) return;
    const url = URL.createObjectURL(file);
    const msg = { id: Date.now(), type, url, name: file.name, size: (file.size / 1024).toFixed(1) + ' KB', time: getTime(), fromMe: true };
    setMessages(prev => [...prev, msg]);
    if (onUpdateLastMsg) onUpdateLastMsg(contact.id, type === 'image' ? '📷 Image' : `📎 ${file.name}`);
    e.target.value = ''; autoReply();
  };

  const renderMessage = (msg) => {
    if (msg.type === 'image') return (
      <div>
        <img src={msg.url} alt="sent" style={{ maxWidth: '220px', maxHeight: '180px', borderRadius: '12px', objectFit: 'cover', display: 'block', marginBottom: '4px' }} />
        <p style={{ margin: 0, fontSize: '11px', color: msg.fromMe ? 'rgba(255,255,255,0.6)' : '#9CA3AF', textAlign: 'right' }}>{msg.time}</p>
      </div>
    );
    if (msg.type === 'file') return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: msg.fromMe ? 'rgba(255,255,255,0.15)' : '#F3F4F6', borderRadius: '10px', padding: '10px 12px', marginBottom: '4px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: msg.fromMe ? 'rgba(255,255,255,0.2)' : '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="18" height="18" fill="none" stroke={msg.fromMe ? 'white' : '#6B7280'} strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: msg.fromMe ? 'white' : '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '140px' }}>{msg.name}</p>
            <p style={{ margin: 0, fontSize: '11px', color: msg.fromMe ? 'rgba(255,255,255,0.6)' : '#9CA3AF' }}>{msg.size}</p>
          </div>
        </div>
        <p style={{ margin: 0, fontSize: '11px', color: msg.fromMe ? 'rgba(255,255,255,0.6)' : '#9CA3AF', textAlign: 'right' }}>{msg.time}</p>
      </div>
    );
    return (
      <div>
        <p style={{ margin: '0 0 6px', fontSize: '14px', lineHeight: 1.5, wordBreak: 'break-word' }}>{msg.text}</p>
        <p style={{ margin: 0, fontSize: '11px', color: msg.fromMe ? 'rgba(255,255,255,0.6)' : '#9CA3AF', textAlign: 'right' }}>{msg.time}</p>
      </div>
    );
  };

  return (
    <div style={{ flex: 1, minWidth: 0, background: '#FCFCFC', borderRadius: '0 20px 20px 0', boxShadow: '0 2px 16px rgba(0,0,0,0.10)', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderLeft: '1px solid #E5E7EB' }}>
      <input ref={fileInputRef} type="file" style={{ display: 'none' }} onChange={e => handleFile(e, 'file')} />
      <input ref={imageInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleFile(e, 'image')} />
      <div style={{ padding: '18px 24px', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', gap: '14px', background: '#FCFCFC', flexShrink: 0 }}>
        <img src={contact.avatar} alt={contact.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
        <div>
          <p style={{ fontWeight: '700', fontSize: '16px', color: '#111827', margin: 0 }}>{contact.name}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: contact.online ? '#22C55E' : '#9CA3AF', flexShrink: 0 }} />
              <span style={{ fontSize: '13px', color: contact.online ? '#22C55E' : '#9CA3AF', fontWeight: '500' }}>{contact.online ? 'Online' : 'Offline'}</span>
            </div>
            {contact.course && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#c0ddce', borderRadius: '20px', padding: '2px 8px' }}>
                <BookOpen size={11} color="#1C5332" />
                <span style={{ fontSize: '11px', color: '#1C5332', fontWeight: '600' }}>{contact.course}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#FFFAFA' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ display: 'flex', justifyContent: msg.fromMe ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: '8px' }}>
            {!msg.fromMe && <img src={contact.avatar} alt="" style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, marginBottom: '2px' }} />}
            <div style={{ maxWidth: '70%', background: msg.fromMe ? '#1C5332' : 'white', color: msg.fromMe ? 'white' : '#111827', borderRadius: msg.fromMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px', padding: '12px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
              {renderMessage(msg)}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {showEmojis && (
        <div style={{ background: 'white', borderTop: '1px solid #E5E7EB', padding: '12px 16px', display: 'flex', flexWrap: 'wrap', gap: '8px', flexShrink: 0 }}>
          {EMOJI_LIST.map(e => (
            <button key={e} onClick={() => setNewMsg(p => p + e)} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', padding: '4px', borderRadius: '6px', lineHeight: 1 }}
              onMouseEnter={ev => ev.currentTarget.style.background = '#F3F4F6'} onMouseLeave={ev => ev.currentTarget.style.background = 'none'}>{e}</button>
          ))}
        </div>
      )}
      <div style={{ padding: '12px 16px', background: '#F3F4F6', borderTop: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        <button onClick={() => fileInputRef.current.click()} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <svg width="22" height="22" fill="none" stroke="#374151" strokeWidth="2" viewBox="0 0 24 24"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
        </button>
        <button onClick={() => imageInputRef.current.click()} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <svg width="22" height="22" fill="none" stroke="#374151" strokeWidth="2" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
        </button>
        <button onClick={() => setShowEmojis(p => !p)} style={{ background: showEmojis ? '#E5E7EB' : 'none', border: 'none', cursor: 'pointer', padding: '4px', borderRadius: '6px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <svg width="22" height="22" fill="none" stroke="#374151" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>
        </button>
        <div style={{ flex: 1, minWidth: 0, background: 'white', borderRadius: '50px', padding: '10px 18px', display: 'flex', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <input type="text" placeholder="Type your message here..." value={newMsg} onChange={e => setNewMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} style={{ width: '100%', border: 'none', outline: 'none', fontSize: '14px', color: '#374151', background: 'transparent' }} />
        </div>
        <button onClick={handleSend} style={{ background: '#1C5332', border: 'none', borderRadius: '12px', width: '44px', height: '44px', minWidth: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, boxShadow: '0 2px 8px rgba(28,83,50,0.3)' }}>
          <Send size={18} color="white" />
        </button>
      </div>
    </div>
  );
};

// ===================== //
// NEW MESSAGE PANEL - UPDATED
// Creates a real contact on first message send
// ===================== //

const NewMessagePanel = ({ onClose, onContactCreated }) => {
  const [selectedType, setSelectedType] = useState(null);
  const [course, setCourse] = useState('');
  const [newMsgText, setNewMsgText] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [showNewEmojis, setShowNewEmojis] = useState(false);
  const [contactCreated, setContactCreated] = useState(false);
  const [createdContact, setCreatedContact] = useState(null);
  const newMsgsEndRef = useRef(null);
  const newFileRef = useRef(null);
  const newImageRef = useRef(null);

  const courses = ['Data Structures', 'Operating Systems', 'Computer Networks', 'Web Development'];

  useEffect(() => { newMsgsEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatMessages]);

  const getTime = () => { const now = new Date(); return `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`; };

  const autoReply = () => {
    const replies = ["Got it, I'll check and get back to you.", "Thanks for reaching out!", "Received, I'll respond shortly.", "Understood!", "I'll look into this right away."];
    const replyText = replies[Math.floor(Math.random() * replies.length)];
    setTimeout(() => {
      setChatMessages(prev => [...prev, { id: Date.now() + 1, type: 'text', text: replyText, time: getTime(), fromMe: false }]);
    }, 1200);
  };

  // Generate a contact object from the selected type + course
  const buildContact = (firstMsgText) => {
    const isDoctor = selectedType === 'Doctor';
    const names = isDoctor ? DOCTOR_NAMES : PROCTOR_NAMES;
    const avatarNums = isDoctor ? DOCTOR_AVATARS : PROCTOR_AVATARS;
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomAvatar = avatarNums[Math.floor(Math.random() * avatarNums.length)];
    return {
      id: Date.now(),
      name: randomName,
      lastMsg: firstMsgText.length > 40 ? firstMsgText.substring(0, 40) + '...' : firstMsgText,
      time: getTime(),
      unread: 0,
      avatar: `https://i.pravatar.cc/150?img=${randomAvatar}`,
      online: true,
      course,
      type: selectedType.toLowerCase(),
      messages: [{ id: Date.now() - 1, text: firstMsgText, time: getTime(), fromMe: true, type: 'text' }],
      isNew: true,
    };
  };

  const handleNewSend = () => {
    if (!newMsgText.trim()) return;
    const txt = newMsgText;
    const now = getTime();

    if (!contactCreated) {
      // First message: create contact & notify parent
      const newContact = buildContact(txt);
      setCreatedContact(newContact);
      setContactCreated(true);
      setChatMessages([
        { id: Date.now() - 2, type: 'system', course, selectedType, time: now },
        { id: Date.now() - 1, type: 'text', text: txt, time: now, fromMe: true }
      ]);
      if (onContactCreated) onContactCreated(newContact);
    } else {
      setChatMessages(prev => [...prev, { id: Date.now(), type: 'text', text: txt, time: now, fromMe: true }]);
    }
    setNewMsgText('');
    setShowNewEmojis(false);
    autoReply();
  };

  const handleNewFile = (e, type) => {
    const file = e.target.files[0]; if (!file) return;
    const url = URL.createObjectURL(file);
    const label = type === 'image' ? '📷 Image' : `📎 ${file.name}`;
    if (!contactCreated) {
      const newContact = buildContact(label);
      setCreatedContact(newContact);
      setContactCreated(true);
      setChatMessages([
        { id: Date.now() - 2, type: 'system', course, selectedType, time: getTime() },
        { id: Date.now(), type, url, name: file.name, size: (file.size/1024).toFixed(1)+' KB', time: getTime(), fromMe: true }
      ]);
      if (onContactCreated) onContactCreated(newContact);
    } else {
      setChatMessages(prev => [...prev, { id: Date.now(), type, url, name: file.name, size: (file.size/1024).toFixed(1)+' KB', time: getTime(), fromMe: true }]);
    }
    e.target.value = '';
    autoReply();
  };

  const renderMsg = (msg) => {
    if (msg.type === 'image') return (
      <div>
        <img src={msg.url} alt="sent" style={{ maxWidth: '200px', maxHeight: '160px', borderRadius: '12px', objectFit: 'cover', display: 'block', marginBottom: '4px' }} />
        <p style={{ margin: 0, fontSize: '11px', color: msg.fromMe ? 'rgba(255,255,255,0.6)' : '#9CA3AF', textAlign: 'right' }}>{msg.time}</p>
      </div>
    );
    if (msg.type === 'file') return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: msg.fromMe ? 'rgba(255,255,255,0.15)' : '#F3F4F6', borderRadius: '10px', padding: '10px 12px', marginBottom: '4px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: msg.fromMe ? 'rgba(255,255,255,0.2)' : '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="16" height="16" fill="none" stroke={msg.fromMe ? 'white' : '#6B7280'} strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: '12px', fontWeight: '600', color: msg.fromMe ? 'white' : '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '120px' }}>{msg.name}</p>
            <p style={{ margin: 0, fontSize: '11px', color: msg.fromMe ? 'rgba(255,255,255,0.6)' : '#9CA3AF' }}>{msg.size}</p>
          </div>
        </div>
        <p style={{ margin: 0, fontSize: '11px', color: msg.fromMe ? 'rgba(255,255,255,0.6)' : '#9CA3AF', textAlign: 'right' }}>{msg.time}</p>
      </div>
    );
    return (
      <div>
        <p style={{ margin: '0 0 6px', fontSize: '14px', lineHeight: 1.5, wordBreak: 'break-word' }}>{msg.text}</p>
        <p style={{ margin: 0, fontSize: '11px', color: msg.fromMe ? 'rgba(255,255,255,0.6)' : '#9CA3AF', textAlign: 'right' }}>{msg.time}</p>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flex: 1, minWidth: 0 }}>
      <input ref={newFileRef} type="file" style={{ display: 'none' }} onChange={e => handleNewFile(e, 'file')} />
      <input ref={newImageRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleNewFile(e, 'image')} />

      {/* Left: selection panel */}
      <div style={{ flex: '0 0 280px', background: '#FFFAFA', boxShadow: '0 0 10px  rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', borderRadius: selectedType ? '0' : '0 20px 20px 0', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderLeft: '1px solid #E5E7EB' }}>
        <div style={{ background: '#1C5332', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <h3 style={{ color: 'white', fontWeight: '700', fontSize: '18px', margin: 0 }}>New Message</h3>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px' }}><X size={22} color="white" /></button>
        </div>
        <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {['Doctor', 'Proctor'].map(option => {
            const isSelected = selectedType === option;
            return (
              <button key={option} onClick={() => { if (!contactCreated) setSelectedType(option); }}
                style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 20px', background: isSelected ? '#F0FDF4' : 'white', border: `1.5px solid ${isSelected ? '#1C5332' : '#E5E7EB'}`, borderRadius: '12px', cursor: contactCreated ? 'default' : 'pointer', fontSize: '16px', fontWeight: '700', color: '#111827', textAlign: 'left', transition: 'all 0.15s', opacity: contactCreated && !isSelected ? 0.4 : 1 }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: `2px solid ${isSelected ? '#1C5332' : '#9CA3AF'}`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {isSelected && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#1C5332' }} />}
                </div>
                {option}
              </button>
            );
          })}

          {selectedType && (
            <div style={{ marginTop: '8px' }}>
              <p style={{ fontWeight: '700', fontSize: '15px', color: '#111827', margin: '0 0 10px' }}>Select Course name</p>
              <div style={{ position: 'relative' }}>
                <select value={course} onChange={e => { if (!contactCreated) setCourse(e.target.value); }}
                  disabled={contactCreated}
                  style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #E5E7EB', borderRadius: '10px', fontSize: '15px', color: course ? '#111827' : '#9CA3AF', background: 'white', appearance: 'none', cursor: contactCreated ? 'default' : 'pointer', outline: 'none', opacity: contactCreated ? 0.7 : 1 }}>
                  <option value="" disabled>Choose..</option>
                  {courses.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                  <svg width="14" height="14" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>
          )}

          {/* Show created contact info */}
          {contactCreated && createdContact && (
            <div style={{ marginTop: '8px', background: '#F0FDF4', border: '1.5px solid #1C5332', borderRadius: '12px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src={createdContact.avatar} alt="" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
              <div style={{ minWidth: 0 }}>
                <p style={{ margin: 0, fontWeight: '700', fontSize: '13px', color: '#1C5332', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{createdContact.name}</p>
                <p style={{ margin: 0, fontSize: '11px', color: '#6B7280' }}>{createdContact.course}</p>
              </div>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22C55E', flexShrink: 0 }} />
            </div>
          )}
        </div>
      </div>

      {/* Right: chat area */}
      {selectedType && (
        <div style={{ flex: 1, minWidth: 0, background: '#F9F9F5', borderRadius: '0 20px 20px 0', display: 'flex', flexDirection: 'column', overflow: 'hidden', borderLeft: '1px solid #E5E7EB',boxShadow: '0 0 10px  rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
          {/* Header */}
          <div style={{ padding: '16px 20px', background: '#FCFCFC', borderBottom: '2px solid #e7e7e7', flexShrink: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
            {contactCreated && createdContact ? (
              <>
                <img src={createdContact.avatar} alt="" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                <div>
                  <p style={{ fontWeight: '700', fontSize: '15px', color: '#111827', margin: 0 }}>{createdContact.name}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22C55E' }} />
                    <span style={{ fontSize: '12px', color: '#22C55E', fontWeight: '500' }}>Online</span>
                    {course && (
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#E8F5EE', borderRadius: '20px', padding: '2px 8px', marginLeft: '4px' }}>
                        <BookOpen size={10} color="#1C5332" />
                        <span style={{ fontSize: '11px', color: '#1C5332', fontWeight: '600' }}>{course}</span>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#E8F5EE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MessageSquare size={18} color="#1C5332" strokeWidth={2} />
                </div>
                <div>
                  <p style={{ fontWeight: '700', fontSize: '15px', color: '#111827', margin: 0 }}>
                    {selectedType}
                    {course && <><span style={{ fontWeight: '400', color: '#6B7280', marginLeft: '6px' }}>·</span><span style={{ fontWeight: '600', color: '#1C5332', marginLeft: '6px', fontSize: '14px' }}>{course}</span></>}
                  </p>
                  {!course ? <p style={{ fontSize: '12px', color: '#9CA3AF', margin: 0 }}>Select a course to get started</p>
                            : <p style={{ fontSize: '12px', color: '#9CA3AF', margin: 0 }}>New conversation</p>}
                </div>
              </>
            )}
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#FFFAFA', }}>
            {chatMessages.length === 0 ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', height: '100%' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#E8F5EE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageSquare size={38} color="#1C5332" strokeWidth={1.5} />
                </div>
                <p style={{ color: '#374151', fontSize: '16px', fontWeight: '500', margin: 0, textAlign: 'center' }}>
                  {!course ? 'Select a course first' : 'Start typing your message'}
                </p>
                {course && <p style={{ color: '#9CA3AF', fontSize: '13px', margin: 0, textAlign: 'center' }}>{selectedType} · {course}</p>}
              </div>
            ) : (
              chatMessages.map(msg => {
                if (msg.type === 'system') return (
                  <div key={msg.id} style={{ display: 'flex', justifyContent: 'center', margin: '4px 0' }}>
                    <div style={{ background: '#E8F5EE', borderRadius: '20px', padding: '6px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <BookOpen size={13} color="#1C5332" />
                      <span style={{ fontSize: '12px', color: '#1C5332', fontWeight: '600' }}>{msg.selectedType} · {msg.course}</span>
                    </div>
                  </div>
                );
                return (
                  <div key={msg.id} style={{ display: 'flex', justifyContent: msg.fromMe ? 'flex-end' : 'flex-start', alignItems: 'flex-end', gap: '8px' }}>
                    {!msg.fromMe && contactCreated && createdContact && (
                      <img src={createdContact.avatar} alt="" style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, marginBottom: '2px' }} />
                    )}
                    <div style={{ maxWidth: '70%', background: msg.fromMe ? '#1C5332' : 'white', color: msg.fromMe ? 'white' : '#111827', borderRadius: msg.fromMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px', padding: '12px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                      {renderMsg(msg)}
                    </div>
                  </div>
                );
              })
            )}
            <div ref={newMsgsEndRef} />
          </div>

          {/* Emoji picker */}
          {showNewEmojis && (
            <div style={{ background: 'white', borderTop: '1px solid #E5E7EB', padding: '12px 16px', display: 'flex', flexWrap: 'wrap', gap: '8px', flexShrink: 0 }}>
              {EMOJI_LIST.map(e => (
                <button key={e} onClick={() => setNewMsgText(p => p + e)} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', padding: '4px', borderRadius: '6px', lineHeight: 1 }}
                  onMouseEnter={ev => ev.currentTarget.style.background = '#F3F4F6'} onMouseLeave={ev => ev.currentTarget.style.background = 'none'}>{e}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: '12px 16px', background: '#F3F4F6', borderTop: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
            <button onClick={() => newFileRef.current.click()} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <svg width="22" height="22" fill="none" stroke="#374151" strokeWidth="2" viewBox="0 0 24 24"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
            </button>
            <button onClick={() => newImageRef.current.click()} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <svg width="22" height="22" fill="none" stroke="#374151" strokeWidth="2" viewBox="0 0 24 24"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
            </button>
            <button onClick={() => setShowNewEmojis(p => !p)} style={{ background: showNewEmojis ? '#E5E7EB' : 'none', border: 'none', cursor: 'pointer', padding: '4px', borderRadius: '6px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              <svg width="22" height="22" fill="none" stroke="#374151" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>
            </button>
            <div style={{ flex: 1, minWidth: 0, background: 'white', borderRadius: '50px', padding: '10px 18px', display: 'flex', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
              <input type="text" placeholder={!course ? "Select a course first..." : "Type your message here..."}
                value={newMsgText} onChange={e => setNewMsgText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && course && handleNewSend()}
                disabled={!course}
                style={{ width: '100%', border: 'none', outline: 'none', fontSize: '14px', color: '#374151', background: 'transparent', cursor: !course ? 'not-allowed' : 'text' }} />
            </div>
            <button onClick={() => course && handleNewSend()} style={{ background: course ? '#1C5332' : '#CBCBCB', border: 'none', borderRadius: '12px', width: '44px', height: '44px', minWidth: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: course ? 'pointer' : 'not-allowed', flexShrink: 0 }}>
              <Send size={18} color="white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ===================== //
// MESSAGES PAGE - UPDATED with dynamic contacts
// ===================== //

const MessagesPage = () => {
  const [activeTab, setActiveTab] = useState('doctor');
  const [search, setSearch] = useState('');
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [doctorContacts, setDoctorContacts] = useState(initialDoctorContacts);
  const [proctorContacts, setProctorContacts] = useState(initialProctorContacts);

  const contacts = activeTab === 'doctor' ? doctorContacts : proctorContacts;
  const filtered = contacts.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
  const unreadCount = [...doctorContacts, ...proctorContacts].filter(c => c.unread > 0).length;

  // Called when NewMessagePanel creates a new contact
  const handleContactCreated = (newContact) => {
    if (newContact.type === 'doctor') {
      setDoctorContacts(prev => [newContact, ...prev]);
      setActiveTab('doctor');
    } else {
      setProctorContacts(prev => [newContact, ...prev]);
      setActiveTab('proctor');
    }
    // Select the new contact and close the panel
    setSelectedContact(newContact);
    setShowNewMessage(false);
  };

  // Update lastMsg in contact list when a message is sent
  const handleUpdateLastMsg = (contactId, text) => {
    setDoctorContacts(prev => prev.map(c => c.id === contactId ? { ...c, lastMsg: text.length > 40 ? text.substring(0, 40) + '...' : text, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) } : c));
    setProctorContacts(prev => prev.map(c => c.id === contactId ? { ...c, lastMsg: text.length > 40 ? text.substring(0, 40) + '...' : text, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) } : c));
  };

  return (
    <main className="main-content" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '40px 60px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: '0', flex: 1, width: '100%' }}>
          {/* Contact list */}
          <div style={{ background: '#F9F9F5', borderRadius: (showNewMessage || selectedContact) ? '20px 0 0 20px' : '20px', boxShadow: '0 2px 16px rgba(0,0,0,0.10)', overflow: 'hidden', flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <div style={{ background: '#1C5332', padding: '28px 28px 24px', flexShrink: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                <h2 style={{ color: 'white', fontWeight: '800', fontSize: '28px', margin: 0 }}>Messages</h2>
                <button onClick={() => { setShowNewMessage(!showNewMessage); setSelectedContact(null); }} style={{ background: showNewMessage ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '10px', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'background 0.2s' }}>
                  <span style={{ color: 'white', fontSize: '26px', lineHeight: 1, fontWeight: '300' }}>+</span>
                </button>
              </div>
              <p style={{ color: '#FFFAFA', fontSize: '15px', margin: '0 0 20px' }}>{unreadCount} unread Messages</p>
              <div style={{ background: '#FCFCFC', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 20px' }}>
                <svg width="18" height="18" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input type="text" placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} style={{ border: 'none', outline: 'none', fontSize: '16px', color: '#1f59b5', width: '100%', background: 'transparent' }} />
              </div>
            </div>
            <div style={{ background: '#FFFAFA', display: 'flex', borderBottom: '1px solid #E5E7EB', flexShrink: 0 }}>
              {['doctor', 'proctor'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{ flex: 1, background: 'transparent', border: 'none', borderBottom: activeTab === tab ? '3px solid #1C5332' : '3px solid transparent', color: '#1C5332', fontWeight: activeTab === tab ? '700' : '400', fontSize: '16px', padding: '16px 0', cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.15s' }}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            <div style={{ background: '#FFFAFA', overflowY: 'auto', flex: 1 }}>
              {filtered.length === 0 ? (
                <p style={{ padding: '24px', color: '#9CA3AF', textAlign: 'center', fontSize: '14px' }}>No conversations found.</p>
              ) : (
                filtered.map((c, i) => (
                  <div key={c.id}
                    onClick={() => { setSelectedContact(c); setShowNewMessage(false); }}
                    style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 20px', borderBottom: i < filtered.length - 1 ? '1px solid #F3F4F6' : 'none', cursor: 'pointer', background: selectedContact?.id === c.id ? '#F0FDF4' : '#FFFAFA', transition: 'background 0.15s', borderLeft: selectedContact?.id === c.id ? '3px solid #1C5332' : '3px solid transparent' }}
                    onMouseEnter={e => { if (selectedContact?.id !== c.id) e.currentTarget.style.background = '#1c53324b'; }}
                    onMouseLeave={e => { if (selectedContact?.id !== c.id) e.currentTarget.style.background = '#FFFAFA'; }}
                  >
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      <img src={c.avatar} alt={c.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                      {c.isNew && <div style={{ position: 'absolute', bottom: 1, right: 1, width: '12px', height: '12px', borderRadius: '50%', background: '#22C55E', border: '2px solid white' }} />}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ fontWeight: '700', fontSize: '15px', color: '#111827' }}>{c.name}</span>
                        <span style={{ fontSize: '12px', color: '#9CA3AF', flexShrink: 0 }}>{c.time}</span>
                      </div>
                      {c.course && (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#E8F5EE', borderRadius: '20px', padding: '2px 8px', marginBottom: '4px' }}>
                          <BookOpen size={10} color="#1C5332" />
                          <span style={{ fontSize: '11px', color: '#1C5332', fontWeight: '600' }}>{c.course}</span>
                        </div>
                      )}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '13px', color: '#6B7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '260px' }}>{c.lastMsg}</span>
                        {c.unread > 0 && <span style={{ background: '#1C5332', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '700', flexShrink: 0, marginLeft: '8px' }}>{c.unread}</span>}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* New Message Panel */}
          {showNewMessage && (
            <NewMessagePanel onClose={() => setShowNewMessage(false)} onContactCreated={handleContactCreated} />
          )}

          {/* Chat Window */}
          {selectedContact && !showNewMessage && (
            <ChatWindow contact={selectedContact} onUpdateLastMsg={handleUpdateLastMsg} />
          )}
        </div>
      </div>
    </main>
  );
};

// ===================== //
// EXAMS PAGE
// ===================== //

const ExamCard = ({ title, scheduledDate, questions, duration, status, onStartExam }) => {
  const isAvailable = status === "AVAILABLE";
  return (
    <div className="exam-card">
      <div className="exam-card-accent" />
      <div className="exam-card-body">
        <div className="exam-card-header">
          <h3 className="exam-card-title">{title}</h3>
          <span className={`status-badge ${isAvailable ? 'badge-available' : 'badge-upcoming'}`}>{status}</span>
        </div>
        <p className="exam-scheduled">Scheduled: {scheduledDate}</p>
        <div className="exam-stats">
          <div className="stat-item"><FileText size={18} /><span>Questions: {questions}</span></div>
          <div className="stat-item"><Hourglass size={18} /><span>Duration: {duration}</span></div>
        </div>
        <button className={`btn-start-exam ${!isAvailable ? 'btn-disabled' : ''}`} disabled={!isAvailable} onClick={isAvailable ? onStartExam : undefined}>Start Exam</button>
      </div>
    </div>
  );
};

const ExamsPage = ({ onStartExam }) => {
  const exams = [
    { title: "Computer Science Midterm Exam", scheduledDate: "2025-11-15 | At 3:00 PM", questions: 25, duration: "60 mins", status: "UPCOMING" },
    { title: "Data Structures Final Exam", scheduledDate: "2025-10-29 | At 1:30 PM", questions: 50, duration: "120 mins", status: "AVAILABLE" },
    { title: "Web Development Fundamentals Quiz", scheduledDate: "2025-10-30 | At 10:00 AM", questions: 5, duration: "20 mins", status: "UPCOMING" },
    { title: "Computer Science Midterm Exam", scheduledDate: "2025-10-30 | At 3:00 PM", questions: 25, duration: "120 mins", status: "AVAILABLE" }
  ];
  return (
    <main className="main-content">
      <div className="exams-container">
        <h1 className="page-title">Available Exams</h1>
        <div className="exams-grid">
          {exams.map((exam, index) => <ExamCard key={index} {...exam} onStartExam={onStartExam} />)}
        </div>
      </div>
    </main>
  );
};

// ===================== //
// ROOT APP
// ===================== //

export default function App() {
  const [activePage, setActivePage] = useState('profile');
  const [isExamActive, setIsExamActive] = useState(false);
  const studentData = useMemo(() => ({ name: 'Mohamed Ahmed Ali', img: '/src/assets/profile.png' }), []);

  if (isExamActive) return <ExamInterface onExamComplete={() => { setIsExamActive(false); setActivePage('profile'); }} />;

  return (
    <div className="app-container" dir="ltr">
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; background-color: #FFFAFA; }
        .app-container { display: flex; flex-direction: column; min-height: 100vh; background-color: #FFFAFA; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        .top-header { position: fixed; top: 0; left: 0; width: 100%; z-index: 40; background-color: #FFFAFA; border-bottom: 1px solid #E5E7EB; padding: 0 56px; display: flex; align-items: center; justify-content: space-between; height: 100px; box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05); box-sizing: border-box; }
        .header-left { display: flex; align-items: center; gap: 0.5rem; }
        .logo-img { width: 75px; height: 74px; border-radius: 0.5rem; margin-right: 20px; }
        .logo-truth { color: #1C5332; font-weight: bold; font-size: 48px; }
        .logo-eye { color: #F3B300; font-weight: bold; font-size: 48px; }
        .header-right { display: flex; align-items: center; gap: 0.75rem; }
        .user-name { font-weight: bold; color: #1C5332; font-size: 24px; margin-right: 12px; }
        .user-avatar { width: 68px; height: 68px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
        .content-wrapper { display: flex; flex: 1; margin-top: 100px; }
        .sidebar { position: fixed; top: 100px; left: 0; bottom: 0; width: 256px; background-color: #1C5332; color: #FFFAFA; display: flex; flex-direction: column; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); z-index: 30; overflow: hidden; }
        .sidebar-bell { padding: 1rem 1.5rem; display: flex; align-items: center; justify-content: flex-start; cursor: pointer; }
        .bell-container { position: relative; }
        .bell-badge { position: absolute; top: -1px; right: 2px; background-color: #FF5656; border-radius: 50%; width: 10px; height: 10px; border: 1.5px solid #1C5332; }
        .sidebar-nav { padding: 1rem; display: flex; flex-direction: column; gap: 40px; margin-top: 32px; }
        .nav-item { padding: 0.75rem 1rem; display: flex; align-items: center; justify-content: space-between; cursor: pointer; color: #FFFAFA; border-radius: 0.5rem; transition: background-color 0.2s; opacity: 0.85; }
        .nav-item:hover { background-color: #286B43; opacity: 1; }
        .nav-item-active { background: linear-gradient(#1C5332, #1C5332) padding-box, linear-gradient(135deg, #F3B300, #1C5332) border-box; border: 1px solid transparent; border-radius: 0.5rem; padding: 0.75rem 1rem; display: flex; align-items: center; justify-content: space-between; cursor: pointer; font-weight: 600; box-shadow: 0 0 3px #f3b20095; color: #FFFAFA; }
        .nav-item-content { display: flex; align-items: center; gap: 0.75rem; }
        .nav-icon-active { color: #F3B300; }
        .nav-text { color: #FFFAFA; }
        .nav-arrow { color: #FFFAFA; opacity: 0.6; }
        .nav-arrow-active { color: #F3B300; }
        .main-content { flex: 1; overflow-y: auto; background-color: #FFFAFA; margin-left: 256px; display: flex; flex-direction: column; }
        .profile-container { padding: 2.5rem 3rem; }
        .profile-title-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2.5rem; }
        .profile-title { font-size: 1.875rem; font-weight: bold; color: #1C2933; }
        .btn-logout { padding: 0.375rem 1.25rem; border: 2px solid #FF5656; color: #FF5656; border-radius: 0.5rem; font-size: 0.875rem; font-weight: 600; background-color: #FFFAFA; cursor: pointer; transition: all 0.2s; width: 100px; height: 40px; flex-shrink: 0; }
        .btn-logout:hover { background-color: #FF5656; color: #fff; }
        .profile-header { display: flex; align-items: center; justify-content: center; gap: 1.5rem; margin-bottom: 2.5rem; padding-bottom: 2rem; }
        .profile-img { width: 115px; height: 115px; border-radius: 50%; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); flex-shrink: 0; }
        .profile-name { font-size: 24px; font-weight: bold; color: #1C2933; }
        .profile-id { color: #6B7280; font-size: 18px; }
        .identity-status-container { display: flex; align-items: center; gap: 0.4rem; margin-top: 0.25rem; }
        .identity-status-icon { color: #00897B; stroke-width: 2.5px; }
        .identity-status-text { color: #00897B; font-weight: 600; font-size: 16px; }
        .form-section { margin-bottom: 40px; }
        .section-header { font-size: 24px; font-weight: bold; color: #1C2933; margin-bottom: 20px; display: flex; align-items: center; gap: 0.75rem; }
        .section-title-line { position: relative; padding-bottom: 8px; margin-bottom: 16px; border-bottom: 1px solid #DEDEDE; }
        .form-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
        .form-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
        .input-field-container { display: flex; flex-direction: column; }
        .input-label { color: #616161; font-size: 18px; font-weight: 500; margin-bottom: 0.25rem; }
        .input-wrapper { position: relative; }
        .input-base { width: 100%; padding: 0.6rem 0.75rem; border: 1px solid #9E9E9E; border-radius: 0.375rem; font-size: 15px; box-sizing: border-box; }
        .input-readonly { background-color: #FFFAFA; color: #1C2933; cursor: not-allowed; }
        .date-icon { position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; color: #9CA3AF; }
        .btn-change-password { width: 100%; max-width: 52rem; padding: 0.85rem 1rem; border: 1.5px solid #1C5332; color: #1C5332; border-radius: 0.375rem; background-color: #FFFAFA; cursor: pointer; font-weight: 600; font-size: 1rem; transition: all 0.2s; }
        .btn-change-password:hover { background-color: #1C5332; color: #FFFAFA; }
        .security-container { display: flex; flex-direction: column; gap: 0.75rem; }
        .modal-overlay { position: fixed; inset: 0; background-color: rgba(0,0,0,0.3); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 1.5rem; }
        .modal-content { background-color: #FFFAFA; border-radius: 0.75rem; width: 100%; max-width: 800px; padding: 2rem 2.5rem; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); border: 1px solid #E5E7EB; max-height: 90vh; overflow-y: auto; }
        .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .modal-title { font-size: 1.75rem; font-weight: bold; color: #1C5332; letter-spacing: -0.01em; }
        .modal-body { display: flex; flex-direction: column; }
        .suggested-info-text { color: #2563EB; font-size: 14px; margin-bottom: 1.25rem; font-weight: 500; }
        .error-message-text { color: #EF4444; font-size: 14px; margin-bottom: 1.25rem; font-weight: 500; }
        .password-fields { display: flex; flex-direction: column; gap: 1rem; }
        .password-input-container { display: flex; align-items: center; background-color: #FFFFFF; border: 1px solid #D1D5DB; border-radius: 0.5rem; overflow: hidden; }
        .password-input { flex: 1; padding: 0.875rem 1.25rem; border: none; outline: none; font-size: 1rem; color: #374151; min-width: 0; }
        .password-toggle-btn { background: transparent; border: none; cursor: pointer; padding: 0.5rem 1rem; display: flex; align-items: center; flex-shrink: 0; }
        .eye-icon-gray { color: #9CA3AF; }
        .modal-footer-actions { display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; gap: 1rem; flex-wrap: wrap; }
        .btn-suggest-outlined { padding: 0.75rem 1.5rem; border: 1.5px solid #1C5332; color: #1C5332; background-color: transparent; border-radius: 0.625rem; cursor: pointer; font-weight: 600; font-size: 1rem; transition: all 0.2s; white-space: nowrap; }
        .btn-suggest-outlined:hover { background-color: #F0FDF4; }
        .btn-update-solid { padding: 0.75rem 2.75rem; background-color: #1C5332; color: #FFFFFF; border: none; border-radius: 0.625rem; cursor: pointer; font-weight: bold; font-size: 1rem; transition: background-color 0.2s; white-space: nowrap; }
        .btn-update-solid:hover { background-color: #164228; }
        .modal-close-btn { background: transparent; border: none; cursor: pointer; color: #6B7280; padding: 4px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .success-ui-container { padding: 1rem 0; }
        .success-ui-text { color: #1C5332; font-size: 1.5rem; font-weight: 500; margin: 2rem 0 3.5rem 0; }
        .success-ui-actions { display: flex; justify-content: flex-end; width: 100%; }
        .btn-ok-success { background-color: #1C5332; color: white; padding: 0.75rem 3.5rem; border: none; border-radius: 0.625rem; font-weight: bold; cursor: pointer; font-size: 1.125rem; }
        .btn-ok-success:hover { background-color: #164228; }
        .exams-container { padding: 40px 60px; }
        .page-title { font-size: 24px; font-weight: 700; color: #111827; margin-bottom: 40px; }
        .exams-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(480px, 1fr)); gap: 30px; }
        .exam-card { background: #FFFAFA; border-radius: 12px; box-shadow: 0 0 10px rgba(0,0,0,0.1); display: flex; overflow: hidden; min-height: 220px; }
        .exam-card-accent { width: 8px; background-color: #1C5332; flex-shrink: 0; }
        .exam-card-body { padding: 24px; flex-grow: 1; display: flex; flex-direction: column; }
        .exam-card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
        .exam-card-title { font-size: 20px; font-weight: 700; color: #111827; margin: 0; }
        .status-badge { font-size: 13px; font-weight: 600; padding: 6px 14px; border-radius: 20px; white-space: nowrap; }
        .badge-upcoming { background-color: #E5E7EB; color: #4B5563; }
        .badge-available { background-color: #E5F8ED; color: #09A945; border: 1px solid #BBF7D0; box-shadow: 0 0 3px #09A945; }
        .exam-scheduled { font-size: 15px; color: #9CA3AF; margin: 0 0 20px 0; }
        .exam-stats { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
        .stat-item { display: flex; align-items: center; gap: 10px; color: #111827; font-size: 16px; font-weight: 500; }
        .btn-start-exam { width: 220px; margin: 0 auto; padding: 12px; border-radius: 8px; border: none; font-size: 18px; font-weight: 600; cursor: pointer; background-color: #1C5332; color: white; transition: background-color 0.2s; }
        .btn-start-exam:hover:not(:disabled) { background-color: #164228; }
        .btn-disabled { background-color: #A9A9A9 !important; cursor: not-allowed !important; }
        @media (max-width: 1024px) {
          .sidebar { width: 72px; } .main-content { margin-left: 72px; }
          .nav-text, .nav-arrow, .nav-arrow-active { display: none; }
          .nav-item-content { justify-content: center; gap: 0; }
          .nav-item, .nav-item-active { justify-content: center; padding: 0.75rem; }
          .sidebar-bell { justify-content: center; padding: 1rem; }
          .form-grid-3 { grid-template-columns: repeat(2, 1fr); }
          .exams-grid { grid-template-columns: 1fr; } .exams-container { padding: 30px; }
        }
        @media (max-width: 768px) {
          .top-header { padding: 0 1.25rem; height: 72px; } .content-wrapper { margin-top: 72px; }
          .sidebar { top: 72px; width: 60px; } .main-content { margin-left: 60px; }
          .logo-truth, .logo-eye { font-size: 30px; } .logo-img { width: 46px; height: 46px; margin-right: 10px; }
          .user-name { display: none; } .user-avatar { width: 48px; height: 48px; }
          .profile-container { padding: 1.25rem; } .profile-title-row { flex-wrap: wrap; gap: 0.75rem; }
          .profile-title { font-size: 1.5rem; } .form-grid-3, .form-grid-2 { grid-template-columns: 1fr; }
          .profile-header { flex-direction: column; text-align: center; gap: 1rem; }
          .identity-status-container { justify-content: center; } .section-header { font-size: 20px; }
          .input-label { font-size: 16px; } .modal-content { padding: 1.5rem 1.25rem; } .modal-title { font-size: 1.4rem; }
          .modal-footer-actions { flex-direction: column; align-items: stretch; }
          .btn-suggest-outlined, .btn-update-solid { width: 100%; text-align: center; } .exams-container { padding: 20px; }
        }
        @media (max-width: 480px) {
          .top-header { padding: 0 0.75rem; height: 64px; } .content-wrapper { margin-top: 64px; }
          .sidebar { top: 64px; width: 52px; } .main-content { margin-left: 52px; }
          .logo-truth, .logo-eye { font-size: 22px; } .logo-img { width: 36px; height: 36px; margin-right: 6px; }
          .user-avatar { width: 40px; height: 40px; } .profile-container { padding: 1rem; }
          .profile-title { font-size: 1.25rem; } .profile-title-row { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
          .btn-logout { width: 100%; } .profile-img { width: 85px; height: 85px; }
          .profile-name { font-size: 18px; } .profile-id { font-size: 14px; } .identity-status-text { font-size: 13px; }
          .section-header { font-size: 17px; gap: 0.5rem; } .input-label { font-size: 14px; }
          .input-base { font-size: 14px; padding: 0.5rem 0.6rem; } .btn-change-password { max-width: 100%; font-size: 0.85rem; }
          .modal-overlay { padding: 0.75rem; } .modal-content { padding: 1.25rem 1rem; } .modal-title { font-size: 1.2rem; }
          .password-input { padding: 0.7rem 0.875rem; font-size: 0.9rem; }
          .btn-suggest-outlined, .btn-update-solid { font-size: 0.9rem; padding: 0.65rem 1rem; }
          .success-ui-text { font-size: 1.2rem; } .btn-ok-success { padding: 0.65rem 2rem; font-size: 1rem; }
          .exams-container { padding: 12px; } .exam-card-title { font-size: 16px; } .btn-start-exam { width: 100%; }
        }
        @media (max-width: 360px) {
          .sidebar { width: 44px; } .main-content { margin-left: 44px; }
          .nav-item, .nav-item-active { padding: 0.6rem; }
          .logo-truth, .logo-eye { font-size: 18px; } .logo-img { width: 30px; height: 30px; margin-right: 4px; }
        }
      `}</style>

      <header className="top-header">
        <div className="header-left">
          <img src="/src/assets/Logo.png" alt="Logo" className="logo-img" />
          <div className="logo-text"><span className="logo-truth">Truth</span><span className="logo-eye">Eye</span></div>
        </div>
        <div className="header-right">
          <img src={studentData.img} alt="User Avatar" className="user-avatar" />
          <span className="user-name">{studentData.name}</span>
        </div>
      </header>

      <div className="content-wrapper">
        <aside className="sidebar">
          <div className="sidebar-bell" onClick={() => setActivePage('notifications')}>
            <div className="bell-container">
              <Bell size={24} color={activePage === 'notifications' ? '#F3B300' : '#FFFAFA'} />
              <span className="bell-badge"></span>
            </div>
          </div>
          <nav className="sidebar-nav">
            <NavItem icon={<User size={20}/>} label="Profile" active={activePage === 'profile'} onClick={() => setActivePage('profile')} />
            <NavItem icon={<BookOpen size={20}/>} label="Exams" active={activePage === 'exams'} onClick={() => setActivePage('exams')} />
            <NavItem icon={<Clock size={20}/>} label="History" active={activePage === 'history'} onClick={() => setActivePage('history')} />
            <NavItem icon={<MessageSquare size={20}/>} label="Chat" active={activePage === 'messages'} onClick={() => setActivePage('messages')} />
          </nav>
        </aside>

        {activePage === 'notifications' && <NotificationsPage />}
        {activePage === 'profile' && <ProfilePage />}
        {activePage === 'exams' && <ExamsPage onStartExam={() => setIsExamActive(true)} />}
        {activePage === 'history' && <HistoryPage />}
        {activePage === 'messages' && <MessagesPage />}
      </div>
    </div>
  );
}
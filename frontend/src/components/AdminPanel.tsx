import { useState } from "react";
import { Plus, Edit2, Trash2, X, Save, Shield, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import {
  useAddAnnouncement,
  useRemoveAnnouncement,
  useAddOrUpdateRosterMember,
  useRemoveRosterMember,
  useAnnouncements,
  useRoster,
} from "../hooks/useQueries";
import type { Announcement, RosterMember } from "../backend";

export default function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"roster" | "news">("roster");

  // Roster state
  const [editingMember, setEditingMember] = useState<RosterMember | null>(null);
  const [memberForm, setMemberForm] = useState({ name: "", role: "", avatarUrl: "" });
  const [showMemberForm, setShowMemberForm] = useState(false);

  // News state
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [announcementForm, setAnnouncementForm] = useState({ title: "", body: "" });
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);

  const { data: rosterMembers = [] } = useRoster();
  const { data: announcements = [] } = useAnnouncements();

  const addMember = useAddOrUpdateRosterMember();
  const removeMember = useRemoveRosterMember();
  const addAnnouncement = useAddAnnouncement();
  const removeAnnouncement = useRemoveAnnouncement();

  // --- Roster handlers ---
  function openAddMember() {
    setEditingMember(null);
    setMemberForm({ name: "", role: "", avatarUrl: "" });
    setShowMemberForm(true);
  }

  function openEditMember(m: RosterMember) {
    setEditingMember(m);
    setMemberForm({ name: m.name, role: m.role, avatarUrl: m.avatarUrl });
    setShowMemberForm(true);
  }

  function cancelMemberForm() {
    setShowMemberForm(false);
    setEditingMember(null);
    setMemberForm({ name: "", role: "", avatarUrl: "" });
  }

  async function saveMember() {
    if (!memberForm.name.trim() || !memberForm.role.trim()) return;
    await addMember.mutateAsync({
      name: memberForm.name.trim(),
      role: memberForm.role.trim(),
      avatarUrl: memberForm.avatarUrl.trim(),
    });
    cancelMemberForm();
  }

  async function deleteMember(name: string) {
    if (!confirm(`"${name}" کو ہٹانا چاہتے ہیں؟`)) return;
    await removeMember.mutateAsync(name);
  }

  // --- Announcement handlers ---
  function openAddAnnouncement() {
    setEditingAnnouncement(null);
    setAnnouncementForm({ title: "", body: "" });
    setShowAnnouncementForm(true);
  }

  function openEditAnnouncement(a: Announcement) {
    setEditingAnnouncement(a);
    setAnnouncementForm({ title: a.title, body: a.body });
    setShowAnnouncementForm(true);
  }

  function cancelAnnouncementForm() {
    setShowAnnouncementForm(false);
    setEditingAnnouncement(null);
    setAnnouncementForm({ title: "", body: "" });
  }

  async function saveAnnouncement() {
    if (!announcementForm.title.trim() || !announcementForm.body.trim()) return;
    if (editingAnnouncement) {
      await removeAnnouncement.mutateAsync(editingAnnouncement.title);
    }
    await addAnnouncement.mutateAsync({
      title: announcementForm.title.trim(),
      body: announcementForm.body.trim(),
    });
    cancelAnnouncementForm();
  }

  async function deleteAnnouncement(title: string) {
    if (!confirm(`"${title}" کو ہٹانا چاہتے ہیں؟`)) return;
    await removeAnnouncement.mutateAsync(title);
  }

  const isSavingMember = addMember.isPending;
  const isSavingAnnouncement = addAnnouncement.isPending || removeAnnouncement.isPending;

  const inputStyle: React.CSSProperties = {
    background: "oklch(0.1 0.02 260)",
    border: "1px solid oklch(0.4 0.05 260)",
  };

  return (
    <>
      {/* Floating Admin Toggle Button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full font-bold text-white shadow-lg transition-all duration-300"
        style={{
          background: "linear-gradient(135deg, oklch(0.55 0.22 25), oklch(0.45 0.18 25))",
          boxShadow: "0 0 20px oklch(0.55 0.22 25 / 0.7), 0 4px 15px rgba(0,0,0,0.5)",
          border: "1px solid oklch(0.65 0.22 25 / 0.6)",
        }}
        aria-label="Admin Panel"
      >
        <Shield size={18} />
        <span className="text-sm">Admin</span>
        {isOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
      </button>

      {/* Admin Panel Drawer */}
      {isOpen && (
        <div
          className="fixed bottom-20 right-4 z-50 w-[min(420px,calc(100vw-2rem))] max-h-[75vh] flex flex-col rounded-2xl overflow-hidden"
          style={{
            background: "oklch(0.12 0.02 260)",
            border: "1px solid oklch(0.55 0.22 25 / 0.5)",
            boxShadow: "0 0 40px oklch(0.55 0.22 25 / 0.3), 0 20px 60px rgba(0,0,0,0.8)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-5 py-4 shrink-0"
            style={{
              background: "linear-gradient(90deg, oklch(0.55 0.22 25 / 0.2), oklch(0.65 0.18 60 / 0.1))",
              borderBottom: "1px solid oklch(0.55 0.22 25 / 0.3)",
            }}
          >
            <div className="flex items-center gap-2">
              <Shield size={18} style={{ color: "oklch(0.75 0.18 60)" }} />
              <span className="font-bold text-white text-base tracking-wide">Admin Panel</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg transition-colors hover:bg-white/10 text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex shrink-0" style={{ borderBottom: "1px solid oklch(0.55 0.22 25 / 0.2)" }}>
            {(["roster", "news"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex-1 py-3 text-sm font-semibold transition-all duration-200"
                style={
                  activeTab === tab
                    ? {
                        color: "oklch(0.75 0.18 60)",
                        borderBottom: "2px solid oklch(0.75 0.18 60)",
                        background: "oklch(0.75 0.18 60 / 0.08)",
                      }
                    : { color: "oklch(0.6 0.05 260)", borderBottom: "2px solid transparent" }
                }
              >
                {tab === "roster" ? "🎮 Roster" : "📢 News"}
              </button>
            ))}
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* ===== ROSTER TAB ===== */}
            {activeTab === "roster" && (
              <>
                {/* Add Member Button */}
                {!showMemberForm && (
                  <button
                    onClick={openAddMember}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 active:scale-95"
                    style={{
                      background: "linear-gradient(135deg, oklch(0.55 0.22 25), oklch(0.45 0.18 25))",
                      color: "white",
                      border: "1px solid oklch(0.65 0.22 25 / 0.5)",
                      boxShadow: "0 0 12px oklch(0.55 0.22 25 / 0.4)",
                    }}
                  >
                    <Plus size={16} />
                    نیا کھلاڑی شامل کریں
                  </button>
                )}

                {/* Member Form */}
                {showMemberForm && (
                  <div
                    className="rounded-xl p-4 space-y-3"
                    style={{
                      background: "oklch(0.16 0.03 260)",
                      border: "1px solid oklch(0.55 0.22 25 / 0.4)",
                    }}
                  >
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "oklch(0.75 0.18 60)" }}>
                      {editingMember ? "کھلاڑی ترمیم کریں" : "نیا کھلاڑی"}
                    </p>
                    <input
                      className="w-full px-3 py-2 rounded-lg text-sm text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-red-500"
                      style={inputStyle}
                      placeholder="نام (Name)"
                      value={memberForm.name}
                      onChange={(e) => setMemberForm((f) => ({ ...f, name: e.target.value }))}
                      disabled={!!editingMember}
                    />
                    <input
                      className="w-full px-3 py-2 rounded-lg text-sm text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-red-500"
                      style={inputStyle}
                      placeholder="کردار (Role) e.g. IGL, Fragger"
                      value={memberForm.role}
                      onChange={(e) => setMemberForm((f) => ({ ...f, role: e.target.value }))}
                    />
                    <input
                      className="w-full px-3 py-2 rounded-lg text-sm text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-red-500"
                      style={inputStyle}
                      placeholder="Avatar URL (اختیاری)"
                      value={memberForm.avatarUrl}
                      onChange={(e) => setMemberForm((f) => ({ ...f, avatarUrl: e.target.value }))}
                    />
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={saveMember}
                        disabled={isSavingMember || !memberForm.name.trim() || !memberForm.role.trim()}
                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          background: "linear-gradient(135deg, oklch(0.55 0.22 25), oklch(0.45 0.18 25))",
                          color: "white",
                          boxShadow: "0 0 10px oklch(0.55 0.22 25 / 0.4)",
                        }}
                      >
                        {isSavingMember ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                        محفوظ کریں
                      </button>
                      <button
                        onClick={cancelMemberForm}
                        className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:text-white transition-colors"
                        style={{ background: "oklch(0.2 0.03 260)", border: "1px solid oklch(0.3 0.03 260)" }}
                      >
                        منسوخ
                      </button>
                    </div>
                  </div>
                )}

                {/* Member List */}
                {rosterMembers.length === 0 ? (
                  <p className="text-center text-sm py-4" style={{ color: "oklch(0.5 0.05 260)" }}>
                    ابھی کوئی کھلاڑی نہیں
                  </p>
                ) : (
                  rosterMembers.map((m) => (
                    <div
                      key={m.name}
                      className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl"
                      style={{
                        background: "oklch(0.16 0.03 260)",
                        border: "1px solid oklch(0.3 0.04 260)",
                      }}
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-white truncate">{m.name}</p>
                        <p className="text-xs truncate" style={{ color: "oklch(0.65 0.12 60)" }}>
                          {m.role}
                        </p>
                      </div>
                      <div className="flex gap-1.5 shrink-0">
                        <button
                          onClick={() => openEditMember(m)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 active:scale-95"
                          style={{
                            background: "linear-gradient(135deg, oklch(0.65 0.18 60 / 0.2), oklch(0.65 0.18 60 / 0.1))",
                            color: "oklch(0.85 0.18 60)",
                            border: "1px solid oklch(0.65 0.18 60 / 0.5)",
                            boxShadow: "0 0 8px oklch(0.65 0.18 60 / 0.2)",
                          }}
                        >
                          <Edit2 size={11} />
                          Edit
                        </button>
                        <button
                          onClick={() => deleteMember(m.name)}
                          disabled={removeMember.isPending}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 active:scale-95 disabled:opacity-50"
                          style={{
                            background: "linear-gradient(135deg, oklch(0.55 0.22 25 / 0.2), oklch(0.45 0.18 25 / 0.1))",
                            color: "oklch(0.75 0.22 25)",
                            border: "1px solid oklch(0.55 0.22 25 / 0.5)",
                            boxShadow: "0 0 8px oklch(0.55 0.22 25 / 0.2)",
                          }}
                        >
                          {removeMember.isPending ? <Loader2 size={11} className="animate-spin" /> : <Trash2 size={11} />}
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </>
            )}

            {/* ===== NEWS TAB ===== */}
            {activeTab === "news" && (
              <>
                {/* Add Announcement Button */}
                {!showAnnouncementForm && (
                  <button
                    onClick={openAddAnnouncement}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 active:scale-95"
                    style={{
                      background: "linear-gradient(135deg, oklch(0.55 0.22 25), oklch(0.45 0.18 25))",
                      color: "white",
                      border: "1px solid oklch(0.65 0.22 25 / 0.5)",
                      boxShadow: "0 0 12px oklch(0.55 0.22 25 / 0.4)",
                    }}
                  >
                    <Plus size={16} />
                    نئی خبر شامل کریں
                  </button>
                )}

                {/* Announcement Form */}
                {showAnnouncementForm && (
                  <div
                    className="rounded-xl p-4 space-y-3"
                    style={{
                      background: "oklch(0.16 0.03 260)",
                      border: "1px solid oklch(0.55 0.22 25 / 0.4)",
                    }}
                  >
                    <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "oklch(0.75 0.18 60)" }}>
                      {editingAnnouncement ? "خبر ترمیم کریں" : "نئی خبر"}
                    </p>
                    <input
                      className="w-full px-3 py-2 rounded-lg text-sm text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-red-500"
                      style={inputStyle}
                      placeholder="عنوان (Title)"
                      value={announcementForm.title}
                      onChange={(e) => setAnnouncementForm((f) => ({ ...f, title: e.target.value }))}
                    />
                    <textarea
                      className="w-full px-3 py-2 rounded-lg text-sm text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-red-500 resize-none"
                      style={inputStyle}
                      placeholder="تفصیل (Body)"
                      rows={3}
                      value={announcementForm.body}
                      onChange={(e) => setAnnouncementForm((f) => ({ ...f, body: e.target.value }))}
                    />
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={saveAnnouncement}
                        disabled={isSavingAnnouncement || !announcementForm.title.trim() || !announcementForm.body.trim()}
                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          background: "linear-gradient(135deg, oklch(0.55 0.22 25), oklch(0.45 0.18 25))",
                          color: "white",
                          boxShadow: "0 0 10px oklch(0.55 0.22 25 / 0.4)",
                        }}
                      >
                        {isSavingAnnouncement ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                        محفوظ کریں
                      </button>
                      <button
                        onClick={cancelAnnouncementForm}
                        className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-300 hover:text-white transition-colors"
                        style={{ background: "oklch(0.2 0.03 260)", border: "1px solid oklch(0.3 0.03 260)" }}
                      >
                        منسوخ
                      </button>
                    </div>
                  </div>
                )}

                {/* Announcement List */}
                {announcements.length === 0 ? (
                  <p className="text-center text-sm py-4" style={{ color: "oklch(0.5 0.05 260)" }}>
                    ابھی کوئی خبر نہیں
                  </p>
                ) : (
                  announcements.map((a) => (
                    <div
                      key={a.title}
                      className="flex items-start justify-between gap-3 px-3 py-2.5 rounded-xl"
                      style={{
                        background: "oklch(0.16 0.03 260)",
                        border: "1px solid oklch(0.3 0.04 260)",
                      }}
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-white truncate">{a.title}</p>
                        <p className="text-xs mt-0.5 line-clamp-2" style={{ color: "oklch(0.55 0.05 260)" }}>
                          {a.body}
                        </p>
                      </div>
                      <div className="flex gap-1.5 shrink-0 mt-0.5">
                        <button
                          onClick={() => openEditAnnouncement(a)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 active:scale-95"
                          style={{
                            background: "linear-gradient(135deg, oklch(0.65 0.18 60 / 0.2), oklch(0.65 0.18 60 / 0.1))",
                            color: "oklch(0.85 0.18 60)",
                            border: "1px solid oklch(0.65 0.18 60 / 0.5)",
                            boxShadow: "0 0 8px oklch(0.65 0.18 60 / 0.2)",
                          }}
                        >
                          <Edit2 size={11} />
                          Edit
                        </button>
                        <button
                          onClick={() => deleteAnnouncement(a.title)}
                          disabled={removeAnnouncement.isPending}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 active:scale-95 disabled:opacity-50"
                          style={{
                            background: "linear-gradient(135deg, oklch(0.55 0.22 25 / 0.2), oklch(0.45 0.18 25 / 0.1))",
                            color: "oklch(0.75 0.22 25)",
                            border: "1px solid oklch(0.55 0.22 25 / 0.5)",
                            boxShadow: "0 0 8px oklch(0.55 0.22 25 / 0.2)",
                          }}
                        >
                          {removeAnnouncement.isPending ? <Loader2 size={11} className="animate-spin" /> : <Trash2 size={11} />}
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

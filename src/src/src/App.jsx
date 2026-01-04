import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, Edit3, ArrowRight, Heart, Share2, X, Check, Coffee, Maximize2, Minimize2, PenTool, Volume2 } from 'lucide-react';

// --- MOCK DATA ---
const INITIAL_DEVOTIONAL = {
  title: "Walking in Quiet Trust",
  author: "Your Name",
  date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
  scripture: "Isaiah 30:15",
  scriptureText: "In returning and rest you shall be saved; in quietness and in trust shall be your strength.",
  body: "In a world that celebrates hustle and constant noise, the invitation to 'quietness' can feel counter-cultural. Yet, it is in the stillness that we often hear the voice that matters most. Today, try to find five minutes of absolute silence. Not to plan your day, but simply to be present. It is in this space of rest that we find the strength to face the chaos of the world."
};

const MOCK_RSS_FEED = [
  {
    id: 1,
    title: "The Art of Christian Hospitality",
    source: "Faith & Home",
    image: "[https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800](https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800)",
    excerpt: "How opening your door can open hearts in your community.",
    category: "Community"
  },
  {
    id: 2,
    title: "Understanding the Psalms of Lament",
    source: "Theology Today",
    image: "[https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=800](https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=800)",
    excerpt: "Why it is healthy and biblical to bring your sorrow to God.",
    category: "Bible Study"
  },
  {
    id: 3,
    title: "Morning Routines for Spiritual Growth",
    source: "Daily Grace",
    image: "[https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800](https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800)",
    excerpt: "Five small habits that transform your morning into worship.",
    category: "Lifestyle"
  },
  {
    id: 4,
    title: "History of the Early Church",
    source: "Christian History",
    image: "[https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=800](https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=800)",
    excerpt: "Exploring the lives of the desert fathers and mothers.",
    category: "History"
  },
];

// --- COMPONENTS ---

// 1. Loading Skeleton
const SkeletonLoader = () => (
  <div className="space-y-6 animate-pulse">
    <div className="h-64 bg-stone-200 rounded-xl w-full"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="h-48 bg-stone-200 rounded-lg"></div>
      <div className="h-48 bg-stone-200 rounded-lg"></div>
    </div>
  </div>
);

// 2. Admin Panel
const AdminPanel = ({ currentDevotional, onSave, onCancel }) => {
  const [formData, setFormData] = useState(currentDevotional);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    });
  };

  return (
    <div className="fixed inset-0 bg-stone-50/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-2xl w-full rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
        <div className="bg-[#4A5D4E] p-6 flex justify-between items-center text-white">
          <h2 className="font-serif text-2xl">Write Today's Devotional</h2>
          <button onClick={onCancel} className="hover:bg-white/20 p-2 rounded-full transition">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-stone-500 mb-1 uppercase tracking-wide">Title</label>
            <input 
              type="text" 
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full p-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-[#4A5D4E] focus:outline-none font-serif text-xl text-stone-800"
              placeholder="e.g., Walking in Light"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
              <label className="block text-sm font-medium text-stone-500 mb-1 uppercase tracking-wide">Author</label>
              <input 
                type="text" 
                value={formData.author}
                onChange={(e) => setFormData({...formData, author: e.target.value})}
                className="w-full p-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-[#4A5D4E] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-500 mb-1 uppercase tracking-wide">Scripture Ref</label>
              <input 
                type="text" 
                required
                value={formData.scripture}
                onChange={(e) => setFormData({...formData, scripture: e.target.value})}
                className="w-full p-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-[#4A5D4E] focus:outline-none"
                placeholder="e.g., John 3:16"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-500 mb-1 uppercase tracking-wide">Scripture Text</label>
            <textarea 
              required
              rows={2}
              value={formData.scriptureText}
              onChange={(e) => setFormData({...formData, scriptureText: e.target.value})}
              className="w-full p-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-[#4A5D4E] focus:outline-none italic text-stone-600"
              placeholder="Paste the verse text here..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-500 mb-1 uppercase tracking-wide">Devotional Body</label>
            <textarea 
              required
              rows={8}
              value={formData.body}
              onChange={(e) => setFormData({...formData, body: e.target.value})}
              className="w-full p-3 border border-stone-200 rounded-lg focus:ring-2 focus:ring-[#4A5D4E] focus:outline-none leading-relaxed text-lg"
              placeholder="Share your reflection..."
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={onCancel} className="px-6 py-2 text-stone-600 hover:bg-stone-100 rounded-lg transition">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-[#4A5D4E] text-white rounded-lg hover:bg-[#3A4A3E] transition flex items-center gap-2">
              <Check size={18} /> Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// 3. Main App Component
const App = () => {
  const [loading, setLoading] = useState(true);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [devotional, setDevotional] = useState(INITIAL_DEVOTIONAL);
  const [savedMessage, setSavedMessage] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [userReflection, setUserReflection] = useState("");

  // Load from local storage on mount
  useEffect(() => {
    // Simulate loading time for vibe
    setTimeout(() => {
      // 1. Load Admin Devotional
      const savedDevo = localStorage.getItem('dailybread_devotional');
      if (savedDevo) {
        setDevotional(JSON.parse(savedDevo));
      }
      // 2. Load User Reflection
      const savedReflection = localStorage.getItem('dailybread_reflection');
      if (savedReflection) {
        setUserReflection(savedReflection);
      }
      setLoading(false);
    }, 1200);
  }, []);

  const handleSaveDevotional = (newData) => {
    setDevotional(newData);
    localStorage.setItem('dailybread_devotional', JSON.stringify(newData));
    setIsAdminOpen(false);
    
    // Show quick success toast
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  const handleSaveReflection = (text) => {
    setUserReflection(text);
    localStorage.setItem('dailybread_reflection', text);
  };

  return (
    <div className={`min-h-screen bg-[#FDFCF8] text-[#2D3748] font-sans selection:bg-[#4A5D4E] selection:text-white transition-all duration-700 ${isFocusMode ? 'pb-0 overflow-hidden' : 'pb-20'}`}>
      
      {/* Navigation - Hidden in Focus Mode */}
      <nav className={`sticky top-0 z-40 bg-[#FDFCF8]/80 backdrop-blur-md border-b border-stone-100 transition-all duration-500 ${isFocusMode ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="text-[#4A5D4E]" size={24} />
            <span className="font-serif text-xl font-bold tracking-tight text-[#2D3748]">DailyBread</span>
          </div>
          <div className="flex items-center gap-3">
             <button 
              className="text-stone-400 hover:text-[#4A5D4E] transition p-2 rounded-full hover:bg-stone-100 hidden md:block"
              title="Ambient Sound (Demo)"
            >
              <Volume2 size={20} />
            </button>
            <button 
              onClick={() => setIsAdminOpen(true)}
              className="text-stone-400 hover:text-[#4A5D4E] transition p-2 rounded-full hover:bg-stone-100"
              title="Write Devotional (Admin)"
            >
              <Edit3 size={20} />
            </button>
            <div className="h-6 w-px bg-stone-200 mx-1"></div>
            <button 
              onClick={() => setIsFocusMode(true)}
              className="flex items-center gap-2 px-4 py-1.5 bg-[#4A5D4E]/10 text-[#4A5D4E] rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#4A5D4E] hover:text-white transition-all"
            >
               Sanctuary Mode <Maximize2 size={14} />
            </button>
          </div>
        </div>
      </nav>

      {/* Toast Notification */}
      {savedMessage && (
        <div className="fixed top-20 right-6 bg-[#4A5D4E] text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-down z-50 flex items-center gap-2">
          <Check size={16} /> Devotional Published
        </div>
      )}

      {/* Main Content */}
      <main className={`max-w-4xl mx-auto px-6 transition-all duration-700 ${isFocusMode ? 'pt-12 h-screen flex flex-col justify-center' : 'pt-8'}`}>
        
        {loading ? (
          <SkeletonLoader />
        ) : (
          <div className="space-y-12">
            
            {/* HERO SECTION: Today's Devotional */}
            <section className={`relative overflow-hidden bg-[#E8EDE9] rounded-2xl shadow-sm border border-[#D5DDD7] transition-all duration-700 ${isFocusMode ? 'p-8 md:p-16 scale-105 shadow-2xl' : 'p-8 md:p-12'}`}>
              
              {/* Exit Focus Button */}
              {isFocusMode && (
                <button 
                  onClick={() => setIsFocusMode(false)}
                  className="absolute top-6 right-6 p-2 bg-white/50 hover:bg-white text-stone-600 rounded-full transition-colors z-20"
                  title="Exit Sanctuary Mode"
                >
                  <Minimize2 size={20} />
                </button>
              )}

              {/* Decorative background element */}
              <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-10 text-[#4A5D4E]">
                <Coffee size={200} />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 text-[#4A5D4E] mb-6 text-sm font-medium tracking-wide uppercase">
                  <span className="bg-white/60 px-3 py-1 rounded-full">Today's Devotional</span>
                  <span className="flex items-center gap-1"><Calendar size={14} /> {devotional.date}</span>
                </div>

                <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1A202C] mb-6 leading-tight">
                  {devotional.title}
                </h1>

                <div className="bg-white/60 border-l-4 border-[#4A5D4E] p-6 rounded-r-lg mb-8 italic font-serif text-lg text-stone-700">
                  "{devotional.scriptureText}"
                  <div className="not-italic text-sm font-sans font-bold mt-2 text-[#4A5D4E]">— {devotional.scripture}</div>
                </div>

                <div className="prose prose-lg prose-stone max-w-none text-stone-600 leading-relaxed font-light">
                  {devotional.body.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-4">{paragraph}</p>
                  ))}
                </div>
                
                {/* User Journaling Section */}
                <div className="mt-8 pt-8 border-t border-[#4A5D4E]/10">
                    <h3 className="font-serif text-lg text-[#2D3748] mb-3 flex items-center gap-2">
                        <PenTool size={18} className="text-[#4A5D4E]"/> My Reflection
                    </h3>
                    <textarea 
                        value={userReflection}
                        onChange={(e) => handleSaveReflection(e.target.value)}
                        placeholder="Write your prayers or thoughts here..."
                        className="w-full bg-white/50 p-4 rounded-xl border border-stone-200 focus:ring-2 focus:ring-[#4A5D4E] focus:bg-white focus:outline-none transition-all resize-y min-h-[100px] text-stone-600 font-serif italic text-lg placeholder:text-stone-300 placeholder:not-italic"
                    />
                     <p className="text-xs text-stone-400 mt-2 text-right">
                        {userReflection.length > 0 ? "Saving automatically..." : "Private & local to your device"}
                     </p>
                </div>

                <div className={`mt-8 pt-8 flex items-center justify-between transition-opacity duration-500 ${isFocusMode ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 border-t border-[#4A5D4E]/10'}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#4A5D4E] rounded-full flex items-center justify-center text-white font-serif font-bold text-lg">
                      {devotional.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-stone-800">{devotional.author}</p>
                      <p className="text-xs text-stone-500">Curator</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="p-2 text-stone-400 hover:text-red-500 transition"><Heart size={20} /></button>
                    <button className="p-2 text-stone-400 hover:text-[#4A5D4E] transition"><Share2 size={20} /></button>
                  </div>
                </div>
              </div>
            </section>

            {/* FEED SECTION: RSS Aggregation (Hidden in Focus Mode) */}
            <section className={`transition-all duration-700 ${isFocusMode ? 'opacity-0 pointer-events-none translate-y-20 h-0 overflow-hidden' : 'opacity-100 translate-y-0'}`}>
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-serif text-2xl font-bold text-[#2D3748]">Christian Perspectives</h2>
                <span className="text-xs font-medium text-stone-400 uppercase tracking-widest">Curated Feed</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {MOCK_RSS_FEED.map((item) => (
                  <article key={item.id} className="group bg-white rounded-xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-md transition-shadow duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-[#4A5D4E] rounded-full">
                        {item.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="text-xs text-stone-400 font-medium mb-2 uppercase tracking-wide">{item.source}</div>
                      <h3 className="font-serif text-xl font-bold text-[#2D3748] mb-3 leading-snug group-hover:text-[#4A5D4E] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-stone-500 text-sm leading-relaxed mb-6">
                        {item.excerpt}
                      </p>
                      <button className="text-[#4A5D4E] font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read Article <ArrowRight size={16} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <button className="px-8 py-3 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-full font-medium transition text-sm">
                  Load More Content
                </button>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer (Hidden in Focus Mode) */}
      <footer className={`mt-20 border-t border-stone-200 py-12 bg-white transition-all duration-500 ${isFocusMode ? 'opacity-0 hidden' : 'opacity-100 block'}`}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <BookOpen className="text-[#4A5D4E] mx-auto mb-4" size={24} />
          <p className="text-stone-500 text-sm mb-2">DailyBread © {new Date().getFullYear()}</p>
          <p className="text-stone-400 text-xs">A space for quiet reflection.</p>
        </div>
      </footer>

      {/* Admin Modal */}
      {isAdminOpen && (
        <AdminPanel 
          currentDevotional={devotional} 
          onSave={handleSaveDevotional} 
          onCancel={() => setIsAdminOpen(false)} 
        />
      )}
    </div>
  );
};

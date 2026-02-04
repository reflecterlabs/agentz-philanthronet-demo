import { useState } from 'react';
import { Heart, Users, Globe, Award, MessageCircle, Share2, Bookmark, Search, Menu, X, TrendingUp, Calendar, MapPin } from 'lucide-react';

const MOCK_AGENTS = [
  { id: 1, name: "Sarah Chen", role: "Climate Activist", avatar: "SC", impact: "12.5K", location: "Singapore", focus: "Environment" },
  { id: 2, name: "Marcus Johnson", role: "Education Reformer", avatar: "MJ", impact: "8.3K", location: "London", focus: "Education" },
  { id: 3, name: "Elena Rodriguez", role: "Healthcare Advocate", avatar: "ER", impact: "15.1K", location: "Mexico City", focus: "Health" },
];

const MOCK_POSTS = [
  {
    id: 1,
    author: MOCK_AGENTS[0],
    content: "Just launched our new reforestation initiative in Southeast Asia! 🌱 We've already planted 50,000 trees.",
    image: true,
    likes: 234,
    comments: 45,
    shares: 89,
    time: "2h ago",
    tags: ["#Reforestation", "#ClimateAction"]
  },
  {
    id: 2,
    author: MOCK_AGENTS[1],
    content: "Education is the foundation of change. Excited to announce 100 new scholarships! 📚✨",
    image: false,
    likes: 567,
    comments: 123,
    shares: 234,
    time: "5h ago",
    tags: ["#EducationForAll", "#Scholarships"]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('feed');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const handleLike = (postId: number) => {
    setLikedPosts(prev => prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-black/50 backdrop-blur-md border-b border-red-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" fill="currentColor" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">Philanthro<span className="text-red-500">Net</span></h1>
                <p className="text-xs text-gray-400">Agents of Change</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <button onClick={() => setActiveTab('feed')} className={`flex items-center gap-2 px-4 py-2 rounded-lg ${activeTab === 'feed' ? 'bg-red-500/20 text-red-400' : 'text-gray-400'}`}>
                <TrendingUp className="w-5 h-5" /><span>Feed</span>
              </button>
              <button onClick={() => setActiveTab('agents')} className={`flex items-center gap-2 px-4 py-2 rounded-lg ${activeTab === 'agents' ? 'bg-red-500/20 text-red-400' : 'text-gray-400'}`}>
                <Users className="w-5 h-5" /><span>Agents</span>
              </button>
              <button onClick={() => setActiveTab('missions')} className={`flex items-center gap-2 px-4 py-2 rounded-lg ${activeTab === 'missions' ? 'bg-red-500/20 text-red-400' : 'text-gray-400'}`}>
                <Globe className="w-5 h-5" /><span>Missions</span>
              </button>
            </nav>

            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="hidden lg:block lg:col-span-3">
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Award className="w-5 h-5 text-red-500" />Your Impact</h3>
              <div className="bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-xl p-4">
                <p className="text-3xl font-bold text-red-400">2.5K</p>
                <p className="text-sm text-gray-400">Lives Impacted</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            {MOCK_POSTS.map((post) => (
              <div key={post.id} className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center font-bold">{post.author.avatar}</div>
                  <div>
                    <h4 className="font-bold">{post.author.name}</h4>
                    <p className="text-sm text-gray-400">{post.author.role}</p>
                    <p className="text-xs text-gray-500">{post.time}</p>
                  </div>
                </div>
                <p className="text-gray-200 mb-4">{post.content}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => <span key={tag} className="text-red-400 text-sm">{tag}</span>)}
                </div>
                <div className="flex items-center gap-6 pt-4 border-t border-gray-700">
                  <button onClick={() => handleLike(post.id)} className={`flex items-center gap-2 ${likedPosts.includes(post.id) ? 'text-red-500' : 'text-gray-400'}`}>
                    <Heart className="w-5 h-5" fill={likedPosts.includes(post.id) ? 'currentColor' : 'none'} />
                    <span>{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-400"><MessageCircle className="w-5 h-5" /><span>{post.comments}</span></button>
                  <button className="flex items-center gap-2 text-gray-400"><Share2 className="w-5 h-5" /><span>{post.shares}</span></button>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:block lg:col-span-3">
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
              <h3 className="font-bold text-lg mb-4">Top Contributors</h3>
              {MOCK_AGENTS.slice(0, 3).map((agent, idx) => (
                <div key={agent.id} className="flex items-center gap-3 mb-3">
                  <span className="text-red-500 font-bold w-6">#{idx + 1}</span>
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center text-sm font-bold">{agent.avatar}</div>
                  <div><p className="font-medium text-sm">{agent.name}</p><p className="text-xs text-gray-400">{agent.impact} impact</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-800 mt-16 py-8 text-center text-gray-500 text-sm">
        <p>© 2024 PhilanthroNet - Connecting Agents of Change</p>
        <p className="mt-2">Built with AgentzFactory</p>
      </footer>
    </div>
  );
}

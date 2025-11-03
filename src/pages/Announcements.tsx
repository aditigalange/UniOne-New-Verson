import { useState, useEffect } from 'react';
import { Bell, Calendar, User, AlertCircle } from 'lucide-react';
import { collection, query, orderBy, getDocs, addDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import FirebaseWarning from '../components/FirebaseWarning';

interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: any;
  priority: 'high' | 'medium' | 'low';
}

export default function Announcements() {
  const { user, userProfile } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    priority: 'medium' as 'high' | 'medium' | 'low'
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    if (!db) {
      toast.error('Firebase not configured. Cannot load announcements.');
      setLoading(false);
      return;
    }
    try {
      const q = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const announcementList: Announcement[] = [];
      querySnapshot.forEach((doc) => {
        announcementList.push({ id: doc.id, ...doc.data() } as Announcement);
      });
      setAnnouncements(announcementList);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      toast.error('Failed to load announcements. Make sure Firebase is configured.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) {
      toast.error('Firebase not configured. Cannot create announcements.');
      return;
    }
    if (!user) {
      toast.error('Please login to create announcements');
      return;
    }

    try {
      await addDoc(collection(db, 'announcements'), {
        title: newAnnouncement.title,
        content: newAnnouncement.content,
        priority: newAnnouncement.priority,
        author: userProfile?.name || user.email || 'Unknown',
        createdAt: Timestamp.now()
      });

      toast.success('Announcement created successfully!');
      setNewAnnouncement({ title: '', content: '', priority: 'medium' });
      setShowForm(false);
      fetchAnnouncements();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create announcement');
    }
  };

  const handleDelete = async (id: string) => {
    if (!db) {
      toast.error('Firebase not configured.');
      return;
    }
    if (!confirm('Are you sure you want to delete this announcement?')) return;

    try {
      await deleteDoc(doc(db, 'announcements', id));
      toast.success('Announcement deleted');
      fetchAnnouncements();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete');
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Unknown date';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border-red-300 dark:border-red-700';
      case 'medium':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 border-yellow-300 dark:border-yellow-700';
      default:
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700';
    }
  };

  const unreadCount = announcements.filter(a => {
    const date = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
    const daysSince = (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24);
    return daysSince <= 7;
  }).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <Bell className="w-8 h-8 text-primary-dark dark:text-primary-light" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Announcements
            </h1>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Stay updated with latest news and important information
          </p>
        </div>
        {!db && <FirebaseWarning />}
        {user ? (
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary-dark dark:bg-primary-light text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            {showForm ? 'Cancel' : '+ New Announcement'}
          </button>
        ) : (
          <a
            href="/login"
            className="bg-primary-dark dark:bg-primary-light text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity inline-block"
          >
            Login to Post
          </a>
        )}
      </div>

      {showForm && user && (
        <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Create New Announcement
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={newAnnouncement.title}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Announcement title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content *
              </label>
              <textarea
                value={newAnnouncement.content}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Announcement details..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Priority
              </label>
              <select
                value={newAnnouncement.priority}
                onChange={(e) => setNewAnnouncement({ ...newAnnouncement, priority: e.target.value as any })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-primary-dark dark:bg-primary-light text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Publish Announcement
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark dark:border-primary-light mx-auto"></div>
        </div>
      ) : announcements.length === 0 ? (
        <div className="text-center py-12 bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-700">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">No announcements yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {announcements.map((announcement) => {
            const isNew = (() => {
              const date = announcement.createdAt?.toDate ? announcement.createdAt.toDate() : new Date(announcement.createdAt);
              const daysSince = (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24);
              return daysSince <= 7;
            })();

            return (
              <div
                key={announcement.id}
                className={`bg-surface-light dark:bg-surface-dark rounded-xl p-6 border-2 ${
                  isNew ? 'border-primary-dark dark:border-primary-light' : 'border-gray-200 dark:border-gray-700'
                } hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(announcement.priority)}`}>
                      {announcement.priority.toUpperCase()}
                    </div>
                    {isNew && (
                      <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        NEW
                      </span>
                    )}
                  </div>
                  {user && (user.email === announcement.author || userProfile?.name === announcement.author) && (
                    <button
                      onClick={() => handleDelete(announcement.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {announcement.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 whitespace-pre-wrap">
                  {announcement.content}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{announcement.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(announcement.createdAt)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
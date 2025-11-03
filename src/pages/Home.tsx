import { BookOpen, FileText, Bell, TrendingUp, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { userProfile } = useAuth();

  const stats = [
    { icon: BookOpen, label: 'PYQs Available', value: '150+', color: 'text-blue-500' },
    { icon: FileText, label: 'Smart Notes', value: '45+', color: 'text-green-500' },
    { icon: Bell, label: 'Announcements', value: '12', color: 'text-yellow-500' },
    { icon: Users, label: 'Active Students', value: '2.5K+', color: 'text-purple-500' },
  ];

  const quickActions = [
    { 
      title: 'Previous Year Questions', 
      description: 'Access past exam papers and solutions',
      icon: BookOpen,
      path: '/pyqs',
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      title: 'Smart Notes', 
      description: 'Interactive notes and study materials',
      icon: FileText,
      path: '/notes',
      gradient: 'from-green-500 to-emerald-500'
    },
    { 
      title: 'Announcements', 
      description: 'Stay updated with latest news',
      icon: Bell,
      path: '/announcements',
      gradient: 'from-yellow-500 to-orange-500'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-dark to-accent-dark dark:from-primary-light dark:to-accent-light rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Welcome back, {userProfile?.name || 'Student'}! 👋
        </h1>
        <p className="text-white/90 text-lg">
          {userProfile?.department} • {userProfile?.year} Year
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
            >
              <Icon className={`w-8 h-8 ${stat.color} mb-3`} />
              <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={index}
                to={action.path}
                className="group bg-surface-light dark:bg-surface-dark rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${action.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {action.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {action.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Recent Activity</h2>
          <TrendingUp className="w-5 h-5 text-primary-dark dark:text-primary-light" />
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
            <Award className="w-5 h-5 text-yellow-500" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                New PYQ added: Data Structures
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
            <Bell className="w-5 h-5 text-blue-500" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Exam schedule announced
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


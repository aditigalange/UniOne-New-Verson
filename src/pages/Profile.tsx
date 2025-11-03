import { useState } from 'react';
import { User, Edit2, Save, X, Download, Mail, GraduationCap, Calendar, Hash } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function Profile() {
  const { userProfile, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: userProfile?.name || '',
    department: userProfile?.department || '',
    year: userProfile?.year || '',
    studentId: userProfile?.studentId || ''
  });

  const handleSave = async () => {
    try {
      await updateProfile(editedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleCancel = () => {
    setEditedProfile({
      name: userProfile?.name || '',
      department: userProfile?.department || '',
      year: userProfile?.year || '',
      studentId: userProfile?.studentId || ''
    });
    setIsEditing(false);
  };

  const generateDigitalID = () => {
    return {
      name: userProfile?.name || 'Student',
      studentId: userProfile?.studentId || 'N/A',
      department: userProfile?.department || 'N/A',
      year: userProfile?.year || 'N/A',
      email: userProfile?.email || 'N/A'
    };
  };

  const downloadDigitalID = () => {
    const idData = generateDigitalID();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 500;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#8B4513');
    gradient.addColorStop(1, '#D4AF37');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('UNI ONE', canvas.width / 2, 60);
    
    ctx.font = '24px Arial';
    ctx.fillText('STUDENT IDENTIFICATION CARD', canvas.width / 2, 100);

    ctx.font = 'bold 32px Arial';
    ctx.fillText(idData.name, canvas.width / 2, 200);
    
    ctx.font = '20px Arial';
    ctx.fillText(`Student ID: ${idData.studentId}`, canvas.width / 2, 250);
    ctx.fillText(`Department: ${idData.department}`, canvas.width / 2, 290);
    ctx.fillText(`Year: ${idData.year}`, canvas.width / 2, 330);
    ctx.fillText(`Email: ${idData.email}`, canvas.width / 2, 370);

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `UniOne-ID-${idData.studentId}.png`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Digital ID downloaded!');
      }
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account information
          </p>
        </div>
        <button
          onClick={logout}
          className="px-4 py-2 text-red-600 dark:text-red-400 border border-red-600 dark:border-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-dark to-accent-dark dark:from-primary-light dark:to-accent-light rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {userProfile?.name || 'Student'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{userProfile?.email}</p>
            </div>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-primary-dark dark:bg-primary-light text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              <Edit2 className="w-4 h-4" />
              <span>Edit</span>
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-primary-dark dark:text-primary-light mt-1" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedProfile.name}
                    disabled
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-gray-100">{userProfile?.email}</p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <User className="w-5 h-5 text-primary-dark dark:text-primary-light mt-1" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-gray-100">{userProfile?.name || 'Not set'}</p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <GraduationCap className="w-5 h-5 text-primary-dark dark:text-primary-light mt-1" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Department
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.department}
                    onChange={(e) => setEditedProfile({ ...editedProfile, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-gray-100">{userProfile?.department || 'Not set'}</p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-primary-dark dark:text-primary-light mt-1" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Year
                </label>
                {isEditing ? (
                  <select
                    value={editedProfile.year}
                    onChange={(e) => setEditedProfile({ ...editedProfile, year: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  >
                    <option value="">Select Year</option>
                    <option value="1st">1st Year</option>
                    <option value="2nd">2nd Year</option>
                    <option value="3rd">3rd Year</option>
                    <option value="4th">4th Year</option>
                  </select>
                ) : (
                  <p className="text-gray-900 dark:text-gray-100">{userProfile?.year || 'Not set'}</p>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-3 md:col-span-2">
              <Hash className="w-5 h-5 text-primary-dark dark:text-primary-light mt-1" />
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Student ID
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile.studentId}
                    onChange={(e) => setEditedProfile({ ...editedProfile, studentId: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-gray-100">{userProfile?.studentId || 'Not set'}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Digital ID Card */}
      <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Digital Student ID
          </h3>
          <button
            onClick={downloadDigitalID}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-dark dark:bg-primary-light text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            <Download className="w-4 h-4" />
            <span>Download ID</span>
          </button>
        </div>
        <div className="bg-gradient-to-br from-primary-dark to-accent-dark dark:from-primary-light dark:to-accent-light rounded-lg p-8 text-white">
          <div className="text-center mb-6">
            <h4 className="text-3xl font-bold mb-2">UNI ONE</h4>
            <p className="text-white/80">STUDENT IDENTIFICATION CARD</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-3">
            <div>
              <p className="text-sm text-white/80 mb-1">Name</p>
              <p className="text-xl font-semibold">{userProfile?.name || 'Student Name'}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-white/80 mb-1">Student ID</p>
                <p className="text-lg font-medium">{userProfile?.studentId || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-white/80 mb-1">Year</p>
                <p className="text-lg font-medium">{userProfile?.year || 'N/A'}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-white/80 mb-1">Department</p>
              <p className="text-lg font-medium">{userProfile?.department || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-white/80 mb-1">Email</p>
              <p className="text-lg font-medium">{userProfile?.email || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

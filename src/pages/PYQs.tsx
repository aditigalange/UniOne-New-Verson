import { useState, useEffect } from 'react';
import { Upload, Download, Search, FileText, MessageCircle } from 'lucide-react';
import { collection, query, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import FirebaseWarning from '../components/FirebaseWarning';
import toast from 'react-hot-toast';
import AIChatbot from '../components/AIChatbot';

interface PYQItem {
  id: string;
  title: string;
  subject: string;
  year: string;
  semester: string;
  downloadUrl: string;
  uploadedBy: string;
  uploadedAt: string;
  fileName: string;
}

export default function PYQs() {
  const { user } = useAuth();
  const [pyqs, setPYQs] = useState<PYQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploading, setUploading] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    subject: '',
    year: '',
    semester: ''
  });

  useEffect(() => {
    fetchPYQs();
  }, []);

  const fetchPYQs = async () => {
    if (!db) {
      toast.error('Firebase not configured. Cannot load PYQs.');
      setLoading(false);
      return;
    }
    try {
      const q = query(collection(db, 'pyqs'));
      const querySnapshot = await getDocs(q);
      const pyqList: PYQItem[] = [];
      querySnapshot.forEach((doc) => {
        pyqList.push({ id: doc.id, ...doc.data() } as PYQItem);
      });
      setPYQs(pyqList.sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt)));
    } catch (error) {
      console.error('Error fetching PYQs:', error);
      toast.error('Failed to load PYQs. Make sure Firebase is configured.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storage || !db) {
      toast.error('Firebase not configured. Cannot upload files.');
      return;
    }
    if (!selectedFile || !user) {
      toast.error('Please select a file and make sure you are logged in');
      return;
    }

    if (!uploadForm.title || !uploadForm.subject || !uploadForm.year) {
      toast.error('Please fill all required fields');
      return;
    }

    setUploading(true);
    try {
      const fileRef = ref(storage, `pyqs/${Date.now()}_${selectedFile.name}`);
      await uploadBytes(fileRef, selectedFile);
      const downloadUrl = await getDownloadURL(fileRef);

      await addDoc(collection(db, 'pyqs'), {
        title: uploadForm.title,
        subject: uploadForm.subject,
        year: uploadForm.year,
        semester: uploadForm.semester || 'N/A',
        downloadUrl,
        fileName: selectedFile.name,
        uploadedBy: user.email || 'Anonymous',
        uploadedAt: new Date().toISOString()
      });

      toast.success('PYQ uploaded successfully!');
      setSelectedFile(null);
      setUploadForm({ title: '', subject: '', year: '', semester: '' });
      (document.getElementById('file-input') as HTMLInputElement).value = '';
      fetchPYQs();
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Upload failed. Check Firebase configuration.');
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (pyq: PYQItem) => {
    try {
      window.open(pyq.downloadUrl, '_blank');
      toast.success('Download started');
    } catch (error) {
      toast.error('Download failed');
    }
  };

  const filteredPYQs = pyqs.filter(pyq =>
    pyq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pyq.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pyq.year.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Previous Year Questions
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Access past exam papers and solutions
          </p>
        </div>
        <button
          onClick={() => setShowChatbot(!showChatbot)}
          className="flex items-center space-x-2 bg-primary-dark dark:bg-primary-light text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          <MessageCircle className="w-5 h-5" />
          <span>AI Assistant</span>
        </button>
      </div>

      {showChatbot && (
        <div className="mb-6">
          <AIChatbot context="PYQs" onClose={() => setShowChatbot(false)} />
        </div>
      )}

      {!db && <FirebaseWarning />}

      {/* Upload Form */}
      <div className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Upload New PYQ
        </h2>
        {!user && (
          <div className="mb-4 p-3 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              Please <a href="/login" className="underline font-medium">login</a> to upload PYQs
            </p>
          </div>
        )}
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={uploadForm.title}
                onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="e.g., Final Exam 2023"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject *
              </label>
              <input
                type="text"
                value={uploadForm.subject}
                onChange={(e) => setUploadForm({ ...uploadForm, subject: e.target.value })}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="e.g., Data Structures"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Year *
              </label>
              <input
                type="text"
                value={uploadForm.year}
                onChange={(e) => setUploadForm({ ...uploadForm, year: e.target.value })}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="e.g., 2023"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Semester
              </label>
              <select
                value={uploadForm.semester}
                onChange={(e) => setUploadForm({ ...uploadForm, semester: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="">Select Semester</option>
                <option value="1">Semester 1</option>
                <option value="2">Semester 2</option>
                <option value="3">Semester 3</option>
                <option value="4">Semester 4</option>
                <option value="5">Semester 5</option>
                <option value="6">Semester 6</option>
                <option value="7">Semester 7</option>
                <option value="8">Semester 8</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              PDF File *
            </label>
            <input
              id="file-input"
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              required
              disabled={!user}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={uploading || !user}
            className="bg-primary-dark dark:bg-primary-light text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Upload className="w-5 h-5" />
            <span>{uploading ? 'Uploading...' : 'Upload PYQ'}</span>
          </button>
        </form>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title, subject, or year..."
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-dark dark:focus:ring-primary-light focus:border-transparent"
        />
      </div>

      {/* PYQs Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark dark:border-primary-light mx-auto"></div>
        </div>
      ) : filteredPYQs.length === 0 ? (
        <div className="text-center py-12 bg-surface-light dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-gray-700">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">No PYQs found</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPYQs.map((pyq) => (
            <div
              key={pyq.id}
              className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <FileText className="w-8 h-8 text-primary-dark dark:text-primary-light" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {pyq.title}
              </h3>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Subject:</span> {pyq.subject}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Year:</span> {pyq.year}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Semester:</span> {pyq.semester}
                </p>
              </div>
              <button
                onClick={() => handleDownload(pyq)}
                className="w-full bg-primary-dark dark:bg-primary-light text-white py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
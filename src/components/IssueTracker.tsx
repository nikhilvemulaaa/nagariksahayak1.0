import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Star, 
  Filter, 
  Search, 
  Eye, 
  MessageCircle,
  Calendar,
  User,
  Phone,
  Mail,
  X,
  ThumbsUp,
  ThumbsDown,
  Share2
} from 'lucide-react';

interface Issue {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'reported' | 'in-progress' | 'resolved' | 'closed';
  reportedBy: string;
  reportedDate: string;
  resolvedDate?: string;
  rating?: number;
  images?: string[];
  updates: {
    date: string;
    message: string;
    status: string;
  }[];
}

interface IssueTrackerProps {
  isOpen: boolean;
  onClose: () => void;
}

const IssueTracker: React.FC<IssueTrackerProps> = ({ isOpen, onClose }) => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Mock data
  useEffect(() => {
    const mockIssues: Issue[] = [
      {
        id: 'CMP-001234',
        title: 'Broken Street Light on MG Road',
        description: 'The street light near the bus stop has been non-functional for the past week, causing safety concerns for pedestrians.',
        location: 'MG Road, Sector 14, Gurgaon',
        category: 'infrastructure',
        priority: 'high',
        status: 'resolved',
        reportedBy: 'Rajesh Kumar',
        reportedDate: '2024-01-15',
        resolvedDate: '2024-01-17',
        rating: 5,
        images: ['https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg'],
        updates: [
          { date: '2024-01-15', message: 'Complaint registered and assigned to electrical department', status: 'reported' },
          { date: '2024-01-16', message: 'Technical team dispatched for inspection', status: 'in-progress' },
          { date: '2024-01-17', message: 'Street light repaired and tested successfully', status: 'resolved' }
        ]
      },
      {
        id: 'CMP-001235',
        title: 'Water Supply Disruption in Nehru Colony',
        description: 'No water supply for the past 3 days in the entire Nehru Colony area. Residents are facing severe inconvenience.',
        location: 'Nehru Colony, Block A, Delhi',
        category: 'utilities',
        priority: 'urgent',
        status: 'in-progress',
        reportedBy: 'Priya Sharma',
        reportedDate: '2024-01-18',
        images: ['https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg'],
        updates: [
          { date: '2024-01-18', message: 'Emergency complaint registered with water department', status: 'reported' },
          { date: '2024-01-18', message: 'Pipeline inspection team deployed', status: 'in-progress' },
          { date: '2024-01-19', message: 'Main pipeline leak identified, repair work in progress', status: 'in-progress' }
        ]
      },
      {
        id: 'CMP-001236',
        title: 'Large Pothole on Civil Lines Road',
        description: 'A large pothole has formed on Civil Lines Road causing damage to vehicles and creating traffic congestion.',
        location: 'Civil Lines Road, Near Court Complex',
        category: 'roads',
        priority: 'medium',
        status: 'resolved',
        reportedBy: 'Amit Singh',
        reportedDate: '2024-01-10',
        resolvedDate: '2024-01-14',
        rating: 4,
        images: ['https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg'],
        updates: [
          { date: '2024-01-10', message: 'Road maintenance complaint received', status: 'reported' },
          { date: '2024-01-12', message: 'Road repair crew assigned and materials arranged', status: 'in-progress' },
          { date: '2024-01-14', message: 'Pothole filled and road surface leveled', status: 'resolved' }
        ]
      },
      {
        id: 'CMP-001237',
        title: 'Garbage Collection Not Done',
        description: 'Garbage has not been collected from our area for the past 4 days. The situation is becoming unhygienic.',
        location: 'Green Park Extension, Block B',
        category: 'sanitation',
        priority: 'high',
        status: 'reported',
        reportedBy: 'Sunita Devi',
        reportedDate: '2024-01-20',
        updates: [
          { date: '2024-01-20', message: 'Sanitation complaint registered with municipal corporation', status: 'reported' }
        ]
      },
      {
        id: 'CMP-001238',
        title: 'Illegal Construction Activity',
        description: 'Unauthorized construction is happening in the residential area without proper permits, causing noise and dust pollution.',
        location: 'Lajpat Nagar, Block C, House No. 45',
        category: 'environment',
        priority: 'medium',
        status: 'in-progress',
        reportedBy: 'Vikram Gupta',
        reportedDate: '2024-01-19',
        updates: [
          { date: '2024-01-19', message: 'Building violation complaint received', status: 'reported' },
          { date: '2024-01-20', message: 'Building inspector assigned for site verification', status: 'in-progress' }
        ]
      }
    ];
    setIssues(mockIssues);
    setFilteredIssues(mockIssues);
  }, []);

  // Filter issues based on search and filters
  useEffect(() => {
    let filtered = issues;

    if (searchTerm) {
      filtered = filtered.filter(issue => 
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(issue => issue.status === statusFilter);
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(issue => issue.category === categoryFilter);
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(issue => issue.priority === priorityFilter);
    }

    setFilteredIssues(filtered);
  }, [issues, searchTerm, statusFilter, categoryFilter, priorityFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reported': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'urgent': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl max-w-7xl w-full mx-4 max-h-[90vh] overflow-hidden shadow-2xl border border-white/20">
        <div className="p-6 border-b border-gray-200/50">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Issue Tracker</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Issues List */}
          <div className="w-1/2 border-r border-gray-200/50 flex flex-col">
            {/* Search and Filters */}
            <div className="p-4 border-b border-gray-200/50 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by ID, title, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="reported">Reported</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  <option value="infrastructure">Infrastructure</option>
                  <option value="utilities">Utilities</option>
                  <option value="roads">Roads</option>
                  <option value="sanitation">Sanitation</option>
                  <option value="environment">Environment</option>
                </select>

                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            {/* Issues List */}
            <div className="flex-1 overflow-y-auto">
              {filteredIssues.map((issue) => (
                <div
                  key={issue.id}
                  onClick={() => setSelectedIssue(issue)}
                  className={`p-4 border-b border-gray-200/50 cursor-pointer hover:bg-gray-50 transition-colors duration-300 ${
                    selectedIssue?.id === issue.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{issue.title}</h3>
                      <p className="text-sm text-gray-600 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {issue.location}
                      </p>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                        {issue.status.replace('-', ' ').toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(issue.priority)}`}>
                        {issue.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(issue.reportedDate)}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {issue.id}
                    </span>
                  </div>

                  {issue.rating && (
                    <div className="flex items-center mt-2">
                      <span className="text-sm text-gray-600 mr-2">Rating:</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < issue.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                        <span className="text-sm text-gray-600 ml-1">({issue.rating})</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {filteredIssues.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <AlertCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>No issues found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>

          {/* Issue Details */}
          <div className="w-1/2 flex flex-col">
            {selectedIssue ? (
              <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                  {/* Header */}
                  <div className="mb-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedIssue.title}</h3>
                        <p className="text-gray-600 flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {selectedIssue.location}
                        </p>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedIssue.status)}`}>
                          {selectedIssue.status.replace('-', ' ').toUpperCase()}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedIssue.priority)}`}>
                          {selectedIssue.priority.toUpperCase()} PRIORITY
                        </span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Complaint ID:</span>
                          <span className="font-medium ml-2">{selectedIssue.id}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Category:</span>
                          <span className="font-medium ml-2 capitalize">{selectedIssue.category}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Reported By:</span>
                          <span className="font-medium ml-2">{selectedIssue.reportedBy}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Reported Date:</span>
                          <span className="font-medium ml-2">{formatDate(selectedIssue.reportedDate)}</span>
                        </div>
                        {selectedIssue.resolvedDate && (
                          <>
                            <div>
                              <span className="text-gray-600">Resolved Date:</span>
                              <span className="font-medium ml-2">{formatDate(selectedIssue.resolvedDate)}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">Resolution Time:</span>
                              <span className="font-medium ml-2">
                                {Math.ceil((new Date(selectedIssue.resolvedDate).getTime() - new Date(selectedIssue.reportedDate).getTime()) / (1000 * 60 * 60 * 24))} days
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-700 leading-relaxed">{selectedIssue.description}</p>
                  </div>

                  {/* Images */}
                  {selectedIssue.images && selectedIssue.images.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Images</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {selectedIssue.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Issue ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Updates Timeline */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Status Updates</h4>
                    <div className="space-y-4">
                      {selectedIssue.updates.map((update, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className={`w-3 h-3 rounded-full mt-2 ${
                            update.status === 'resolved' ? 'bg-green-500' :
                            update.status === 'in-progress' ? 'bg-yellow-500' :
                            'bg-blue-500'
                          }`}></div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-gray-900">{update.message}</p>
                              <span className="text-sm text-gray-500">{formatDate(update.date)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  {selectedIssue.rating && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Citizen Rating</h4>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-5 h-5 ${i < selectedIssue.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="text-lg font-medium">{selectedIssue.rating}/5</span>
                        <span className="text-gray-600">Excellent service!</span>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Add Comment
                    </button>
                    <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center justify-center">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Update
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Eye className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>Select an issue to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueTracker;
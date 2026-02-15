'use client';
/**
 * Dashboard page - protected route that displays user tasks.
 * Redirects to signin if user is not authenticated.
 */
import { useState, useEffect } from 'react';
import { ProtectedRoute } from '../../components/ProtectedRoute';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { getUserTasks, createTask, updateTask, deleteTask, toggleTaskCompletion } from '../../lib/taskApi';
import type { Task } from '../../lib/taskApi';

function DashboardContent() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  // Load tasks when component mounts
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const userTasks = await getUserTasks(user.user_id);
      setTasks(userTasks);
      setError(null);
    } catch (err) {
      console.error('Failed to load tasks:', err);
      setError('Failed to load tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async () => {
    if (!user || !newTaskTitle.trim()) return;
    try {
      const newTask = await createTask(user.user_id, {
        title: newTaskTitle.trim(),
        description: newTaskDescription.trim() || undefined
      });
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setNewTaskDescription('');
      setShowCreateModal(false);
    } catch (err) {
      console.error('Failed to create task:', err);
      setError('Failed to create task. Please try again.');
    }
  };

  const handleUpdateTask = async () => {
    if (!editingTask || !user) return;
    try {
      const updatedTask = await updateTask(user.user_id, editingTask.id, {
        title: editingTask.title,
        description: editingTask.description || undefined,
        status: editingTask.status
      });
      setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
      setEditingTask(null);
      setShowEditModal(false);
    } catch (err) {
      console.error('Failed to update task:', err);
      setError('Failed to update task. Please try again.');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!user || !confirm('Are you sure you want to delete this task?')) return;
    try {
      await deleteTask(user.user_id, taskId);
      setTasks(tasks.filter(t => t.id !== taskId));
    } catch (err) {
      console.error('Failed to delete task:', err);
      setError('Failed to delete task. Please try again.');
    }
  };

  const handleToggleCompletion = async (task: Task) => {
    if (!user) return;
    try {
      const updatedTask = await toggleTaskCompletion(user.user_id, task.id);
      setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    } catch (err) {
      console.error('Failed to toggle task completion:', err);
      setError('Failed to update task status. Please try again.');
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask({ ...task });
    setShowEditModal(true);
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
          <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <p className="text-sm text-gray-600">Welcome back, {user?.email}</p>
              </div>
              <Button
                variant="ghost"
                size="md"
                onClick={logout}
                className="text-gray-700 hover:text-gray-900 hover:bg-gray-100/50"
              >
                Sign Out
              </Button>
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-center items-center h-64">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-8 w-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <p className="text-sm text-gray-600">Welcome back, {user?.email}</p>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setShowCreateModal(true)}
                  className="flex-1 sm:flex-none bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl transition-all duration-200"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Task
                </Button>
                <Button
                  variant="ghost"
                  size="md"
                  onClick={logout}
                  className="flex-1 sm:flex-none text-gray-700 hover:text-gray-900 hover:bg-gray-100/50"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg shadow-sm animate-slideIn">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
          )}

          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
            <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
              <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
                <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Your Tasks ({tasks.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {tasks.length === 0 ? (
                <div className="text-center py-16 px-4">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-lg">No tasks yet</p>
                  <p className="text-gray-400 mt-1">Create your first task to get started!</p>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => setShowCreateModal(true)}
                    className="mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                  >
                    Create Task
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {tasks.map((task, index) => (
                    <div
                      key={task.id}
                      className={`group relative rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
                        task.status === 'completed' 
                          ? 'border-green-200 bg-gradient-to-r from-green-50 to-emerald-50' 
                          : 'border-gray-200 bg-white hover:border-indigo-200'
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                      <div className="relative p-5 flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div className="flex-1 w-full">
                          <div className="flex items-start">
                            <button
                              onClick={() => handleToggleCompletion(task)}
                              className={`mt-1 mr-3 flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                                task.status === 'completed'
                                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-500 scale-110'
                                  : 'border-gray-300 hover:border-indigo-500 hover:scale-110'
                              }`}
                            >
                              {task.status === 'completed' && (
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </button>
                            <div className="flex-1">
                              <h3 className={`font-semibold text-lg ${
                                task.status === 'completed' 
                                  ? 'line-through text-gray-500' 
                                  : 'text-gray-800'
                              }`}>
                                {task.title}
                              </h3>
                              {task.description && (
                                <p className={`mt-1 text-sm ${
                                  task.status === 'completed' 
                                    ? 'line-through text-gray-400' 
                                    : 'text-gray-600'
                                }`}>
                                  {task.description}
                                </p>
                              )}
                              <div className="mt-2 flex items-center text-xs text-gray-400">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {new Date(task.created_at).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 w-full sm:w-auto">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleEditTask(task)}
                            className="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 border-0"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteTask(task.id)}
                            className="flex-1 sm:flex-none bg-red-50 hover:bg-red-100 text-red-600 border-0"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </main>

        {/* Create Task Modal */}
        <Modal
          isOpen={showCreateModal}
          onClose={() => {
            setShowCreateModal(false);
            setNewTaskTitle('');
            setNewTaskDescription('');
          }}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto transform transition-all">
            <Card className="border-0">
              <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-2xl">
                <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create New Task
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-5">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="title"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      placeholder="Enter task title"
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <Input
                      id="description"
                      value={newTaskDescription}
                      onChange={(e) => setNewTaskDescription(e.target.value)}
                      placeholder="Enter task description (optional)"
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                    />
                  </div>
                  <div className="flex justify-end gap-3 pt-5 border-t border-gray-100">
                    <Button
                      variant="secondary"
                      size="md"
                      onClick={() => {
                        setShowCreateModal(false);
                        setNewTaskTitle('');
                        setNewTaskDescription('');
                      }}
                      className="px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 border-0"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={handleCreateTask}
                      disabled={!newTaskTitle.trim()}
                      className="px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Create Task
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Modal>

        {/* Edit Task Modal */}
        {editingTask && (
          <Modal
            isOpen={showEditModal}
            onClose={() => {
              setShowEditModal(false);
              setEditingTask(null);
            }}
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto transform transition-all">
              <Card className="border-0">
                <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-2xl">
                  <CardTitle className="text-xl font-semibold text-gray-800 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Task
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-2">
                        Title <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="edit-title"
                        value={editingTask.title}
                        onChange={(e) => setEditingTask({...editingTask, title: e.target.value})}
                        placeholder="Enter task title"
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <Input
                        id="edit-description"
                        value={editingTask.description || ''}
                        onChange={(e) => setEditingTask({...editingTask, description: e.target.value || undefined})}
                        placeholder="Enter task description (optional)"
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Status
                      </label>
                      <div className="flex gap-4">
                        <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 flex-1
                          ${editingTask.status === 'pending' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-indigo-200'}">
                          <input
                            type="radio"
                            name="status"
                            checked={editingTask.status === 'pending'}
                            onChange={() => setEditingTask({...editingTask, status: 'pending'})}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">Pending</span>
                        </label>
                        <label className="flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 flex-1
                          ${editingTask.status === 'completed' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-200'}">
                          <input
                            type="radio"
                            name="status"
                            checked={editingTask.status === 'completed'}
                            onChange={() => setEditingTask({...editingTask, status: 'completed'})}
                            className="h-4 w-4 text-green-600 focus:ring-green-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">Completed</span>
                        </label>
                      </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-5 border-t border-gray-100">
                      <Button
                        variant="secondary"
                        size="md"
                        onClick={() => {
                          setShowEditModal(false);
                          setEditingTask(null);
                        }}
                        className="px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 border-0"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        size="md"
                        onClick={handleUpdateTask}
                        className="px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                      >
                        Update Task
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Modal>
        )}
      </div>
    </ProtectedRoute>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

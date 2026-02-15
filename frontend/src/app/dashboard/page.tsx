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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
          <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Welcome, {user?.email}</p>
              </div>
              <Button
                variant="ghost"
                size="md"
                onClick={logout}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Sign Out
              </Button>
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex justify-center items-center">
            <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-blue-600 dark:border-blue-500"></div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        {/* Header */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Dashboard</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">Welcome back, {user?.email}</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="default"
                size="md"
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all"
              >
                + New Task
              </Button>
              <Button
                variant="ghost"
                size="md"
                onClick={logout}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {error && (
            <div className="mb-8 p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-red-800 dark:text-red-300">
              {error}
            </div>
          )}

          <Card className="border-gray-200 dark:border-gray-800 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                Your Tasks ({tasks.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {tasks.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    No tasks yet. Start by creating your first one!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {tasks.map(task => (
                    <div
                      key={task.id}
                      className={`group p-5 rounded-xl border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
                        task.status === 'completed'
                          ? 'bg-green-50/70 dark:bg-green-950/30 border-green-200 dark:border-green-800'
                          : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={task.status === 'completed'}
                              onChange={() => handleToggleCompletion(task)}
                              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800"
                            />
                            <h3
                              className={`font-medium text-lg transition-all ${
                                task.status === 'completed'
                                  ? 'line-through text-gray-500 dark:text-gray-400'
                                  : 'text-gray-900 dark:text-white'
                              }`}
                            >
                              {task.title}
                            </h3>
                          </div>

                          {task.description && (
                            <p
                              className={`mt-2 text-sm ${
                                task.status === 'completed'
                                  ? 'line-through text-gray-400 dark:text-gray-500'
                                  : 'text-gray-600 dark:text-gray-300'
                              }`}
                            >
                              {task.description}
                            </p>
                          )}

                          <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                            Created: {new Date(task.created_at).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditTask(task)}
                            className="border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteTask(task.id)}
                          >
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
          <Card className="sm:max-w-lg mx-4 border-0 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-xl">Create New Task</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-2">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Title *
                </label>
                <Input
                  id="title"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="What needs to be done?"
                  className="focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Description
                </label>
                <Input
                  id="description"
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                  placeholder="Add details (optional)"
                  className="focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewTaskTitle('');
                    setNewTaskDescription('');
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  size="md"
                  onClick={handleCreateTask}
                  disabled={!newTaskTitle.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Create Task
                </Button>
              </div>
            </CardContent>
          </Card>
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
            <Card className="sm:max-w-lg mx-4 border-0 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-xl">Edit Task</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-2">
                <div>
                  <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Title *
                  </label>
                  <Input
                    id="edit-title"
                    value={editingTask.title}
                    onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                    className="focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Description
                  </label>
                  <Input
                    id="edit-description"
                    value={editingTask.description || ''}
                    onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value || undefined })}
                    className="focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Status
                  </label>
                  <div className="flex items-center gap-6 mt-2">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        checked={editingTask.status === 'pending'}
                        onChange={() => setEditingTask({ ...editingTask, status: 'pending' })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 dark:bg-gray-800"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Pending</span>
                    </label>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        checked={editingTask.status === 'completed'}
                        onChange={() => setEditingTask({ ...editingTask, status: 'completed' })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 dark:bg-gray-800"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Completed</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => {
                      setShowEditModal(false);
                      setEditingTask(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="default"
                    size="md"
                    onClick={handleUpdateTask}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Update Task
                  </Button>
                </div>
              </CardContent>
            </Card>
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

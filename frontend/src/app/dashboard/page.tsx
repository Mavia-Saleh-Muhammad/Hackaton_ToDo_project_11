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
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-600">Welcome, {user?.email}</p>
              </div>
              <Button
                variant="ghost"
                size="md"
                onClick={logout}
                className="text-gray-700 hover:text-gray-900"
              >
                Sign Out
              </Button>
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          </main>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome, {user?.email}</p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => setShowCreateModal(true)}
              >
                Add Task
              </Button>
              <Button
                variant="ghost"
                size="md"
                onClick={logout}
                className="text-gray-700 hover:text-gray-900"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Your Tasks ({tasks.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {tasks.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No tasks yet. Create your first task!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {tasks.map(task => (
                    <div
                      key={task.id}
                      className={`border rounded-lg p-4 flex justify-between items-start ${
                        task.status === 'completed' ? 'bg-green-50 border-green-200' : 'bg-white'
                      }`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={task.status === 'completed'}
                            onChange={() => handleToggleCompletion(task)}
                            className="mr-3 h-5 w-5 text-primary-600 rounded focus:ring-primary-500"
                          />
                          <h3 className={`font-medium ${
                            task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'
                          }`}>
                            {task.title}
                          </h3>
                        </div>
                        {task.description && (
                          <p className={`mt-1 text-sm ${
                            task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-600'
                          }`}>
                            {task.description}
                          </p>
                        )}
                        <div className="mt-2 text-xs text-gray-500">
                          Created: {new Date(task.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleEditTask(task)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          Delete
                        </Button>
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
          <Card>
            <CardHeader>
              <CardTitle>Create New Task</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <Input
                    id="title"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Enter task title"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <Input
                    id="description"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    placeholder="Enter task description (optional)"
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    variant="secondary"
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
                    variant="primary"
                    size="md"
                    onClick={handleCreateTask}
                    disabled={!newTaskTitle.trim()}
                  >
                    Create Task
                  </Button>
                </div>
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
            <Card>
              <CardHeader>
                <CardTitle>Edit Task</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <Input
                      id="edit-title"
                      value={editingTask.title}
                      onChange={(e) => setEditingTask({...editingTask, title: e.target.value})}
                      placeholder="Enter task title"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <Input
                      id="edit-description"
                      value={editingTask.description || ''}
                      onChange={(e) => setEditingTask({...editingTask, description: e.target.value || undefined})}
                      placeholder="Enter task description (optional)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <div className="flex items-center space-x-4">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="status"
                          checked={editingTask.status === 'pending'}
                          onChange={() => setEditingTask({...editingTask, status: 'pending'})}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Pending</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="status"
                          checked={editingTask.status === 'completed'}
                          onChange={() => setEditingTask({...editingTask, status: 'completed'})}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Completed</span>
                      </label>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-3 pt-4">
                    <Button
                      variant="secondary"
                      size="md"
                      onClick={() => {
                        setShowEditModal(false);
                        setEditingTask(null);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      size="md"
                      onClick={handleUpdateTask}
                    >
                      Update Task
                    </Button>
                  </div>
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

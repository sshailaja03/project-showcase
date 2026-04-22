import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { LogOut, Plus, Edit2, Trash2, User as UserIcon } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [profile, setProfile] = useState({});
  const [isAddingProject, setIsAddingProject] = useState(false);
  
  // Project Form State
  const [newProject, setNewProject] = useState({
    title: '', description: '', tags: '', liveUrl: '', githubUrl: '', thumbnail: ''
  });

  useEffect(() => {
    fetchProfile();
    fetchProjects();
  }, [user]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`/users/${user.username}`);
      setProfile(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`/projects/${user.username}`);
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const tagsArray = newProject.tags.split(',').map(tag => tag.trim()).filter(t => t);
      await axios.post('/projects', { ...newProject, tags: tagsArray });
      setIsAddingProject(false);
      setNewProject({ title: '', description: '', tags: '', liveUrl: '', githubUrl: '', thumbnail: '' });
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`/projects/${id}`);
        fetchProjects();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-space-glow/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <header className="flex justify-between items-center mb-12 bg-space-card/50 backdrop-blur-md p-4 rounded-2xl border border-space-border">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-space-dark rounded-full border border-space-border flex items-center justify-center overflow-hidden">
            {profile.avatar ? <img src={profile.avatar} alt="avatar" /> : <UserIcon className="text-gray-500" />}
          </div>
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-400">Welcome, {user.username}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <a href={`/u/${user.username}`} target="_blank" rel="noreferrer" className="px-4 py-2 bg-space-dark border border-space-border rounded-lg hover:border-space-glow transition-colors">
            View Public Profile
          </a>
          <button onClick={logout} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors flex items-center gap-2">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </header>

      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-3xl font-bold">Your Projects</h2>
        <button 
          onClick={() => setIsAddingProject(!isAddingProject)}
          className="flex items-center gap-2 bg-space-glow hover:bg-space-glow/80 text-white px-4 py-2 rounded-lg transition-colors shadow-glow"
        >
          {isAddingProject ? 'Cancel' : <><Plus size={20} /> Add Project</>}
        </button>
      </div>

      {isAddingProject && (
        <div className="bg-space-card border border-space-border p-6 rounded-xl mb-12 shadow-lg">
          <h3 className="text-xl font-bold mb-4">Create New Project</h3>
          <form onSubmit={handleCreateProject} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-1">Title</label>
              <input type="text" required value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} className="w-full bg-space-dark border border-space-border rounded px-3 py-2" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-1">Description</label>
              <textarea required value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} className="w-full bg-space-dark border border-space-border rounded px-3 py-2 h-24" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Tags (comma separated)</label>
              <input type="text" value={newProject.tags} onChange={e => setNewProject({...newProject, tags: e.target.value})} className="w-full bg-space-dark border border-space-border rounded px-3 py-2" placeholder="React, Node, CSS" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Thumbnail URL</label>
              <input type="url" value={newProject.thumbnail} onChange={e => setNewProject({...newProject, thumbnail: e.target.value})} className="w-full bg-space-dark border border-space-border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Live URL</label>
              <input type="url" value={newProject.liveUrl} onChange={e => setNewProject({...newProject, liveUrl: e.target.value})} className="w-full bg-space-dark border border-space-border rounded px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">GitHub URL</label>
              <input type="url" value={newProject.githubUrl} onChange={e => setNewProject({...newProject, githubUrl: e.target.value})} className="w-full bg-space-dark border border-space-border rounded px-3 py-2" />
            </div>
            <div className="md:col-span-2 flex justify-end mt-4">
              <button type="submit" className="bg-space-glow text-white px-6 py-2 rounded-lg font-bold">Save Project</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(project => (
          <div key={project._id} className="relative group h-[400px]">
            <ProjectCard project={project} />
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-50 flex gap-2">
              <button onClick={() => handleDelete(project._id)} className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full backdrop-blur">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {projects.length === 0 && !isAddingProject && (
          <div className="col-span-full py-12 text-center text-gray-500 border border-dashed border-space-border rounded-xl">
            No projects yet. Click "Add Project" to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

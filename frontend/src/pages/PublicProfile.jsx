import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProjectCard from '../components/ProjectCard';
import TiltCard from '../components/TiltCard';
import { User, Code, Link } from 'lucide-react';

const PublicProfile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, projectsRes] = await Promise.all([
          axios.get(`/users/${username}`),
          axios.get(`/projects/${username}`)
        ]);
        setProfile(profileRes.data);
        setProjects(projectsRes.data);
      } catch (err) {
        setError('User not found');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [username]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-400">{error}</div>;

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto relative">
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-space-glow/5 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

      <div className="flex flex-col md:flex-row gap-12 mb-16">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="h-[400px]">
            <TiltCard>
              <div className="flex flex-col items-center text-center h-full transform-gpu translate-z-10 pt-4" style={{ transform: 'translateZ(20px)' }}>
                <div className="w-32 h-32 rounded-full bg-space-dark border-4 border-space-border mb-6 overflow-hidden flex items-center justify-center">
                  {profile.avatar ? <img src={profile.avatar} alt={profile.username} className="w-full h-full object-cover"/> : <User size={48} className="text-gray-600" />}
                </div>
                <h1 className="text-2xl font-bold mb-2">@{profile.username}</h1>
                <p className="text-gray-400 mb-6 flex-1 text-sm">{profile.bio || 'Full-stack developer navigating the code cosmos.'}</p>
                
                <div className="flex gap-4 mt-auto">
                  {profile.socialLinks?.github && (
                    <a href={profile.socialLinks.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                      <Code />
                    </a>
                  )}
                  {profile.socialLinks?.linkedin && (
                    <a href={profile.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                      <Link />
                    </a>
                  )}
                </div>
              </div>
            </TiltCard>
          </div>
        </div>

        <div className="w-full md:w-2/3 lg:w-3/4">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-space-border">
            <Code className="text-space-glow" />
            <h2 className="text-3xl font-bold">Showcase</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map(project => (
              <div key={project._id} className="h-[400px]">
                <ProjectCard project={project} />
              </div>
            ))}
            {projects.length === 0 && (
              <div className="col-span-full py-12 text-center text-gray-500 border border-dashed border-space-border rounded-xl">
                No projects found for this user.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;

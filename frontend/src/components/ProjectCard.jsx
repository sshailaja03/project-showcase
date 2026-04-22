import React from 'react';
import TiltCard from './TiltCard';
import { ExternalLink, Code } from 'lucide-react';

const ProjectCard = ({ project }) => {
  return (
    <TiltCard className="flex flex-col">
      {/* 3D Inner Content translation for extra depth effect */}
      <div className="flex-1 flex flex-col transform-gpu translate-z-10" style={{ transform: 'translateZ(30px)' }}>
        
        {project.thumbnail ? (
          <img 
            src={project.thumbnail} 
            alt={project.title} 
            className="w-full h-48 object-cover rounded-lg mb-4 border border-space-border"
          />
        ) : (
          <div className="w-full h-48 bg-space-dark rounded-lg mb-4 flex items-center justify-center border border-space-border text-gray-500">
            No Thumbnail
          </div>
        )}

        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-400 mb-4 flex-1">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags?.map((tag, idx) => (
            <span key={idx} className="px-2 py-1 text-xs rounded bg-space-dark text-space-glow border border-space-border/50">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-space-border/30">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm hover:text-space-glow transition-colors">
              <ExternalLink size={16} /> Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm hover:text-space-glow transition-colors">
              <Code size={16} /> Code
            </a>
          )}
        </div>

      </div>
    </TiltCard>
  );
};

export default ProjectCard;

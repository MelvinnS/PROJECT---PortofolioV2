import React, { useEffect } from 'react';

// Halaman Project — sengaja dikosongkan, desain masih dikerjakan di Figma.
const ProjectsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="projects-page" style={{ background: '#fff', minHeight: '100vh' }}>
      {/* TODO: implement Project page design from Figma */}
    </div>
  );
};

export default ProjectsPage;

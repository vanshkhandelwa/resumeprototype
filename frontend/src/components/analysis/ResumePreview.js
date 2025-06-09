import React from 'react';
import '../../styles/ResumePreview.css';

const ResumePreview = ({ parsedResume }) => {
  if (!parsedResume || !parsedResume.sections) {
    return (
      <div className="resume-preview empty">
        <p>No resume content available to display.</p>
      </div>
    );
  }

  const { sections } = parsedResume;

  // Format section name for display
  const formatSectionName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/_/g, ' ');
  };

  // Render different section types appropriately
  const renderSectionContent = (sectionName, content) => {
    if (!content) return <p>No content available.</p>;

    if (sectionName === 'personal_info') {
      return (
        <div className="personal-info">
          {content.name && <h2 className="resume-name">{content.name}</h2>}
          <div className="contact-info">
            {content.email && <div>{content.email}</div>}
            {content.phone && <div>{content.phone}</div>}
            {content.location && <div>{content.location}</div>}
            {content.linkedin && <div>{content.linkedin}</div>}
          </div>
        </div>
      );
    }

    if (sectionName === 'summary' && typeof content === 'string') {
      return <p className="summary-content">{content}</p>;
    }

    if (sectionName === 'experience') {
      return renderExperienceSection(content);
    }

    if (sectionName === 'education') {
      return renderEducationSection(content);
    }

    if (sectionName === 'skills' && Array.isArray(content)) {
      return (
        <div className="skills-list">
          {content.map((skill, index) => (
            <div key={index} className="skill-tag">{typeof skill === 'string' ? skill : JSON.stringify(skill)}</div>
          ))}
        </div>
      );
    }

    // For projects section which might contain object data
    if (sectionName === 'projects' && Array.isArray(content)) {
      return (
        <div className="projects-section">
          {content.map((project, index) => {
            if (typeof project === 'object') {
              return (
                <div key={index} className="project-item">
                  {project.name && <div className="project-name">{project.name}</div>}
                  {project.description && <div className="project-desc">{project.description}</div>}
                  {project.technologies && Array.isArray(project.technologies) && (
                    <div className="project-tech">
                      <strong>Technologies:</strong> {project.technologies.join(', ')}
                    </div>
                  )}
                  {project.link && <div className="project-link">Link: {project.link}</div>}
                </div>
              );
            } else if (typeof project === 'string') {
              return <div key={index} className="project-item">{project}</div>;
            }
            return null;
          })}
        </div>
      );
    }

    if (Array.isArray(content)) {
      return (
        <ul className="generic-list">
          {content.map((item, index) => (
            <li key={index}>{typeof item === 'string' ? item : JSON.stringify(item)}</li>
          ))}
        </ul>
      );
    }

    // Default rendering for object or string
    return (
      <div className="generic-content">
        {typeof content === 'string' ? (
          <p>{content}</p>
        ) : (
          <pre>{JSON.stringify(content, null, 2)}</pre>
        )}
      </div>
    );
  };

  const renderExperienceSection = (content) => {
    // Handle array of job objects
    if (Array.isArray(content) && typeof content[0] === 'object') {
      return (
        <div className="experience-section">
          {content.map((job, index) => (
            <div key={index} className="job-entry">
              <div className="job-header">
                <h3 className="job-title">{job.title || 'Position'}</h3>
                <div className="company-name">{job.company || 'Company'}</div>
                {job.dates && <div className="job-dates">{job.dates}</div>}
                {job.location && <div className="job-location">{job.location}</div>}
              </div>
              {job.bullets && Array.isArray(job.bullets) && (
                <ul className="job-bullets">
                  {job.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      );
    }
    
    // Handle array of strings
    if (Array.isArray(content) && typeof content[0] === 'string') {
      return (
        <ul className="experience-list">
          {content.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    }
    
    // Handle string
    if (typeof content === 'string') {
      return <p>{content}</p>;
    }
    
    // Default case
    return (
      <pre className="resume-json">
        {JSON.stringify(content, null, 2)}
      </pre>
    );
  };

  const renderEducationSection = (content) => {
    if (Array.isArray(content)) {
      return (
        <div className="education-section">
          {content.map((edu, index) => {
            // Check if education item is an object or string
            if (typeof edu === 'object') {
              return (
                <div key={index} className="education-entry">
                  {edu.degree && <div className="degree">{edu.degree}</div>}
                  {edu.institution && <div className="institution">{edu.institution}</div>}
                  {edu.dates && <div className="edu-dates">{edu.dates}</div>}
                  {edu.gpa && <div className="gpa">GPA: {edu.gpa}</div>}
                </div>
              );
            } else {
              return <div key={index} className="education-entry">{edu}</div>;
            }
          })}
        </div>
      );
    }
    
    return <p>{typeof content === 'string' ? content : JSON.stringify(content)}</p>;
  };

  // Order sections in a logical resume order
  const sectionOrder = [
    'personal_info',
    'summary',
    'experience',
    'education',
    'skills',
    'projects',
    'certifications',
    'achievements',
    'languages',
    'publications',
    'volunteer_experience',
    'additional_info'
  ];
  
  // Filter and sort sections
  const orderedSections = sectionOrder
    .filter(section => sections[section])
    .map(section => ({ name: section, content: sections[section] }));
  
  // Add any sections not in our predefined order at the end
  Object.keys(sections)
    .filter(section => !sectionOrder.includes(section))
    .forEach(section => {
      orderedSections.push({ name: section, content: sections[section] });
    });

  return (
    <div className="resume-preview">
      <div className="resume-content">
        {orderedSections.map(({ name, content }) => (
          <div key={name} className={`resume-section ${name}`}>
            {name !== 'personal_info' && (
              <h3 className="section-title">{formatSectionName(name)}</h3>
            )}
            {renderSectionContent(name, content)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumePreview;
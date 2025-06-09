import React from 'react';
import '../styles/navigationMenu.css';

const NavigationMenu = ({ sections, activeSection, onSectionChange }) => {
  return (
    <div className="navigation-menu">
      <button
        className={activeSection === 'overall' ? 'active' : ''}
        onClick={() => onSectionChange('overall')}
      >
        Overall Analysis
      </button>
      
      {sections.map(section => (
        <button
          key={section.name}
          className={activeSection === section.name ? 'active' : ''}
          onClick={() => onSectionChange(section.name)}
        >
          {section.displayName}
        </button>
      ))}
      
      <button
        className={activeSection === 'view-resume' ? 'active' : ''}
        onClick={() => onSectionChange('view-resume')}
      >
        View Resume
      </button>
    </div>
  );
};

export default NavigationMenu;
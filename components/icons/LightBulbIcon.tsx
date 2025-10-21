import React from 'react';

export const LightBulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    {...props}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311a7.5 7.5 0 01-7.5 0c.887-1.144 2.5-2.11 4.5-2.11s3.613.966 4.5 2.11zM12 3a9 9 0 019 9c0 2.22-1.004 4.22-2.5 5.5s-3.28 2-5.5 2.5c-.32.05-.65.08-1 .08-.35.02-.7.03-1.05.03A9 9 0 0112 3z" 
    />
  </svg>
);

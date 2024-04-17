import React from 'react';

const ContentComponent = ({ children,title }) => {
  return (
    <div className="container mx-auto p-10 shadow-md rounded-lg my-20">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
      {children}
    </div>
  );
};

export default ContentComponent;
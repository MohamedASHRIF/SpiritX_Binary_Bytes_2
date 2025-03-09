// src/pages/UnauthorizedPage.tsx
import React from "react";

const UnauthorizedPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">403 - Forbidden</h1>
      <p className="text-lg">You do not have access to this page.</p>
    </div>
  );
};

export default UnauthorizedPage;

import React, { useEffect } from "react";

const ChangeTitle = ({ title }) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    return () => {
      document.title = prevTitle;
    };
  }, [title]); // Include 'title' in the dependency array

  return null; // Since it doesn't render anything, you can return null
};

export default ChangeTitle;

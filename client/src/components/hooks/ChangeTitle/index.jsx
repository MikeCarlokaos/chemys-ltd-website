import { useEffect } from "react";

const ChangeTitle = (title) => {
  useEffect(() => {
    document.title = title;

    return () => {
      document.title = "Default Title";
    };
  }, [title]);
};

export default ChangeTitle;

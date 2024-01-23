import { useEffect } from "react";

const ChangeTitle = (title) => {
  useEffect(() => {
    document.title = title;

    return () => {
      document.title = "Chemys Limited | Medicine Wholesaler | United Kingdom";
    };
  }, [title]);
};

export default ChangeTitle;

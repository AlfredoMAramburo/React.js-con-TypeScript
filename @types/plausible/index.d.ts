type Options = {
    callback?: () => void;
    props?: Record<string, string | number | undefined>;
  };
  
  interface Window {
    plausible: (event: "add_fox" | "remove_fox", options?: Options) => void;
  }
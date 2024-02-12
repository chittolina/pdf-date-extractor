declare var process: {
  env: {
    NODE_ENV: string;
  };
};

export default {
  server:
    process.env.NODE_ENV === "prod"
      ? "https://api-ffib.onrender.com"
      : "http://localhost:8000",
};

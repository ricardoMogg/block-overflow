type Environment = {
  appEnv: "local" | "dev" | "prod";
  apiUrl: string;
};

const GetEnvironment = (): Environment => {
  return {
    appEnv: "prod",
    apiUrl: "https://api-eosin-eta-25.vercel.app",
  };
  // const env = process.env.APP_ENV;
  // if (env === "development") {
  //   return {
  //     appEnv: "dev",
  //     apiUrl: "https://api-eosin-eta-25.vercel.app",
  //   };
  // } else if (env === "production") {
  //   return {
  //     appEnv: "prod",
  //     // same as dev right now
  //     apiUrl: "https://api-eosin-eta-25.vercel.app",
  //   };
  // }
  // return {
  //   appEnv: "local",
  //   apiUrl: "http://localhost:8080",
  // };
};

export default GetEnvironment;

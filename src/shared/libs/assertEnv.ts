interface IParams {
  env: string | undefined | null;
  key: string;
}

export const assertEnv = ({ env, key }: IParams) => {
  if (env === undefined || env === null) {
    throw new Error(`${key} - Environment variable is not defined`);
  }
  return env;
};

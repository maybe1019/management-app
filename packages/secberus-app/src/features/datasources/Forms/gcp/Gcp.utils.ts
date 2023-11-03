export const formatData = (data: any) => {
  return {
    name: data.name,
    data: {
      creds: data.data.creds,
      projects: data.data.projects.split(',').filter((val: any) => val),
    },
  };
};

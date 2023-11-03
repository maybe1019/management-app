export const toggleElement = async (page: any, element: string) => {
  await page.click(`${element}`);
  await page.click(`${element}`);
};

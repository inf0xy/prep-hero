import { GeneralFormData } from './formFields';

export const validateAddedProblems = (
  formData: GeneralFormData,
  description: string,
  companies: string
) => {
  // const listName = formData.listName.trim();
  // const title = formData.title.trim();
  // const leetcodeLink = formData.leetcodeLink.trim();
  // const videoLink = formData.videoLink.trim();
  // const description = addedDescription.trim();
  // const { difficulty, category, tags, companies } = formData;

  // let validFied = [
  //   listName,
  //   title,
  //   leetcodeLink,
  //   videoLink,
  //   description,
  //   difficulty,
  //   category,
  //   tags.join(','),
  //   companies.join(',')
  // ].every((el) => el.length > 2);
  let validFied = [
    companies,
    formData.listName.trim(),
    formData.title.trim(),
    formData.leetcodeLink.trim(),
    formData.videoLink.trim(),
    description.trim(),
    formData.difficulty,
    formData.category,
    formData.tags.join(','),
  ].every((el) => el.length > 2);

  return validFied;
};

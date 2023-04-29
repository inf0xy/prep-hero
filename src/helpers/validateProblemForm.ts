import { GeneralFormData } from '@/types/dataTypes';

export const validateAddedProblems = (
  formData: GeneralFormData,
  description: string,
  companies: string
) => {
  let validFields = [
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

  return validFields;
};

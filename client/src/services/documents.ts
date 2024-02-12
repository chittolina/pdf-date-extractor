import config from "../config";

const service = {
  async extractDatesFromDocuments(formData: FormData) {
    const res = await fetch(`${config.server}/documents/extract`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data;
  },
};

export default service;

const slugify = require('slugify');

// Strips out special characters from the title to make it url-friendly
function createSlug(title) {
  return slugify(title, { lower: true });
}

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      // If slug isn't manually set, create it based
      // on the required title field, otherwise pass
      // through the slug to re-slugify in case the user
      // added invalid characters that need to be stripped
      if (!data.slug) {
        data.slug = createSlug(data.title);
      } else {
        data.slug = createSlug(data.slug);
      }
    },
    beforeUpdate: async (params, data) => {
      // On every update, we also need to check that the user
      // didn't clear the slug - if so, regenerate it, otherwise strip
      // any invalid characters
      if (!data.slug) {
        data.slug = createSlug(data.title);
      } else {
        data.slug = createSlug(data.slug);
      }
    },
  },
};

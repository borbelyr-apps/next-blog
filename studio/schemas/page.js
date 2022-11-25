export default {
  // Setup a 'document' type to house the page builder field

  name: "page",
  type: "document",
  title: "Page",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "pageBuilder",
      type: "array",
      title: "Page builder",
      of: [
        { type: "hero" }, // hero.js (same applies for the other types)
        { type: "textWithIllustration" },
        { type: "callToAction" },
        { type: "gallery" },
        { type: "form" },
        { type: "video" },
        // etc...
      ],
    },
  ],
}

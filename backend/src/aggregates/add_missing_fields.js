// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
[
  {
    $match: {
      $and: [
        {
          createdBy: null,
        },
        {
          group: null,
        },
        {
          removed: null,
        },
        {
          searchTags: null,
        },
        {
          version: null,
        },
        {
          visibility: null,
        },
      ],
    },
  },
  {
    $addFields: {
      group: "public",
      createdBy: "",
      removed: false,
      searchTags: [],
      version: 3,
      visibility: "public",
    },
  },
  {
    $merge:
      /**
       * into: The target collection.
       * on: Fields to  identify.
       * let: Defined variables.
       * whenMatched: Action for matching docs.
       * whenNotMatched: Action for non-matching docs.
       */
      {
        into: "repair-reports",
        on: "_id",
        whenMatched: "merge",
        whenNotMatched: "discard",
      },
  },
];

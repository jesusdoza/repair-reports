//@ts-nocheck

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

// The current database to use.
//this will add missing fields to all documents in the collection
// new fields will have default values of previously defined schema
// existing fields will remain unchanged
// run this only once
use("dev");

db.getCollection("repairs").aggregate([
  {
    $addFields: {
      searchTags: "$searchtags",
      manufacturer: "$engineMake",
      organization: "public",
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
        into: "repairs",
        on: "_id",
        whenMatched: "merge",
        whenNotMatched: "discard",
      },
  },
]);

//need to run on repairs collection
// The current database to use.
use("dev");

// Find a document in a collection.
db.getCollection("repairs").aggregate([
  {
    $addFields: {
      status: "completed",
      //   organization: "public", todo: later
      type: "$boardType",
      category: "$engineMake",
      manufacturer: "$engineMake",
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
        into: "repairs",
        on: "_id",
        whenMatched: "merge",
        whenNotMatched: "discard",
      },
  },
]);

//@ts-nocheck

//finding out if procedures array has any objects missing imageObjs field

[
  {
    $match:
      /**
       * query: The query in MQL.
       */
      {
        //on procerdures array, find objects missing imageObjs field
        procedures: {
          //match any
          $elemMatch: {$or:
            [
            //where imageObjs field does not exist
            imageObjs: {
              $exists: false,
            },
            
          ],
          },
        },
      },
  },
];

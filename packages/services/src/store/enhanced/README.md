# API splitting, caching, and enhancements.
From the enhancement folder, we take our existing generated OpenAPI 
specifications and apply cache tags, invalidation, and otherwise custom
functionality to a moving target.

## **Please make sure that if you create a new api that you follow these rules**
1. Before adding, could another API handle this? 
   a. IE: reportSchedules and reports, do they need to be separate?
2. Can this be done with our custom endpoints?
   a. IE: a custom reducer slice can be created from `src/custom`
3. Has the new enhanced API been imported to the root store configuration and added to the reducer and middleware lists?
4. Make sure that the correct API is being used for enhancements
5. Document overrides to endpoints **carefully** and **clearly**.
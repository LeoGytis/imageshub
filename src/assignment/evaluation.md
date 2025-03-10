# TO DO:

Mediaquery to change on screen change?
Api key hide?
Testing all
Adding NavBar on top
Adding go to top arrow on the corner

# Pros:

Typescript Implementation: Your use of Typescript demonstrates a good understanding of its benefits in enforcing type safety and reducing potential errors in code.

Use of Hooks: We were pleased to see your application of React hooks, which showcases your knowledge of current React features and practices.

Testing Approach: The incorporation of tests within your submission indicates a forward-thinking approach to software development, emphasizing quality and reliability.

# Cons:

Multiple API Requests on Initial Load: Your application makes two API requests upon the initial load. This approach can impact performance and user experience. We recommend exploring ways to optimize this, potentially through combining requests or ensuring critical data is loaded with priority.

Lazy Loading Implementation:
Although an attempt was made to implement lazy loading, it appears not to be functioning as intended. Proper utilization of lazy loading can significantly improve the performance by loading content only when needed.

Non-use of IntersectionObserver:
The absence of the IntersectionObserver for managing visibility and loading of content can also affect the application's efficiency and user experience.

React Code Practices: We observed instances where idiomatic React code conventions were not followed, including the breaking of three specific React rules. Adhering to React's recommended practices is crucial for maintaining code quality and readability.

CSS Styling Approach: Placing all CSS styles in a single file can make the styling difficult to manage as the application grows. Consider modularizing your CSS by component or utilizing CSS-in-JS solutions for better scalability and maintainability.

Mediaquery to change on screen change?
Api key hide?
Testing all
Adding NavBar on top
Adding go to top arrow on the corner

# Positives:

Your effort in implementing the functionalities was clear, and several foundational elements were addressed.
Areas for Improvement:

The FavoritesIcon contained redundant functionality for color management.
There was no deduplication process for images, which can lead to inefficiencies.
Some packages used in the project were outdated, which can pose security and compatibility risks.
The initial page was fetched twice, indicating a need for optimizing the data fetching process.
IDs for unfavorited images were saved in local storage, which might not be the best approach for handling this data.
The last element was selected using vanilla JavaScript, which might not align well with the chosen framework's best practices.
The way windows.innerWidth was mocked was not correct.
Several tests included were dead and didn't contribute to the coverage.
The hover state didn’t work on mobile devices, affecting the user experience.
Some TypeScript typings were redundant, as they were already inferred by TypeScript.

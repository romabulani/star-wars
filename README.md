
<div align="center">
  <img src="/public/starwarslogo.png" height="100" width="100" alt="logo"/>
  <h1>Star Wars Zone</h1>
  <a href="https://star-wars-zone.netlify.app/">Live Website</a>
</div>

## About
**Star Wars Zone** is a web application which displays character details from the Star Wars universe using the SWAPI API. Users can view a list of characters, navigate to detailed views, and manage a favorites list. The application is built with TypeScript and React, utilizing Tailwind CSS for styling and following best practices for maintainability and scalability.

## How to run the app locally?
```
$ git clone https://github.com/romabulani/star-wars.git
$ cd star-wars
$ nvm use
$ npm install
$ npm start
```

## Screens in this project
- Character List View
- Character Details View
- Favorite Characters View
- 404 (Not Found) Page

## Features
### Character List View
 - Lists all characters from the Star Wars universe, displaying their name, gender, and home planet.
 - Pagination controls to navigate through results.
 - Persistent search functionality to query characters by name, maintaining the search query across page reloads.
 - Clicking a character navigates to the character details page.
  
### Character Details View
  - Displays character details: name, hair color, eye color, gender, and home planet.
  - Lists films the character has appeared in.
  - Lists starships the character has piloted.
  - Ability to add characters to the favorites list.
  
### Favorites View
  - Displays all characters added to the favorites list with their name, height, gender, and home planet.
  - Ability to remove characters from the favorites list.
  - Optional: Ability to amend a character's height or gender.

### Performance Enhancements
 - Lazy Loading: Implements lazy loading for character details and favorites page, optimizing initial load times.
 - Caching: Manages API calls with caching to reduce network requests and improve response times.

### Best Practices
 - Test-Driven Development (TDD): A TDD approach was followed for the majority of the components, ensuring that tests are written before the implementation. This practice helps maintain high code quality and reliability. Efforts were made to achieve code coverage above 80%, contributing to the robustness of the application.
 - Clean Folder Structure: The project features a clean and organized folder structure, promoting better maintainability. Components are broken down into smaller, reusable units, which enhances their reusability across different parts of the application. This modular design makes it easier for multiple developers to collaborate and contribute without causing conflicts.

## Tech Stack and Tools
- React JS
- Typescript
- React Router v6
- Tailwind CSS 
- Git For Version Control
- Netlify for Deployment
- React Testing Library and JEST for Testing
- SWAPI (Star Wars API)

### Future Considerations
When considering this project as a foundation for a larger application, the following enhancements could significantly improve user engagement and functionality:

 - State Management: Evaluate if Redux, zustand or a similar state management solution is needed as the application grows.
 - API Handling: Consider adding error handling and loading states for API calls to enhance user experience.
 - Accessibility: Ensure that the application is accessible to all users, adhering to ARIA standards.

### Suggested Enhancements
 - Similar Character Recommendations: Implement a feature that suggests similar characters based on attributes like species, home planet, or appearances in films. This could enhance user engagement by introducing them to lesser-known characters.
 - Share Favorite Characters with Others: Enable users to share their favorite characters through social media or direct links. This feature could allow users to connect with others and discuss their favorite characters.
 - Character Avatars: Integrate avatars for each character to provide a more visually appealing experience. This could include images sourced from the SWAPI or other databases, enhancing the character details view.
 - Leaderboard for Favorites: Create a leaderboard feature that showcases the most popular favorite characters across the user base. This could encourage user interaction and foster a sense of community.

## Live Link
[Star Wars Zone](https://star-wars-zone.netlify.app/)
We are developing a quiz game app, styled as a "pub quiz", where I act as the host to display questions and reveal answers.
The app is a Vite React application, hosted on GitHub Pages, and uses Supabase for the backend.
Key Features:
Quiz Functionality: The app displays questions from the Supabase database and allows revealing the answers.
Navigation: Users can navigate through the questions using keyboard controls (arrow keys) or on-screen buttons.
Direct Links to Questions: Implemented using hash-based routing to provide direct links to specific questions.
Local Storage Sync: The app's state, including revealed answers and current question, is synchronized with local storage under the key "pub-quiz".
Error Handling: Errors, particularly from data fetching, are handled and displayed using a toast() component.
Technical Details:
React Router v6: Used for routing within the app. The routing setup includes nested routes and hash-based navigation for direct question links.
Styling: Tailwind CSS and Shadcn UI are used for styling components.
State Management: a custom hook (useQuiz) manages the quiz state.
Data Fetching: Supabase's JS library V2 is utilized for fetching quiz data from the database.
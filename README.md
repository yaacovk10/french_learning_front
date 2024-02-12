# French Learning Application

This application is designed to help users learn French through interactive lessons and exercises. It leverages React Redux for state management, providing a robust and scalable solution for web application development.

## Features

- **Interactive Lessons**: Engage with lessons designed to teach French in an interactive manner.
- **Exercises**: Test your knowledge and pronunciation with exercises that provide instant feedback.
- **Speech Synthesis**: Utilize the Web Speech API's speech synthesis interface to hear how words are pronounced.
- **Speech Recognition**: Practice pronunciation and receive feedback through speech recognition technology.
- **Photo Illustrations**: Each word comes with a photo fetched from Pexels API to enhance learning through visual aids.

## Technologies Used

- React Redux: For efficient state management across the application.
- React Bootstrap: For responsive design and layout.
- Pexels API: To fetch relevant photos for each word or phrase.
- Web Speech API: For speech synthesis and recognition functionalities.

## Getting Started

To run this project locally, ensure you have [Node.js](https://nodejs.org/) installed on your system. Then, follow these steps:

1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/yaacovk10/french_learning_front.git
    ```
2. Navigate to the project directory:
    ```bash
    cd my-app
    ```
3. Install dependencies:
    ```bash
    npm install react react-dom react-scripts redux react-redux @reduxjs/toolkit react-router-dom react-bootstrap bootstrap axios

    ```
4. Start the development server:
    ```bash
    npm start
    ```

The application will now be running on [http://localhost:3000](http://localhost:3000).

## Backend Integration

This project is designed to interact with a backend service that provides data for learning French. Ensure the backend service is running and accessible. The application fetches lesson content, exercises, and other relevant data from this service to provide an immersive learning experience.

## External Features

- **React Bootstrap**: For modern, responsive UI components.
- **Pexels API**: Used to fetch and display photos related to the learning content.
- **Web Speech API**: For implementing speech synthesis and recognition to aid in learning pronunciation.

## Contribution

Contributions are welcome. Please feel free to fork the repository, make changes, and submit pull requests.

## License

This project is open-source and available under the MIT License.

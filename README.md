# Notes frontend

This repository contains the frontend developed from part 2 onwards in the Full Stack course. The different stages of the application are saved in different branches.

Notes frontend is a simple web application for saving notes. It is developed using React and Vite. From part 3 of the course onwards, it is intended to be used with a separate backend, which is available in the repository https://github.com/fullstack-hy2020/part3-notes-backend.

## Running the application on your own machine

You can easily try out the application on your own machine. The current version of the application is developed using Node version 22.3.0. For the best experience, it is recommended to use the same major version of Node, but the application will likely work with other Node versions as well.

Follow these steps to run the application:

1. Clone this repository to your own machine with the command `git clone https://github.com/fullstack-hy2020/part2-notes-frontend.git`

2. Navigate to the cloned repository with the command `cd part2-notes-frontend`

3. Switch to the desired branch with the command `git switch <branch-name>`

4. Install the node modules with the command `npm install`

5. Start the application with the command `npm run dev`. By default, the application will start on port 5173, so it will be available at http://localhost:5173/

6. If you are in branches part2-4 to part2-8, additionally start the JSON server by running the command `npm run server` in a separate terminal window

From part 3 onwards, the frontend is used with a [separate backend](https://github.com/fullstack-hy2020/part3-notes-backend).

## How to switch between branches?

The different stages of the application are saved in different branches. Switching branches changes the code in your working directory to match the state of the branch you switched to. This allows you to work on different versions of the application without affecting the codebase of other branches.

You can switch to the desired branch by running the command `git switch <branch-name>`, for example `git switch part2-2`. Note that new dependencies are added to the application as development progresses, so after switching branches, it is safest to run the command `npm install` to ensure that any missing node modules will be installed on your machine.

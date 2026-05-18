# Weather Wear

## Project Description

Weather Wear is a full-stack web application designed to help users decide what to wear based on current weather conditions. Users can search for weather information by city and view details such as temperature, humidity, wind, and general weather conditions. The application also includes a wardrobe system where users can browse clothing items stored in the database and add their own clothing items through a form.

This project was built using:
- Node.js and Express for the backend
- Supabase for database management
- WeatherAPI for real-time weather data
- HTML, CSS, and JavaScript for the frontend
- Vercel for deployment

---

## Target Browsers

Weather Wear was designed for modern desktop browsers including:
- Google Chrome
- Microsoft Edge
- Mozilla Firefox

The application was primarily tested on Google Chrome and Microsoft Edge.

---

## Features

### Home Page
- Search weather conditions by city
- View current weather information
- Display weather details including temperature, humidity, wind speed, and weather conditions

### Wardrobe Page
- View clothing items stored in the database
- Add new clothing items using a form
- Optionally include clothing image URLs

### About Page
- Learn more about the purpose and goals of the application

---

## Technologies Used

- Node.js
- Express.js
- Supabase
- WeatherAPI
- Axios
- HTML5
- CSS3
- JavaScript
- Vercel

---

## Deployment Link

https://inst377-final-project-ochre.vercel.app/

---

# Developer Manual

## Installation

Clone the repository:

```bash
git clone git@github.com:cod3ric/inst377-final-project.git
```

Install the required dependencies:

```bash
npm install express body-parser axios dotenv @supabase/supabase-js nodemon
```

Create a `.env` file in the root directory of the project and include the following environment variables:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
WEATHER_API_KEY=your_weather_api_key
```

---

## Running the Application Locally

Start the server with:

```bash
npm start
```

The application will run locally at:

```text
http://localhost:3000
```

---

## Running the Application on Vercel

This application is deployed using Vercel.

The deployment configuration is handled through the `vercel.json` file using the `@vercel/node` runtime.

The following environment variables must also be added in the Vercel project settings:
- `SUPABASE_URL`
- `SUPABASE_KEY`
- `WEATHER_API_KEY`

---


## API Endpoints

### GET `/api/weather`

Retrieves current weather and forecast data from WeatherAPI using a city query parameter.

Example request:

```text
/api/weather?city=College%20Park
```

Used for:
- Home page weather search functionality

---

### GET `/clothes`

Retrieves all clothing items currently stored in the Supabase database.

Used for:
- Displaying wardrobe items in the wardrobe table

---

### POST `/clothes`

Adds a new clothing item to the Supabase database.

Example request body:

```json
{
  "name": "Hoodie",
  "category": "Outerwear",
  "weatherType": "cold",
  "minTemp": 30,
  "maxTemp": 60,
  "imageURL": ""
}
```

Used for:
- Submitting new clothing items from the wardrobe form

---

## Known Bugs

- The wardrobe database currently allows duplicate clothing items to be added.
- Some clothing images may not display if an invalid image URL is provided.
- Dynamic outfit recommendations based on clothing items in the wardrobe database have not yet been fully implemented.

---

## Future Development

Possible future improvements for the project include:
- Displaying recommended clothing items on the Home page based on weather conditions
- Adding duplicate clothing validation
- Adding edit and delete functionality for wardrobe items
- Implementing login system for personalized data
- Improving mobile responsiveness
- Support Image Uploading
- Adding additional frontend JavaScript libraries for improved user experience and data visualization

---

## Repository

GitHub Repository:

https://github.com/cod3ric/inst377-final-project
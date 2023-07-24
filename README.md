# Product Listing Page

This responsive product listing page is a sample e-commerce web application built using React library, Typescript and zustand as a state management tool. This repo only has frontend code.

## Sample Video of the product listing page

![](./product_listing_page.gif)

## Features

- Product listing with endless scrolling
- Hover functionality on product which then displays more information of the product eg: colors
- Dynamic Filter functionality which can be used to filter Brands.
- Product comparison overlay - One can select products upto maximum of 4 to compare between products. An dailog box will be shown with all the comparison
- Mini Basket - If interested in the product, one can add the product to the basket using '+' icon displayed in the product. One can also click on the basket on the top right to open basket items and total cost of the purchase
- Page is responsive

# Technical details of the web application

- This web application is built using React library, Typescript and zustand as a state management tool to manage states
- Zustand was chosen Redux and ContextAPI because library bundle size is quite less and less boiler platy like Redux. Store in zustand acts like a hooks which is easier to integrate and has better DX experience.
- Typescript is chosen for development along with React for type safety
- Endless scrolling requires a backend to send the data for different pages and JSONPlaceholder free fake API was used for this purpose.
- Product pricing - Since the product listing required more data, random number between 100-200 is generated for every product and currency is taken Euro
- Product information - JSONPlaceholder API sends a title property in its API and this was used for information.
- Product colors - random 4 colors is generated for every product and displayed on hover.
- Node version 16.20.0 and NPM version 8.19.4 is used in this project

# Setting up this project / How to run this project locally ?

Git clone this repo using the link given by Github

`git clone url`

Use proper node version and npm version used for this project. For that, we use NVM(node version manager) and please type the below command from the root folder. Below will automatically set node and npm version for this project

`nvm use`

Install the dependencies using below command

`npm install`

If you dont get error, we can start the web application by follwing command

`npm start`
Web application starts in default local host with a port 3000. If you have something running on that port, you can use any other port by using bewlo command. You can use any port number of your choice

`PORT=8000 npm start`

Once the web application is running, you can check the features mentioned above. Please report any issues when running this application.

We can build the web application for deployment using the following command.

`npm run build`

#Things that could be improved

- Can improve endless scrolling, May be add a button to fetch new list. Top or bottom
- Better way to handle images of different sizes.
- Cross browser support
- Improve responsiveness
- Better DX experience
- Add more categories to filter page

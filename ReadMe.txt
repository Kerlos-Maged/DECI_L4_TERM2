Project Setup and Testing Scripts
Install Dependencies: npm install express sharp multer @types/express @types/sharp @types/multer jasmine supertest ts-node ts-node-dev typescript
npm install eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-base eslint-plugin-import eslint-plugin-prettier prettier --save-dev
Build Project: npm run build
Run Linter: npm run lint
Format Code: npm run prettify
Run Tests: npm run test
Start Development Server: npm run start
How to Use
The server operates on localhost:3000.

Accessing the Web Application
Visit: http://localhost:3000/

Image Resizing Endpoint
Endpoint: http://localhost:3000/api/images/list

Project Structure
The project is organized to enhance readability, understanding, and future development:

image-processing-web-app/
├── assets/
│   └── images/
│       ├── full/
│       └── thumb/
├── dist/
├── frontend/
│   ├── script.js
│   ├── index.html
│   └── style.css
├── node_modules/
├── src/
│   ├── routes/
│   │   ├── api/
│   │   │   ├── images.ts
│   │   │   └── upload.ts
│   │   └── index.ts
│   ├── tests/
│   │   ├── helpers/
│   │   │   └── reporter.ts
│   │   ├── testsSpec.ts
│   │   └── handlerSpec.ts
│   ├── fileHandler.ts
│   ├── imgResizing.ts
│   └── index.ts
├── Spec/support
│   └──jasmine.json
├── .eslintignore
├── .eslintrc.json
├── .prettierrc.json
├── package-lock.json
├── package.json
├── ReadMe.txt
└── tsconfig.json
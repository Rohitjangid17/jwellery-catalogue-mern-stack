// import "./src/config/env.config.js";

// import app from "./src/app.js";
// import connectDatabase from "./src/config/database.config.js";

// const PORT = process.env.PORT || 5000;

// const startServer = async () => {
//   try {
//     await connectDatabase();

//      app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error("Server not started because DB failed");
//     // process.exit(1);
//   }
// };

// startServer();

import app from "./src/app.js";

export default app;


const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Set up static files directory
app.use(express.static(path.join(__dirname, "public")));

// Set up views directory and template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/portfolio", (req, res) => {
  res.render("portfolio");
});

app.get("/project", (req, res) => {
  res.render("project");
});

app.get("/skill", (req, res) => {
  res.render("skill");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

// ... sending email...

app.post("/submit_form", async (req, res) => {
  const {
    "your-name": yourName,
    "your-email": yourEmail,
    "your-message": yourMessage,
  } = req.body;

  // Create a transporter object
  const transporter = nodemailer.createTransport({
    service: "Gmail", // You can change this based on your email provider
    auth: {
      user: "connect2abdulaziz@gmail.com", // Your email address
      pass: "apswwmusqflnfgal", // Your email password
    },
  });

  // Set up email data
  const mailOptions = {
    from: "connect2abdulaziz@gmail.com", // Sender address
    to: "connect2abdulaziz@gmail.com", // Recipient address
    subject: "New Form Submission", // Subject line
    text: `Name: ${yourName}\nEmail: ${yourEmail}\nMessage: ${yourMessage}`, // Email content
  };
  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    res.render("success"); // Render the success view
  } catch (error) {
    console.error("Error sending email:", error);
    res.render("error"); // Render the error view
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// const express = require("express");
// const path = require("path");
// const bodyParser = require("body-parser");
// const nodemailer = require("nodemailer");
// const cacheControl = require("express-cache-controller");

// const app = express();
// const PORT = 3000;

// // Middleware
// app.use(express.static(path.join(__dirname, "public")));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'));

// app.use(cacheControl({ noCache: true }), (req, res, next) => {
//   next();
// });

// app.get("/success.html", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "success.html"));
// });
// // Define the route for the error page
// app.get("/error.html", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "error.html"));
// });

// // Define routes
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "views", "index.html"));
// });

// app.get("/about", (req, res) => {
//   res.sendFile(path.join(__dirname, "views", "about.html"));
// });

// app.get("/portfolio", (req, res) => {
//   res.sendFile(path.join(__dirname, "views", "portfolio.html"));
// });

// app.get("/skill", (req, res) => {
//   res.sendFile(path.join(__dirname, "views", "skill.html"));
// });

// app.get("/project", (req, res) => {
//   res.sendFile(path.join(__dirname, "views", "project.html"));
// });

// app.get("/contact", (req, res) => {
//   res.sendFile(path.join(__dirname, "views", "contact.html"));
// });

// // Add more routes here...

// app.use(express.json());
// app.get("/js/script.js", (req, res) => {
//   res.sendFile(__dirname + "/js/script.js", { type: "text/javascript" });
// });

// app.post("/send-email", (req, res) => {
//   const { name, email, message } = req.body;

//   const transporter = nodemailer.createTransport({
//     service: "Gmail",
//     auth: {
//       user: "connect2abdulaziz@gmail.com", // Replace with your Gmail email
//       pass: "apswwmusqflnfgal", // Replace with your Gmail password
//     },
//   });

//   const mailOptions = {
//     from: "connect2abdulaziz@gmail.com", // Replace with your Gmail email
//     to: "connect2abdulaziz@gmail.com", // Replace with your email to receive messages
//     subject: "New Contact Form Submission",
//     text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error("Error sending email:", error);
//       res.status(500).json({ message: "Error sending email" });
//     } else {
//       console.log("Email sent:", info.response);
//       res.status(200).json({ message: "Email sent successfully" });
//     }
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// // // POST route for form submission
// // app.post("/submit_form", (req, res) => {
// //   console.log('Received POST request at /submit_form');
// //   console.log('Request Body:', req.body);
// //   const yourName = req.body["your-name"];
// //   const yourEmail = req.body['your-email'];
// //   const yourMessage = req.body['your-message'];

// //   console.log(yourName);
// //   console.log(yourEmail);
// //   console.log(yourMessage);

// //   // Define recipients (recipient's email address)
// //   const recipientEmail = 'connect2abdulaziz@gmail.com'; // Replace with the actual recipient's email address

// //   // Send email
// //   sendEmail(yourName, yourEmail, yourMessage, recipientEmail)
// //     .then(() => {
// //       res.redirect("/success.html"); // Redirect to a success page
// //     })
// //     .catch((error) => {
// //       console.error("Error sending email:", error);
// //       res.redirect("/error.html"); // Redirect to an error page
// //     });
// // });

// // // Start the server
// // app.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`);
// // });

// // // Function to send email
// // async function sendEmail(name, email, message, recipientEmail) {
// //   const transporter = nodemailer.createTransport({
// //     service: "Gmail",
// //     auth: {
// //       user: "connect2abdulaziz@gmail.com", // Replace with your Gmail address
// //       pass: "apswwmusqflnfgal", // Replace with your Gmail app password
// //     },
// //   });

// //   const mailOptions = {
// //     from: "connect2abdulaziz@gmail.com", // Replace with your Gmail address
// //     to: recipientEmail,
// //     subject: `New Contact Form Submission from ${name}`,
// //     text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
// //   };

// //   return new Promise((resolve, reject) => {
// //     transporter.sendMail(mailOptions, (error, info) => {
// //       if (error) {
// //         console.error("Error sending email:", error);
// //         reject(error);
// //       } else {
// //         console.log("Email sent:", info.response);
// //         resolve();
// //       }
// //     });
// //   });
// // }

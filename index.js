/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

// 1. Use the inquirer npm package to get user input.
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    /* Pass your questions in here */
    {
      type: "input",
      name: "url",
      message: "Please provide the URL for the QR Code: ",
    },
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    console.log(JSON.stringify(answers, null, "  "));

    var myUrl = answers;
    console.log(myUrl.url);

    // 2. Use the qr-image npm package to turn the user entered URL into a QR code image.
    var qr_png = qr.image(myUrl.url, { type: "png", size: 10 });
    qr_png.pipe(fs.createWriteStream("qr_img.png"));

    // 3. Create a txt file to save the user input using the native fs node module.

    fs.writeFile("URL.txt", myUrl.url, (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

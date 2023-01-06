const pdf = require("html-pdf");
const { generateHTML } = require("../Utilities/buildHTML");

const options = {
  format: "Letter",
  border: {
    top: "1.27cm",
    right: "1.27cm",
    bottom: "1.27cm",
    left: "1.27cm",
  },
};

module.exports = {
  createKalpas: async (req, res, next) => {
    try {
      // Creating PDF
      let data = await generateHTML(req.body);
      let fileName = "Invoice_" + Date.now();

      pdf
        .create(data, options)
        .toFile(`./Public/${fileName}.pdf`, function (err, response) {
          console.log("File", response);
          if (err) return err;
          res.send({
            status: 1,
            message: "Invoice generated successfully",
            file: `https://mlll.one/${fileName}.pdf`,
          });
        });
    } catch (error) {
      res.status(500);
      res.send({ status: 0, message: "Error generating invoice", err: error });
    }
  },
};

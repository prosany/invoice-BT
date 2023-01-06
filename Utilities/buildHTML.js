const moment = require("moment");

module.exports = {
  generateHTML: async function (data) {
    let {
      invoiceNumber,
      invoiceDate,
      companyLogo,
      companyName,
      cmAddress1,
      cmAddress2,
      cmEmail,
      cmWebsite,
      urName,
      urPosition,
      urAddress,
      urEmail,
      urWebsite,
      urPhone,
      services,
      charge,
      note,
      currency,
    } = data;

    let number =
      "0" +
      String(Number(urPhone) / 1000000)
        .split(".")
        .join("-");
    let modifyPhone = number.replace("0", "(+880) ");
    let totalQTY = await services.reduce((a, b) => a + Number(b.qty), 0);
    let totalDays = await services.reduce((a, b) => a + Number(b.days), 0);
    let subTotal =
      (await services.reduce((a, b) => a + Number(b.amount), 0)) - charge;
    let date = invoiceDate;
    // moment(invoiceDate).format("dddd, Do MMMM YYYY");
    return `<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <title>HTML To PDF</title>
            <style>
            @font-face {
              font-family: "Maven_Pro_Sunny";
              src: url("https://res.cloudinary.com/mahabubsunny/raw/upload/v1645816615/fonts/MavenPro-Regular_hw1ter.ttf")
                format("truetype");
              font-weight: 400;
            }
            @font-face {
              font-family: "Maven_Pro_Sunny";
              src: url("https://res.cloudinary.com/mahabubsunny/raw/upload/v1645816615/fonts/MavenPro-Medium_fkerle.ttf")
                format("truetype");
              font-weight: 500;
            }
            @font-face {
              font-family: "Maven_Pro_Sunny";
              src: url("https://res.cloudinary.com/mahabubsunny/raw/upload/v1645816615/fonts/MavenPro-Bold_ummwu2.ttf")
                format("truetype");
              font-weight: 600;
            }
            @font-face {
              font-family: "Open_Sans_Hebrew_Sunny";
              src: url("https://res.cloudinary.com/mahabubsunny/raw/upload/v1645816616/fonts/OpenSansHebrew-Light_sc0uyy.ttf")
                format("truetype");
              font-weight: 300;
            }
            @font-face {
              font-family: "Open_Sans_Hebrew_Sunny";
              src: url("https://res.cloudinary.com/mahabubsunny/raw/upload/v1645816616/fonts/OpenSansHebrew-Regular_enx609.ttf")
                format("truetype");
              font-weight: 400;
            }
            @font-face {
              font-family: "Open_Sans_Hebrew_Sunny";
              src: url("https://res.cloudinary.com/mahabubsunny/raw/upload/v1645816615/fonts/OpenSansHebrew-Bold_xha72k.ttf")
                format("truetype");
              font-weight: 600;
            }
            </style>
            <style>
              * {
                border: 0;
                box-sizing: border-box;
                margin: 0;
                padding: 0;
                text-decoration: none;
              }
              body {
                height: 19cm;
                position: relative;
                background: transparent;
              }
              .header {
                width: 100%;
                overflow: hidden;
              }
              .invoice_id {
                width: 50%;
                float: left;
                font-size: 8px;
                font-family: "Maven_Pro_Sunny", sans-serif;
              }
              .invoice_id > h1 {
                font-weight: 600;
                font-style: normal;
              }
              .invoice_id > h1 > .invoice_number {
                font-weight: 400;
              }
              .invoice_id > p {
                font-weight: 400;
                font-family: "Open_Sans_Hebrew_Sunny", sans-serif;
              }
              .invoice_logo {
                width: 50%;
                float: right;
                text-align: right;
                align-items: center;
              }
              .invoice_logo img {
                width: 90px;
                height: auto;
                padding-top: 2px;
                padding-right: 3px;
              }
        
              .user_info {
                width: 100%;
                overflow: hidden;
                margin-top: 40px;
              }
              .bill_to {
                width: 55%;
                float: left;
              }
              .ship_to {
                width: 45%;
                float: right;
              }
              .from_to_head {
                font-weight: 600;
                font-size: 7px;
                font-family: "Maven_Pro_Sunny", sans-serif;
                color: #464646;
                text-transform: uppercase;
              }
              .no_color {
                color: #fff !important;
              }
              .from_to_title {
                font-weight: 600;
                font-size: 10px;
                font-family: "Open_Sans_Hebrew_Sunny", sans-serif;
                color: #000000;
              }
              .from_to_others {
                font-weight: 400;
                font-size: 9px;
                font-family: "Open_Sans_Hebrew_Sunny", sans-serif;
                color: #000000;
              }
        
              .table_data {
                width: 100%;
                overflow: hidden;
                margin-top: 30px;
              }
              .table_data > table {
                width: 100%;
                border-collapse: collapse;
                border-spacing: 0;
                font-family: "Open_Sans_Hebrew_Sunny", sans-serif;
                font-size: 8px;
                color: #000000;
              }
              .table_head {
                font-weight: 400;
                font-size: 7px;
                font-family: "Open_Sans_Hebrew_Sunny", sans-serif;
                color: #464646;
                text-transform: uppercase;
              }
              .table_content {
                font-weight: 400;
                font-size: 9px;
                font-family: "Open_Sans_Hebrew_Sunny", sans-serif;
                color: #111111;
                text-transform: capitalize;
              }
              .table_itself tr:nth-child(even) {
                background-color: #f2f2f2;
              }
              .table_itself tr > th {
                padding: 6px 0;
              }
        
              .table2_itself {
                margin-top: 10px;
              }
              .table2_itself tr > th {
                padding: 6px 0;
              }
              .table2_head {
                font-weight: 400;
                font-size: 7px;
                font-family: "Open_Sans_Hebrew_Sunny", sans-serif;
                color: #464646;
                text-transform: uppercase;
              }
              .table2_content {
                font-weight: 400;
                font-size: 9px;
                font-family: "Open_Sans_Hebrew_Sunny", sans-serif;
                color: #111111;
                text-transform: capitalize;
              }
        
              .footer_info {
                width: 100%;
                position: absolute;
                bottom: 0;
              }
              .footer_info > .deatils {
                width: 33.33%;
                float: left;
                text-align: center;
              }
              .footer_info > .deatils > p {
                font-weight: 400;
                font-size: 8px;
                font-family: "Open_Sans_Hebrew_Sunny", sans-serif;
                color: #111111;
                text-transform: capitalize;
              }
        
             
            </style>
          </head>
          <body>
            <div class="header">
              <div class="invoice_id">
                <h1>Invoice <span class="invoice_number">#${invoiceNumber}</span></h1>
                <p>${date}</p>
              </div>
              <div class="invoice_logo">
                <img
                  src="${companyLogo}"
                  alt=""
                />
              </div>
            </div>
            <div class="user_info">
              <div class="bill_to">
                <h2 class="from_to_head">Bill To</h2>
                <h1 class="from_to_title">${companyName}</h1>
                <p class="from_to_others">
                  ${cmAddress1}
                </p>
                <p class="from_to_others">${cmAddress2}</p>
                <p class="from_to_others">Email: ${cmEmail}</p>
                <p class="from_to_others">Website: ${cmWebsite}</p>
              </div>
              <div class="ship_to">
                <h2 class="from_to_head no_color">Ship To</h2>
                <h1 class="from_to_title">${urName}</h1>
                <p class="from_to_others">${urPosition}</p>
                <p class="from_to_others">
                  ${urAddress}
                </p>
                <p class="from_to_others">Email: ${urEmail}</p>
                <p class="from_to_others">Website: ${urWebsite}</p>
              </div>
            </div>
            <div class="table_data" style="color: #fff;">
              <table class="table_itself" style="color: #fff;">
              <tr style="color: #fff;">
                <th class="table_head" style="width: 9%">
                  #
                </th>
                <th class="table_head" style="width: 40%">
                  Service
                </th>
                <th class="table_head" style="width: 17%">
                  QTY
                </th>
                <th class="table_head" style="width: 17%">
                  Days
                </th>
                <th class="table_head" style="width: 17%">
                  Price
                </th>
              </tr>
              ${services.map((service, idx) => {
                let data = ``;
                data += `<tr><th class="table_content">${
                  idx + 1
                }</th><th class="table_content">${
                  service.name
                }</th><th class="table_content">${
                  service.qty
                }</th><th class="table_content">${
                  service.days || "-"
                }</th><th class="table_content">${currency}${
                  service.amount
                }</th></tr>`;
                return data;
              })}
              </table>
        
              <table class="table2_itself">
                <tr>
                  <th class="table2_head" style="width: 49%; text-align: left">
                    Notes
                  </th>
                  <th class="table2_head" style="width: 17%">QTY</th>
                  <th class="table2_head" style="width: 17%">Total Days</th>
                  <th class="table2_head" style="width: 17%">TAX Rate</th>
                </tr>
                <tr>
                  <th class="table2_content" style="width: 49%; text-align: left">
                    ${note}
                  </th>
                  <th class="table2_content">${totalQTY}</th>
                  <th class="table2_content">${
                    totalDays === 0 ? "-" : totalDays
                  }</th>
                  <th class="table2_content">0%</th>
                </tr>
                <tr>
                  <th class="table2_content"></th>
                  <th class="table2_content"></th>
                  <th class="table2_head">Payoneer Charge</th>
                  <th class="table2_head">Subtotal</th>
                </tr>
                <tr>
                  <th class="table2_content"></th>
                  <th class="table2_content"></th>
                  <th class="table2_content">${currency}${charge}</th>
                  <th class="table2_content">${currency}${subTotal}</th>
                </tr>
              </table>
            </div>
            <div class="footer_info">
              <div class="deatils">
                <p>Position</p>
                <p>${urPosition}</p>
              </div>
              <div class="deatils no_reqired">
                <p>Website</p>
                <p style="text-transform: lowercase">${urWebsite}</p>
              </div>
              <div class="deatils">
                <p>Telephone</p>
                <p>${modifyPhone}</p>
              </div>
            </div>
          </body>
        </html>
        `;
  },
};

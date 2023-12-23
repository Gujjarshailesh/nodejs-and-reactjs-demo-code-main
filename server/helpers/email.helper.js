const nodemailer = require('nodemailer');
const models = require('../models/index');

const transporter = nodemailer.createTransport({
  service: process.env.EMAILSERVICE,
  port: 587,
  secure: true,
  auth: {
    user: process.env.EMAILUSER,
    pass: process.env.EMAILPASSWORD,
  },
});
const crontTransporter = nodemailer.createTransport({
  service: process.env.CRON_EMAILSERVICE,
  port: 587,
  secure: true,
  auth: {
    user: process.env.CRON_EMAILUSER,
    pass: process.env.CRON_EMAILPASSWORD,
  },
});
const sendEmail = async (emailOptions, type = 'normal') => {
  let emailSent = false;
  if (!emailOptions.template && !emailOptions.html) {
    throw new Error('Please provide template or html content.');
  }

  /** ************** Retrive Email Template ****************** */
  const emailTemplate = await models.EmailTemplate.findOne({
    where: { email_template_key: emailOptions.template },
  });
  let htmlContent = emailTemplate.content;

  /** ************** Replace Dynamic Shortcodes in Email Content ****************** */

  const replacement = new RegExp(
    `{{${Object.keys(emailOptions.replacements).join('}}|{{')}}}`,
    'gi'
  );
  htmlContent = htmlContent.replace(
    replacement,
    (matched) =>
      emailOptions.replacements[matched.replace('{{', '').replace('}}', '')]
  );
  const emailConfig = {
    to: emailOptions.to,
    from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
    subject: `${emailTemplate.subject}`,
    html: `<html>

    <head></head>
    
    <body>
        <table width='100%' border='0' cellpadding='0' cellspacing='0' style='border-collapse: collapse ; margin: 0px ; padding: 0px ; table-layout: fixed ; width: 100% ; height: 90px;width: 640px ; margin: 0px auto ;'>
            <tbody>
                <tr>
                    <td align=' center' style='width: 640px ; margin: 0px auto ; background-color: #ECECEC ; background-size: cover;padding: 24px 0 38px; text-align:center' valign='top'>
                        <a href='#'>
                            <img alt='Telepath' style="width: auto; height: 90px;" src="">
    
                        </a>
                    </td>
                </tr>
                <tr>
                    <td>
                        <br>
                        <p>${htmlContent}</p>
                        <strong>Thanks,</strong>
                        <br>
                        <strong>Telepath</strong>
                        <br>
                        <br>
                    </td>
                </tr>
                <tr style='background-color: #484848;'>
                    <td class='content-block' style='text-align: center;width: 100%;padding-top: 20px;'>
    
                    </td>
                </tr>
                <tr style='background-color: #484848; '>
                    <td style='color: #fff; font-weight: 400; font-size: 16px; line-height: 15px; padding: 20px 0px;' align='center'></td>
                </tr>
            </tbody>
        </table>
    </body>
    
    </html>`,
  };

  if (type === 'cron') {
    await crontTransporter
      .sendMail(emailConfig)
      .then(() => {
        emailSent = true;
      })
      .catch(async (error) => {
        console.log(error);
        if (error.response) {
          console.error(error.response.body);
        }
      });
  } else {
    await transporter
      .sendMail(emailConfig)
      .then(() => {
        emailSent = true;
      })
      .catch(async (error) => {
        console.log(error);
        if (error.response) {
          console.error(error.response.body);
        }
      });
  }
  return emailSent;
};

module.exports = {
  sendEmail,
};

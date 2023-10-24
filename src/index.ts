import * as core from "@actions/core";
import nodemailer from "nodemailer";

// setup nodemailer
const transporter = nodemailer.createTransport({
  host: core.getInput("smtp-server"),
  port: parseInt(core.getInput("smtp-port")),
  secure: true,
  auth: {
    user: core.getInput("smtp-username"),
    pass: core.getInput("smtp-password"),
  },
});

run()
  .then((r) => core.info("Action completed successfully"))
  .catch((e) => core.setFailed(e));

async function run(): Promise<void> {
  // log server
  core.info(
    `Sending email via ${core.getInput("smtp-server")}:${core.getInput(
      "smtp-port",
    )}`,
  );
  // log username
  core.info(`Sending email as ${core.getInput("smtp-username")}`);
  try {
    const sender = core.getInput("sender");
    const recipients = core.getInput("recipients").split(",");
    const subject = core.getInput("subject");
    const body = core.getInput("body");
    const html = core.getInput("html") === "true";
    const message = {
      from: sender,
      to: recipients,
      subject: subject,
      text: body,
      html: html ? body : undefined,
      body: html ? undefined : body,
    };
    transporter.sendMail(message, (error, info) => {
      if (error) {
        core.setFailed(error.message);
        return;
      } else {
        core.setOutput("message", `Email sent successfully: ${info.messageId}`);
      }
    });
    core.setOutput("message", "Email sent successfully");
  } catch (error) {
    core.setFailed("Email failed to send, unexpected error occurred");
  }
}

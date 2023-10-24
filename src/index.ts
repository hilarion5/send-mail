import * as core from "@actions/core";
import nodemailer from "nodemailer";

// setup nodemailer
const transporter = nodemailer.createTransport({
  host: core.getInput("smtp-server"),
  port: parseInt(core.getInput("smtp-port")),
  secure: core.getInput("smtp-secure") === "true",
  auth: {
    user: core.getInput("username"),
    pass: core.getInput("password"),
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
  core.info(`Sending email as ${core.getInput("username")}`);
  try {
    const sender = core.getInput("from-email");
    const recipients = core.getInput("to-email").split(",");
    const subject = core.getInput("subject");
    const body = core.getInput("body");
    const html = core.getInput("html") === "true";
    const message = {
      from: sender,
      to: recipients,
      subject: subject,
      body: body,
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

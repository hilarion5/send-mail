import * as core from "@actions/core";
import { createTransport, SentMessageInfo, Transporter } from "nodemailer";
import Mail from "nodemailer/lib/mailer";

// setup nodemailer
const transporter: Transporter<SentMessageInfo> = createTransport({
  host: core.getInput("smtp-server"),
  port: parseInt(core.getInput("smtp-port")),
  secure: core.getInput("smtp-secure") === "true",
  auth: {
    user: core.getInput("username"),
    pass: core.getInput("password"),
  },
});

run()
  .then(() => core.info("Action completed successfully"))
  .catch((e) => core.setFailed(e));

async function run(): Promise<void> {
  // log server info
  core.info(
    `Sending email via ${core.getInput("smtp-server")}:${core.getInput(
      "smtp-port",
    )}`,
  );
  core.info(`Sending email as ${core.getInput("from-email")}`);

  const sender: string = core.getInput("from-email");
  const recipients: string[] = core.getInput("to-email").split(",");
  const subject: string = core.getInput("subject");
  const body: string = core.getInput("body");
  const html: string = core.getInput("html");
  const message: Mail.Options = {
    from: sender,
    to: recipients,
    subject: subject,
  };
  if (body !== "") {
    message.text = body;
  } else if (html !== "") {
    message.html = html;
  } else {
    throw new Error("No body or html provided");
  }
  transporter.sendMail(
    message,
    (error: Error | null, info: SentMessageInfo): void => {
      if (error) {
        throw error;
      }
      core.info(`Email sent successfully: ${info.messageId}`);
    },
  );
}

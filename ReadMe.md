# Send Email via SMTP GitHub Action

Easily send emails via SMTP directly from your GitHub workflows with this action.

## Description

This action allows you to send emails using SMTP. It's perfect for sending notifications, alerts, or any other type of email directly from your GitHub workflows.

## Inputs

### `smtp-server`

**Description**: The SMTP server to use.  

### `smtp-port`

**Description**: The SMTP port to use.  
**Default**: `465`

### `smtp-secure`

**Description**: Specifies if the SMTP server uses SSL.  
**Default**: `true`

### `from-email`

**Description**: The email address the mail gets sent from. 

### `to-email`

**Description**: The recipients of the mail, separated by commas.  

### `username`

**Description**: The username of the mail account.  

### `password`

**Description**: The password of the mail account.  

### `subject`

**Description**: The subject of the mail.  

### `body`

**Description**: The body content of the mail.  
**Usage**: Plain text for the content of the mail. If this is set, html input is ignored.

### `html`

**Description**: HTML content of the mail.
**Usage**: HTML content for the content of the mail. Supports multi-line input.

## Usage Example

```yaml
steps:
  - name: Send Email
    uses: hilarion5/send-mail@v1
    with:
      smtp-server: smtp.example.com
      smtp-port: 465
      smtp-secure: true
      from-email: sender@example.com
      to-email: recipient1@example.com,recipient2@example.com
      username: yourusername
      password: yourpassword
      subject: Test Email
      body: This is a test email sent from GitHub Actions.
      html: |
        <h1>This is a test email</h1>
        <p>Test Paragraph</p>

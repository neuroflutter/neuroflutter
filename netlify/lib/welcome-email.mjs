/**
 * The welcome email.
 *
 * Written as tables with inline styles because that is the only thing every
 * mail app renders the same way. Colours are taken from the website's own
 * palette in src/app/globals.css, so the email and the site look related.
 *
 * Bodoni Moda and Spectral cannot be loaded in email, so this falls back to
 * Georgia, which almost every device already has and sits closest to them.
 */

const PAPER = "#f3fafd";
const BLUE = "#dceff9";
const BLUE_DEEP = "#c9e2f0";
const MAROON = "#78364d";
const MAROON_SOFT = "#9a6779";
const INK = "#465560";
const INK_SOFT = "#6e7c87";
const ON_MAROON = "#f6fbfd";

const SERIF = "Georgia, 'Times New Roman', Times, serif";

const eyebrow = (text) => `
  <p style="margin:0 0 14px;font-family:${SERIF};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${MAROON_SOFT};">${text}</p>`;

const para = (text) => `
  <p style="margin:0 0 18px;font-family:${SERIF};font-size:16px;line-height:1.8;color:${INK};">${text}</p>`;

export function welcomeEmail({ unsubscribeUrl } = {}) {
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Welcome to NeuroFlutter</title>
</head>
<body style="margin:0;padding:0;background:${BLUE};">

<!-- Shown in the inbox list under the subject line, never on the page. -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">
  A space where neuroscience meets research, art and creativity. We're so happy you're here.
</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BLUE};">
  <tr>
    <td align="center" style="padding:40px 16px;">

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
             style="max-width:560px;background:${PAPER};border:1px solid ${BLUE_DEEP};">

        <!-- Wordmark -->
        <tr>
          <td align="center" style="padding:44px 36px 0;">
            <p style="margin:0;font-family:${SERIF};font-size:30px;letter-spacing:0.01em;color:${MAROON};">NeuroFlutter</p>
            <p style="margin:10px 0 0;font-family:${SERIF};font-size:13px;font-style:italic;color:${MAROON_SOFT};">Transforming minds, stage by stage.</p>
          </td>
        </tr>

        <!-- Opening -->
        <tr>
          <td align="center" style="padding:36px 36px 0;">
            ${eyebrow("Welcome to NeuroFlutter")}
            <p style="margin:0 0 22px;font-family:${SERIF};font-size:34px;line-height:1.15;font-style:italic;color:${INK};">You&rsquo;re part of the beginning.</p>
          </td>
        </tr>

        <tr>
          <td style="padding:0 36px;">
            ${para("Thank you for joining NeuroFlutter!")}
            ${para("NeuroFlutter is a space where neuroscience meets research, art and creativity. A place to explore ideas, discover different perspectives on the brain and connect with the people behind the science.")}
            ${para("We&rsquo;re so happy you&rsquo;re here.")}
          </td>
        </tr>

        <!-- Rule -->
        <tr><td style="padding:14px 36px;"><div style="height:1px;background:${BLUE_DEEP};line-height:1px;">&nbsp;</div></td></tr>

        <!-- What to expect -->
        <tr>
          <td style="padding:10px 36px 0;">
            ${eyebrow("What to expect")}
            ${para("Thoughtful articles, research insights, scientific illustrations and creative perspectives from our growing community of researchers and creatives.")}
            ${para("You&rsquo;ll also be the first to hear about new features, exciting developments and opportunities to contribute your own work.")}
            <p style="margin:0 0 18px;font-family:${SERIF};font-size:16px;line-height:1.8;font-style:italic;color:${MAROON};">Curiosity connects us. Science brings us together.</p>
          </td>
        </tr>

        <tr><td style="padding:14px 36px;"><div style="height:1px;background:${BLUE_DEEP};line-height:1px;">&nbsp;</div></td></tr>

        <!-- Say hello -->
        <tr>
          <td style="padding:10px 36px 0;">
            ${eyebrow("Be part of the conversation")}
            ${para("Have something you&rsquo;d love to share? Whether it&rsquo;s research, artwork, an interesting idea or simply a question, we&rsquo;d love to hear from you.")}
            ${para("Just reply to this email. NeuroFlutter is all about the people and ideas that make science worth exploring.")}
          </td>
        </tr>

        <!-- Button -->
        <tr>
          <td align="center" style="padding:16px 36px 8px;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" bgcolor="${MAROON}" style="background:${MAROON};">
                  <a href="https://neuroflutter.com/"
                     style="display:inline-block;padding:14px 30px;font-family:${SERIF};font-size:14px;letter-spacing:0.06em;text-transform:uppercase;color:${ON_MAROON};text-decoration:none;">
                    Explore NeuroFlutter
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Sign-off -->
        <tr>
          <td style="padding:30px 36px 44px;">
            <p style="margin:0;font-family:${SERIF};font-size:16px;line-height:1.6;color:${INK};">Hala Al Masri</p>
            <p style="margin:2px 0 0;font-family:${SERIF};font-size:13px;color:${INK_SOFT};">Founder, NeuroFlutter</p>
          </td>
        </tr>
      </table>

      <!-- Footer -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
        <tr>
          <td align="center" style="padding:22px 24px 0;">
            <p style="margin:0 0 8px;font-family:${SERIF};font-size:12px;line-height:1.7;color:${INK_SOFT};">
              You&rsquo;re receiving this email because you subscribed to NeuroFlutter at
              <a href="https://neuroflutter.com/" style="color:${MAROON};text-decoration:underline;">neuroflutter.com</a>.
            </p>
            <p style="margin:0;font-family:${SERIF};font-size:12px;line-height:1.7;color:${INK_SOFT};">
              You can <a href="${unsubscribeUrl || "https://neuroflutter.com/"}" style="color:${MAROON};text-decoration:underline;">unsubscribe</a> from future emails at any time.
            </p>
          </td>
        </tr>
      </table>

    </td>
  </tr>
</table>
</body>
</html>`;
}

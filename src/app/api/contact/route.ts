import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

// ===== ENV (set in Vercel -> Settings -> Environment Variables) =====
// Telegram (Заявки)
const TG_TOKEN = process.env.TG_TOKEN;
const TG_CHAT_ID = process.env.TG_CHAT_ID;

// Email (общая почта для уведомлений)
const EMAIL_FROM = process.env.EMAIL_FROM;
const EMAIL_TO = "stogeroev@yandex.ru"; // Заявки приходят сюда
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

// ===================================================================

interface ContactFormData {
  name: string;
  phone: string;
  vin: string;
  service: string;
  message?: string;
}

const serviceNames: Record<string, string> = {
  repair: "Ремонт автомобиля",
  "parts-new": "Новые запчасти",
  "parts-used": "Б/у запчасти",
  selection: "Подбор запчастей",
  other: "Другое",
  "defect-part": "Брак детали",
  "poor-repair": "Некачественный ремонт",
};

function requireEnv(name: string, value?: string | null) {
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

function buildContactText(data: ContactFormData) {
  const serviceText = serviceNames[data.service] || data.service;
  const dateStr = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });

  // Без parse_mode, чтобы Telegram не ругался на спецсимволы
  return [
    "🔔 Новая заявка с сайта АвтоМастер",
    `👤 Имя: ${data.name}`,
    `📱 Телефон: ${data.phone}`,
    `🚗 VIN: ${data.vin}`,
    `🔧 Услуга: ${serviceText}`,
    data.message ? `📝 Сообщение: ${data.message}` : "",
    `⏰ ${dateStr}`,
  ].filter(Boolean).join("\n");
}

async function sendTelegram(token: string, chatId: string, text: string) {
  const resp = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
  const json = await resp.json();
  if (!json.ok) console.error("Telegram API error:", json);
  return Boolean(json.ok);
}

function buildEmailHtml(data: ContactFormData, serviceText: string, dateStr: string): string {

  const vinValue = String(data.vin || "").toUpperCase();

  return `
<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body style="margin:0;padding:25px 15px;background:#f2f2f2;font-family:Segoe UI,Tahoma,Geneva,Verdana,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table width="100%" cellpadding="0" cellspacing="0"
style="max-width:650px;background:#121212;border-radius:12px;
overflow:hidden;color:#e7e7e7;border:1px solid #1f1f1f;">

<tr>
<td style="height:3px;background:#ff7a18;"></td>
</tr>

<tr>
<td style="padding:16px 20px;border-bottom:1px solid #222;">
<h2 style="margin:0;color:#ff7a18;font-size:24px;font-weight:900;">
🔔 Новая заявка с сайта АвтоМастер
</h2>
</td>
</tr>

${buildRow("Имя", data.name)}
${buildRow("Телефон", `<a href="tel:${data.phone}" style="color:#22c55e;font-size:21px;font-weight:900;text-decoration:none;">${data.phone}</a>`, true)}

<tr>
<td style="padding:10px 20px;border-bottom:1px solid #222;">
<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td style="width:140px;color:#ff7a18;font-size:16px;font-weight:800;">VIN</td>
<td style="background:#1a1a1a;border:1px solid #262626;padding:6px 10px;
border-radius:6px;font-family:Consolas,'Courier New',monospace;
font-size:21px;font-weight:900;color:#22c55e;">
${vinValue}
</td>
</tr>
</table>
</td>
</tr>

${buildRow("Услуга", serviceText)}
${data.message ? buildRow("Сообщение", data.message) : ""}

<tr>
<td style="padding:12px 20px;color:#9aa0a6;font-size:14px;">
Дата: ${dateStr} (МСК)
</td>
</tr>

<tr>
<td style="padding:0 20px 18px;text-align:center;">
<a href="tel:${data.phone}" style="display:inline-block;background:#ff7a18;color:#0b0b0b;
text-decoration:none;padding:10px 22px;border-radius:8px;font-size:17px;font-weight:900;">
📞 Позвонить клиенту
</a>
</td>
</tr>

<tr>
<td style="padding:10px 20px;border-top:1px solid #222;background:#101010;
color:#6f6f6f;font-size:12px;text-align:center;">
АвтоМастер • уведомление с сайта
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
}

function buildRow(label: string, value: string, highlight: boolean = false) {
  return `
<tr>
<td style="padding:10px 20px;border-bottom:1px solid #222;">
<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td style="width:140px;color:#ff7a18;font-size:16px;font-weight:800;">
${label}
</td>
<td style="font-size:${highlight ? "21px" : "18px"};
font-weight:${highlight ? "900" : "600"};
color:#e7e7e7;">
${value}
</td>
</tr>
</table>
</td>
</tr>
`;
}


async function sendEmail(data: ContactFormData) {
  if (!EMAIL_FROM || !EMAIL_PASSWORD) return false;

  const transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true,
    auth: {
      user: EMAIL_FROM,
      pass: EMAIL_PASSWORD,
    },
  });

  const serviceText = serviceNames[data.service] || data.service;
  const dateStr = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });

  const mailOptions = {
    from: `"АвтоМастер" <${EMAIL_FROM}>`,
    to: EMAIL_TO,
    subject: `🔔 Новая заявка от ${data.name} — АвтоМастер`,
    text: [
      "Новая заявка с сайта АвтоМастер!",
      "",
      `Имя: ${data.name}`,
      `Телефон: ${data.phone}`,
      `VIN: ${data.vin}`,
      `Услуга: ${serviceText}`,
      data.message ? `Сообщение: ${data.message}` : "",
      "",
      `Дата: ${dateStr}`,
    ].filter(Boolean).join("\n"),
    html: buildEmailHtml(data, serviceText, dateStr),
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (e) {
    console.error("Email error:", e);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    if (!data?.name || !data?.phone || !data?.vin || !data?.service) {
      return NextResponse.json({ success: false, error: "Заполните все обязательные поля" }, { status: 400 });
    }
    if (String(data.vin).length !== 17) {
      return NextResponse.json({ success: false, error: "VIN должен содержать 17 символов" }, { status: 400 });
    }

    const token = requireEnv("TG_TOKEN", TG_TOKEN);
    const chatId = requireEnv("TG_CHAT_ID", TG_CHAT_ID);

    const text = buildContactText(data);

    const [tgOk, emailOk] = await Promise.all([
      sendTelegram(token, chatId, text),
      sendEmail(data),
    ]);

    return NextResponse.json({ success: true, telegram: tgOk, email: emailOk });
  } catch (e: any) {
    console.error("Contact form error:", e);
    return NextResponse.json({ success: false, error: "Ошибка при отправке заявки" }, { status: 500 });
  }
}

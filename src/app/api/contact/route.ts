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
  return `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #e8e8e8; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #e8e8e8; padding: 40px 20px;">
    <tr>
      <td align="center">
        <!-- Карточка заявки -->
        <table role="presentation" width="100%" style="max-width: 420px; background: #ffffff; border-radius: 12px; overflow: hidden;">
          
          <!-- Оранжевая полоска сверху -->
          <tr>
            <td style="height: 5px; background: #f97316;"></td>
          </tr>
          
          <!-- Заголовок -->
          <tr>
            <td style="padding: 30px 28px 16px; text-align: center;">
              <h1 style="margin: 0 0 4px; color: #333; font-size: 24px; font-weight: 700;">
                АвтоМастер
              </h1>
              <p style="margin: 0; color: #999; font-size: 13px;">
                Запчасти и ремонт
              </p>
            </td>
          </tr>
          
          <!-- Уведомление о заявке -->
          <tr>
            <td style="padding: 0 28px 24px; text-align: center;">
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                <tr>
                  <td style="background-color: #fff7ed; border-radius: 16px; padding: 6px 16px;">
                    <span style="color: #f97316; font-size: 12px; font-weight: 600;">🔔 НОВАЯ ЗАЯВКА</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Данные клиента -->
          <tr>
            <td style="padding: 0 28px 8px;">
              
              <!-- Имя -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 10px;">
                <tr>
                  <td style="background-color: #f5f5f5; border-radius: 10px; padding: 14px 16px;">
                    <p style="margin: 0 0 3px; color: #999; font-size: 11px;">Имя</p>
                    <p style="margin: 0; color: #333; font-size: 15px; font-weight: 600;">${data.name}</p>
                  </td>
                </tr>
              </table>
              
              <!-- Телефон -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 10px;">
                <tr>
                  <td style="background-color: #f5f5f5; border-radius: 10px; padding: 14px 16px;">
                    <p style="margin: 0 0 3px; color: #999; font-size: 11px;">Телефон</p>
                    <p style="margin: 0; color: #333; font-size: 15px; font-weight: 600;">
                      <a href="tel:${data.phone}" style="color: #333; text-decoration: none;">${data.phone}</a>
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- VIN -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 10px;">
                <tr>
                  <td style="background-color: #f5f5f5; border-radius: 10px; padding: 14px 16px;">
                    <p style="margin: 0 0 3px; color: #999; font-size: 11px;">VIN</p>
                    <p style="margin: 0; color: #333; font-size: 15px; font-weight: 600; font-family: 'Courier New', monospace;">${data.vin.toUpperCase()}</p>
                  </td>
                </tr>
              </table>
              
              <!-- Услуга -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 10px;">
                <tr>
                  <td style="background-color: #f5f5f5; border-radius: 10px; padding: 14px 16px;">
                    <p style="margin: 0 0 3px; color: #999; font-size: 11px;">Услуга</p>
                    <p style="margin: 0; color: #333; font-size: 15px; font-weight: 600;">${serviceText}</p>
                  </td>
                </tr>
              </table>
              
              ${data.message ? `
              <!-- Комментарий -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 10px;">
                <tr>
                  <td style="background-color: #f5f5f5; border-radius: 10px; padding: 14px 16px;">
                    <p style="margin: 0 0 3px; color: #999; font-size: 11px;">Комментарий</p>
                    <p style="margin: 0; color: #333; font-size: 14px; line-height: 1.4;">${data.message}</p>
                  </td>
                </tr>
              </table>
              ` : ''}
              
            </td>
          </tr>
          
          <!-- Дата и время -->
          <tr>
            <td style="padding: 16px 28px 24px; text-align: center;">
              <p style="margin: 0; color: #bbb; font-size: 12px;">
                ${dateStr} (МСК)
              </p>
            </td>
          </tr>
          
          <!-- Кнопка Позвонить -->
          <tr>
            <td style="padding: 0 28px 32px; text-align: center;">
              <a href="tel:${data.phone}" style="display: inline-block; background: #f97316; color: #ffffff; text-decoration: none; padding: 13px 32px; border-radius: 8px; font-size: 14px; font-weight: 600;">
                📞 Позвонить клиенту
              </a>
            </td>
          </tr>
          
          <!-- Подвал -->
          <tr>
            <td style="background-color: #f5f5f5; padding: 18px 28px; text-align: center;">
              <p style="margin: 0 0 4px; color: #999; font-size: 11px;">
                Республика Крым, г. Керчь, ул. Героев Сталинграда, 23
              </p>
              <p style="margin: 0; color: #bbb; font-size: 10px;">
                © АвтоМастер
              </p>
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

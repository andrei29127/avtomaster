import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// Telegram (Обратная связь)
const TG_FEEDBACK_TOKEN = process.env.TG_FEEDBACK_TOKEN;
const TG_FEEDBACK_CHAT_ID = process.env.TG_FEEDBACK_CHAT_ID;

type FeedbackData = {
  name: string;
  phone: string;
  type: "complaint" | "suggestion" | string;
  orderNumber?: string;
  message: string;
};

function requireEnv(name: string, value?: string | null) {
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

function typeLabel(type: string) {
  if (type === "complaint") return "Жалоба";
  if (type === "suggestion") return "Предложение";
  return type || "Обратная связь";
}

function buildText(data: FeedbackData) {
  const dateStr = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });
  return [
    "💬 Обратная связь с сайта АвтоМастер",
    `📌 Тип: ${typeLabel(data.type)}`,
    `👤 Имя: ${data.name}`,
    `📱 Телефон: ${data.phone}`,
    data.orderNumber ? `🧾 Номер заказа: ${data.orderNumber}` : "",
    `📝 Сообщение: ${data.message}`,
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

export async function POST(request: NextRequest) {
  try {
    const data: FeedbackData = await request.json();

    if (!data?.name || !data?.phone || !data?.message) {
      return NextResponse.json({ success: false, error: "Заполните имя, телефон и сообщение" }, { status: 400 });
    }

    const token = requireEnv("TG_FEEDBACK_TOKEN", TG_FEEDBACK_TOKEN);
    const chatId = requireEnv("TG_FEEDBACK_CHAT_ID", TG_FEEDBACK_CHAT_ID);

    const text = buildText(data);

    const tgOk = await sendTelegram(token, chatId, text);

    return NextResponse.json({ success: true, telegram: tgOk });
  } catch (e: any) {
    console.error("Feedback error:", e);
    return NextResponse.json({ success: false, error: "Ошибка при отправке" }, { status: 500 });
  }
}

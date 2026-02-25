import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, phone, message } = await req.json();

  const text = `
📩 Новая заявка с сайта
👤 Имя: ${name}
📞 Телефон: ${phone}
💬 Сообщение: ${message}
  `;

  await fetch(`https://api.telegram.org/bot${process.env.TG_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: process.env.TG_CHAT_ID,
      text,
    }),
  });

  return NextResponse.json({ success: true });
}

let cachedToken: string | null = null;
let expiresAt = 0;

type IikoTokenResponse = {
  token: string;
  correlationId: string;
};

export async function getAccessToken(): Promise<IikoTokenResponse["token"]> {
  if (cachedToken && Date.now() < expiresAt) {
    return cachedToken;
  }

  const response = await fetch("https://api-ru.iiko.services/api/1/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ apiLogin: process.env.IIKO_API_KEY! }),
  });

  if (!response.ok) {
    throw new Error(`Ошибка авторизации в iiko: ${response.status}`);
  }

  const data = (await response.json()) as IikoTokenResponse;

  if (!data.token) {
    throw new Error("Токен не получен из ответа iiko");
  }

  cachedToken = data.token;
  expiresAt = Date.now() + 25 * 60 * 1000;

  console.log("🔄 Новый токен получен от iiko");

  return cachedToken;
}

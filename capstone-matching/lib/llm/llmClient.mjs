const DEFAULT_MODEL = "anthropic/claude-haiku-4-5-20251001";

function stripProviderPrefix(model) {
  return model.includes("/") ? model.split("/").slice(1).join("/") : model;
}

async function callLiteLLM({ system, userContent, model }) {
  const response = await fetch(`${process.env.LITELLM_BASE_URL}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.LITELLM_API_KEY || "anything"}`
    },
    body: JSON.stringify({
      model,
      temperature: 0,
      messages: [
        { role: "system", content: system },
        { role: "user", content: userContent }
      ]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`LiteLLM request failed: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("LiteLLM returned empty response.");
  }
  return content;
}

async function callAnthropicDirect({ system, userContent, model }) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY is not set; cannot fall back to Anthropic.");
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model: stripProviderPrefix(model),
      max_tokens: 4096,
      temperature: 0,
      system,
      messages: [{ role: "user", content: userContent }]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Anthropic request failed: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  const content = data.content?.[0]?.text;
  if (!content) {
    throw new Error("Anthropic returned empty response.");
  }
  return content;
}

// Tries the LiteLLM proxy first (used in local dev), and falls back to
// calling Anthropic directly when LiteLLM is unreachable or unconfigured
// (e.g. on Vercel, where the Python proxy process isn't running).
export async function chatCompletion({ system, userContent, model } = {}) {
  const resolvedModel = model || process.env.LLM_MODEL || DEFAULT_MODEL;

  if (process.env.LITELLM_BASE_URL) {
    try {
      return await callLiteLLM({ system, userContent, model: resolvedModel });
    } catch (err) {
      console.warn(`LiteLLM unreachable, falling back to Anthropic: ${err.message}`);
    }
  }

  return callAnthropicDirect({ system, userContent, model: resolvedModel });
}

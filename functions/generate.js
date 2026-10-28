export async function onRequestGet(context) {
  const params = context.request.url.split('?')[1] || '';
  const r = await fetch('https://turbowarp-creature-ai.josiah-n-hart.workers.dev/generate?' + params);
  const data = await r.json();
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
  });
}

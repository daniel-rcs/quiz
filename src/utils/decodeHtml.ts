// Decodifica entidades HTML (&quot;, &#039;, &amp;, ...) presentes nos textos da API
export function decodeHtml(html: string): string {
  const textarea = document.createElement('textarea')
  textarea.innerHTML = html
  return textarea.value
}

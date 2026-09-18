const TOKEN_PATTERN =
  /("(?:\\.|[^"\\])*")|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)|\b(true|false)\b|\b(null)\b|([{}[\],:])/g

export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function stringTypeAt(source, index) {
  let cursor = index
  while (cursor < source.length && /\s/.test(source[cursor])) cursor += 1
  return source[cursor] === ':' ? 'key' : 'string'
}

export function tokenizeJson(value, space = 2) {
  const source =
    typeof value === 'string' ? value : JSON.stringify(value, null, space)
  const tokens = []
  let lastIndex = 0
  let match

  TOKEN_PATTERN.lastIndex = 0
  while ((match = TOKEN_PATTERN.exec(source)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'plain', text: source.slice(lastIndex, match.index) })
    }

    const [text, string, number, boolean, nullable, punctuation] = match
    let type = 'plain'
    if (string !== undefined) type = stringTypeAt(source, TOKEN_PATTERN.lastIndex)
    else if (number !== undefined) type = 'number'
    else if (boolean !== undefined) type = 'boolean'
    else if (nullable !== undefined) type = 'null'
    else if (punctuation !== undefined) type = 'punctuation'

    tokens.push({ type, text })
    lastIndex = TOKEN_PATTERN.lastIndex
  }

  if (lastIndex < source.length) {
    tokens.push({ type: 'plain', text: source.slice(lastIndex) })
  }

  return tokens
}

export function highlightJson(value, space = 2) {
  return tokenizeJson(value, space)
    .map((token) =>
      token.type === 'plain'
        ? escapeHtml(token.text)
        : `<span class="tok tok--${token.type}">${escapeHtml(token.text)}</span>`,
    )
    .join('')
}

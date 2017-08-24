const keycode = require('keycode')


const MODIFIERS = [
  { name: 'alt', code: 0, accessor: 'altKey' },
  { name: 'ctrl', code: 0, accessor: 'ctrlKey' },
  { name: 'meta', code: 0, accessor: 'metaKey' },
  { name: 'shift', code: 0, accessor: 'shiftKey' },
]


module.exports = Object.assign(Keytrap, {
  addKeyAliases,
})


function Keytrap(node) {
  const bindings = {}
  node.addEventListener('keydown', handleKeyPress)


  return {
    destroy,
    bind,
  }


  function bind(combo, action) {
    if (combo) {
      if (typeof combo === 'object') {
        Object.keys(combo).forEach((key) => { bind(key, combo[key]) })
      } else if (typeof combo === 'string') {
        bindings[normalizeCombo(combo)] = action
      }
    }

    return this
  }
  function destroy() {
    node.removeEventListener('keydown', handleKeyPress)
  }
  function handleKeyPress(e) {
    const combo = getKeyFromEvent(e)
    const action = bindings[combo]

    e.preventDefault()
    e.stopPropagation()

    if (typeof action !== 'function') return
    action.call(this, e)
  }
}
function getKeyFromEvent(event) {
  const key = keycode(event)
  const combo = []

  MODIFIERS.forEach((modifier) => {
    if (event[modifier.accessor]) {
      combo.push(modifier.name)
    }
  })

  if (!combo.includes(key)) {
    combo.push(key)
  }

  return combo.join('+')
}
function addKeyAliases(aliases) {
  if (aliases && typeof aliases === 'object') {
    Object.keys(aliases).forEach((key) => {
      const keyCode = aliases[key]
      keycode.aliases[key] = typeof keyCode === 'number'
        ? keyCode
        : keycode(keyCode)
    })
  }
}
function normalizeCombo(comboSequence) {
  return comboSequence
    .replace(/\s+/g, ' ')
    .split(',')
    .map(combo => combo
      .replace(/\s+\+\s+/g, '+')
      .split('+')
      .map(key => keycode(keycode(key)))
      .join('+'),
    )
    .join(' ')
}

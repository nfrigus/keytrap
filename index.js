const Keytrap = require('./keytrap')


Keytrap.addKeyAliases({
  'custom key alias': 'a',
})
window.addEventListener('load', () => {
  Keytrap(document)
    .bind({
      'custom key alias': console.log,
      x: console.log,
    })
})

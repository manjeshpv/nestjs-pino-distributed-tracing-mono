// const logger = require('pino')()


const logger = require('pino')({
  formatters: {
    bindings(bindings) {
      console.log('bindings')
      return { ...bindings, trace_id: 1}
    }
  }
})
logger.info('hello world')
// const child = logger.child({ a: 'property' })
// child.info('hello child!')
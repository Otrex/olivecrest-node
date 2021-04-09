

module.exports = (fields = []) => {
    return (schema) => {
      schema.pre(/^find/, function(next){
          fields.forEach( field => {
              this.populate(field)
          })
          next()
      })
  }
}
import validate from 'validate-npm-package-name'

export default function validateName (name) {
  const { errors, warnings } = validate(name)

  let error = ''

  if (errors) {
    error = errors.join(',')
  }

  if (warnings) {
    error = warnings.join(',')
  }

  if ((!errors) && (!warnings)) {
    return true
  }

  return error
}

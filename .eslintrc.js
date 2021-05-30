module.exports = {
  rules: {
    'no-var': 1,
    'no-eval': 'error',
    indent: ['error', 2],
    'space-before-function-paren': ['error', 'never'],
    'no-use-before-define': [
      'error', {
        functions: true,
        classes: true
      }
    ]
  }
}
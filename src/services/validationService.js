export const validateRequiredText = (text) => {
  if (!text || text.trim().length === 0) {
    return 'Este campo é obrigatório.'
  }

  return ''
}

export default {
  validateRequiredText,
}

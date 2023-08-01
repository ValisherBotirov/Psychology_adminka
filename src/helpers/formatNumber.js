const numberFunction = (number) => {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export default numberFunction

export function PhoneNumberFormatter(number) {
  const format = number
      ?.replace(/\D/g, '')
      .match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/)
  return `+998 (${format && format[2] ? format[2] : ''}) ${
      format && format[3] ? format[3] : ''
  } ${format && format[4] ? format[4] : ''} ${
      format && format[5] ? format[5] : ''
  }`
}
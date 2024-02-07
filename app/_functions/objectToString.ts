function toDisplayName(propertyName: string): string {
  // Split the property name by camel case and capitalize each word
  return propertyName
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase())
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function objectToString(obj: Record<string, any>): string {
  let string = ''

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key as keyof typeof obj]
      string += `${toDisplayName(key)}: ${typeof value === 'string' ? `'${value}'` : value}\n`
    }
  }

  return string.trim() // Trim any trailing whitespace
}

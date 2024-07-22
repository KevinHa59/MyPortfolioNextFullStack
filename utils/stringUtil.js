export function phoneFormat(phone) {
  const phone_part = [...phone.split("")];
  const area = phone_part.splice(0, 3);
  const center = phone_part.splice(0, 3);
  return `(${area.join("")}) - ${center.join("")} ${phone_part.join("")}`;
}

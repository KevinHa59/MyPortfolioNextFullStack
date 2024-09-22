export function phoneFormat(phone) {
  const phone_part = [...phone.split("")];
  const area = phone_part.splice(0, 3);
  const center = phone_part.splice(0, 3);
  return `(${area.join("")}) - ${center.join("")} ${phone_part.join("")}`;
}

export function _ellipsis(str, limit) {
  const text = (str || "").substring(0, limit);
  const isEllipsis = (str || "")?.length > limit || false;
  return `${text}${isEllipsis ? "..." : ""}`;
}

export const stringUtil = {
  ellipsis: (str, limit) => _ellipsis(str, limit),
};

const { randomBytes } = await import("node:crypto");

function getId(length = 10) {
  return randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}

export default getId;

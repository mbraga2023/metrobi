const timestamp = new Date()
    .toISOString()
    .replace(/[:.]/g, "-");

module.exports = timestamp;
// Currency formatting
export const formatCurrency = (amount, currency = "INR") => {
  if (!amount && amount !== 0) return "₹0";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Date formatting
export const formatDate = (date, options = {}) => {
  if (!date) return "";

  const defaultOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  };

  return new Date(date).toLocaleDateString("en-IN", defaultOptions);
};

// Time formatting
export const formatTime = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Date and time formatting
export const formatDateTime = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Relative time formatting (e.g., "2 hours ago")
export const formatRelativeTime = (date) => {
  if (!date) return "";

  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 31536000)
    return `${Math.floor(diffInSeconds / 2592000)} months ago`;

  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
};

// Phone number formatting
export const formatPhoneNumber = (phone) => {
  if (!phone) return "";

  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, "");

  // Format Indian phone numbers
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }

  if (cleaned.length === 12 && cleaned.startsWith("91")) {
    return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  }

  return phone; // Return original if can't format
};

// Name formatting (capitalize first letter of each word)
export const formatName = (name) => {
  if (!name) return "";

  return name
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Text truncation
export const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;

  return text.slice(0, maxLength) + "...";
};

// File size formatting
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

// Rating formatting (e.g., "4.5 out of 5")
export const formatRating = (rating, maxRating = 5) => {
  if (!rating && rating !== 0) return "No rating";

  return `${rating.toFixed(1)} out of ${maxRating}`;
};

// Address formatting
export const formatAddress = (address) => {
  if (!address) return "";

  // Remove extra spaces and commas
  return address
    .replace(/\s+/g, " ")
    .replace(/,\s*,/g, ",")
    .replace(/^,\s*/, "")
    .replace(/\s*,$/, "");
};

// Room type formatting
export const formatRoomType = (roomType) => {
  const roomTypeMap = {
    single: "Single Room",
    double: "Double Sharing",
    triple: "Triple Sharing",
    sharing: "Sharing Room",
  };

  return roomTypeMap[roomType] || roomType;
};

// Booking status formatting
export const formatBookingStatus = (status) => {
  const statusMap = {
    pending: "Pending",
    confirmed: "Confirmed",
    cancelled: "Cancelled",
    completed: "Completed",
    active: "Active",
    upcoming: "Upcoming",
  };

  return statusMap[status] || status;
};

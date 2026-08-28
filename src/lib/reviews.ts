export type Review = {
  id: number;
  name: string;
  code: string; // ISO country code for the flag
  country: string;
  role: string;
  rating: number;
  text: string;
};

const FIRST = [
  "James", "Emma", "Luca", "Sofia", "Hans", "Anna", "Marco", "Giulia", "Pierre", "Chloé",
  "Liam", "Olivia", "Noah", "Mia", "Lukas", "Lena", "Matteo", "Aurora", "Thomas", "Laura",
  "Daniel", "Sara", "David", "Elena", "Michael", "Nina", "Andreas", "Julia", "Paolo", "Marta",
  "Felix", "Clara", "Oliver", "Hannah", "Samuel", "Léa", "Jonas", "Ava", "Enzo", "Inès",
  "George", "Amara", "Kwame", "Ada", "Wei", "Yuki", "Omar", "Fatima", "Diego", "Camila",
];
const LAST = ["M.", "K.", "R.", "B.", "S.", "L.", "T.", "D.", "H.", "W.", "P.", "G.", "V.", "N.", "F.", "C."];

const COUNTRIES = [
  { code: "GB", name: "United Kingdom" },
  { code: "IT", name: "Italy" },
  { code: "CH", name: "Switzerland" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "ES", name: "Spain" },
  { code: "NL", name: "Netherlands" },
  { code: "BE", name: "Belgium" },
  { code: "AT", name: "Austria" },
  { code: "IE", name: "Ireland" },
  { code: "PT", name: "Portugal" },
  { code: "SE", name: "Sweden" },
];

const ROLES = [
  "Retail manager", "Shop owner", "Bank teller", "Cash office lead", "Supermarket owner",
  "Pharmacy owner", "Restaurant owner", "Forex clerk", "Market trader", "Hotel manager",
  "Petrol station owner", "Casino cashier", "Convenience store owner", "Finance director",
];

const TEMPLATES = [
  "Counting the till used to eat 40 minutes a night — now it's five. Best purchase we made this year.",
  "Caught two fake fifties in the first week. It's already paid for itself.",
  "Rock solid. We run thousands of notes a day and it never jams.",
  "Setup took ten minutes and the value count is spot on every single time.",
  "The counterfeit detection gives me real peace of mind at the counter.",
  "Fast, accurate and quiet. My staff actually enjoy cashing up now.",
  "Switched from a cheaper brand and the difference is night and day.",
  "Support answered on WhatsApp within minutes. Brilliant service.",
  "Sorts mixed denominations effortlessly. A total game changer for us.",
  "We count three registers in the time it used to take for one. Incredible.",
  "Shipping was quick and the machine works exactly as described.",
  "Two years in and it's as accurate as day one. Highly recommend.",
  "The coin sorter saved my back and my evenings. Wish I'd bought it sooner.",
  "Reliable, precise and built like a tank. Worth every penny.",
  "UV and magnetic checks caught a fake that fooled my eyes completely.",
  "Perfect for our market stall — portable and the battery lasts all day.",
  "Handles worn and crumpled notes without a single misread.",
  "Our branch runs four of these. Zero downtime in eighteen months.",
  "The printed report makes reconciling the safe an absolute breeze.",
  "Multi-currency counting is flawless — euros, pounds and dollars.",
  "Customer service walked me through calibration step by step.",
  "Cut our cash-handling errors to basically zero. Management loves it.",
  "Compact, fast and dead simple — new staff pick it up instantly.",
  "Genuinely the best money counter I've used in twenty years of retail.",
];

// Deterministically generate 120 varied reviews.
export const reviews: Review[] = Array.from({ length: 120 }, (_, i) => {
  const country = COUNTRIES[(i * 5) % COUNTRIES.length];
  return {
    id: i,
    name: `${FIRST[(i * 3) % FIRST.length]} ${LAST[(i * 7) % LAST.length]}`,
    code: country.code,
    country: country.name,
    role: ROLES[(i * 2) % ROLES.length],
    rating: i % 7 === 0 ? 4 : 5,
    text: TEMPLATES[(i * 11) % TEMPLATES.length],
  };
});

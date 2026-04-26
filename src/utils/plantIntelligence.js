export const plantDatabase = [
  // Indoor Plants
  { name: "Monstera Deliciosa", location: "indoor", waterNeeds: "medium", sunNeeds: "partial" },
  { name: "Snake Plant (Sansevieria)", location: "indoor", waterNeeds: "low", sunNeeds: "shade" },
  { name: "ZZ Plant", location: "indoor", waterNeeds: "low", sunNeeds: "shade" },
  { name: "Pothos (Devil's Ivy)", location: "indoor", waterNeeds: "medium", sunNeeds: "shade" },
  { name: "Spider Plant", location: "indoor", waterNeeds: "medium", sunNeeds: "partial" },
  { name: "Peace Lily", location: "indoor", waterNeeds: "high", sunNeeds: "shade" },
  { name: "Aloe Vera", location: "indoor", waterNeeds: "low", sunNeeds: "full" },
  { name: "Fiddle Leaf Fig", location: "indoor", waterNeeds: "medium", sunNeeds: "full" },
  { name: "Rubber Plant", location: "indoor", waterNeeds: "medium", sunNeeds: "partial" },
  { name: "Philodendron", location: "indoor", waterNeeds: "medium", sunNeeds: "partial" },
  { name: "Jade Plant", location: "indoor", waterNeeds: "low", sunNeeds: "full" },
  { name: "Boston Fern", location: "indoor", waterNeeds: "high", sunNeeds: "shade" },
  { name: "English Ivy", location: "indoor", waterNeeds: "medium", sunNeeds: "partial" },
  { name: "Cast Iron Plant", location: "indoor", waterNeeds: "low", sunNeeds: "shade" },
  { name: "Parlor Palm", location: "indoor", waterNeeds: "medium", sunNeeds: "shade" },
  { name: "Majesty Palm", location: "indoor", waterNeeds: "high", sunNeeds: "partial" },
  { name: "Orchid (Phalaenopsis)", location: "indoor", waterNeeds: "medium", sunNeeds: "partial" },
  { name: "Anthurium", location: "indoor", waterNeeds: "medium", sunNeeds: "partial" },

  // Outdoor / Garden Plants
  { name: "Tomato", location: "outdoor", waterNeeds: "high", sunNeeds: "full" },
  { name: "Basil", location: "outdoor", waterNeeds: "high", sunNeeds: "full" },
  { name: "Rosemary", location: "outdoor", waterNeeds: "low", sunNeeds: "full" },
  { name: "Lavender", location: "outdoor", waterNeeds: "low", sunNeeds: "full" },
  { name: "Mint", location: "outdoor", waterNeeds: "high", sunNeeds: "partial" },
  { name: "Thyme", location: "outdoor", waterNeeds: "low", sunNeeds: "full" },
  { name: "Cilantro / Coriander", location: "outdoor", waterNeeds: "medium", sunNeeds: "partial" },
  { name: "Parsley", location: "outdoor", waterNeeds: "medium", sunNeeds: "partial" },
  { name: "Rose Bush", location: "outdoor", waterNeeds: "medium", sunNeeds: "full" },
  { name: "Hydrangea", location: "outdoor", waterNeeds: "high", sunNeeds: "partial" },
  { name: "Hostas", location: "outdoor", waterNeeds: "medium", sunNeeds: "shade" },
  { name: "Sunflower", location: "outdoor", waterNeeds: "medium", sunNeeds: "full" },
  { name: "Marigold", location: "outdoor", waterNeeds: "medium", sunNeeds: "full" },
  { name: "Petunia", location: "outdoor", waterNeeds: "medium", sunNeeds: "full" },
  { name: "Strawberry", location: "outdoor", waterNeeds: "high", sunNeeds: "full" },
  { name: "Zucchini", location: "outdoor", waterNeeds: "high", sunNeeds: "full" },
  { name: "Cucumber", location: "outdoor", waterNeeds: "high", sunNeeds: "full" },
  { name: "Peppers (Bell/Chili)", location: "outdoor", waterNeeds: "medium", sunNeeds: "full" },
  { name: "Boxwood Shrub", location: "outdoor", waterNeeds: "medium", sunNeeds: "partial" },
  { name: "Geranium", location: "outdoor", waterNeeds: "medium", sunNeeds: "full" },
  { name: "Lily", location: "outdoor", waterNeeds: "medium", sunNeeds: "partial" }
];

// Helper function to find a plant by partial name match
export const suggestPlant = (query) => {
  if (!query || query.length < 2) return [];
  const lowerQuery = query.toLowerCase();
  return plantDatabase.filter(plant => 
    plant.name.toLowerCase().includes(lowerQuery)
  ).slice(0, 5); // Return top 5 matches
};

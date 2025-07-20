import axios from 'axios';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_MODEL = "gemini-2.0-flash";

export async function generateRecipeWithGemini(ingredients, selectedCuisine, language, mealType, customMealType) {
    const finalMealType = mealType === 'Other' ? customMealType : mealType;
    const prompt = `
Given the following inputs and rules, generate a valid JSON array of 4 recipe objects.

Ingredients: ${ingredients.join(', ')}
Selected Cuisine: ${selectedCuisine}
Selected Meal Type: ${finalMealType}
Output Language: ${language}

 Important Instructions:
1. All content including recipe titles, descriptions, ingredients, and instructions **must be written in the selected language only: ${language}**.
   - Do not include any translation, transliteration, or English equivalents.
   - Do not use multiple languages. Only use the specified selected language.

2. You may assume the use of **common home kitchen items**, such as:
   - Salt, pepper, sugar, oil, vinegar, water, butter, flour, eggs, milk, baking powder
   - Basic spices & herbs (e.g., cumin, coriander, turmeric, garlic powder, paprika, oregano, basil)

3. Ingredient restrictions:
   - Do **not** add any major ingredients (like extra vegetables, meat, poultry, fruits, or dairy products not listed) except for Recipe 3 or Recipe 4 as defined below.

4. Generate 4 recipes in total:
   - **Recipe 1**: Use ONLY the provided ingredients + common kitchen items
   - **Recipe 2**: Use ONLY the provided ingredients + common kitchen items (different style from Recipe 1)
   - **Recipe 3**: You may add 1–2 major extra ingredients like vegetables/cheese for enhancement
   - **Recipe 4**: You may use packaged items (e.g., noodles, Maggi, bread, canned foods)

Each recipe must match the selected:
- Cuisine Type
- Meal Type
- Output language

 Recipe JSON format (must follow strictly):

Each recipe must be an object with the following fields ONLY:
{
  "name": "",
  "description": "",
  "cuisine": "",
  "cookingTime": "",
  "servings": 0,
  "difficulty": "",
  "ingredients": [],   
  "instructions": []  
}

 Output Rules:
- Only output a valid JSON array with EXACTLY 4 recipes.
- Do not include markdown, text explanations, formatting, or multiple languages.
- Ensure the output is entirely in the selected language: **${language}**
`;

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
            {
                contents: [{ parts: [{ text: prompt }] }]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-goog-api-key': GEMINI_API_KEY
                }
            }
        );

        const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        console.log("Gemini raw response:", text);

        let recipesJson;
        try {
            // Remove markdown code block if present
            const cleaned = text.replace(/```json|```/g, '').trim();
            recipesJson = JSON.parse(cleaned);
        } catch (e) {
            const match = text.match(/\[[\s\S]*\]/);
            recipesJson = match ? JSON.parse(match[0]) : null;
        }

        // Defensive: Ensure the result is always an array
        return Array.isArray(recipesJson) ? recipesJson : [];
    } catch (error) {
        console.error(error.response?.data || error.message);
        throw new Error(error.response?.data?.error?.message || error.message);
    }
}
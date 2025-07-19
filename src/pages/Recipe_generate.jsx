import React, { useState, useRef } from 'react';
import {
    ChefHat, Plus, X, Sparkles, Clock, Users, Globe, Search, Utensils, Heart, ChevronLeft, ChevronRight, MoreHorizontal
} from 'lucide-react';
import { generateRecipeWithGemini } from '../util/geminiApi';
import Nav from '../components/Header/Nav';

const allCuisineTypes = [
    'Any', 'Indian', 'Italian', 'Chinese', 'Mexican', 'Thai', 'Mediterranean', 'Japanese', 'French', 'American'
];

function Recipe_generate() {
    const recipeRef = useRef(null);
    const [ingredients, setIngredients] = useState([]);
    const [currentIngredient, setCurrentIngredient] = useState('');
    const [selectedCuisine, setSelectedCuisine] = useState('Indian');
    const [showAllCuisines, setShowAllCuisines] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const [customLanguage, setCustomLanguage] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedRecipes, setGeneratedRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const cuisineTypes = showAllCuisines ? allCuisineTypes : ['Any', 'Indian'];
    const [mealType, setMealType] = useState('Any');
    const [customMealType, setCustomMealType] = useState('');

    const addIngredient = () => {
        if (currentIngredient.trim() && !ingredients.includes(currentIngredient.trim())) {
            setIngredients([...ingredients, currentIngredient.trim()]);
            setCurrentIngredient('');
        }
    };

    const removeIngredient = (ingredient) => {
        setIngredients(ingredients.filter(item => item !== ingredient));
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addIngredient();
        }
    };

    const generateRecipes = async () => {
        if (ingredients.length === 0) return;
        setIsGenerating(true);
        setGeneratedRecipes([]);
        setCurrentPage(0);
        try {
            const recipes = await generateRecipeWithGemini(
                ingredients,
                selectedCuisine,
                selectedLanguage,
                mealType,
                customMealType
            );
            if (recipes.length > 0) {
                setGeneratedRecipes(recipes);
                setTimeout(() => {
                    recipeRef.current?.scrollIntoView({ behavior: 'smooth' });
                }, 300);
            } else {
                alert('Could not parse recipes from AI response.');
            }
        } catch (error) {
            alert('Error generating recipes: ' + error.message);
        }
        setIsGenerating(false);
    };

    // Pagination controls
    const totalPages = generatedRecipes.length;
    const currentRecipe = generatedRecipes[currentPage] || {};

    return (
        <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] via-50% to-[#0A1A3C] min-h-screen flex flex-col">
            <Nav />
            <div className="bg-gradient-to-t from-[#030711] via-[#050D1E] via-50% to-[#0A1A3C] min-h-screen">
                {/* Header */}
                <header className="px-4 py-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <ChefHat className="w-10 h-10 text-orange-500" />
                            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                                AI Powered Recipe Generator
                            </h1>
                        </div>
                        <p className="text-center text-gray-300 text-lg max-w-2xl mx-auto">
                            Transform your available items into delicious recipes with AI-powered suggestions.
                        </p>
                    </div>
                </header>

                {/* Main Content */}
                <main className="px-4 pb-16">
                    <div className="max-w-4xl mx-auto">

                        {/* Input Section */}
                        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl p-8 border border-slate-700/50 mb-8">
                            <h2 className="text-2xl font-semibold text-orange-400 mb-6 flex items-center gap-2">
                                <Utensils className="w-6 h-6" />
                                Available Ingredients
                            </h2>

                            {/* Ingredient Input */}
                            <div className="flex gap-3 mb-6">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={currentIngredient}
                                        onChange={(e) => setCurrentIngredient(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Add an ingredient (e.g., tomatoes, chicken, rice...)"
                                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                                    />
                                </div>
                                <button
                                    onClick={addIngredient}
                                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                                >
                                    <Plus className="w-5 h-5" />
                                    Add
                                </button>
                            </div>

                            {/* Ingredients Tags */}
                            {ingredients.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-medium text-gray-300 mb-3">Your Ingredients:</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {ingredients.map((ingredient, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center gap-2 px-3 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full text-orange-300 text-sm"
                                            >
                                                {ingredient}
                                                <button
                                                    onClick={() => removeIngredient(ingredient)}
                                                    className="hover:text-orange-100 transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Cuisine Selection */}
                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-300 mb-3 flex items-center gap-2">
                                    <Globe className="w-5 h-5" />
                                    Cuisine Type (Optional)
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {cuisineTypes.map((cuisine) => (
                                        <button
                                            key={cuisine}
                                            onClick={() => setSelectedCuisine(cuisine)}
                                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${selectedCuisine === cuisine
                                                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                                                : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50'
                                                }`}
                                        >
                                            {cuisine}
                                        </button>
                                    ))}
                                    {!showAllCuisines ? (
                                        <button
                                            onClick={() => setShowAllCuisines(true)}
                                            className="px-4 py-2 rounded-lg font-medium bg-slate-700/50 text-orange-500 hover:bg-slate-600/50 flex items-center gap-1"
                                        >
                                            <MoreHorizontal className="w-4 h-4" />
                                            More
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => setShowAllCuisines(false)}
                                            className="px-4 py-2 rounded-lg font-medium bg-slate-700/50  hover:bg-slate-600/50 flex items-center gap-1 text-orange-500"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                            Less....
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Meal Type Selection */}
                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-300 mb-3 flex items-center gap-2">
                                    🍽️
                                    Meal Type
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {['Any', 'Breakfast', 'Lunch', 'Dinner', 'Other'].map(type => (
                                        <button
                                            key={type}
                                            onClick={() => setMealType(type)}
                                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${mealType === type
                                                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                                                : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50'
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                    {mealType === 'Other' && (
                                        <input
                                            type="text"
                                            value={customMealType}
                                            onChange={e => setCustomMealType(e.target.value)}
                                            placeholder="Enter meal type"
                                            className="px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white ml-2"
                                            style={{ minWidth: 120 }}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Recipe Language Selection */}
                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-300 mb-3 flex items-center gap-2">
                                    🌐
                                    Recipe Language
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {['English', 'Hindi', 'Spanish', 'French', 'Other'].map(lang => (
                                        <button
                                            key={lang}
                                            onClick={() => setSelectedLanguage(lang)}
                                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${selectedLanguage === lang
                                                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                                                : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50'
                                                }`}
                                        >
                                            {lang}
                                        </button>
                                    ))}
                                    {selectedLanguage === 'Other' && (
                                        <input
                                            type="text"
                                            value={customLanguage}
                                            onChange={e => setCustomLanguage(e.target.value)}
                                            placeholder="Enter language"
                                            className="px-4 py-2 rounded-lg bg-slate-700/50 border border-slate-600 text-white ml-2"
                                            style={{ minWidth: 120 }}
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Generate Button */}
                            <button
                                onClick={generateRecipes}
                                disabled={ingredients.length === 0 || isGenerating}
                                className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                            >
                                {isGenerating ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        Generating Recipes...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-5 h-5" />
                                        Generate AI Recipes
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Generated Recipes with Pagination */}
                        {generatedRecipes.length > 0 && (
                            <div className="space-y-6" ref={recipeRef}>
                                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 text-center flex items-center justify-center gap-3">
                                    <Heart className="w-8 h-8 text-orange-500" />
                                    Your AI-Generated Recipes
                                </h2>

                                <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl p-8 border border-slate-700/50 hover:border-orange-500/30 transition-all duration-300">
                                    <div className="grid md:grid-cols-3 gap-6">
                                        {/* Recipe Header */}
                                        <div className="md:col-span-3">
                                            <h3 className="text-2xl font-bold text-orange-400 mb-2">{currentRecipe.name || "No name"}</h3>
                                            <p className="text-gray-300 mb-4">{currentRecipe.description || "No description"}</p>

                                            {/* Recipe Meta */}
                                            <div className="flex flex-wrap gap-4 mb-6">
                                                <div className="flex items-center gap-2 text-gray-300">
                                                    <Globe className="w-4 h-4 text-orange-500" />
                                                    <span className="text-sm">{currentRecipe.cuisine || "N/A"}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-300">
                                                    <Clock className="w-4 h-4 text-orange-500" />
                                                    <span className="text-sm">{currentRecipe.cookingTime || "N/A"}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-300">
                                                    <Users className="w-4 h-4 text-orange-500" />
                                                    <span className="text-sm">{currentRecipe.servings ? `${currentRecipe.servings} servings` : "N/A"}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${currentRecipe.difficulty === 'Easy' ? 'bg-green-500/20 text-green-300' :
                                                        currentRecipe.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                                                            currentRecipe.difficulty === 'Hard' ? 'bg-red-500/20 text-red-300' :
                                                                'bg-slate-600/20 text-slate-300'
                                                        }`}>
                                                        {currentRecipe.difficulty || "N/A"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Ingredients */}
                                        <div>
                                            <h4 className="text-lg font-semibold text-orange-300 mb-3">Ingredients</h4>
                                            <ul className="space-y-2">
                                                {(Array.isArray(currentRecipe.ingredients) ? currentRecipe.ingredients : []).map((ingredient, idx) => (
                                                    <li key={idx} className="text-gray-300 text-sm flex items-start gap-2">
                                                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></span>
                                                        {ingredient}
                                                    </li>
                                                ))}
                                                {!Array.isArray(currentRecipe.ingredients) && (
                                                    <li className="text-red-400 text-sm">No ingredients found in AI response.</li>
                                                )}
                                            </ul>
                                        </div>

                                        {/* Instructions */}
                                        <div className="md:col-span-2">
                                            <h4 className="text-lg font-semibold text-orange-300 mb-3">Instructions</h4>
                                            <ol className="space-y-3">
                                                {(Array.isArray(currentRecipe.instructions) ? currentRecipe.instructions : []).map((step, idx) => (
                                                    <li key={idx} className="text-gray-300 text-sm flex gap-3">
                                                        <span className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full text-xs font-bold flex items-center justify-center">
                                                            {idx + 1}
                                                        </span>
                                                        {step}
                                                    </li>
                                                ))}
                                                {!Array.isArray(currentRecipe.instructions) && (
                                                    <li className="text-red-400 text-sm">No instructions found in AI response.</li>
                                                )}
                                            </ol>
                                        </div>
                                    </div>
                                </div>

                                {/* Pagination Controls */}
                                <div className="flex justify-center items-center gap-4 mt-4">
                                    <button
                                        onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                                        disabled={currentPage === 0}
                                        className={`px-4 py-2 rounded-lg flex items-center gap-2 font-semibold transition-all duration-200
                                        ${currentPage === 0
                                                ? 'bg-slate-700 text-gray-400 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 hover:scale-105'
                                            }`}
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                        Prev
                                    </button>
                                    <span className="text-orange-400 font-bold">
                                        Recipe {currentPage + 1} of {totalPages}
                                    </span>
                                    <button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                                        disabled={currentPage === totalPages - 1}
                                        className={`px-4 py-2 rounded-lg flex items-center gap-2 font-semibold transition-all duration-200
                                        ${currentPage === totalPages - 1
                                                ? 'bg-slate-700 text-gray-400 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 hover:scale-105'
                                            }`}
                                    >
                                        Next
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Empty State */}
                        {!isGenerating && generatedRecipes.length === 0 && ingredients.length > 0 && (
                            <div className="text-center py-12">
                                <Search className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                                <p className="text-gray-400 text-lg">Click "Generate AI Recipes" to discover what you can make!</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Recipe_generate;